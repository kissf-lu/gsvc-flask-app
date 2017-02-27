#!/usr/bin/env python
# -*- coding: utf-8 -*-

import json
#import sys
from bson import json_util
from bson.code import Code
from SqlPack.SQLModel import qureResultAsJson
import time
import pymongo
import datetime
#获取连接信息
from SqlPack.pyMongoModel import (sql_info,
                                  MongoClient,
                                  Database,
                                  Sheet)
#Mongo_Model
from SqlPack.Mongo_Model import (msmongo,
                                 pygroup)
#获取新架构卡资源数据库连接信息
N_sysStr = 'config_N'
N_Database = 'glocalme_css'


def datetime_timestamp(dt):
    # dt为字符串
    # 中间过程，一般都�?要将字符串转化为时间数组
    time.strptime(dt, '%Y-%m-%d %H:%M:%S')
    # # time.struct_time(tm_year=2012, tm_mon=3, tm_mday=28, tm_hour=6, tm_min=53, tm_sec=40, tm_wday=2, tm_yday=88, tm_isdst=-1)
    # �?"2012-03-28 06:53:40"转化为时间戳
    s = time.mktime(time.strptime(dt, '%Y-%m-%d %H:%M:%S'))
    return int(s)


def getGMT0StrTime(strTime, offSet):
    """

    :param strTime:
    :param offSet:
    :return:
    """
    GMT0dateTime = datetime.datetime.strptime(strTime,'%Y-%m-%d %H:%M:%S')-datetime.timedelta(minutes = offSet)

    return  str(GMT0dateTime)


def getlistimsi(dicData):
    """

    :param dicData:
    :return: list dic imsi
    """
    list_imsi = []
    for i in range(len(dicData)):
        list_imsi.append(str(dicData[i]['imsi']))

    return list_imsi


def getJosonData(sysStr, Database, query_str):


    jsonResults = qureResultAsJson(sysStr=sysStr,
                                   Database=Database,
                                   query_str=query_str,
                                   where=[])
    return jsonResults

def assemErrInfo(queryData, errData):
    """

    :param queryData:
    :param errData:
    :return:
    """
    returnassemErrInfoData=[]
    assemErrInfoBaseData = queryData
    assemErrInfoerrData = errData
    for i in range(len(assemErrInfoBaseData)):
        lis_prob_vsim_infor = []
        str_err = ''
        err = []
        find_imsi = False
        for j in range(len(assemErrInfoerrData)):

            if str(assemErrInfoBaseData[i]['imsi']) == str(assemErrInfoerrData[j]['vsimImsi']):
                str_err = str_err + '(' + str(int(assemErrInfoerrData[j]['errType']))+ "," + str(int(assemErrInfoerrData[j]['errCode'])) + ' :' + str(
                    int(assemErrInfoerrData[j]['count'])) + ')'
                find_imsi = True

        if not (find_imsi):
            str_err = 'NULL'

        err = {'err': str_err}

        assemErrInfoBaseData[i].update(err)
    #print(assemErrInfoBaseData)

    return assemErrInfoBaseData


def getErr(queryData,beginTime,endTime):
    """

    :param queryData:
    :param beginTime:
    :param endTime:
    :return:
    """
    returngetErrData = []
    getErrbaseData = queryData
    IMSI = []  # 存储问题imsi
    for dic in getErrbaseData:
        IMSI.append(str(dic['imsi']))

    # print(N_ismi)
    condition = {"vsimImsi": {"$in": IMSI},
                 # "errType":8,
                 # "mcc":'602',
                 # "errCode":{"$in" : [7,]},
                 "errorTime": {"$gte": ((datetime_timestamp(beginTime)) * 1000),
                               "$lte": (((datetime_timestamp(endTime))) * 1000)}
                 }
    msMog = msmongo(MongoClient=MongoClient["N_oss_perflog"],
                    Database=Database["N_oss_perflog"],
                    Sheet=Sheet["t_term_vsim_estfail"])
    key = {"vsimImsi": 1, "errType": 1,"errCode": 1}
    initial = {"count": 0}
    reducer = Code("""function(obj, prev){prev.count ++}""")
    lis_mongo_tab = ["vsimImsi","errType" , "errCode", "count"]
    # pygroup(msMog,sheet,key,condition,initial,reducer,lis_tab):
    mongoErr = pygroup(msMog, "t_term_vsim_estfail", key, condition, initial, reducer, lis_mongo_tab)
    #print(mongoErr)
    #组合错误信息
    returngetErrData = assemErrInfo(queryData= getErrbaseData, errData= mongoErr)


    return returngetErrData


def getCountryFlower(Dicdata,Begintime,Endtime,FlowerThreshold):
    """

    :param Dicdata:
    :param Begintime:
    :param Endtime:
    :param FlowerThreshold:
    :return:
    """

    queryData = Dicdata
    returnData = []
    #获取list imsi
    list_imsi = getlistimsi(queryData)
    #查询起始和截止时间
    flowerBegintime = Begintime
    flowerEndtime = Endtime

    FlowerHaving=FlowerThreshold
    beginDate = flowerBegintime.split()[0]
    endDate = flowerEndtime.split()[0]


    beginLUnix = (datetime_timestamp(flowerBegintime)) * 1000
    endLUnix = (datetime_timestamp(flowerEndtime)) * 1000
    #print(FlowerHaving, str(beginLUnix), str(endLUnix))
    pipeline = [
        {"$match": {'createtime': {'$gte': beginLUnix, '$lt': endLUnix},
                        'imsi': {'$in': list_imsi}
                    }
         },

        {"$group": {
            "_id": {'imsi': "$imsi"},
            'Flower': { '$sum':  { '$add': [ "$userFlower","$sysFlower"] }}
        }
        }]
    connection = pymongo.MongoClient(sql_info['getCountryProbDic']['queryFlower']['uri'])
    aggeData = list(connection.get_database(sql_info['getCountryProbDic']['queryFlower']['db']
                                            ).get_collection(
                                            sql_info['getCountryProbDic']['queryFlower']['collection']).aggregate(pipeline))

    for i in range(len(aggeData)):
        agg_id_temp = aggeData[i].pop('_id')  # {‘_id’:{}}转换成标准json数据
        aggeData[i].update(agg_id_temp)
        #print(aggeData[i]['imsi'], aggeData[i]['Flower'])
        aggeData[i]['Flower'] = round(((aggeData[i]['Flower'])/ 1024/ 1024),2)
        #print(aggeData[i]['imsi'], aggeData[i]['Flower'])
    #print("aggeData:",len(aggeData))
    # 更新流量记录
    connection.close()

    pip_imsi = []
    for i in range(len(queryData)):
        ifZeroFlower = True
        for j in range(len(aggeData)):
            if (str((aggeData[j]['imsi'])) == str(queryData[i]['imsi'])):
                ifZeroFlower = False
                #print(i,j,str((aggeData[j]['imsi'])),str(queryData[i]['imsi']),aggeData[j]['Flower'])
                if (aggeData[j]['Flower'] <= int(FlowerHaving)):
                    queryData[i].update({'Flower': aggeData[j]['Flower']})

                else:
                    pip_imsi.append(int(queryData[i]['imsi']))
                    #queryData.pop(i)  # 剔除超出流量阈值卡流量阈值
        if ifZeroFlower:
            #print(i)
            queryData[i].update({'Flower': 0})
    #pop_Flower biger
    for dic in queryData:
        if (int(dic['imsi']) not in  pip_imsi):
            returnData.append(dic)


    return returnData

def getImsiFlower(Dicdata,Begintime,Endtime):
    """

    :param Dicdata:
    :param Begintime:
    :param Endtime:
    :return:
    """

    queryData = Dicdata
    returnData = []
    #获取list imsi
    list_imsi = getlistimsi(queryData)
    #查询起始和截止时间
    flowerBegintime = Begintime
    flowerEndtime = Endtime

    beginDate = flowerBegintime.split()[0]
    endDate = flowerEndtime.split()[0]


    beginLUnix = (datetime_timestamp(flowerBegintime)) * 1000
    endLUnix = (datetime_timestamp(flowerEndtime)) * 1000
    #print(str(beginLUnix), str(endLUnix))
    pipeline = [
        {"$match": {'createtime': {'$gte': beginLUnix, '$lte': endLUnix},
                        'imsi': {'$in': list_imsi}
                    }
         },

        {"$group": {
            "_id": {'imsi': "$imsi"},
            'Flower': { '$sum':  { '$add': [ "$userFlower","$sysFlower"] }}
        }
        }]
    connection = pymongo.MongoClient(sql_info['getCountryProbDic']['queryFlower']['uri'])
    aggeData = list(connection.get_database(sql_info['getCountryProbDic']['queryFlower']['db']
                                            ).get_collection(
                                            sql_info['getCountryProbDic']['queryFlower']['collection']).aggregate(pipeline))

    for i in range(len(aggeData)):
        agg_id_temp = aggeData[i].pop('_id')  # {‘_id’:{}}转换成标准json数据
        aggeData[i].update(agg_id_temp)

        aggeData[i]['Flower'] = round(((aggeData[i]['Flower'])/ 1024/ 1024),2)

    # 更新流量记录
    for i in range(len(queryData)):
        ifZeroFlower = True
        for j in range(len(aggeData)):
            if (str((aggeData[j]['imsi'])) == str(queryData[i]['imsi'])):
                ifZeroFlower = False
                queryData[i].update({'Flower': aggeData[j]['Flower']})

        if ifZeroFlower:
            queryData[i].update({'Flower': 0})

    connection.close()


    returnData = queryData


    return returnData


def getCountryDispatchAndVsimInfo(country,queryPlmn,begintime,endtime,DispatchThreshold):
    """
    获取系统分卡统计信息模块返回指定国家及时间内的分卡结果
    :param country:
    :param begintime:
    :param endtime:
    :param DispatchThreshold:
    :return:
    """
    strCountry = country
    strPlmn = queryPlmn
    strBegintime = begintime
    strEndtime = endtime
    strDispatchThreshold = DispatchThreshold
    if (strPlmn == ''):
        strPlmnQueryStr = ''
    else:
        strPlmnQueryStr = ' '+'AND a.`plmn` IN (' + strPlmn + ') '
    if (strCountry == ''):
        strCountryQueryStr = ''
    else:
        strCountryQueryStr = "" + "AND a.`iso2`= '" + strCountry + "' "
    query_str_vsim = (
        "SELECT "
        "a.`iso2` AS 'country', "
        "(CAST(a.`imsi` AS CHAR)) AS 'imsi', "
        "a.`iccid`, "
        "b.`package_type_name`, "
        "b.`next_update_time`, "
        "a.`bam_id` as 'bam', "
        "COUNT(c.`imsi`)AS 'imsi_con', "
        "COUNT(DISTINCT c.`imei`)AS 'imei_con' "
        "FROM `t_css_vsim` AS a "
        "LEFT  JOIN `t_css_vsim_packages` b "
        "	ON a.`imsi`=b.`imsi`  "
        "LEFT  JOIN `t_css_vsim_dispatcherlog` AS c "
        "        ON c.`imsi`=a.`imsi` "
        "WHERE  "
        "     a.`bam_status`='0' "
        "     AND a.`slot_status`='0' "  + strCountryQueryStr + " " + strPlmnQueryStr + ""
        "     AND a.`available_status`='0' "
        "     AND c.`create_time`>= " + "'" + strBegintime + "'"
        "     AND c.`create_time`< " + "'" + strEndtime + "'"
        "GROUP BY a.`iso2`, "
        "a.`imsi`, "
        "a.`iccid`, "
        "b.`package_type_name`, "
        "b.`next_update_time` "
        "HAVING COUNT(c.`imsi`)> " + "'" + str(strDispatchThreshold) + "'"
    )
    #print(query_str_vsim)
    DicResults = getJosonData(sysStr=N_sysStr, Database=N_Database, query_str=query_str_vsim)

    return DicResults


def getImsiDispatchAndVsimInfo(imsi,begintime,endtime):
    """
    获取系统分卡统计信息模块返回指定国家及时间内的分卡结果
    :param country:
    :param begintime:
    :param endtime:
    :param DispatchThreshold:
    :return:
    """
    strimsi = imsi
    strBegintime = begintime
    strEndtime = endtime

    query_str_vsim = (
        "SELECT "
        "a.`iso2` AS 'country', "
        "(CAST(a.`imsi` AS CHAR)) AS 'imsi', "
        "a.`iccid`, "
        "b.`package_type_name`, "
        "b.`next_update_time`, "
        "a.`bam_id` AS 'bam', "
        "COUNT(c.`imsi`)AS 'imsi_con', "
        "COUNT(DISTINCT c.`imei`)AS 'imei_con' "
        "FROM `t_css_vsim` AS a "
        "LEFT  JOIN `t_css_vsim_packages` b "
        "	ON a.`imsi`=b.`imsi`  "
        "LEFT  JOIN `t_css_vsim_dispatcherlog` AS c "
        "        ON c.`imsi`=a.`imsi` "
        "WHERE  "
        "     a.`imsi` IN (" + strimsi + ")"
        "     AND a.`bam_status`='0' "
        "     AND a.`slot_status`='0' "
        "     AND a.`available_status`='0' "
        "     AND c.`create_time`>= " + "'" + strBegintime + "'"
        "     AND c.`create_time`< " + "'" + strEndtime + "'"
        "GROUP BY a.`iso2`, "
        "a.`imsi`, "
        "a.`iccid`, "
        "b.`package_type_name`, "
        "b.`next_update_time` "
    )
    #print(query_str_vsim)
    DicResults = getJosonData(sysStr=N_sysStr, Database=N_Database, query_str=query_str_vsim)

    return DicResults


def getProbFisrtDic(querySort,queryPram, queryPlmn,begintime,endtime,TimezoneOffset,DispatchThreshold,FlowerThreshold):
    """

    :param country:
    :param begintime:
    :param endtime:
    :param DispatchThreshold:
    :param FlowerThreshold:
    :return:
    """
    querysort = querySort
    querypram = queryPram
    queryplmn = queryPlmn
    queryBegintime = begintime
    queryendtime = endtime
    queryTimezoneOffset = int(TimezoneOffset)
    queryGMTOBeginTime = getGMT0StrTime(strTime=queryBegintime,
                                        offSet=queryTimezoneOffset)
    queryGMTOEndTime = getGMT0StrTime(strTime=queryendtime,
                                        offSet=queryTimezoneOffset)
    #print (queryBegintime,queryendtime)
    #print (queryGMTOBeginTime, queryGMTOEndTime)
    queyDispatchThreshold = DispatchThreshold
    queryFlowerThreshold = FlowerThreshold

    errInfo = ''
    DicData = []
    getErrDicData = []

    if ((querysort == '') or
        (queryBegintime == '') or
        (queryendtime == '') or
        (queyDispatchThreshold == '') or
        (queryFlowerThreshold == '')):

        DicResults = {'info': {'err':True,'errinfo':'存在空类型参数'}, 'data': []}

        return json.dumps(DicResults, sort_keys=True, indent=4, default=json_util.default)
    else:
        if (querysort == 'country'):
            try:
                DicData = getCountryDispatchAndVsimInfo(country=querypram,
                                                        queryPlmn=queryplmn,
                                                        begintime=queryGMTOBeginTime,
                                                        endtime=queryGMTOEndTime,
                                                        DispatchThreshold=queyDispatchThreshold)
            except ValueError:
                errInfo = "NDatabase input Date Time ValueError"  # 'Database Error!'
            except pymongo.errors.OperationFailure:
                errInfo = "NDatabase Authentication failed!"
            except pymongo.errors.NetworkTimeout:
                errInfo = "NDatabase Connection Exceeded SocketTimeoutMS!"


            if errInfo != '':
                DicResults = {'info': {'err': True, 'errinfo': errInfo}, 'data': DicData}
                return json.dumps(DicResults, sort_keys=True, indent=4, default=json_util.default)

            elif DicData == []:
                DicResults = {'info': {'err': True, 'errinfo': '无查询结果，请重新设置查询参数'}, 'data': DicData}
                return json.dumps(DicResults, sort_keys=True, indent=4, default=json_util.default)
            else:
                try:
                    getFlowerDicData = getCountryFlower(Dicdata=DicData,
                                                        Begintime=queryBegintime,
                                                        Endtime=queryendtime,
                                                        FlowerThreshold=queryFlowerThreshold)
                    getErrDicData = getErr(queryData=getFlowerDicData,
                                           beginTime=queryBegintime,
                                           endTime=queryendtime)

                except pymongo.errors.OperationFailure:
                    errInfo = "MongoDataBase Authentication failed!"
                except pymongo.errors.NetworkTimeout:
                    errInfo = "MongoDataBase Connection Exceeded SocketTimeoutMS!"
                except:
                    errInfo = "MongoDataBase Unexpected error"
                if errInfo != '':
                    DicResults = {'info': {'err': True, 'errinfo': errInfo}, 'data': []}
                    return json.dumps(DicResults, sort_keys=True, indent=4, default=json_util.default)
                else:
                    DicResults = {'info': {'err': False, 'errinfo': errInfo}, 'data': getErrDicData}
                    return json.dumps(DicResults, sort_keys=True, indent=4, default=json_util.default)
        else:
            try:
                DicData = getImsiDispatchAndVsimInfo(imsi=querypram,
                                                     begintime=queryGMTOBeginTime,
                                                     endtime=queryGMTOEndTime)
            except ValueError:
                errInfo = "NDatabase input Date Time ValueError"  # 'Database Error!'
            except pymongo.errors.OperationFailure:
                errInfo = "NDatabase Authentication failed!"
            except pymongo.errors.NetworkTimeout:
                errInfo = "NDatabase Connection Exceeded SocketTimeoutMS!"
            except:
                errInfo = "NDatabase Unexpected error"

            if errInfo != '':
                DicResults = {'info': {'err': True, 'errinfo': errInfo}, 'data': DicData}
                return json.dumps(DicResults, sort_keys=True, indent=4, default=json_util.default)

            elif DicData == []:
                DicResults = {'info': {'err': True, 'errinfo': '无查询结果，请重新设置查询参数！'}, 'data': DicData}
                return json.dumps(DicResults, sort_keys=True, indent=4, default=json_util.default)

            else:
                try:
                    getFlowerDicData = getImsiFlower(Dicdata=DicData,
                                                     Begintime=queryBegintime,
                                                     Endtime=queryendtime)

                    getErrDicData = getErr(queryData=getFlowerDicData,
                                           beginTime=queryBegintime,
                                           endTime=queryendtime)
                except pymongo.errors.OperationFailure:
                    errInfo = "MongoDataBase Authentication failed!"
                except pymongo.errors.NetworkTimeout:
                    errInfo = "MongoDataBase Connection Exceeded SocketTimeoutMS!"
                except:
                    errInfo = "MongoDataBase Unexpected error"
                if errInfo != '':
                    DicResults = {'info': {'err': True, 'errinfo': errInfo}, 'data': []}
                    return json.dumps(DicResults, sort_keys=True, indent=4, default=json_util.default)
                else:
                    DicResults = {'info': {'err': False, 'errinfo': errInfo}, 'data': getErrDicData}
                    return json.dumps(DicResults, sort_keys=True, indent=4, default=json_util.default)


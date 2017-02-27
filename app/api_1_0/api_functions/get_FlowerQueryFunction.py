#!/usr/bin/env python
#coding=utf-8

import json
import sys
from bson import json_util
from bson.code import Code
from SqlPack.SQLModel import qureResultAsJson
import time
import pymongo
import datetime
#获取连接信息
from SqlPack.pyMongoModel import (sql_info)
#Mongo_Model
from SqlPack.Mongo_Model import (msmongo,
                                 pygroup)
#获取新架构卡资源数据库连接信息
N_sysStr = 'config_N'
N_Database = 'glocalme_css'


def datetime_timestamp(dt):
    # dt为字符串标准时间，返回的s为unix时间戳
    #time.strptime(dt, '%Y-%m-%d %H:%M:%S')
    # # time.struct_time(tm_year=2012, tm_mon=3, tm_mday=28, tm_hour=6, tm_min=53, tm_sec=40, tm_wday=2, tm_yday=88, tm_isdst=-1)
    # �?"2012-03-28 06:53:40"转化为时间戳
    try:
        # 此处为了匹配长天格式时间
        s = time.mktime(time.strptime(dt, '%Y-%m-%d %H:%M:%S'))
    except ValueError:
        #此处为了匹配短天格式时间
        s = time.mktime(time.strptime(dt, '%Y-%m-%d'))
    return int(s)


def timestamp_datetime(value):
    format1 = '%Y-%m-%d %H:%M:%S'
    format2 = '%Y-%m-%d'
    # value为传入的值为时间戳(整形)，如：1332888820
    structFormate = time.localtime(value)
    ## 经过localtime转换后变成结构型时间
    # 最后再经过strftime函数转换为字符型正常日期格式。
    try:
        dt = time.strftime(format1, structFormate)
    except ValueError:
        dt = time.strftime(format2, structFormate)

    return dt


def StrTimeTOUnix(dt,format):
    """

    :param dt:字符串标准时间
    :param format:字符串时间格式
    :return:返回时间戳
    """
    s = time.mktime(time.strptime(dt, format))

    return s


def UnixTOStrTime(value,format):
    """
    :param value:unix时间戳
    :param format:输出时间格式
    :return:返回时间戳
    """
    # 最后再经过strftime函数转换为字符型正常日期格式。
    dt = time.strftime(format, time.localtime(value))
    return dt


def getGMT0StrTime(strTime, offSet):
    """

    :param strTime:
    :param offSet:
    :return:
    """
    try:
        GMT0dateTime = datetime.datetime.strptime(strTime,'%Y-%m-%d %H:%M:%S')-datetime.timedelta(minutes = offSet)
    except ValueError:
        GMT0dateTime = datetime.datetime.strptime(strTime, '%Y-%m-%d') - datetime.timedelta(minutes=offSet)

    return  str(GMT0dateTime)

def getlistimsi(Data):
    """

    :param Data:
    :return: list_imsi
    """
    imsiData = Data
    list_imsi = []
    if type(imsiData) is dict:
        for data in imsiData :
            list_imsi.append(str(data['imsi']))

    elif type(imsiData) is list :
        for data in imsiData :
            list_imsi.append(str(data))

    elif type(imsiData) is str :
        for data in imsiData.split(',') :
            list_imsi.append(data)

    else:
        list_imsi = []

    return list_imsi


def getJosonData(sysStr, Database, query_str):


    jsonResults = qureResultAsJson(sysStr=sysStr,
                                   Database=Database,
                                   query_str=query_str,
                                   where=[])
    return jsonResults


def getHoursFlower(imsi,Begintime,Endtime,Mcc,Plmn,FlowerKey):
    """

    :param Dicdata:
    :param Begintime:
    :param Endtime:
    :return:
    """
    list_imsi = imsi
    returnData = []
    #查询起始和截止时间
    flowerBegintime = Begintime
    flowerEndtime = Endtime
    queryMcc = Mcc
    queryPlmn = Plmn
    groupItem = FlowerKey
    groupID = {'imsi': "$imsi"}
    if groupItem is None:
        keysNULL = 'NULL'
    else:
        for keys in groupItem :
            if keys == 'plmn':
                addID = {'plmn':"$plmn"}

            elif keys == 'time':
                addID = {'time': "$createtime"}

            elif keys == 'mcc':
                addID = {'mcc': "$mcc"}

            else:
                continue

            groupID.update(addID)

    #Match Stages Set---------------------------------------------------
    #Unix Time Make
    beginLUnix = (datetime_timestamp(flowerBegintime)) * 1000
    endLUnix = (datetime_timestamp(flowerEndtime)) * 1000

    if ((queryPlmn != '') and (queryMcc != '')):
        matchStages = {'createtime': {'$gte': beginLUnix, '$lte': endLUnix},
                       'imsi': {'$in': list_imsi},
                       'mcc': queryMcc,
                       'plmn': queryPlmn
                       }
    elif ((queryMcc != '') and (queryPlmn == '')):
        matchStages = {'createtime': {'$gte': beginLUnix, '$lte': endLUnix},
                       'imsi': {'$in': list_imsi},
                       'mcc': queryMcc
                       }
    elif ((queryMcc == '') and (queryPlmn != '')):
        matchStages = {'createtime': {'$gte': beginLUnix, '$lte': endLUnix},
                       'imsi': {'$in': list_imsi},
                       'plmn': queryPlmn
                       }
    else:
        matchStages = {'createtime': {'$gte': beginLUnix, '$lte': endLUnix},
                       'imsi': {'$in': list_imsi}
                       }
    pipeline = [
        {"$match": matchStages
         },

        {"$group": {
            "_id": groupID,
            'Flower': { '$sum':  { '$add': [ "$userFlower","$sysFlower"] }}
        }
        }]
    connection = pymongo.MongoClient(sql_info['getFlower']['queryhourFlower']['uri'])
    aggeData = list(connection.get_database(sql_info['getFlower']['queryhourFlower']['db']
                                            ).get_collection(
                                            sql_info['getFlower']['queryhourFlower']['collection']).aggregate(pipeline))

    for i in range(len(aggeData)):
        agg_id_temp = aggeData[i].pop('_id')  # {‘_id’:{}}转换成标准json数据
        aggeData[i].update(agg_id_temp)
        #流量输出为MB
        aggeData[i]['Flower'] = round(((aggeData[i]['Flower'])/ 1024/ 1024),2)
        if groupItem is not None:
            if ('time' in groupItem) and ('time' in aggeData[i]):
                aggeData[i]['time']  = timestamp_datetime(aggeData[i]['time']/1000)


    connection.close()

    return aggeData


def getDaysFlower(imsi,Begintime,Endtime,Mcc,Plmn,FlowerKey):
    """

    :param Dicdata:
    :param Begintime:
    :param Endtime:
    :return:
    """
    list_imsi = imsi
    returnData = []
    #查询起始和截止时间
    flowerBegintime = Begintime
    flowerEndtime = Endtime
    queryMcc = Mcc
    queryPlmn = Plmn
    groupItem = FlowerKey
    groupID = {'imsi': "$imsi"}

    if groupItem is None:
        keysNULL = 'NULL'
    else:
        for keys in groupItem :
            if keys == 'plmn':
                addID = {'plmn':"$plmn"}

            elif keys == 'time':
                addID = {'time': "$createtime"}

            elif keys == 'mcc':
                addID = {'mcc': "$mcc"}

            else:
                continue

            groupID.update(addID)

    #Match Stages Set---------------------------------------------------
    #Unix Time Make
    beginLUnix = (datetime_timestamp(flowerBegintime)) * 1000
    endLUnix = (datetime_timestamp(flowerEndtime)) * 1000

    print (beginLUnix,endLUnix)

    if ((queryPlmn != '') and (queryMcc != '')):
        matchStages = {'createtime': {'$gte': beginLUnix, '$lte': endLUnix},
                       'imsi': {'$in': list_imsi},
                       'mcc': queryMcc,
                       'plmn': queryPlmn
                       }
    elif ((queryMcc != '') and (queryPlmn == '')):
        matchStages = {'createtime': {'$gte': beginLUnix, '$lte': endLUnix},
                       'imsi': {'$in': list_imsi},
                       'mcc': queryMcc
                       }
    elif ((queryMcc == '') and (queryPlmn != '')):
        matchStages = {'createtime': {'$gte': beginLUnix, '$lte': endLUnix},
                       'imsi': {'$in': list_imsi},
                       'plmn': queryPlmn
                       }

    else:
        matchStages = {'createtime': {'$gte': beginLUnix, '$lte': endLUnix},
                       'imsi': {'$in': list_imsi}
                       }
    pipeline = [
        {"$match": matchStages
         },

        {"$group": {
            "_id": groupID,
            'Flower': { '$sum':  { '$add': [ "$userFlower","$sysFlower"] }}
        }
        }]
    connection = pymongo.MongoClient(sql_info['getFlower']['querydayFlower']['uri'])
    aggeData = list(connection.get_database(sql_info['getFlower']['querydayFlower']['db']
                                            ).get_collection(
                                            sql_info['getFlower']['querydayFlower']['collection']).aggregate(pipeline))

    for i in range(len(aggeData)):
        agg_id_temp = aggeData[i].pop('_id')  # {‘_id’:{}}转换成标准json数据
        aggeData[i].update(agg_id_temp)
        #流量输出为MB
        aggeData[i]['Flower'] = round(((aggeData[i]['Flower'])/ 1024/ 1024),2)
        if groupItem is not None:
            if ('time' in groupItem) and ('time' in aggeData[i]):
                aggeData[i]['time']  = timestamp_datetime(aggeData[i]['time']/1000)

    connection.close()

    return aggeData


def getFlowers(querySort,begintime,endtime,mcc,plmn,imsi,flower_query_key,TimezoneOffset):
    """

    :param querySort:
    :param begintime:
    :param endtime:
    :param mcc:
    :param plmn:
    :param imsi:
    :param flower_query_key:
    :param TimezoneOffset:
    :return:
    """
    querysort = querySort
    queryBegintime = begintime
    queryEndtime = endtime
    queryMcc = str(mcc)
    queryPlmn = str(plmn)
    queryImsi = getlistimsi(imsi)
    queryFlowerKey= flower_query_key
    queryTimezoneOffset = int(TimezoneOffset)
    #部署服务器是时间为GMT0时间
    queryGMTOBeginTime = getGMT0StrTime(strTime=queryBegintime,
                                        offSet=queryTimezoneOffset)
    queryGMTOEndTime = getGMT0StrTime(strTime=queryEndtime,
                                        offSet=queryTimezoneOffset)
    errInfo = ''
    DicData = []
    #print (queryMcc)
    if ((querysort == '') or
        (queryImsi == '') or
        (queryBegintime == '') or
        (queryEndtime == '')):

        DicResults = {'info': {'err':True,'errinfo':'存在空类型参数'}, 'data': []}
        return json.dumps(DicResults, sort_keys=True, indent=4, default=json_util.default)

    else:
        if (querysort == 'hours'):
            try:
                DicData = getHoursFlower(imsi= queryImsi,
                                         Begintime= queryBegintime,
                                         Endtime= queryEndtime,
                                         Mcc = queryMcc,
                                         Plmn= queryPlmn,
                                         FlowerKey= queryFlowerKey)
            except ValueError:
                errInfo = "input Date Time ValueError"  # 'Database Error!'
            except pymongo.errors.OperationFailure:
                errInfo = "DataBase Authentication failed!"
            except pymongo.errors.NetworkTimeout:
                errInfo = "DataBase Connection Exceeded SocketTimeoutMS!"
            except:
                errInfo = "Unexpected error"

            if errInfo != '':
                DicResults = {'info': {'err': True, 'errinfo': errInfo}, 'data': DicData}
                return json.dumps(DicResults, sort_keys=True, indent=4, default=json_util.default)
            else:
                if DicData == []:
                    DicResults = {'info': {'err': True, 'errinfo': '无查询结果，请重新设置查询参数'}, 'data': DicData}
                    return json.dumps(DicResults, sort_keys=True, indent=4, default=json_util.default)
                else:
                    DicResults = {'info': {'err': False, 'errinfo': errInfo}, 'data': DicData}
                    return json.dumps(DicResults, sort_keys=True, indent=4, default=json_util.default)
        else:
            try:
                DicData = getDaysFlower(imsi= queryImsi,
                                        Begintime= queryBegintime,
                                        Endtime= queryEndtime,
                                        Mcc=queryMcc,
                                        Plmn= queryPlmn,
                                        FlowerKey= queryFlowerKey)
            except ValueError:
                errInfo = "天维度的短时间日期有问题！"#'Database Error!'
            except pymongo.errors.OperationFailure:
                errInfo = "DataBase Authentication failed!"
            except pymongo.errors.NetworkTimeout:
                errInfo = "DataBase Connection Exceeded SocketTimeoutMS!"
            except:
                #print (sys.exc_info()[0])
                errInfo = "Unexpected error"

            if errInfo != '':
                DicResults = {'info': {'err': True, 'errinfo': errInfo}, 'data': DicData}
                return json.dumps(DicResults, sort_keys=True, indent=4, default=json_util.default)
            else:
                if DicData == []:
                    DicResults = {'info': {'err': True, 'errinfo': '无查询结果，请重新设置查询参数'}, 'data': DicData}
                    return json.dumps(DicResults, sort_keys=True, indent=4, default=json_util.default)
                else:
                    DicResults = {'info': {'err': False, 'errinfo': errInfo}, 'data': DicData}
                    return json.dumps(DicResults, sort_keys=True, indent=4, default=json_util.default)

# -*- coding: utf-8 -*-

"""

    exportExcelFunc
    ~~~~~~~~~~~~~~
    外部接口:
    1、exportFilesAPI

    本单元函数自成一体，重点实现EXCEL文件导出，实现list dic类数据的导出xls,不做后台xls数据存储

    :copyright: (c) 2015 by Armin kissf lu.
    :license: ukl, see LICENSE for more details.
"""
import datetime as dt
from datetime import datetime


def getDictExcelData(array_data):
    """

    :param array_data:
    :return:
    """
    dicData=[]
    key_dic=[]
    errinfo =''
    if ((type(array_data) is list) and (len(array_data) >=2)):
        for i in range(len(array_data)):
            temp_dic = {}
            if (i==0):
                key_dic = array_data[0]
            else:
                for j in range(len(key_dic)):
                    try:
                        temp_dic.update({key_dic[j]: array_data[i][j]})

                    except IndexError :
                        errinfo = 'Index Error'
                dicData.append(temp_dic)

    else:
        errinfo = 'Data Error'
    if errinfo !='':
        returnDictData = {'err': True, 'errinfo': errinfo, 'data':[]}
    else:
        returnDictData = {'err': False, 'errinfo': errinfo, 'data': dicData}

    return returnDictData


def getListExcelData(dic_data,sort_key,datetimekey):
    """

    :param dic_data:
    :param sort_key:
    :param datetimekey: 数据中的时间数据
    :return:
    """
    dicData = dic_data
    datetimeKey = datetimekey
    max_key = []
    sort_max_key = []
    sorted_list_data = []
    sortKey = sort_key
    temp_null_key = []

    if datetimeKey != []:
        for data in dicData:
            for date in datetimeKey:
                if date in data.keys():
                    if ((data[date] is not None ) and (data[date] != '')):
                        data[date] = str(datetime.strptime(data[date], '%Y-%m-%dT%H:%M:%S.%fZ') + dt.timedelta(hours=8))
    for dic in dicData:
        temp_key = (dic).keys()
        if (len(max_key) < len(temp_key)):
            max_key = temp_key

    for sortofkey in sortKey:
        if sortofkey not in max_key:
            temp_null_key.append(sortofkey)

    if (temp_null_key != []) :
        for k in temp_null_key:
            sortKey.remove(k)

    for sk in sortKey:
        for mk in max_key:
            if sk == mk:
                sort_max_key.append(sk)
    #添加标同行
    sorted_list_data.append(sort_max_key)

    for i in range(len(dicData)):
        #每次清除上次记录
        temp_one_list = []
        for key in sort_max_key:
            try:
                temp_one_list.append(dicData[i][key])
            except KeyError:
                temp_one_list.append('')
        sorted_list_data.append(temp_one_list)


    return sorted_list_data


def getDayHourListExcelData(dic_data,sort_key,datetimekey):
    """

    :param dic_data:
    :param sort_key:
    :param datetimekey: 数据中的时间数据
    :return:
    """
    dicData = dic_data
    datetimeKey = datetimekey
    max_key = []
    sort_max_key = []
    sorted_list_data = []
    sortKey = sort_key
    temp_null_key = []

    if datetimeKey != []:
        for data in dicData:
            for date in datetimeKey:
                if date in data.keys():
                    if ((data[date] is not None) and (data[date] != '')) :
                        data[date] = str(datetime.strptime(data[date], '%Y-%m-%d %H')+ dt.timedelta(hours=8))
    for dic in dicData:
        temp_key = (dic).keys()
        if (len(max_key) < len(temp_key)):
            max_key = temp_key

    for sortofkey in sortKey:
        if sortofkey not in max_key:
            temp_null_key.append(sortofkey)

    if (temp_null_key != []) :
        for k in temp_null_key:
            sortKey.remove(k)

    for sk in sortKey:
        for mk in max_key:
            if sk == mk:
                sort_max_key.append(sk)
    #添加标同行
    sorted_list_data.append(sort_max_key)

    for i in range(len(dicData)):
        #每次清除上次记录
        temp_one_list = []
        for key in sort_max_key:
            try:
                temp_one_list.append(dicData[i][key])
            except KeyError:
                temp_one_list.append('')
        sorted_list_data.append(temp_one_list)


    return sorted_list_data


def get_excelCountrySrcStaticDataAndSorted(dic_data):
    """

    :param dic_data:
    :return:
    """
    dicData = dic_data
    sortKey = [unicode('国家'),
               unicode('套餐名称'),
               unicode('套餐更新日期'),
               unicode('归属机构'),
               unicode('在架卡数'),
               unicode('未激活卡数'),
               unicode('可用卡数'),
               unicode('流量预警阀值_MB'),
               unicode('总计流量_GB'),
               unicode('使用流量_GB'),
               unicode('剩余流量_GB'),
               unicode('流量使用率')]

    dateTimeKey = [unicode('套餐更新日期')]
    #print (dicData[0][unicode('套餐更新日期')])
    sorted_list_data = getDayHourListExcelData(dic_data=dicData,
                                               sort_key=sortKey,
                                               datetimekey=dateTimeKey)

    return sorted_list_data


def get_excel140countryDataAndSorted(dic_data):
    """

    :param dic_data:
    :return:
    """
    dicData = dic_data
    sortKey = [unicode('imsi'),
                unicode('国际流量'),
                unicode('国内流量'),
                unicode('总计流量'),
                unicode('国际流量占比'),
                unicode('套餐类型'),
                unicode('网络集名'),
                unicode('ORG'),
                unicode('state')]
    dateTimeKey = []
    sorted_list_data = getListExcelData(dic_data=dicData,
                                        sort_key=sortKey,
                                        datetimekey=dateTimeKey)

    return sorted_list_data


def get_excelFlowerDataAndSorted(dic_data):
    """

    :param dic_data: 待装换原始数据
    :return:
    """
    dicData = dic_data
    sortKey = [unicode('imsi'),
                unicode('time'),
                unicode('mcc'),
                unicode('plmn'),
                unicode('Flower')]
    dateTimeKey = [unicode('time')]
    sorted_list_data = getListExcelData(dic_data=dicData,
                                        sort_key=sortKey,
                                        datetimekey=dateTimeKey)

    return sorted_list_data


def get_excelManulInfoDataAndSorted(dic_data):
    """

    :param dic_data:
    :return:
    """
    dicData = dic_data
    sortKey = [unicode('imsi'),
                unicode('country_iso'),
                unicode('country_cn'),
                unicode('GSVC负责人'),
                unicode('运营负责人'),
                unicode('系统'),
                unicode('state'),
                unicode('slot_state'),
                unicode('是否代理商卡'),
                unicode('是否多国卡'),
                unicode('卡批次'),
                unicode('BAM编码'),
                unicode('卡位'),
                unicode('operator'),
                unicode('iccid'),
                unicode('套餐'),
                unicode('套餐外付费类型'),
                unicode('激活日期'),
                unicode('上次套餐更新日期'),
                unicode('下次套餐更新日期'),
                unicode('备注'),
                unicode('电话号码'),
                unicode('付费类型'),
                unicode('apn'),
                unicode('上架日期')]

    dateTimeKey = [unicode('激活日期'),
                   unicode('上次套餐更新日期'),
                   unicode('下次套餐更新日期'),
                   unicode('上架日期')]
    print (dicData[0][unicode('上次套餐更新日期')])
    sorted_list_data = getListExcelData(dic_data=dicData,
                                        sort_key=sortKey,
                                        datetimekey=dateTimeKey)


    return sorted_list_data


def get_excelOnSysInfoDataAndSorted(dic_data):
    """

    :param dic_data:
    :return:
    """
    dicData = dic_data
    sortKey = [unicode('imsi'),
                unicode('country'),
                unicode('卡分组属性'),
                unicode('套餐'),
                unicode('state'),
                unicode('占用状态'),
                unicode('卡位状态'),
                unicode('激活状态'),
                unicode('认证状态'),
                unicode('业务状态'),
                unicode('BAM状态'),
                unicode('套餐状态'),
                unicode('激活类型'),
                unicode('本网可用'),
                unicode('是否多国卡'),
                unicode('初始流量MB'),
                unicode('累计使用流量MB'),
                unicode('剩余流量MB'),
                unicode('激活日期'),
                unicode('上次套餐更新日期'),
                unicode('下次套餐更新日期'),
                unicode('iccid'),
                unicode('BAM编码'),
                unicode('卡位'),
                unicode('备注')]
    dateTimeKey = [unicode('激活日期'),
                   unicode('上次套餐更新日期'),
                   unicode('下次套餐更新日期')]
    sorted_list_data = getListExcelData(dic_data=dicData,
                                        sort_key=sortKey,
                                        datetimekey=dateTimeKey)


    return sorted_list_data


def get_excelFirsProbDicDataAndSorted(dic_data):
    """

    :param dic_data: 待装换原始数据
    :return:
    """
    dicData = dic_data
    sortKey = [unicode('country'),
               unicode('imsi'),
               unicode('iccid'),
               unicode('套餐类型'),
               unicode('套餐更新日期'),
               unicode('BAM'),
               unicode('分卡次数'),
               unicode('不同终端数'),
               unicode('累计流量MB'),
               unicode('报错信息')]
    dateTimeKey = [unicode('套餐更新日期')]
    sorted_list_data = getListExcelData(dic_data=dicData,
                                        sort_key=sortKey,
                                        datetimekey=dateTimeKey)

    return sorted_list_data


def get_excelManualDeleteTemple(dic_data):
    """

    :param dic_data:
    :return:
    """
    dicData = dic_data
    sortKey = [unicode('imsi')]
    dateTimeKey = []
    sorted_list_data = getListExcelData(dic_data=dicData,
                                        sort_key=sortKey,
                                        datetimekey=dateTimeKey)

    return sorted_list_data


def get_excelManualInsertTemple(dic_data):
    """

    :param dic_data:
    :return:
    """
    dicData = dic_data
    sortKey = [unicode('imsi'),
               unicode('负责人'),
               unicode('国家'),
               unicode('运营商'),
               unicode('超套餐限速/费用'),
               unicode('运营商网站的注册信息'),
               unicode('套餐办理方式'),
               unicode('查询方式'),
               unicode('备注'),
               unicode('运营接口人'),
               unicode('下架日期'),
               unicode('卡批次'),
               unicode('是否代理商卡 0否，1是代理商卡'),
               unicode('卡的国家属性 0本国卡，1是多国卡')]

    dateTimeKey = []
    sorted_list_data = getListExcelData(dic_data=dicData,
                                        sort_key=sortKey,
                                        datetimekey=dateTimeKey)

    return sorted_list_data
# -*- coding: utf-8 -*-


"""
该脚本用于手工维护表批量删除：只删除非空值，剔除空值
Created on 2016年6月28日
@author: lujian
"""

import mysql.connector
from ..SqlPack.SQLModel import (get_DataBaseConn)


def popBlankValue(popData):
    """

    :param popData:
    :return:
    """
    if not popData:
        return False
    for i in range(len(popData)):
        popDic = []
        for dic in popData[i].keys():
            if popData[i][dic] == "":
                popDic.append(dic)
        for dic in popDic:
            popData[i].pop(dic)

    return popData


def deleteSqlData(sql_info, DicData, key):
    """============================

    :param sql_info: 数据库连接信息 {"db": "config_DevAmz", "database": "devdatabase", "sheet": "vsim_test_info"}
    :param DicData: 待删除数据，为主键信息,剔除空白数据后的数据
    :param key: 主键名称
    =================================
    :return: errInfo 数据库删除数据后信息
    =========================================="""
    SqlInfo = sql_info
    imsiData = DicData
    deleteKey = key
    errInfo = ''
    strimsi = ""
    for i in range(len(imsiData)):
        if i != (len(imsiData) - 1):
            strimsi = strimsi + "'" + imsiData[i][deleteKey] + "',"
        else:
            strimsi = strimsi + "'" + imsiData[i][deleteKey] + "'"
    deleSection = (
        "DELETE FROM `" + SqlInfo["sheet"] + "` "
        "WHERE `" + deleteKey + "` IN  (" + strimsi + ")"
    )
    try:
        cnx = get_DataBaseConn(sysSql=SqlInfo['db'],
                               Database=SqlInfo['database'])
        cursor = cnx.cursor()
        cursor.execute(deleSection)
        commit = cnx.commit()
        cursor.close()
        cnx.close()
    except mysql.connector.Error as err:
        errInfo = "Something went wrong: {}".format(err)
        return errInfo

    return errInfo


def deleteModel(SqlInfo, arrayDicData, delete_key):
    """========================================

    :param SqlInfo: 删除数据库信息 {"db": "config_DevAmz", "database": "devdatabase", "sheet": "vsim_test_info"}
    :param arrayDicData: 原始数据 [{},{},...]
    :return: 返回操作信息，为字符串 string
    =========================================="""
    deletData = arrayDicData
    if deletData:
        popdata = popBlankValue(deletData)
        DeleteActionInfo = deleteSqlData(sql_info=SqlInfo, DicData=popdata, key=delete_key)

        return DeleteActionInfo
    else:
        DeleteActionInfo = "删除数据为空！"

        return DeleteActionInfo

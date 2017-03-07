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


def deleteManuleVsim(SqlInfo, DicData):
    """

    :param SqlInfo:
    :param DicData:
    :return:
    """
    errInfo = ''
    imsiData = DicData
    strimsi = ""
    for i in range(len(imsiData)):
        if i != (len(imsiData) - 1):
            strimsi = strimsi + "'" + imsiData[i]['imsi'] + "',"
        else:
            strimsi = strimsi + "'" + imsiData[i]['imsi'] + "'"
    deleSection = (
        "DELETE FROM `" + SqlInfo["sheet"] + "` "
        "WHERE `imsi` IN  (" + strimsi + ")"
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


def deleteManualModel(SqlInfo, arrayDicData):
    """

    :param SqlInfo:
    :param arrayDicData:
    :return:
    """
    deletData = arrayDicData
    if deletData:
        popdata = popBlankValue(deletData)
        DeleteActionInfo = deleteManuleVsim(SqlInfo=SqlInfo, DicData=popdata)

        return DeleteActionInfo
    else:
        DeleteActionInfo = "删除数据为空！"

        return DeleteActionInfo

# -*- coding: utf-8 -*-


"""=============================================
该脚本用于手工维护表更新：只更新非空值，剔除空值
Created on 2016年6月28日

@author: lujian
================================================"""

import os
import sys
import csv
import mysql.connector
from ..SqlPack.SQLModel import get_DataBaseConn


def cur_file_dir():
    # 获取脚本路径
    path = sys.path[0]
    # 判断为脚本文件还是py2exe编译后的文件，如果是脚本文件，则返回的是脚本的目录，如果是py2exe编译后的文件，则返回的是编译后的文件路径
    if os.path.isdir(path):
        return path

    elif os.path.isfile(path):
        return os.path.dirname(path)


def getDataFromCsv():
    reader_Inser = []
    dir_root = cur_file_dir()
    full_dir_file = os.path.join(dir_root, 'querydata', 'csvdataupdatelinggang-utf8.csv')
    try:
        with open(full_dir_file, 'r') as csvfile:
            reader = csv.DictReader(csvfile, restkey=None, restval=None)
            for row in reader:
                reader_Inser.append(row)
            print(reader_Inser[0:1])
            print("Insert Data Num：", len(reader_Inser))
            return reader_Inser
    except:
        print("Unexpected error:", sys.exc_info()[0])     # 此处有异常返回异常结果，使程序继续执行至其余代码
        return False


def get_key_value_str(data, key):
    """========================================================
    返回："'a1','a2', ..."类型的字符串 方便 sql in ('')类数据查询
    :param data: 包含key数据的原始数据
    :param key: 数据键
    ============================================================
    :return: 返回data数据对应的key值字符串
    ============================================================"""
    strResult = ""
    for i in range(len(data)):
        if i != 0:
            strResult = strResult + "','" + data[i][key]
        else:
            strResult = "".join(data[i][key])
    return "".join(["'", strResult, "'"])


def popBlankValue(popData):
    """==============================

    :param popData:
    :return:
    ================================="""
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


def updateStrMake(update_sheet, update_data):
    """

    :param update_sheet:
    :param update_data:
    :return:
    """
    updateTable = update_sheet
    if 'imsi' not in update_data.keys():
            updateStrMakeInfo = {"err": True, "errInfo": "更新数据存在空imsi行！", "updateStr": "", "updateValue": ""}
            return updateStrMakeInfo
    else:
        setStr = 'SET '
        dicList = list(update_data.keys())
        dicList.remove('imsi')
        index = 'imsi'
        value = []
        for j in range(len(dicList)):
            if j == (len(dicList)-1):
                temp = dicList[j] + " = %s"
            else:
                temp = dicList[j] + " = %s,"
            setStr = setStr + temp
            value.append(update_data[dicList[j]])
        value.append(update_data[index])
        updateStr = ("UPDATE `" + updateTable + "` " + setStr + " WHERE " + index + "=%s ")
        updateValue = tuple(value)
        updateStrMakeInfo = {"err": False, "errInfo": "", "updateStr": updateStr, "updateValue": updateValue}
        return updateStrMakeInfo


def updataOneColModel(SqlInfo, update_data):
    """=======================================
    :param SqlInfo:
    :param update_data:
    :return:
    ==========================================="""
    errInfo = ""
    try:
        cnx = get_DataBaseConn(sysSql=SqlInfo['db'], Database=SqlInfo['database'])
        cursor = cnx.cursor()
        # 制作mysql更新语句
        for i in range(len(update_data)):
            updateAction = updateStrMake(SqlInfo['sheet'], update_data[i])
            # 如果存在无IMSI的情况不采用更新策略，返回提示信息
            if updateAction["err"]:
                errInfo = updateAction["errInfo"]
                cursor.close()
                cnx.close()
                return errInfo
            else:
                updateStr = updateAction["updateStr"]
                updateValue = updateAction["updateValue"]
                # 提交更新字段
                cursor.execute(updateStr, updateValue)
        cnx.commit()
        cursor.close()
        cnx.close()
    except mysql.connector.Error as err:
        errInfo = "Something went wrong: {}".format(err)
        return errInfo
    return errInfo


def updateModel(SqlInfo, DicData):
    UpdateData = DicData
    sql_set = SqlInfo
    if UpdateData:
        try:
            popdata = popBlankValue(UpdateData)
            UpdateActionInfo = updataOneColModel(SqlInfo=sql_set, update_data=popdata)
            return UpdateActionInfo
        except KeyError:
            inertActionInfo = "Erro:1001-Sql Config Dict Key Param Set Error!"
            return inertActionInfo
    else:
        UpdateActionInfo = "更新数据为空！"
        return UpdateActionInfo

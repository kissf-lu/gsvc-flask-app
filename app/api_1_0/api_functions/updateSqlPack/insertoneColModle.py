# -*- coding: utf-8 -*-


"""==============================================
该脚本用于手工维护表插入新imsi：只更新非空值
Created on 2016年6月28日
=================================================
@author: lujian
================================================="""


import os
import sys
import csv
import mysql.connector
from ..SqlPack.SQLModel import (qureResultAsJson, get_DataBaseConn)


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
    full_dir_file = os.path.join(dir_root, 'querydata', 'csvdatahuangliuqing-utf8.csv')

    try:
        with open(full_dir_file, 'r') as csvfile:
            reader = csv.DictReader(csvfile, restkey=None, restval=None)
            for row in reader:
                reader_Inser.append(row)
            print(reader_Inser[0:1])
            print("Insert Data Num：", len(reader_Inser))
            return reader_Inser
    except:
        """此处有异常返回异常结果，使程序继续执行至其余代码
"""
        print("Unexpected error:", sys.exc_info()[0])
        return False


def get_key_value_str(data, key):
    """========================================================
    返回："'a1','a2', ..."类型的字符串 方便 sql in ('')类数据查询
    :param data: 包含key数据的原始数据
    :param key: 数据键
    :return: 返回data数据对应的key值字符串
    ============================================================"""
    strResult = ""
    for i in range(len(data)):
        if i != 0:
            strResult = strResult + "','" + data[i][key]
        else:
            strResult = "".join(data[i][key])
    return "".join(["'", strResult, "'"])


def add_dickey(Json_Result, key_value):
    """============================================
    :param Json_Result:
    :param key_value:
    :return:
    ================================================"""
    if Json_Result == []:
        # print('函数传入转换字典为空[]，无转换数据！')
        return []
    for i in range(len(Json_Result)):
        try:
            Json_Result[i].update(key_value)
        except KeyError as keyerr:
            print('KeyError:', keyerr)
    return Json_Result


def JsonDataConvert(Json_Result):
    """==========================================

    :param Json_Result: list type
    :return:
    =============================================="""
    if not Json_Result:
        print('JsonDataConvert No Data Convert!!!')
        return []
    else:
        for i in range(len(Json_Result)):
            try:
                for key in Json_Result[i].keys():
                    if type(Json_Result[i][key]) is bytearray:              # byte类数据转换
                        Json_Result[i][key] = Json_Result[i][key].decode()  # 输出后进行输出结果整形

            except KeyError as Flowerkeyerr:
                print('Flowerkeyerr:', Flowerkeyerr)

        return Json_Result


def fetchUpdateDataFromSys(sql_info, update_imsi):
    """======================================================

    :param sql_info:
    :param update_imsi:
    :return:
    =========================================================="""

    N_DataStr = (
        "SELECT "
        "DISTINCT (CAST(a.`imsi` AS CHAR)) AS 'imsi' "
        ",a.`iccid` AS 'iccid' "
        ",a.`iso2` AS 'country_iso' "
        ",GROUP_CONCAT(DISTINCT b.`package_type_name` SEPARATOR ';') AS 'package_type' "
        ",b.`activate_time` AS 'activated_time' "
        ",b.`last_update_time` AS 'last_update_time' "
        ",b.`next_update_time` AS 'next_update_time' "
        ",a.`msisdn` AS 'phone_num' "
        ",a.`rat` AS 'rat' "
        ",a.`pay_type` AS 'pay_type' "
        ",a.`apn_g2` AS 'apn' "
        ",a.`create_time` AS 'shelved_time' "
        ",a.`bam_id` AS 'bam_code' "
        ",a.`slot_no` AS 'slot_num' "
        ",a.`available_status` AS 'state' "
        "FROM  `t_css_vsim` AS a  "
        "LEFT  JOIN `t_css_vsim_packages` b "
        "	ON a.`imsi`=b.`imsi` "
        "WHERE "
        "a.`slot_status`='0' AND "
        "a.`bam_status`='0' AND "
        "a.`imsi` IN  " + "(" + update_imsi + ")"
        "GROUP BY (CAST(a.`imsi` AS CHAR)) "
    )
    N_Data = qureResultAsJson(sysStr=sql_info['getUpdateData']['db'],
                              Database=sql_info['getUpdateData']['database'],
                              query_str=N_DataStr,
                              where=[])
    if N_Data:
        N_returnData = add_dickey(Json_Result=N_Data, key_value={'bu_group': 'N'})
        update_data = []
        update_data.extend(N_returnData)
        update_data = JsonDataConvert(Json_Result=update_data)
        return update_data
    else:
        return False


def mergeData(mergeKy, baseData, mergedData):
    """=========================================
    :param mergeKy:
    :param baseData:
    :param mergedData:
    :return:
    ==========================================="""
    item = mergeKy
    for md in mergedData:
        for bd in baseData:
            if str(md[item]) == str(bd[item]):
                bd.update(md)
    return baseData


def popBlankValue(popData):
    """========================================================
    该函数剔除 popData 中的所有{key: value} 中 value为空字符("")
    使插入数据的每一行都为有效数据
    :param popData: 待处理数据[{},{},{}...]
    :return:
    ============================================================"""
    if not popData:
        return False
    for i in range(len(popData)):
        popDic = []
        for dic in popData[i].keys():   # 获取第i个字典的key列表
            if popData[i][dic] == "":   # 判断是否为空字符段
                popDic.append(dic)      # 记录对应key
        for dic in popDic:              # pop 出第i 个数据中的空字段
            popData[i].pop(dic)
    return popData


def insertStrMake(databaseTable, insertData):
    """======================================
    完成插入SQL语句组合
    databaseTable:插入数据库表单名
    insertData：更新数据
    =========================================="""
    if 'imsi' not in insertData.keys():
            insertStrInfo = {"err": True, "errInfo": "存在无IMSI主键行！", "insertStr": ""}
            return insertStrInfo
    else:
        dicList = list(insertData.keys())
        dicList.remove('imsi')
        index = "imsi"                                              # 插入主键定义
        insertHeadStr = "INSERT INTO  `" + databaseTable + "`  "
        insertColumStr = ""
        insertValueStr = ""
        for j in range(len(dicList)):
            if j == (len(dicList) - 1):
                Columtemp = dicList[j] + " "
                Valuetemp = "%(" + dicList[j] + ")s "
            else:
                Columtemp = dicList[j]+", "
                Valuetemp = "%(" + dicList[j] + ")s, "
            insertColumStr = insertColumStr + Columtemp
            insertValueStr = insertValueStr + Valuetemp
        insertColumStr = "(" + index + ", " + insertColumStr + ") "
        insertValueStr = "VALUES(%(" + index + ")s, " + insertValueStr + ") "
        insertStr = (insertHeadStr + insertColumStr + insertValueStr)
        insertStrInfo = {"err": False, "errInfo": "", "insertStr": insertStr}
        return insertStrInfo


def insertOneColModel(sql_info, insertData):
    """========================================

    :param sql_info:
    :param insertData:
    :return:
    ============================================"""
    errInfo = ''
    try:
        cnx = get_DataBaseConn(sysSql=sql_info['insertDB']['db'], Database=sql_info['insertDB']['database'])
        cursor = cnx.cursor()
        # --------------------------------------制作mysql更新语句----------------------------------------------
        for i in range(len(insertData)):
            insertAction = insertStrMake(sql_info['insertDB']['sheet'], insertData[i])
            if insertAction["err"]:
                cursor.close()
                cnx.close()
                errInfo = insertAction["errInfo"]
                return errInfo
            else:
                # --------------提交更新字段------------------------------
                insert_value = insertData[i]
                insert_section = insertAction["insertStr"]
                cursor.execute(insert_section, insert_value)
        cnx.commit()
        cursor.close()
        cnx.close()
    except mysql.connector.Error as err:
        errInfo = "Something went wrong: {}".format(err)
        return errInfo
    return errInfo


def insertModel(SqlInfo, DicData):
    """==========================================

    :param SqlInfo:
    :param DicData:
    :return:
    ============================================="""
    inser_data = DicData
    sql_set = SqlInfo
    if inser_data:
        try:
            updateIMSI = get_key_value_str(data=inser_data, key='imsi')
            SysUpdateData = fetchUpdateDataFromSys(sql_info=sql_set,
                                                   update_imsi=updateIMSI)
            if SysUpdateData:
                mgData = mergeData(mergeKy='imsi',
                                   baseData=inser_data,
                                   mergedData=SysUpdateData)
                popdata = popBlankValue(mgData)
                inertActionInfo = insertOneColModel(sql_info=sql_set, insertData=popdata)
                return inertActionInfo

            else:
                inertActionInfo = "新架构平台无卡信息数据！"
                return inertActionInfo
        except KeyError:
            inertActionInfo = "Erro:1001-Sql Config Dict Key Param Set Error!"
            return inertActionInfo
    else:
        inertActionInfo = "插入数据为空！"
        return inertActionInfo

# -*- coding: utf-8 -*-


"""==============================================
该脚本用于手工维护表插入新imsi：只更新非空值.
前期版本，插入主键限制为imsi
Created on 2016年6月28日
=================================================
@author: lujian
================================================="""


import os
import sys
import csv
import mysql.connector
from bson.objectid import ObjectId
from ..SqlPack.SQLModel import (qureResultAsJson, get_DataBaseConn)


def add_objid(Json_Result, keyobjectid):
    """
    """
    if not Json_Result:
        return []
    for i in range(len(Json_Result)):
        try:
            Json_Result[i].update({keyobjectid: str(ObjectId())})
        except KeyError as keyerr:
            print('KeyError:', keyerr)

    return Json_Result


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
    if not Json_Result:
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
    Sql = sql_info
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
    N_Data = qureResultAsJson(sysStr=Sql['db'],
                              Database=Sql['database'],
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


def insertStrMake(databaseTable, insertData, insert_key):
    """======================================
    完成插入SQL语句组合
    databaseTable:插入数据库表单名
    insertData：更新数据
    =========================================="""
    key_insert = insert_key
    if key_insert not in insertData.keys():
            insertStrInfo = {"err": True, "errInfo": "存在无主键行！", "insertStr": ""}
            return insertStrInfo
    else:
        dicList = list(insertData.keys())
        dicList.remove(key_insert)
        index = key_insert                                              # 插入主键定义
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


def insertOneColModel(sql_info, insert_data, insert_key):
    """===============================================

    :param sql_info: 数据格式{"db": "config_DevAmz",
                             "database": "devdatabase",
                             "sheet": "vsim_test_info"}
    :param insert_data: Insert Data to insert database
    :param insert_key: type string
    ===================================================
    :return:
    ======================================================================================"""
    Sql = sql_info
    InsertData = insert_data
    InsertKey = insert_key
    errInfo = ''
    try:
        cnx = get_DataBaseConn(sysSql=Sql['db'], Database=Sql['database'])
        cursor = cnx.cursor()
        # 制作mysql更新语句
        for i in range(len(InsertData)):
            insertAction = insertStrMake(Sql['sheet'], InsertData[i], InsertKey)
            if insertAction["err"]:
                cursor.close()
                cnx.close()
                errInfo = insertAction["errInfo"]
                return errInfo
            else:
                # 提交更新字段
                insert_value = InsertData[i]
                insert_section = insertAction["insertStr"]
                cursor.execute(insert_section, insert_value)
        cnx.commit()
        cursor.close()
        cnx.close()
    except mysql.connector.Error as err:
        errInfo = "Something went wrong: {}".format(err)
        return errInfo
    return errInfo


def insertFetchSRCModel(sql_info, dic_data, key_dic):
    """==========================================
    用于插入主键为imsi
    :param sql_info: 包括插入数据库和资源更新数据库：
    "InsertManuleVsimSrc": {
        "insertDB": {"db": "config_DevAmz", "database": "devdatabase", "sheet": "vsim_manual_infor"},
        "getUpdateData": {"db": "config_N", "database": "glocalme_css"}}

    :param dic_data: 待导入批量数据
    :param key_dic:
    ====================================================================================================
    :return:
    ===================================================================================================="""
    inser_data = dic_data
    sql_set = sql_info
    KeyDic = key_dic
    if inser_data:
        try:
            updateIMSI = get_key_value_str(data=inser_data, key=KeyDic['insert'])
            SysUpdateData = fetchUpdateDataFromSys(sql_info=sql_set['getUpdateData'],
                                                   update_imsi=updateIMSI)
            if SysUpdateData:
                mgData = mergeData(mergeKy=KeyDic['merge'],   # 合并原始数据和资源数据
                                   baseData=inser_data,
                                   mergedData=SysUpdateData)
                popdata = popBlankValue(mgData)
                inertActionInfo = insertOneColModel(sql_info=sql_set['insertDB'],
                                                    insert_data=popdata,
                                                    insert_key=KeyDic['insert'])
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


def insertModel(sql_info, dic_data, insert_key):
    """==========================================

    :param sql_info: 数据库连接信息
                   type:{"db": "config_DevAmz",
                   "database": "devdatabase",
                   "sheet": "vsim_test_info"}
    :param dic_data:
    :param insert_key:
    =============================================
    :return:
    ============================================="""
    inser_data = dic_data
    Sql = sql_info
    InsertKey = insert_key
    if inser_data:
        try:
            # updateIMSI = get_key_value_str(data=inser_data, key=InsertKey)
            addObjectIDData = add_objid(Json_Result=inser_data, keyobjectid=InsertKey)
            if addObjectIDData:
                popdata = popBlankValue(addObjectIDData)
                inertActionInfo = insertOneColModel(sql_info=Sql, insert_data=popdata, insert_key=InsertKey)
                return inertActionInfo

            else:
                inertActionInfo = "插入数据异常！"
                return inertActionInfo
        except KeyError:
            inertActionInfo = "Erro:1001-Sql Config Dict Key Param Set Error!"
            return inertActionInfo
    else:
        inertActionInfo = "插入数据为空！"
        return inertActionInfo

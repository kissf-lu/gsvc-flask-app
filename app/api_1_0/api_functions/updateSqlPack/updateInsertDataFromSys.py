#coding=utf-8
#!/usr/bin/env python
'''
Created on 2016年6月28日

@author: lujian
'''

import os
import sys
import csv
from ..SqlPack.SQLModel import qureResultAsJson,get_DataBaseConn


def get_dic_value_str(data,dic):
    """
    返回："'a1','a2', ..."类型的字符串
    """
    strResult = ""
    for i in range(len(data)):
        if i!=0:
            strResult=strResult+"','"+data[i][dic]
        else:
            strResult="".join(data[i][dic])
    return "".join(["'",strResult,"'"])


def add_dickey(Json_Result,key_value):
    """
    """
    hour_day_mouth_add = []

    if Json_Result == []:
        print('函数传入转换字典为空[]，无转换数据！')
        return []
    for i in range(len(Json_Result)):
        temp_dic = {}
        try:
            Json_Result[i].update(key_value)
        except KeyError as keyerr:
            print('KeyError:',keyerr)
    return Json_Result


def fetchImsiFromAMZ():
        """
"""
        queryStr="SELECT DISTINCT `imsi` FROM `vsim_manual_infor` WHERE `iccid` IS NULL OR `state` IS NULL"
        amz_Data=qureResultAsJson(sysStr='config_localamiccuser',
                                  Database='gsvcdatabase',
                                  query_str=queryStr,
                                  where=[])
        print("总计imsi:",len(amz_Data),"\n")
        if len(amz_Data)==0:
                print("无更新imsi清单，无结果")
                return False
        else:
            return amz_Data

def JsonDataConvert(Json_Result):
    """
    """
    if Json_Result ==[]:
        print('JsonDataConvert No Data Convert!!!')
        return []
    else:
        for i in range(len((Json_Result))):
            try:
                for key in Json_Result[i].keys():
                    if type(Json_Result[i][key]) is bytearray:#byte类数据转换
                        Json_Result[i][key] = Json_Result[i][key].decode()#输出后进行输出结果整形

            except KeyError as Flowerkeyerr:
                print('Flowerkeyerr:',Flowerkeyerr)
        print("数据转换完成")
        return Json_Result


def fetchupdateDataFromNS(update_imsi):
    """

    :param update_imsi:
    :return:
    """

    N_DataStr=("SELECT "
    "DISTINCT a.`imsi` AS 'imsi' "
    ",a.`iccid` AS 'iccid' "
    ",a.`iso2` AS 'country_iso' "
    ",GROUP_CONCAT(DISTINCT b.`package_type_name` SEPARATOR ';') AS 'package_type' "
    ",b.`activate_time` AS 'activated_time' "
    ",b.`last_update_time` AS 'last_update_time' "
    ",b.`next_update_time` AS 'next_update_time' "
    ",a.`msisdn` AS 'phone_num' "
    ",a.`rat` AS 'rat' "
    ",a.`pay_type` AS 'pay_type' "
    ",a.`apn_g1` AS 'apn' "
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
    "a.`imsi` IN  " +"("+update_imsi+")"
"GROUP BY a.`imsi` ")
    N_Data=qureResultAsJson(sysStr='config_N',Database='glocalme_css',query_str=N_DataStr,where=[])
    N_returnData=[]
    if N_Data==[]:
        print("新架构无更新记录！")
    else:
        N_returnData=add_dickey(Json_Result=N_Data,key_value={'bu_group':'N'})

    if (N_Data!=[] ):
        update_data=[]
        update_data.extend(N_returnData)
        update_data=JsonDataConvert(Json_Result=update_data)
        print("总计更新数据：", len(update_data))
        return update_data
    else:
        return False

def updateModel(sql_update_data):
    print("更新数据长度：",len(sql_update_data))
    cnx=get_DataBaseConn(sysSql='config_localamiccuser',Database='gsvcdatabase')
    cursor = cnx.cursor()
    for i in range(len(sql_update_data)):
        updateStr=("UPDATE `vsim_manual_infor` "
                   "SET country_iso=%s, "
                        "iccid=%s, "
                        "package_type=%s, "
			"activated_time=%s, "
			"last_update_time=%s, "
			"next_update_time=%s, "
			"phone_num=%s, "
			"rat=%s, "
			"pay_type=%s, "
			"apn=%s, "
			"shelved_time=%s, "
                        "bu_group=%s, "
                        "bam_code=%s, "
                        "slot_num=%s, "
                        "state=%s "
		    "WHERE imsi=%s "
		    )
        value=(sql_update_data[i]['country_iso'],
		       sql_update_data[i]['iccid'],
			   sql_update_data[i]['package_type'],
			   sql_update_data[i]['activated_time'],
			   sql_update_data[i]['last_update_time'],
			   sql_update_data[i]['next_update_time'],
			   sql_update_data[i]['phone_num'],
			   sql_update_data[i]['rat'],
			   sql_update_data[i]['pay_type'],
			   sql_update_data[i]['apn'],
			   sql_update_data[i]['shelved_time'],
                           sql_update_data[i]['bu_group'],
                           sql_update_data[i]['bam_code'],
                           sql_update_data[i]['slot_num'],
                           sql_update_data[i]['state'],
			   sql_update_data[i]['imsi'])
        cursor.execute(updateStr,value)
        #updateSQLData(sysStr='config_amzlocal',Database='gsvcdatabase',updateStr=updateStr,value=value)
    commit=cnx.commit()
    cursor.close()
    cnx.close()
    print("更新数据结束！",commit)

def updateDataFromSys(updateStrIMSI):
    """

    :param updateData: 外部待更新数据
    :return:
    """


# -*- coding: utf-8 -*-

import json
from bson import json_util
from SqlPack.SQLModel import qureResultAsJson
import decimal
import mysql.connector


def getJosonData(sysStr, Database, query_str):


    jsonResults = qureResultAsJson(sysStr=sysStr,
                                   Database=Database,
                                   query_str=query_str,
                                   where=[])
    return jsonResults


def mergeData(sourData,mergeData,mergekey,mergeindex):
    """

    :param sourData: 基表
    :param mergeData: 待合并表
    :param mergekey: 聚合主键
    :param mergeindex: 聚合结果项
    :return: 返回合并表单sourData
    """
    havemeragenum = []
    for i in range(len(sourData)):
        premergeData = {}
        for j in range(len(mergeData)):
            ifmerge = True
            if j in havemeragenum:
                continue
            for key in mergekey:
                if (key in sourData[i].keys()) and (key in mergeData[j].keys()):
                    if sourData[i][key] == mergeData[j][key]:
                        continue
                    else:
                        ifmerge=False
                        break

            if ifmerge:
                havemeragenum.extend([j])#核实相同后记录核实行
                for key in mergeindex:
                    if key in mergeData[j].keys():
                        premergeData.update({key: mergeData[j][key]})
                break

        if premergeData != {}:
            sourData[i].update(premergeData)
    return sourData


def qureyScountrySrcCon(sysDatabases, Database, country):
    """
    :param sysDatabases:
    :param Database:
    :param country:
    :return:
    """
    query_str=("SELECT  "
               "a.`country_code2`AS 'country', "
               "r.`name` AS 'operator', "
               "c.`name` AS 'package_type_name', "
               "DATE_FORMAT(a.`updatedate`,'%Y-%m-%d') AS 'next_update_time', "
               "COUNT(1) AS 'on_shelf_num', "
               "COUNT(CASE WHEN  "
               " a.`state`='00000' OR a.`state`='10000' THEN 1 END )AS 'ava_num', "
               "COUNT(CASE WHEN a.`state`='00100'       THEN 2 END )AS 'business_stope', "
               "COUNT(CASE WHEN a.`state`='00200'       THEN 3 END )AS 'business_prestop', "
               "COUNT(CASE WHEN a.`state`='00300'       THEN 4 END )AS 'business_lessflower', "
               "COUNT(CASE WHEN a.`state`='00400'       THEN 5 END )AS 'business_pending', "
               "COUNT(CASE WHEN a.`isactivate` = 0      THEN 6 END )AS 'unactivate', "
               "(CASE WHEN 1 THEN 'S' END) AS 'sys' "
               "FROM `t_resvsim` AS a "
               "LEFT JOIN `t_resvsimpackagetype`AS c ON c.`itemid`=a.`packagetype` "
               "LEFT JOIN `t_resvsimowner`AS e ON e.`sourceid`=a.`imsi` "
               "LEFT JOIN `t_resoperator` AS r ON r.`code`=a.`sid` "
               "LEFT JOIN `t_usmguser_parent`   AS f    ON f.`uid`=e.`ownerid`  "
               "WHERE a.`state` LIKE '_0__0'  AND a.`country_code2`=" + "'" + country + "'"
               "GROUP BY a.`country_code2`,r.`name`,c.`name`,DATE_FORMAT(a.`updatedate`,'%Y-%m-%d') ")
    WHERE = []
    try:
        qurey_result = getJosonData(sysStr=sysDatabases,
                                    Database=Database,
                                    query_str=query_str)
        return qurey_result
    except KeyError as keyerr:
        print('KeyError:', keyerr, sysDatabases, "JsonKey的key与系统不一致")


def qureyYcountrySrcCon(sysDatabases, Database, country):
    """
    :param sysDatabases:
    :param Database:
    :param country:
    :return:
    """
    query_str = ("SELECT  "
               "a.`country_code2`AS 'country', "
               "r.`name` AS 'operator', "
               "c.`name` AS 'package_type_name', "
               "DATE_FORMAT(a.`updatedate`,'%Y-%m-%d') AS 'next_update_time', "
               "COUNT(1) AS 'on_shelf_num', "
               "COUNT(CASE WHEN  "
               " a.`state`='00000' OR a.`state`='10000' THEN 1 END )AS 'ava_num', "
               "COUNT(CASE WHEN a.`state`='00100'       THEN 2 END )AS 'business_stope', "
               "COUNT(CASE WHEN a.`state`='00200'       THEN 3 END )AS 'business_prestop', "
               "COUNT(CASE WHEN a.`state`='00300'       THEN 4 END )AS 'business_lessflower', "
               "COUNT(CASE WHEN a.`state`='00400'       THEN 5 END )AS 'business_pending', "
               "COUNT(CASE WHEN a.`isactivate` = 0      THEN 6 END )AS 'unactivate', "
               "(CASE WHEN 1 THEN 'Y' END) AS 'sys' "
               "FROM `t_resvsim` AS a "
               "LEFT JOIN `t_resvsimpackagetype`AS c ON c.`itemid`=a.`packagetype` "
               "LEFT JOIN `t_resvsimowner`AS e ON e.`sourceid`=a.`imsi` "
               "LEFT JOIN `t_resoperator` AS r ON r.`code`=a.`sid` "
               "LEFT JOIN `t_usmguser_parent`   AS f    ON f.`uid`=e.`ownerid`  "
               "WHERE a.`state` LIKE '_0__0'  AND a.`country_code2`=" + "'" + country + "'"
               "GROUP BY a.`country_code2`,r.`name`,c.`name`,DATE_FORMAT(a.`updatedate`,'%Y-%m-%d') ")
    try:
        qurey_result = getJosonData(sysStr=sysDatabases,
                                    Database=Database,
                                    query_str=query_str)
        return qurey_result
    except KeyError as keyerr:
        print('KeyError:', keyerr, sysDatabases, "JsonKey的key与系统不一致")


def qureyGSVCcountrySrcCon(sysDatabases, Database, country):
    """
    :param sysDatabases:
    :param Database:
    :param country:
    :return:
    """
    query_str = ("SELECT  "
               "(CASE WHEN a.`bu_group`='N' THEN 'GTBU' WHEN a.`bu_group`='S' THEN 'S' WHEN a.`bu_group`='Y' THEN 'Y' END ) AS 'sys',  "
               "a.`country_iso` AS 'country', "
               "a.`package_type` AS 'package_type_name', "
               "DATE_FORMAT(a.`next_update_time`,'%Y-%m-%d') AS 'next_update_time', "
               "a.`person_gsvc`, "
               "a.`person_operator`,"
               "COUNT(`imsi`) AS 'on_manual_num' "
               "FROM `vsim_manual_infor` AS a "
               "WHERE a.`iccid` IS NOT NULL AND a.`country_iso`=" + "'" + country + "'"
               "GROUP BY(CASE WHEN a.`bu_group`='N' THEN 'GTBU' WHEN a.`bu_group`='S' THEN 'S' WHEN a.`bu_group`='Y' THEN 'Y' END ), "
               "        a.`country_iso`, "
               "        a.`package_type`, "
               "        DATE_FORMAT(a.`next_update_time`,'%Y-%m-%d') ")

#   qureResultAsJson(sysStr,Database,query_str,select_name,where):
    try:
        # getJosonData(sysStr, Database, query_str)
        qurey_result = getJosonData(sysStr=sysDatabases,
                                    Database=Database,
                                    query_str=query_str)
        return qurey_result
    except KeyError as keyerr:
        print('KeyError:', keyerr, sysDatabases, "JsonKey的key与系统不一致")


def qureyNcountrySrcCon(sysDatabases, Database, country):
    """
    :param sysDatabases:
    :param Database:
    :param country:
    :return:
    """

    sql_country = country
    countrySet=''
    errInfo = ''
    qurey_result = []
    if (sql_country !=''):
        countrySet="AND a.`iso2` = '" + sql_country + "' "
    query_str=(
        "(SELECT "
        "a.`iso2`              AS 'Country', "
        "CASE WHEN 1 THEN concat('1-合计-',a.`iso2`,'-',e.`org_name` ) END  AS 'PackageName', "
        "CASE WHEN 1 THEN '' END  AS 'NextUpdateTime', "
        "CASE WHEN e.`org_name` is null THEN '总计' else e.`org_name` END  AS 'ORG', "
        "COUNT(DISTINCT a.`imsi`) AS 'all_num', "
        "COUNT(CASE WHEN a.`activate_status` = 1 THEN 'unactivatenum' END) AS 'unact_num', "
        "COUNT(CASE WHEN ((a.`available_status` = '0') AND b.`next_update_time` IS NOT NULL AND b.`next_update_time` > DATE(NOW())) THEN '可用卡数' END) AS 'ava_num', "
        "CASE WHEN 1 THEN '' END AS 'WarningFlow', "
        "CAST(SUM(CASE WHEN `activate_status` = 0 THEN b.`init_flow` ELSE 0 END )/1024/1024/1024 AS DECIMAL(64,1))AS 'TotalFlower', "
        "CAST(SUM(b.`total_use_flow`)/1024/1024/1024 AS DECIMAL(64,1)) AS 'UsedFlower', "
        "CAST(SUM(b.`leave_flow`)/1024/1024/1024 AS DECIMAL(64,1))    AS 'LeftFlower', "
        "CAST((SUM(b.`total_use_flow`)/SUM(CASE WHEN `activate_status` = 0 THEN b.`init_flow` ELSE 0 END ))*100  AS DECIMAL(64,1)) AS 'Percentage' "
        "FROM `t_css_vsim` AS a "
        "LEFT  JOIN `t_css_vsim_packages` AS b  ON a.`imsi`= b.`imsi` "
        "LEFT  JOIN `t_css_group`         AS e  ON a.`group_id`= e.`id` "
        "LEFT  JOIN `t_css_package_type`  AS c  ON c.`id` = b.`package_type_id` "
        "WHERE   a.`bam_status` = '0' "
        "        AND a.`slot_status` = '0'  " + countrySet + " "
        "        AND b.`package_type_name` IS NOT NULL "
        "        AND b.`init_flow` is not null "
        "GROUP BY a.`iso2`,e.`org_name` "
        ") "
        "union "
        "( "
        "SELECT "
        "a.`iso2`              AS 'Country', "
        "b.`package_type_name` AS 'PackageName', "
        "DATE_FORMAT(b.`next_update_time`,'%Y-%m-%d %H')  AS 'NextUpdateTime', "
        "e.`org_name`          AS 'ORG', "
        "COUNT(DISTINCT a.`imsi`) AS 'all_num', "
        "COUNT(CASE WHEN a.`activate_status` = 1 THEN 'unactivatenum' END) AS 'unact_num', "
        "COUNT(CASE WHEN ((a.`available_status` = '0') AND b.`next_update_time` IS NOT NULL AND b.`next_update_time` > DATE(NOW())) THEN '可用卡数' END) AS 'ava_num', "
        "CAST(c.`warning_flow`/1024/1024 AS UNSIGNED) AS 'warning_flow', "
        "CAST(SUM(CASE WHEN `activate_status` = 0 THEN b.`init_flow` ELSE 0 END )/1024/1024/1024 AS DECIMAL(64,1))AS 'TotalFlower', "
        "CAST(SUM(b.`total_use_flow`)/1024/1024/1024 AS DECIMAL(64,1)) AS 'UsedFlower', "
        "CAST(SUM(b.`leave_flow`)/1024/1024/1024 AS DECIMAL(64,1))    AS 'LeftFlower', "
        "CAST((SUM(b.`total_use_flow`)/SUM(CASE WHEN `activate_status` = 0 THEN b.`init_flow` ELSE 0 END ))*100  AS DECIMAL(64,1)) AS 'Percentage' "
        "FROM `t_css_vsim` AS a "
        "LEFT  JOIN `t_css_vsim_packages` AS b  ON a.`imsi`= b.`imsi` "
        "LEFT  JOIN `t_css_group`         AS e  ON a.`group_id`= e.`id` "
        "LEFT  JOIN `t_css_package_type`  AS c  ON c.`id` = b.`package_type_id` "
        "WHERE   a.`bam_status` = '0' "
        "        AND a.`slot_status` = '0'  " + countrySet + " "
        "        AND b.`package_type_name` IS NOT NULL "
        "        AND b.`init_flow` is not null "
        "GROUP BY a.`iso2`,b.`package_type_name`,DATE_FORMAT(b.`next_update_time`,'%Y-%m-%d %H'), e.`org_name` "
        ") "
        "ORDER BY `Country`, `PackageName`, `ORG` "
    )
    try:
        qurey_result = getJosonData(sysStr=sysDatabases,
                                    Database=Database,
                                    query_str=query_str)

    except KeyError as keyerr:
        errInfo = ("KeyError:{}".format(keyerr))
    except mysql.connector.Error as err:
        errInfo = ("Something went wrong: {}".format(err))
    if errInfo != '':
        DicResults = {'info': {'err': True, 'errinfo': errInfo}, 'data': []}
        return DicResults
    else:
        if qurey_result == []:
            DicResults = {'info': {'err': False, 'errinfo': "No Query Data"}, 'data': []}
            return DicResults
        else:
            for cs in qurey_result:
                if type(cs['TotalFlower']) is decimal.Decimal:
                    cs['TotalFlower'] = float(cs['TotalFlower'])
                if type(cs['UsedFlower']) is decimal.Decimal:
                    cs['UsedFlower'] = float(cs['UsedFlower'])
                if type(cs['LeftFlower']) is decimal.Decimal:
                    cs['LeftFlower'] = float(cs['LeftFlower'])
                if type(cs['Percentage']) is decimal.Decimal:
                    cs['Percentage'] = float(cs['Percentage'])

            DicResults = {'info': {'err': False, 'errinfo': errInfo}, 'data': qurey_result}

            return DicResults



def qurycountrySrcCon(country):
    """
    国家概述面板 ， 新架构分机构卡资源统计 表格对应接口函数
    国家套餐更新日期可用卡数等信息统计接口
    :param country:
    :return:
    """

    # ("统计新架构卡资源：---------------------------------------------------")
    N_countrySrcCon = qureyNcountrySrcCon(sysDatabases='config_N',
                                          Database='glocalme_css',
                                          country=country)

    return json.dumps(N_countrySrcCon, sort_keys=True, indent=4, default=json_util.default)






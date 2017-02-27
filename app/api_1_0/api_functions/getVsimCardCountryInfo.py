#!/usr/bin/env python
# -*- coding: utf-8 -*-

import json
from bson import json_util
from SqlPack.SQLModel import qureResultAsJson

S_sysStr = 'config_S'
S_Database = 'ucloudplatform'
N_sysStr = 'config_N'
N_Database = 'glocalme_css'
amzami_sysStr = 'config_amzami'
amzami_Database = 'gsvcdatabase'


def getJosonData(sysStr, Database, query_str):


    jsonResults = qureResultAsJson(sysStr=sysStr,
                                   Database=Database,
                                   query_str=query_str,
                                   where=[])
    return jsonResults


def getNVsimCountryStatic(country):
    """

    :return:
    """
    queryCoutry = country

    if queryCoutry == "":
        where = ""
    else:
        where = "AND `iso2`=" + "'" + queryCoutry + "' "

    query_str_vsim = ("SELECT "
                      "a.`iso2` AS 'country', "
                      "COUNT(1) AS 'all_num', "
                      "COUNT(CASE WHEN (a.`available_status`=0 "
                      "                 AND b.`package_status`<>2 "
                      "                 AND a.`business_status`IN('0','4','5') "
                      "                 AND c.`pool_id` IS NOT NULL "
                      "                 AND a.`expire_time`>=NOW() "
                      "                 AND b.`expire_time`>=NOW()) "
                      "           THEN '0' "
                      "      END) AS 'available_num', "
                      "   COUNT(CASE WHEN a.`available_status`=0 "
                      "               AND b.`package_status`<>2 "
                      "               AND a.`business_status`IN('0','4','5') "
                      "               AND c.`pool_id` IS NOT NULL "
                      "               AND a.`expire_time`>=NOW() "
                      "               AND b.`expire_time`>=NOW() "
                      "               AND a.`occupy_status`=0 "
                      "               THEN '1' "
                      "         END) AS 'unoccupy_num' "
                      "FROM `t_css_vsim`AS a "
                      "LEFT  JOIN `t_css_vsim_packages` b "
                      "      ON a.`imsi`=b.`imsi` "
                      "LEFT JOIN `t_css_v_pool_map` AS c "
                      "       ON c.`vsim_id`=a.`id` "
                      "WHERE "
                      "   (b.`package_type_name` NOT  REGEXP '.*[0-9]国.*') " + where + " "
                      "   AND a.`bam_status`=0 "
                      "   AND a.`slot_status`=0 "
                      "   AND a.`vsim_type` = 0 "
                      "   AND a.`dr`=0   "
                      "GROUP BY a.`iso2` "
                      "ORDER BY COUNT(DISTINCT a.`imsi`) DESC ")
    jsonResults_Nvsim = getJosonData(sysStr=N_sysStr, Database=N_Database, query_str=query_str_vsim)


    return jsonResults_Nvsim


def getSVsimCountryStatic(country):
    """

    :return:
    """

    queryCoutry = country


    if queryCoutry == "":
        where = ""
    else:
        where = "AND a.`country_code2`=" + "'" + queryCoutry + "' "

    query_str_vsim = ("SELECT  "
                      "a.`country_code2`AS 'country', "
                      "COUNT(1) AS 'all_num', "
                      "COUNT(CASE WHEN a.`state`='00000' OR a.`state`='10000' THEN 1 END )AS 'available_num', "
                      "COUNT(CASE WHEN a.`state`='00000'                      THEN 2 END )AS 'unoccupy_num' "
                      "FROM `t_resvsim` AS a "
                      "LEFT JOIN `t_resvsimpackagetype`AS c ON c.`itemid`=a.`packagetype` "
                      "LEFT JOIN `t_resvsimowner`AS e ON e.`sourceid`=a.`imsi` "
                      "WHERE a.`state` LIKE '_0__0' AND (c.`name` NOT  REGEXP '.*[0-9]国.*') AND e.`sourceid` IS NULL " + where + " "
                      "GROUP BY a.`country_code2`")
    jsonResults_Svsim = getJosonData(sysStr=S_sysStr, Database=S_Database, query_str=query_str_vsim)

    return jsonResults_Svsim


def getNVsimPackageflowStatus(country):
    """

    :return:
    """
    queryCoutry = country
    if queryCoutry == "":
        where = ""
    else:
        where = "AND `iso2`=" + "'" + queryCoutry + "' "

    query_str_flow = ("SELECT  "
                      "   b.`package_type_name` AS 'package_name', "
                      "   CAST(SUM(b.`init_flow`)/1024/1024/1024 AS UNSIGNED) AS 'totalflow',  "
                      "   CAST(SUM(b.`leave_flow`)/1024/1024/1024 AS UNSIGNED) AS 'totalleaveflow'  "
                      "FROM `t_css_vsim`AS a  "
                      "LEFT  JOIN `t_css_vsim_packages` b "
                      "	ON a.`imsi`=b.`imsi`  "
                      "WHERE  "
                      "   a.`bam_status`=0  "
                      "   AND a.`slot_status`=0   "
                      "   AND (b.`package_type_name` IS NOT NULL) "+ where + " "
                      "GROUP BY b.`package_type_name` "
                      "ORDER BY CAST(SUM(b.`init_flow`)/1024/1024/1024 AS UNSIGNED) DESC  ")

    NVsimPackageflowStatus = getJosonData(sysStr=N_sysStr, Database=N_Database, query_str=query_str_flow)


    return NVsimPackageflowStatus


def getSVsimPackageflowStatus(country):
    """

    :return:
    """
    queryCoutry = country
    if queryCoutry == "":
        where = ""
    else:
        where = "AND a.`country_code2`=" + "'" + queryCoutry + "' "

    query_str_flow = ("SELECT  "
                      "c.`name` AS 'package_name', "
                      "CAST(SUM(c.`flowsize`)/1024 AS UNSIGNED) AS 'totalflow', "
                      "CAST(SUM(b.`packagesizeavaiable`)/1024/1024/1024 AS UNSIGNED) AS 'totalleaveflow' "
                      "FROM `t_resvsim` AS a "
                      "LEFT JOIN `t_resvsimdispatcher` AS b ON b.`imsi`=a.`imsi` "
                      "LEFT JOIN `t_resvsimpackagetype`AS c ON c.`itemid`=a.`packagetype` "
                      "LEFT JOIN `t_resvsimowner`AS e ON e.`sourceid`=a.`imsi`  "
                      "WHERE  a.`state`LIKE '_0__0' "
                             "AND (c.`name` NOT  REGEXP '.*[0-9]国.*') "
                             "AND e.`sourceid` IS NULL " + where + " "
                      "GROUP BY c.`name` "
                      "ORDER BY CAST(SUM(c.`flowsize`)/1024 AS UNSIGNED) DESC ")
    SVsimPackageflowStatus = getJosonData(sysStr=S_sysStr, Database=S_Database, query_str=query_str_flow)

    return SVsimPackageflowStatus



def getVsimCountryStatic(country,**kwargs):
    """

    :param country: 按国家进行数据统计
    :param kwargs: 后续根据需求变化增加变量
    :return:
    """
    queryCoutry = country


    #jsonResults_Nvsim = getNVsimCountryStatic(country=queryCoutry)
    #jsonResults_Svsim = []#getSVsimCountryStatic(country=queryCoutry)
    #jsonResults_vsim ={"N":jsonResults_Nvsim, "S":jsonResults_Svsim}

    jsonResults_NVsimPackageflowStatus = getNVsimPackageflowStatus(country=queryCoutry)
    #jsonResults_SVsimPackageflowStatus = []#getSVsimPackageflowStatus(country=queryCoutry)
    jsonResults_VsimPackageflowStatus = {"N":jsonResults_NVsimPackageflowStatus}


    JsonRow = {"country": {"VsimPackageflowStatus": jsonResults_VsimPackageflowStatus}}
    return json.dumps(JsonRow, sort_keys=True, indent=4, default=json_util.default)


def getMutiLineNonshelfandAvaCard(country):
    """
    本函数用于获取新架构在架卡状态统计数据：在架卡数、可用卡数
    :param country:
    :return:
    """
    queryCountry = country
    # (当前国家总计卡数、可用卡数数据获取------------------------------GTBU-----------------------------------------)
    query_str_N_onshelfandAvaCard = ("SELECT "
                                     "a.`iso2` AS 'country', "
                                     "COUNT(1) AS 'on_shelf_num', "
                                     "COUNT(CASE WHEN (a.`available_status`=0 "
                                     "                 AND b.`package_status`<>2 "
                                     "                 AND a.`business_status`IN('0','4','5') "
                                     "                 AND c.`pool_id` IS NOT NULL "
                                     "                 AND a.`expire_time`>=NOW() "
                                     "                 AND b.`expire_time`>=NOW()) "
                                     "           THEN '0' "
                                     "      END) AS 'ava_num' "
                                     "FROM `t_css_vsim`AS a "
                                     "LEFT  JOIN `t_css_vsim_packages` b "
                                     "      ON a.`imsi`=b.`imsi` "
                                     "LEFT JOIN `t_css_v_pool_map` AS c "
                                     "      ON c.`vsim_id`=a.`id` "
                                     "WHERE "
                                     "   (b.`package_type_name` NOT  REGEXP '.*[0-9]国.*') AND a.`iso2`=" + "'" + queryCountry + "' "
                                     "   AND a.`bam_status`=0 "
                                     "   AND a.`slot_status`=0 "
                                     "   AND a.`vsim_type` = 0 "
                                     "   AND a.`dr`=0   "
                                     "GROUP BY a.`iso2` "
                                     )
    jsonResults_N_onshelfandAvaCard = getJosonData(sysStr=N_sysStr,
                                                   Database=N_Database,
                                                   query_str=query_str_N_onshelfandAvaCard)
    return jsonResults_N_onshelfandAvaCard


def getMutiLineSonshelfandAvaCard(country):
    """
    本函数用于获取老系统在架卡状态统计数据：在架卡数、可用卡数
    :param country:
    :return:
    """
    queryCountry = country
    # (当前国家总计卡数、可用卡数数据获取------------------------------S-----------------------------------------)
    query_str_S_onshelfandAvaCard = ("SELECT  "
                                     "a.`country_code2`AS 'country', "
                                     "COUNT(1) AS 'on_shelf_num', "
                                     "COUNT(CASE WHEN  "
                                     " a.`state`='00000' OR a.`state`='10000' THEN 1 END )AS 'ava_num' "
                                     "FROM `t_resvsim` AS a "
                                     "LEFT JOIN `t_resvsimpackagetype`AS c ON c.`itemid`=a.`packagetype` "
                                     "LEFT JOIN `t_resvsimowner`AS e ON e.`sourceid`=a.`imsi` "
                                     "LEFT JOIN `t_resoperator` AS r ON r.`code`=a.`sid` "
                                     "LEFT JOIN `t_usmguser_parent`   AS f    ON f.`uid`=e.`ownerid`  "
                                     "WHERE a.`state` LIKE '_0__0' "  # 在板卡条件
                                     "AND e.`sourceid` IS NULL  "  # 是否代理商卡判断，NULL非代理商卡
                                     "AND (c.`name` NOT  REGEXP '.*[0-9]国.*') "
                                     "AND a.`country_code2`=" + "'" + queryCountry + "'"
                                     "GROUP BY a.`country_code2` ")

    jsonResults_S_onshelfandAvaCard = getJosonData(sysStr=S_sysStr,
                                                   Database=S_Database,
                                                   query_str=query_str_S_onshelfandAvaCard)
    return jsonResults_S_onshelfandAvaCard


def getMutiLineMaxUser(country,begintime,endtime,butype_set,timedim_set):
    """

    :param country:
    :param kwargs:
    :return:
    """
    queryCountry = country
    queryBeginTime = begintime
    queryEndTime = endtime
    butype_set = butype_set
    timedim_set = timedim_set


    query_str_MaxUser = (
        "SELECT b.country,DATE_FORMAT(b.sampletime, " + timedim_set + ") AS sampletime , MAX(b.onlinemax) AS onlinemax "
        "FROM ( "
        "SELECT a.`country`, a.`createtime` AS sampletime, CAST(SUM(a.`onlinemax`) AS UNSIGNED) AS onlinemax "
        "FROM `gsvcdatabase`.`max_onlingusr_hour` AS a "
        "WHERE a.`country`= " + "'" + queryCountry + "' "
        "      AND a.`createtime`>= " + "'" + queryBeginTime + "' " + "AND a.`createtime`<" + "'" + queryEndTime + "' "
        "   " + butype_set +
        "GROUP BY a.`country`, a.`createtime` ) AS b "
        "GROUP BY b.country ,DATE_FORMAT(b.sampletime, " + timedim_set + ")")

    jsonResults_MaxUser = getJosonData(sysStr=amzami_sysStr, Database=amzami_Database, query_str=query_str_MaxUser)

    return jsonResults_MaxUser


def getindexHtmlMutiLineData(country,begintime,endtime,**kwargs):
    """
    :本部分用于获取绘制主页国家峰值曲线图数据。获取国家峰值用户、在板卡数、可用卡数统计数据
    :param country:
    :param begintime:
    :param endtime:
    :param kwargs:
    :return:
    """
    # (maxonline 曲线数据获取-----------------------------------------------------------------------------------)
    BU = ''
    butype_set = " "  # BU类型设置
    timedim_set = "'%Y-%m-%d'"  # 时间维度设置
    if 'butype' in kwargs.keys():
        butype = kwargs['butype']
        BU = kwargs['butype']
        if butype != "":
            if butype == 'GTBU':
                butype = '2'
                butype_set = butype_set + " AND a.`butype`= " + butype + " "
            elif butype == 'S':
                butype_set = butype_set + " AND a.`butype`<>'2' "

            else:
                butype_set = butype_set + " "

    if 'timedim' in kwargs.keys():
        timedim = kwargs['timedim']
        if timedim != "":
            if timedim == 'month':
                timedim_set = "'%Y-%m'"
    jsonResults_MaxUser=getMutiLineMaxUser(country=country,
                                           begintime=begintime,
                                           endtime=endtime,
                                           butype_set=butype_set,
                                           timedim_set=timedim_set)
    VsimCon=[]
    # (当前国家总计卡数、可用卡数数据获取-----------------------------------------------------------------------)
    if BU == 'ALL':
        tempData=[]
        jsonResultsGTBUonshelfandAvaCard=getMutiLineNonshelfandAvaCard(country=country)
        jsonResultsSonshelfandAvaCard=getMutiLineSonshelfandAvaCard(country=country)
        tempData={"GTBU":jsonResultsGTBUonshelfandAvaCard,"S":jsonResultsSonshelfandAvaCard}
        if tempData["GTBU"] != []:
            if tempData["S"] != []:
                for i in range(len(tempData["GTBU"])):
                    for j in range(len(tempData["S"])):
                        sumData=[]
                        sumData=[{"on_shelf_num":(tempData["GTBU"][i]["on_shelf_num"]+tempData["S"][i]["on_shelf_num"]),
                                  "ava_num":(tempData["GTBU"][i]["ava_num"]+tempData["S"][i]["ava_num"])}]
                        VsimCon={"ALL":sumData}
            else:
                VsimCon = {"ALL": tempData["GTBU"]}
        else:
            if tempData["S"] != []:
                VsimCon = {"ALL": tempData["S"]}
            else:
                VsimCon = {"ALL": []}

    elif BU == 'GTBU':
        jsonResultsGTBUonshelfandAvaCard = getMutiLineNonshelfandAvaCard(country=country)
        VsimCon = {"GTBU": jsonResultsGTBUonshelfandAvaCard}
    else:
        jsonResultsSonshelfandAvaCard = getMutiLineSonshelfandAvaCard(country=country)
        VsimCon = {"S": jsonResultsSonshelfandAvaCard}

    conData=VsimCon[BU]

    JsonRow_MaxUser = {"maxuser": jsonResults_MaxUser,
                       "con":conData
                       }

    return json.dumps(JsonRow_MaxUser, sort_keys=True, indent=4, default=json_util.default)
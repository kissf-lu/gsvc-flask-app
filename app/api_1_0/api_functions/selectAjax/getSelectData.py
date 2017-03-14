# -*- coding: utf-8 -*-

# import sys
import json
from bson import json_util
import mysql.connector
from ..SqlPack.SQLModel import qureResultAsJson
from ..SqlPack.SqlLinkInfo import selectAjax as Sql

str_sql = Sql['getSelectData']


def getJosonData(sys_str, data_base, query_str):
    """

    :param sys_str:
    :param data_base:
    :param query_str:
    :return:
    """
    jsonResults = qureResultAsJson(sysStr=sys_str,
                                   Database=data_base,
                                   query_str=query_str,
                                   where=[])
    return jsonResults


def get_org():
    """

    :return:
    """
    errInfo = ""
    jsonResults = []
    query_str = (
        "SELECT  "
        "DISTINCT e.`org_name` "
        "FROM  `t_css_vsim` AS a  "
        "LEFT  JOIN `t_css_vsim_packages` b "
        "	ON a.`imsi`=b.`imsi`  "
        "LEFT JOIN `t_css_plmnset` AS c "
        "	ON a.`plmnset_id`=c.`id` "
        "LEFT JOIN `t_css_operator` AS d "
        "	ON a.`operator_id`=d.`id` "
        "LEFT JOIN `t_css_group` AS e "
        "	ON a.`group_id`=e.`id` "
        "WHERE   a.`bam_status`='0' "
        "        AND a.`slot_status`='0'    "
        "        AND e.`org_name` IS NOT NULL "
        "GROUP BY  e.`org_name` "
    )
    listResult = []
    try:
        jsonResults = getJosonData(sys_str=str_sql['db'],
                                   data_base=str_sql['database'],
                                   query_str=query_str)
        # for org in jsonResults:
        #     listResult.append({"text": org['org_name']})

    except KeyError as keyerr:
        errInfo = ("KeyError:{}".format(keyerr))
    except mysql.connector.Error as err:
        errInfo = ("Something went wrong: {}".format(err))

    if errInfo:
        DicResults = {'data': []}

        return json.dumps(DicResults, sort_keys=True, indent=4, default=json_util.default)
    else:
        if not jsonResults:
            DicResults = {'data': []}

            return json.dumps(DicResults, sort_keys=True, indent=4, default=json_util.default)
        else:
            DicResults = jsonResults

            return json.dumps(DicResults, sort_keys=True, indent=4, default=json_util.default)

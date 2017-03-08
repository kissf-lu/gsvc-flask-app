# -*- coding: utf-8 -*-


from flask import request
from flask import json
from bson import json_util
from . import api
from api_functions.getVsimCardCountryInfo import (getVsimCountryStatic, getindexHtmlMutiLineData)
# 导入查询手工维护表、系统资源统计表模块
from api_functions.getonSysSrc import (getVsimManulInfor,
                                       quryonSysSrc)
# 获取gsvchome国家维度卡资源统计栏
from api_functions.getCountrySrcConIndexGrid import qurycountrySrcCon
# 获取问题初诊的信息函数
from api_functions.getCountryProbDic import getProbFisrtDic
# Python get Flower Model
from api_functions.get_FlowerQueryFunction import getFlowers
#
from api_functions.newVsimTest import get_new_vsim_test_infor


# ("以下为资源页面API接口-------------------------------------------------------------------------------------------------")
@api.route('/get_srcVsimManulInfor/', methods=['POST'])
def get_Country():
    """
    本api为资源页获取手工维护表数据
    :return:
    """
    if request.method == 'POST':
        Dic_data = request.get_json()
        country = str(Dic_data['country'])
        person = str(Dic_data['person'])

        return getVsimManulInfor(country, person=person)

    return False


@api.route('/get_onSysSrc/', methods=['POST'])
def get_onSysSrc():
    """
    本API为获取系统平台中的卡资源数据接口
    :return:
    """
    if request.method == 'POST':
        Dic_data = request.get_json()
        country = str(Dic_data['country'])
        return quryonSysSrc(country)

    return False


# ("以下为主页页面API接口-------------------------------------------------------------------------------------------------")
@api.route('/get_CountryAvailableVsim/')
def get_chart_country():
    """
    本api用于获取主页国家维度画板统计图数据：本国卡状态统计、老系统/新架构本国可用卡套餐流量统计
    :return:
    """
    country = request.args.get('country', '', type=str)

    return getVsimCountryStatic(country)


@api.route('/get_mutiLine_maxUser/')
def get_mutiLine_maxUser():
    """
    本api为绘制index主页峰值用户、卡数曲线接口
    :return: 峰值用户、在板卡数、可用卡数JSON数据
    """
    country = request.args.get('country', '', type=str)
    begintime = request.args.get('begintime', '', type=str)
    endtime = request.args.get('endtime', '', type=str)
    butype = request.args.get('butype', '', type=str)
    timedim = request.args.get('timedim', '', type=str)

    return getindexHtmlMutiLineData(country, begintime, endtime, butype=butype, timedim=timedim)


@api.route('/get_countrySrcCon/', methods=['POST'])
def get_countrySrcCon():
    """
    本API为主页国家概述面板获取国家不同套餐卡状态统计数据接口
    :return:
    """
    if request.method == 'POST':
        Dic_data = request.get_json()
        country = str(Dic_data['country'])

        return qurycountrySrcCon(country)

    return False


@api.route('/get_countryProbVsimDic/', methods=['POST'])
def get_countryProbVsimDic():
    """

    :return:
    """

    if request.method == 'POST':
        Dic_data = request.get_json()
        querySort = str(Dic_data['querySort'])
        queryPram = str(Dic_data['queryPram'])
        queryPlmn = str(Dic_data['queryPlmn'])
        begintime = str(Dic_data['begintime'])
        endtime = str(Dic_data['endtime'])
        TimezoneOffset = int(Dic_data['TimezoneOffset'])
        DispatchThreshold = int(Dic_data['DispatchThreshold'])
        FlowerThreshold = int(Dic_data['FlowerThreshold'])

        return getProbFisrtDic(querySort=querySort,
                               queryPram=queryPram,
                               queryPlmn=queryPlmn,
                               begintime=begintime,
                               endtime=endtime,
                               TimezoneOffset=TimezoneOffset,
                               DispatchThreshold=DispatchThreshold,
                               FlowerThreshold=FlowerThreshold)
    return False


@api.route('/get_FlowerQuery/', methods=['POST'])
def get_FlowerQuery():
    """
    :return:
    """
    # paramKeyFromRequest = ['querySort','begintime','endtime','mcc','plmn','imsi','agg_group_key','TimezoneOffset']

    Dic_data = request.get_json()

    try:
        querySort = str(Dic_data['querySort'])
        begintime = str(Dic_data['begintime'])
        endtime = str(Dic_data['endtime'])
        queryMcc = str(Dic_data['mcc'])
        queryPlmn = str(Dic_data['plmn'])
        queryImsi = str(Dic_data['imsi'])
        aggGroupKey = Dic_data['agg_group_key']
        TimezoneOffset = int(Dic_data['TimezoneOffset'])

    except KeyError:
        errinfo = '前端POST数据异常!'
        DicData = []
        DicResults = {'info': {'err': True, 'errinfo': errinfo}, 'data': DicData}
        return json.dumps(DicResults, sort_keys=True, indent=4, default=json_util.default)

    return getFlowers(querySort=querySort,
                      begintime=begintime,
                      endtime=endtime,
                      mcc=queryMcc,
                      plmn=queryPlmn,
                      imsi=queryImsi,
                      flower_query_key=aggGroupKey,
                      TimezoneOffset=TimezoneOffset)


# ("以下为资源页面API接口-------------------------------------------------------------------------------------------------")
@api.route('/get_newVsimTestInforTable/', methods=['POST'])
def get_newVsimTestInforTable():
    """
    本api为资源页获取手工维护表数据
    :return:
    """
    if request.method == 'POST':
        Dic_data = request.get_json()
        imsi = str(Dic_data['imsi'])
        country = str(Dic_data['country'])
        person = str(Dic_data['person'])

        return get_new_vsim_test_infor(person, country=country, imsi=imsi)

    return False

# -*- coding: utf-8 -*-

"""
    exportFilesAPI
    ~~~~~~~~~~~~~~
    为web应用与后台导出文件（xls...）的接口
    api_functions 中：
    1、exportExcelFunc.py为Excel文件导出接口函数汇聚点，所有全局变量设置都在此；所有后台函数调用都在此设置

    :copyright: (c) 2015 by Armin kissf lu.
    :license: ukl, see LICENSE for more details.
"""


from flask import request
from flask import json
from . import api
import flask_excel as excel
#Python excel Mole
from api_functions.exportExcelFunc import (get_excel140countryDataAndSorted,
                                           get_excelFlowerDataAndSorted,
                                           get_excelManulInfoDataAndSorted,
                                           get_excelOnSysInfoDataAndSorted,
                                           get_excelFirsProbDicDataAndSorted,
                                           get_excelManualDeleteTemple,
                                           get_excelManualInsertTemple,
                                           get_excelCountrySrcStaticDataAndSorted)

@api.route('/export_countrySrcStatic/',methods=['POST'])
def export_countrySrcStatic():
    if request.method == 'POST':

        dic_data=json.loads(request.form['data'])
        sortedDicData= get_excelCountrySrcStaticDataAndSorted(dic_data= dic_data)
        return excel.make_response_from_array(sortedDicData, "xls", file_name="ExportCountrySrcStaticData")
    else:
        return False

@api.route('/export_140country/',methods=['POST'])
def export_140country():
    if request.method == 'POST':

        dic_data=json.loads(request.form['data'])
        sortedDicData = get_excel140countryDataAndSorted(dic_data=dic_data)

        return excel.make_response_from_array(sortedDicData, "xls", file_name="Export140countryFlowerData")
    else:

        return False


@api.route('/export_Flower/',methods=['POST'])
def export_Flower():
    if request.method == 'POST':
        dic_data=json.loads(request.form['data'])
        sortedDicData = get_excelFlowerDataAndSorted(dic_data=dic_data)

        return excel.make_response_from_array(sortedDicData, "xls", file_name="ExportFlowerData")

    return False


@api.route('/export_ManualInfo/',methods=['POST'])
def export_ManualInfo():
    if request.method == 'POST':
        dic_data=json.loads(request.form['data'])
        sortedDicData = get_excelManulInfoDataAndSorted(dic_data=dic_data)

        return excel.make_response_from_array(sortedDicData, "xls", file_name="ExportManualInfoData")
    return False

@api.route('/export_manualDeleteTemplate/',methods=['POST'])
def export_manualDeleteTemplate():
    if request.method == 'POST':
        #dic_data=json.loads(request.form['data'])
        dic_data = [{'imsi':'460068029099402'},{'imsi':'416770118932592'}]
        sortedDicData = get_excelManualDeleteTemple(dic_data=dic_data)

        return excel.make_response_from_array(sortedDicData, "xls", file_name="manualDeleteTemplate")
    return False


@api.route('/export_manualInsertTemplate/',methods=['POST'])
def export_manualInsertTemplate():
    if request.method == 'POST':
        #dic_data=json.loads(request.form['data'])
        dic_data = [{"imsi":"202052965490990",
                     unicode("负责人"):unicode("刘超"),
                     unicode("国家"):unicode("希腊"),
                     unicode("运营商"):unicode("Vodafone"),
                     unicode("超套餐限速/费用"):unicode("不可用"),
                     unicode("运营商网站的注册信息"):"",
                     unicode("套餐办理方式"):unicode("自动续办"),
                     unicode("查询方式"):"",
                     unicode("备注"):unicode("无"),
                     unicode("运营接口人"):unicode("丁洁"),
                     unicode("下架日期"):unicode("2016-06-13 07:42:56"),
                     unicode("卡批次"):"",
                     unicode("是否代理商卡 0否，1是代理商卡"):"0",
                     unicode("卡的国家属性 0本国卡，1是多国卡"):"0"}]
        sortedDicData = get_excelManualInsertTemple(dic_data=dic_data)

        return excel.make_response_from_array(sortedDicData, "xls", file_name="manualInsertAndUpdateTemplate")
    return False


@api.route('/export_FirsProbDic/',methods=['POST'])
def export_FirsProbDic():
    if request.method == 'POST':
        dic_data=json.loads(request.form['data'])
        sortedDicData = get_excelFirsProbDicDataAndSorted(dic_data=dic_data)

        return excel.make_response_from_array(sortedDicData, "xls", file_name="ExportOnSysInfoData")
    return False


@api.route('/export_OnSysInfo/',methods=['POST'])
def export_OnSysInfo():
    if request.method == 'POST':
        dic_data=json.loads(request.form['data'])
        sortedDicData = get_excelOnSysInfoDataAndSorted(dic_data=dic_data)

        return excel.make_response_from_array(sortedDicData, "xls", file_name="ExportOnSysInfoData")
    return False

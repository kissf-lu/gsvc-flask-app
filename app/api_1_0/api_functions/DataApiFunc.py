# -*- coding: utf-8 -*-


# import mysql.connector
import json
from bson import json_util
from updateSqlPack.insertoneColModle import insertModel
from updateSqlPack.updateOneColModle import updateModel
from updateSqlPack.deleteModel import deleteManualModel
from SqlPack.SqlLinkInfo import DataApiFuncSqlLink as sql

SqlInfo = sql


def confirmExcelTemplateReg(excel_col_name, reg_col_name):
    """

    :param excel_col_name:
    :param reg_col_name:
    :return:
    """
    ColBase = reg_col_name
    ColConfirm = excel_col_name
    confirmRS = True

    if (ColBase != []) and (ColConfirm != []):
        if len(ColBase) != len(ColConfirm):
            confirmRS = False
        else:
            for i in range(len(ColBase)):
                try:
                    if ColBase[i] != ColConfirm[i]:
                        confirmRS = False
                except IndexError:
                    confirmRS = False
    else:
        confirmRS = False

    return confirmRS


def getDictExcelData(array_data, key_database, key_mirr_database):
    """

    :param array_data:
    :param key_database:
    :param key_mirr_database:
    :return:
    """
    dicData = []
    key_dic = key_database
    key_mirr = key_mirr_database
    errinfo = ''
    if (type(array_data) is list) and (len(array_data) >= 2):
        for i in range(len(array_data)):
            temp_dic = {}
            if i == 0:
                excelCloName = array_data[0]
                ifConfirm = confirmExcelTemplateReg(excel_col_name=excelCloName, reg_col_name=key_mirr)
                if not ifConfirm:
                    errinfo = "模板非法！核实模板是否正确！"
                    returnDictData = {'err': True, 'errinfo': errinfo, 'data': []}

                    return returnDictData
            else:
                for j in range(len(key_dic)):
                    try:
                        temp_dic.update({key_dic[j]: array_data[i][j]})
                    except IndexError:
                        errinfo = 'Index Error'
                dicData.append(temp_dic)

    else:
        errinfo = '导入数据不合法！请核实模板数据。'
    if errinfo != '':
        returnDictData = {'err': True, 'errinfo': errinfo, 'data': []}
    else:
        returnDictData = {'err': False, 'errinfo': errinfo, 'data': dicData}

    return returnDictData


def deleManuleVsimSrc(array_data):
    """
    数据删除API函数，country调用
    :param array_data:
    :return:
    """
    state_result = ''
    dataFromJS = array_data
    deleteDatabaseItem = [unicode('imsi')]
    deleteDataMirr = [unicode('imsi')]
    DicData = getDictExcelData(array_data=dataFromJS,
                               key_database=deleteDatabaseItem,
                               key_mirr_database=deleteDataMirr)
    if DicData['err']:
        returnJsonData = {'err': True, 'errinfo': DicData['errinfo']}
        return json.dumps(returnJsonData, sort_keys=True, indent=4, default=json_util.default)
    else:
        state_result = deleteManualModel(SqlInfo=SqlInfo['DeleManuleVsimSrc'],
                                         arrayDicData=DicData['data'])
        if state_result != '':
            returnJsonData = {'err': True, 'errinfo': state_result}
            return json.dumps(returnJsonData, sort_keys=True, indent=4, default=json_util.default)
        else:
            returnJsonData = {'err': False, 'errinfo': state_result}
            return json.dumps(returnJsonData, sort_keys=True, indent=4, default=json_util.default)


def insertManuleVsimSrc(array_data):
    """
    数据插入API函数
    :param array_data:
    :return:
    """
    state_result = ''
    dataFromJS = array_data
    # 此key用于替换insertDataMirr中对应的key，用于后续进行数据库插入key
    insertDatabaseItem = [unicode('imsi'),
                          unicode('person_gsvc'),
                          unicode('country_cn'),
                          unicode('operator'),
                          unicode('charge_noflower'),
                          unicode('operator_info'),
                          unicode('pay_mode'),
                          unicode('call_mode'),
                          unicode('remarks'),
                          unicode('person_operator'),
                          unicode('expiring_time'),
                          unicode('vsim_batch_num'),
                          unicode('owner_attr'),
                          unicode('country_attr')]
    # 此key为核实前端表格表头是否符合实际模板要求：列数相同、顺序相同
    insertDataMirr = [unicode('imsi'),
                      unicode('负责人'),
                      unicode('国家'),
                      unicode('运营商'),
                      unicode('超套餐限速/费用'),
                      unicode('运营商网站的注册信息'),
                      unicode('套餐办理方式'),
                      unicode('查询方式'),
                      unicode('备注'),
                      unicode('运营接口人'),
                      unicode('下架日期'),
                      unicode('卡批次'),
                      unicode('是否代理商卡 0否，1是代理商卡'),
                      unicode('卡的国家属性 0本国卡，1是多国卡')]
    DicData = getDictExcelData(array_data=dataFromJS,
                               key_database=insertDatabaseItem,
                               key_mirr_database=insertDataMirr)
    if DicData['err']:
        returnJsonData = {'err': True, 'errinfo': DicData['errinfo']}
        return json.dumps(returnJsonData, sort_keys=True, indent=4, default=json_util.default)
    else:
        state_result = insertModel(SqlInfo=SqlInfo['InsertManuleVsimSrc'], DicData=DicData['data'])
        if state_result != '':
            returnJsonData = {'err': True, 'errinfo': state_result}
            return json.dumps(returnJsonData, sort_keys=True, indent=4, default=json_util.default)
        else:
            returnJsonData = {'err': False, 'errinfo': state_result}
            return json.dumps(returnJsonData, sort_keys=True, indent=4, default=json_util.default)


def updateManuleVsimSrc(array_data):
    """
    数据插入API函数
    :param array_data:
    :return:
    """
    state_result = ''
    dataFromJS = array_data

    # ("此key用于替换insertDataMirr中对应的key，用于后续进行数据库插入key")
    update_database_item = [unicode('imsi'),
                            unicode('person_gsvc'),
                            unicode('country_cn'),
                            unicode('operator'),
                            unicode('charge_noflower'),
                            unicode('operator_info'),
                            unicode('pay_mode'),
                            unicode('call_mode'),
                            unicode('remarks'),
                            unicode('person_operator'),
                            unicode('expiring_time'),
                            unicode('vsim_batch_num'),
                            unicode('owner_attr'),
                            unicode('country_attr')]

    # ("此key为核实前端表格表头是否符合实际模板要求：列数相同、顺序相同")
    update_data_mirr = [unicode('imsi'),
                        unicode('负责人'),
                        unicode('国家'),
                        unicode('运营商'),
                        unicode('超套餐限速/费用'),
                        unicode('运营商网站的注册信息'),
                        unicode('套餐办理方式'),
                        unicode('查询方式'),
                        unicode('备注'),
                        unicode('运营接口人'),
                        unicode('下架日期'),
                        unicode('卡批次'),
                        unicode('是否代理商卡 0否，1是代理商卡'),
                        unicode('卡的国家属性 0本国卡，1是多国卡')]

    dic_data = getDictExcelData(array_data=dataFromJS,
                                key_database=update_database_item,
                                key_mirr_database=update_data_mirr)

    if dic_data['err']:
        return_json_data = {'err': True, 'errinfo': dic_data['errinfo']}
        return json.dumps(return_json_data, sort_keys=True, indent=4, default=json_util.default)
    else:
        state_result = updateModel(SqlInfo=SqlInfo['updateManuleVsimSrc'], DicData=dic_data['data'])
        if state_result != '':
            return_json_data = {'err': True, 'errinfo': state_result}
            return json.dumps(return_json_data, sort_keys=True, indent=4, default=json_util.default)
        else:
            return_json_data = {'err': False, 'errinfo': state_result}
            return json.dumps(return_json_data, sort_keys=True, indent=4, default=json_util.default)

# -*- coding: utf-8 -*-

from pyMongoModel import gsvcdbAdmin  # 非公开信息，包含重要连接账号

mongo_gsvcFlower = ['hourChargeFlower', 'dayChargeFlower', 'VsimFlowerOf140']

DataApiFuncSqlLink = {
    "DeleManuleVsimSrc": {"db": "config_DevAmz", "database": "devdatabase", "sheet": "vsim_manual_infor"},
    "InsertManuleVsimSrc": {
        "insertDB": {"db": "config_DevAmz", "database": "devdatabase", "sheet": "vsim_manual_infor"},
        "getUpdateData": {"db": "config_N", "database": "glocalme_css"}
    },
    "updateManuleVsimSrc": {"db": "config_DevAmz", "database": "devdatabase", "sheet": "vsim_manual_infor"},
    "NewVsimTestInfo": {
        "Delete": {"db": "config_DevAmz", "database": "devdatabase", "sheet": "vsim_test_info"},
        "Update": {"db": "config_DevAmz", "database": "devdatabase", "sheet": "vsim_test_info"},
        "Insert": {"db": "config_DevAmz", "database": "devdatabase", "sheet": "vsim_test_info"}
        }
}
get140countryFlowerStatics = {
    "140src": {"db": "config_N", "database": "glocalme_css"},
    'get140Flower': {'uri': gsvcdbAdmin, 'db': 'gsvcdb', 'collection': 'VsimFlowerOf140'}
}
getFlowerQueryFunction = {
    'queryhourFlower': {'uri': gsvcdbAdmin, 'db': 'gsvcdb', 'collection': 'hourChargeFlower'},
    'querydayFlower': {'uri': gsvcdbAdmin, 'db': 'gsvcdb', 'collection': 'dayChargeFlower'},
    'src_on_sys': {"db": "config_N", "database": "glocalme_css"}
}
getonSysSrc = {
    'getVsimManulInfor': {"db": "config_amzami", "database": "gsvcdatabase"},
    'qureyNVsim': {"db": "config_N", "database": "glocalme_css"}
}
getCountryProbDic = {
    "getSrc": {"db": "config_N", "database": "glocalme_css"}
}

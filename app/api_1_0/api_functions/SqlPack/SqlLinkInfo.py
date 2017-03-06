# -*- coding: utf-8 -*-

from pyMongoModel import gsvcdbAdmin  # 非公开信息，包含重要连接账号

mongo_gsvcFlower = ['hourChargeFlower', 'dayChargeFlower', 'VsimFlowerOf140']

DataApiFuncSqlLink = {
    "DeleManuleVsimSrc": {"db": "config_Devlocal", "database": "devdatabase", "sheet": "vsim_manual_infor"},
    "InsertManuleVsimSrc": {
        "insertDB": {"db": "config_Devlocal", "database": "devdatabase", "sheet": "vsim_manual_infor"},
        "getUpdateData": {"db": "config_N", "database": "glocalme_css"}
    },
    "updateManuleVsimSrc": {"db": "config_Devlocal", "database": "devdatabase", "sheet": "vsim_manual_infor"}
}

get140countryFlowerStatics = {
    "140src": {"db": "config_N", "database": "glocalme_css"},
    'get140Flower': {'uri': gsvcdbAdmin, 'db': 'gsvcdb', 'collection': mongo_gsvcFlower[2]}
}

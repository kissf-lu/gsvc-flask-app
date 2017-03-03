# -*- coding: utf-8 -*-


# import mysql.connector
import json
from bson import json_util

def get_new_vsim_test_infor(person, **kwargs):
    """

    :param person:
    :param kwargs:
    :return:
    """

    DicResults = {'info': {'err': True, 'errinfo': "No Query Data"}, 'data': []}

    return json.dumps(DicResults, sort_keys=True, indent=4, default=json_util.default)
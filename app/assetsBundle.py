# -*- coding: utf-8 -*-


from flask_assets import Bundle


login_css = Bundle(
    'css/auth/styles.css',
    'css/auth/animate.css',
    filters='cssmin',
    output='css/gsvc_login.css'
)

main_css = Bundle(
    'css/main/animate.css',
    'css/main/style.css',
    filters='cssmin',
    output='css/gsvc_main.css'
)

main_js = Bundle(
    'js/main/inspinia.js',
    'js/main/plugins/metisMenu/jquery.metisMenu.js',
    'js/main/plugins/slimscroll/jquery.slimscroll.min.js',
    filters='jsmin',
    output='js/gsvc_main.js'
)

gsvchome_css = Bundle(
    # ("-- select2 css--")
    'css/main/plugins/selectForm/select2.min.css',
    # ("-- jqx css --")
    'css/main/plugins/jqxGrid/jqx.base.css',
    # ("-- datepicker css --")
    'css/main/plugins/datepicker/datepicker3.css',
    'css/main/plugins/datepicker/daterangepicker.css',
    filters='cssmin',
    output='css/gsvc_gsvchome.css'
)

gsvchome_js = Bundle(
    'js/main/plugins/Chart/Chart.min.js',
    'js/main/plugins/fullcalendar/moment.min.js',
    'js/main/plugins/daterangepicker/daterangepicker.js',
    'js/main/plugins/datapicker/bootstrap-datepicker.js',
    'js/main/plugins/datapicker/bootstrap-datepicker.zh-CN.min.js',
    # ("-- select2 js --")
    'js/main/plugins/select2/select2.min.js',
    # ("-- customer js --")
    'js/main/demo/gsvchome-demo.js',

    filters='jsmin',
    output='js/gsvc_gsvchome.js'
)

gsvchome_globle_js = Bundle(
    'js/main/plugins/jqwidgets/localization.zh-CN.js',
    filters='jsmin',
    output='js/gsvc_gsvchome_globle.js'
)

vsimFlowerQuery_css = Bundle(
    'css/main/plugins/switchery/switchery.min.css',
    # ("-- select2 css--")
    'css/main/plugins/selectForm/select2.min.css',
    # ("-- jqx css --")
    'css/main/plugins/jqxGrid/jqx.base.css',
    # ("-- datepicker css --")
    'css/main/plugins/datepicker/daterangepicker.css',
    # ("--chosen css--")
    'css/main/plugins/chosen/bootstrap-chosen.css',
    # ("--clockpicker css--")
    'css/main/plugins/clockpicker/clockpicker.css',
    filters='cssmin',
    output='css/gsvc_vsimFlowerQuery.css'
)

vsimFlowerQuery_js = Bundle(
    # (--switchery js--)
    'js/main/plugins/switchery/switchery.min.js',
    # ("--daterangepicker js--")
    'js/main/plugins/daterangepicker/moment.min.js',
    'js/main/plugins/daterangepicker/daterangepicker.js',
    # ("--clockpicker js--")
    'js/main/plugins/clockpicker/clockpicker.js',
    # ("--chosen js--")
    'js/main/plugins/chosen/chosen.jquery.min.js',
    # ("-- select2 js --")
    'js/main/plugins/select2/select2.min.js',
    # ("-- customer js --")
    'js/main/demo/vsimFlowerQuery-demo.js',

    filters='jsmin',
    output='js/gsvc_vsimFlowerQuery.js'
)


probVsimFirstDict_css = Bundle(
    'css/main/plugins/switchery/switchery.min.css',
    # ("-- select2 css--")
    'css/main/plugins/selectForm/select2.min.css',
    # ("-- jqx css --")
    'css/main/plugins/jqxGrid/jqx.base.css',
    # ("-- datepicker css --")
    'css/main/plugins/datepicker/daterangepicker.css',
    # ("--clockpicker css--")
    'css/main/plugins/clockpicker/clockpicker.css',
    filters='cssmin',
    output='css/gsvc_probVsimFirstDict.css'
)


probVsimFirstDict_js = Bundle(
    # ("---switchery js--------")
    'js/main/plugins/switchery/switchery.min.js',
    # ("--daterangepicker js--")
    'js/main/plugins/daterangepicker/moment.min.js',
    'js/main/plugins/daterangepicker/daterangepicker.js',
    # ("--clockpicker js--")
    'js/main/plugins/clockpicker/clockpicker.js',
    # ("-- select2 js --")
    'js/main/plugins/select2/select2.min.js',
    # ("-- customer js --")
    'js/main/demo/probVsimFirstDict-demo.js',
    filters='jsmin',
    output='js/gsvc_probVsimFirstDict.js'
)


vsimmanual_css = Bundle(
    # ("-- jqx css --")
    'css/main/plugins/jqxGrid/jqx.base.css',
    # ("--select2 css--")
    'css/main/plugins/selectForm/select2.min.css',
    # ("-- datepicker css --")
    'css/main/plugins/datepicker/datepicker3.css',
    'css/main/plugins/datepicker/daterangepicker.css',
    # ("-- jasny-bootstrap --")
    'css/main/plugins/jasny-bootstrap/jasny-bootstrap.min.css',
    filters='cssmin',
    output='css/gsvc_vsimmanual.css'
)

vsimmanual_js = Bundle(
    # ("--vsimmanul-demo js--")
    'js/main/demo/vsimmanul-demo.js',
    'js/main/demo/ManualDataBaseUpdate-demo.js',
    # ("-- 下拉筛选扩展 --")
    'js/main/plugins/select2/select2.min.js',
    # ("-- jasny-bootstrap --")
    'js/main/plugins/jasny-bootstrap/jasny-bootstrap.min.js',
    # ("-- jquery form --")
    'js/main/plugins/jqueryform/jquery.form.min.js',
    filters='jsmin',
    output='js/gsvc_vsimmanual.js'
)

muticountry140_css = Bundle(
    # ("-- jqx css --")
    'css/main/plugins/jqxGrid/jqx.base.css',
    # ("-- datepicker css --")
    'css/main/plugins/datepicker/datepicker3.css',
    'css/main/plugins/datepicker/daterangepicker.css',
    filters='cssmin',
    output='css/gsvc_muticountry140.css'
)

muticountry140_js = Bundle(
    # ("<!-- datepicker js -->")
    'js/main/plugins/fullcalendar/moment.min.js',
    # ("<!--datapicker js  -->")
    'js/main/plugins/daterangepicker/daterangepicker.js',
    'js/main/plugins/datapicker/bootstrap-datepicker.js',
    'js/main/plugins/datapicker/bootstrap-datepicker.zh-CN.min.js',
    # (<!--定制脚本-->)
    'js/main/demo/140countryFlowerStatic-demo.js',
    filters='jsmin',
    output='js/gsvc_muticountry140.js'
)


uploadfiles_css = Bundle(
    # ("-- jqx css --")
    'css/main/plugins/jqxGrid/jqx.base.css',
    # ("-- jasny-bootstrap --")
    'css/main/plugins/jasny-bootstrap/jasny-bootstrap.min.css',
    filters='cssmin',
    output='css/gsvc_uploadfiles.css'
)
uploadfiles_js = Bundle(
    # <!--定制脚本-->
    'js/main/demo/test_upfiles.js',
    'js/main/plugins/jqueryform/jquery.form.min.js',
    # ("-- jasny-bootstrap --")
    'js/main/plugins/jasny-bootstrap/jasny-bootstrap.min.js',
    filters='cssmin',
    output='js/gsvc_uploadfiles.js'
)

new_vsim_test_info_css = Bundle(
    # ("-- jqx css --")
    'css/main/plugins/jqxGrid/jqx.base.css',
    # ("--select2 css--")
    'css/main/plugins/selectForm/select2.min.css',
    # ("-- jasny-bootstrap --")
    'css/main/plugins/jasny-bootstrap/jasny-bootstrap.min.css',
    filters='cssmin',
    output='css/gsvc_new_vsim_test_info.css'
)

new_vsim_test_info_js = Bundle(
    # ("--vsimmanul-demo js--")
    'js/main/demo/newVsimInfoTable-demo.js',
    'js/main/demo/newVsimTestTableUpdate-demo.js',
    # ("-- 下拉筛选扩展 --")
    'js/main/plugins/select2/select2.min.js',
    # ("-- jasny-bootstrap --")
    'js/main/plugins/jasny-bootstrap/jasny-bootstrap.min.js',
    # ("-- jquery form --")
    'js/main/plugins/jqueryform/jquery.form.min.js',
    filters='jsmin',
    output='js/gsvc_new_vsim_test_info.js'
)

jqwidgets_globle_js = Bundle(
    # ("--jqwidgets js--")
    'js/main/plugins/jqwidgets/jqx-all.js',
    'js/main/plugins/jqwidgets/localization.zh-CN.js',
    filters='jsmin',
    output='js/gsvc_jqwidgets.js'
)

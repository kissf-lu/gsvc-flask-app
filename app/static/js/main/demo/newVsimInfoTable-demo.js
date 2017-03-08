/**
 * Created by lujian on 2017-02-28.
 */

/**=======================================================
 *                          warn  func
 *=========================================================
 *bootstrap warn button type alert
 * @param alert_button_item : is the jquery type DOC ID obtaining from jquery DOC;
 * @param alert_doc: is alerting string to users;
 *
 *===================================================================================*/
function  alert_func(alert_button_item,alert_doc) {
    var $alertItem = alert_button_item;
    var alertStr=('<div class="alert alert-warning" role="alert">'+
        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
        '<span aria-hidden="true">&times;</span>'+
        '</button>'+
        '<p>'+alert_doc+'</p>'+
        '</div>'
    );
    $alertItem.children().detach();
    $alertItem.append(alertStr);
}
/**===========================================================
 *
 *
 * @param init_select_class_list
 *
 *============================================================**/
function initSelectView(init_select_class_list){
    //select country:
    var country_data = [{text: 'AD'},{text: 'AE'},{text: 'AF'},{text: 'AG'},{text: 'AI'},{text: 'AL'},{text: 'AM'},{text: 'AO'},{text: 'AQ'},{text: 'AR'},{text: 'AS'},{text: 'AT'},{text: 'AU'},{text: 'AW'},{text: 'AX'},{text: 'AZ'},{text: 'BA'},{text: 'BB'},{text: 'BD'},{text: 'BE'},{text: 'BF'},{text: 'BG'},{text: 'BH'},{text: 'BI'},{text: 'BJ'},{text: 'BL'},{text: 'BM'},{text: 'BN'},{text: 'BO'},{text: 'BQ'},{text: 'BR'},{text: 'BS'},{text: 'BT'},{text: 'BV'},{text: 'BW'},{text: 'BY'},{text: 'BZ'},{text: 'CA'},{text: 'CC'},{text: 'CD'},{text: 'CF'},{text: 'CG'},{text: 'CH'},{text: 'CI'},{text: 'CK'},{text: 'CL'},{text: 'CM'},{text: 'CN'},{text: 'CO'},{text: 'CR'},{text: 'CU'},{text: 'CV'},{text: 'CW'},{text: 'CX'},{text: 'CY'},{text: 'CZ'},{text: 'DE'},{text: 'DJ'},{text: 'DK'},{text: 'DM'},{text: 'DO'},{text: 'DZ'},{text: 'EC'},{text: 'EE'},{text: 'EG'},{text: 'EH'},{text: 'ER'},{text: 'ES'},{text: 'ET'},{text: 'FI'},{text: 'FJ'},{text: 'FK'},{text: 'FM'},{text: 'FO'},{text: 'FR'},{text: 'GA'},{text: 'GB'},{text: 'GD'},{text: 'GE'},{text: 'GF'},{text: 'GG'},{text: 'GH'},{text: 'GI'},{text: 'GL'},{text: 'GM'},{text: 'GN'},{text: 'GP'},{text: 'GQ'},{text: 'GR'},{text: 'GS'},{text: 'GT'},{text: 'GU'},{text: 'GW'},{text: 'GY'},{text: 'HK'},{text: 'HM'},{text: 'HN'},{text: 'HR'},{text: 'HT'},{text: 'HU'},{text: 'ID'},{text: 'IE'},{text: 'IL'},{text: 'IM'},{text: 'IN'},{text: 'IO'},{text: 'IQ'},{text: 'IR'},{text: 'IS'},{text: 'IT'},{text: 'JE'},{text: 'JM'},{text: 'JO'},{text: 'JP'},{text: 'KE'},{text: 'KG'},{text: 'KH'},{text: 'KI'},{text: 'KM'},{text: 'KN'},{text: 'KP'},{text: 'KR'},{text: 'KW'},{text: 'KY'},{text: 'KZ'},{text: 'LA'},{text: 'LB'},{text: 'LC'},{text: 'LI'},{text: 'LK'},{text: 'LR'},{text: 'LS'},{text: 'LT'},{text: 'LU'},{text: 'LV'},{text: 'LY'},{text: 'MA'},{text: 'MC'},{text: 'MD'},{text: 'ME'},{text: 'MF'},{text: 'MG'},{text: 'MH'},{text: 'MK'},{text: 'ML'},{text: 'MM'},{text: 'MN'},{text: 'MO'},{text: 'MP'},{text: 'MQ'},{text: 'MR'},{text: 'MS'},{text: 'MT'},{text: 'MU'},{text: 'MV'},{text: 'MW'},{text: 'MX'},{text: 'MY'},{text: 'MZ'},{text: 'NA'},{text: 'NC'},{text: 'NE'},{text: 'NF'},{text: 'NG'},{text: 'NI'},{text: 'NL'},{text: 'NO'},{text: 'NP'},{text: 'NR'},{text: 'NU'},{text: 'NZ'},{text: 'OM'},{text: 'PA'},{text: 'PC'},{text: 'PE'},{text: 'PF'},{text: 'PG'},{text: 'PH'},{text: 'PK'},{text: 'PL'},{text: 'PM'},{text: 'PN'},{text: 'PR'},{text: 'PS'},{text: 'PT'},{text: 'PW'},{text: 'PY'},{text: 'QA'},{text: 'RE'},{text: 'RO'},{text: 'RS'},{text: 'RU'},{text: 'RW'},{text: 'SA'},{text: 'SB'},{text: 'SC'},{text: 'SD'},{text: 'SE'},{text: 'SG'},{text: 'SH'},{text: 'SI'},{text: 'SJ'},{text: 'SK'},{text: 'SL'},{text: 'SM'},{text: 'SN'},{text: 'SO'},{text: 'SR'},{text: 'ST'},{text: 'SV'},{text: 'SX'},{text: 'SY'},{text: 'SZ'},{text: 'TC'},{text: 'TD'},{text: 'TF'},{text: 'TG'},{text: 'TH'},{text: 'TJ'},{text: 'TK'},{text: 'TL'},{text: 'TM'},{text: 'TN'},{text: 'TO'},{text: 'TR'},{text: 'TT'},{text: 'TV'},{text: 'TW'},{text: 'TZ'},{text: 'UA'},{text: 'UG'},{text: 'UM'},{text: 'US'},{text: 'UY'},{text: 'UZ'},{text: 'VA'},{text: 'VC'},{text: 'VE'},{text: 'VG'},{text: 'VI'},{text: 'VN'},{text: 'VU'},{text: 'WF'},{text: 'WS'},{text: 'YE'},{text: 'YT'},{text: 'ZA'},{text: 'ZM'},{text: 'ZW'},{text: 'noCountry'}
    ];
    //select person：
    var person_data = [{text: '刘超'},{text: '叶慧玲'},{text: '郑天琴'},{text: '曲薇'},{text: '黄柳青'},
        {text: '凌刚'}, {text: '李红伟'},{text: '王成'}];
    // select views
    init_select_class_list.country.select2({
        data: country_data
    });
    init_select_class_list.country.select2({
        placeholder: "国家简码",
        allowClear: true
    });
    //select 模块
    init_select_class_list.person.select2({
        data: person_data
    });
    $(".select-person").select2({
        placeholder: "测试人",
        allowClear: true
    });
}
/**=====================================================
 *  -------FilterPanel set func-------
 *======================================================
 *JqxGrid columns FilterPanel setting;
 * @param filterPanel panel to init;
 * @param datafield : jqxgrid column datafield param;
 * @param filterGrid : jquery type of grid DOC ID;
 * @param SrcAdapter : jqxgrid SrcAdapter param ;
 *=============================================================*/
var buildFilterPanel = function (filterPanel, datafield,filterGrid,SrcAdapter) {
    var textInput = $("<input style='margin:5px;'/>");
    var applyinput = $("<div class='filter' style='height: 25px; margin-left: 20px; margin-top: 7px;'></div>");
    var filterbutton = $('<span tabindex="0" style="padding: 4px 12px; margin-left: 2px;">筛选</span>');
    applyinput.append(filterbutton);
    var filterclearbutton = $('<span tabindex="0" style="padding: 4px 12px; margin-left: 5px;">清除筛选</span>');
    applyinput.append(filterclearbutton);
    filterPanel.append(textInput);
    filterPanel.append(applyinput);
    filterbutton.jqxButton({ height: 20 });
    filterclearbutton.jqxButton({height: 20 });
    var dataSource ={
        localdata: SrcAdapter.records,
        datatype: "json",
        async: false
    };
    var dataadapter = new $.jqx.dataAdapter(dataSource,
        {
            autoBind: false,
            autoSort: true,
            autoSortField: datafield,
            async: false,
            uniqueDataFields: [datafield]
        });
    var $jqgrid140country = filterGrid;
    var column = $jqgrid140country.jqxGrid('getcolumn', datafield);
    textInput.jqxInput({ placeHolder: "Enter " + column.text, popupZIndex: 9999999, displayMember: datafield, source: dataadapter, height: 23, width: 175 });
    textInput.keyup(function (event) {
        if (event.keyCode === 13) {
            filterbutton.trigger('click');
        }
    });
    filterbutton.click(function () {
        var filtergroup = new $.jqx.filter();
        var filter_or_operator = 1;
        var filtervalue = textInput.val();
        var filtercondition = 'contains';
        var filter1 = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
        filtergroup.addfilter(filter_or_operator, filter1);
        // add the filters.
        $jqgrid140country.jqxGrid('addfilter', datafield, filtergroup);
        //apply the filters.
        $jqgrid140country.jqxGrid('applyfilters');
        $jqgrid140country.jqxGrid('closemenu');
    });
    filterbutton.keydown(function (event) {
        if (event.keyCode === 13) {
            filterbutton.trigger('click');
        }
    });
    filterclearbutton.click(function () {
        $jqgrid140country.jqxGrid('removefilter', datafield);
        // apply the filters.
        $jqgrid140country.jqxGrid('applyfilters');
        $jqgrid140country.jqxGrid('closemenu');
    });
    filterclearbutton.keydown(function (event) {
        if (event.keyCode === 13) {
            filterclearbutton.trigger('click');
        }
        textInput.val("");
    });
};
/**================================
 *  -------初始化显示选择函数
 *=================================
 * @param item_related_grid
 * @param item_jqx_drop_down
 *======================================================================**/
function initDropDownList(item_related_grid, item_jqx_drop_down){
    // Create a jqxDropDownList
    var jqxDropDownList=[
        {label: '测试id', value: 'id_newvsimtest', checked: true },
        {label: '卡提供人', value: 'person_supplier', checked: true },
        {label: '测试人', value: 'person_test', checked: true },
        {label: '测试卡信息', value: 'card_info', checked: true },
        {label: '本国/多国', value: 'vsim_type', checked: true },
        {label: '国家', value: 'country_cn', checked: true },
        {label: '简称', value: 'country_iso', checked: true },
        {label: '运营商', value: 'operator', checked: true },
        {label: 'PLMN', value: 'plmn', checked: true },
        {label: '网络制式', value: 'rat', checked: true },
        {label: '配置更改', value: 'config_change', checked: true },
        {label: 'IMSI', value: 'imsi', checked: true },
        {label: '账户', value: 'user_code', checked: true },
        {label: 'IMEI', value: 'imei', checked: true },
        {label: '设备类型', value: 'device_type', checked: true },
        {label: '调卡成功时间', value: 'success_time', checked: true },
        {label: '换卡时间', value: 'change_time', checked: true },
        {label: '注册运营商', value: 'register_operator', checked: true },
        {label: 'EPLMN', value: 'eplmn', checked: true },
        {label: '注册网络', value: 'register_rat', checked: true },
        {label: 'LAC', value: 'lac', checked: true },
        {label: 'CELLID', value: 'cellid', checked: true },
        {label: '基本可用性', value: 'service_usability', checked: true },
        {label: '1小时稳定性', value: 'stability_onehour', checked: true },
        {label: '协商速率', value: 'agree_mbr', checked: true },
        {label: '协商速率一致性', value: 'agree_consistency', checked: true },
        {label: '失败原因', value: 'fail_reason', checked: true },
        {label: '备注', value: 'remark', checked: true }
    ];
    initDropdownlist(item_jqx_drop_down, jqxDropDownList);

    item_jqx_drop_down.on('checkChange', function (event) {

        actionDropDownList(item_related_grid, event);
    });

}
/**=====================================================================
 *
 * @param item_jqx_drop_down : initialized DOC ID of jquery type jqx dropdown ID
 * @param jqx_drop_down_list : source list to initialize Dropdownlist model
 *======================================================================**/
function initDropdownlist(item_jqx_drop_down, jqx_drop_down_list) {

    item_jqx_drop_down.jqxDropDownList({
        checkboxes: true,
        source: jqx_drop_down_list,
        autoOpen:true,
        animationType:'fade',
        filterable: true,
        dropDownHeight: 300,
        Width:150
    });
}
/**=====================================
 *
 * @param item_related_grid
 * @param event
 *=======================================================**/
function actionDropDownList(item_related_grid, event) {

    item_related_grid.jqxGrid('beginupdate');
    if (event.args.checked) {
        item_related_grid.jqxGrid('showcolumn', event.args.value);
    }
    else {
        item_related_grid.jqxGrid('hidecolumn', event.args.value);
    }
    item_related_grid.jqxGrid('endupdate');
}
/**==========================================================================
 *  -------init jqxgrid func-------
 *=============================================================================
 * @param initGrid
 * @param array
 * @return {{localdata: *, datatype: string, datafields: [*,*,*,*,*,*,*,*,*]}}
 *==============================================================================**/
function initjqxGrid(initGrid, array){
    //定义表格与后台关联数据key值及对应前台显示数据类型
    var $jqGridItem = initGrid;
    var Srcsource ={
        localdata: array,
        datatype: "json",
        datafields: [
            { name: 'id_newvsimtest', type: 'string'},
            { name: 'person_supplier', type: 'string'},
            { name: 'person_test', type: 'string'},
            { name: 'card_info', type: 'string'},
            { name: 'vsim_type', type: 'string'},
            { name: 'country_cn', type: 'string'},
            { name: 'country_iso', type: 'string'},
            { name: 'operator', type: 'string'},
            { name: 'plmn', type: 'string'},
            { name: 'rat', type: 'string'},
            { name: 'config_change', type: 'string'},
            { name: 'imsi', type: 'string'},
            { name: 'user_code', type: 'string'},
            { name: 'imei', type: 'string'},
            { name: 'device_type', type: 'string'},
            { name: 'success_time', type: 'date'},
            { name: 'change_time', type: 'date'},
            { name: 'register_operator', type: 'string'},
            { name: 'eplmn', type: 'string'},
            { name: 'register_rat', type: 'string'},
            { name: 'lac', type: 'string'},
            { name: 'cellid', type: 'string'},
            { name: 'service_usability', type: 'string'},
            { name: 'stability_onehour', type: 'string'},
            { name: 'agree_mbr', type: 'string'},
            { name: 'agree_consistency', type: 'string'},
            { name: 'fail_reason', type: 'string'},
            { name: 'remark', type: 'string'}
        ]
    };
    //jqxgrid data adapter
    var SrcAdapter = new $.jqx.dataAdapter(Srcsource);
    // grid views
    $jqGridItem.jqxGrid({
        width: "99.8%",
        height: 600,
        source: SrcAdapter,
        filterable: true,
        columnsresize: true,
        enablebrowserselection: true,
        selectionmode: 'multiplerows',
        altrows: true,
        sortable: true,
        pageable: true,
        pageSize: 1000,
        pagesizeoptions:['1000', '2000', '5000'],
        localization: getLocalization('zh-CN'),
        ready: function () {
        },
        autoshowfiltericon: true,
        columnmenuopening: function (menu, datafield, height) {
            var column = $jqGridItem.jqxGrid('getcolumn', datafield);
            if (column.filtertype == "custom") {
                menu.height(155);
                setTimeout(function () {
                    menu.find('input').focus();
                }, 25);
            }
            else menu.height(height);
        },
        columns: [
            {
                text: 'num',
                sortable: true,
                filterable: false,
                editable: false,
                groupable: false,
                draggable: false,
                resizable: false,
                datafield: '',
                width: 50,
                columntype: 'number',
                cellsrenderer: function (row, column, value) {
                    return "<div style='margin:4px;'>" + (value + 1) + "</div>";
                }
            },
            { text: '测试id', datafield: 'id_newvsimtest' , width: 100},
            { text: '卡提供人', datafield: 'person_supplier' , filtertype: 'checkedlist', width: 80},
            { text: '测试人', datafield: 'person_test', filtertype: 'checkedlist', width: 80},
            { text: '测试卡信息', datafield: 'card_info', filtertype: 'checkedlist', width: 200 },
            { text: '本国/多国', datafield: 'vsim_type', filtertype: 'checkedlist', width: 80 },
            { text: '国家', datafield: 'country_cn', filtertype: 'checkedlist', width: 80 },
            { text: '简称', datafield: 'country_iso', filtertype: 'checkedlist', width: 80 },
            { text: '运营商', datafield: 'operator', filtertype: 'checkedlist', width: 80 },
            { text: 'plmn', datafield: 'plmn', filtertype: 'checkedlist', width: 80 },
            { text: '网络制式', datafield: 'rat', filtertype: 'checkedlist', width: 80 },
            { text: '配置更改', datafield: 'config_change', filtertype: 'checkedlist', width: 150},
            { text: 'imsi', datafield: 'imsi' , width: 150,
                filtertype: "custom",
                createfilterpanel: function (datafield, filterPanel) {
                    buildFilterPanel(filterPanel, datafield, $jqGridItem,SrcAdapter);
                }
            },
            { text: '账户', datafield: 'user_code', filtertype: 'checkedlist', width: 200},
            { text: 'imei', datafield: 'imei' , width: 150,
                filtertype: "custom",
                createfilterpanel: function (datafield, filterPanel) {
                    buildFilterPanel(filterPanel, datafield, $jqGridItem,SrcAdapter);
                }
            },
            { text: '设备类型', datafield: 'device_type', filtertype: 'checkedlist', width: 200},
            { text: '调卡成功时间', datafield: 'success_time', filtertype: 'date', cellsformat: 'yyyy-MM-dd HH:mm:ss', width: 170 },
            { text: '换卡时间', datafield: 'change_time', filtertype: 'date', cellsformat: 'yyyy-MM-dd HH:mm:ss', width: 170 },
            { text: '注册运营商', datafield: 'register_operator', filtertype: 'checkedlist', width: 80 },
            { text: 'eplmn', datafield: 'eplmn', filtertype: 'checkedlist', width: 80 },
            { text: '注册网络', datafield: 'register_rat', filtertype: 'checkedlist', width: 80 },
            { text: 'lac', datafield: 'lac', filtertype: 'checkedlist', width: 80 },
            { text: 'cellid', datafield: 'cellid', filtertype: 'checkedlist', width: 80 },
            { text: '基本可用性', datafield: 'service_usability', filtertype: 'checkedlist', width: 80 },
            { text: '1小时稳定性', datafield: 'stability_onehour', filtertype: 'checkedlist', width: 80 },
            { text: '协商速率', datafield: 'agree_mbr', filtertype: 'checkedlist', width: 150 },
            { text: '协商速率一致性', datafield: 'agree_consistency', filtertype: 'checkedlist', width: 150 },
            { text: '失败原因', datafield: 'fail_reason', filtertype: 'checkedlist', width: 80 },
            { text: '备注', datafield: 'remark', filtertype: 'checkedlist', width: 200 }
        ]
    });
    return Srcsource;
}

function newVsimTestInfoTableGetAjaxAPI(option) {
    var PostData = option.postData;
    var person = PostData.person;
    var country = PostData.country;
    var imsi = PostData.imsi;
    //clear old warn content.
    globeVarNewVsimTestinfo.ID.alertModelID.children().detach();

    if (person==''){
        //
        alert_func(globeVarNewVsimTestinfo.ID.alertModelID,"请设置测试人!");
    }else{
        globeVarNewVsimTestinfo.clearGridArrayData();
        globeVarNewVsimTestinfo.ID.newVsimTestInfoJqgridID.jqxGrid("clear");
        globeVarNewVsimTestinfo.ID.newVsimTestInfoJqgridID.jqxGrid('showloadelement');
        //disable query button before return data
        globeVarNewVsimTestinfo.ID.DataGetID.attr("disabled", true);
        // ajax request begin
        var AjaxManualRequest = $.ajax({
            type: "POST",
            //url地址
            url: $SCRIPT_ROOT + '/api/v1.0/get_newVsimTestInforTable/',
            //request set
            contentType: "application/json",
            //data参数
            data: JSON.stringify(PostData),
            //server back data type
            dataType: "json"
        })
            .done(function(data){
                // clear old data
                globeVarNewVsimTestinfo.clearGridArrayData();
                globeVarNewVsimTestinfo.ID.newVsimTestInfoJqgridID.jqxGrid("clear");
                var getData = data;
                if (getData.data.length==0){
                    if (getData.info.err){
                        //delete old alter
                        alert_func(globeVarNewVsimTestinfo.ID.alertModelID,("Error："+getData.info.errinfo));
                    }
                    else{
                        alert_func(globeVarNewVsimTestinfo.ID.alertModelID,("无查询结果!"));
                    }
                }
                else{
                    var GridData = [];                                       //缓存表格数据
                    $.each( getData.data, function(i, item){
                        GridData.push({
                            id_newvsimtest: item.id_newvsimtest,
                            person_supplier: item.person_supplier,
                            person_test: item.person_test,
                            card_info: item.card_info,
                            vsim_type: item.vsim_type,
                            country_cn: item.country_cn,
                            country_iso: item.country_iso,
                            operator: item.operator,
                            plmn: item.plmn,
                            rat: item.rat,
                            config_change: item.config_change,
                            imsi: item.imsi,
                            user_code: item.user_code,
                            imei: item.imei,
                            device_type: item.device_type,
                            success_time: item.success_time,
                            change_time: item.change_time,
                            register_operator: item.register_operator,
                            eplmn: item.eplmn,
                            register_rat: item.register_rat,
                            lac: item.lac,
                            cellid: item.cellid,
                            service_usability: item.service_usability,
                            stability_onehour: item.stability_onehour,
                            agree_mbr: item.agree_mbr,
                            agree_consistency: item.agree_consistency,
                            fail_reason: item.fail_reason,
                            remark: item.remark
                        });
                    });//each函数完成
                    // set the new data
                    globeVarNewVsimTestinfo.setGridArrayData(GridData);
                    option.gridParam.gridSource.localdata = GridData;
                    globeVarNewVsimTestinfo.ID.newVsimTestInfoJqgridID.jqxGrid('updatebounddata');
                }
            })
            .fail(function(jqXHR, status){
                // clear old data
                globeVarNewVsimTestinfo.clearGridArrayData();
                globeVarNewVsimTestinfo.ID.newVsimTestInfoJqgridID.jqxGrid("clear");
                //
                alert_func(globeVarNewVsimTestinfo.ID.alertModelID,("Servers False!"));
            })
            .always(function() {
                globeVarNewVsimTestinfo.ID.DataGetID.attr("disabled", false);
            });
    }
}

var globeVarNewVsimTestinfo = {
    'alertWinStr':'',                                //alert() function use alertWinStr value to show alert
    'gridArray': [],
    'ID':{
        'DataGetID' : $("#newVsimTestInfoDataGet"),
        'imsiID': $("#input-imsi"),
        'countryClass' : $(".select-country"),
        'personClass' : $(".select-person"),
        'newVsimTestInfoJqgridID' : $("#jqxgrid"),
        'modalID' : $('#newVsimTestInfo-Modal'),
        'dropDownID' : $("#jqxDropDownList"),
        'alertModelID': $("#alert-model")
    },
    'setalertWinStr': function (strAlert) {
        this.alertWinStr = strAlert;
    },
    'clearGridArrayData': function () {
        this.gridArray=[];
    },
    'setGridArrayData': function (arrayData) {

        this.gridArray=arrayData;
    }
};
$(function () {

    //init select2 model
    //===============================================
    var initSelectClassList = {
        country: globeVarNewVsimTestinfo.ID.countryClass,
        person: globeVarNewVsimTestinfo.ID.personClass
    };
    initSelectView(initSelectClassList);
    //==============================================
    //init jqxgrid
    var JqxGridSource= initjqxGrid(globeVarNewVsimTestinfo.ID.newVsimTestInfoJqgridID,
                                   globeVarNewVsimTestinfo.ID.gridArray);
    //===============================================
    //init drop down list for check
    initDropDownList(globeVarNewVsimTestinfo.ID.newVsimTestInfoJqgridID,
                     globeVarNewVsimTestinfo.ID.dropDownID);
    //=================================================================
    globeVarNewVsimTestinfo.ID.DataGetID.click(function () {
        var ajaxParam ={
            'gridParam':{
                'gridSource': JqxGridSource
            },
            'postData':{
                imsi: globeVarNewVsimTestinfo.ID.imsiID.val(),
                country: globeVarNewVsimTestinfo.ID.countryClass.val(),
                person: globeVarNewVsimTestinfo.ID.personClass.val()
            }
        };
        newVsimTestInfoTableGetAjaxAPI(ajaxParam);
    })
});
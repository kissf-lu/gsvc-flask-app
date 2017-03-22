/** Copyright (c) 2016, 2017, UKL and/or its affiliates. All rights reserved.
*
*
*
*/

/**
*GSVC API - - 为GSVC手工维护表、系统资源查询表接口js模块，包含：
*1、虚拟机手工维护表查询、导出、批量删除、更新、导入模块接口；
*2、系统卡状态信息查询接口；
*@author kissf lu
@since 02.10
*/

// prepare the data
var alertStr=('<div class="alert alert-warning" role="alert">'+
                   '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
						  '<span aria-hidden="true">&times;</span>'+
				   '</button>');

function  alert_func(alert_button_item,alert_doc) {
    var alertStr=('<div class="alert alert-warning" role="alert">'+
        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
        '<span aria-hidden="true">&times;</span>'+
        '</button>'+
        '<p>'+alert_doc+'</p>'+
        '</div>'
    );
    alert_button_item.children().detach();
    alert_button_item.append(alertStr);
}
/**===========================================================
 *
 *
 * @param init_select_class_list
 *
 *============================================================**/
function initSelectView(init_select_class_list){
    //select country:
    var country_data = [
        {text: 'AD'},{text: 'AE'},{text: 'AF'},{text: 'AG'},{text: 'AI'},{text: 'AL'},{text: 'AM'},{text: 'AO'},{text: 'AQ'},{text: 'AR'},{text: 'AS'},{text: 'AT'},{text: 'AU'},{text: 'AW'},{text: 'AX'},{text: 'AZ'},{text: 'BA'},{text: 'BB'},{text: 'BD'},{text: 'BE'},{text: 'BF'},{text: 'BG'},{text: 'BH'},{text: 'BI'},{text: 'BJ'},{text: 'BL'},{text: 'BM'},{text: 'BN'},{text: 'BO'},{text: 'BQ'},{text: 'BR'},{text: 'BS'},{text: 'BT'},{text: 'BV'},{text: 'BW'},{text: 'BY'},{text: 'BZ'},{text: 'CA'},{text: 'CC'},{text: 'CD'},{text: 'CF'},{text: 'CG'},{text: 'CH'},{text: 'CI'},{text: 'CK'},{text: 'CL'},{text: 'CM'},{text: 'CN'},{text: 'CO'},{text: 'CR'},{text: 'CU'},{text: 'CV'},{text: 'CW'},{text: 'CX'},{text: 'CY'},{text: 'CZ'},{text: 'DE'},{text: 'DJ'},{text: 'DK'},{text: 'DM'},{text: 'DO'},{text: 'DZ'},{text: 'EC'},{text: 'EE'},{text: 'EG'},{text: 'EH'},{text: 'ER'},{text: 'ES'},{text: 'ET'},{text: 'FI'},{text: 'FJ'},{text: 'FK'},{text: 'FM'},{text: 'FO'},{text: 'FR'},{text: 'GA'},{text: 'GB'},{text: 'GD'},{text: 'GE'},{text: 'GF'},{text: 'GG'},{text: 'GH'},{text: 'GI'},{text: 'GL'},{text: 'GM'},{text: 'GN'},{text: 'GP'},{text: 'GQ'},{text: 'GR'},{text: 'GS'},{text: 'GT'},{text: 'GU'},{text: 'GW'},{text: 'GY'},{text: 'HK'},{text: 'HM'},{text: 'HN'},{text: 'HR'},{text: 'HT'},{text: 'HU'},{text: 'ID'},{text: 'IE'},{text: 'IL'},{text: 'IM'},{text: 'IN'},{text: 'IO'},{text: 'IQ'},{text: 'IR'},{text: 'IS'},{text: 'IT'},{text: 'JE'},{text: 'JM'},{text: 'JO'},{text: 'JP'},{text: 'KE'},{text: 'KG'},{text: 'KH'},{text: 'KI'},{text: 'KM'},{text: 'KN'},{text: 'KP'},{text: 'KR'},{text: 'KW'},{text: 'KY'},{text: 'KZ'},{text: 'LA'},{text: 'LB'},{text: 'LC'},{text: 'LI'},{text: 'LK'},{text: 'LR'},{text: 'LS'},{text: 'LT'},{text: 'LU'},{text: 'LV'},{text: 'LY'},{text: 'MA'},{text: 'MC'},{text: 'MD'},{text: 'ME'},{text: 'MF'},{text: 'MG'},{text: 'MH'},{text: 'MK'},{text: 'ML'},{text: 'MM'},{text: 'MN'},{text: 'MO'},{text: 'MP'},{text: 'MQ'},{text: 'MR'},{text: 'MS'},{text: 'MT'},{text: 'MU'},{text: 'MV'},{text: 'MW'},{text: 'MX'},{text: 'MY'},{text: 'MZ'},{text: 'NA'},{text: 'NC'},{text: 'NE'},{text: 'NF'},{text: 'NG'},{text: 'NI'},{text: 'NL'},{text: 'NO'},{text: 'NP'},{text: 'NR'},{text: 'NU'},{text: 'NZ'},{text: 'OM'},{text: 'PA'},{text: 'PC'},{text: 'PE'},{text: 'PF'},{text: 'PG'},{text: 'PH'},{text: 'PK'},{text: 'PL'},{text: 'PM'},{text: 'PN'},{text: 'PR'},{text: 'PS'},{text: 'PT'},{text: 'PW'},{text: 'PY'},{text: 'QA'},{text: 'RE'},{text: 'RO'},{text: 'RS'},{text: 'RU'},{text: 'RW'},{text: 'SA'},{text: 'SB'},{text: 'SC'},{text: 'SD'},{text: 'SE'},{text: 'SG'},{text: 'SH'},{text: 'SI'},{text: 'SJ'},{text: 'SK'},{text: 'SL'},{text: 'SM'},{text: 'SN'},{text: 'SO'},{text: 'SR'},{text: 'ST'},{text: 'SV'},{text: 'SX'},{text: 'SY'},{text: 'SZ'},{text: 'TC'},{text: 'TD'},{text: 'TF'},{text: 'TG'},{text: 'TH'},{text: 'TJ'},{text: 'TK'},{text: 'TL'},{text: 'TM'},{text: 'TN'},{text: 'TO'},{text: 'TR'},{text: 'TT'},{text: 'TV'},{text: 'TW'},{text: 'TZ'},{text: 'UA'},{text: 'UG'},{text: 'UM'},{text: 'US'},{text: 'UY'},{text: 'UZ'},{text: 'VA'},{text: 'VC'},{text: 'VE'},{text: 'VG'},{text: 'VI'},{text: 'VN'},{text: 'VU'},{text: 'WF'},{text: 'WS'},{text: 'YE'},{text: 'YT'},{text: 'ZA'},{text: 'ZM'},{text: 'ZW'},{text: 'noCountry'}
        ];
    //select person：
    var person_data = [
        {text: '刘超'}, {text: '叶慧玲'}, {text: '郑天琴'}, {text: '曲薇'}, {text: '黄柳青'},
        {text: '凌刚'}, {text: '李红伟'}, {text: '王成'}, {text: '尚晨晨'}
        ];
    // select views
    init_select_class_list.class.classCountry.select2({
        data: country_data

    });
    init_select_class_list.class.classCountry.select2({
        placeholder: "国家",
        allowClear: true

    });
    //select 模块
    init_select_class_list.class.classPerson.select2({
        data: person_data
    });
    init_select_class_list.class.classPerson.select2({
        placeholder: "负责人",
        allowClear: true
    });
}
/**==================================================
 *  -------虚拟机下拉选选择菜单显示设置函数
 *
 * @param item_related_grid
 * @param item_jqx_drop_down
 *====================================================**/
function initManulDropDownList(item_related_grid, item_jqx_drop_down){

    var jqxDropDownList=[
        { label: 'imsi', value: 'imsi', checked: true },
        { label: '国家简码', value: 'country_iso', checked: true },
        { label: '国家', value: 'country_cn', checked: true },
        { label: '卡负责人', value: 'person_gsvc', checked: true },
        { label: '运营负责人', value: 'person_operator', checked: true },
        { label: '卡所在系统', value: 'sys', checked: true },
        { label: 'state', value: 'state', checked: true },
        { label: '卡位状态', value: 'slot_state', checked: true },
        { label: '是否代理商卡', value: 'owner_attr', checked: true },
        { label: '是否多国卡', value: 'country_attr', checked: true },
        { label: '卡批次', value: 'vsim_batch_num', checked: true },
        { label: 'BAM编码', value: 'bam_code', checked: true },
        { label: '卡位', value: 'slot_num', checked: true },
        { label: '运营商', value: 'operator', checked: true },
        { label: 'iccid', value: 'iccid', checked: true },
        { label: '套餐', value: 'package_type', checked: true},
        { label: '套餐外付费类型', value: 'charge_noflower', checked: true },
        { label: '激活日期', value: 'activated_time', checked: true},
        { label: '上次套餐更新日期', value: 'last_update_time', checked: true},
        { label: '下次套餐更新日期', value: 'next_update_time', checked: true},
        { label: '备注', value: 'remarks', checked: true},
        { label: '电话号码', value: 'phone_num', checked: true},
        { label: '电话号码', value: 'phone_num', checked: true},
        { label: '付费类型', value: 'pay_type', checked: true},
        { label: 'apn', value: 'apn', checked: true},
        { label: '上架日期', value: 'shelved_time', checked: true}
    ];
    initDropdownlist(item_jqx_drop_down, jqxDropDownList);

    item_jqx_drop_down.on('checkChange', function (event) {

        actionDropDownList(item_related_grid, event);
    });
}

/**     -------初始化显示选择函数
 *
 * @param item_related_grid
 * @param item_jqx_drop_down
 */
function initonSysDropDownList(item_related_grid, item_jqx_drop_down){
    var onSysjqxDropDownList=[
        { label: 'imsi', value: 'imsi', checked: true },
        { label: '国家简码', value: 'country', checked: true },
        {label: '套餐', value: 'package_type_name',checked: true },
        {label: 'state', value: 'state',checked: true },
        { label: '占用状态', value: 'occupy_status',checked: true },
        { label: '卡位状态', value: 'slot_status',checked: true },
        { label: '激活状态', value: 'activate_status',checked: true },
        { label: '认证状态', value: 'identify_status',checked: true },
        { label: '业务状态', value: 'business_status',checked: true },
        { label: 'BAM状态', value: 'bam_status',checked: true },
        { label: '套餐状态', value: 'package_status',checked: true },
        { label: '激活类型', value: 'activate_type',checked: true },
        { label: '本网可用', value: 'use_locally',checked: true },
        { label: '是否多国卡', value: 'vsim_type',checked: true },
        { label: '初始流量/MB', value: 'init_flow',checked: true },
        { label: '累计使用流量/MB', value: 'total_use_flow',checked: true },
        { label: '剩余流量/MB ', value: 'leave_flow',checked: true },
        { label: '激活日期', value: 'activate_time',checked: true },
        { label: '上次套餐更新时间', value: 'update_time',checked: true },
        { label: '下载套餐更新时间', value: 'next_update_time',checked: true },
        { label: 'iccid', value: 'iccid',checked: true },
        { label: 'BAM', value: 'bam_code',checked: true },
        { label: '卡位', value: 'slot_num',checked: true },
        { label: '机构', value: 'org_name',checked: true },
        { label: '备注', value: 'remarks',checked: true },
        { label: '系统', value: 'sys',checked: true }
    ];
    initDropdownlist(item_jqx_drop_down, onSysjqxDropDownList);

    item_jqx_drop_down.on('checkChange', function (event) {

        actionDropDownList(item_related_grid, event);
    });
}

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
/**=====================================================
 *  -------FilterPanel set func-------
 *======================================================
 *JqxGrid columns FilterPanel setting;
 * @param filterPanel panel to init;
 * @param datafield : grid column datafield param;
 * @param filterGrid : jquery type of grid DOC ID;
 * @param SrcAdapter : grid SrcAdapter param ;
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
    var column = filterGrid.jqxGrid('getcolumn', datafield);
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
        filterGrid.jqxGrid('addfilter', datafield, filtergroup);
        //apply the filters.
        filterGrid.jqxGrid('applyfilters');
        filterGrid.jqxGrid('closemenu');
    });
    filterbutton.keydown(function (event) {
        if (event.keyCode === 13) {
            filterbutton.trigger('click');
        }
    });
    filterclearbutton.click(function () {
        filterGrid.jqxGrid('removefilter', datafield);
        // apply the filters.
        filterGrid.jqxGrid('applyfilters');
        filterGrid.jqxGrid('closemenu');
    });
    filterclearbutton.keydown(function (event) {
        if (event.keyCode === 13) {
            filterclearbutton.trigger('click');
        }
        textInput.val("");
    });
};


//-----------------------------------------------------------虚拟机表格设置
//initjqxGrid完成表格数据加载表格、设置表格插件属性、列表属性、、、、
function initjqxGrid(initGrid){
    //定义表格与后台关联数据key值及对应前台显示数据类型
    var Srcsource ={
        localdata: [],
        datatype: "json",
        datafields: [
            { name: 'imsi', type: 'string' },
            { name: 'country_iso', type: 'string' },
            { name: 'country_cn', type: 'string' },
            { name: 'person_gsvc', type: 'string' },
            { name: 'person_operator', type: 'string' },
            { name: 'sys', type: 'string' },
            { name: 'state', type: 'string' },
            { name: 'slot_state', type: 'string' },
            { name: 'owner_attr', type: 'string' },
            { name: 'country_attr', type: 'string' },
            { name: 'vsim_batch_num', type: 'string' },
            { name: 'bam_code', type: 'string' },
            { name: 'slot_num', type: 'number' },
            { name: 'operator', type: 'string' },
            { name: 'iccid', type: 'string' },
            { name: 'package_type', type: 'string' },
            { name: 'charge_noflower', type: 'string' },
            { name: 'activated_time', type: 'date' },
            { name: 'last_update_time', type: 'date' },
            { name: 'next_update_time', type: 'date' },
            { name: 'remarks', type: 'string' },
            { name: 'phone_num', type: 'number' },
            { name: 'pay_type', type: 'string' },
            { name: 'apn', type: 'string' },
            { name: 'shelved_time', type: 'date' }
        ]
    };
    //装在虚拟机jqxgrid data adapter
    var SrcAdapter = new $.jqx.dataAdapter(Srcsource);
    // grid views
    initGrid.jqxGrid({
                width: "99.8%",
                height: 500,
                autoheight: true,
                source: SrcAdapter,
                filterable: true,
                columnsresize: true,
                enablebrowserselection: true,
                selectionmode: 'singlecell',
                editmode: 'selectedcell',
                altrows: true,
                sortable: true,
                pageable: true,
                pageSize: 200,
                autoHeight: false,
                pagesizeoptions:['200', '1000', '5000', '10000'],
                localization: getLocalization('zh-CN'),
                ready: function () {
                },
                autoshowfiltericon: true,
                columnmenuopening: function (menu, datafield, height) {
                    var column = initGrid.jqxGrid('getcolumn', datafield);
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
                      text: 'num',sortable: true,filterable: false,editable: false,groupable: false,
                      draggable: false,resizable: false,datafield: '',columntype: 'number',
                      cellsrenderer: function (row, column, value) {
                          return "<div style='margin:4px;'>" + (value + 1) + "</div>";
                      }
                    },
                    { text: 'imsi', datafield: 'imsi' , width: 150,filtertype: "custom",
                      createfilterpanel: function (datafield, filterPanel) {
                          buildFilterPanel(filterPanel, datafield, initGrid, SrcAdapter);
                      }
                    },
                    { text: '国家简码', datafield: 'country_iso' ,
                      filtertype: "custom",
                      createfilterpanel: function (datafield, filterPanel) {
                          buildFilterPanel(filterPanel, datafield, initGrid, SrcAdapter);
                      },
                      width: 70
                    },
                    { text: '国家', datafield: 'country_cn',filtertype: 'checkedlist',width: 70},
                    { text: '卡负责人', datafield: 'person_gsvc', filtertype: 'checkedlist', width: 80 },
                    { text: '运营负责人', datafield: 'person_operator', filtertype: 'checkedlist', width: 80 },
                    { text: '卡所在系统', datafield: 'sys', filtertype: 'checkedlist', width: 80 },
                    { text: 'state', datafield: 'state', filtertype: 'checkedlist', width: 70 },
                    { text: '卡位状态', datafield: 'slot_state', filtertype: 'checkedlist', width: 70 },
                    { text: '是否代理商卡', datafield: 'owner_attr', filtertype: 'checkedlist', width: 80 },
                    { text: '是否多国卡', datafield: 'country_attr', filtertype: 'checkedlist', width: 70 },
                    { text: '卡批次', datafield: 'vsim_batch_num',
                        filtertype: "custom",
                        createfilterpanel: function (datafield, filterPanel) {
                            buildFilterPanel(filterPanel, datafield, initGrid, SrcAdapter);
                        },
                      width: 100
                    },
                    { text: 'BAM编码', datafield: 'bam_code',
                        filtertype: "custom",
                        createfilterpanel: function (datafield, filterPanel) {
                            buildFilterPanel(filterPanel, datafield, initGrid, SrcAdapter);
                        },
                        width: 80
                    },
                    { text: '卡位', datafield: 'slot_num',
                        filtertype: "custom",
                        createfilterpanel: function (datafield, filterPanel) {
                            buildFilterPanel(filterPanel, datafield, initGrid, SrcAdapter);
                        },
                        width: 80
                    },
                    { text: '运营商', datafield: 'operator', filtertype: 'checkedlist', width: 70},
                    { text: 'iccid', datafield: 'iccid',
                      filtertype: "custom",
                      createfilterpanel: function (datafield, filterPanel) {
                          buildFilterPanel(filterPanel, datafield, initGrid, SrcAdapter);
                      },
                      width: 200
                    },
                    { text: '套餐', datafield: 'package_type', filtertype: 'checkedlist' , width: 200  },
                    { text: '套餐外付费类型', datafield: 'charge_noflower', filtertype: 'checkedlist' , width: 100  },
                    { text: '激活日期', datafield: 'activated_time', filtertype: 'date', cellsformat: 'yyyy-MM-dd HH:mm:ss', width: 170 },
                    { text: '上次套餐更新日期', datafield: 'last_update_time', filtertype: 'date', cellsformat: 'yyyy-MM-dd HH:mm:ss', width: 170 },
                    { text: '下次次套餐更新日期', datafield: 'next_update_time', filtertype: 'date', cellsformat: 'yyyy-MM-dd HH:mm:ss', width: 170 },
                    { text: '备注', datafield: 'remarks' , width: 100 },
                    { text: '电话号码', datafield: 'phone_num' , width: 100 },
                    { text: '付费类型', datafield: 'pay_type', filtertype: 'checkedlist' , width: 100 },
                    { text: 'apn', datafield: 'apn', width: 170 },
                    { text: '上架日期', datafield: 'shelved_time', filtertype: 'date', cellsformat: 'yyyy-MM-dd HH:mm:ss', width: 170 }
                ]
    });

    return Srcsource;
}
function manualGridExcelExport(grid_item, alert_item, url) {
    var rows = grid_item.jqxGrid('getdisplayrows');
    var alldatanum= rows.length;
    var view_data=[];
    var json_data={'data':view_data};
    var paginginformation = grid_item.jqxGrid('getpaginginformation');
    // The page's number.
    var pagenum = paginginformation.pagenum;
    // The page's size.
    var pagesize = paginginformation.pagesize;
    // The number of all pages.
    var pagescount = paginginformation.pagescount;
    if (alldatanum==0){
        //delete old alter
        alert_func(
            alert_item,
            '无输出数据!'
        );
    }
    else{
        for(var i = 0; i < rows.length; i++){
            if (i==pagenum*pagesize){
                for (var j = 0; j< pagesize; j++){
                    if (i+j< alldatanum){
                        view_data.push({
                            imsi: rows[i+j].imsi,
                            country_iso: rows[i+j].country_iso,
                            country_cn: rows[i+j].country_cn,
                            GSVC负责人: rows[i+j].person_gsvc,
                            运营负责人: rows[i+j].person_operator,
                            系统: rows[i+j].sys,
                            state: rows[i+j].state,
                            slot_state: rows[i+j].slot_state,
                            是否代理商卡: rows[i+j].owner_attr,
                            是否多国卡: rows[i+j].country_attr,
                            卡批次: rows[i+j].vsim_batch_num,
                            BAM编码: rows[i+j].bam_code,
                            卡位: rows[i+j].slot_num,
                            operator: rows[i+j].operator,
                            iccid: rows[i+j].iccid,
                            套餐:rows[i+j].package_type,
                            套餐外付费类型:rows[i+j].charge_noflower,
                            激活日期:rows[i+j].activated_time,
                            上次套餐更新日期: rows[i+j].last_update_time,
                            下次套餐更新日期: rows[i+j].next_update_time,
                            备注:rows[i+j].remarks,
                            电话号码:rows[i+j].phone_num,
                            付费类型:rows[i+j].pay_type,
                            apn:rows[i+j].apn,
                            上架日期:rows[i+j].shelved_time
                        })
                    }

                }
            }
        }
        excelExport(json_data, alert_item, url);
    }
    return false;
}
/**============================================================================
 *  -------export xls files by submitting json data to server-------
 *
 * using submit method to submit json value to service and export xls to users.
 * @param data: data like {'data':view_data} ;
 * @param item_alert: jquery type warn DOC ID ;
 * @return {boolean} return false to forbid DOC fresh;
 *==============================================================================**/
function excelExport(data,item_alert, url) {
    var exportdata=data;
    if (exportdata.data==[]){
        // alter
        alert_func(item_alert, '无输出数据！');
    }
    else{
        var temp = document.createElement("form");
        temp.action = url;
        temp.method = "post";
        temp.style.display = "none";
        var opt = document.createElement("textarea");
        opt.name = "data";
        opt.value = JSON.stringify(exportdata.data);
        temp.appendChild(opt);
        document.body.appendChild(temp);
        temp.submit();
    }
    return false;
}

function actionManulAjaxAPI(grid_src_array, manual_ajax_param) {
    // clear old data
    var Country = manual_ajax_param.postData.country;
    var Person = manual_ajax_param.postData.person;
    if (Country==''){
        //
        alert_func(
            manual_ajax_param.item.manualAlertID,
            "请设置查询国家!"
        );
    } else{
        var gridArray = [];
        // clear old data
        manual_ajax_param.item.gridManualID.jqxGrid("clear");
        //清空遗留告警
        manual_ajax_param.item.manualAlertID.children().detach();
        manual_ajax_param.item.gridManualID.jqxGrid('showloadelement');
        //disable query button before return data
        manual_ajax_param.item.gridDataGetID.attr("disabled", true);
        // ajax request begin
        var AjaxManualRequest = $.ajax({
            type: "POST",
            //url地址
            url: $SCRIPT_ROOT + '/api/v1.0/get_srcVsimManulInfor/',
            //request set
            contentType: "application/json",
            //data参数
            data: JSON.stringify(manual_ajax_param.postData),
            //server back data type
            dataType: "json"
        })
            .done(function(data){
                var getData = data;
                if (getData.data.length==0){
                    if (getData.info.err){
                        //delete old alter
                        alert_func(
                            manual_ajax_param.item.manualAlertID,
                            ("Error："+getData.info.errinfo)
                        );
                    }
                    else{
                        alert_func(manual_ajax_param.item.manualAlertID,
                            ("无查询结果!")
                        );
                    }
                }
                else{
                    gridArray = [];
                    $.each( getData.data, function(i, item){
                        gridArray.push({
                            imsi: item.imsi,
                            country_iso: item.country_iso,
                            country_cn: item.country_cn,
                            person_gsvc: item.person_gsvc,
                            person_operator: item.person_operator,
                            sys: item.sys,
                            state: item.state,
                            slot_state: item.slot_state,
                            owner_attr: item.owner_attr,
                            country_attr: item.country_attr,
                            vsim_batch_num: item.vsim_batch_num,
                            bam_code: item.bam_code,
                            slot_num: item.slot_num,
                            operator: item.operator,
                            iccid: item.iccid,
                            package_type:item.package_type,
                            charge_noflower:item.charge_noflower,
                            activated_time: item.activated_time,
                            last_update_time: item.last_update_time,
                            next_update_time: item.next_update_time,
                            remarks: item.remarks,
                            phone_num: item.phone_num,
                            pay_type: item.pay_type,
                            apn: item.apn,
                            shelved_time: item.shelved_time
                        });
                    });//each函数完成
                    // set the new data
                    grid_src_array.localdata = gridArray;
                    manual_ajax_param.item.gridManualID.jqxGrid('updatebounddata');
                }
            })
            .fail(function(jqXHR, status){
                // clear old data
                manual_ajax_param.item.gridManualID.jqxGrid("clear");
                // alert model
                alert_func(
                    manual_ajax_param.item.manualAlertID,
                    ("Servers False!")
                );
            })
            .always(function() {
                gridArray = [];
                manual_ajax_param.item.gridDataGetID.attr("disabled", false);
            });
    }
}
/**=========================================
 *
 * @param grid_id
 *==========================================**/
function flashManualGrid(grid_id) {
    grid_id.jqxGrid('updatebounddata');
}
//初始化现网表格函数
function initonSysjqxGrid(grid_item){
    var onSysSrcsource ={
        localdata: [],
        datatype: "json",
        datafields: [
            {name: 'imsi', type: 'string' },
            {name: 'country', type: 'string' },
            {name: 'package_type_name', type: 'string' },
            {name: 'state', type: 'string' },
            {name: 'occupy_status', type: 'string' },
            {name: 'slot_status', type: 'string' },
            {name: 'activate_status', type: 'string' },
            {name: 'identify_status', type: 'string' },
            {name: 'business_status', type: 'string' },
            {name: 'bam_status', type: 'string' },
            {name: 'package_status', type: 'string' },
            {name: 'activate_type', type: 'string' },
            {name: 'use_locally', type: 'string' },
            {name: 'vsim_type', type: 'string' },
            {name: 'init_flow', type: 'number' },
            {name: 'total_use_flow', type: 'number' },
            {name: 'leave_flow', type: 'number' },
            {name: 'activate_time', type: 'date' },
            {name: 'update_time', type: 'date' },
            {name: 'next_update_time', type: 'date' },
            {name: 'iccid', type: 'string' },
            {name: 'bam_code', type: 'string' },
            {name: 'slot_num', type: 'number' },
            {name: 'org_name', type: 'string' },
            {name: 'remarks', type: 'string' }
        ]
    };
    //装载现网机jqxgrid data adapter:
    var onSysSrcAdapter = new $.jqx.dataAdapter(onSysSrcsource);
    // grid views
    grid_item.jqxGrid({
                width: "99.8%",
                autoheight: true,
                source: onSysSrcAdapter,
                filterable: true,
                columnsresize: true,
                enablebrowserselection: true,
                selectionmode: 'multiplerows',
                altrows: true,
                sortable: true,
                pageable: true,
                pageSize: 200,
                autoHeight: false,
                pagesizeoptions:['200', '1000', '5000','10000'],
                localization: getLocalization('zh-CN'),
                ready: function () {
                },
                autoshowfiltericon: true,
                columnmenuopening: function (menu, datafield, height) {
                    var column = grid_item.jqxGrid('getcolumn', datafield);
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
                    datafield: '',
                    sortable: true,
                    filterable: false,
                    editable: false,
                    groupable: false,
                    draggable: false,
                    resizable: false,
                    columntype: 'number',
                    width: 50,
                    cellsrenderer: function (row, column, value) {
                        return "<div style='margin:4px;'>" + (value + 1) + "</div>";
                    }
                    },
                    {
                        text: 'imsi',
                        datafield: 'imsi',
                        filtertype: "custom",
                        createfilterpanel: function (datafield, filterPanel) {
                            buildFilterPanel(filterPanel, datafield, grid_item, onSysSrcAdapter);
                        },
                        width: 150
                    },
                    {
                        text: '国家简码', datafield: 'country' ,
                        filtertype: "custom",
                        createfilterpanel: function (datafield, filterPanel) {
                            buildFilterPanel(filterPanel, datafield, grid_item, onSysSrcAdapter);
                        },
                        width: 70
                    },
                    { text: '卡分组属性', datafield: 'org_name', filtertype: 'checkedlist', width: 80 },
                    { text: '套餐', datafield: 'package_type_name', filtertype: 'checkedlist' , width: 200  },
                    { text: 'state', datafield: 'state', filtertype: 'checkedlist' , width: 80  },
                    { text: '占用状态', datafield: 'occupy_status', filtertype: 'checkedlist', width: 80 },
                    { text: '卡位状态', datafield: 'slot_status', filtertype: 'checkedlist', width: 80 },
                    { text: '激活状态', datafield: 'activate_status', filtertype: 'checkedlist', width: 80 },
                    { text: '认证状态', datafield: 'identify_status', filtertype: 'checkedlist', width: 80 },
                    { text: '业务状态', datafield: 'business_status', filtertype: 'checkedlist', width: 80 },
                    { text: 'BAM状态', datafield: 'bam_status', filtertype: 'checkedlist', width: 80 },
                    { text: '套餐状态', datafield: 'package_status', filtertype: 'checkedlist', width: 80 },
                    { text: '激活类型', datafield: 'activate_type', filtertype: 'checkedlist', width: 80 },
                    { text: '本网可用', datafield: 'use_locally', filtertype: 'checkedlist', width: 80 },
                    { text: '是否多国卡', datafield: 'vsim_type', filtertype: 'checkedlist', width: 80 },
                    { text: '初始流量/MB', datafield: 'init_flow', filtertype: 'checkedlist', width: 80 },
                    { text: '累计使用流量/MB', datafield: 'total_use_flow', filtertype: 'checkedlist', width: 80 },
                    { text: '剩余流量/MB', datafield: 'leave_flow', width: 80 },
                    { text: '激活日期', datafield: 'activate_time', filtertype: 'date', cellsformat: 'yyyy-MM-dd HH:mm:ss', width: 170 },
                    { text: '上次套餐更新时间', datafield: 'update_time', filtertype: 'date', cellsformat: 'yyyy-MM-dd HH:mm:ss', width: 170 },
                    { text: '下载套餐更新时间', datafield: 'next_update_time', filtertype: 'date', cellsformat: 'yyyy-MM-dd HH:mm:ss', width: 170 },
                    {text: 'iccid', datafield: 'iccid',width: 200},
                    {text: 'BAM编码', datafield: 'bam_code',width: 80},
                    {text: '卡位', datafield: 'slot_num',width: 80},
                    {text: '备注', datafield: 'remarks', width: 200}
                ]
    });

    return onSysSrcsource;
}
//=======================================================================
function sysGridExcelExport(grid_item, alert_item) {
    var rows = grid_item.jqxGrid('getdisplayrows');
    var alldatanum= rows.length;
    var view_data=[];
    var json_data={'data':view_data};
    var paginginformation = grid_item.jqxGrid('getpaginginformation');
    // The page's number.
    var pagenum = paginginformation.pagenum;
    // The page's size.
    var pagesize = paginginformation.pagesize;
    // The number of all pages.
    var pagescount = paginginformation.pagescount;
    if (alldatanum==0){
        //delete old alter
        alert_func(
            alert_item,
            '无输出数据!'
        );
    }
    else{
        for(var i = 0; i < rows.length; i++){
            if (i==pagenum*pagesize){
                for (var j = 0; j< pagesize; j++){
                    if (i+j< alldatanum){
                        view_data.push({
                            imsi: rows[i+j].imsi,
                            country: rows[i+j].country,
                            卡分组属性: rows[i+j].org_name,
                            套餐: rows[i+j].package_type_name,
                            state: rows[i+j].state,
                            占用状态: rows[i+j].occupy_status,
                            卡位状态: rows[i+j].slot_status,
                            激活状态: rows[i+j].activate_status,
                            认证状态: rows[i+j].identify_status,
                            业务状态: rows[i+j].business_status,
                            BAM状态: rows[i+j].bam_status,
                            套餐状态: rows[i+j].package_status,
                            激活类型: rows[i+j].activate_type,
                            本网可用: rows[i+j].use_locally,
                            是否多国卡: rows[i+j].vsim_type,
                            初始流量MB: rows[i+j].init_flow,
                            累计使用流量MB: rows[i+j].total_use_flow,
                            剩余流量MB: rows[i+j].leave_flow,
                            激活日期: rows[i+j].activate_time,
                            上次套餐更新日期: rows[i+j].update_time,
                            下次套餐更新日期: rows[i+j].next_update_time,
                            iccid: rows[i+j].iccid,
                            BAM编码: rows[i+j].bam_code,
                            卡位: rows[i+j].slot_num,
                            备注: rows[i+j].remarks
                        })
                    }

                }
            }
        }
        excelExport(json_data, alert_item);
    }
    return false;
}
//现网excel导出栏
$("#").click(function () {
     var rows = $('#OnSysjqxgrid').jqxGrid('getdisplayrows');
     var alldatanum= rows.length;
     var view_data=[];
     var json_data={'data':view_data};
     var paginginformation =
     $('#OnSysjqxgrid').jqxGrid('getpaginginformation');
     // The page's number.
     var pagenum = paginginformation.pagenum;
     // The page's size.
     var pagesize = paginginformation.pagesize;
     // The number of all pages.
     var pagescount = paginginformation.pagescount;
     if (alldatanum==0){
         //delete old alter
        $("#onSysapp-growl").children().detach();
        $("#onSysappapp-growl").append((alertStr+'<p>无输出数据！</p></div>'));
     }
     else{
         for(var i = 0; i < rows.length; i++){
             if (i==pagenum*pagesize){
                 for (var j = 0; j< pagesize; j++){
                     if (i+j< alldatanum){
                         view_data.push({
                         imsi: rows[i+j].imsi,
                         country: rows[i+j].country,
                         卡分组属性: rows[i+j].org_name,
                         套餐: rows[i+j].package_type_name,
                         state: rows[i+j].state,
                         占用状态: rows[i+j].occupy_status,
                         卡位状态: rows[i+j].slot_status,
                         激活状态: rows[i+j].activate_status,
                         认证状态: rows[i+j].identify_status,
                         业务状态: rows[i+j].business_status,
                         BAM状态: rows[i+j].bam_status,
                         套餐状态: rows[i+j].package_status,
                         激活类型: rows[i+j].activate_type,
                         本网可用: rows[i+j].use_locally,
                         是否多国卡: rows[i+j].vsim_type,
                         初始流量MB: rows[i+j].init_flow,
                         累计使用流量MB: rows[i+j].total_use_flow,
                         剩余流量MB: rows[i+j].leave_flow,
                         激活日期: rows[i+j].activate_time,
                         上次套餐更新日期: rows[i+j].update_time,
                         下次套餐更新日期: rows[i+j].next_update_time,
                         iccid: rows[i+j].iccid,
                         BAM编码: rows[i+j].bam_code,
                         卡位: rows[i+j].slot_num,
                         备注: rows[i+j].remarks
                         })
                     }

                 }
             }
         }
         //$("#OnSysjqxgrid").jqxGrid('exportdata', 'xls', 'onSys-SRCVsimInfo', true, view_data);
         excelExportOnSys(json_data);
     }
     return false;

 });

 function excelExportOnSys(data) {
     var exportdata=data;

     if (exportdata.data==[]){
         //delete old alter
         $("#app-growl").children().detach();
         $("#app-growl").append((alertStr+'<p>无输出数据！</p></div>'));
         }
     else{
          var temp = document.createElement("form");
          temp.action = $SCRIPT_ROOT +"/api/v1.0/export_OnSysInfo/";              //"/test_exportExcel";
          temp.method = "post";
          temp.style.display = "none";
          var opt = document.createElement("textarea");
          opt.name = "data";
          opt.value = JSON.stringify(exportdata.data);
          temp.appendChild(opt);
          document.body.appendChild(temp);
          temp.submit();
      }
      return false;
}
//------------------------------------------------------------现网excel导出栏--end--------------------------
function sysGridDataGetAjax(grid_src_array, sysArgs) {
    var Country = sysArgs.sysCountry.val();
    var queryPost = {};
    if (Country=='' ){
        //delete old alter
        alert_func(
            sysArgs.sysAlertID,
            ("请设置查询国家!")
        );
    }
    else {
        sysArgs.sysAlertID.children().detach();
        queryPost = {
            country: Country
        };
        // clear old data
        onSysgridArrayData = [];
        sysArgs.sysGridID.jqxGrid("clear");
        sysArgs.sysGridID.jqxGrid('showloadelement');
        //disable querry button before Results return
        sysArgs.sysGridDataGetID.attr("disabled", true);
        var AjaxSysSrcRequest = $.ajax({
            type: "POST",
            //url地址
            url: $SCRIPT_ROOT + '/api/v1.0/get_onSysSrc/',
            //request set
            contentType: "application/json",
            //data参数
            data: JSON.stringify(queryPost),
            //server back data type
            dataType: "json"
        })
            .done(function(data){
                // clear old data
                onSysgridArrayData = [];
                sysArgs.sysGridID.jqxGrid("clear");
                var getData = data;
                if (getData.data.length==0){
                    if (getData.info.err){
                        //delete old alter
                        alert_func(
                            sysArgs.sysAlertID,
                            ('Error：'+getData.info.errinfo)
                        );
                    }
                    else{
                        alert_func(
                            sysArgs.sysAlertID,
                            ('无查询结果!')
                        );
                    }
                }
                else{
                    $.each( getData.data, function(i, item){
                        onSysgridArrayData.push({
                            imsi: item.imsi,
                            country: item.country,
                            package_type_name: item.package_type_name,
                            state: item.state,
                            occupy_status: item.occupy_status,
                            slot_status: item.slot_status,
                            activate_status: item.activate_status,
                            identify_status: item.identify_status,
                            business_status: item.business_status,
                            bam_status: item.bam_status,
                            package_status: item.package_status,
                            activate_type: item.activate_type,
                            use_locally: item.use_locally,
                            vsim_type: item.vsim_type,
                            init_flow: item.init_flow,
                            total_use_flow: item.total_use_flow,
                            leave_flow: item.leave_flow,
                            activate_time: item.activate_time,
                            update_time: item.update_time,
                            next_update_time: item.next_update_time,
                            iccid: item.iccid,
                            bam_code: item.bam_code,
                            slot_num: item.slot_num,
                            org_name: item.org_name,
                            remarks: item.remarks,
                            sys: item.sys
                        });
                    });//each函数完成
                    // set the new data
                    grid_src_array.localdata = onSysgridArrayData;
                    sysArgs.sysGridID.jqxGrid('updatebounddata');
                }
            })
            .fail(function(jqXHR, status){
                // clear old data
                onSysgridArrayData = [];
                sysArgs.sysGridID.jqxGrid("clear");
                //
                alert_func(
                    sysArgs.sysAlertID,
                    ('Servers False!')
                );
            })
            .always(function() {
                sysArgs.sysGridDataGetID.attr("disabled", false);
            });
    }
}
//现网ajax获取表格方法
$("#").click(function () {
    // clear old data
    $("#onSysapp-growl").children().detach();
    // 获取国家参数
    var Country=$("#onSys-form-country").val();
    // post data
    var queryPost = {};
    if (Country=='' ){
        //delete old alter
        $("#onSysapp-growl").children().detach();
        $("#onSysapp-growl").append((alertStr+'<p>请设置查询国家!</p></div>'));
    }
    else{
        queryPost = {
                country: Country
                };
        // clear old data
        onSysgridArrayData = [];
        $("#OnSysjqxgrid").jqxGrid("clear");
        $('#OnSysjqxgrid').jqxGrid('showloadelement');
        //disable querry button before Results return
        $("#onSysSrcVsimDataGet").attr("disabled", true);
        // ajax request begin
        var AjaxSysSrcRequest = $.ajax({
            type: "POST",
            //url地址
            url: $SCRIPT_ROOT + '/api/v1.0/get_onSysSrc/',
            //request set
            contentType: "application/json",
            //data参数
            data: JSON.stringify(queryPost),
            //server back data type
            dataType: "json"
        })
        .done(function(data){
            // clear old data
            onSysgridArrayData = [];
			$("#OnSysjqxgrid").jqxGrid("clear");
            var getData = data;
            if (getData.data.length==0){
                if (getData.info.err){
                    //delete old alter
				    $("#onSysapp-growl").append(
						                alertStr +
						                '<p>Error：'+ getData.info.errinfo +'</p></div>'
					);
                }
                else{
					 $("#onSysapp-growl").append(
						                 alertStr +
						                 '<p>无查询结果!</p></div>'
					 );
                }
            }
            else{
                $.each( getData.data, function(i, item){
                                      onSysgridArrayData.push({
                                                   imsi: item.imsi,
                                                   country: item.country,
                                                   package_type_name: item.package_type_name,
                                                   state: item.state,
                                                   occupy_status: item.occupy_status,
                                                   slot_status: item.slot_status,
                                                   activate_status: item.activate_status,
                                                   identify_status: item.identify_status,
                                                   business_status: item.business_status,
                                                   bam_status: item.bam_status,
                                                   package_status: item.package_status,
                                                   activate_type: item.activate_type,
                                                   use_locally: item.use_locally,
                                                   vsim_type: item.vsim_type,
                                                   init_flow: item.init_flow,
                                                   total_use_flow: item.total_use_flow,
                                                   leave_flow: item.leave_flow,
                                                   activate_time: item.activate_time,
                                                   update_time: item.update_time,
                                                   next_update_time: item.next_update_time,
                                                   iccid: item.iccid,
                                                   bam_code: item.bam_code,
                                                   slot_num: item.slot_num,
                                                   org_name: item.org_name,
                                                   remarks: item.remarks,
                                                   sys: item.sys
                                       });
                });//each函数完成
                // set the new data
                onSysSrcsource.localdata = onSysgridArrayData;
				$('#OnSysjqxgrid').jqxGrid('updatebounddata');
			}
        })
        .fail(function(jqXHR, status){
            // clear old data
            onSysgridArrayData = [];
			$("#OnSysjqxgrid").jqxGrid("clear");
			//
            $("#onSysapp-growl").append(
                                     alertStr + status +
						             '<p>Servers False!</p></div>'
			);
        })
        .always(function() {
            $("#onSysSrcVsimDataGet").attr("disabled", false);
        });
    }
});
//--------------------------------------------------------现网ajax获取表格方法--end------------------------

//doc ready func
$(function () {
    var simManualGlobalParam = {};
    simManualGlobalParam = {
        class:{
            classCountry: $(".select-country"),
            classPerson: $(".select-person")
        },
        item: {
            manual: {
                manualGridID: $("#jqxgrid"),
                manualDropDownID: $("#jqxDropDownList"),
                manualCountryID: $("#manual-form-country"),
                manualPersonID: $("#manual-form-person"),
                manualDataGetID: $("#SrcVsimDataGet"),
                manualAlertID: $("#manual_alert"),
                manualGridFlash: $('#manualGridFlash'),
                manualExcelExport: $('#manual_excel_export')
            },
            sys:{
                sysGridID: $('#sys_grid'),
                sysDropDownID: $("#sys_drop_down_list"),
                sysGridFlashID: $('#sysGridFlash'),
                sysGridDataGetID: $('#sys_grid_data_get'),
                sysAlertID: $('#sys_alert'),
                sysCountry: $('#sys_form_country'),
                sysExcelExport: $('#sys_excel_export')
            }
        }
    };
    //===================================================
    //select model init
    initSelectView(simManualGlobalParam);
    //======================================================
    //manual drop down list init
    initManulDropDownList(
        simManualGlobalParam.item.manual.manualGridID,
        simManualGlobalParam.item.manual.manualDropDownID
    );
    // =====================================================
    // init system drop down model
    initonSysDropDownList(
        simManualGlobalParam.item.sys.sysGridID,
        simManualGlobalParam.item.sys.sysDropDownID
    );
    //================================================
    //初始manual表格
    var JqxGridManulSrcSource = initjqxGrid(simManualGlobalParam.item.manual.manualGridID);
    //=====================================================================================
    //manual grid flash
    simManualGlobalParam.item.manual.manualGridFlash.click(function () {
        flashManualGrid(simManualGlobalParam.item.manual.manualGridID);
    });
    // manual ajax get src data
    simManualGlobalParam.item.manual.manualDataGetID.click(function (){
        var ajaxManualParam = {
            item: {
                gridManualID: simManualGlobalParam.item.manual.manualGridID,
                gridDataGetID: simManualGlobalParam.item.manual.manualDataGetID,
                manualAlertID: simManualGlobalParam.item.manual.manualAlertID
            },
            postData:{
                country: simManualGlobalParam.item.manual.manualCountryID.val(),
                person: simManualGlobalParam.item.manual.manualPersonID.val()
            }
        };
        actionManulAjaxAPI(JqxGridManulSrcSource, ajaxManualParam);
        return false;
    });
    //manual grid excel
    simManualGlobalParam.item.manual.manualExcelExport.click(function () {
        var exportUrl = $SCRIPT_ROOT +"/api/v1.0/export_ManualInfo/";
        manualGridExcelExport(
            simManualGlobalParam.item.manual.manualGridID,
            simManualGlobalParam.item.manual.manualAlertID,
            exportUrl
        );
    });
    //================
    //初始化系统统计表单
    var sysGridSrcSource= initonSysjqxGrid(
        simManualGlobalParam.item.sys.sysGridID
    );
    //sys grid flash
    simManualGlobalParam.item.sys.sysGridFlashID.click(function () {
        flashManualGrid(simManualGlobalParam.item.sys.sysGridID);
    });
    //==================================================================
    //sys grid data get
    simManualGlobalParam.item.sys.sysGridDataGetID.click(function () {
        sysGridDataGetAjax(sysGridSrcSource, simManualGlobalParam.item.sys);
    });
});

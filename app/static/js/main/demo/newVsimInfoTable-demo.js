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
        placeholder: "国家",
        allowClear: true

    });
    //select 模块
    init_select_class_list.person.select2({
        data: person_data
    });
    $(".select-person").select2({
        placeholder: "负责人",
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
/**=====================================================================
 *  -------init drop down model func-------
 *=====================================================================
 * @param item_drop_down_list: jquery type of drop down list DOC ID
 *
 *=====================================================================**/
function initDropDownList(item_drop_down_list){
    // Create a jqxDropDownList
    var country140jqxDropDownList=[
        { label: 'imsi', value: 'imsi', checked: true },
        { label: '国际流量', value: 'externalflower', checked: true },
        { label: '国内流量', value: 'internalflower', checked: true },
        { label: '总计流量', value: 'all', checked: true },
        { label: '国际流量占比', value: 'percentage', checked: true },
        { label: '套餐类型', value: 'package_type', checked: true },
        { label: '网络集名', value: 'groupname', checked: true },
        { label: 'ORG', value: 'org', checked: true },
        { label: 'state', value: 'state', checked: true }
    ];
    // drop down model set
    item_drop_down_list.jqxDropDownList({
        checkboxes: true,
        source: country140jqxDropDownList,
        autoOpen:true,
        animationType:'fade',
        filterable: true,
        dropDownHeight: 300,
        Width:150
    });
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
            { name: 'imsi', type: 'string' },
            { name: 'externalflower', type: 'number' },
            { name: 'internalflower', type: 'number' },
            { name: 'all', type: 'number' },
            { name: 'percentage', type: 'number' },
            { name: 'package_type', type: 'string' },
            { name: 'groupname', type: 'string' },
            { name: 'org', type: 'string' },
            { name: 'state', type: 'number' }
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
            { text: 'imsi', datafield: 'imsi' , width: 150,
                filtertype: "custom",
                createfilterpanel: function (datafield, filterPanel) {
                    buildFilterPanel(filterPanel, datafield, $jqGridItem,SrcAdapter);
                }
            },
            { text: '国际流量', datafield: 'externalflower' ,width: 100},
            { text: '国内流量', datafield: 'internalflower',width: 100},
            { text: '总计流量', datafield: 'all', width: 100 },
            { text: '国际流量占比', datafield: 'percentage', width: 100 },
            { text: '套餐类型', datafield: 'package_type', filtertype: 'checkedlist', width: 300 },
            { text: '网络集名', datafield: 'groupname', filtertype: 'checkedlist', width: 180 },
            { text: 'ORG', datafield: 'org', filtertype: 'checkedlist', width: 180 },
            { text: 'state', datafield: 'state', filtertype: 'checkedlist', width: 100 }
        ]
    });
    return Srcsource;
}


$(function () {

    //init select2 model
    alert("ok!");
    var $classCountry = $(".select-country");
    var $classPerson = $(".select-person");
    var initSelectClassList = {
        country: $classCountry,
        person: $classPerson
    };
    initSelectView(initSelectClassList);

});
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
/**
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
function init140DropDownList(item_drop_down_list){
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

});
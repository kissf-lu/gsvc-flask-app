/**
 * This js is 140 country flower static javascript
 * @author kissf_lu
 * @copyright kissf_lu
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
/**     -------init jqxgrid func-------
 *
 * @param initGrid
 * @param array
 * @return {{localdata: *, datatype: string, datafields: [*,*,*,*,*,*,*,*,*]}}
 */
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
/**     -------init drop down model func-------
 *
 * @param item_drop_down_list: jquery type of drop down list DOC ID
 */
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
/**     -------check if show or hide of jqxgrid column func-------
 *
 * @param jqxgrid_item
 * @param event
 */
function onCheckChange140countryShowHiden(jqxgrid_item, event) {
    var $jqgrid140country = jqxgrid_item;
    $jqgrid140country.jqxGrid('beginupdate');
    if (event.args.checked) {
        $jqgrid140country.jqxGrid('showcolumn', event.args.value);
    }else {
        $jqgrid140country.jqxGrid('hidecolumn', event.args.value);
    }
    $jqgrid140country.jqxGrid('endupdate');

}
/**     -------obtain 140country static data as json data  func-------
 *
 * get grid tab data as json forms and pass json to excelExport() func to export data to xls files
 * @param item_jqxgrid
 * @param item_app_growl
 * @return {boolean}
 *
 */
function excelExportAPI(item_jqxgrid,item_app_growl) {
    //
    var rows = item_jqxgrid.jqxGrid('getdisplayrows');
    var alldatanum= rows.length;
    var view_data=[];
    var json_data={'data':view_data};
    var paginginformation = item_jqxgrid.jqxGrid('getpaginginformation');
    // The page's number.
    var pagenum = paginginformation.pagenum;
    // The page's size.
    var pagesize = paginginformation.pagesize;
    // The number of all pages.
    var pagescount = paginginformation.pagescount;
    if (alldatanum==0){
        //alter
        alert_func(item_app_growl,'无输出数据！');
    }
    else{
        for(var i = 0; i < rows.length; i++){
            if (i==pagenum*pagesize){
                for (var j = 0; j< pagesize; j++){
                    if (i+j< alldatanum){
                        view_data.push({
                            imsi: rows[i+j].imsi,
                            国际流量: rows[i+j].externalflower,
                            国内流量: rows[i+j].internalflower,
                            总计流量: rows[i+j].all,
                            国际流量占比: rows[i+j].percentage,
                            套餐类型: rows[i+j].package_type,
                            网络集名: rows[i+j].groupname,
                            ORG: rows[i+j].org,
                            state: rows[i+j].state
                        })
                    }
                }
            }
        }
        excelExport(json_data,item_app_growl);
    }
    return false;
}
/**     -------export xls files by submitting json data to server-------
 *
 * using submit method to submit json value to service and export xls to users.
 * @param data: data like {'data':view_data} ;
 * @param item_app_growl: jquery type warn DOC ID ;
 * @return {boolean} return false to forbid DOC fresh;
 */
function excelExport(data,item_app_growl) {
     var exportdata=data;
     var $appAlertItem=item_app_growl;
     if (exportdata.data==[]){
         // alter
         alert_func($appAlertItem, '无输出数据！');
         }
     else{
          var temp = document.createElement("form");
          temp.action = $SCRIPT_ROOT +"/api/v1.0/export_140country/";
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
/**     -------post ajax func-------
 *
 * @param jqxgrid_data: set jqxgrid Srcsource.localdata ;
 * @param JqxGridSrcSource: jqxgrid param. get jqxgrid Srcsource.localdata
 *        to reload jqxgrid data from server return data;
 * @param post_data: {} data posted to server;
 * @param item_grid: jquery type  of jqxgrid DOC ID;
 * @param item_action: jquery type action button DOC ID, to forbid redo action;
 * @param item_app_growl: jquery type warn DOC ID;
 * @return {boolean} forbid html fresh.
 */
function action140StaticAjaxAPI(jqxgrid_data, JqxGridSrcSource, post_data,item_grid, item_action, item_app_growl) {
    var queryPost = post_data;
    var $jqxgrid = item_grid;
    var $actionGet = item_action;
    var $app_growl = item_app_growl;
    var BeginTime = post_data.beginTime;
    var EndTime = post_data.endTime;
    //alert
    $app_growl.children().detach();
    if ((EndTime == '') && BeginTime == ''){
        //alter
        alert_func($app_growl,'请设置查询条件!');

        return false;
    }
    else{
        //clear old data
        jqxgrid_data = [];
        $jqxgrid.jqxGrid("clear");
        $jqxgrid.jqxGrid('showloadelement');
        $actionGet.attr("disabled", true);
        var AjaxRequest = $.ajax({
            type: "POST",
            //get方法url地址
            url: $SCRIPT_ROOT + "/api/v1.0/get_140countryFlowerStatics/",
            //request set
            contentType: "application/json",
            //data参数
            data: JSON.stringify(queryPost),
            //server back data type
            dataType: "json"
        })
            .done(function(data){
                //clear old grid data 填充数据到表格前要重置jqxgrid_data防止重复插入数据
                jqxgrid_data = [];//clear reread data
                $jqxgrid.jqxGrid("clear");
                //获取返回数据
                var getData = data;
                if (getData.data.length==0){
                    if (getData.info.err){
                        //delete old alter
                        alert_func($app_growl,getData.info.errinfo);
                    }
                    else{
                        alert_func($app_growl,'无查询结果!');
                    }
                }
                else{
                    $.each( getData.data, function(i, item){
                        jqxgrid_data.push({
                            imsi: item.imsi,
                            externalflower: item.externalflower,
                            internalflower: item.internalflower,
                            all: item.all,
                            percentage: item.percentage,
                            org: item.org,
                            state: item.state,
                            package_type: item.package_type,
                            groupname: item.groupname
                        });

                    });//each函数完成
                    // set the new data
                    JqxGridSrcSource.localdata = jqxgrid_data;
                    $jqxgrid.jqxGrid('updatebounddata');
                }
            })
            .fail(function(jqXHR, status){
                //clear old grid data 如果失败，清除表格数据，降低缓存！
                jqxgrid_data = [];//clear reread data
                $jqxgrid.jqxGrid("clear");
                //alert func
                alert_func($app_growl,'Servers False!');
            })
            .always(function() {
                $actionGet.attr("disabled", false);
            });

        return false;
    }
}
/**     -------check if show or hide of jqxgrid column func-------
 *
 * @param set_package_update_time
 * logic: if nowTime >= set_package_update_time :
 *           set beginTime = set_package_update_time;
 *         else:
 *           set beginTime = last month package update time;
 * @return beginTime of package last update time;
 */
function getStartTime(set_package_update_time){
    var nowTime = moment();
    //get date and hour time
    var nowDay = nowTime.get('date');
    var nowHour = nowTime.get('hour');
    //set last package update time
    var setPackageUpdateTime = set_package_update_time;
    var beginTime = nowTime.set(setPackageUpdateTime);
    if ((nowDay >=11)&&( nowHour>=16)){
        return (beginTime);
    }else{
       beginTime.subtract(1, 'months');
       return(beginTime);
    }
}
/**     -------datarange model init func-------
 *
 * @param start_time_item: jquery start time var of DOC obj ID;
 * @param end_time_item: jquery end time var of DOC obj ID;
 * @param day_set: gap between now time and endTime;
 * @return null;
 *
 * @function: getStartTime(beginTimeSet) set time as param beginTimeSet{},
 *            return package last update time for query functions;
 *
 *
 * initialize daterange module from {'endTime','beginTime'} key value .
 */
function daterange_init(start_time_item,end_time_item,day_set){
    var $startTimeItem = start_time_item;
    var $endTimeItem = end_time_item;
    var endTime = moment().subtract(day_set, 'h').set({'minute': 0,'second': 0});
    var beginTimeSet = {'date': 11,'hour': 16,'minute': 0, 'second': 0};
    var beginTime = getStartTime(beginTimeSet);
    //                             ------------start time init-------------------------
    $startTimeItem.daterangepicker({
        showDropdowns: true,
        timePicker: true,
        timePicker24Hour: true,
        singleDatePicker: true,
        startDate: beginTime,
        locale: {
        format: "YYYY-MM-DD HH:mm:ss",
        applyLabel: "确定",
        cancelLabel: "取消",
        daysOfWeek: ["周日","周一","周二","周三","周四","周五","周六"],
        monthNames: ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
        firstDay: 1
        }
    });
    //                             ------------end time init-------------------------
    $endTimeItem.daterangepicker({
        showDropdowns: true,
        timePicker: true,
        timePicker24Hour: true,
        singleDatePicker: true,
        startDate: endTime,
        locale: {
        format: "YYYY-MM-DD HH:mm:ss",
        //separator: " - ",
        applyLabel: "确定",
        cancelLabel: "取消",
        daysOfWeek: ["周日","周一","周二","周三","周四","周五","周六"],
        monthNames: ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
        firstDay: 1
        }
    });
}
$(function () {
    /**
     * main func, run after DOC loaded.
     * @type {*}
     */
    //jquery var initialize from obtained DOC ID
    var $140Jqxgrid = $("#140countryFlowerStaticsJqxgrid");
    var $queryStaticDataAction = $("#140countryFlowerStaticsDataGet");
    var $exportExcel = $("#140countryFlowerStaticsExcelExport");
    var $app_growl = $("#app-growl");
    var $itemDropDownList = $("#140countryFlowerStaticsJqxDropDownList");
    var $inputDaterangeStart = $('#input-daterange-start');
    var $inputDaterangeEnd = $('#input-daterange-end');
    // jqxgrid data initialize
    var arrayGrid = [];
    //                         ----------------------init date range model-------------------------
    daterange_init($inputDaterangeStart,$inputDaterangeEnd,0);
    //                         ----------------------init drop down list model-----------------------
    init140DropDownList($itemDropDownList);
    //                         ----------------------init grid tab of 140 country con--------------------
    var JqxGridSrcSource=initjqxGrid($140Jqxgrid, arrayGrid);
    //                         ----------------------ajax get data-------------------------
    $queryStaticDataAction.click(function (){
        var EndTime = $inputDaterangeEnd.val();
        var BeginTime = $inputDaterangeStart.val();
        var TimezoneOffset = moment().utcOffset();
        var postData = {
            beginTime: BeginTime,
            endTime: EndTime,
            TimezoneOffset: TimezoneOffset
        };
        action140StaticAjaxAPI(
            arrayGrid,
            JqxGridSrcSource,
            postData,
            $140Jqxgrid,
            $queryStaticDataAction,
            $app_growl);

        return false;
    });
    //                          --------------------------excel files output-------------------------------
    $exportExcel.click(function () {
        excelExportAPI($140Jqxgrid,$app_growl);
    });
    //                           ---------------------------flash grid tab-------------------------
    $('#140countryFlowerStaticsDataFlash').click(function () {
        $140Jqxgrid.jqxGrid('updatebounddata');
    });
    $itemDropDownList.on('checkChange', function (event) {
        onCheckChange140countryShowHiden($140Jqxgrid, event);
    });
});
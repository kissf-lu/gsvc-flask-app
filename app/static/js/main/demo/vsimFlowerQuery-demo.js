

// 告警通用文字
var queryAndReturnAlert= '<div class="alert alert-warning" role="alert">'+
			             '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
			             '<span aria-hidden="true">&times;</span>'+
			             '</button>';
//-----------------------------------------------------------表格模块初始化------------------------------------------
//流量查询数据存储变量
var FlowerQueryGridArrayData = [];
//国流量查询表格数据初始化
var FlowerQuerySource ={
                localdata: FlowerQueryGridArrayData,
                datatype: "json",
                datafields: [
                    {name: 'imsi', type: 'string' },
                    {name: 'time', type: 'date' },
                    {name: 'mcc', type: 'string' },
                    {name: 'plmn', type: 'string' },
                    {name: 'Flower', type: 'number' }
                ],
};
//jqxgrid data adapter
var FlowerQueryAdapter = new $.jqx.dataAdapter(FlowerQuerySource);
//--------------------------------------------------初始化统计表单-------------
function FlowerQueryjqxGrid(){
    $("#FlowerQueryjqxGrid").jqxGrid({
                width: "99.8%",
                source: FlowerQueryAdapter,
                filterable: true,
                columnsresize: true,
                enablebrowserselection: true,
                selectionmode: 'multiplerows',
                altrows: true,
                sortable: true,
                pageable: true,
                pageSize: 1000,
                pagesizeoptions:['1000', '5000', '10000'],
                localization: getLocalization('zh-CN'),
                ready: function () {
                },
                autoshowfiltericon: true,
                columnmenuopening: function (menu, datafield, height) {
                    var column = $("#FlowerQueryjqxGrid").jqxGrid('getcolumn', datafield);
                    if (column.filtertype == "custom") {
                        menu.height(155);
                        setTimeout(function () {
                            menu.find('input').focus();
                        }, 25);
                    }
                    else menu.height(height);
                },
                columns: [
                    {text: 'num',
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
                      },
                    },
                    { text: 'imsi', datafield: 'imsi' , width: 150,
                      filtertype: "custom",
                      createfilterpanel: function (datafield, filterPanel) {
                          ProbDicBuildFilterPanel(filterPanel, datafield);
                      }
                    },
                    { text: 'time', datafield: 'time',cellsformat: 'yyyy-MM-dd HH:mm:ss', width: 200,
                    filtertype: 'date', hidden: true},
                    { text: 'mcc', datafield: 'mcc', filtertype: "range", width: 100, hidden: true},
                    { text: 'plmn', datafield: 'plmn', filtertype: "range", width: 100, hidden: true},
                    { text: 'Flower/MB', datafield: 'Flower', width: 300 },
                ]
    });
}
//--------------------------------------------------------------END ----------------------------------------------------

//-------------------------------------------------------显示选择菜单设置----------------------------------------
var jqxDropDownList=[
            { label: 'imsi', value: 'imsi', checked: true },
            { label: 'time', value: 'time', checked: false },
            {label: 'plmn', value: 'plmn',checked: false },
            {label: 'mcc', value: 'mcc',checked: false },
            {label: 'Flower', value: 'Flower',checked: true }
    ];
//---------------------------------------------------初始化显示选择函数
function initjqxDropDownList(){
// Create a jqxDropDownList
$("#jqxDropDownList").jqxDropDownList({
                                  checkboxes: true,
                                  source: jqxDropDownList,
                                  autoOpen:true,
                                  animationType:'fade',
                                  filterable: true,
                                  dropDownHeight: 300,
                                  Width:150,
                                  });

}
//-----------------------------------------------动作函数---------------
$("#jqxDropDownList").on('checkChange', function (event) {
       $("#FlowerQueryjqxGrid").jqxGrid('beginupdate');
            if (event.args.checked) {
                    $("#FlowerQueryjqxGrid").jqxGrid('showcolumn', event.args.value);

            }
            else {
                    $("#FlowerQueryjqxGrid").jqxGrid('hidecolumn', event.args.value);
            }
       $("#FlowerQueryjqxGrid").jqxGrid('endupdate');
});
//--------------------------------------------------------------显示选择菜单设置-END-------------------------------

//--------------------------------------------------------过滤菜单栏-----------------------------------------
var ProbDicBuildFilterPanel = function (filterPanel, datafield){
        var textInput = $("<input style='margin:5px;'/>");
        var applyinput = $("<div class='filter' style='height: 25px; margin-left: 20px; margin-top: 7px;'></div>");
        var filterbutton = $('<span tabindex="0" style="padding: 4px 12px; margin-left: 2px;">Filter</span>');
        applyinput.append(filterbutton);
        var filterclearbutton = $('<span tabindex="0" style="padding: 4px 12px; margin-left: 5px;">Clear</span>');
        applyinput.append(filterclearbutton);
        filterPanel.append(textInput);
        filterPanel.append(applyinput);
        filterbutton.jqxButton({ height: 20 });
        filterclearbutton.jqxButton({  height: 20 });

        var dataSource =
         {
         localdata: FlowerQueryAdapter.records,
         datatype: "json",
         async: false
         }
        var dataadapter = new $.jqx.dataAdapter(dataSource,
         {
         autoBind: false,
         autoSort: true,
         autoSortField: datafield,
         async: false,
         uniqueDataFields: [datafield]
         });

        var column = $("#FlowerQueryjqxGrid").jqxGrid('getcolumn', datafield);
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
                    $("#FlowerQueryjqxGrid").jqxGrid('addfilter', datafield, filtergroup);
                    // apply the filters.
                    $("#FlowerQueryjqxGrid").jqxGrid('applyfilters');
                    $("#FlowerQueryjqxGrid").jqxGrid('closemenu');
             });

             filterbutton.keydown(function (event) {
                  if (event.keyCode === 13) {
                        filterbutton.trigger('click');
                  }
             });
             filterclearbutton.click(function () {
                    $("#FlowerQueryjqxGrid").jqxGrid('removefilter', datafield);
                    // apply the filters.
                    $("#FlowerQueryjqxGrid").jqxGrid('applyfilters');
                    $("#FlowerQueryjqxGrid").jqxGrid('closemenu');
             });

             filterclearbutton.keydown(function (event) {
                    if (event.keyCode === 13) {
                        filterclearbutton.trigger('click');
                    }
                    textInput.val("");
             });
};

//------------------------------------------------------------刷新数据button模块--------------------------
$('#FlowerQueryFlash').click(function () {
    $('#FlowerQueryjqxGrid').jqxGrid('updatebounddata');

});

//----------------------------------------------------------excel导出栏----------------------------
$("#FlowerQueryExcelExport").click(function () {
     var rows = $('#FlowerQueryjqxGrid').jqxGrid('getdisplayrows');
     var alldatanum= rows.length;
     var view_data=[];
     var json_data={'data':view_data}
     var paginginformation =
     $('#FlowerQueryjqxGrid').jqxGrid('getpaginginformation');
     // The page's number.
     var pagenum = paginginformation.pagenum;
     // The page's size.
     var pagesize = paginginformation.pagesize;
     // The number of all pages.
     var pagescount = paginginformation.pagescount;
     if (alldatanum==0){
         //delete old alter
        $("#queryQlert").children().detach();
        $("#queryQlert").append((queryAndReturnAlert+'<p>无输出数据！</p></div>'));
     }

     else{
         for(var i = 0; i < rows.length; i++){
             if (i==pagenum*pagesize){
                 for (var j = 0; j< pagesize; j++){
                     if (i+j< alldatanum){
                         view_data.push({
                         imsi: rows[i+j].imsi,
                         time: rows[i+j].time,
                         mcc: rows[i+j].mcc,
                         plmn: rows[i+j].plmn,
                         Flower: rows[i+j].Flower
                         })
                     }

                 }
             }
         }
         //$("#FlowerQueryjqxGrid").jqxGrid('exportdata', 'xls', 'FlowerQueryExcelExport', true, view_data);
         excelExport(json_data);
     }
     return false;

 });

 function excelExport(data) {
     var exportdata=data;

     if (exportdata.data==[]){
         //delete old alter
         $("#app-growl").children().detach();
         $("#app-growl").append((alertStr+'<p>无输出数据！</p></div>'));
         }
     else{
          var temp = document.createElement("form");
          temp.action = $SCRIPT_ROOT +"/api/v1.0/export_Flower/"//"/test_exportExcel";
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

//------------------------------------------------------------excel导出栏--end--------------------------


//------------------------------------------chosen selected deselected Functions---
$("#chosenFlowerQueryKey").on('change', function(evt, params) {
    $("#FlowerQueryjqxGrid").jqxGrid('beginupdate');
    if (params.selected){
        $("#FlowerQueryjqxGrid").jqxGrid('showcolumn', params.selected);//当选择后显示相关输出信息
        $("#jqxDropDownList").jqxDropDownList('checkItem', params.selected);
        }
    else if (params.deselected){
        $("#FlowerQueryjqxGrid").jqxGrid('hidecolumn', params.deselected);//取消输出栏显示
        $("#jqxDropDownList").jqxDropDownList('uncheckItem', params.deselected);
    }
    else{
        var con ='';
    }
    $("#FlowerQueryjqxGrid").jqxGrid('endupdate');
});


//-----------------------------------------------------------初始化小时颗粒度时间面板
function daterange_hour_init(){
    //var endTime = new Date();
    var endTime = moment().subtract(0, 'h');
    var beginTime = moment().subtract(6, 'h');
    $('#input-daterange-start').daterangepicker({
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

    $('#input-daterange-end').daterangepicker({
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

//-----------------------------------
function daterange_day_init(){
    //var endTime = new Date();
    var endTime = moment().subtract(1, 'days');
    var beginTime = moment().subtract(15, 'days');
    $('#input-daterange-start').daterangepicker({
        showDropdowns: true,
        singleDatePicker: true,
        startDate: beginTime,
        locale: {
        format: "YYYY-MM-DD",
        applyLabel: "确定",
        cancelLabel: "取消",
        daysOfWeek: ["周日","周一","周二","周三","周四","周五","周六"],
        monthNames: ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
        firstDay: 1
    }
    });

    $('#input-daterange-end').daterangepicker({
        showDropdowns: true,
        singleDatePicker: true,
        startDate: endTime,
        locale: {
        format: "YYYY-MM-DD",
        //separator: " - ",
        applyLabel: "确定",
        cancelLabel: "取消",
        daysOfWeek: ["周日","周一","周二","周三","周四","周五","周六"],
        monthNames: ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
        firstDay: 1
    }
    });
}

// -----------------------------------------------------------初始化选择通知栏
function SetNotification_init(){
   //初始化通知
   $("#FlowerQueryNotification").jqxNotification({
                width: "100%",
                position: "top-right",
                blink: true ,
                appendContainer: "#container",
                opacity: 0.9,
                autoOpen: false,
                animationOpenDelay: 800,
                autoClose: true,
                autoCloseDelay: 2000,
                template: "info"
    });

}

// ----------初始化查询状态通知栏
function Querynotification_init(){
   //初始化通知
   $("#QueryingQueryjqxNotification").jqxNotification({
                width: "100%",
                position: "top-right",
                blink: true ,
                appendContainer: "#Querycontainer",
                opacity: 0.9,
                autoOpen: false,
                animationOpenDelay: 800,
                autoClose: false,
                autoCloseDelay: 3000,
                template: "info"
    });

}

//-----------时间维度选择通知--timeDim
$('#timeDim').change(function () {
     // Do something
  $("#FlowerQueryNotificationContent").children().detach();
  var timeDimVar = $('#timeDim').val();
  if (timeDimVar != ''){
      //$("#country_lineChart_date").children().detach();
      $("#FlowerQueryNotificationContent").append(
          '<strong>'+'时间颗粒度设置为：'+ timeDimVar +'</strong>'
      );
      //
      SetNotification_init();
      $("#FlowerQueryNotification").jqxNotification("open");

      if (timeDimVar == 'days') {
          daterange_day_init();
      }
      else {
          daterange_hour_init();
      }
  }
  else{
      $("#FlowerQueryNotificationContent").append(
          '<strong>'+'请设置时间颗粒度！'+'</strong>'
      );
      SetNotification_init();
      $("#FlowerQueryNotification").jqxNotification("open");
  }
});

//-----------起始时间选择通知
$('#input-daterange-start').change(function () {
  // Do something
  $("#FlowerQueryNotificationContent").children().detach();
  var inputDateRangeStart = $('#input-daterange-start').val();
  if (inputDateRangeStart != ''){
      //$("#country_lineChart_date").children().detach();
      $("#FlowerQueryNotificationContent").append(
          '<strong>'+'起始时间设置为：'+ inputDateRangeStart +'</strong>'
      );
      //
      SetNotification_init();
      $("#FlowerQueryNotification").jqxNotification("open");
  }
  else{
      $("#FlowerQueryNotificationContent").append(
          '<strong>'+'请设置起始时间'+'</strong>'
      );
      SetNotification_init();
      $("#FlowerQueryNotification").jqxNotification("open");
  }
});

//-----------截止时间选择通知
$('#input-daterange-end').change(function () {
  // Do something
  $("#FlowerQueryNotificationContent").children().detach();
  var inputDateRangeEnd = $('#input-daterange-end').val();
  if (inputDateRangeEnd != ''){
      //$("#country_lineChart_date").children().detach();
      $("#FlowerQueryNotificationContent").append(
          '<strong>'+'截止时间设置为：'+ inputDateRangeEnd + '</strong>'
      );
      //
      SetNotification_init();
      $("#FlowerQueryNotification").jqxNotification("open");
  }
  else{
      $("#FlowerQueryNotificationContent").append(
          '<strong>'+'请设置截止时间'+'</strong>'
      );
      SetNotification_init();
      $("#FlowerQueryNotification").jqxNotification("open");
  }
});

//---------------------------------------------ajax获取api1.0
$("#FlowerQuery_dataGet").click(function (){
    var TimeDim=$('#timeDim').val();
    var Mcc=$('#FlowerQueryMCC').val();
    var Plmn=$('#FlowerQueryPlmn').val();
    var Begintime = $('#input-daterange-start').val();
    var Endtime = $('#input-daterange-end').val();
    var Imsi = $('#inputimsi').val();
    var addkey = $('#chosenFlowerQueryKey').val();
    var FlowerQueryKey = addkey;
    var momentBegin = moment(Begintime,"YYYY-MM-DD HH:mm:ss");
    var momentEnd = moment(Endtime,"YYYY-MM-DD HH:mm:ss");
    var HourGap = momentEnd.diff(momentBegin, 'hours');
    var DayGap = momentEnd.diff(momentBegin, 'days');
    var TimezoneOffset = moment().utcOffset();
    var queryPost = {};

    //  隐藏上一次告警栏
    $("#queryQlert").children().detach();
    // 隐藏上次通知
    $("#QueryingQueryjqxNotification").jqxNotification("closeLast");
    if(TimeDim == 'hours'){
      //输入格式匹配
      var conformPlmn = checkplmnReg(Plmn);
      //mcc have the same reg rules
      var conformMcc = checkplmnReg(Mcc);
      var conformImsi = checkImsiReg(Imsi);
      queryPost = {querySort: TimeDim,
                   begintime: Begintime,
                   endtime: Endtime,
                   mcc: Mcc,
                   plmn: Plmn,
                   imsi: Imsi,
                   agg_group_key: FlowerQueryKey,
                   TimezoneOffset: TimezoneOffset
                   };
      if (!(conformImsi)){
        $("#queryQlert").append(
			queryAndReturnAlert+
			    '<p>imsi输入格式不对!</p>'+
			'</div>'
			);
      }
      else if (Begintime==""){
        $("#queryQlert").append(
			queryAndReturnAlert+
			    '<p>请选择要查询的起始时间!</p>'+
			'</div>'
			);
      }
      else if (Endtime==""){
        $("#queryQlert").append(
			queryAndReturnAlert+
			    '<p>请选择要查询的截止时间!</p>'+
			'</div>'
			);
      }
      else if ((Plmn != "")&&(!(conformPlmn))){
        $("#queryQlert").append(
			queryAndReturnAlert+
			    '<p>plmn输入格式不对!</p>'+
			'</div>'
			);
      }
      else if ((Mcc != "")&&(!(conformMcc))){
        $("#queryQlert").append(
			queryAndReturnAlert+
			    '<p>mcc输入格式不对!</p>'+
			'</div>'
			);
      }
      else{
        if (HourGap == 0){
         $("#queryQlert").append(
			queryAndReturnAlert+
			    '<p>起始和截止时间相同!</p>'+
			'</div>'
			);
         }
         else{
             $("#FlowerQueryNotificationContent").children().detach();
             if(HourGap>48){
                 $("#queryQlert").append(
			         queryAndReturnAlert+
			         '<p>时常超过48小时，请从新设置时间!</p>'+
			         '</div>'
			     );
             }
             else{
                 $("#QueryingNotificationContent").children().detach();
                 $("#QueryingNotificationContent").append(
                         '<strong>'+'查询时差为：'+ HourGap +'. 数据获取中......'+'</strong>'
                 );
                 Querynotification_init();
                 $("#QueryingQueryjqxNotification").jqxNotification("open");
                 //情况历史数据
                 FlowerQueryGridArrayData=[];
                 $("#FlowerQuery_dataGet").attr("disabled", true);
                 var hoursAjaxRequest = $.ajax({
                     type: "POST",
                     //get方法url地址
                     url: $SCRIPT_ROOT + "/api/v1.0/get_FlowerQuery/",
                     //request set
                     contentType: "application/json",
                     //data参数
                     data: JSON.stringify(queryPost),
                     //server back data type
                     dataType: "json"
                 })
                 .done(function(data){
                           var getData = data;
                           var alert_str = "";
                           if (getData.data.length==0){
                               if (getData.info.err){
                                   $("#QueryingQueryjqxNotification").jqxNotification("closeLast");
                                   $("#FlowerQueryjqxGrid").jqxGrid("clear");
						           $("#queryQlert").append(
						               queryAndReturnAlert+
						               '<p>Error：'+ getData.info.errinfo +'</p></div>'
						           );
                               }
                               else{
                               $("#QueryingQueryjqxNotification").jqxNotification("closeLast");
                               $("#FlowerQueryjqxGrid").jqxGrid("clear");
						       $("#queryQlert").append(
						               queryAndReturnAlert+
						               '<p>无查询结果!</p></div>'
						       );
                             }

                           }

                           else{
                               $("#FlowerQueryjqxGrid").jqxGrid("clear");
                               $("#QueryingQueryjqxNotification").jqxNotification("closeLast");
                               $.each( getData.data, function(i, item){
                                       FlowerQueryGridArrayData.push({
                                           imsi: item.imsi,
                                           time: item.time,
                                           mcc: item.mcc,
                                           plmn: item.plmn,
                                           Flower: item.Flower
                                       });
                                });//each函数完成
                                // set the new data
                                FlowerQuerySource.localdata = FlowerQueryGridArrayData;
						        $('#FlowerQueryjqxGrid').jqxGrid('updatebounddata');
                           }
                      })
                 .fail(function(jqXHR, status){
                          $("#QueryingQueryjqxNotification").jqxNotification("closeLast");
                               $("#FlowerQueryjqxGrid").jqxGrid("clear");
						       $("#queryQlert").append(
						               queryAndReturnAlert+
						               '<p> Servers False!</p></div>'
						       );
                 })
                 .always(function() {
                     $("#FlowerQuery_dataGet").attr("disabled", false);
                 });
             }
         }
      }
    }
    else{
      //输入格式匹配
      var conformPlmn = checkplmnReg(Plmn);
      //mcc have the same reg rules
      var conformMcc = checkplmnReg(Mcc);
      var conformImsi = checkImsiReg(Imsi);
      queryPost = {querySort: TimeDim,
                   begintime: Begintime,
                   endtime: Endtime,
                   mcc: Mcc,
                   plmn: Plmn,
                   imsi: Imsi,
                   agg_group_key: FlowerQueryKey,
                   TimezoneOffset: TimezoneOffset
                   };

      if (!(conformImsi)){
        $("#queryQlert").append(
			queryAndReturnAlert+
			    '<p>imsi输入格式不对!</p>'+
			'</div>'
			);
      }
      else if (Begintime==""){
        $("#queryQlert").append(
			queryAndReturnAlert+
			    '<p>请选择要查询的起始时间!</p>'+
			'</div>'
			);
      }
      else if (Endtime==""){
        $("#queryQlert").append(
			queryAndReturnAlert+
			    '<p>请选择要查询的截止时间!</p>'+
			'</div>'
			);
      }
      else if ((Plmn != "")&&(!(conformPlmn))){
        $("#queryQlert").append(
			queryAndReturnAlert+
			    '<p>plmn输入格式不对!</p>'+
			'</div>'
			);
      }
      else if ((Mcc != "")&&(!(conformMcc))){
        $("#queryQlert").append(
			queryAndReturnAlert+
			    '<p>mcc输入格式不对!</p>'+
			'</div>'
			);
      }
      else{
        if (DayGap == 0){
         $("#queryQlert").append(
			queryAndReturnAlert+
			    '<p>起始和截止时间设置相同，请从新设置时间!</p>'+
			'</div>'
			);
         }
         else{
             $("#FlowerQueryNotificationContent").children().detach();
             if(DayGap>93){
                 $("#queryQlert").append(
			         queryAndReturnAlert+
			         '<p>天数超过93天，请从新设置时间!</p>'+
			         '</div>'
			     );
             }
             else{
                 $("#QueryingNotificationContent").children().detach();
                 $("#QueryingNotificationContent").append(
                         '<strong>'+'查询天数差为：'+ DayGap +'. 数据获取中......'+'</strong>'
                 );
                 Querynotification_init();
                 $("#QueryingQueryjqxNotification").jqxNotification("open");
                 $("#FlowerQuery_dataGet").attr("disabled", true);
                 var hoursAjaxRequest = $.ajax({
                     type: "POST",
                     //get方法url地址
                     url: $SCRIPT_ROOT + "/api/v1.0/get_FlowerQuery/",
                     //request set
                     contentType: "application/json",
                     //data参数
                     data: JSON.stringify(queryPost),
                     //server back data type
                     dataType: "json"
                 })
                 .done(function(data){
                           var getData = data;
                           var alert_str = "";
                           if (getData.data.length==0){
                               if (getData.info.err){
                                   $("#QueryingQueryjqxNotification").jqxNotification("closeLast");
                                   $("#FlowerQueryjqxGrid").jqxGrid("clear");
						           $("#queryQlert").append(
						               queryAndReturnAlert+
						               '<p>Error：'+ getData.info.errinfo +'</p></div>'
						           );
                               }
                               else{
                                   $("#QueryingQueryjqxNotification").jqxNotification("closeLast");
                                   $("#FlowerQueryjqxGrid").jqxGrid("clear");
						           $("#queryQlert").append(
						               queryAndReturnAlert+
						               '<p>无查询结果!</p></div>'
						       );
                               }

                           }
                           else{
                               $("#FlowerQueryjqxGrid").jqxGrid("clear");
                               FlowerQueryGridArrayData=[];
                               $("#QueryingQueryjqxNotification").jqxNotification("closeLast");
                               $.each( getData.data, function(i, item){
                                       FlowerQueryGridArrayData.push({
                                           imsi: item.imsi,
                                           time: item.time,
                                           mcc: item.mcc,
                                           plmn: item.plmn,
                                           Flower: item.Flower
                                       });
                                });//each函数完成
                                // set the new data
                                FlowerQuerySource.localdata = FlowerQueryGridArrayData;
						        $('#FlowerQueryjqxGrid').jqxGrid('updatebounddata');
                           }
                      })
                 .fail(function(jqXHR, status){
                          $("#QueryingQueryjqxNotification").jqxNotification("closeLast");
                               $("#FlowerQueryjqxGrid").jqxGrid("clear");
						       $("#queryQlert").append(
						               queryAndReturnAlert+
						               '<p> Servers False!</p></div>'
						       );
                 })
                 .always(function() {
                     $("#FlowerQuery_dataGet").attr("disabled", false);
                 });
             }
         }

      }
    }
    return false;
});

//------------------------------------------------------------验证imsi格式
function checkImsiReg(str){
   var stringTest = str;
   var RegExp1 = /^([0-9]+)$/;
   var RegExp2 = /^([0-9]+[,])*([0-9]+)$/;
   //plmn非空时监测输入格式是否合法
   if ((RegExp1.exec(stringTest) || (RegExp2.exec(stringTest)) )&& (str !='')){
       return true;
   }
   else{
       return false;
   }
}

//------------------------------------------------------------验证plmn格式
function checkplmnReg(str){
   var stringTest = str;
   var RegExp1 = /^([0-9]+)$/;
   //plmn非空时监测输入格式是否合法-规则为以数组开头结尾
   if ((RegExp1.exec(stringTest) ) && (str !='')){
       return true;
   }
   //准许plmn为空
   else if (str ==''){
       return true;
   }
   else{
       return false;
   }
}

// ------------------------------------------------------------初始化天维度选择通知栏
function countryChartQuerynotification_init(){
   //初始化通知
   $("#countryChartQueryjqxNotification").jqxNotification({
                width: "100%", position: "top-right", blink: true , appendContainer: "#countryChartcontainer", opacity: 0.9,
                autoOpen: false, animationOpenDelay: 800, autoClose: false, autoCloseDelay: 3000, template: "info"
    });

}


//--------------------------------------------------------main-初始化主程序-----------------------------------------
$(function () {
    //--------------------------初始化统计表单
    FlowerQueryjqxGrid();
    //初始化显示栏
    initjqxDropDownList();
    //初始化小时颗粒日期栏
    daterange_hour_init();
    //初始化chosen
    $("#chosenFlowerQueryKey").chosen({width: "100%"});
});
//-----------------------------------------------------end main 函数-----------------------------------------------------

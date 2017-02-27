// 告警通用文字
var queryAndReturnAlert= '<div class="alert alert-warning" role="alert">'+
			             '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
			             '<span aria-hidden="true">&times;</span>'+
			             '</button>';
var daterange_data='<div class="input-group input-daterange" id="datepicker">'+
      '    <span class="input-group-addon"><strong>时间范围--起始</strong></span>'+
      '    <input type="text" class="input-sm form-control" name="start" id="input-daterange-start"/>'+
      '    <span class="input-group-addon"><strong>结束</strong></span>'+
      '    <input type="text" class="input-sm form-control" name="end" id="input-daterange-end"/>'+
      '</div>';

//----------------------------------------------------初始化统计表单----------------------------------------------------------


//问题诊断数据存储变量
var countryPorbDicGridArrayData = [];
//国家卡资源统计表格数据初始化
var countryProbDicsource ={
                localdata: countryPorbDicGridArrayData,
                datatype: "json",
                datafields: [
                    {name: 'country', type: 'string' },
                    {name: 'imsi', type: 'string' },
                    {name: 'iccid', type: 'string' },
                    {name: 'package_type_name', type: 'string' },
                    {name: 'next_update_time', type: 'date' },
                    {name: 'bam', type: 'string' },
                    {name: 'imsi_con', type: 'int' },
                    {name: 'imei_con', type: 'int' },
                    {name: 'Flower', type: 'float' },
                    {name: 'err', type: 'string' }
                ],
};
//装在国家统计表格数据jqxgrid data adapter
var probDicAdapter = new $.jqx.dataAdapter(countryProbDicsource);
//------------------------------------------------------------
function initProbDicjqxGrid(){
    // grid views
    $("#initProbDicjqxGrid").jqxGrid({
                width: "99.8%",
                height: 600,
                source: probDicAdapter,
                filterable: true,
                columnsresize: true,
                enablebrowserselection: true,
                selectionmode: 'multiplerows',
                altrows: true,
                sortable: true,
                pageable: true,
                pageSize: 200,
                pagesizeoptions:['200', '1000', '2000'],
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
                    { text: '国家', datafield: 'country' , filtertype: 'checkedlist', width: 50},
                    { text: 'imsi', datafield: 'imsi' , width: 150,
                      filtertype: "custom",
                      createfilterpanel: function (datafield, filterPanel) {
                          ProVsimFirstDictBuildFilterPanel(filterPanel, datafield);
                      }
                    },
                    { text: 'iccid', datafield: 'iccid', width: 180,
                      filtertype: "custom",
                      createfilterpanel: function (datafield, filterPanel) {
                          ProVsimFirstDictBuildFilterPanel(filterPanel, datafield);}
                    },
                    { text: '套餐类型', datafield: 'package_type_name', filtertype: 'checkedlist', width: 100},
                    { text: '套餐更新日期', datafield: 'next_update_time', filtertype: 'date', width: 100,
                      cellsformat: 'yyyy-MM-dd HH:mm:ss'},
                    { text: 'bam', datafield: 'bam', width: 180, filtertype: "range"},
                    { text: '分卡次数', datafield: 'imsi_con',width: 70,filtertype: "range"},
                    { text: '不同终端数', datafield: 'imei_con',width: 80,filtertype: "range"},
                    { text: '累计流量/MB', datafield: 'Flower',width: 100,filtertype: "range"},
                    { text: '报错信息(errType,errCode : count)', datafield: 'err',width: 500,filtertype: "range"}
                ]
    });
}


//--------------------------------------------------------过滤菜单栏-----------------------------------------
var ProVsimFirstDictBuildFilterPanel = function (filterPanel, datafield) {

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
         localdata: probDicAdapter.records,
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

        var column = $("#initProbDicjqxGrid").jqxGrid('getcolumn', datafield);
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
                    $("#initProbDicjqxGrid").jqxGrid('addfilter', datafield, filtergroup);
                    // apply the filters.
                    $("#initProbDicjqxGrid").jqxGrid('applyfilters');
                    $("#initProbDicjqxGrid").jqxGrid('closemenu');
             });

             filterbutton.keydown(function (event) {
                  if (event.keyCode === 13) {
                        filterbutton.trigger('click');
                  }
             });
             filterclearbutton.click(function () {
                    $("#initProbDicjqxGrid").jqxGrid('removefilter', datafield);
                    // apply the filters.
                    $("#initProbDicjqxGrid").jqxGrid('applyfilters');
                    $("#initProbDicjqxGrid").jqxGrid('closemenu');
             });

             filterclearbutton.keydown(function (event) {
                    if (event.keyCode === 13) {
                        filterclearbutton.trigger('click');
                    }
                    textInput.val("");
             });
};

//------------------------------------------------------------刷新数据button模块--------------------------
$('#probDicFlash').click(function () {
    $('#initProbDicjqxGrid').jqxGrid('updatebounddata');

});

//------------------------------------------------------------现网excel导出栏----------------------------
$("#probDicExcelExport").click(function () {
     var rows = $('#initProbDicjqxGrid').jqxGrid('getdisplayrows');
     var alldatanum= rows.length;
     var view_data=[];
     var json_data={'data':view_data}
     var paginginformation =
     $('#initProbDicjqxGrid').jqxGrid('getpaginginformation');
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
     else if (alldatanum <= 200){
         for(var i = 0; i < rows.length; i++){
             if (i==pagenum*pagesize){
                 for (var j = 0; j< pagesize; j++){
                     if (i+j< alldatanum){
                         view_data.push({
                         num: rows[i+j].num,
                         country: rows[i+j].country,
                         imsi: rows[i+j].imsi,
                         iccid: rows[i+j].iccid,
                         package_type_name: rows[i+j].package_type_name,
                         next_update_time: rows[i+j].next_update_time,
                         bam: rows[i+j].bam,
                         imsi_con: rows[i+j].imsi_con,
                         imei_con: rows[i+j].imei_con,
                         Flower: rows[i+j].Flower,
                         err: rows[i+j].err
                         })
                     }

                 }
             }
         }
         $("#initProbDicjqxGrid").jqxGrid('exportdata', 'xls', 'probDicResult', true, view_data);
     }
     //超过200条数量的数据导出
     else{
         for(var i = 0; i < rows.length; i++){
             if (i==pagenum*pagesize){
                 for (var j = 0; j< pagesize; j++){
                     if (i+j< alldatanum){
                         view_data.push({
                         country: rows[i+j].country,
                         imsi: rows[i+j].imsi,
                         iccid: rows[i+j].iccid,
                         套餐类型: rows[i+j].package_type_name,
                         套餐更新日期: rows[i+j].next_update_time,
                         BAM: rows[i+j].bam,
                         分卡次数: rows[i+j].imsi_con,
                         不同终端数: rows[i+j].imei_con,
                         累计流量MB: rows[i+j].Flower,
                         报错信息: rows[i+j].err
                         })
                     }

                 }
             }
         }
         excelExport(json_data);
     }
     return false;

 });
//post函数导出excel
function excelExport(data) {
     var exportdata=data;

     if (exportdata.data==[]){
         //delete old alter
         $("#app-growl").children().detach();
         $("#app-growl").append((alertStr+'<p>无输出数据！</p></div>'));
         }
     else{
          var temp = document.createElement("form");
          temp.action = $SCRIPT_ROOT +"/api/v1.0/export_FirsProbDic/"//"/test_exportExcel";
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

var changeCheckbox = document.querySelector('.js-switch');
var switchery_imsi_country = new Switchery(changeCheckbox, { color: '#1AB394', size: 'small' });
var country_imsi_check=changeCheckbox.checked;
//var

changeCheckbox.onchange = function() {
  //更新check信息，否则country_imsi_check为旧值
  country_imsi_check = changeCheckbox.checked;
  if (country_imsi_check){
    $("#countrolFlowerThresholdDisplay").show();
    $("#countrolDispatchThresholdDisplay").show();
    $("#countryCountryDisplay").show();
    $("#countryImsiDisplay").hide();
  }
  else{
    $("#countrolFlowerThresholdDisplay").hide();
    $("#countrolDispatchThresholdDisplay").hide();
    $("#countryCountryDisplay").hide();
    $("#countryImsiDisplay").show();
  }
};
//-----------------------------------------------------------峰值用户画板模块----------------------------------------------

//-----------------------------------------------------------初始化clockpicker
function daterange_init(day_set){
    var endTime = new Date();
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
        daysOfWeek: [
            "周日",
            "周一",
            "周二",
            "周三",
            "周四",
            "周五",
            "周六"
        ],
        monthNames: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月"
        ],
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
        daysOfWeek: [
            "周日",
            "周一",
            "周二",
            "周三",
            "周四",
            "周五",
            "周六"
        ],
        monthNames: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月"
        ],
        firstDay: 1
    }
    });
}

// -----------------------------------------------------------初始化阈值选择通知栏
function ThresholdNotification_init(){
   //初始化通知
   $("#ProbDic-jqxNotification").jqxNotification({
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
   $("#ProbDict-QueryjqxNotification").jqxNotification({
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

//-----------流量阈值选择通知
$('#FlowerThreshold').change(function () {
  // Do something
  $("#ProbDic-notificationContent").children().detach();
  var FlowerThreshold = $('#FlowerThreshold').val();
  if (FlowerThreshold != ''){
      //$("#country_lineChart_date").children().detach();
      $("#ProbDic-notificationContent").append(
          '<strong>'+'流量阈值设置为：'+FlowerThreshold+'</strong>'
      );
      //
      ThresholdNotification_init();
      $("#ProbDic-jqxNotification").jqxNotification("open");
  }
  else{
      $("#ProbDic-notificationContent").append(
          '<strong>'+'请设置流量阈值'+'</strong>'
      );
      ThresholdNotification_init();
      $("#ProbDic-jqxNotification").jqxNotification("open");
  }
});

//-----------分卡次数阈值选择通知
$('#DispatchThreshold').change(function () {
  // Do something
  $("#ProbDic-notificationContent").children().detach();
  var DispatchThreshold = $('#DispatchThreshold').val();
  if (DispatchThreshold != ''){
      //$("#country_lineChart_date").children().detach();
      $("#ProbDic-notificationContent").append(
          '<strong>'+'分卡次数阈值设置为：'+DispatchThreshold+'</strong>'
      );
      //
      ThresholdNotification_init();
      $("#ProbDic-jqxNotification").jqxNotification("open");
  }
  else{
      $("#ProbDic-notificationContent").append(
          '<strong>'+'请设置分卡次数阈值'+'</strong>'
      );
      ThresholdNotification_init();
      $("#ProbDic-jqxNotification").jqxNotification("open");
  }
});

//-----------起始时间选择通知
$('#input-daterange-start').change(function () {
  // Do something
  $("#ProbDic-notificationContent").children().detach();
  var inputDateRangeStart = $('#input-daterange-start').val();
  if (inputDateRangeStart != ''){
      //$("#country_lineChart_date").children().detach();
      $("#ProbDic-notificationContent").append(
          '<strong>'+'起始时间设置为：'+inputDateRangeStart+':00'+'</strong>'
      );
      //
      ThresholdNotification_init();
      $("#ProbDic-jqxNotification").jqxNotification("open");
  }
  else{
      $("#ProbDic-notificationContent").append(
          '<strong>'+'请设置起始时间'+'</strong>'
      );
      ThresholdNotification_init();
      $("#ProbDic-jqxNotification").jqxNotification("open");
  }
});

//-----------截止时间选择通知
$('#input-daterange-end').change(function () {
  // Do something
  $("#ProbDic-notificationContent").children().detach();
  var inputDateRangeEnd = $('#input-daterange-end').val();
  if (inputDateRangeEnd != ''){
      //$("#country_lineChart_date").children().detach();
      $("#ProbDic-notificationContent").append(
          '<strong>'+'截止时间设置为：'+inputDateRangeEnd+':00'+'</strong>'
      );
      //
      ThresholdNotification_init();
      $("#ProbDic-jqxNotification").jqxNotification("open");
  }
  else{
      $("#ProbDic-notificationContent").append(
          '<strong>'+'请设置截止时间'+'</strong>'
      );
      ThresholdNotification_init();
      $("#ProbDic-jqxNotification").jqxNotification("open");
  }
});

//---------------------------------------------ajax获取api1.0
$("#ProbDic_dataGet").click(function (){
    var Country=$('#countryProDict').val();
    var Plmn=$('#countryPlmn').val();
    var Begintime = $('#input-daterange-start').val();
    var Endtime = $('#input-daterange-end').val();
    var DispatchThreshold = $('#DispatchThreshold').val();
    var FlowerThreshold = $('#FlowerThreshold').val();
    var Imsi = $('#inputimsi').val();
    var momentBegin = moment(Begintime,"YYYY-MM-DD HH:mm:ss");
    var momentEnd = moment(Endtime,"YYYY-MM-DD HH:mm:ss");
    var HourGap = momentEnd.diff(momentBegin, 'hours');
    var TimezoneOffset = moment().utcOffset();
    var querySort = "imsi";
    var queryPost = {};
    //  隐藏上一次告警栏
    $("#queryQlert").children().detach();
    // 隐藏上次通知
    $("#ProbDict-QueryjqxNotification").jqxNotification("closeLast");
    if(country_imsi_check){
      //必须进行国家选择才能查询!
      var conformPlmn = checkplmnReg(Plmn);
      var querySort = "country";
      queryPost = {querySort: querySort,
                   queryPram: Country,
                   queryPlmn: Plmn,
                   begintime: Begintime,
                   endtime: Endtime,
                   TimezoneOffset: TimezoneOffset,
                   DispatchThreshold: DispatchThreshold,
                   FlowerThreshold: FlowerThreshold
                   };
      //关闭国家限制，后续要打开在设置
      if ((Country == "") && (DispatchThreshold <= 10)){
         $("#queryQlert").append(
			 queryAndReturnAlert+
			    '<p>不设置国家是，分卡次数阈值必须大于等于10次!</p>'+
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
      else if (FlowerThreshold==""){
        $("#queryQlert").append(
			queryAndReturnAlert+
			    '<p>请设置流量阈值!</p>'+
			'</div>'
			);
      }
      else if (DispatchThreshold==""){
        $("#queryQlert").append(
			queryAndReturnAlert+
			    '<p>请设置分卡阈值!</p>'+
			'</div>'
			);
      }
      else if( !(conformPlmn) ){
          $("#queryQlert").append(
			queryAndReturnAlert+
			    '<p>PLMN输入格式有误，请重新输入!</p>'+
			'</div>'
			);
      }
      else{
        if (HourGap == 0){
         $("#queryQlert").append(
			queryAndReturnAlert+
			    '<p>起始和截止时间设置相同，请从新设置时间!</p>'+
			'</div>'
			);
         }
         else{
             $("#ProbDic-notificationContent").children().detach();
             if(HourGap>24){
                 $("#queryQlert").append(
			         queryAndReturnAlert+
			         '<p>时常超过24小时，请从新设置时间!</p>'+
			         '</div>'
			     );
             }
             else{
                 //clear old data 清理数据
                 countryPorbDicGridArrayData=[];
                 $("#initProbDicjqxGrid").jqxGrid("clear");
                 $("#ProbDic-QuerynotificationContent").children().detach();
                 $("#ProbDic-QuerynotificationContent").append(
                         '<strong>'+'查询时差为：'+ HourGap +'. 数据获取中......'+'</strong>'
                 );
                 Querynotification_init();
                 $("#ProbDict-QueryjqxNotification").jqxNotification("open");
                 $('#initProbDicjqxGrid').jqxGrid('showloadelement');
                 $("#ProbDic_dataGet").attr("disabled", true);
                 var AjaxRequest = $.ajax({
                     type: "POST",
                     //get方法url地址
                     url: $SCRIPT_ROOT + "/api/v1.0/get_countryProbVsimDic/",
                     //request set
                     contentType: "application/json",
                     //data参数
                     data: JSON.stringify(queryPost),
                     //server back data type
                     dataType: "json"
                 })
                 .done(function(data){
                     //clear old data 清理数据
                     countryPorbDicGridArrayData=[];
                     $("#initProbDicjqxGrid").jqxGrid("clear");
                     //关闭通知
                     $("#ProbDict-QueryjqxNotification").jqxNotification("closeLast");
                     var getData = data;
                     if (getData.data.length==0){
                               if (getData.info.err){
                                   //delete old alter
						           $("#queryQlert").append(
						               queryAndReturnAlert +
						               '<p>Error：'+ getData.info.errinfo +'</p></div>'
						           );
                               }
                               else{
						           $("#queryQlert").append(
						               queryAndReturnAlert +
						               '<p>无查询结果!</p></div>'
						           );
                               }
                     }
                     else{
                         $.each( getData.data, function(i, item){
                                       countryPorbDicGridArrayData.push({
                                           country: item.country,
                                           imsi: item.imsi,
                                           iccid: item.iccid,
                                           package_type_name: item.package_type_name,
                                           next_update_time: item.next_update_time,
                                           bam: item.bam,
                                           imsi_con: item.imsi_con,
                                           imei_con: item.imei_con,
                                           Flower: item.Flower,
                                           err: item.err,
                                       });
                                });//each函数完成
                           // set the new data
                           countryProbDicsource.localdata = countryPorbDicGridArrayData;
						   $('#initProbDicjqxGrid').jqxGrid('updatebounddata');
                     }
                 })
                 .fail(function(jqXHR, status){
                     //clear old data 清理数据
                     countryPorbDicGridArrayData=[];
                     $("#initProbDicjqxGrid").jqxGrid("clear");
                     $("#ProbDict-QueryjqxNotification").jqxNotification("closeLast");
				     $("#queryQlert").append(
						 queryAndReturnAlert +
					     '<p> Servers False!</p></div>'
					 );
                 })
                 .always(function() {
                     $("#ProbDic_dataGet").attr("disabled", false);
                 });
             }
         }
      }
    }
    else{
      querySort = "imsi";
      queryPost = {querySort: querySort,
                   queryPram: Imsi,
                   queryPlmn: Plmn,
                   begintime: Begintime,
                   endtime: Endtime,
                   TimezoneOffset: TimezoneOffset,
                   DispatchThreshold: DispatchThreshold,
                   FlowerThreshold: FlowerThreshold
                   };
      var conformImsi = checkImsiReg(Imsi);
      if (!(conformImsi)){
        $("#queryQlert").append(
			queryAndReturnAlert+
			    "<p>请设置imsi!格式为'424030230488593','424030230872989','424030231108309',...</p>"+
			"</div>"
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
      else{
        if (HourGap == 0){
         $("#queryQlert").append(
			queryAndReturnAlert+
			    '<p>起始和截止时间设置相同，请从新设置时间!</p>'+
			'</div>'
			);
         }
         else{
             $("#ProbDic-notificationContent").children().detach();
             if(HourGap>24){
                 $("#queryQlert").append(
			         queryAndReturnAlert+
			         '<p>时常超过24小时，请从新设置时间!</p>'+
			         '</div>'
			     );
             }
             else{
                 //clear old data 清理数据
                 countryPorbDicGridArrayData=[];
                 $("#initProbDicjqxGrid").jqxGrid("clear");
                 $("#ProbDic-QuerynotificationContent").children().detach();
                 $("#ProbDic-QuerynotificationContent").append(
                         '<strong>'+'查询时差为：'+ HourGap +'. 数据获取中......'+'</strong>'
                 );
                 Querynotification_init();
                 $("#ProbDict-QueryjqxNotification").jqxNotification("open");
                 $('#initProbDicjqxGrid').jqxGrid('showloadelement');
                 $("#ProbDic_dataGet").attr("disabled", true);
                 var AjaxRequest = $.ajax({
                     type: "POST",
                     //get方法url地址
                     url: $SCRIPT_ROOT + "/api/v1.0/get_countryProbVsimDic/",
                     //request set
                     contentType: "application/json",
                     //data参数
                     data: JSON.stringify(queryPost),
                     //server back data type
                     dataType: "json"
                 })
                 .done(function(data){
                     //clear old data 清理数据
                     countryPorbDicGridArrayData=[];
                     $("#initProbDicjqxGrid").jqxGrid("clear");
                     $("#ProbDict-QueryjqxNotification").jqxNotification("closeLast");
                     var getData = data;
                     if (getData.data.length==0){
                               if (getData.info.err){
                                   //delete old alter
						           $("#queryQlert").append(
						               queryAndReturnAlert +
						               '<p>Error：'+ getData.info.errinfo +'</p></div>'
						           );
                               }
                               else{
						           $("#queryQlert").append(
						               queryAndReturnAlert +
						               '<p>无查询结果!</p></div>'
						           );
                               }
                     }
                     else{
                         $.each( getData.data, function(i, item){
                                       countryPorbDicGridArrayData.push({
                                           country: item.country,
                                           imsi: item.imsi,
                                           iccid: item.iccid,
                                           package_type_name: item.package_type_name,
                                           next_update_time: item.next_update_time,
                                           bam: item.bam,
                                           imsi_con: item.imsi_con,
                                           imei_con: item.imei_con,
                                           Flower: item.Flower,
                                           err: item.err,
                                       });
                                });//each函数完成
                           // set the new data
                           countryProbDicsource.localdata = countryPorbDicGridArrayData;
						   $('#initProbDicjqxGrid').jqxGrid('updatebounddata');
                     }
                 })
                 .fail(function(jqXHR, status){
                     //clear old data 清理数据
                     countryPorbDicGridArrayData=[];
                     $("#initProbDicjqxGrid").jqxGrid("clear");
                     $("#ProbDict-QueryjqxNotification").jqxNotification("closeLast");
				     $("#queryQlert").append(
						 queryAndReturnAlert +
					     '<p> Servers False!</p></div>'
					 );
                 })
                 .always(function() {
                     $("#ProbDic_dataGet").attr("disabled", false);
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
   var RegExp1 = /^(['][0-9]+['])$/;
   var RegExp2 = /^(['][0-9]+['][,])*['][0-9]+[']$/;
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
   var RegExp1 = /^(['][0-9]+['])$/;
   var RegExp2 = /^(['][0-9]+['][,])*['][0-9]+[']$/;
   //plmn非空时监测输入格式是否合法-规则为以数组开头结尾
   if ((RegExp1.exec(stringTest) || (RegExp2.exec(stringTest)) )&& (str !='')){
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

//--------------------------------------------------------------main-初始化主程序-----------------------------------------
$(function () {
    //--------------------------初始化统计表单
    initProbDicjqxGrid();
    //select 下拉列表筛选数据-国家：
    var country_data = [{text: 'AD'},{text: 'AE'},{text: 'AF'},{text: 'AG'},{text: 'AI'},{text: 'AL'},{text: 'AM'},{text: 'AO'},{text: 'AQ'},{text: 'AR'},{text: 'AS'},{text: 'AT'},{text: 'AU'},{text: 'AW'},{text: 'AX'},{text: 'AZ'},{text: 'BA'},{text: 'BB'},{text: 'BD'},{text: 'BE'},{text: 'BF'},{text: 'BG'},{text: 'BH'},{text: 'BI'},{text: 'BJ'},{text: 'BL'},{text: 'BM'},{text: 'BN'},{text: 'BO'},{text: 'BQ'},{text: 'BR'},{text: 'BS'},{text: 'BT'},{text: 'BV'},{text: 'BW'},{text: 'BY'},{text: 'BZ'},{text: 'CA'},{text: 'CC'},{text: 'CD'},{text: 'CF'},{text: 'CG'},{text: 'CH'},{text: 'CI'},{text: 'CK'},{text: 'CL'},{text: 'CM'},{text: 'CN'},{text: 'CO'},{text: 'CR'},{text: 'CU'},{text: 'CV'},{text: 'CW'},{text: 'CX'},{text: 'CY'},{text: 'CZ'},{text: 'DE'},{text: 'DJ'},{text: 'DK'},{text: 'DM'},{text: 'DO'},{text: 'DZ'},{text: 'EC'},{text: 'EE'},{text: 'EG'},{text: 'EH'},{text: 'ER'},{text: 'ES'},{text: 'ET'},{text: 'FI'},{text: 'FJ'},{text: 'FK'},{text: 'FM'},{text: 'FO'},{text: 'FR'},{text: 'GA'},{text: 'GB'},{text: 'GD'},{text: 'GE'},{text: 'GF'},{text: 'GG'},{text: 'GH'},{text: 'GI'},{text: 'GL'},{text: 'GM'},{text: 'GN'},{text: 'GP'},{text: 'GQ'},{text: 'GR'},{text: 'GS'},{text: 'GT'},{text: 'GU'},{text: 'GW'},{text: 'GY'},{text: 'HK'},{text: 'HM'},{text: 'HN'},{text: 'HR'},{text: 'HT'},{text: 'HU'},{text: 'ID'},{text: 'IE'},{text: 'IL'},{text: 'IM'},{text: 'IN'},{text: 'IO'},{text: 'IQ'},{text: 'IR'},{text: 'IS'},{text: 'IT'},{text: 'JE'},{text: 'JM'},{text: 'JO'},{text: 'JP'},{text: 'KE'},{text: 'KG'},{text: 'KH'},{text: 'KI'},{text: 'KM'},{text: 'KN'},{text: 'KP'},{text: 'KR'},{text: 'KW'},{text: 'KY'},{text: 'KZ'},{text: 'LA'},{text: 'LB'},{text: 'LC'},{text: 'LI'},{text: 'LK'},{text: 'LR'},{text: 'LS'},{text: 'LT'},{text: 'LU'},{text: 'LV'},{text: 'LY'},{text: 'MA'},{text: 'MC'},{text: 'MD'},{text: 'ME'},{text: 'MF'},{text: 'MG'},{text: 'MH'},{text: 'MK'},{text: 'ML'},{text: 'MM'},{text: 'MN'},{text: 'MO'},{text: 'MP'},{text: 'MQ'},{text: 'MR'},{text: 'MS'},{text: 'MT'},{text: 'MU'},{text: 'MV'},{text: 'MW'},{text: 'MX'},{text: 'MY'},{text: 'MZ'},{text: 'NA'},{text: 'NC'},{text: 'NE'},{text: 'NF'},{text: 'NG'},{text: 'NI'},{text: 'NL'},{text: 'NO'},{text: 'NP'},{text: 'NR'},{text: 'NU'},{text: 'NZ'},{text: 'OM'},{text: 'PA'},{text: 'PC'},{text: 'PE'},{text: 'PF'},{text: 'PG'},{text: 'PH'},{text: 'PK'},{text: 'PL'},{text: 'PM'},{text: 'PN'},{text: 'PR'},{text: 'PS'},{text: 'PT'},{text: 'PW'},{text: 'PY'},{text: 'QA'},{text: 'RE'},{text: 'RO'},{text: 'RS'},{text: 'RU'},{text: 'RW'},{text: 'SA'},{text: 'SB'},{text: 'SC'},{text: 'SD'},{text: 'SE'},{text: 'SG'},{text: 'SH'},{text: 'SI'},{text: 'SJ'},{text: 'SK'},{text: 'SL'},{text: 'SM'},{text: 'SN'},{text: 'SO'},{text: 'SR'},{text: 'ST'},{text: 'SV'},{text: 'SX'},{text: 'SY'},{text: 'SZ'},{text: 'TC'},{text: 'TD'},{text: 'TF'},{text: 'TG'},{text: 'TH'},{text: 'TJ'},{text: 'TK'},{text: 'TL'},{text: 'TM'},{text: 'TN'},{text: 'TO'},{text: 'TR'},{text: 'TT'},{text: 'TV'},{text: 'TW'},{text: 'TZ'},{text: 'UA'},{text: 'UG'},{text: 'UM'},{text: 'US'},{text: 'UY'},{text: 'UZ'},{text: 'VA'},{text: 'VC'},{text: 'VE'},{text: 'VG'},{text: 'VI'},{text: 'VN'},{text: 'VU'},{text: 'WF'},{text: 'WS'},{text: 'YE'},{text: 'YT'},{text: 'ZA'},{text: 'ZM'},{text: 'ZW'}]
    // ------------------------------下拉国家设置
    $(".form-country").select2({
    data: country_data
    });
    $(".form-country").select2({
    placeholder: "",
    allowClear: true
    });
    //初始化日期栏
    daterange_init('-7d');
});
//-----------------------------------------------------end main 函数-----------------------------------------------------

/**
*GSVC API - - 为GSVC卡资源统计接口js模块，包含：
*1、卡资源的套餐名称、套餐更新日期、可用卡数等信息的统计表格接口；
*2、套餐总计流量、剩余流量chart图形接口；
*3、国家峰值用户、卡数、在架卡数统计曲线。
*@author kissf lu
*@since 02.10
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
/**============================================================================*
*告警通用文字,用于通知返回结果错误信息，
*或查询审核告警信息
*===========================================================================**/
var lineChart_alert= '<div class="alert alert-warning" role="alert">'+
			             '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
			             '<span aria-hidden="true">&times;</span>'+
			             '</button>';
var daterange_data='<div class="input-group input-daterange" id="datepicker">'+
      '    <span class="input-group-addon"><strong>时间范围--起始</strong></span>'+
      '    <input type="text" class="input-sm form-control" name="start" id="input-daterange-start"/>'+
      '    <span class="input-group-addon"><strong>结束</strong></span>'+
      '    <input type="text" class="input-sm form-control" name="end" id="input-daterange-end"/>'+
      '</div>';

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

//------------------------------------------------------------初始化统计表单
function initcountrySrcConjqxGrid(item_grid, array){
    //国家卡资源统计表格数据初始化
    var countrySrcConsource ={
        localdata: array,
        datatype: "json",
        datafields: [
            {name: 'Country', type: 'string' },
            {name: 'PackageName', type: 'string' },
            {name: 'NextUpdateTime', type: 'date' },
            {name: 'ORG', type: 'string' },
            {name: 'all_num', type: 'int' },
            {name: 'unact_num', type: 'int' },
            {name: 'ava_num', type: 'int' },
            {name: 'WarningFlow', type: 'int' },
            {name: 'TotalFlower', type: 'float' },
            {name: 'UsedFlower', type: 'float' },
            {name: 'LeftFlower', type: 'float' },
            {name: 'Percentage', type: 'float'}
        ]
    };
    //装在国家统计表格数据jqxgrid data adapter
    var countrySrcConAdapter = new $.jqx.dataAdapter(countrySrcConsource);
    // grid views
    item_grid.jqxGrid({
                filterable: true,
                source: countrySrcConAdapter,
                columnsresize: true,
                enablebrowserselection: true,
                selectionmode: 'onerow',
                altrows: true,
                sortable: true,
                pageable: true,
                autoheight: false,
                autorowheight: false,
                width: "99.8%",
                height: 600,
                pageSize: 1000,
                pagesizeoptions:['1000', '2000', '5000'],
                localization: getLocalization('zh-CN'),
                ready: function () {
                },
                autoshowfiltericon: true,
                columnmenuopening: function (menu, datafield, height) {
                    var column = item_grid.jqxGrid('getcolumn', datafield);
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
                      sortable: false,
                      filterable: false,
                      editable: false,
                      groupable: false,
                      draggable: false,
                      resizable: false,
                      datafield: '',
                      columntype: 'number',
                      width: 50,
                      cellsrenderer: function (row, column, value) {
                          return "<div style='margin:4px;'>" + (value + 1) + "</div>";
                      }
                    },
                    { text: '国家', datafield: 'Country' , width: 70},
                    { text: '套餐名称', datafield: 'PackageName' ,width: 200},
                    { text: '套餐更新日期', datafield: 'NextUpdateTime', cellsformat: 'yyyy-MM-dd HH:mm:ss',
                        filtertype: 'date', width: 150
                    },
                    { text: '归属机构', datafield: 'ORG', filtertype: 'checkedlist', width: 100},
                    { text: '在架卡数', datafield: 'all_num',filterable: "range" , width: 80 },
                    { text: '未激活卡数', datafield: 'unact_num',filterable: "range" , width: 80 },
                    { text: '可用卡数', datafield: 'ava_num',filterable: "range" , width: 80 },
                    { text: '流量预警阀值_MB', datafield: 'WarningFlow',filterable: "range" , width: 120 },
                    { text: '总计流量_GB', datafield: 'TotalFlower',width: 100,filtertype: "range"},
                    { text: '使用流量_GB', datafield: 'UsedFlower',width: 100,filtertype: "range"},
                    { text: '剩余流量_GB', datafield: 'LeftFlower',width: 100,filtertype: "range"},
                    { text: '流量使用率_%', datafield: 'Percentage',width: 100,filtertype: "range"}
                ]
    });
    return countrySrcConsource;
}

//ajax-国家统计表格数据模
function countrySrcConAjaxApi(options_param) {
    var queryPost = options_param.postData;
    var Country = queryPost.country;
    var Org = queryPost.org;
    options_param.queryAlert.alertID.children().detach();
    //以下获取数据
    //清空countrySrcConGridArrayData数据，并且清空前端显示数据
    options_param.gridParam.setArrayData([]);
    options_param.gridParam.gridID.jqxGrid("clear");
    options_param.gridParam.gridID.jqxGrid("showloadelement");
    //disable query button
    options_param.getDataBtID.attr("disabled", true);
    var AjaxRequest = $.ajax({
        type: "POST",
        //get方法url地址
        url: $SCRIPT_ROOT + "/api/v1.0/get_countrySrcCon/",
        //request set
        contentType: "application/json",
        //data参数
        data: JSON.stringify(queryPost),
        //server back data type
        dataType: "json"
    })
        .done(function(data){
            //清空countrySrcConGridArrayData数据，并且清空前端显示数据
            options_param.gridParam.setArrayData([]);
            options_param.gridParam.gridID.jqxGrid("clear");
            var getData = data;
            if (getData.data.length==0){
                if (getData.info.err){
                    //delete old alter
                    options_param.queryAlert.alertID.children().detach();
                    alert_func(options_param.queryAlert.alertID, ('Error：'+ getData.info.errinfo));
                }
                else{
                    options_param.queryAlert.alertID.children().detach();
                    alert_func(options_param.queryAlert.alertID, ('无查询结果!'));
                }
            }
            else{
                var countrySrcConGridArrayData = [];
                $.each( getData.data, function(i, item){
                    countrySrcConGridArrayData.push({
                        Country: item.Country,
                        PackageName: item.PackageName,
                        NextUpdateTime: item.NextUpdateTime,
                        ORG: item.ORG,
                        all_num: item.all_num,
                        unact_num: item.unact_num,
                        ava_num: item.ava_num,
                        WarningFlow: item.WarningFlow,
                        TotalFlower: item.TotalFlower,
                        UsedFlower: item.UsedFlower,
                        LeftFlower: item.LeftFlower,
                        Percentage: item.Percentage
                    });
                });//each函数完成
                // set the new data
                options_param.gridParam.setArrayData(countrySrcConGridArrayData);
                options_param.gridParam.gridSource.localdata = countrySrcConGridArrayData;
                options_param.gridParam.gridID.jqxGrid('updatebounddata');
            }
        })
        .fail(function(jqXHR, status){
            //清空countrySrcConGridArrayData数据，并且清空前端显示数据
            options_param.gridParam.setArrayData([]);
            options_param.gridParam.gridID.jqxGrid("clear");
            options_param.queryAlert.alertID.children().detach();
            alert_func(options_param.queryAlert.alertID, ('Servers False!'));
        })
        .always(function() {
            options_param.getDataBtID.attr("disabled", false);
        });
}
/* 刷新数据button模块*/
$('#countrySrcConFlash').click(function () {
    $('#con-countrySRC-jqxgrid').jqxGrid('updatebounddata');

});

/*现网excel导出栏*/
$("#countrySrcConexcelExport").click(function () {
     var rows = $('#con-countrySRC-jqxgrid').jqxGrid('getdisplayrows');
     var alldatanum= rows.length;
     var view_data=[];
     var json_data={'data':view_data}
     var paginginformation = $('#con-countrySRC-jqxgrid').jqxGrid('getpaginginformation');
     // The page's number.
     var pagenum = paginginformation.pagenum;
     // The page's size.
     var pagesize = paginginformation.pagesize;
     // The number of all pages.
     var pagescount = paginginformation.pagescount;
     if (alldatanum==0){
         //delete old alter
        $("#country-alert").children().detach();
        $("#country-alert").append((lineChart_alert+'<p>无输出数据！</p></div>'));
     }
     else{
         for(var i = 0; i < rows.length; i++){
             if (i==pagenum*pagesize){
                 for (var j = 0; j< pagesize; j++){
                     if (i+j< alldatanum){
                         view_data.push({
                             国家: rows[i+j].Country,
                             套餐名称: rows[i+j].PackageName,
                             套餐更新日期: rows[i+j].NextUpdateTime,
                             归属机构: rows[i+j].ORG,
                             在架卡数: rows[i+j].all_num,
                             未激活卡数: rows[i+j].unact_num,
                             可用卡数: rows[i+j].ava_num,
                             流量预警阀值_MB: rows[i+j].WarningFlow,
                             总计流量_GB: rows[i+j].TotalFlower,
                             使用流量_GB: rows[i+j].UsedFlower,
                             剩余流量_GB: rows[i+j].LeftFlower,
                             流量使用率:rows[i+j].Percentage
                         })
                     }

                 }
             }
         }
         //$("#con-countrySRC-jqxgrid").jqxGrid('exportdata', 'xls', 'con-countrySRC', true, view_data);
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
          temp.action = $SCRIPT_ROOT +"/api/v1.0/export_countrySrcStatic/";  //test_exportExcel
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

//----------------------------------------------------------------初始化daterange
function daterange_init(day_set){
    $('#country_lineChart_date .input-daterange'). datepicker({
                keyboardNavigation: false,
                startDate: day_set,
                endDate: '+01d',
                forceParse: false,
                format: 'yyyy-mm-dd',
                language: 'zh-CN',
                autoclose: true,
                clearBtn: true
    });
}

// ------------------------------------------------------------初始化天维度选择通知栏
function timeDimnotification_init(){
   //初始化通知
   $("#MaxUsrjqxNotification").jqxNotification({
                width: "100%", position: "top-right", blink: true , appendContainer: "#container", opacity: 0.9,
                autoOpen: false, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 3000, template: "info"
    });

};
// ------------------------------------------------------------初始化查询状态通知栏
function MaxUsrQuerynotification_init(){
   //初始化通知
   $("#MaxUsrQueryjqxNotification").jqxNotification({
                width: "100%", position: "top-right", blink: true , appendContainer: "#Querycontainer", opacity: 0.9,
                autoOpen: false, animationOpenDelay: 800, autoClose: false, autoCloseDelay: 3000, template: "info"
    });
};

//---------------------------------------------------------峰值用户时间设置函数
$('#timeDim').on('select2:select', function (evt) {
  // Do something
  $("#MaxUsrnotificationContent").children().detach();
  var TimeDim = $('#timeDim').val();
  if (TimeDim == 'month'){
      //$("#country_lineChart_date").children().detach();
      $("#MaxUsrnotificationContent").append(
          '<strong>'+'时间颗粒已经设置为：月'+'</strong>'
      );
      //
      timeDimnotification_init();
      $("#MaxUsrjqxNotification").jqxNotification("open");

  }
  else{
      $("#MaxUsrnotificationContent").append(
          '<strong>'+'时间颗粒已经设置为：天'+'</strong>'
      );
      timeDimnotification_init();
      $("#MaxUsrjqxNotification").jqxNotification("open");
  }
});

//---------------------------------------------ajax获取国家线性图形统计数据api1.0
$("#country_MaxusrlineChart_dataGet").click(function (){
    var Country=$('#countryMaxusr').val();
    var Begintime = $('input[name="start"]').val();
    var Endtime = $('input[name="end"]').val();
    var BuType = $('#butypeMaxusr').val();
    var TimeDim = $('#timeDim').val();

    //  隐藏上一次告警栏
    $("#country-lineChart-alert").children().detach();
    // 隐藏上次通知
    $("#MaxUsrQueryjqxNotification").jqxNotification("closeLast");
    //必须进行国家选择才能查询！
    if (Country==""){
        $("#country-lineChart-alert").append(
			lineChart_alert+
			    '<p>请选择要查询的国家!</p>'+
			'</div>'
			);
    }
    else if (Begintime==""){
        $("#country-lineChart-alert").append(
			lineChart_alert+
			    '<p>请选择要查询的起始时间!</p>'+
			'</div>'
			);
    }
    else if (Endtime==""){
        $("#country-lineChart-alert").append(
			lineChart_alert+
			    '<p>请选择要查询的截止时间!</p>'+
			'</div>'
			);
    }
    else if (TimeDim==""){
        $("#country-lineChart-alert").append(
			lineChart_alert+
			    '<p>请选择要查询的时间维度!</p>'+
			'</div>'
			);
    }
    else if (BuType==""){
        $("#country-lineChart-alert").append(
			lineChart_alert+
			    '<p>请选择要查询的BU类型!</p>'+
			'</div>'
			);
    }
    else{
        $("#MaxUsrQuerynotificationContent").children().detach();
        $("#MaxUsrQuerynotificationContent").append(
          '<strong>'+'数据获取中......'+'</strong>'
          );
        MaxUsrQuerynotification_init();
        $("#MaxUsrQueryjqxNotification").jqxNotification("open");
        $.getJSON($SCRIPT_ROOT + '/api/v1.0/get_mutiLine_maxUser/', //get方法url地址
               //data参数
               {country: Country,
                begintime: Begintime,
                endtime: Endtime,
                butype: BuType,
                timedim: TimeDim
                },
               //回掉函数
               function(data) {
                           var getData = data;
                           var alert_str = "";
                           if (getData.maxuser.length==0){
                               $("#MaxUsrQueryjqxNotification").jqxNotification("closeLast");
						       $("#country-lineChart-alert").append(
						       lineChart_alert+
						           '<p>无国家峰值用户查询结果，请重新设置查询条件!</p>'+
						       '</div>'
						       );
                           }
                           else{
                               var str_maxUserReturn=draw_mutiLine_CountryMaxOnlineUser(getData);
                           }
               });//getJson函数结束
        }
});
// 绘制峰值用户曲线图函数
function draw_mutiLine_CountryMaxOnlineUser(data){
    //绘制国家维度可用卡数、总计卡数、在线峰值用户数曲线图
    var getData = data;
    var mutiline_lable= [];
    var maxUser_line= [];
    var totalCard_line= [];
    var availableCard_line= [];

    var lineData = {
        labels: mutiline_lable,
        datasets: [
            {
                label: "峰值用户",
                backgroundColor: 'rgba(26,179,148,0.5)',
                borderColor: "rgba(26,179,148,0.7)",
                pointBackgroundColor: "rgba(26,179,148,1)",
                pointBorderColor: "#fff",
                data: maxUser_line
            },
            {
                label: "当前系统总计卡数",
                backgroundColor: 'rgba(220, 220, 220, 0.5)',
                pointBorderColor: "#fff",
                data: totalCard_line
            },
            {
                label: "当前系统可用卡数",
                backgroundColor: 'rgba(126,79,148,0.5)',
                borderColor: "rgba(126,79,148,0.7)",
                pointBackgroundColor: "rgba(126,79,148,1)",
                pointBorderColor: "#fff",
                data: availableCard_line
            }
        ]
    };

    var lineOptions = {
        responsive: true
    };

    if (getData.maxuser.length == 0){
        return '无国家峰值用户卡数统计结果';
    }
    else{
        var getCountryCon=getData.con;
        $.each( getData.maxuser, function(i, item){
         //alert(item.onlinemax)
         mutiline_lable.push(
             item.sampletime
         );
         maxUser_line.push(
             item.onlinemax
         );
         totalCard_line.push(
             getData.con[0]["on_shelf_num"]
         );
         availableCard_line.push(
             getData.con[0]["ava_num"]
         )
       });//each函数完成
       $("#MaxUsrQueryjqxNotification").jqxNotification("closeLast");
       $("#country_lineChart").remove();
       $("#mutil_inecharts_div").append('<canvas id="country_lineChart" height="80" ></canvas>');
       var ctx_country_lineChart = document.getElementById("country_lineChart").getContext("2d");
       new Chart(ctx_country_lineChart, {type: 'line', data: lineData, options:lineOptions});
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

};

//-------------------------------------------------ajax获取国家在板卡数、可用卡数数据
$("#countryChartdataGet").click(function () {
    var Country= $('#countryChartSelect').val();
    //  隐藏上一次告警栏
    $("#countryChartalert").children().detach();
    //必须进行国家选择才能查询！
    if (Country==""){
        $("#countryChartalert").append(
			lineChart_alert+
			    '<p>请选择要查询的国家!</p>'+
			'</div>'
			);
    }
    else{
        $("#countryChartQuerynotificationContent").children().detach();
        $("#countryChartQuerynotificationContent").append(
          '<strong>'+'数据获取中......'+'</strong>'
          );
        countryChartQuerynotification_init();
        $("#countryChartQueryjqxNotification").jqxNotification("open");

        $.getJSON($SCRIPT_ROOT + '/api/v1.0/get_CountryAvailableVsim/', //get方法url地址
               //data参数
               {country: Country
                },
               //回掉函数
               function(data) {
                           var getData = data;
                           var alert_str = "";
                           if (getData.country.VsimPackageflowStatus.N.length == 0){
                               $("#countryChartQueryjqxNotification").jqxNotification("closeLast");
						       $("#countryChartalert").append(
						       lineChart_alert+
						           '<p>无查询结果，请重新设置查询条件!</p>'+
						       '</div>'
						       );
                           }
                           else{
                               $("#countryChartQueryjqxNotification").jqxNotification("closeLast");
                               //var str_Srcvsim=draw_countrySrcvsimStatic(getData.country.srcvsim);
                               var str_Flow=draw_countryFlowStatic(getData.country.VsimPackageflowStatus);
                               // 如果在绘图监测中str_Srcvsim 或 str_Flow 调用函数返回无记录结果的，输出到告警栏中，就设置告诫提示
                               // 当每个绘图都有数据时返回值为false
                               if ( (str_Flow)){
                                   alert_str=alert_str+str_Flow;
                                   $("#countryChartalert").append(
                                   lineChart_alert+
						               '<p>'+alert_str+'请改变条件查询！</p>'+
						           '</div>'
						       );
                               }
                           };
               });//getJson函数结束
        }
});

//---------------------------------------------绘制国家在板卡、可用卡、空闲卡BAR图形
function draw_countrySrcvsimStatic(data){
    var getData = data;
    //var lableDoughnut=$("#countryChartSelect").val()
    var vsim_tatic_labels=["在架卡数","可用卡数","空闲卡数"];
    var N_vsim_country_data=[];
    var S_vsim_country_data=[];

    var doughnutData = {
        labels: vsim_tatic_labels,
        datasets: [
        {
            label: "新架构",
            backgroundColor: 'rgba(26,179,148,0.5)',
            borderColor: "rgba(26,179,148,0.7)",
            pointBackgroundColor: "rgba(26,179,148,1)",
            pointBorderColor: "#fff",
            data: N_vsim_country_data
        }
        ]
    };
    var doughnutOptions = {
        events: false,
        tooltips: {
        enabled: false
    },
    hover: {
        animationDuration: 0
    },
    animation: {
        duration: 1,
        onComplete: function () {
            var chartInstance = this.chart,
                ctx = chartInstance.ctx;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'bottom';

            this.data.datasets.forEach(function (dataset, i) {
                var meta = chartInstance.controller.getDatasetMeta(i);
                meta.data.forEach(function (bar, index) {
                    var data = dataset.data[index];
                    ctx.fillStyle = dataset.backgroundColor;
                    ctx.fillText(data, bar._model.x, bar._model.y - 5);
                });
            });
        }
    }
    };
    if ((getData.N.length == 0) && (getData.S.length == 0)){
        //做一次画板数据清空
		$("#doughnutChart_json").remove();
        $("#doughnutChart_div").append('<canvas id="doughnutChart_json" height="180"></canvas>');
        return '无国家卡数统计结果! ';
    }
    else{
        $.each( getData.N, function(i, item){
                                       N_vsim_country_data.push(
                                       Number(item.all_num),
                                       Number(item.available_num),
                                       Number(item.unoccupy_num)
                                       );
                           });//each函数完成
        $.each( getData.S, function(i, item){
                                       S_vsim_country_data.push(
                                       Number(item.all_num),
                                       Number(item.available_num),
                                       Number(item.unoccupy_num)
                                       );
                           });//each函数完成
        //做一次画板数据清空、新加入数据绘制
        $("#doughnutChart_json").remove();
        $("#doughnutChart_div").append('<canvas id="doughnutChart_json" height="180"></canvas>');
        var ctx = document.getElementById("doughnutChart_json").getContext("2d");
        new Chart(ctx, {type: 'bar', data: doughnutData, options:doughnutOptions});
    }
    return false;
}
//---------------------------------------------------绘制可用卡套餐流量情况bar图
function draw_countryFlowStatic(data){

    var getData = data;
    var lablecountry_flow=$('select[name="country"]').val();
    var N_countryVsimPackageflowStatuslabels=[];
    var N_countryVsimPackageflowStatustotal=[];
    var N_countryVsimPackageflowStatusleave=[];


    var barData = {
        labels: N_countryVsimPackageflowStatuslabels,
        datasets: [
            {
                label: "初始流量/GB",
                backgroundColor: 'rgba(26,179,148,0.5)',
                pointBorderColor: "rgba(26,179,148,0.7)",
                data: N_countryVsimPackageflowStatustotal
            },
            {
                label: "剩余流量/GB",
                backgroundColor: 'rgba(90, 110, 110, 0.5)',
                borderColor: 'rgba(90, 110, 110, 0.7)',
                pointBackgroundColor: "rgba(90, 110, 110, 1)",
                pointBorderColor: "#fff",
                data: N_countryVsimPackageflowStatusleave
            }
        ]
    };
    var barOptions = {
        events: false,
        tooltips: {
        enabled: true
    },
    hover: {
        animationDuration: 0
    },
    animation: {
        duration: 1,
        onComplete: function () {
            var chartInstance = this.chart,
                ctx = chartInstance.ctx;
                //ctx.font = //Chart.helpers.fontString(self.fontSize, self.fontStyle, self.fontFamily);
                //ctx.fillStyle = "#79D1CF"
                ctx.textAlign = 'center';
                ctx.textBaseline = 'bottom';

            this.data.datasets.forEach(function (dataset, i) {
                var meta = chartInstance.controller.getDatasetMeta(i);
                meta.data.forEach(function (bar, index) {
                    var data = dataset.data[index];
                    ctx.fillStyle = dataset.backgroundColor;
                    ctx.fillText(data, bar._model.x, bar._model.y - 5);
                });
            });
        }
    }
    };

    var S_countryVsimPackageflowStatuslabels=[];
    var S_countryVsimPackageflowStatustotal=[];
    var S_countryVsimPackageflowStatusleave=[];

    var S_barData = {
        labels: S_countryVsimPackageflowStatuslabels,
        datasets: [
            {
                label: "初始流量/GB",
                backgroundColor: 'rgba(26,179,148,0.5)',
                pointBorderColor: "rgba(26,179,148,0.7)",
                data: S_countryVsimPackageflowStatustotal
            },
            {
                label: "剩余流量/GB",
                backgroundColor: 'rgba(90, 110, 110, 0.5)',
                borderColor: 'rgba(90, 110, 110, 0.7)',
                pointBackgroundColor: "rgba(90, 110, 110, 1)",
                pointBorderColor: "#fff",
                data: S_countryVsimPackageflowStatusleave
            }
        ]
    };

    var S_barOptions = {
        //responsive: true,
        events: false,
        tooltips: {
        enabled: false
    },
    hover: {
        animationDuration: 0
    },
    animation: {
        duration: 1,
        onComplete: function () {
            var chartInstance = this.chart,
                ctx = chartInstance.ctx;
                //ctx.font = //Chart.helpers.fontString(self.fontSize, self.fontStyle, self.fontFamily);
                //ctx.fillStyle = "#79D1CF"
                ctx.textAlign = 'center';
                ctx.textBaseline = 'bottom';

            this.data.datasets.forEach(function (dataset, i) {
                var meta = chartInstance.controller.getDatasetMeta(i);
                meta.data.forEach(function (bar, index) {
                    var data = dataset.data[index];
                    ctx.fillStyle = dataset.backgroundColor;
                    ctx.fillText(data, bar._model.x, bar._model.y - 5);
                });
            });
        }
    }
    };


    if ((getData.N.length == 0)){
		$("#N_PackagesFlower_barChart").remove();
        $("#N_PackagesFlower_barChart_div").append('<canvas id="N_PackagesFlower_barChart" height="180"></canvas>');
        $("#S_PackagesFlower_barChart").remove();
        $("#S_PackagesFlower_barChart_div").append('<canvas id="S_PackagesFlower_barChart" height="180"></canvas>');
        return '无国家流量统计结果!';
	}
	else{
	    $.each( getData.N, function(i, item){
         /**alert(item.package_name)
         */
         N_countryVsimPackageflowStatuslabels.push(
             item.package_name.substring(0,11)
         );
         N_countryVsimPackageflowStatustotal.push(
             item.totalflow
         );
         N_countryVsimPackageflowStatusleave.push(
             item.totalleaveflow
         );
       });
       /**
       *each函数完成
       */
        $("#N_PackagesFlower_barChart").remove();
        $("#N_PackagesFlower_barChart_div").append('<canvas id="N_PackagesFlower_barChart" height="180"></canvas>');
        var ctx2 = document.getElementById("N_PackagesFlower_barChart").getContext("2d");
        new Chart(ctx2, {type: 'bar', data: barData, options:barOptions});
        return false;
	}
}
function initSelect(select_class, select_data, select_options) {
    select_class.select2(select_data);
    select_class.select2(select_options);

}
function initSelectView(select_class){
    //select country:
    var country_data = [
        {text: 'AD'},{text: 'AE'},{text: 'AF'},{text: 'AG'},{text: 'AI'},{text: 'AL'},{text: 'AM'},{text: 'AO'},{text: 'AQ'},{text: 'AR'},{text: 'AS'},{text: 'AT'},{text: 'AU'},{text: 'AW'},{text: 'AX'},{text: 'AZ'},{text: 'BA'},{text: 'BB'},{text: 'BD'},{text: 'BE'},{text: 'BF'},{text: 'BG'},{text: 'BH'},{text: 'BI'},{text: 'BJ'},{text: 'BL'},{text: 'BM'},{text: 'BN'},{text: 'BO'},{text: 'BQ'},{text: 'BR'},{text: 'BS'},{text: 'BT'},{text: 'BV'},{text: 'BW'},{text: 'BY'},{text: 'BZ'},{text: 'CA'},{text: 'CC'},{text: 'CD'},{text: 'CF'},{text: 'CG'},{text: 'CH'},{text: 'CI'},{text: 'CK'},{text: 'CL'},{text: 'CM'},{text: 'CN'},{text: 'CO'},{text: 'CR'},{text: 'CU'},{text: 'CV'},{text: 'CW'},{text: 'CX'},{text: 'CY'},{text: 'CZ'},{text: 'DE'},{text: 'DJ'},{text: 'DK'},{text: 'DM'},{text: 'DO'},{text: 'DZ'},{text: 'EC'},{text: 'EE'},{text: 'EG'},{text: 'EH'},{text: 'ER'},{text: 'ES'},{text: 'ET'},{text: 'FI'},{text: 'FJ'},{text: 'FK'},{text: 'FM'},{text: 'FO'},{text: 'FR'},{text: 'GA'},{text: 'GB'},{text: 'GD'},{text: 'GE'},{text: 'GF'},{text: 'GG'},{text: 'GH'},{text: 'GI'},{text: 'GL'},{text: 'GM'},{text: 'GN'},{text: 'GP'},{text: 'GQ'},{text: 'GR'},{text: 'GS'},{text: 'GT'},{text: 'GU'},{text: 'GW'},{text: 'GY'},{text: 'HK'},{text: 'HM'},{text: 'HN'},{text: 'HR'},{text: 'HT'},{text: 'HU'},{text: 'ID'},{text: 'IE'},{text: 'IL'},{text: 'IM'},{text: 'IN'},{text: 'IO'},{text: 'IQ'},{text: 'IR'},{text: 'IS'},{text: 'IT'},{text: 'JE'},{text: 'JM'},{text: 'JO'},{text: 'JP'},{text: 'KE'},{text: 'KG'},{text: 'KH'},{text: 'KI'},{text: 'KM'},{text: 'KN'},{text: 'KP'},{text: 'KR'},{text: 'KW'},{text: 'KY'},{text: 'KZ'},{text: 'LA'},{text: 'LB'},{text: 'LC'},{text: 'LI'},{text: 'LK'},{text: 'LR'},{text: 'LS'},{text: 'LT'},{text: 'LU'},{text: 'LV'},{text: 'LY'},{text: 'MA'},{text: 'MC'},{text: 'MD'},{text: 'ME'},{text: 'MF'},{text: 'MG'},{text: 'MH'},{text: 'MK'},{text: 'ML'},{text: 'MM'},{text: 'MN'},{text: 'MO'},{text: 'MP'},{text: 'MQ'},{text: 'MR'},{text: 'MS'},{text: 'MT'},{text: 'MU'},{text: 'MV'},{text: 'MW'},{text: 'MX'},{text: 'MY'},{text: 'MZ'},{text: 'NA'},{text: 'NC'},{text: 'NE'},{text: 'NF'},{text: 'NG'},{text: 'NI'},{text: 'NL'},{text: 'NO'},{text: 'NP'},{text: 'NR'},{text: 'NU'},{text: 'NZ'},{text: 'OM'},{text: 'PA'},{text: 'PC'},{text: 'PE'},{text: 'PF'},{text: 'PG'},{text: 'PH'},{text: 'PK'},{text: 'PL'},{text: 'PM'},{text: 'PN'},{text: 'PR'},{text: 'PS'},{text: 'PT'},{text: 'PW'},{text: 'PY'},{text: 'QA'},{text: 'RE'},{text: 'RO'},{text: 'RS'},{text: 'RU'},{text: 'RW'},{text: 'SA'},{text: 'SB'},{text: 'SC'},{text: 'SD'},{text: 'SE'},{text: 'SG'},{text: 'SH'},{text: 'SI'},{text: 'SJ'},{text: 'SK'},{text: 'SL'},{text: 'SM'},{text: 'SN'},{text: 'SO'},{text: 'SR'},{text: 'ST'},{text: 'SV'},{text: 'SX'},{text: 'SY'},{text: 'SZ'},{text: 'TC'},{text: 'TD'},{text: 'TF'},{text: 'TG'},{text: 'TH'},{text: 'TJ'},{text: 'TK'},{text: 'TL'},{text: 'TM'},{text: 'TN'},{text: 'TO'},{text: 'TR'},{text: 'TT'},{text: 'TV'},{text: 'TW'},{text: 'TZ'},{text: 'UA'},{text: 'UG'},{text: 'UM'},{text: 'US'},{text: 'UY'},{text: 'UZ'},{text: 'VA'},{text: 'VC'},{text: 'VE'},{text: 'VG'},{text: 'VI'},{text: 'VN'},{text: 'VU'},{text: 'WF'},{text: 'WS'},{text: 'YE'},{text: 'YT'},{text: 'ZA'},{text: 'ZM'},{text: 'ZW'},{text: 'noCountry'}
        ];
    //select org：
    var org_name = [{text:'35ORG'}, {text:'a2network'}, {text:'CelloMobile'}, {text:'GFC_simbank'}, {text:'GLOBALWIFI'},
        {text:'北京信威'}, {text:'GWIFI'}, {text:'JETFI桔豐科技'}, {text:'LianLian'}, {text:'POCWIFI'}, {text:'TestMvno'},
        {text:'VisonData-ORG'}, {text:'YROAM'}, {text:'all'}
        ];
    //select time dim：
    var timedim_data = [{text: 'day'},{text: 'month'}];
    //select buType：
    var butype_data = [{text: 'GTBU'}];
    // select country views
    initSelect(select_class.country, {data: country_data}, {placeholder: "国家简码", allowClear: true});
    // select org views
    initSelect(select_class.org, {data: org_name}, {allowClear: false});
    // select buType views
    initSelect(select_class.buType, {data: butype_data}, {placeholder: "BU类别", allowClear: true});
    // select buType views
    initSelect(select_class.timeDim, {data: timedim_data}, {placeholder: "时间维度", allowClear: true});
}
/**================================
 *  -------初始化显示选择函数
 *=================================
 * @param item_related_grid
 * @param item_jqx_drop_down
 *======================================================================**/
function initDropDownList(item_related_grid, item_jqx_drop_down){
    // Create a jqxDropDownList
    var jqxDropDownList=[
        {label: '国家', value: 'Country', checked: true },
        {label: '套餐名称', value: 'PackageName', checked: true },
        {label: '套餐更新日期', value: 'NextUpdateTime', checked: true },
        {label: '归属机构', value: 'ORG', checked: true },
        {label: '在架卡数', value: 'all_num', checked: true },
        {label: '未激活卡数', value: 'unact_num', checked: true },
        {label: '可用卡数', value: 'ava_num', checked: true },
        {label: '流量预警阀值', value: 'WarningFlow', checked: true },
        {label: '总计流量', value: 'TotalFlower', checked: true },
        {label: '使用流量', value: 'UsedFlower', checked: true },
        {label: '剩余流量', value: 'LeftFlower', checked: true },
        {label: '流量使用率', value: 'Percentage', checked: true }
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

//--------------------------------------------------------------main-初始化主程序-----------------------------------------
$(function () {
    var VarGsvcHome = {
        alertWinStr:'',      //alert() function use alertWinStr value to show alert
        gridArray: [],
        item:{
            countrySelectClass : $(".form-country"),
            orgSelectClass: $(".form-org"),
            buSelectClass: $(".form-butype"),
            timeDimClass: $(".form-timedim"),
            gridID: $("#con-countrySRC-jqxgrid"),
            dropDownListID: $("#jqxDropDownList"),
            getGridDataID: $("#countrySrcCondataGet"),
            alertID: $("#country-alert")
        },
        setGridArrayData: function (arrayData) {
            this.gridArray=arrayData;
        },
        setAlertWinStr: function (strAlert) {
            this.alertWinStr = strAlert;
        }
    };
    var selectClass = {
        country: VarGsvcHome.item.countrySelectClass,
        org: VarGsvcHome.item.orgSelectClass,
        buType: VarGsvcHome.item.buSelectClass,
        timeDim: VarGsvcHome.item.timeDimClass
    };
    // 初始化 select
    initSelectView(selectClass);
    //============================
    // 初始化统计表单
    var gsvcHomeGridSource = initcountrySrcConjqxGrid(VarGsvcHome.item.gridID, VarGsvcHome.gridArray);
    //==================================================================================================
    // 初始化下拉选择显示
    initDropDownList(VarGsvcHome.item.gridID, VarGsvcHome.item.dropDownListID);
    //=================================================================
    VarGsvcHome.item.getGridDataID.click(function () {
        var ajaxParam ={
            getDataBtID: VarGsvcHome.item.getGridDataID,
            gridParam:{
                gridID: VarGsvcHome.item.gridID,
                arrayData: VarGsvcHome.gridArray,
                gridSource: gsvcHomeGridSource,
                setArrayData: VarGsvcHome.setGridArrayData
            },
            postData:{
                country: VarGsvcHome.item.countrySelectClass.val(),
                org: VarGsvcHome.item.orgSelectClass.val()
            },
            queryAlert:{
                alertID: VarGsvcHome.item.alertID,
                str: VarGsvcHome.alertWinStr,
                setStr: VarGsvcHome.setAlertWinStr
            }
        };
        countrySrcConAjaxApi(ajaxParam);
    });
    daterange_init('-360d');

});
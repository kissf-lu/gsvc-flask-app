/**
 *
 * @type {string}
 */


/**     --------appendManulForm func-------
 *
 * @param modal_title_id: modal title name string value to make different title;
 * @param modal_body_id: id obtaining jquery type var inserted form data into modal body html;
 * @param modal_head_name: value to set modal head title;
 * @param temple_title: value to set modal html get_temple_button name.
 * @returns {boolean}
 */

function appendManulForm(modal_title_id, modal_body_id, modal_head_name, temple_title){
    /**
     *
     * @type {string}
     * @private
     */
    //delete form html
    var _idModalTitel = "#"+ modal_title_id;
    var _idModalBody = "#" + modal_body_id;
    var $idModalTitle = $(_idModalTitel);
    var $idModalbody = $(_idModalBody);
    $idModalTitle.text(modal_head_name);

    var manulForm = (
        '<form enctype="multipart/form-data" id = "manulform">'+
        '<div class="fileinput fileinput-new input-group" data-provides="fileinput">'+
        '<div class="form-control" data-trigger="fileinput">'+
        '<i class="glyphicon glyphicon-file fileinput-exists"></i>'+
        '<span class="fileinput-filename"></span>'+
        '</div>'+
        '<span class="input-group-addon btn btn-default btn-file">'+
        '<span class="fileinput-new">选择</span>'+
        '<span class="fileinput-exists">重选</span>'+
        '<input name="file" type="file" id="manual_file"/>'+
        '</span>'+
        '<a href="#" class="input-group-addon btn btn-default fileinput-exists" data-dismiss="fileinput">删除</a>'+
        '</div>'+
        '<br/>'+
        '<input type="submit" id = "uploadFiles" class="btn" value="提交"/>'+
        '<div class="col-sm-4 m-b-xs">'+
        '<div data-toggle="buttons" class="btn-group">'+
        '<button type="button" class="btn btn-primary" id="getTemplate">'+
        temple_title+'&nbsp; '+
        '<span class="glyphicon glyphicon-th-large" aria-hidden="true"></span>'+
        '</button>'+
        '</div>'+
        '</div>'+
        '</form>'
    );
    // remove old form html
    $idModalbody.children().remove();
    // append new form html
    $idModalbody.append(manulForm);
    return false;
}

function DeleteUpdateInsertModal(param){
    //$("#progressAjax").jqxLoader({ text: "提交更新数据中...", width: 100, height: 60 });
    var actionParam = param;
    //remove alert old
    actionParam.alertID.children().remove();
    //append html of modal
    var appendHtlm = appendManulForm(actionParam.modalTitleID, actionParam.modalBodyID,
                                     actionParam.modalHeadTitle, actionParam.getTempleTitle);
    // show modal
    actionParam.modalID.modal();
    //set options of form that you will submit files to server GSVC
    var options = {
        beforeSubmit:  showRequest,  // pre-submit callback
        success:       showResponse,  // post-submit callback
        error:         errResponse,  // post-submit err function
        url:           actionParam.postURL,// override for form's 'action' attribute
        type:          "post",         // 'get' or 'post', override for form's 'method' attribute
        dataType:      "json"
        //timeout:       30000,
        //clearForm:     true,        // clear all form fields after successful submit
        //resetForm:     true,        // reset the form after successful submit
    };
    // 窗体内的上传文文件函数
    $('#uploadFiles').click(function (){
        //获取files值
        var filesValue = $("#manual_file").val();
        if (filesValue == ""){
            alert("请设置输入文件！");
            return false;
        }
        else{
            //上传数据至后台
            $('#manulform').submit(function() {
                $(this).ajaxSubmit(options);

                return false;
            });
        }
    });
    //get template from server
    $('#getTemplate').click(function () {
        //alert('getTemplateDele');
        var temp = document.createElement("form");
        temp.action = actionParam.TemplateURL;
        temp.method = "post";
        temp.style.display = "none";
        var opt = document.createElement("textarea");
        opt.name = "data";
        opt.value = JSON.stringify([]);
        temp.appendChild(opt);
        document.body.appendChild(temp);
        temp.submit();
        return false;
    });
}


function clickAction(option_click) {
    var param = option_click.param;
    var actionFun=DeleteUpdateInsertModal(param);
}

function appendAlertInfo(alert_class, info_str){

    var alertHTML = (
    alert_class +
    '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
    '<span aria-hidden="true">&times;</span>'+
    '</button>'+
    '<strong>'+info_str+'</strong> '+
    '</div>');
    // remove old form html
    $("#app-growl").children().remove();
    // append new form html
    $("#app-growl").append(alertHTML);
}

// pre-submit callback
function showRequest(formData, jqForm, options) {
    // formData is an array; here we use $.param to convert it to a string to display it
    // but the form plugin does this for you automatically when it submits the data
    //var queryString = $.param(formData);

    // jqForm is a jQuery object encapsulating the form element.  To access the
    // DOM element for the form do this:
    //var formElement = jqForm[0];
    //var conformR=conformRun();
    //alert(conformR);
    if(!confirm(globeVarNewVsimTest.alertWinStr)){
        //$('#eventWindow').jqxWindow('close');
        globeVarNewVsimTest.set('');
        globeVarNewVsimTest.ID.modalID.modal('hide');

        return false;
    }
    // here we could return false to prevent the form from being submitted;
    // returning anything other than false will allow the form submit to continue
    //$('#manualModal').modal('hide');
    globeVarNewVsimTest.set('');
    globeVarNewVsimTest.ID.modal_progressID.modal('show');
    globeVarNewVsimTest.ID.progress_barClass.animate({width: "100%"});

    return true;
}

// post-submit callback
function showResponse(responseText, statusText, xhr, $form)  {
    // for normal html responses, the first argument to the success callback
    // is the XMLHttpRequest object's responseText property

    // if the ajaxSubmit method was passed an Options Object with the dataType
    // property set to 'xml' then the first argument to the success callback
    // is the XMLHttpRequest object's responseXML property

    // if the ajaxSubmit method was passed an Options Object with the dataType
    // property set to 'json' then the first argument to the success callback
    // is the json data object returned by the server
    var alertClass = '';
    var alertInfo = '';
    if (responseText.err){
        alertClass = '<div class="alert alert-danger" role="alert">';
        alertInfo = ('操作失败：'+ responseText.errinfo);
    }
    else{
        alertClass = '<div class="alert alert-success" role="alert">';
        alertInfo = ('操作成功！');
    }
    appendAlertInfo(alertClass, alertInfo);
    globeVarNewVsimTest.ID.modal_progressID.modal('hide');
    globeVarNewVsimTest.ID.modalID.modal('hide');

    return false;
}

function errResponse(){
    var alertClass = '<div class="alert alert-warning" role="alert">';
    var alertInfo = ("Network Error!");
    appendAlertInfo(alertClass, alertInfo);
    globeVarNewVsimTest.ID.modal_progressID.modal('hide');
    globeVarNewVsimTest.ID.modalID.modal('hide');

    return false;
}

var globeVarNewVsimTest = {
    'alertWinStr':'',                                //alert() function use alertWinStr value to show alert
    'ID':{
        'DeleteID' : $("#Delete"),
        'UpdateID' : $('#Update'),
        'InsertID' : $('#Insert'),
        'alertID' : $('#alert-model'),              //warn bar model use this id to set warn content
        'modalID' : $('#newVsimTestInfo-Modal'),
        'modal_progressID' : $("#progress-modal"),
        'progress_barClass' : $(".progress-bar")
    },
    'set': function (strAlert) {
        this.alertWinStr = strAlert;
    }
};

$(function () {
    //
    var idGloble= globeVarNewVsimTest;
    if (idGloble.ID !== undefined){
        var $deleteClick = idGloble.ID.DeleteID;
        var $insertClick = idGloble.ID.InsertID;
        var $updateClick = idGloble.ID.UpdateID;
        var $alertID = idGloble.ID.alertID;
        var $modalID = idGloble.ID.modalID;
    }else {
        alert('Param globeVarNewVsimTest False!');
    }
    $deleteClick.click(function () {
        idGloble.set("您确认要进行删除数据操作？数据删除不可恢复！");
        var optionClick={
            param: {
                actionType: 'delete',
                alertID: $alertID,
                modalID: $modalID,
                modalTitleID: "modalTitle",
                modalBodyID: "modalBody",
                modalHeadTitle: '批量删除设置窗口',
                getTempleTitle: '获取批量删除模板',
                postURL: $SCRIPT_ROOT + "#",
                TemplateURL: $SCRIPT_ROOT +"/api/v1.0/export_newVsimTestInfoDeleteTemplate/"
            }
        };
        clickAction(optionClick);
    });
    $insertClick.click(function () {
        idGloble.set("您确认要插入数据吗？禁止插入已有数据！");
        var optionClick={
            param: {
                actionType: 'insert',
                alertID: $alertID,
                modalID: $modalID,
                modalTitleID: "modalTitle",
                modalBodyID: "modalBody",
                modalHeadTitle: '批量导入设置窗口',
                getTempleTitle: '获取批量导入模板',
                postURL: $SCRIPT_ROOT + "#",
                TemplateURL: $SCRIPT_ROOT +"/api/v1.0/export_newVsimTestInfoInsertUpdateTemplate/"
            }
        };
        clickAction(optionClick);
    });
    $updateClick.click(function () {
        idGloble.set("您确认要更新数据吗？");
        var optionClick={
            param: {
                actionType: 'update',
                alertID: $alertID,
                modalID: $modalID,
                modalTitleID: "modalTitle",
                modalBodyID: "modalBody",
                modalHeadTitle: '批量更新设置窗口',
                getTempleTitle: '获取批量更新模板',
                postURL: $SCRIPT_ROOT + "#",
                TemplateURL: $SCRIPT_ROOT +"/api/v1.0/export_newVsimTestInfoInsertUpdateTemplate/"
            }
        };
        clickAction(optionClick);
    });
});

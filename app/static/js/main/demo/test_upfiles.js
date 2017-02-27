var alertWinStr=('');
function appendDeleteForm(){
    //delete form html
    var deleForm = (
'<form enctype="multipart/form-data" id = "deletform">'+
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
    '获取模板 &nbsp; '+
    '<span class="glyphicon glyphicon-th-large" aria-hidden="true"></span>'+
    '</button>'+
    '</div>'+
'</div>'+
'</form>'
);
    // remove old form html
    $("#modalBody").children().remove();
    // append new form html
    $("#modalBody").append(deleForm);
    return false;
}

function DeleteUpdateInsertModal(param){
         //remove alert old
         $("#alert").children().remove();
         //append html of modal
         var appendHtlm = appendDeleteForm();
         // show modal
         $('#manualModal').modal();
         //set options of form that you will submit files to server GSVC
         var options = {
                 beforeSubmit:  showRequest,  // pre-submit callback
                 success:       showResponse,  // post-submit callback
                 error:         errResponse,  // post-submit err function
                 url:           param.DeleteURL,// override for form's 'action' attribute
                 type:          "post",         // 'get' or 'post', override for form's 'method' attribute
                 dataType:      "json",
                 //clearForm:     true,        // clear all form fields after successful submit
                 //resetForm:     true,        // reset the form after successful submit
                 timeout:       3000
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
                 $('#deletform').submit(function() {
                         $(this).ajaxSubmit(options);
                         return false;
                 });
             }
         });
         //get template from server
         $('#getTemplate').click(function () {
             //alert('getTemplateDele');
             var temp = document.createElement("form");
             temp.action = param.TemplateURL//"/test_exportExcel";
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



$('#manualDeletet').click(function () {
    alertWinStr='您确认要进行删除数据操作？数据删除不可恢复！';
    var deleteParam = {
        DeleteURL: $SCRIPT_ROOT + "/api/v1.0/delet_manulVsim/",
        TemplateURL: $SCRIPT_ROOT +"/api/v1.0/export_manualDeleteTemplate/",
    }
    var actionFun=DeleteUpdateInsertModal(deleteParam);
});




function appendAlertInfo(html){
    // remove old form html
    $("#alert").children().remove();
    // append new form html
    $("#alert").append(html);
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
    if(!confirm(alertWinStr)){
            //$('#eventWindow').jqxWindow('close');
            alertWinStr = '';
            $('#manualModal').modal('hide');
    		return false;
    }
    // here we could return false to prevent the form from being submitted;
    // returning anything other than false will allow the form submit to continue
    alertWinStr = '';
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
    if (responseText.err){
        var alertHTML = (
        '<div class="alert alert-danger" role="alert">'+
        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
        '<span aria-hidden="true">&times;</span>'+
        '</button>'+
        '<strong>'+'操作失败：'+ responseText.errinfo +'</strong> '+
        '</div>'
        );
        appendAlertInfo(alertHTML);
        $('#manualModal').modal('hide');

    }
    else{
        var alertHTML = (
        '<div class="alert alert-success" role="alert">'+
        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
        '<span aria-hidden="true">&times;</span>'+
        '</button>'+
        '<strong>操作成功！</strong> '+
        '</div>'
        );
        appendAlertInfo(alertHTML);
        $('#manualModal').modal('hide');
    }

}

function errResponse(){
        var alertHTML = (
        '<div class="alert alert-warning" role="alert">'+
        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
        '<span aria-hidden="true">&times;</span>'+
        '</button>'+
        '<strong>Network Error！</strong> '+
        '</div>'
        );
        appendAlertInfo(alertHTML);
        $('#manualModal').modal('hide');
}
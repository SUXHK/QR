//是否为空字符串
function isEmpty(id){
	var data = $("#"+id).val();
	if(data == null || data == ""){
		return true
	}
	return false;
}

//是否是数字
function isNumber(data){
	var reg = /^[\d]*$/;
	if (!reg.test(data)) {
		return false;
	}
	return true;
}

//是否是数字字母
function isNumberAlphabet(data){
	var reg = /^[\d\w\W]*$/;
	if (!reg.test(data)) {
		return false;
	}
	return true;
}

//限制数字
function numberChange(id){
	var data = $('#'+id).val();
	if (isNumber(data)) {
		if(data < 1){
			$('#'+id).val("1");
		}
	}else{
		$('#'+id).val(parseInt(data));
	}
}

//使用示例:var num=number_format(1234567.089, 2, ".", ",");//返回1,234,567.09
function number_format(number, decimals, dec_point, thousands_sep) {
    number = (number + '').replace(/[^0-9+-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.ceil(n * k) / k;
        };
 
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    var re = /(-?\d+)(\d{3})/;
    while (re.test(s[0])) {
        s[0] = s[0].replace(re, "$1" + sep + "$2");
    }

    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}

//模拟表单提交
function formSubmit(url, params){
    var form = $("<form></form>").attr("action", url).attr("method", "post");
    for(var key in params){
        form.append($("<input></input>").attr("type", "hidden").attr("name", key).attr("value", params[key]));
    }
    form.appendTo('body').submit().remove();
}


//加载表格数据
function loadTable(option){
	layui.use('table', function(){
	  	var table = layui.table;
	  	//加载表格数据
	  	var dataTable = table.render({
	    	elem: option.elem
	    	,url: option.url //数据接口
	    	,where: option.where	//数据接口参数
	    	,request:{//分页参数定义
	    		pageName: 'currentPage' //页码的参数名称，默认：page
	    		,limitName: 'pageSize' //每页数据量的参数名，默认：limit
	    	}
	  		,response:{//返回分页参数定义
				countName: 'rowCount' //数据总数的字段名称，默认：count
			}
	    	,page: true //开启分页
	    	,limit: 10
	    	,limits: [10,20,50,100,200]
	    	,cols: option.cols
	  		,done: option.done
	    	,text: {
	    	    none: '未查询到数据'
	    	}
	  	});
	  	//
	  	option.setTableId(dataTable);
	});
	
}

//打开弹出框
function openWindow(title, url){
	layer.open({
		type: 2
		,title: title
		,content: url
		,area:['80%', '80%']
	});
}

//关闭当前iframe
function closeSelf(data){
	var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
	parent.layer.close(index); //再执行关闭   
}

//关闭当前iframe然后刷新table
function closeSelfAndReload(data){
	closeSelf();
	parent.reloadTable();
}

//打开确认框
function openConfirm(msg, next){
	layer.confirm(msg, function(index){
		layer.close(index);
		next();
	});
}

//普通表单请求
function doFormRequest(formName, url, callback){
	doParamRequest($("#"+formName).serialize(), url, callback);
}

//自定义参数请求
function doParamRequest(param, url, callback){
	$.ajax({
		type : 'POST',
		dataType : 'JSON',
		url: url,
	    traditional: true,
		data: param,
		error: function() {
			layer.msg('请求失败');
		},
		success: function(data) {
			if(data == null || data.code != 0){
				layer.msg(data.msg);
				return;
			}
    		if(callback != null){
    			callback(data);
    		}
		}
	});
}


function getUrlParam(key) {   
	var url = location.search; //获取url中"?"符后的字串   
	var val = null;   
	if (url.indexOf("?") != -1) {   
		var str = url.substr(1);   
		strs = str.split("&");   
		for(var i = 0; i < strs.length; i ++) {
			var kv = strs[i].split("=");
			if(kv[0] == key){
				return kv[1];
			}
		}   
	}   
	return val;   
}   

//初始修改数据
function initUpdateData(url, param){
	$.ajax({
		type : 'POST',
		dataType : 'JSON',
		url: url,
		data: param,
		error : function() {
			layer.msg('请求失败');
		},
		success : function(data) {
			if(data.code != 0){
				layer.msg(data.msg);
				return;
			}
			for(var key in data.data[0]){
				$("[name="+key+"]").val(data.data[0][key]);
			}
		}
	});
}

//初始下拉框
function initSelect(selectId, url, param, valueKey, textKey){
	console.log("initSelect");
	$.ajax({
		type : 'POST',
		dataType : 'JSON',
		url: url,
		data: param,
		error : function() {
			console.log('请求失败');
		},
		success : function(data) {
			if(data.code != 0){
				console.log(data.msg);
				return;
			}
			$("#"+selectId).empty();
			var option = $("<option>").val("").text("请选择");
		    $("#"+selectId).append(option);
			for(var i=0; i<data.data.length; i++){
				var option = $("<option>").val(data.data[i][valueKey]).text(data.data[i][textKey]);
			    $("#"+selectId).append(option);
			}
			renderForm();
		}
	});
}

//重新渲染form
function renderForm(){
	layui.use('form', function(){
		var form = layui.form;
		form.render();
	});
}

//获取表格中选中的行
function getSelectedIds(table, tableId){
	var checkStatus = table.checkStatus(tableId);
    data = checkStatus.data;
	var ids = "";
    for(var i=0; i<data.length; i++){
    	ids = ids+"," + data[i].id;
    }
    if(ids.length > 0){
    	ids = ids.substring(1);
    }
    return ids;
}

//文件上传
function doUpload(url, fileId, fileType, btnId, uploadSuccess, uploadFail){
	layui.use('upload', function(){
	  	var upload = layui.upload;
	  	//执行实例
	  	var uploadInst = upload.render({
		    elem: '#'+fileId, //绑定元素
		    accept: 'file',
		    exts: fileType,
		    size: 10240,
		    auto: false,
		    bindAction: "#"+btnId,
		    url: url, //上传接口
		    done: function(res){
		      	//上传完毕回调
		    	uploadSuccess();
		    },
		    error: function(){
		    	//请求异常回调
		    	uploadFail();
		    }
	  	});
	});
	
}


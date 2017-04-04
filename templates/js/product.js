$(document).ready(function(e) {
   var _page_obj = { 
			pagenumber: 1, //第幾頁
			pagecount: 20, //總頁數
			buttonClickCallback: pageClick, 
			first:"", 
			prevGroup:'<li class="btn-arrow btn-arrowleft"><a class="pgNext" href="javascript:;">左箭頭</a></li>', 
			prev:"", 
			next:"", 
			nextGroup:'<li class="btn-arrow btn-arrowright"><a class="pgNext" href="javascript:;">右箭頭</a></li>', 
			last:"", 
			pagegroup:20 //顯示幾頁
		};
	var _ajax_obj = {
			ajaxType:'producta-list',
			theme:'A',
			type3:getQueryVariable("type3"),
			id:getQueryVariable("id"),
			number_s:0,
			number_e:0,
			//items:5,
			page:1
		};
function pageClick(pageclickednumber) {
    //alert(pageclickednumber);
	
	_page_obj.pagenumber=pageclickednumber;
	
	
	_ajax_obj.pageName = pageName;
	_ajax_obj.page = _page_obj.pagenumber;
	_ajax_obj.id = '';
	ajax_product(_ajax_obj);
}
function ajax_product(obj){
	//ajax 
	$.ajax({
		url: 'http://w3.sunten.com.tw/actions/product-typea.php',
		cache: false,
		dataType: 'json',
		type:'POST',
		data: obj,
		success: function(response) {
				console.log(response);
				
				if(response['result']){
					setListData(response);
				}else{
					alert(response['msg']);
					if(response['url']){
						//top.location.href = response['url'];
					}
					_page_loading.hide();
				}
				//_page_loading.hide();
			},
		error:function(){
			alert("error ajax");
			_page_loading.hide();
		}
	});
	
}
}
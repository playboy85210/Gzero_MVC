// VGO Ajax v3.0
// Date: 2010/02/20
// Created by Patrick Fan-Chiang
// Company: ECOMMAX TECH CORP
function requestXmlPOST3(phpcall, mParam, spanID, mForm, mEffect) {
	switch(mEffect) {
		case 1:
			$(spanID).fadeOut('normal', function() {
				$.ajax({
					type: "POST",
					url: phpcall+'?'+mParam,
					data: $(mForm).serialize(),
					dataType: 'xml',
					cache: false,
					success: function(msg){
						$(msg).find('ajaxdata').each(function() {
							var $entry = $(this);
							var mSpanID = $entry.find('spanid').text();
							var mContentHtml  = $("rtntext", $entry).text();
			
							switch(mSpanID) {
								case 'javascript':
									eval(mContentHtml);
									break;
								default:
									$(mSpanID).html(mContentHtml);
									$(mSpanID).fadeIn('normal');
									break;
							}
						});
					}
				});
			});
			break;
		case 2:
			$(spanID).slideUp('normal', function() {
				$.ajax({
					type: "POST",
					url: phpcall+'?'+mParam,
					data: $(mForm).serialize(),
					dataType: 'xml',
					cache: false,
					success: function(msg){
						$(msg).find('ajaxdata').each(function() {
							var $entry = $(this);
							var mSpanID = $entry.find('spanid').text();
							var mContentHtml  = $("rtntext", $entry).text();
			
							switch(mSpanID) {
								case 'javascript':
									eval(mContentHtml);
									break;
								default:
									$(mSpanID).html(mContentHtml);
									$(mSpanID).slideDown('slow');
									break;
							}
						});
					}
				});
			});
			break;
		case 98:
			// make a mask for waiting
			var obj_pos = $(spanID).position();
			var totalWidth = $(spanID).width();
			var totalHeight = $(spanID).height();
			var imgPosHeight = $(window).height();
			
			totalWidth += parseInt($(spanID).css("padding-left"), 10) + parseInt($(spanID).css("padding-right"), 10); //Total Padding Width
			totalWidth += parseInt($(spanID).css("margin-left"), 10) + parseInt($(spanID).css("margin-right"), 10); //Total Margin Width
			totalWidth += parseInt($(spanID).css("borderLeftWidth"), 10) + parseInt($(spanID).css("borderRightWidth"), 10); //Total Border Width			
			totalHeight += parseInt($(spanID).css("padding-top"), 10) + parseInt($(spanID).css("padding-bottom"), 10); //Total Padding Width
			totalHeight += parseInt($(spanID).css("margin-top"), 10) + parseInt($(spanID).css("margin-bottom"), 10); //Total Margin Width
			totalHeight += parseInt($(spanID).css("borderTopWidth"), 10) + parseInt($(spanID).css("borderBottomWidth"), 10); //Total Border Width			
			
			if(totalHeight < imgPosHeight) imgPosHeight = totalHeight;
			
			$('#mask_screen').css({ 'opacity': 0.7, 'width':totalWidth,'height':totalHeight, 'z-index':99999, 'top':obj_pos.top, 'left':obj_pos.left }).show();
			$('#mask_screen img').css({ 'top': (imgPosHeight/2), 'left': (totalWidth/2) });
			
			$.ajax({
				type: "POST",
				url: phpcall+'?'+mParam,
				data: $(mForm).serialize(),
				dataType: 'xml',
				success: function(msg){
					$(msg).find('ajaxdata').each(function() {
						var $entry = $(this);
						var mSpanID = $entry.find('spanid').text();
						var mContentHtml  = $("rtntext", $entry).text();
		
						switch(mSpanID) {
							case 'javascript':
								eval(mContentHtml);
								break;
							default:
								$(mSpanID).html(mContentHtml);
								break;
						}
					});
					$('#mask_screen').hide();
				}
			});
			break;
		case 99:
			$(spanID).html('<img src="../images/loading.gif" class="temp-waiting">');
			$.ajax({
				type: "POST",
				url: phpcall+'?'+mParam,
				data: $(mForm).serialize(),
				dataType: 'xml',
				success: function(msg){
					$(msg).find('ajaxdata').each(function() {
						var $entry = $(this);
						var mSpanID = $entry.find('spanid').text();
						var mContentHtml  = $("rtntext", $entry).text();
		
						switch(mSpanID) {
							case 'javascript':
								eval(mContentHtml);
								break;
							default:
								$(mSpanID).html(mContentHtml);
								break;
						}
					});
				}
			});
			break;
		default:
			$.ajax({
				type: "POST",
				url: phpcall+'?'+mParam,
				data: $(mForm).serialize(),
				dataType: 'xml',
				cache: false,
				success: function(msg){
					$(msg).find('ajaxdata').each(function() {
						var $entry = $(this);
						var mSpanID = $entry.find('spanid').text();
						var mContentHtml  = $("rtntext", $entry).text();
		
						switch(mSpanID) {
							case 'javascript':
								eval(mContentHtml);
								break;
							default:
		//						alert("test");
								$(mSpanID).html(mContentHtml);
								break;
						}
					});
				}
			});	
			break;
	}

	return false;
}



function requestXmlGET3(phpcall, mParam, spanID, mForm, mEffect) {
	switch(mEffect) {
		case 1:
			$(spanID).fadeOut('normal', function() {
				$.ajax({
					type: "GET",
					url: phpcall,
					data: mParam,
					dataType: 'xml',
					success: function(msg){
						$(msg).find('ajaxdata').each(function() {
							var $entry = $(this);
							var mSpanID = $entry.find('spanid').text();
							var mContentHtml  = $("rtntext", $entry).text();
			
							switch(mSpanID) {
								case 'javascript':
									eval(mContentHtml);
									break;
								default:
									$(mSpanID).html(mContentHtml).fadeIn('normal');
									break;
							}
						});
					}
				});
			});
			break;
		case 2:
			$(spanID).slideUp('normal', function() {
				$.ajax({
					type: "GET",
					url: phpcall,
					data: mParam,
					dataType: 'xml',
					success: function(msg){
						$(msg).find('ajaxdata').each(function() {
							var $entry = $(this);
							var mSpanID = $entry.find('spanid').text();
							var mContentHtml  = $("rtntext", $entry).text();
			
							switch(mSpanID) {
								case 'javascript':
									eval(mContentHtml);
									break;
								default:
									$(mSpanID).html(mContentHtml);
									$(mSpanID).slideDown('slow');
									break;
							}
						});
					}
				});
			});
			break;
		case 3:
			// slide right
//			$(spanID).hide('slide', {direction: 'right'}, 1000, function() {
				$.ajax({
					type: "GET",
					url: phpcall,
					data: mParam,
					dataType: 'xml',
					success: function(msg){
						$(msg).find('ajaxdata').each(function() {
							var $entry = $(this);
							var mSpanID = $entry.find('spanid').text();
							var mEffect = $entry.find('effect').text();
							var mContentHtml  = $("rtntext", $entry).text();
			
							switch(mSpanID) {
								case 'javascript':
									eval(mContentHtml);
									break;
								default:
									if(mEffect == 9) {
										$(mSpanID).html(mContentHtml);
									}else {
										$(mSpanID).hide('slide', {direction: 'right'}, 250, function() {
											$(mSpanID).html(mContentHtml);
										});
										$(mSpanID).show('slide', {direction: 'left'}, 1000);
									}
									break;
							}
						});
					}
				});
//			});
			break;
		case 4:
			// slide left
//			$(spanID).hide('slide', {direction: 'right'}, 1000, function() {
				$.ajax({
					type: "GET",
					url: phpcall,
					data: mParam,
					dataType: 'xml',
					success: function(msg){
						$(msg).find('ajaxdata').each(function() {
							var $entry = $(this);
							var mSpanID = $entry.find('spanid').text();
							var mEffect = $entry.find('effect').text();
							var mContentHtml  = $("rtntext", $entry).text();
			
							switch(mSpanID) {
								case 'javascript':
									eval(mContentHtml);
									break;
								default:
									if(mEffect == 9) {
										$(mSpanID).html(mContentHtml);
									}else {
										$(mSpanID).hide('slide', {direction: 'left'}, 250, function() {
											$(mSpanID).html(mContentHtml);
										});
										$(mSpanID).show('slide', {direction: 'right'}, 1000);
									}
									break;
							}
						});
					}
				});
//			});
			break;
		case 98:
			// make a mask for waiting
			var obj_pos = $(spanID).position();
			var totalWidth = $(spanID).width();
			var totalHeight = $(spanID).height();
			var imgPosHeight = $(window).height();
			
			totalWidth += parseInt($(spanID).css("padding-left"), 10) + parseInt($(spanID).css("padding-right"), 10); //Total Padding Width
			totalWidth += parseInt($(spanID).css("margin-left"), 10) + parseInt($(spanID).css("margin-right"), 10); //Total Margin Width
			totalWidth += parseInt($(spanID).css("borderLeftWidth"), 10) + parseInt($(spanID).css("borderRightWidth"), 10); //Total Border Width			
			totalHeight += parseInt($(spanID).css("padding-top"), 10) + parseInt($(spanID).css("padding-bottom"), 10); //Total Padding Width
			totalHeight += parseInt($(spanID).css("margin-top"), 10) + parseInt($(spanID).css("margin-bottom"), 10); //Total Margin Width
			totalHeight += parseInt($(spanID).css("borderTopWidth"), 10) + parseInt($(spanID).css("borderBottomWidth"), 10); //Total Border Width			
			
			if(totalHeight < imgPosHeight) imgPosHeight = totalHeight;
			
			$('#mask_screen').css({ 'opacity': 0.7, 'width':totalWidth,'height':totalHeight, 'z-index':99999, 'top':obj_pos.top, 'left':obj_pos.left }).show();
			$('#mask_screen img').css({ 'top': (imgPosHeight/2), 'left': (totalWidth/2) });


			$.ajax({
				type: "GET",
				url: phpcall,
				data: mParam,
				dataType: 'xml',
				success: function(msg){
					$(msg).find('ajaxdata').each(function() {
						var $entry = $(this);
						var mSpanID = $entry.find('spanid').text();
						var mContentHtml  = $("rtntext", $entry).text();
		
						switch(mSpanID) {
							case 'javascript':
								eval(mContentHtml);
								break;
							default:
								$(mSpanID).html(mContentHtml);
								break;
						}
					});
					$('#mask_screen').hide();
				}
			});
			
			break;
		case 99:
			$(spanID).html('<img src="../images/loading.gif" class="temp-waiting">');
			$.ajax({
				type: "GET",
				url: phpcall,
				data: mParam,
				dataType: 'xml',
				success: function(msg){
					$(msg).find('ajaxdata').each(function() {
						var $entry = $(this);
						var mSpanID = $entry.find('spanid').text();
						var mContentHtml  = $("rtntext", $entry).text();
		
						switch(mSpanID) {
							case 'javascript':
								eval(mContentHtml);
								break;
							default:
								$(mSpanID).html(mContentHtml);
								break;
						}
					});
				}
			});
			break;
		default:
			$.ajax({
				type: "GET",
				url: phpcall+"?"+mParam,
				data: $(mForm).serialize(),
				dataType: 'xml',
				success: function(msg){
					$(msg).find('ajaxdata').each(function() {
						var $entry = $(this);
						var mSpanID = $entry.find('spanid').text();
						var mContentHtml  = $("rtntext", $entry).text();
		
						switch(mSpanID) {
							case 'javascript':
								eval(mContentHtml);
								break;
							default:
								$(mSpanID).html(mContentHtml);
								break;
						}
					});
				}
			});
			break;
	}

	return false;
}
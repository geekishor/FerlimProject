var detailPageObject = {
		goToAddImage : function() {		
			var isSelected = localStorage.getItem("legSelected");
			var horseName = $('#horseName').val();
			
			if (horseName.trim().length <= 0) {
				alert('Veuillez indiquer le nom du cheval.');
				return;
			}else{
				localStorage.setItem('horseName',horseName);
			}			
				
			if (isSelected.length > 0) {
				$('#horseName').blur();
				setTimeout(function(){
					$.mobile.changePage("#imagePage", {
						transition : "none"
					});
				},500);			
			
			}else{
				alert('Veuillez sélectionner au moins une option.');
			}
		}
}

$(function() { 

	document.addEventListener('deviceready', function(){ }, false);
	
	localStorage.setItem("legSelected", "");
	localStorage.setItem('horseName',"");
  	$('.addCheck').click(function(){    		
		var objId = $(this).attr('id'); 
		$('.addCheck img').attr('src','');
		$('#'+ objId +' img').attr('src','images/check_mark.png');
		localStorage.setItem("legSelected", objId);
	});
  	
  	
	$('#imagePage').on('pageshow',function(){
		var horse = localStorage.getItem('horseName');
		if(horse.trim().length > 0){
			$('#label-horse').text(horse);
		}
		$('#globalComment').css('width', '80px !important');
	});
});


$(document).on("pageshow",function(){
	
    var screen = $.mobile.getScreenHeight();
	var content = screen - 53;
	
	if($(".ui-page-active").attr("id") == 'page'){
		content = screen - 50  - $('#header').outerHeight() - 30;
	}

	$(".ui-content").height(content + 'px');
	
  	
});
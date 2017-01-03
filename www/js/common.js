var commonObj = {	
	$selectedLeg : ''
}


$(document).on("pageshow", function() {
	
	setTimeout(function(){
		var screen = $(window).innerHeight();
		
		var content = screen - 53;

		if ($(".ui-page-active").attr("id") == 'page' || $(".ui-page-active").attr("id") == 'signUpPage') {
			content = screen - 50 - $('#header').outerHeight() - 30;
		}

		$(".ui-content").css('height',content + 'px');

		hideLoading();
	},300);

});

function showLoading(text){
	$('.modal').css('display','block');
	if(text){
		$('#loadingText').text(text);
	}else{
		$('#loadingText').text('Chargement...');
	}
}

function hideLoading(){
	$('.modal').css('display','none');
}

function onBackKeyPress() {

	if ($(".ui-page-active").attr("id") == 'page') {
		indexObject.appExit();
	} else if ($(".ui-page-active").attr("id") == 'equipmentPage') {
		equipmentPageObject.logout();
	} else {
		window.history.back();
	}

}

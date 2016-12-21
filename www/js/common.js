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
	},200);

});

function showLoading(text){
	$('.modal').css('display','block');
	if(text){
		$('#loadingText').text(text);
	}else{
		$('#loadingText').text('Loading...');
	}
}

function hideLoading(){
	$('.modal').css('display','none');
}

function onBackKeyPress() {

	if ($(".ui-page-active").attr("id") == 'page') {
		indexObject.appExit();
	} else if ($(".ui-page-active").attr("id") == 'detailPage') {
		detailPageObject.logout();
	} else {
		window.history.back();
	}

}

var indexObject = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    
    onDeviceReady: function() {
    	userName = "";
    	password = "";
    },
    
    validate: function () {
        userName = $.trim($("#txtUserName").val().toLowerCase());
        if (userName == "") {
            alert("Veuillez saisir un nom d'utilisateur.");
            return;
        }
        password = $("#txtPassword").val();
        if (password == "") {
            alert("Veuillez saisir un mot de passe.");
            return;
        }
		setLocalStorage("userName", userName); 
		setLocalStorage("password", password);  
		//indexObject.authenticate();
    },
    
    authenticate: function(){
    	$.mobile.changePage("#imagePage",{
    		transistion: "none"
    	})
    },
	showPopUp: function(){
		var height = $(window).height() - 400 + "px";
		var width = $(window).width()  - 80 + "px";
		$( "#popupLogin" ).popup( "open" );
		$(".popupLogin").css('width', width);
		indexObject.resizePopup();
	},	
	closePopUp: function(){
		$( "#popupLogin" ).popup( "close" );
	},
	resizePopup: function() {
	
		setTimeout(function(){
			if($('.ui-page-active .ui-popup-active .ui-popup').hasClass("fullScreenPopup")){
				$('.ui-page-active .ui-popup-active .popupContent').css("width", $(window).width() - 40 + "px");
			    var heightToSubtract = $("#popupHeader").height() +  $(".popupFooter").height();
			    var contentHeight = $(window).height() - heightToSubtract;
		    	$('.ui-page-active .ui-popup-active .popupContent').css("height", contentHeight + "px");
			} else if (!$('.ui-page-active .ui-popup-active .ui-popup').hasClass("ignoreDimension")){
		    	$('.ui-page-active .ui-popup-active .popupContent').css("width", $(window).width() * 0.8 + "px");
		    	$('.ui-page-active .ui-popup-active #changePasswordContent').css("width", "auto");
		    	$('.changePassContent').css("width", $(window).width() * 0.8 + "px");
			    var heightToSubtract = $("#popupHeader").height() +  $(".popupFooter").height();
			    var contentHeight = $(window).height() * 0.7 - heightToSubtract;
		    	$('.ui-page-active .ui-popup-active .popupContent').css("max-height", contentHeight + "px");
		    	$('.ui-page-active .ui-popup-active #changePasswordContent').css("max-height", ($(window).height() * 0.9 - 100) + "px");
		    	$('.changePassContent').css("max-height", ($(window).height() * 0.9 - 100) + "px");
		    	var height = contentHeight - 70 + "px";
                $("#datasetDialogContent").css("max-height", height);
                $(".dialogDomainLogo").css("max-width", $(window).width() * 0.7 + "px");
		    }			
		    var popupWidth = $('.ui-page-active .ui-popup-active').width();
		    $("#changePasswordForm").css("width",($("#changePassword").width()-25)+"px");
		    var popupHeight = $('.ui-page-active .ui-popup-active').height();		    
		    var left = ($(window).width() - popupWidth)/2;
		    var top = ($(window).height() - popupHeight)/2;
		    $('.ui-page-active .ui-popup-active').css("position","fixed");
		    $('.ui-page-active .ui-popup-active').css({"left":left+"px","top":top+"px"});
		    
		}, 100);
	
}
};

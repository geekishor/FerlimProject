var indexObject = {
	// Application Constructor
	initialize : function() {
		document.addEventListener('deviceready', this.onDeviceReady.bind(this),
				false);
	},

	onDeviceReady : function() {
		userName = "";
		password = "";

		window.addEventListener('native.keyboardshow', function(e) {
			setTimeout(function() {
				document.activeElement.scrollIntoViewIfNeeded();
			}, 100);
		});

	},

	validate : function() {
		var username = $.trim($("#txtUserName").val().toLowerCase());
		if (username == "") {
			alert("Veuillez saisir un nom d'utilisateur.");
			return;
		}
		var password = $("#txtPassword").val();
		if (password == "") {
			alert("Veuillez saisir un mot de passe.");
			return;
		}
		
		/*
		 * setLocalStorage("userName", userName);
		 * setLocalStorage("password", password);
		*/
		
		indexObject.authenticate(username,password);
	},

	authenticate : function(username,password) {
		showLoading('Authenticating...');
		var data = {
			action : "login",
			email: username,
			password: password
		};
				
		httpServiceObj.post(data,'customer.php', function(result) {			
			if(result.response == "success") {
				$.mobile.changePage("#detailPage", {
					transition : "fade"
				});
			}else{				
				alert("Invalid username or password.");
				hideLoading();
			}
		}, function(e) {
			hideLoading();
			console.log(e);
		});
	},
	
	signUp: function(){
    	$.mobile.changePage("#signUpPage",{
    		transition: "fade"
    	})
    }      
        
};

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
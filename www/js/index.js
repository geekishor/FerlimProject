var indexObject = {
	initialize : function() {
		document.addEventListener('deviceready', this.onDeviceReady.bind(this),
				false);
	},

	onDeviceReady : function() {
		
		document.addEventListener("backbutton", onBackKeyPress, false);
		window.addEventListener('native.keyboardshow', function(e) {
			setTimeout(function() {
				document.activeElement.scrollIntoViewIfNeeded();
			}, 100);
		});

		$(function(){		
			if(localStorage.getItem('$email') && localStorage.getItem('$email').length > 0 ){
				$.mobile.changePage("#equipmentPage", {
					transition : "none"
				});
			}
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

		indexObject.authenticate(username, password);
	},

	authenticate : function(username, password) {
		$('.addCheck img').attr('src', '');	
	
		showLoading('Authentification...');
		var data = {
			action : "login",
			email : username,
			password : password
		};

		httpServiceObj.post(data, 'customer.php', function(result) {
			if (result.response == "success") {
				indexObject.saveLoginInfo(result.data);			
			} else {
				alert("Adresse email ou mot de passe incorrect.");
				hideLoading();
			}
		}, function(e) {
			hideLoading();
			console.log(e);
		});
	},

	saveLoginInfo : function(info) {
	
		if($('#rememberMe').is(':checked')){
			localStorage.setItem('$email',$("#txtUserName").val());
			localStorage.setItem('$password',$("#txtPassword").val());
		}else{
			
			localStorage.clear();
		}
		
		localStorage.setItem('$userId', info.id);
		localStorage.setItem('$token', info.session_token);
		
		$.mobile.changePage("#equipmentPage", {
			transition : "none"
		});
	},

	signUp : function() {
		$.mobile.changePage("#signUpPage", {
			transition : "none"
		})
	},
	
	appExit : function(){
		var rs = confirm("Êtes-vous sûr de vouloir quitter?");
		if (rs == true) {
			navigator.app.exitApp();
		}
	}
};

$(function(){	
	$('#page').on('pagebeforeshow',function(){
		if(!localStorage.getItem('$token')){
			$("#rememberMe").prop("checked", false).checkboxradio('refresh');
		}
	});
	
});


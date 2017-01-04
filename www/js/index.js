var indexObject = {
	initialize : function() {
		document.addEventListener('deviceready', this.onDeviceReady.bind(this),
				false);
	},

	onDeviceReady : function() {
		$(function(){		
			if(localStorage.getItem('$token') && localStorage.getItem('$token').length > 0 ){
				$('#txtUserName').val(localStorage.getItem('$email'));
				$('#txtPassword').val(localStorage.getItem('$password'));
				$("#rememberMe").prop("checked", true).checkboxradio('refresh');
			}
		});
		document.addEventListener("backbutton", onBackKeyPress, false);
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

		indexObject.authenticate(username, password);
	},

	authenticate : function(username, password) {
		$('.addCheck img').attr('src', '');	
		
		if($('#rememberMe').val() != "on"){
			localStorage.clear();
		}
		
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
		localStorage.setItem('$email',$("#txtUserName").val());
		localStorage.setItem('$password',$("#txtPassword").val());
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


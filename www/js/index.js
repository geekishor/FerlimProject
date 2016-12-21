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
		localStorage.clear();
		showLoading('Authenticating...');
		var data = {
			action : "login",
			email : username,
			password : password
		};

		httpServiceObj.post(data, 'customer.php', function(result) {
			if (result.response == "success") {
				indexObject.saveLoginInfo(result.data);
				$.mobile.changePage("#detailPage", {
					transition : "none"
				});
			} else {
				alert("Invalid username or password.");
				hideLoading();
			}
		}, function(e) {
			hideLoading();
			console.log(e);
		});
	},

	saveLoginInfo : function(info) {
		localStorage.setItem('$userId', info.id);
		localStorage.setItem('$token', info.session_token);
	},

	signUp : function() {
		$.mobile.changePage("#signUpPage", {
			transition : "none"
		})
	},
	
	appExit : function(){
		var rs = confirm("Are you sure you want to exit ?");
		if (rs == true) {
			navigator.app.exitApp();
		}
	}
};


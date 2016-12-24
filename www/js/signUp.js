var signUpObject = {
	initSignUpForm : function() {
		$("#signUpForm").trigger("reset");
		$("#signUpForm").submit(function(e) {
			e.preventDefault();
			signUpObject.signUpAuthenticate();
			return false;
		});
	},
	signUpAuthenticate : function() {
		showLoading('Registering...');
		var firstNameVal = $.trim($("#txtFirstName").val());
		var lastNameVal = $.trim($("#txtLastName").val());
		var emailVal = $("#txtEmail").val();
		var passwordVal = $("#txtPasswordSignUp").val();
		var phoneVal = $("#txtPhone").val();

		var data = {
			action : "create",
			firstname : firstNameVal,
			lastname : lastNameVal,
			email : emailVal,
			password : passwordVal,
			phone : phoneVal
		};

		httpServiceObj.post(data, 'customer.php', function(result) {
			if (result.response == "success") {
				$("#signUpForm").trigger("reset");
				alert("Vous êtes inscrit avec succés.");
				$.mobile.changePage("#page", {
					transition : "none"
				});
			} else {
				alert("Une erreur est survenue. Veuillez réessayer ultérieuement!");
				hideLoading();
			}
		}, function(error) {
			console.log(error);
		});

	},

	backToLogin : function() {
		$.mobile.changePage("#page", {
			transition : "none"
		});
	}
}

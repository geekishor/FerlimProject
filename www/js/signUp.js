var signUpObject = {
	initSignUpForm : function(){
		$("#signUpForm").trigger("reset");
		$("#signUpForm").submit(function (e) {
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
			if(result.response == "success") {
				$("#signUpForm").trigger("reset");
				alert("Registration complete.");
				$.mobile.changePage("#page", {
					transition : "none"
				});
			}else{				
				alert("Error occured.");
				hideLoading();
			}
		}, function(error) {
			alert(error);
		});

	}
}



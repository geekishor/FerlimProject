var signUpObject = {

	signUpAuthenticate : function() {

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

		httpServiceObj.post(data, 'customer.php', function(response) {
			alert(JSON.stringify(response));
		}, function(error) {
			alert(error);
		});

	}
}

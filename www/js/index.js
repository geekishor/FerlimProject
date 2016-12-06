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
            alert("Veuillez saisir un nom d'utilisateur.);
            return;
        }
        password = $("#txtPassword").val();
        if (password == "") {
            alert("Veuillez saisir un mot de passe.");
            return;
        }
		setLocalStorage("userName", userName);  
		indexObject.authenticate();
    },
    
    authenticate: function(){
    	//webservice call
    }
};

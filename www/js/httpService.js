var url = "https://ferlim-app.fr/api/";
var httpServiceObj = {
	post : function(dataObj, type, successCallBack, errorCallBack) {
		var formData = new FormData();

		for ( var key in dataObj) {
			formData.append(key, dataObj[key]);
		}

		$.ajax({
			type : "POST",
			url : url + type,
			processData : false,
			contentType : false,
			data : formData,
			cache : false,
			success : function(response) {
				successCallBack(response);
			},
			error : function(e) {
				errorCallBack(JSON.stringify(e));
			}
		});
	}

}
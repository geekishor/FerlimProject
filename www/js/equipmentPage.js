var equipmentPageObject = {
	
	logout : function() {
		var rs = confirm("Vous êtes sûr de vouloir se déconnecter?");
		if (rs) {
			showLoading('Logging out...');
			var data = {
				action : "logout",
				id : localStorage.getItem('$userId'),
				session_token : localStorage.getItem('$token')
			};

			httpServiceObj.post(data, 'customer.php', function(result) {
				if (result.response == "success") {
					localStorage.clear();
					$("input").val('');
					$.mobile.changePage("#page", {
						transition : "none"
					});
				} else {
					alert("Une erreur est survenue. Veuillez réessayer ultérieuement!");
					hideLoading();
				}
			}, function(e) {
				hideLoading();
				console.log(e);
			});
		}
	}
}


$(document).ready(function() {
    $('input:radio').change(function() {
	   if ($(this).val() == 'New') {
	    	$('#horseNameBlock').show();
	    	$('#selectHorse').hide();
	    } else if ($(this).val() == 'Old') {
	      	$('#horseNameBlock').hide();
	      	$('#selectHorse').show();
	    } 
    });
    
    $('#nextBtn').click(function(){
    	$.mobile.changePage("#detailPage", {
			transition : "none"
		});
    });
});
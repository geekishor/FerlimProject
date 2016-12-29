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
    	var type = $('input:radio:checked').val();
    	if(type == 'New'){
    		var horseName = $('#horseName').val();
    		if (horseName.trim().length <= 0) {
    			alert('Veuillez indiquer le nom du cheval.');
    			return;
    		} else {
    			localStorage.setItem('$horseName', horseName);
    			$.mobile.changePage("#detailPage", {
    				transition : "none"
    			});
    		}
    	}else{
    		var selectedHorse = $("#selectHorseBox").val();
    		if(selectedHorse.trim().length <= 0){
    			alert('Please select a horse.');
    			return;
    		}else{
    			localStorage.setItem('$horseName', selectedHorse);
    			$.mobile.changePage("#detailPage", {
    				transition : "none"
    			});
    		}
    	}
    	
    
    });
});
var equipmentPageObject = {
	
	logout : function() {
		var rs = confirm("Vous êtes sûr de vouloir se déconnecter?");
		if (rs) {
			showLoading('Déconnexion...');
			var data = {
				action : "logout",
				id : localStorage.getItem('$userId'),
				session_token : localStorage.getItem('$token')
			};

			httpServiceObj.post(data, 'customer.php', function(result) {
				if (result.response == "success") {
					localStorage.clear();
					$("#txtUserName").val('');
					$("#txtPassword").val('');
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
    			localStorage.setItem('$horseId', '');
    			localStorage.setItem('$horseName', horseName);
    			$.mobile.changePage("#detailPage", {
    				transition : "none"
    			});
    		}
    	}else{
    		var selectedHorseId = $("#selectHorseBox").val();
    		var selectedHorseName = $("#selectHorseBox option:selected").text();
    		if(selectedHorseId.trim().length <= 0){
    			alert('Veuillez choisir un cheval.');
    			return;
    		}else{
    			localStorage.setItem('$horseName', selectedHorseName);
    			localStorage.setItem('$horseId', selectedHorseId);
    			$.mobile.changePage("#detailPage", {
    				transition : "none"
    			});
    		}
    	}       
    });
    
    
    $('#equipmentPage').on('pagebeforeshow', function() {	    
    	showLoading();
		var data = {
			action : "display",
			idcustomer : localStorage.getItem('$userId'),
			session_token : localStorage.getItem('$token')
		};
		
		httpServiceObj.post(data, 'horse.php', function(result) {
			if (result.response == "success") {
				$('#selectHorseBox').empty();
				var options = '<option value="" selected>Sélectionner</option>';
				for(r in result.data){
					options += '<option value="'+result.data[r].id+'">'+ result.data[r].name + '</option>';
				}	
				$('#selectHorseBox').append(options);
				$('#selectHorseBox').selectmenu('refresh');
			} else {				
				hideLoading();
			}
		}, function(e) {
			hideLoading();
			console.log(e);
		});
		
		
	});
});

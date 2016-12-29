var detailPageObject = {
	goToAddImage : function() {
		var horseName = $('#horseName').val();
		var isSelected = commonObj.$selectedLeg;
		var userId = localStorage.getItem('$userId');
		var token = localStorage.getItem('$token');

		if (horseName.trim().length <= 0) {
			alert('Veuillez indiquer le nom du cheval.');
			return;
		} else {
			localStorage.setItem('$horseName', horseName);
		}

		if (isSelected.length > 0) {
			$('#horseName').blur();
			showLoading();

			$.mobile.changePage("#imagePage", {
				transition : "none",
			});

		} else {
			alert('Veuillez sélectionner au moins une option.');
		}
	},
	backToEquipment: function(){
		$.mobile.changePage("#equipmentPage", {
			transition : "none"
		});
	}
}

$(function() {

	$('.addCheck').click(function() {
		var objId = $(this).attr('id');
		$('.addCheck img').attr('src', '');
		$('#' + objId + ' img').attr('src', 'images/check_mark.png');
		var legName = $(this).text().trim();
		commonObj.$selectedLeg = legName;
	});
		
	$('#detailPage').on('pageshow',function(){
		var horseName = localStorage.getItem('$horseName');		
		if(horseName != ''){
			setTimeout(function(){
				$('#detailPage #horseName').val(horseName);
			},200);
		}
	});
});




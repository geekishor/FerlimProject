var imagePageObject = {
	imageSource : '',

	openCamera : function() {
		$("#popupLogin").popup("close");
		navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
			quality : 50,
			destinationType : Camera.DestinationType.DATA_URL
		});
	},
	openGallery : function() {
		$("#popupLogin").popup("close");
		var destinationType = navigator.camera.DestinationType;
		
		navigator.camera.getPicture(onPhotoDataSuccess, function(error) {
			alert(error);
		}, {
			quality : 50,
			destinationType : destinationType.DATA_URL,
			sourceType : 0
		});
	},
	showPopUp : function(obj) {
		var height = $(window).height() - 400 + "px";
		var width = $(window).width() - 80 + "px";
		$("#popupLogin").popup("open");
		$(".popupLogin").css('width', width);
		indexObject.photoId = $(obj).attr('id');
	},
	closePopUp : function() {
		$("#popupLogin").popup("close");
	},

	deleteImage : function(obj) {
		var rs = confirm("Are you sure you want to remove image?");
		if (rs == true) {
			var deleteImageId = $(obj).prev().attr('id');
			var filename = deleteImageId + ".jpg";
			deleteImageFile(filename, deleteImageId);
		}

	},

	submitForm : function() {
		var rs = confirm("Are you sure you want to submit?");
		if (rs == true) {
			var formData = {};
			
			
			formData.photoOne = $('#photoOne').attr('src');
			formData.photoTwo = $('#photoTwo').attr('src');
			formData.photoThree = $('#photoThree').attr('src');
			formData.photoFour = $('#photoFour').attr('src');
			
			formData.photoOne = (formData.photoOne == 'images/images.png') ? '' : formData.photoOne;
			formData.photoTwo = (formData.photoTwo == 'images/images.png') ? '' : formData.photoTwo;
			formData.photoThree = (formData.photoThree == 'images/images.png') ? '' : formData.photoThree;
			formData.photoFour = (formData.photoFour == 'images/images.png') ? '' : formData.photoFour;

			formData.photoCommentOne = $('#photoCommentOne').val();
			formData.photoCommentTwo = $('#photoCommentTwo').val();
			formData.photoCommentThree = $('#photoCommentThree').val();
			formData.photoCommentFour = $('#photoCommentFour').val();

			formData.globalComment = $('#globalComment').val();

			var count = 0;
			for (var property in formData) {
			    if (formData.hasOwnProperty(property)) {
			    	 if(formData[property].length > 0){
			    		 count++;
			    	 }
			    }
			}
			if(count > 0){
				imagePageObject.pushHorseFormData(formData);
			}else{
				alert('Please fill at least one field.');
			}
			
		}
	},

	pushHorseFormData : function(formData) {
		showLoading('Submitting...');
		
		var data = {
			action : "create",
			name : localStorage.getItem('$horseName'),
			idcustomer : localStorage.getItem('$userId'), 
			session_token :localStorage.getItem('$token')
		};
		var currentHorseName = localStorage.getItem('$horseName');
		var oldHorseName = localStorage.getItem('$oldHorseName');
		if( currentHorseName != oldHorseName ){
			httpServiceObj.post(data, 'horse.php', function(result) {
				if (result.response == "success") {
					localStorage.setItem('$horseId', result.data.id);
					imagePageObject.pushFormData(formData);
				} else {
					alert("Error occured.");
					hideLoading();
				}
			}, function(e) {
				hideLoading();
				console.log(e);
			});
		}else{
			imagePageObject.pushFormData(formData);
		}

	},
	pushFormData : function(formData) {
		var data = {
			action : "create",
			name : commonObj.$selectedLeg,
			idhorse : localStorage.getItem('$horseId'),
			idcustomer : localStorage.getItem('$userId'),			
			photo1 : formData.photoOne,
			photo2 : formData.photoTwo,
			photo3 : formData.photoThree,
			photo4 : formData.photoFour,
			commentaire1 : formData.photoCommentOne,
			commentaire2 : formData.photoCommentTwo,
			commentaire3 : formData.photoCommentThree,
			commentaire4 : formData.photoCommentFour,
			commentaire_global : formData.globalComment,
			session_token : localStorage.getItem('$token')
		};
		
		httpServiceObj.post(data, 'paw.php', function(result) {
			if (result.response == "success") {				
				alert("Demande bien envoyée.");			
				var horseName = localStorage.getItem('$horseName');
				localStorage.setItem('$oldHorseName',horseName);
				$.mobile.changePage("#detailPage", {
					transition : "none"					
				});					
				location.reload();
			} else {
				alert("Error occured while saving form.");
				hideLoading();
			}
		}, function(e) {
			hideLoading();
			console.log(e);
		});
	}

}

$(function() {
	$('#imagePage').on('pageshow', function() {
	    
		var horse = localStorage.getItem('$horseName');
		if (horse.trim().length > 0) {
			$('#label-horse').text(horse);
		}
		
		
	});
});

function onPhotoDataSuccess(imageData) {
	var smallImage = $('#' + indexObject.photoId);
	var imgHeight = screen.height - 200 + 'px';
	var imgWidth = screen.width - 30 + 'px';
	smallImage.attr('height', imgHeight);
	smallImage.attr('width', imgWidth);
	smallImage.attr('src', '');
	smallImage.attr('src', 'data:image/jpeg;base64,' + imageData);
	smallImage.next().css("display", "block");
	var folderpath = "file:///storage/emulated/0/";
	folderpath = cordova.file.dataDirectory;

	var filename = indexObject.photoId + ".jpg";
	var dataType = "image/jpeg";
	savebase64AsImageFile(folderpath, filename, imageData, dataType);
}

function onFail(message) {
	alert('Impossible de charger l\'image, car: ' + message);
}

function b64toBlob(b64Data, contentType, sliceSize) {
	contentType = contentType || '';
	sliceSize = sliceSize || 512;

	var byteCharacters = atob(b64Data);
	var byteArrays = [];

	for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
		var slice = byteCharacters.slice(offset, offset + sliceSize);

		var byteNumbers = new Array(slice.length);
		for (var i = 0; i < slice.length; i++) {
			byteNumbers[i] = slice.charCodeAt(i);
		}

		var byteArray = new Uint8Array(byteNumbers);

		byteArrays.push(byteArray);
	}

	var blob = new Blob(byteArrays, {
		type : contentType
	});
	return blob;
}

function savebase64AsImageFile(folderpath, filename, content, contentType) {
	// Convert the base64 string in a Blob
	var DataBlob = b64toBlob(content, contentType);
	console.log("Starting to write the file :3");
	window.requestFileSystem(LocalFileSystem.PERSISTENT,0,function(dir) {console
								.log("Access to the directory granted succesfully");
						dir.root
								.getDirectory(
										'Ferlim',
										{
											create : true
										},
										function(dirEntry) {
											dirEntry
													.getDirectory(
															'Photos',
															{
																create : true
															},
															function(subDir) {
																subDir
																		.getFile(
																				filename,
																				{
																					create : true
																				},
																				function(
																						file) {
																					console
																							.log("File created succesfully.");
																					file
																							.createWriter(
																									function(
																											fileWriter) {
																										console
																												.log("Writing content to file path: "
																														+ folderpath);
																										fileWriter
																												.write(DataBlob);
																									},
																									function() {
																										alert('Impossible d\'enregistrer le fichier dans le chemin '
																												+ folderpath);
																									});
																				});
															}, function(e) {
																alert(e);
															});
										}, function(e) {
											alert(e);
										});
					}, function(e) {
						alert(e);
					});

}

function deleteImageFile(fileName, photoId) {
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(dir) {
		dir.root.getDirectory('Ferlim', {
			create : true
		}, function(dirEntry) {
			dirEntry.getDirectory('Photos', {
				create : true
			}, function(subDir) {
				subDir.getFile(fileName, {
					create : false
				}, function(fileEntry) {
					fileEntry.remove(function(file) {
						$('#' + photoId).attr("src", "images/images.png");
						$('#' + photoId).attr("height", "");
						$('#' + photoId).attr("width", "");
						$('#' + photoId).next().css("display", "none");
					}, function() {
						alert("Supprimer l\'erreur " + error.code);
					}, function() {
						alert("Le fichier n'existe pas");
					});
				});
			}, function(e) {
				alert(e);
			});
		}, function(e) {
			alert(e);
		});

	});

}

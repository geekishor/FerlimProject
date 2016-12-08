
var loginObject = {

	authenticate : function() {

		/*
		 * var userName = $.trim($("#txtUserName").val().toLowerCase()); var
		 * password = $("#txtPassword").val(); if (userName == "") {
		 * alert("Veuillez saisir un nom d'utilisateur."); return; }
		 * 
		 * if (password == "") { alert("Veuillez saisir un mot de passe.");
		 * return; }
		 */
		// setLocalStorage("userName", userName);
		$.mobile.changePage("#detailPage", {
			transition : "none"
		});
	},

	goToAddImage : function() {
		var isSelected = localStorage.getItem("legSelected");
		var horseName = $('#horseName').val();
		
		if (horseName.trim().length <= 0) {
			alert('Please provide the horse name.');
			return;
		}			
			
		if (isSelected.length > 0) {
			$.mobile.changePage("#addImage", {
				transition : "none"
			});
		}else{
			alert('Please select atleast one option.');
		}
	}

	
}


$(function() {
			
	localStorage.setItem("legSelected", "");
  	$('.addCheck').click(function(){    		
		var objId = $(this).attr('id'); 
		$('.addCheck img').attr('src','');
		$('#'+ objId +' img').attr('src','images/check_mark.png');
		localStorage.setItem("legSelected", "true");
	});
  	
  	
	$('#addFromCamera').click(function(){
		capturePhoto();
		function capturePhoto() {
			// Take picture using device camera and retrieve image as base64-encoded string
			    navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50 , destinationType: Camera.DestinationType.DATA_URL});
			}

			//Callback function when the picture has been successfully taken
			function onPhotoDataSuccess(imageData) {                
			    // Get image handle
			    var smallImage = document.getElementById('smallImage');

			    // Unhide image elements
			    smallImage.style.display = 'block';
			    smallImage.src = "data:image/jpeg;base64," + imageData;
			    
			/* var block = imageData.split(";");
			 var dataType = block[0].split(":")[1];
			 var realData = block[1].split(",")[1];*/

			 var folderpath = "file:///storage/emulated/0/";
			 folderpath = cordova.file.dataDirectory;
			 
			 var filename = "myimage.jpeg";
			 var dataType = "image/jpeg";
			 savebase64AsImageFile(folderpath,filename,imageData,dataType);
			}

			//Callback function when the picture has not been successfully taken
			function onFail(message) {
			    alert('Failed to load picture because: ' + message);
			}
	});
	
	
	$('#addFromGallery').click(function(){
		var destinationType = navigator.camera.DestinationType;;
		  navigator.camera.getPicture(onPhotoURISuccess, function(error){alert(error);}, {quality: 50, destinationType: destinationType.DATA_URL, sourceType: 0 });
		  
		  function onPhotoURISuccess(imageData){
			   // Get image handle
			    var smallImage = document.getElementById('smallImage');

			    // Unhide image elements
			    smallImage.style.display = 'block';
			    smallImage.src = "data:image/jpeg;base64," + imageData;
		  }
	});
});

$(document).on("pagebeforeshow",function(){
	  
  	var screen = $.mobile.getScreenHeight();

	var header = $(".ui-header").hasClass("ui-header-fixed") ? $(".ui-header").outerHeight()  - 1 : $(".ui-header").outerHeight();

	var contentCurrent = $(".ui-content").outerHeight() - $(".ui-content").height();

	var content = screen - header - contentCurrent;

	$(".ui-content").height(content);
	
});

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

  var blob = new Blob(byteArrays, {type: contentType});
  return blob;
}

function savebase64AsImageFile(folderpath,filename,content,contentType){
// Convert the base64 string in a Blob
var DataBlob = b64toBlob(content,contentType);

console.log("Starting to write the file :3");

window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,  function(dir) {
    console.log("Access to the directory granted succesfully" );
    dir.root.getDirectory('Ferlim', { create: true }, function (dirEntry) {
    	dirEntry.getDirectory('Photos', { create: true }, function (subDir) {
    		subDir.getFile(filename, {create:true}, function(file) {
                console.log("File created succesfully.");
                file.createWriter(function(fileWriter) {
                    console.log("Writing content to file path: "+ folderpath);
                    fileWriter.write(DataBlob);
                }, function(){
                    alert('Unable to save file in path '+ folderpath);
                });
        	});
    	},function(e){alert(e);});    	
    }, function(e){alert(e);});    
}, function(e){alert(e);});

}

/*window.resolveLocalFileSystemURL(folderpath, function(dir) {
console.log("Access to the directory granted succesfully" );
dir.getFile(filename, {create:true}, function(file) {
    console.log("File created succesfully.");
    file.createWriter(function(fileWriter) {
        console.log("Writing content to file path: "+ folderpath);
        fileWriter.write(DataBlob);
    }, function(){
        alert('Unable to save file in path '+ folderpath);
    });
});
});*/
function setImages(){
	images = obj.images;
	for(var i =0;i<images.length;i++){
		var tableRef = document.getElementById('imageTable');
		var image = document.createElement("img");
		var tr,td;
		if(i%3 === 0){
			tr = tableRef.insertRow();
		}
		td  = tr.insertCell();
		image.src = images[i].url;
		image.name = images[i].name;
		image.url = images[i].url;
		image.info = images[i].info;
		image.uploadedDate = images[i].uploadedDate;
		image.title = images[i].info;
		image.alt = "Unable to load image";
		
		image.id = image_id++;
		images[i].id = image.id;
		
		td.appendChild(image);
	}
}

// setting info in the input column about image
function setInfo(){
	modal.style.display = "block";
	var input_value = document.getElementsByTagName("input");
	input_value[0].value = this.name;
	input_value[1].value = this.url;
	input_value[2].value = this.info;
	input_value[3].value = this.uploadedDate;
	previous_image = this;
}

function load(){
	setImages();
	var images = document.getElementsByTagName("img");
	for(var i=0;i<images.length;i++){
		// adding event listener to all the images
		images[i].addEventListener("click",setInfo);
	}
}

function validateUrl(url){
	var re = /\S+\.\S+/;
    return re.test(url);
}


function isValidDate(dateString) {
	var regEx = /^\d{4}-\d{2}-\d{2}$/;
  	if(dateString.match(regEx) === false) 
  		return false;  // Invalid format
  	var enteredDate = new Date(dateString);
  	if(!enteredDate.getTime()) 
  		return false;
  	var enteredMS = new Date(dateString).getTime();
  	 var currentMS = new Date().getTime();
  	// Return the number of milliseconds since 1970/01/01:
  	if(enteredMS > currentMS) 
  		return false;

  	// Return a Date object as a String, using the ISO standard:
  	return enteredDate.toISOString().slice(0,10) === dateString;
}


function dataValidation(input_value){
	if(input_value[0].value ===""){
		alert("Name cannot be empty !!");
		return false;
	}
	if(validateUrl(input_value[1].value) === false ){
		alert("url is invalid !!");
		return false;
	}
	if(input_value[2].value === ""){
		alert("Information cannot be empty !!");
		return false;
	}
	if(input_value[3].value === ""){
		alert("Uploaded date cannot be empty !!");
		return false;
	}
	if(isValidDate(input_value[3].value) === false){
		alert("Uploaded date is invalid !!");
		return false;
	}
	return true;
}

var obj = JSON.parse(data);
var modal = document.getElementById('myModal');
var span = document.getElementsByClassName("close")[0];
var edit = document.getElementsByClassName("editbtn")[0];
var add = document.getElementsByClassName("addbtn")[0];
var del = document.getElementsByClassName("delbtn")[0];
var previous_image , image_id = 0;


add.onclick = function(){
	var input_value = document.getElementsByTagName("input");
	if(dataValidation(input_value)){
		var tableRef = document.getElementById('imageTable');
		var images = document.getElementsByTagName("img");
		var new_image = document.createElement("img");
		var tr = document.getElementsByTagName("tr"),td;
		// reference to last element of table row
		tr = tr[tr.length-1]; 
		// each row will have three cells
		if(images.length%3 === 0){
			tr = tableRef.insertRow();
		}
		// insert new cell in the row
		td  = tr.insertCell();
		new_image.src = input_value[1].value;
		new_image.name = input_value[0].value;
		new_image.url = input_value[1].value;
		new_image.info = input_value[2].value;
		new_image.uploadedDate = input_value[3].value;
		new_image.alt = "Unable to load image";
		new_image.id = image_id++;
		new_image.title = new_image.info;


		obj['images'].push({"name": input_value[0].value, "url" : input_value[1].value,"info":input_value[2].value, "uploadedDate": input_value[3].value, "id":new_image.id});
		new_image.addEventListener("click",setInfo);
		td.appendChild(new_image);
		modal.style.display = "none";
		alert("New image has been added !!");	
	}
}

edit.onclick = function(){
	var input_value = document.getElementsByTagName("input");
	var images = document.getElementsByTagName("img");

	if(dataValidation(input_value)){
		for(var i=0;i<obj.images.length;i++){
			if(previous_image.id.localeCompare(obj.images[i].id) === 0){
					obj.images[i].name = input_value[0].value;
					obj.images[i].url = input_value[1].value;
					obj.images[i].info = input_value[2].value;
					obj.images[i].uploadedDate = input_value[3].value;

					previous_image.name = input_value[0].value;
					previous_image.src = input_value[1].value;
					previous_image.url = input_value[1].value;
					previous_image.info = input_value[2].value;
					previous_image.uploadedDate = input_value[3].value;
					previous_image.alt = "Unable to load image";					
			}
		}
		modal.style.display = "none";
		alert("Image has been updated !!");	
	}
}	

del.onclick = function(){

	var input_value = document.getElementsByTagName("input");
	var i = 0;
	for(i=0;i<obj.images.length;i++){
		if(previous_image.id.localeCompare(obj.images[i].id) === 0){
				obj.images.splice(i,1);
				break;				
		}
	}
	var table = document.getElementById("imageTable");
	table.innerHTML = "";
	image_id = 0;
	load();
	alert("Image has been deleted !!");
	modal.style.display = "none";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
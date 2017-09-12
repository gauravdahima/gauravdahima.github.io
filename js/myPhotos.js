
function setImages(){
	var obj = JSON.parse(data);
	images = obj.images;
	var table = document.getElementsByTagName("table");
	for(var i =0;i<images.length;i++){
		var tableRef = document.getElementById('imageTable');
		var image = document.createElement("img");
		var tr,td;
		if(i%3 === 0){
			tr = tableRef.insertRow();
		}
		td  = tr.insertCell();
		image.src = images[i].url;
		td.appendChild(image);
	}
}	
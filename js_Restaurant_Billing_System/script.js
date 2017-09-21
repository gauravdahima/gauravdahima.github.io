var tables = JSON.parse(tables);
var items = JSON.parse(items);
var modal = document.getElementById('myModal');
var span = document.getElementById('close');
var latest_table, latest_input ,latest_target;

var billFooter = document.getElementById('billFooter');
billFooter.addEventListener("click",payBill,false);

function allowDrop(ev) {
	ev.preventDefault();
}

function drag(ev) {
	ev.dataTransfer.dropEffect = "copy";
	ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
	ev.preventDefault();
    var item_id = ev.dataTransfer.getData("text");
    var item = document.getElementById(item_id);

    var table_id = ev.target.id;
    var table = document.getElementById(table_id);
    var found = false;

    for(var i=0;i<table.items.length;i++){
    	if(table.items[i].item_id == item_id){
    		table.items[i].item_count++;
    		table.total_items++;
    		table.total_amount+=item.cost;
    		found = true;
    	}
    }

    if(found == false){
    	// if the item is not already on the table then add a new item to the list of items of the table
    	var new_item = {"item_id" :item.id,"item_count": 1, "item_name":item.name, "item_cost":item.cost};
    	table.items.push(new_item);
    	table.total_items++;
    	table.variety_count++;
    	table.total_amount+=item.cost;
    }
    // setting the innerHTML of the table
    table.innerHTML = table.name + " | Rs. "+table.total_amount +" | Total items: "+table.total_items;
}

function payBill(){
	alert("Please pay : INR "+latest_table.total_amount);
	modal.style.display = "none";
	latest_table.total_amount = 0;
	latest_table.total_items = 0;
	latest_table.items = [];
	latest_table.innerHTML = latest_table.name + " | Rs. "+latest_table.total_amount +" | Total items: "+latest_table.total_items;
}

function showBill(ev){
	latest_target = ev;
	modal.style.display = "block";
	var table = document.getElementById(ev.target.id);
	var billHeader = document.getElementById("billHeader");
	billHeader.innerHTML = table.name +" |  Order Details";
	var tableRef = document.getElementById('billTable');
	billTable.innerHTML = '<tr><th>S.No.</th><th>Item</th><th>Price</th><th>Item Count</th><th>Delete</th></tr>';
	
	for(var i=0;i<table.items.length;i++){
		var item = document.getElementById(table.items[i].item_id);
		var row = tableRef.insertRow(i+1);
		
		row.insertCell(0).innerHTML = i+1;
		row.insertCell(1).innerHTML = item.name;
		row.insertCell(2).innerHTML = item.cost;

		row.insertCell(3).innerHTML = '<input type="number" style="align:center;width:50px"></input>';
		document.getElementsByTagName("input")[i+2].value = table.items[i].item_count;
		document.getElementsByTagName("input")[i+2].id = 50+i;

		row.insertCell(4).innerHTML = '<i class="fa fa-trash"></i>';
		document.getElementsByClassName("fa fa-trash")[i].id = 100+i;

		row.cells[3].addEventListener("change",editBill,false);	
		row.cells[4].addEventListener("click",deleteItem,false);	
	}
	var row = tableRef.insertRow(table.items.length+1);
	row.insertCell(0).innerHTML = "";
	row.insertCell(1).innerHTML = "";
	row.insertCell(2).innerHTML = "Total : "+table.total_amount;
	row.insertCell(3).innerHTML = "";
	row.insertCell(4).innerHTML = "";

	latest_table = table;
}

function editBill(ev){
	if(ev.target.value <= 0){
		alert("Item count cannot be zero/negative.");
		ev.target.value = latest_table.items[ev.target.id-50].item_count;
	}
	else{
		var input_id = ev.target.id;
		var change = ev.target.value - latest_table.items[input_id - 50].item_count; 
		latest_table.items[input_id - 50].item_count = ev.target.value;
		latest_table.total_amount += change * (latest_table.items[input_id -50].item_cost);
		latest_table.total_items +=change;
		latest_table.innerHTML = latest_table.name + " | Rs. "+latest_table.total_amount +" | Total items: "+latest_table.total_items;
		showBill(latest_target);
	}
}


function deleteItem(ev){
	var delete_id = ev.target.id;
	latest_table.total_items -= latest_table.items[delete_id-100].item_count;
	latest_table.total_amount -= latest_table.items[delete_id-100].item_count * latest_table.items[delete_id-100].item_cost;
	latest_table.items.splice(delete_id-100, 1);
	showBill(latest_target);
	latest_table.innerHTML = latest_table.name + " | Rs. "+latest_table.total_amount +" | Total items: "+latest_table.total_items;
}

function setTables(){

	for(var i =0;i<tables.length;i++){
		var tableRef = document.getElementById('tables');
		var new_div = document.createElement("div");
		new_div.innerHTML = tables[i].name + " | Rs. "+tables[i].total_amount +" | Total items: "+tables[i].total_items;
		new_div.addEventListener("dragover",allowDrop,false);	
		new_div.addEventListener("drop",drop,false);
		new_div.addEventListener("click",showBill,false);

		new_div.id = tables[i].id;
		new_div.name = tables[i].name;
		new_div.total_items = tables[i].total_items;
		new_div.total_amount = tables[i].total_amount;
		new_div.items = tables[i].items;

		tableRef.appendChild(new_div);	
	}
}

function setMenu(){
	
	for(var i =0;i<items.length;i++){
		var menuRef = document.getElementById('menu');
		var new_div = document.createElement("div");
		new_div.innerHTML = items[i].name + " | Rs. "+items[i].cost;
		new_div.draggable = "true";
		new_div.addEventListener("dragstart",drag,false);

		new_div.id = items[i].id;
		new_div.name = items[i].name;
		new_div.type = items[i].type;
		new_div.cost = items[i].cost;

		menuRef.appendChild(new_div);
	}
}

function setRestaurant(){
	setTables();
	setMenu();
}

function filterTables() {
	var input = document.getElementById('input1');
  	var filter = input.value.toUpperCase();
    var table = document.getElementById("tables");
    var div = table.getElementsByTagName("div");
    for (var i = 0; i < div.length; i++) {
    	if(div[i].name.toUpperCase().indexOf(filter) > -1){
    		div[i].style.display = "";
    	}
    	else{
    		div[i].style.display = "none";	
    	}
    }	
    
}

function filterMenu(){
	var input = document.getElementById('input2');
  	var filter = input.value.toUpperCase();
  	var menu = document.getElementById("menu");
    var div = menu.getElementsByTagName("div");
    
    for (var i = 0; i < div.length; i++) {
    	if(div[i].name.toUpperCase().indexOf(filter) > -1 || div[i].type.toUpperCase().indexOf(filter) > -1){
    		div[i].style.display = "";
    	}
    	else{
    		div[i].style.display = "none";	
    	}
    }	
}

span.onclick = function() {
    modal.style.display = "none";
}

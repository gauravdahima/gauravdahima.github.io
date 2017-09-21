var stop = false, latest_department,data_count=0;
var main_data = [];



function prepareData(string){
	var new_string="",re = /\S+\s\S+\s\d+/;
	for(var i=0;i<string.length;i++){
		if(string[i]!='\xa0'){
			new_string+=string[i];
		}
	}
	if(new_string.indexOf("DEPARTMENT OF") >= 0){
		latest_department = new_string;
	}
	if(new_string.indexOf("DEPARTMENT OF NEUROLOGY") >= 0){
		latest_department = "DEPARTMENT OF NEUROLOGY";
	}

	if(new_string == "ACCOMMODATION CHARGES W.E.F. 01.09.2006"){
		stop = true;
	}
    else if(re.test(new_string)){
    	new_string = new_string.split(" ");
    	var temp_string='';
    	if(new_string[new_string.length-1] == "" || new_string[new_string.length-1] == " "){
    		for(var i=1;i<new_string.length-2;i++){
    			temp_string+=new_string[i] + " ";
    		}
    		var new_data = { "Department":latest_department,"Code" :new_string[0],"Description": temp_string, "Rate":new_string[new_string.length-2] };
    	}
    	else {
    		for(var i=1;i<new_string.length-1;i++){
    			temp_string+=new_string[i] + " ";
    		}
    		var new_data = { "Department":latest_department,"Code" :new_string[0],"Description": temp_string, "Rate":new_string[new_string.length-1] };
    	}
    	
    	
    	main_data.push(new_data);
    	data_count++;
    	console.log(new_data.Rate);
    }
}


function scrap(){
	var array = document.getElementsByClassName("MsoPlainText");
	for(var i=0;i<array.length;i++){
		if(stop == false){
			prepareData(array[i].innerText);
		}
		else{
			break;
		}
	}
	console.log(data_count);
}

function convertArrayOfObjectsToCSV(args) {  
    var result, ctr, keys, columnDelimiter, lineDelimiter, data;

    data = args.data || null;
    if (data == null || !data.length) {
        return null;
    }

    columnDelimiter = args.columnDelimiter || ',';
    lineDelimiter = args.lineDelimiter || '\n';

    keys = Object.keys(data[0]);

    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    data.forEach(function(item) {
        ctr = 0;
        keys.forEach(function(key) {
            if (ctr > 0) result += columnDelimiter;

            // result += item[key];
            // now the description can contains the comma too
            result += "\"" + item[key] + "\"";
            ctr++;
        });
        result += lineDelimiter;
    });

    return result;
}

function downloadCSV(args) {  
    var data, filename, link;
    var csv = convertArrayOfObjectsToCSV({
        data: main_data
    });
    if (csv == null) return;

    filename = args.filename || 'export.csv';

    if (!csv.match(/^data:text\/csv/i)) {
        csv = 'data:text/csv;charset=utf-8,' + csv;
    }
    data = encodeURI(csv);

    link = document.createElement('a');
    link.setAttribute('href', data);
    link.setAttribute('download', filename);
    link.click();
}
/*
*Christopher Marinos christopher_marinos@student.uml.edu
*homework 7, GUI 1, Umass Lowell
*This file contains a function to generate a dynamic table 
*its error handling methods have been replaces by the validator plugin
*/

function addTable() {
	var form = $( "#frm1" );//these next lines are the changes to the code; all regex code has been removed and is being handled by validator plugin
	form.validate();
	if(!form.valid())
	{handle_error();
		return;}

    var prawInput = document.getElementById("InputForm").children;//this form will receive input from the user. This way the app is interactive.
    var rawInput  = prawInput[0];//this is an array. an array is a variable length list of numbers, strings, or even user defined types.
    var eleminps = rawInput.elements;//the input string
    var myTableDiv = document.getElementById("myDynamicTable"); //now get the table div so we can add to it
    myTableDiv.innerHTML = "";//first clear it; this way we don't make multiple tables when the user submits more than one valid four number pair	
    var table = document.createElement('TABLE');//start by making the table struct which we then fill with rows and columns
    table.border='1';//a nice thin border for our table
    var tableBody = document.createElement('TBODY');//the table has to have a body
    table.appendChild(tableBody);//via the DOM we attach the table body to the table
    

	
	var myarr = eleminps[0].value.split(/\s+/);//this gets an array split along whitespace
	
	if(myarr.length == 4){//this is ideal; there was no leading whitespace ie "   1 2 3 4"
	arg1 = Number(myarr[0]);
	arg2 = Number(myarr[1]);
	arg3 = Number(myarr[2]);
	arg4 = Number(myarr[3]);
	}
	else {//if there is leading whitespace AND the regex accepted then the arr length will be > 4 so bump the array read indices up by one
			arg1 = Number(myarr[1]);
			arg2 = Number(myarr[2]);
			arg3 = Number(myarr[3]);
			arg4 = Number(myarr[4]);
	}

    var rowmax = (arg2 - arg1);
    var colmax = (arg4 - arg3);//if my values are a b c d I want the vectors b-a and d-c
	
	
    for (var i=0; i<rowmax + 2; i++){
        var tr = document.createElement('TR');//make the row
        tableBody.appendChild(tr);//append to the body (which is itself appended to TABLE)
      
       for (var j=0; j<colmax + 2; j++){//now we populate with data. i absorbed some offset complexity (all the +1 and -1) to keep things concise
           var td = document.createElement('TD');
           td.width='75';
		   if(i == 0 && j == 0) {//the top left corner and does not have an entry
		    td.appendChild(document.createTextNode(' '));}//no entry; this is the 0th 0th aka top left 
		   if(i != 0 && j == 0){//if it is the leftmost column 
		    td.appendChild(document.createTextNode(i-1 + arg1));}    
	       if(j != 0 && i == 0) {//if it is the topmost row
		    td.appendChild(document.createTextNode(j-1 + arg3));}//if it is neither the top left, the topmost row or the leftmost column then it is an entry in the table (ith row * jth column)   
		   if(i != 0 && j != 0) {
                        td.appendChild(document.createTextNode((i-1 + arg1) * (j-1 + arg3)));
		   }
                        tr.appendChild(td);
       }

	   
    }
    myTableDiv.appendChild(table);  
}
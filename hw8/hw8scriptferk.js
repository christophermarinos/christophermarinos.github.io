/*
Christopher Marinos gui1 Umass Lowell fall 2016
This has the addTable function as well as some adding of tabs and checkboxes. 
*/
var globarg1,globarg2,globarg3,globarg4;//event handling breeds global variables

function addTable(arg1,arg2,arg3,arg4) {//back for the third time and cleaner than ever this function now takes 4 args because sifting through forms in the code is too cumbersome now
	console.log("i was called with args " + arg1 + " " + arg2 + " " + arg3 + " " +arg4);
    var myTableDiv = document.getElementById("myDynamicTable"); //now get the table div so we can add to it
    myTableDiv.innerHTML = "";//first clear it; this way we don't make multiple tables when the user submits more than one valid four number pair	
    var table = document.createElement('TABLE');//start by making the table struct which we then fill with rows and columns
    table.border='1';//a nice thin border for our table
    var tableBody = document.createElement('TBODY');//the table has to have a body
    table.appendChild(tableBody);//via the DOM we attach the table body to the table
	//don't forget to convert these to numbers; leaving them as strings led to the bizarre situation of the top row and leftmost column counting up in tens
	arg1 = Number(arg1);
	arg2 = Number(arg2);
	arg3 = Number(arg3);
	arg4 = Number(arg4);
	globarg1= arg1;//these are needed so the event handlers can access the info
	globarg2= arg2;
	globarg3= arg3;
	globarg4= arg4;
    
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

function addCheckbox(name) {//dynamically add a checkbox
    var mytab = $('#cblist');
    var inputs = mytab.find('input');
    var id = inputs.length;
    id = id + 1;
    $('<input />', { type: 'checkbox', id: 'cb'+id, value: name }).appendTo(mytab);
    $('<label />', { 'for': 'cb'+id, text: name }).appendTo(mytab);
}


$(document).ready(function() {//this is supposed to stick a table with the tab but it either doesnt go into the tab or it goes in as [object Object]
    $("div#tabs").tabs();

    $("button#frfykitty").click(function() {
		var mydiv = $('#myDynamicTable').clone();
        var num_tabs = $("div#tabs ul li").length + 1;//label the tab with the table dims per the assignment; this works as intended
        $("div#tabs ul").append(
            "<li><a href='#tab" + num_tabs + "'>" + globarg1 + " " + globarg2 + " " + globarg3 + " " + globarg4 + "</a></li> "//THIS DECORATES THE TAB
        );
		
		
		
		
		

$("div#tabs ul").append(mydiv);//clone and copy the div containing the table; this sort of works
        $("div#tabs").tabs("refresh");
		addCheckbox(globarg1 + " " + globarg2 + " " + globarg3 + " " + globarg4);
    });

	    $("button#remove-tab").click(function() {
	
	$("div#tabs ul li").remove();
    });
	
});

$(function() {//this sets the slider; code is the same for all 4 sliders only the vars change
    $( "#slider-0" ).slider({
        range:false,
        min: 0,
        max: 100,
        slide: function( event, ui ) {
            $( "#field0" ).val(ui.value);
				  addTable($( "#field0" ).val(),$( "#field1" ).val(),$( "#field2" ).val(),$( "#field3" ).val());
               }
           });

         });
		 
		          $(function() {
            $( "#slider-1" ).slider({
               range:false,
               min: 0,
               max: 100,
               slide: function( event, ui ) {
                  $( "#field1" ).val(ui.value);
				  addTable($( "#field0" ).val(),$( "#field1" ).val(),$( "#field2" ).val(),$( "#field3" ).val());
               }
           });

         });
		 
		 		          $(function() {
            $( "#slider-2" ).slider({
               range:false,
               min: 0,
               max: 100,
               slide: function( event, ui ) {
                  $( "#field2" ).val(ui.value);
				  addTable($( "#field0" ).val(),$( "#field1" ).val(),$( "#field2" ).val(),$( "#field3" ).val());
               }
           });

         });
		 
		 		          $(function() {
            $( "#slider-3" ).slider({
               range:false,
               min: 0,
               max: 100,
               slide: function( event, ui ) {
                  $( "#field3" ).val(ui.value);
				  addTable($( "#field0" ).val(),$( "#field1" ).val(),$( "#field2" ).val(),$( "#field3" ).val());
               }
           });

         });
		 
	
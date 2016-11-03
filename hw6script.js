function load() {
    ;//do nothing
}

function addTable(a, b, c, d) {
    var prawInput = document.getElementById("InputForm").children;//this form will receive input from the user. This way the app is interactive.
    var rawInput  = prawInput[0];//this is an array. an array is a variable length list of numbers, strings, or even user defined types.
    var myregexp = /^(\s*[0-9]+[0-9]*\s+[0-9]+[0-9]*\s+[0-9]+[0-9]*\s+[0-9]+[0-9]*\s*)$/;//a regular expression is used to match patterns in strings
    alert(rawInput);
    var eleminps = rawInput.elements;//the input string
    alert(eleminps[0].value);
    document.getElementById("InputForm").style.visibility = 'hidden';//I decided to hide then input form when the table is displayed
    var myTableDiv = document.getElementById("myDynamicTable"); 
    var table = document.createElement('TABLE');
    table.border='1';
    var tableBody = document.createElement('TBODY');
    table.appendChild(tableBody);
	if(myregexp.test(eleminps[0].value)==false)
	{alert("no match");
		return}
	if(myregexp.test(eleminps[0].value)==true)
	{alert("match");}
	
	var myarr = eleminps[0].value.split(/\s+/);
	
	if(myarr.length == 4)
	{
	arg1 = Number(myarr[0]);
	arg2 = Number(myarr[1]);
	arg3 = Number(myarr[2]);
	arg4 = Number(myarr[3]);
	}
	else {
			arg1 = Number(myarr[1]);
			arg2 = Number(myarr[2]);
			arg3 = Number(myarr[3]);
			arg4 = Number(myarr[4]);
	}
	
		
		for(var i = 0; i < myarr.length; i++)
		{
			console.log(myarr[i]);
		}
		
		console.log('length is ' + myarr.length);
	
	
	var rowmax = (arg2 - arg1);
    var colmax = (arg4 - arg3);
	
	
    for (var i=0; i<rowmax + 2; i++){
        var tr = document.createElement('TR');
        tableBody.appendChild(tr);
      
       for (var j=0; j<colmax + 2; j++){
           var td = document.createElement('TD');
           td.width='75';
		   if(i == 0 && j == 0)//it is the top left corner and does not have an entry
		   {td.appendChild(document.createTextNode('x'));}
		   if(i != 0 && j == 0)//if it is the leftmost column
		   {td.appendChild(document.createTextNode(i-1 + arg1));}    
	       if(j != 0 && i == 0)//if it is the topmost row
		   {td.appendChild(document.createTextNode(j-1 + arg3));}//if it is neither the top left, the topmost row or the leftmost column then it is an entry in the table (ith row * jth column)   
		   if(i != 0 && j != 0)
           {td.appendChild(document.createTextNode((i-1 + arg1) * (j-1 + arg3)));}
           tr.appendChild(td);
       }

	   
    }
    myTableDiv.appendChild(table);
   
}

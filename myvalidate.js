/*
*Christopher Marinos christopher_marinos@student.uml.edu
*homework 7, GUI 1, Umass Lowell
*this file contains code relating to the validator plugin
*
*/

jQuery.validator.addMethod("numerical", function(value, element){//adds a method to jquery to poll for incorrect strings
    if (/^(\s*[0-9]+[0-9]*\s+[0-9]+[0-9]*\s+[0-9]+[0-9]*\s+[0-9]+[0-9]*\s*)$/.test(value)) {//regex which matches on exactly four numbers separated by n spaces
        return true;  
    } else {		
        return false;   
    };
}, "no non numerical input, only exactly four numbers separated by spaces please");//this is the custom reject message



$("#frm1").validate({
    rules: {
    field: {
        required: true,//means field cannot be empty
        numerical: true//call our custom method
    }
    },
    success: function(label){
        label.addClass("valid").text("Valid Input, Happy Clicking!");
    }
});






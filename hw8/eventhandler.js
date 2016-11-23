/*
Christopher Marinos gui1 Umass Lowell fall 2016
this file contains event handling code for when keypresses are entered
*/

$( "#field0" ).keypress(function( event ) {//this takes the input, scales it and calls addTable (the others do the same for each text box)
  var inp = $('#field0').val();
  $("#slider-0").slider('value',inp*10);
   addTable($( "#field0" ).val(),$( "#field1" ).val(),$( "#field2" ).val(),$( "#field3" ).val());
});

$( "#field1" ).keypress(function( event ) {
  var inp = $('#field1').val();
  $("#slider-1").slider('value',inp*10);
   addTable($( "#field0" ).val(),$( "#field1" ).val(),$( "#field2" ).val(),$( "#field3" ).val());
});

$( "#field2" ).keypress(function( event ) {
  var inp = $('#field2').val();
  $("#slider-2").slider('value',inp*10);
   addTable($( "#field0" ).val(),$( "#field1" ).val(),$( "#field2" ).val(),$( "#field3" ).val());
});

$( "#field3" ).keypress(function( event ) {
  var inp = $('#field3').val();
  $("#slider-3").slider('value',inp*10);
  addTable($( "#field0" ).val(),$( "#field1" ).val(),$( "#field2" ).val(),$( "#field3" ).val());
});
 

$(document).ready(function() {//adds a check box with the name of the tab. This, unfortunately, does not delete tabs by name nor does it delete checkboxes as I was not able to work out the logistics of deleting specific dynamically created elements.
    $('#btnSave').click(function() {
        addCheckbox($('#txtName').val());
    });
});


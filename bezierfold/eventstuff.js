	  var canvas = document.getElementById('myCanvas');
      var context = canvas.getContext('2d');
	 window.onload = function() {
		 pt1 = new vec2d();
		  pt1.x = 86;
		  pt1.y = 77;
		  pt2 = new vec2d();
		  pt2.x = 195; 
		  pt2.y = 274;
		  pt3 = new vec2d();
		  pt3.x = 407; 
		  pt3.y = 21;
		  pt4 = new vec2d();
		  pt4.x = 532; 
		  pt4.y = 81;
		  pt4.y = 81;
		  pt4.y = 81;
		  bezpts = new Array();
		  bezpts.push(pt1);
		  bezpts.push(pt2);
		  bezpts.push(pt3);
		  bezpts.push(pt4);
		  redraw();
		
		
    }

	
	canvas.addEventListener('mousedown', function(evt) {
        
		mousedown = true;
		console.log('DAFUQ');
		var mousePos = getrelativeposition(canvas, evt);
		click_down_coll(mousePos.x,mousePos.y);
		

      }, false);
	  
	  //event listeners go here; we use mouse up and mouse move
	        canvas.addEventListener('mouseup', function(evt) {
				mousedown = false;
        var mousePos = getrelativeposition(canvas, evt);
			 
		     if(CURRENTLY_DRAWING == true)
			 {
			 currx = mousePos.x;
			 curry = mousePos.y;
			 
			 draw_dispatch(CURRENT_STATE);
			 if(POLYLINES == false)
			 CURRENTLY_DRAWING = false;}
			 else
			 {
			  anchorx = mousePos.x;
			  anchory = mousePos.y;
			  curranchx = anchorx;
			  curranchy = anchory;
			  CURRENTLY_DRAWING = true;}


      }, false);
	  
	  	        canvas.addEventListener('mousemove', function(evt) {
					
					if(mousedown == false)
					{return false;}
        var mousePos = getrelativeposition(canvas, evt);
	   
			 if(curr_point != neginf)
			 {
				 bezpts[curr_point].x = mousePos.x;
				 bezpts[curr_point].y = mousePos.y;
				 redraw();
			 }
		     if(CURRENTLY_DRAWING == true)
			 {
				currx = mousePos.x;
				curry = mousePos.y;
				if(POLYLINES == false)
				{draw_dispatch(CURRENT_STATE);}
				
			 }
			 //if we are not currently drawing we ignore mouse movement over the canvas


      }, false);
	  
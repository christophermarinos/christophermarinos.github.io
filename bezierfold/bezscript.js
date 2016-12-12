      var vec2d = function(x,y) {return {x: this.x, y:this.y}};
	  var circ2d = function(cent,rad,radius) {return {cent: this.cent, rad:this.rad,radius: this.radius }};
	  var CURRENTLY_DRAWING = false;//global
	  var POLYLINES = false;//global; setting to true changes the way mouseup is handled
	  var BEZIERMODE = false;
	  var polylinestruct = new Array();
	  var bezpts;
	  var bez_ctrl_pts;
	  var clickcirc;//using the sum-of-squares-of-radii method to detect clicked on
	  var CURRENT_STATE = "bresenhamline";//global
	  var anchorx;//global
	  var anchory;//global
	  var curranchx;
	  var curranchy;
	  var currx;//global
	  var curry;//global
	  var globrad = 7;//global
	  var globstep = .0001;
	  var mousedown = false;
	  var neginf = -9999;
	  var curr_point = neginf;
	  
	  function Bernstein_pol(arg,indice)
	{	
	
	//the Bernstein polynomials

	
		if(indice == 0){//(1-arg)^3
			var unmin = 1-arg;
			unmin = unmin * unmin;
			unmin = unmin * unmin;
			return unmin;
	}
		if(indice == 1){//3arg*(1-arg)^2
			var u3 = arg * 3;
			var unmin = 1-arg;
			unmin = unmin * unmin;
			u3 = u3* unmin;
			return u3;
		}
		if(indice == 2){//3arg^2(1-arg)
			var unmin = 1 - arg;
			arg = arg * arg;
			arg = arg * 3;
			return arg*unmin;
		}
		if(indice == 3){//arg^3
			var pol = arg;
			pol *= pol;
			pol *= pol;
			return pol;
		}
			
	}
	
function bezierpointat(utov)
{
	var accumpt = new vec2d();
	accumpt.x = 0;
	accumpt.y = 0;
	for(var j = 0; j < 4; j++)
	{
		var scaleby = Bernstein_pol(utov,j);
		var addpt = new vec2d();
		addpt.x = bezpts[j].x;
		addpt.y = bezpts[j].y;
		addpt.x = addpt.x * scaleby;
		addpt.y = addpt.y * scaleby;
		accumpt.x = accumpt.x + addpt.x;
		accumpt.y = accumpt.y + addpt.y;
	}
	
	return accumpt;

}
	  
      function getrelativeposition(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top//transform from screen to canvas space
        };
      }
	  
	  function set_draw_method(method)
	  {
	  POLYLINES = false;//toggle so that we don't end up with state mangling. polylines were added as an afterthought and the mouse handling code wasn't very receptive to them
	  var context = canvas.getContext('2d');
	  context.clearRect(0, 0, canvas.width, canvas.height);//clear the screen so that droppings are not left over. This allows a clean transition between draw types.
	  CURRENT_STATE = method;
	  }

	  
	  function draw_dispatch(type)
	  {

		  POLYLINES = true;
		  BEZIERMODE = true;
		 draw_bezier_control_points();
	  
	  }
	  

	  
	  

	

	
	
	  
	  function plot_point(x,y,context)//taking the idea that a pixel is just a square
	  {
				
				context.fillRect(x,y,1,1);
	  }
	  
	  	  function draw_circ(pt,context)//taking the idea that a pixel is just a square
	  {
				  //console.log("clicked on " + currx + " " + curry);
				  context.beginPath();
				  context.arc(pt.x, pt.y, globrad, 0.0, 2 * Math.PI);
				  context.fill();
				  
	  }
	  

	  function draw_bezier_control_points()
	  {
		  for(i = 0; i < bezpts.length; i++)
		  {
		  draw_circ(bezpts[i],context);
		  }
		  draw_bezier_curve();
	  }
	  
	  function draw_bezier_curve()
	  {
		  var stepup = 0;
		  while(stepup <= 1.0)
		  {
			  
			  var drawpt = bezierpointat(stepup);
			  plot_point(drawpt.x,drawpt.y,context);
			  stepup = stepup + .001;
			  
		  }
		  
	  }
	  
	  function circ_collide(circ1, circ2)
	  {
		  ;
	  }
	  
function click_down_coll(x,y)
{
	var sqwid = 70;
	console.log('clickx = ' + x + ' clicky = ' + y);
	for(i = 0; i < bezpts.length; i++)
	{
		// make the center the middle of a square and test bounds
		console.log('bezpts x = ' +bezpts[i].x+ ' bezpts y = ' +bezpts[i].y  );
		if(((x > bezpts[i].x-sqwid) && x < (bezpts[i].x + sqwid)) && ((y > bezpts[i].y-sqwid) && y < (bezpts[i].y + sqwid)))
		{console.log('HIT');
			curr_point = i;}
	}
		
}
	  
function redraw()
{
	var context = canvas.getContext('2d');
	  context.clearRect(0, 0, canvas.width, canvas.height);//clear the screen so that droppings are not left over. This allows a clean transition between 
	draw_bezier_control_points();
}

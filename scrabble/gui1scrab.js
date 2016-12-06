/*The image object is going to have a ht/wid. Since it is a square board ht = wd. the ht = wid = TOTAL_PIXEL_EXTENT. The subdivision length is is TOTAL_PIXEL_EXTENT/NUM_SUBDIVISIONS. When I click on the canvas, first use the entire image object as a bounding box. This is an aabb so hella trivial: (x > = xmax && x <= xmin) && (y >= ymax || <= ymin). Now we utilize integer division (being careful since js is weakly typed and cannot be counted upon to discard the mantissa: the number of sibdivisionlengths that go into the x pos clicked upon (dropping, once again, the mantissa) will give the x indice in "checkerboard space". I am not sure that this is the best way to do this but it is nice and does not require measuring the actual graphic. */

 var scrabpc = function(worldx,worldy,has_return_spot,homex,homey,imgval,wid,ht,unique_tag,value) {return {worldx: this.worldx, worldy:this.worldy, has_return_spot: this.has_return_spot, homex:this.homex, homey:this.homey, imgval:this.imgval, wid:this.wid, ht:this.ht, unique_tag:this.unique_tag, value:this.value, boardx: this.boardx, boardy: this.boardy, onboard: this.onboard, wildcard: this.wildcard,wordx: this.wordx, wordy: this.wordy}};
 
 var globarr;//ALL pieces.
 var globarrplaced;//all PLACED pieces.
 var globarrplacedonboard;
 var globarrpermonboard;
 var scrabbleboardarray;
 var GLOB_UNIQUE_TAG = 0;//really really REALLY bad way to assign unique values to pieces so that I can push/pop out of glob arr without losing track of whatever currently selected piece i may have
 var MOUSEDOWN = false;
 var TRAY_START = 990;
 var AVG_IMG_WID = 57;
 var AVG_IMG_HT = 54;
 var BOARD_GLOB_POSX = 0;
 var BOARD_GLOB_POSY = 0;
 var BOARD_SUBDIVISIONS = 15;
 var BOARD;
 var RUNNING_TALLY = 0;
 

var PIECES_IN_TRAY = 7;
var NEG_INF = -9999;//an impossible indice; -1 would suffice but i learned the +/-inf thing in graphics programming and like to use it
var CURR_PIECE = NEG_INF;//the way this works is that if a piece is dragging then its indice number will be in CURR_PIECE which is why you see a lot of piecearr[CURR_PIECE]; and if(CURRPIECE != NEG_INF) (dosomething) in the code.
	  var canvas;
      var context;
	  var img;
	  
function test_func()
{
	for(i = 0; i < 9; i++){
	var myvar = construct_piece(100,100,false,0,0,"A",20,20,1);
	globarr.push(myvar);}
	for(i = 0; i < 2; i++){
		var myvar = construct_piece(200,200,false,0,0,"B",20,20,3);
	globarr.push(myvar);}
	for(i = 0; i < 2; i++){
			var myvar = construct_piece(200,200,false,0,0,"C",20,20,3);
	globarr.push(myvar);}
	for(i = 0; i < 4; i++){
			var myvar = construct_piece(200,200,false,0,0,"D",20,20,2);
	globarr.push(myvar);}
	for(i = 0; i < 12; i++){
			var myvar = construct_piece(200,200,false,0,0,"E",20,20,1);
	globarr.push(myvar);}
	for(i = 0; i < 2; i++){
			var myvar = construct_piece(200,200,false,0,0,"F",20,20,4);
	globarr.push(myvar);}
	for(i = 0; i < 3; i++){
			var myvar = construct_piece(200,200,false,0,0,"G",20,20,2);
	globarr.push(myvar);}
	for(i = 0; i < 2; i++){
			var myvar = construct_piece(200,200,false,0,0,"H",20,20,4);
	globarr.push(myvar);}
	for(i = 0; i < 9; i++){
			var myvar = construct_piece(200,200,false,0,0,"I",20,20,1);
	globarr.push(myvar);}
	for(i = 0; i < 1; i++){
			var myvar = construct_piece(200,200,false,0,0,"J",20,20,8);
	globarr.push(myvar);}
	for(i = 0; i < 1; i++){
			var myvar = construct_piece(200,200,false,0,0,"K",20,20,5);
	globarr.push(myvar);}
	for(i = 0; i < 4; i++){
			var myvar = construct_piece(200,200,false,0,0,"L",20,20,1);
	globarr.push(myvar);}
	for(i = 0; i < 2; i++){
			var myvar = construct_piece(200,200,false,0,0,"M",20,20,3);
	globarr.push(myvar);}
	for(i = 0; i < 6; i++){
			var myvar = construct_piece(200,200,false,0,0,"N",20,20,1);
	globarr.push(myvar);}
	for(i = 0; i < 8; i++){
			var myvar = construct_piece(200,200,false,0,0,"O",20,20,1);
	globarr.push(myvar);}
	for(i = 0; i < 2; i++){
			var myvar = construct_piece(200,200,false,0,0,"P",20,20,3);
	globarr.push(myvar);}
	for(i = 0; i < 1; i++){
			var myvar = construct_piece(200,200,false,0,0,"Q",20,20,10);
	globarr.push(myvar);}
	for(i = 0; i < 6; i++){
			var myvar = construct_piece(200,200,false,0,0,"R",20,20,1);
	globarr.push(myvar);}
	for(i = 0; i < 4; i++){
			var myvar = construct_piece(200,200,false,0,0,"S",20,20,1);
	globarr.push(myvar);}
	for(i = 0; i < 6; i++){
			var myvar = construct_piece(200,200,false,0,0,"T",20,20,1);
	globarr.push(myvar);}
	for(i = 0; i < 4; i++){
			var myvar = construct_piece(200,200,false,0,0,"U",20,20,1);
	globarr.push(myvar);}
	for(i = 0; i < 2; i++){
			var myvar = construct_piece(200,200,false,0,0,"V",20,20,4);
	globarr.push(myvar);}
	for(i = 0; i < 2; i++){
			var myvar = construct_piece(200,200,false,0,0,"W",20,20,4);
	globarr.push(myvar);}
	for(i = 0; i < 1; i++){
			var myvar = construct_piece(200,200,false,0,0,"X",20,20,8);
	globarr.push(myvar);}
	for(i = 0; i < 2; i++){
			var myvar = construct_piece(200,200,false,0,0,"Y",20,20,4);
	globarr.push(myvar);}
	for(i = 0; i < 1; i++){
			var myvar = construct_piece(100,100,false,0,0,"Z",20,20,10);
	globarr.push(myvar);}
	for(i = 0; i < 2; i++){
			var myvar = construct_piece(100,100,false,0,0,"BLANK",20,20,0);
	globarr.push(myvar);}
	deal_pieces();
	drawpieces();
}
	  
 function construct_piece(_worldx,_worldy,_has_return_spot,_homex,_homey,_imgval,_wid,_ht,_value)
{
	var _scrabpc = new scrabpc();
	_scrabpc.worldx = _worldx;
	_scrabpc.worldy = _worldy;
	_scrabpc.has_return_spot = false;
	_scrabpc.homex = _homex;
	_scrabpc.homey = _homey;
	_scrabpc.imgval = _imgval;
	img = document.getElementById(_imgval);
	console.log(_imgval);
	_scrabpc.wid = img.naturalWidth;
	_scrabpc.ht = img.naturalHeight;
	console.log('added ' + img.naturalWidth + ' ' + img.naturalHeight);
	_scrabpc.value = _value;
	_scrabpc.unique_tag = assign_unique_tag();
	_scrabpc.onboard = false;
	_scrabpc.wildcard = false;
	if(_scrabpc.imgval == "BLANK"){_scrabpc.wildcard = true;}
	return _scrabpc;
}


	  function drawpieces()
	  {
		  context.clearRect(0, 0, canvas.width, canvas.height);
	  img = document.getElementById("BOARD");
	  context.drawImage(img,0,0);
	  for(i = 0; i < globarrplaced.length; i++)
	  {
		      var drawme = globarrplaced[i];
		      img = document.getElementById(drawme.imgval);
			  if(i != CURR_PIECE)//the physical location of the piece doesnt matter during drag so i offset it this prevents its true location from drawing and hence drawing the piece twice
              {context.drawImage(img, drawme.worldx, drawme.worldy);}
	  }
	  for(i = 0; i < globarrpermonboard.length; i++)
	  {
		      var drawme = globarrpermonboard[i];
		      img = document.getElementById(drawme.imgval);
              context.drawImage(img, drawme.worldx, drawme.worldy);
	  }
	  
	  
	  		  if(CURR_PIECE != NEG_INF)//draw order matters here; do the dragged piece last so it draw on top of static graphics
		  {var draw_drag = globarrplaced[CURR_PIECE];
			img = document.getElementById(draw_drag.imgval);
			context.drawImage(img,draw_drag.worldx-draw_drag.wid/2,draw_drag.worldy-draw_drag.ht/2);}//right now do nothing
			
	  }
	  
	  function click_up_coll(x,y)
	  {
		  img = document.getElementById("BOARD");
		  var boardht = img.naturalHeight;
		  var boardwid = img.naturalWidth;
		  if((x > BOARD_GLOB_POSX && x < BOARD_GLOB_POSX + boardwid)&&(y > BOARD_GLOB_POSY && y < BOARD_GLOB_POSY + boardht))//if we dropped on the board
		  {
			  console.log('hit');
			  var p = get_board_cell(x,y);
			  if(BOARD[p.indx][p.indy].occupied == true)
			  {
				  globarrplaced[CURR_PIECE].worldx = globarrplaced[CURR_PIECE].homex;
				  globarrplaced[CURR_PIECE].worldy = globarrplaced[CURR_PIECE].homey;
				  return false;}
			  if(globarrplaced[CURR_PIECE].imgval == "BLANK")
			  {
				  var assignval = prompt('please enter a value for wildcard tile and choose carefully; this choice canot be undone because a shortcut I took early in the project made reassignment of wildcard values a real hassle');
				  globarrplaced[CURR_PIECE].imgval = assignval;
			  }
			  console.log('setting '+ p.indx + ' ' + p.indy + ' occupied val to true');
			  BOARD[p.indx][p.indy].occupied = true;
			  console.log('assigning '+p.drawx+' and ' + p.drawy + ' to piece world position');
			  if(globarrplaced[CURR_PIECE].onboard == true)//if already on the board have to clear its old spot or you get empty board squares rejecting valid piece drops
			  {
				  var cleanx = globarrplaced[CURR_PIECE].boardx;
				  var cleany = globarrplaced[CURR_PIECE].boardy;
				  BOARD[cleanx][cleany].occupied = false;
				  
			  }
			  globarrplaced[CURR_PIECE].worldx = p.drawx;
			  globarrplaced[CURR_PIECE].worldy = p.drawy;
			  globarrplaced[CURR_PIECE].boardx = p.indx;
			  globarrplaced[CURR_PIECE].boardy = p.indy;
			  console.log('the currently active piece x and y values: ' + globarrplaced[CURR_PIECE].worldx + ' '+ globarrplaced[CURR_PIECE].worldy);
			  if(globarrplacedonboard.length == 0)
			  {
				  globarrplaced[CURR_PIECE].onboard = true;
				  globarrplacedonboard.push(globarrplaced[CURR_PIECE]);
			  }
			  else{
			  if(globarrplaced[CURR_PIECE].onboard == false)
			  {
				  globarrplaced[CURR_PIECE].onboard = true;
				  globarrplacedonboard.push(globarrplaced[CURR_PIECE]);
		  }
			  }
			  return true;//:)
			  }
			  
		  if(globarrplaced[CURR_PIECE].onboard == true)
		  {
			  var matchme = globarrplaced[CURR_PIECE].unique_tag;//my shitty hashing scheme paid off
			  for(i = 0; i < globarrplacedonboard.length; i++)
			  {
				  if(matchme == globarrplacedonboard[i].unique_tag)
				  {globarrplacedonboard.splice(i,1);
					globarrplaced[CURR_PIECE].onboard = false;
									  globarrplaced[CURR_PIECE].worldx = globarrplaced[CURR_PIECE].homex;
				  globarrplaced[CURR_PIECE].worldy = globarrplaced[CURR_PIECE].homey;
				  var cleanx = globarrplaced[CURR_PIECE].boardx;//i call these cleab because otherwise i dump a giant ugly global var into each indice of a 2dim array
				  var cleany =globarrplaced[CURR_PIECE].boardy;
				  BOARD[cleanx][cleany].occupied = false;
				  return false;
					}
		  }
		  }
		  var rect = canvas.getBoundingClientRect();
		  if((x > TRAY_START && x < TRAY_START + AVG_IMG_WID * PIECES_IN_TRAY)&&(y > rect.bottom - AVG_IMG_HT))
		  {console.log('HIT');
			for(i = 0; i < globarrplaced.length; i++)
			{
				if(i != CURR_PIECE)//dont collide with myself
				{
				if((x > globarrplaced[i].worldx && x < globarrplaced[i].worldx + globarrplaced[i].wid)&&(y > globarrplaced[i].worldy && y < globarrplaced[i].worldy + globarrplaced[i].ht)){
					var homexhold = globarrplaced[i].homex;
					var homeyhold = globarrplaced[i].homey;
					globarrplaced[i].homex = globarrplaced[CURR_PIECE].homex;
					globarrplaced[i].homey = globarrplaced[CURR_PIECE].homey;
					globarrplaced[i].worldx = globarrplaced[CURR_PIECE].homex;
					globarrplaced[i].worldy = globarrplaced[CURR_PIECE].homey;
					globarrplaced[CURR_PIECE].homex = homexhold;
					globarrplaced[CURR_PIECE].homey = homeyhold;
					globarrplaced[CURR_PIECE].worldx = homexhold;
					globarrplaced[CURR_PIECE].worldy = homeyhold;
					
					
					}					
				}
			}
			
			
			}
		  return false;
	  }
	  
	  
	  function click_down_coll(x,y)//is this x,y point in the bounds of one of the pieces?
	  {
		  img = document.getElementById("BOARD");
		  var boardht = img.naturalHeight;
		  var boardwid = img.naturalWidth;
		  if((x > BOARD_GLOB_POSX && x < BOARD_GLOB_POSX + boardwid)&&(y > BOARD_GLOB_POSY && y < BOARD_GLOB_POSY + boardht))
		  {console.log('hit');
			get_board_cell(x,y);
			}
		  for(i = 0; i < globarrplaced.length; i++)
		  {
			  var mypt = globarrplaced[i];
			  var extentx = mypt.worldx + mypt.wid;
			  var extenty = mypt.worldy + mypt.ht;
			  console.log('testing mouse ' + x + ' ' + y + ' against ' + mypt.worldx + ' ' + mypt.worldy + ' with wid and ht: ' + mypt.wid + ' ' + mypt.ht);
			  console.log('is ' + x + ' greater than ' + mypt.worldx + ' and is it less than ' + (mypt.x + x.wid));
				if((x > mypt.worldx && x < extentx)&&(y > mypt.worldy && y < extenty))
				{
					console.log('hullo');
					CURR_PIECE = i;
					console.log('CURR_PIECE is now ' + CURR_PIECE);
					return {hit:true};
					}
		  }
		  return {hit:false};
	  }

      function getrelativeposition(canvas,evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top//vectorization takes us from screen to canvas space
		  
        };
      }
	  
	  
	  function assign_unique_tag()
	  {
		  console.log('assigning unique tag: ' + GLOB_UNIQUE_TAG);
		  return GLOB_UNIQUE_TAG++;
	  }
	  
	  function deal_piece()
	  {
		  if(globarr.length == 0)
		  {alert('OUT OF PIECES TO DEAL');
			return;}
		  indice = Math.floor((Math.random() * globarr.length));
		  var deal_piece = globarr[indice];
		  globarr.splice(indice,1);
		  console.log('deal_piece is: '+deal_piece);
		  return deal_piece;
		
	  }
	  
	  function new_hand()//take 0-7 unplaced pieces, dump them in back in the allocation queue and randomly select 7 more. pieces which were on the scrabble board have to unregister (tell the board it its x y index to tell the application that the piece is gone) such that we don't get phantom occupation where an empty square rejects dropped pieces. this is further complicated by my murky data structure where globarrplaced == in the tray and globarrplacedonboard == on the board but is STILL present in globarrplaced because I was lazy and didnt want to change the code where I loop through and draw all pieces by drawing globarrplaced.
	  {
		for(i = 0; i < globarrplacedonboard.length; i++)//have to unregister all active pieces from board or else we get a phantom occupation scenario where an empty square eternally rejects valid piece drops  
		{
			var cleanx = globarrplacedonboard[i].boardx;
			var cleany = globarrplacedonboard[i].boardy;
			BOARD[cleanx][cleany].occupied = false;
		}
				if(globarrplacedonboard.length != 0)
			  {globarrplacedonboard.splice(0,globarrplacedonboard.length);}
		  for(i = 0; i < globarrplaced.length; i++)//dump them back into the pool
		  {
			  var pushit = globarrplaced[i];
			  globarr.push(pushit);
		  }
		if(globarrplaced.length != 0)
			  {globarrplaced.splice(0,globarrplaced.length);}
		  deal_pieces();
		  drawpieces();
	  }
	  
	  function deal_pieces()
	  {
		  var rect = canvas.getBoundingClientRect();
		  for(i = 0; i < PIECES_IN_TRAY; i++)
		  {
			  to_tray = deal_piece();
			  //to_tray.worldx = TRAY_START + i*to_tray.wid;
			  to_tray.worldx = TRAY_START + i*AVG_IMG_WID;
			  console.log('actual piece width on iteration ' + i + ' is: '+to_tray.wid);
			  to_tray.worldy = (rect.bottom - rect.top) - to_tray.ht;
			  to_tray.homex = to_tray.worldx;
			  to_tray.homey = to_tray.worldy;
			  globarrplaced.push(to_tray);
		  }
	  }
	  
	  function get_board_cell(x,y)
	  {
		 /*The image object is going to have a ht/wid. Since it is a square board ht = wd. the ht = wid = TOTAL_PIXEL_EXTENT. The subdivision length is TOTAL_PIXEL_EXTENT/NUM_SUBDIVISIONS. When I click on the canvas, first use the entire image object as a bounding box. This is an aabb so hella trivial: (x > = xmax && x <= xmin) && (y >= ymax || <= ymin). Now we utilize integer division (being careful since js is weakly typed and cannot be counted upon to discard the mantissa: the number of sibdivision lengths that go into the x pos clicked upon (dropping, once again, the mantissa) will give the x indice in "checkerboard space". I am not sure that this is the best way to do this but it is nice and does not require measuring the actual graphic. */
		  img = document.getElementById("BOARD");
		  var boardht = img.naturalHeight;
		  var boardwid = img.naturalWidth;
		  
		  var pixelspersquarex = boardwid / BOARD_SUBDIVISIONS;
		  var pixelspersquarey = boardht / BOARD_SUBDIVISIONS;
		  console.log('pixels per x,y: ' + pixelspersquarex + ' ' + pixelspersquarey);
		  var calcboardx = x / pixelspersquarex;
		  var calcboardy = y / pixelspersquarey;
		  console.log('calculated board cell: '+calcboardx +' '+ calcboardy);
		  calcboardx = Math.floor(calcboardx);
		  calcboardy = Math.floor(calcboardy);
		  console.log('after floor: '+calcboardx +' '+ calcboardy);
		  
                  return {
          indx: calcboardx,
          indy: calcboardy,
		  drawx: (calcboardx*pixelspersquarex) + BOARD_GLOB_POSX,
		  drawy: (calcboardy*pixelspersquarey) + BOARD_GLOB_POSY
		  };//and last but not least the formula for placing the piece is just (calcboardx*pixelspersquarex) + BOARD_GLOB_POSX 
	  }
	  
	  function validate_pieces()//validates the current pieces on the board returns true if they are all contiguous on an x or y axis otherwise false
	  {
		  //this is a neat way to get out of nasty "if_first_time_check_center" branching: if the canter is empty, trivially reject
		  if(BOARD[7][7].occupied == false)
		  {alert('must start with a piece in the center');
			return false;}
		  if(globarrplacedonboard.length == 0)//trivial rejection nothing to validate
		  {console.log('arr is empty nothing to validate');
			return false;}
		  //trivial rejection: x and y are variant
		  var xvaries = false;
		  var yvaries = false;
		  var matchx = globarrplacedonboard[0].boardx;
		  var matchy = globarrplacedonboard[0].boardy;
		  
		  for(ii = 1; ii < globarrplacedonboard.length; ii++)
		  {
			  if(globarrplacedonboard[ii].boardx != matchx)
			  {xvaries = true;}
		      if(globarrplacedonboard[ii].boardy != matchy)
			  {yvaries = true;}
			  matchx =globarrplacedonboard[ii].boardx;
			  matchy =globarrplacedonboard[ii].boardy; 
		  }
		  
		  if(xvaries == true && yvaries == true)//trivially false
		  {
			  console.log('trivially false both x and y vary');
			  return false;}
		 var nullval = 0; 
		 var searchval;
		 var match;

		  //JUST ON X AXIS FOR NOW
		  if(xvaries){
			  nullval = 0;
			  console.log('invariant along y');
		  console.log('searchval is ' + searchval);
		  for(i = 0; i < globarrplacedonboard.length; i++)
		  {
			  console.log('i is: '+i);
			  searchval = Math.floor(globarrplacedonboard[i].boardx + 1);
			  match = false;
			  console.log('prerparing to test ' + globarrplacedonboard[i].imgval + ' using searchval ' + searchval);
			  for(j = 0; j < globarrplacedonboard.length; j++)
			  {
		
				  if(j != i)//dont collide the piece with itself, once again
				  {
				
					  if(searchval === globarrplacedonboard[j].boardx)
					  {
		
						  match = true;}
						  }
			  }
			  //now do the same thing with any permanently placed pieces...
			  for(j = 0; j < globarrpermonboard.length; j++)
			  {
				console.log('j is: '+j);
				  
					 
					  if(searchval === globarrpermonboard[j].boardx)
					  {
						  console.log(globarrpermonboard[i].imgval + ' has a neighbor at boardx value ' + searchval);
						  match = true;}
						  
			  }
			  if(match == false) {nullval = nullval + 1;}
			  if(nullval > 1) {
				  console.log('returning false; nullval value is: ' + nullval);
				  i = 0;
				  j = 0;
				  return false;}
			  
		  }
		  console.log('returning true');
		  i=0;
		  j=0;//javascript = leaky piece of crap
		  //
		  //
		  //INSERTION POINT: WE MUST FIND A VALID NEIGHBOR ON A +/- X/Y VAL OF ONE OF THE TEST PIECES THAT IS 
		  //
		  //
		  //first: see if any of globarrplacedonboard has boardx == boardy == 7; if so this is the first runthrough and we may proceed
		  for(i = 0; i < globarrplacedonboard.length; i++)
		  {
			  if(globarrplacedonboard[i].boardx == 7 && globarrplacedonboard[i].boardy == 7)
			  {
				  		  assemble_test_stringx();
						  dump_onto_board();//we need new pieces and to add to our permanent board array
		                  return true;
			  }
		  }
		  //if we are here at least one round of tiles has been accepted onto the board
		  for(i = 0; i < globarrplacedonboard.length; i++)
		  {
			  var cleanx = globarrplacedonboard[i].boardx; 
			  var cleany = globarrplacedonboard[i].boardy; 
			  for(j = 0; j < globarrpermonboard.length; j++)
			  {
				  var cleanxj = globarrpermonboard[j].boardx;
				  var cleanyj = globarrpermonboard[j].boardy;
	
				  //test for a neighbor in coords: x+1,y x-1,y x,y+1 x,y-1 iff (x >= 0 && x <= 14) && (y >= 0 && y<=14)
				  if(cleanx<14)
				  {
					  if(cleanx+1 == cleanxj && cleany == cleanyj)
					  {console.log('valid perm placed neighbor at '+ cleanxj +' '+ cleanyj);}
					  }
				  if(cleanx>0)
				  {
					  if(cleanx-1 == cleanxj && cleany == cleanyj)
					  {console.log('valid perm placed neighbor at '+ cleanxj +' '+ cleanyj);}
					  }
				  if(cleany<14)
				  {
					  if(cleanx == cleanxj && cleany+1 == cleanyj)
					  {console.log('valid perm placed neighbor at '+ cleanxj +' '+ cleanyj);}
					  }
				  if(cleany>0)
				  {
					  if(cleanx == cleanxj && cleany-1 == cleanyj)
					  {console.log('valid perm placed neighbor at '+ cleanxj +' '+ cleanyj);}
					  }
			  }
		  }
		  
		  assemble_test_stringx();
		  dump_onto_board();//we need new pieces and to add to our permanent board array
		  return true;
		  }
		  
		  		  if(yvaries){
					  console.log('invariant down y');
		  console.log('searchval is ' + searchval);
		  nullval = 0;
		  for(i = 0; i < globarrplacedonboard.length; i++)
		  {
			  console.log('i is: '+i);
			  searchval = Math.floor(globarrplacedonboard[i].boardy + 1);
			  match = false;
			  console.log('prerparing to test ' + globarrplacedonboard[i].imgval + ' using searchval ' + searchval);
			  for(j = 0; j < globarrplacedonboard.length; j++)
			  {
			
				  if(j != i)//dont collide the piece with itself, once again
				  {
					  
					  if(searchval === globarrplacedonboard[j].boardy)
					  {
						 
						  match = true;}
						  }
			  }
			  
			  			  for(j = 0; j < globarrpermonboard.length; j++)
			  {
				console.log('j is: '+j);
				  
					  
					  if(searchval === globarrpermonboard[j].boardy)
					  {
						  console.log(globarrpermonboard[i].imgval + ' has a neighbor at boardy value ' + searchval);
						  match = true;}
						  
			  }
			  
			  if(match == false) {nullval = nullval + 1;}
			  if(nullval > 1) {
				  console.log('returning false; nullval value is: ' + nullval);
				  i = 0;
				  j = 0;
				  return false;}
			  
		  }
		  console.log('returning true');
		  i=0;
		  j=0;
		  //
		  //
		  //INSERTION POINT: WE MUST FIND A VALID NEIGHBOR ON A +/- X/Y VAL OF ONE OF THE TEST PIECES THAT IS 
		  //
		  //
		  assemble_test_stringy();
		  dump_onto_board();
		  return true;
		  }
	  }
	  
	  function assemble_test_stringx()
	  {
		  var outputstr = '';
	      var ht = globarrplacedonboard[0].boardy;//all ys are equal if we are here so any one of the array will do
		  for(i = 0; i < BOARD_SUBDIVISIONS; i++)
		  {
			 
			  if(BOARD[i][ht].occupied == true)
			  {
				  
				for(j = 0; j < globarrplacedonboard.length; j++)//yes i was too lazy to change data structures at this point so i brute force search the indices  
				{
					if(globarrplacedonboard[j].boardx == i)
					{outputstr = outputstr + globarrplacedonboard[j].imgval;}
				}
			  }
			  
			  }
		 console.log(outputstr);
		 console.log('score is: '+ scorecurr(globarrplacedonboard));
	  }
	  
	  function assemble_test_stringy()
	  {
		  var outputstr = '';
	      var wid = globarrplacedonboard[0].boardx;//all ys are equal if we are here so any one of the array will do
		  for(i = 0; i < BOARD_SUBDIVISIONS; i++)
		  {
			 
			  if(BOARD[wid][i].occupied == true)
			  {
				  
				for(j = 0; j < globarrplacedonboard.length; j++)//yes i was too lazy to change data stuctures at this point so i brute force search the indices  
				{
					if(globarrplacedonboard[j].boardy == i)
					{outputstr = outputstr + globarrplacedonboard[j].imgval;}
				}
			  }
			  
			  }
		 console.log(outputstr);
		 var score = scorecurr(globarrplacedonboard);
		 console.log('score is: ' + score);
		 dump_onto_board();
	  }
	  
	  function dictionary_check(str)
	  {return true;}
	  
	  function flush_by_unique_id(id)//todo: search for the piece by unique id in globarrplaced and globarrplacedonboard and dump it from both
	  {;}
	  
	  function scorecurr(piecelist)//going to push onto an array and score it
	  {
		  var currscore = 0;
		  var wordmod = 1;//identity
		  for(i=0;i<piecelist.length;i++)
		  {
			  var cleanx = piecelist[i].boardx;
			  var cleany = piecelist[i].boardy;
			  //p = function(score,occupied){return {score: this.score, occupied: this.occupied, wholeword: this.wholeword}};
			  if(!BOARD[cleanx][cleany].wholeword)//if this bonus does not apply to the whole word
			  {currscore = currscore + (piecelist[i].value*BOARD[cleanx][cleany].score);}
			  else{wordmod = wordmod * BOARD[cleanx][cleany].score;
			  console.log('multiplied wordmod by ' +BOARD[cleanx][cleany].score);
			  currscore = currscore + piecelist[i].value;}//dont forget to add the piece's value
			  
			  
		  }
		  console.log(wordmod);
		  currscore = currscore * wordmod;
		  return currscore;
	  }
	  
	  function dump_onto_board()
	  {
		  //steps: 1. loop through globarrplacedonboard and remove it from globarrplaced
		  //2. copy each element of globarrplacedonboard into a var and copy that var into globarrpermonboard
		  //3. destroy all traces of pieces in globarrplacedonboard
		  //4. deal out 7-globarrplaced many pieces and then assign them to the tray
		  //redraw
		  var arraycopvar = new Array();
		  for(i = 0; i < globarrplacedonboard.length; i++)
		  {
			  var copyvar;
			  copyvar = globarrplacedonboard[i];
			  globarrpermonboard.push(copyvar);
			  console.log('allegedley assigned ' +globarrpermonboard[0]);
		  }
		  globarrplacedonboard.splice(0,globarrplacedonboard.length);
		  
		 for(i = 0; i < globarrplaced.length; i++)
		 {
			 if(globarrplaced[i].onboard == false)
			 {var copy = globarrplaced[i];
				arraycopvar.push(copy);}
		 }
		 globarrplaced.splice(0,globarrplaced.length);
		 globarrplaced = arraycopvar;
		 
		 var piecesneeded = PIECES_IN_TRAY - globarrplaced.length;
		 
		 for(i = 0; i < piecesneeded; i++)
		 {
			 globarrplaced.push(deal_piece());
		 }
		 console.log('globarrplaced length is now: '+ globarrplaced);
		 var rect = canvas.getBoundingClientRect;
		 for(i=0; i < globarrplaced.length; i++)
		 {
			  globarrplaced[i].worldx = TRAY_START + i*AVG_IMG_WID;
			  globarrplaced[i].worldy = 849.5;
			  globarrplaced[i].worldy = 849.5;
			  globarrplaced[i].homex = globarrplaced[i].worldx;
			  globarrplaced[i].homey = globarrplaced[i].worldy;
		 }
		  
		  //refresh
		  drawpieces();
	  }
	  
	  function get_initial_x(x,y)//walks left from this occupied spot on board until next leftmost square is empty or off the board and returns that occupied square
	  {;}
	  
	  function get_initail_y(x,y)
	  {;}
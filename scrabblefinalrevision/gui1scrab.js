/*
Christopher Marinos christopher_marinos@student.uml.edu student, GUI1, UMASS Lowell, Fall 2016. Homework 9/9, implement scrabble. This is the brains of the application. It handles collision detection for both clickups and clickdowns, manages state so that pieces do not forget where they are and so that 
*/
//List of globals. I feel more free to use globals in a game design situation.
 var scrabpc = function(worldx,worldy,has_return_spot,homex,homey,imgval,wid,ht,unique_tag,value) {return {worldx: this.worldx, worldy:this.worldy, has_return_spot: this.has_return_spot, homex:this.homex, homey:this.homey, imgval:this.imgval, wid:this.wid, ht:this.ht, unique_tag:this.unique_tag, value:this.value, boardx: this.boardx, boardy: this.boardy, onboard: this.onboard, wildcard: this.wildcard,wordx: this.wordx, wordy: this.wordy}};
 
 var globarr;//ALL pieces.
 var globarrplaced;//all PLACED pieces, whether on board or in tray.
 var globarrplacedonboard;//All pieces placed on board that havent been scored yet.
 var globarrpermonboard;//these have been scored and are forever on the board
 var GLOB_UNIQUE_TAG = 0;//really really REALLY bad way to assign unique values to pieces so that I can push/pop out of glob arr without losing track of whatever currently selected piece i may have
 var MOUSEDOWN = false;//you need something like this in drag-drop otherwise things get stuck to the pointer
 var TRAY_START = 990;//adjusting this adjusts the piece tray +/- along the x axis
 var AVG_IMG_WID = 57;//i cut the pieces by hand and use this to minimize staggering
 var AVG_IMG_HT = 54;
 var BOARD_GLOB_POSX = 0;//global pos of scrabble board, x
 var BOARD_GLOB_POSY = 0;//global pos, y
 var BOARD_SUBDIVISIONS = 15;//num squares, no need for x or y signifiers cause square
 var BOARD;//double barrel array for board info
 var RUNNING_TALLY = 0;//score
 

var PIECES_IN_TRAY = 7;//number of pieces
var NEG_INF = -9999;//an impossible indice; -1 would suffice but i learned the +/-inf thing in graphics programming and like to use it. This is used to see if i am dragging anything (ie is the currently dragged piece -9999? Then I am not dragging)
var CURR_PIECE = NEG_INF;//the way this works is that if a piece is dragging then its indice number will be in CURR_PIECE which is why you see a lot of piecearr[CURR_PIECE]; and if(CURRPIECE != NEG_INF) (dosomething) in the code.
var canvas;//javascript drawing stuff
var context;
var img;//used to point to and draw board, tiles
	  
function test_func(){//was originally a test function but it really turned into the function which inits all scrabble pieces
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
	  
 function construct_piece(_worldx,_worldy,_has_return_spot,_homex,_homey,_imgval,_wid,_ht,_value){
    var _scrabpc = new scrabpc();
    _scrabpc.worldx = _worldx;
    _scrabpc.worldy = _worldy;
    _scrabpc.has_return_spot = false;
    _scrabpc.homex = _homex;
    _scrabpc.homey = _homey;
    _scrabpc.imgval = _imgval;
    img = document.getElementById(_imgval);//This is used to both draw the piece and to refer to it when constructing a string
    console.log(_imgval);
    _scrabpc.wid = img.naturalWidth;//actual x val on screen
    _scrabpc.ht = img.naturalHeight;//actual y val on screen
    console.log('added ' + img.naturalWidth + ' ' + img.naturalHeight);//this app gets very chatty in the console; it was the only way it was finished on time.
    _scrabpc.value = _value;
    _scrabpc.unique_tag = assign_unique_tag();//early on I decided to assign a unique number to each piece; this was a life saver in certain key points when I had to match pieces between arrays or figure out which piece I was referring to given scant evidence.
    _scrabpc.onboard = false;
    _scrabpc.wildcard = false;//special case for wildcard tile
    if(_scrabpc.imgval == "BLANK"){_scrabpc.wildcard = true;}
    return _scrabpc;
}


function drawpieces(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    img = document.getElementById("BOARD");
    context.drawImage(img,0,0);
        for(i = 0; i < globarrplaced.length; i++){
            var drawme = globarrplaced[i];
            img = document.getElementById(drawme.imgval);
            if(i != CURR_PIECE){context.drawImage(img, drawme.worldx, drawme.worldy);}
	      }
        for(i = 0; i < globarrpermonboard.length; i++){
            var drawme = globarrpermonboard[i];
            img = document.getElementById(drawme.imgval);
            context.drawImage(img, drawme.worldx, drawme.worldy);
          }
	  
	  
        if(CURR_PIECE != NEG_INF){
            var draw_drag = globarrplaced[CURR_PIECE];
            img = document.getElementById(draw_drag.imgval);
            context.drawImage(img,draw_drag.worldx-draw_drag.wid/2,draw_drag.worldy-draw_drag.ht/2);}//right now do nothing
			
	  }
	  //click_up_coll is a doozy: everything that happens as a result of dropping a piece is here
function click_up_coll(x,y){
    img = document.getElementById("BOARD");//draw the board first; painter's algorithm is used here because this is very basic, graphics wise
    var boardht = img.naturalHeight;
    var boardwid = img.naturalWidth;
    if((x > BOARD_GLOB_POSX && x < BOARD_GLOB_POSX + boardwid)&&(y > BOARD_GLOB_POSY && y < BOARD_GLOB_POSY + boardht)){
        console.log('hit');//once again, console chattiness was a lifesaver here
        var p = get_board_cell(x,y);//use integer division to get the cell of the board without ever having had to chop up said board
        if(BOARD[p.indx][p.indy].occupied == true)
            if(globarrplaced[CURR_PIECE].boardx == p.indx && globarrplaced[CURR_PIECE].boardy == p.indy){console.log('ERROR IS HERE');}//this was causing the error where picking up a piece from the board and dropping it back to the same square returned the piece to the tray and left it board square forever unoccupiable (which is a real game killer if done with the center square). What I had not anticipated was that this would (it seems) successfully return the piece to where it was supposed to go, no harm done.
            else{
                globarrplaced[CURR_PIECE].worldx = globarrplaced[CURR_PIECE].homex;
                globarrplaced[CURR_PIECE].worldy = globarrplaced[CURR_PIECE].homey;
                return false;}
            if(globarrplaced[CURR_PIECE].imgval == "BLANK"){
                var assignval = prompt('please enter a value for wildcard tile and choose carefully; this choice canot be undone because a shortcut I took early in the project made reassignment of wildcard values a real hassle. Additionally please only enter A-Z for the value (capitalization matters)');//I think the fact it was this easy to include a wildcard piece shows I made at least some correct choices in the design
                globarrplaced[CURR_PIECE].imgval = assignval;//it stays scored as blank; i think this is per rules of scrabble
			  }
			console.log('setting '+ p.indx + ' ' + p.indy + ' occupied val to true');
			BOARD[p.indx][p.indy].occupied = true;//square is off limits to piece drops now
			console.log('assigning '+p.drawx+' and ' + p.drawy + ' to piece world position');
            if(globarrplaced[CURR_PIECE].onboard == true){
                var cleanx = globarrplaced[CURR_PIECE].boardx;
                var cleany = globarrplaced[CURR_PIECE].boardy;
                BOARD[cleanx][cleany].occupied = false;//square can be dropped on, all clear
				  }
            globarrplaced[CURR_PIECE].worldx = p.drawx;
            globarrplaced[CURR_PIECE].worldy = p.drawy;
            globarrplaced[CURR_PIECE].boardx = p.indx;
            globarrplaced[CURR_PIECE].boardy = p.indy;
            console.log('the currently active piece x and y values: ' + globarrplaced[CURR_PIECE].worldx + ' '+ globarrplaced[CURR_PIECE].worldy);
			if(globarrplacedonboard.length == 0){
                globarrplaced[CURR_PIECE].onboard = true;
				globarrplacedonboard.push(globarrplaced[CURR_PIECE]);
			  }
            else{
                if(globarrplaced[CURR_PIECE].onboard == false){
                    globarrplaced[CURR_PIECE].onboard = true;
				    globarrplacedonboard.push(globarrplaced[CURR_PIECE]);
		  }
			  }
			    return true;//:)
			  }
			  
		  if(globarrplaced[CURR_PIECE].onboard == true){
			  var matchme = globarrplaced[CURR_PIECE].unique_tag;//I didn't often have to refer to pieces by unique values but I am very happy I included the ability to do so early in the project.
			  for(i = 0; i < globarrplacedonboard.length; i++){
				  if(matchme == globarrplacedonboard[i].unique_tag)
				  {globarrplacedonboard.splice(i,1);//it isn't on the board any longer; take it OUT of this array
					globarrplaced[CURR_PIECE].onboard = false;
					globarrplaced[CURR_PIECE].worldx = globarrplaced[CURR_PIECE].homex;
				  globarrplaced[CURR_PIECE].worldy = globarrplaced[CURR_PIECE].homey;
				  var cleanx = globarrplaced[CURR_PIECE].boardx;//i call these clean because otherwise i dump a giant ugly global var into each indice of a 2dim array; I use this signifier elsewhere in the code.
				  var cleany =globarrplaced[CURR_PIECE].boardy;
				  BOARD[cleanx][cleany].occupied = false;
				  return false;
					}
		  }
		  }
		  var rect = canvas.getBoundingClientRect();
		  if((x > TRAY_START && x < TRAY_START + AVG_IMG_WID * PIECES_IN_TRAY)&&(y > rect.bottom - AVG_IMG_HT)){
            console.log('HIT');
			for(i = 0; i < globarrplaced.length; i++){
                if(i != CURR_PIECE){
				if((x > globarrplaced[i].worldx && x < globarrplaced[i].worldx + globarrplaced[i].wid)&&(y > globarrplaced[i].worldy && y < globarrplaced[i].worldy + globarrplaced[i].ht)){//if hit
					var homexhold = globarrplaced[i].homex;
					var homeyhold = globarrplaced[i].homey;
					globarrplaced[i].homex = globarrplaced[CURR_PIECE].homex;
					globarrplaced[i].homey = globarrplaced[CURR_PIECE].homey;
					globarrplaced[i].worldx = globarrplaced[CURR_PIECE].homex;
					globarrplaced[i].worldy = globarrplaced[CURR_PIECE].homey;
					globarrplaced[CURR_PIECE].homex = homexhold;
					globarrplaced[CURR_PIECE].homey = homeyhold;
					globarrplaced[CURR_PIECE].worldx = homexhold;
					globarrplaced[CURR_PIECE].worldy = homeyhold;//make sure to reset the home var (where the piece gets dropped if it fails to land properly)
					
					
					}					
				}
			}
			
			
			}
		  return false;
	  }
	  
	  //click down coll is much easier; doesnt get into game mechanics really just where did i get it from, what structures need to know that I am being dragged
	  function click_down_coll(x,y){
		  img = document.getElementById("BOARD");//grab the exact board ht, wid from the actual image; don't count on it not changing
		  var boardht = img.naturalHeight;
		  var boardwid = img.naturalWidth;
		  if((x > BOARD_GLOB_POSX && x < BOARD_GLOB_POSX + boardwid)&&(y > BOARD_GLOB_POSY && y < BOARD_GLOB_POSY + boardht))//typical 2d static collision check
		  {console.log('hit');
			get_board_cell(x,y);
			}
		  for(i = 0; i < globarrplaced.length; i++)//which one did we hit? check through globarrplaced to find out
		  {
			  var mypt = globarrplaced[i];
			  var extentx = mypt.worldx + mypt.wid;
			  var extenty = mypt.worldy + mypt.ht;
			  console.log('testing mouse ' + x + ' ' + y + ' against ' + mypt.worldx + ' ' + mypt.worldy + ' with wid and ht: ' + mypt.wid + ' ' + mypt.ht);
			  console.log('is ' + x + ' greater than ' + mypt.worldx + ' and is it less than ' + (mypt.x + x.wid));
				if((x > mypt.worldx && x < extentx)&&(y > mypt.worldy && y < extenty))
				{
					console.log('hullo');
					CURR_PIECE = i;//this is crucial: once currpiece stops being -9999 we draw it wherever the mouse goes
					console.log('CURR_PIECE is now ' + CURR_PIECE);
					return {hit:true};
					}
		  }
		  return {hit:false};
	  }

      function getrelativeposition(canvas,evt) {//this vectorizes so that we have a situation where top left of canvas is 0,0 in coords
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top//vectorization takes us from screen to canvas space
		  
        };
      }
	  
	  
	  function assign_unique_tag()//this two line function saved I don't even know how much hassle
	  {
		  console.log('assigning unique tag: ' + GLOB_UNIQUE_TAG);
		  return GLOB_UNIQUE_TAG++;//it is global and therefore static so we do not get repeats
	  }
	  
	  function deal_piece()//gets a piece from the globarr (main and never touched by graphics) resource pool
	  {
		  if(globarr.length == 0)
		  {alert('OUT OF PIECES TO DEAL');//i did not have time to handle the situation of all 100 pieces being dealt in any pretty way
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
	  
	  function deal_pieces()//straightforward; dump 7 randomly selected pieces into the tray
	  {
		  var rect = canvas.getBoundingClientRect();
		  for(i = 0; i < PIECES_IN_TRAY; i++)
		  {
			  to_tray = deal_piece();
			  //to_tray.worldx = TRAY_START + i*to_tray.wid;
			  to_tray.worldx = TRAY_START + i*AVG_IMG_WID;
			  console.log('actual piece width on iteration ' + i + ' is: '+to_tray.wid);
			  to_tray.worldy = (rect.bottom - rect.top) - to_tray.ht;
			  to_tray.homex = to_tray.worldx;//this needs to be set to current pos or else they vanish ot go somewhere undesirble on a bad drop
			  to_tray.homey = to_tray.worldy;
			  globarrplaced.push(to_tray);//and pack it onto the draw array
		  }
	  }
	  
	  function get_board_cell(x,y)
	  {
		 /*The image object is going to have a ht/wid. Since it is a square board ht = wd. the ht = wid = TOTAL_PIXEL_EXTENT. The subdivision length is TOTAL_PIXEL_EXTENT/NUM_SUBDIVISIONS. When I click on the canvas, first use the entire image object as a bounding box. This is an aabb so hella trivial: (x > = xmax && x <= xmin) && (y >= ymax || <= ymin). Now we utilize integer division (being careful since js is weakly typed and cannot be counted upon to discard the mantissa: the number of sibdivision lengths that go into the x pos clicked upon (dropping, once again, the mantissa) will give the x indice in "checkerboard space". I am not sure that this is the best way to do this but it is nice and does not require chopping up the board graphic meaning less work so I like this method. */
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
	//validates the current pieces on the board returns true if they are all contiguous on an x or y axis otherwise false  
	  function validate_pieces(){
		  //this is a neat way to get out of nasty "if_first_time_check_center" branching: if the canter is empty, trivially reject. PS the center square first problem is way tricker than I'd first anticipated.
		  if(BOARD[7][7].occupied == false)//naughty and using magic numbers here
		  {alert('must start with a piece in the center');
			return false;}
		  if(globarrplacedonboard.length == 0)//trivial rejection nothing to validate
		  {console.log('arr is empty nothing to validate');
		  alert('You have not placed any pieces this round');
			return false;}
		  //trivial rejection: x and y are variant
		  var xvaries = false;
		  var yvaries = false;
		  var matchx = globarrplacedonboard[0].boardx;
		  var matchy = globarrplacedonboard[0].boardy;
		  //we need to check for several things and x vs y axis variance is important
		  for(ii = 1; ii < globarrplacedonboard.length; ii++){
			  if(globarrplacedonboard[ii].boardx != matchx){xvaries = true;}
		      if(globarrplacedonboard[ii].boardy != matchy){yvaries = true;}
			  matchx =globarrplacedonboard[ii].boardx;
			  matchy =globarrplacedonboard[ii].boardy; 
		  }
		  
		  if(xvaries == true && yvaries == true){
			  console.log('trivially false both x and y vary');
			  alert('All pieces must be placed down either the x or y axis');
			  return false;}
			  
		  if(xvaries == false && yvaries == false)//tricky: this means we have a single piece drop
		  {console.log('single piece dropped');
		  xvaries = true;}//unfortunately as of the handin this causes single pieces add to a y axis word to not score correctly. The main assignment is only looking for correct scoring along the x axis, though.
		 var nullval = 0; 
		 var searchval;//we use this to test for neighbors. If we check all tiles, regardless of order, down either x or y axis, a valid x or y placed tile will have only one spot that does not have a piece in its x+1 or y+1 axis that is blank if all its tiles are contiguous.
		 var match;

		  //if on x axis
		  if(xvaries){
			  nullval = 0;
			  console.log('invariant along y');
		  console.log('searchval is ' + searchval);
		  for(i = 0; i < globarrplacedonboard.length; i++){
			  console.log('i is: '+i);
			  searchval = Math.floor(globarrplacedonboard[i].boardx + 1);
			  match = false;//has to be reset each iteration
			  console.log('prerparing to test ' + globarrplacedonboard[i].imgval + ' using searchval ' + searchval);
			  for(j = 0; j < globarrplacedonboard.length; j++){
		
				  if(j != i){
				
					  if(searchval === globarrplacedonboard[j].boardx){
		
						  match = true;}
						  }
			  }
			  //now do the same thing with any permanently placed pieces...
			  for(j = 0; j < globarrpermonboard.length; j++){
				console.log('j is: '+j);
				  
					 
					  if(searchval === globarrpermonboard[j].boardx){
						  console.log(globarrpermonboard[i].imgval + ' has a neighbor at boardx value ' + searchval);
						  match = true;}
						  
			  }
			  if(match == false) {nullval = nullval + 1;}//if this doesn't have a neighbor it can be the end of the line (nullval = 1) but if nullval >1 there is a break in the pieces and this is not a valid entry by the player
			  if(nullval > 1) {
				  console.log('returning false; nullval value is: ' + nullval);
				  i = 0;
				  j = 0;
				  return false;}
			  
		  }
		  console.log('returning true');

		  //first: see if any of globarrplacedonboard has boardx == boardy == 7; if so this is the first runthrough and we may proceed
		  for(i = 0; i < globarrplacedonboard.length; i++){
			  if(globarrplacedonboard[i].boardx == 7 && globarrplacedonboard[i].boardy == 7){
				  console.log('have piece in center');
				  		  assemble_test_stringx();
						  dump_onto_board();//we need new pieces and to add to our permanent board array
		                  return true;
			  }
		  }
		  //if we are here at least one round of tiles has been accepted onto the board
		    //test for a neighbor in coords: x+1,y x-1,y x,y+1 x,y-1 iff (x >= 0 && x <= 14) && (y >= 0 && y<=14)
		  var hasvalidneighbor = false;//use a var so we dont spam return code through the if brackets
		  for(i = 0; i < globarrplacedonboard.length; i++){
			  var cleanx = globarrplacedonboard[i].boardx; 
			  var cleany = globarrplacedonboard[i].boardy; 
			  for(j = 0; j < globarrpermonboard.length; j++){
				  var cleanxj = globarrpermonboard[j].boardx;
				  var cleanyj = globarrpermonboard[j].boardy;
	
				
				  if(cleanx<14){
					  if(cleanx+1 == cleanxj && cleany == cleanyj){
						  console.log('valid perm placed neighbor at '+ cleanxj +' '+ cleanyj);
				  hasvalidneighbor = true;}
					  }
				  if(cleanx>0){
					  if(cleanx-1 == cleanxj && cleany == cleanyj){
						  console.log('valid perm placed neighbor at '+ cleanxj +' '+ cleanyj);
				  hasvalidneighbor = true;}
					  }
				  if(cleany<14){
					  if(cleanx == cleanxj && cleany+1 == cleanyj){
						  console.log('valid perm placed neighbor at '+ cleanxj +' '+ cleanyj);
				  hasvalidneighbor = true;}
					  }
				  if(cleany>0){
					  if(cleanx == cleanxj && cleany-1 == cleanyj){
						  console.log('valid perm placed neighbor at '+ cleanxj +' '+ cleanyj);
				  hasvalidneighbor = true;}
					  }
			  }
		  }
		  
		  if(hasvalidneighbor){
		  assemble_test_stringx();
		  dump_onto_board();//we need new pieces and to add to our permanent board array
		  return true;
		  }
		  
		  console.log('must have a valid neighbor on the board');
		  alert('must have valid neighbor on board');
		  return false;
		  }
		  
		  		  if(yvaries){
					  console.log('invariant down y');
		  console.log('searchval is ' + searchval);
		  nullval = 0;
		  for(i = 0; i < globarrplacedonboard.length; i++){
			  console.log('i is: '+i);
			  searchval = Math.floor(globarrplacedonboard[i].boardy + 1);
			  match = false;
			  console.log('prerparing to test ' + globarrplacedonboard[i].imgval + ' using searchval ' + searchval);
			  for(j = 0; j < globarrplacedonboard.length; j++){
			
				  if(j != i){
					  
					  if(searchval === globarrplacedonboard[j].boardy){
						 
						  match = true;}
						  }
			  }
			  
			  			  for(j = 0; j < globarrpermonboard.length; j++){
				console.log('j is: '+j);
				  
					  
					  if(searchval === globarrpermonboard[j].boardy){
						  console.log(globarrpermonboard[i].imgval + ' has a neighbor at boardy value ' + searchval);
						  match = true;}
						  
			  }
			  
			  if(match == false) {nullval = nullval + 1;}
			  if(nullval > 1) {
				  console.log('returning false; nullval value is: ' + nullval);
				  i = 0;
				  j = 0;
				  alert('not valid: pieces must be contiguous');
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
		    var hasvalidneighbor = false;//use a var so we dont spam return code through the if brackets
		  for(i = 0; i < globarrplacedonboard.length; i++){
			  var cleanx = globarrplacedonboard[i].boardx; 
			  var cleany = globarrplacedonboard[i].boardy; 
			  for(j = 0; j < globarrpermonboard.length; j++){
				  var cleanxj = globarrpermonboard[j].boardx;
				  var cleanyj = globarrpermonboard[j].boardy;
	
				
				  if(cleanx<14){
					  if(cleanx+1 == cleanxj && cleany == cleanyj){
						  console.log('valid perm placed neighbor at '+ cleanxj +' '+ cleanyj);
				  hasvalidneighbor = true;}
					  }
				  if(cleanx>0){
					  if(cleanx-1 == cleanxj && cleany == cleanyj){
						  console.log('valid perm placed neighbor at '+ cleanxj +' '+ cleanyj);
				  hasvalidneighbor = true;}
					  }
				  if(cleany<14){
					  if(cleanx == cleanxj && cleany+1 == cleanyj){
						  console.log('valid perm placed neighbor at '+ cleanxj +' '+ cleanyj);
				  hasvalidneighbor = true;}
					  }
				  if(cleany>0){
					  if(cleanx == cleanxj && cleany-1 == cleanyj){
						  console.log('valid perm placed neighbor at '+ cleanxj +' '+ cleanyj);
				  hasvalidneighbor = true;}
					  }
			  }
		  }
		  
		  if(hasvalidneighbor){
		  assemble_test_stringy();
		  dump_onto_board();//we need new pieces and to add to our permanent board array
		  return true;
		  }
		  
		  		  //
		  //
		  //INSERTION POINT: WE MUST FIND A VALID NEIGHBOR ON A +/- X/Y VAL OF ONE OF THE TEST PIECES THAT IS 
		  //
		  //
		  //first: see if any of globarrplacedonboard has boardx == boardy == 7; if so this is the first runthrough and we may proceed
		  for(i = 0; i < globarrplacedonboard.length; i++){
			  if(globarrplacedonboard[i].boardx == 7 && globarrplacedonboard[i].boardy == 7){
				  console.log('have piece in center');
				  		  
						  assemble_test_stringy();
						  dump_onto_board();//we need new pieces and to add to our permanent board array
		                  return true;
			  }
		  }
		  
		  console.log('must have a valid neighbor on the board');
		  alert('no valid neighbors on board');
		  return false;
		  }
	  }
	  
	  function assemble_test_stringx(){
		  var outputstr = '';
	      var ht = globarrplacedonboard[0].boardy;//all ys are equal if we are here so any one of the array will do
		  for(i = 0; i < BOARD_SUBDIVISIONS; i++){
			 
			  if(BOARD[i][ht].occupied == true){
				  
				for(j = 0; j < globarrplacedonboard.length; j++){
					if(globarrplacedonboard[j].boardx == i)
					{outputstr = outputstr + globarrplacedonboard[j].imgval;}
				}
			  }
			  
			  }
		 console.log('outputstr before combo test is: '+outputstr);
		 var _x = rewindx(globarrplacedonboard[0].boardx,globarrplacedonboard[0].boardy);
		 var scorearr = assemblex(_x,globarrplacedonboard[0].boardy);
		 var score = scorecurr(scorearr);
		 console.log('score is: '+ score);
	  }
	  
	  function assemble_test_stringy(){
		  var outputstr = '';
	      var wid = globarrplacedonboard[0].boardx;//all ys are equal if we are here so any one of the array will do
		  for(i = 0; i < BOARD_SUBDIVISIONS; i++){
			 
			  if(BOARD[wid][i].occupied == true){
				  
				for(j = 0; j < globarrplacedonboard.length; j++)//yes i was too lazy to change data stuctures at this point so i brute force search the indices  
				{
					if(globarrplacedonboard[j].boardy == i)
					{outputstr = outputstr + globarrplacedonboard[j].imgval;}
				}
			  }
			  
			  }
		 console.log(outputstr);
		 //INSERTION/HACK POINT: CALL GETLEFTX ON GLOBARRPLACEDONBOARD THEN CALL ASSEMBLE STRING THEN SCORE IT
		 var _y = rewindy(globarrplacedonboard[0].boardx,globarrplacedonboard[0].boardy);
		 var scorearr = assembley(globarrplacedonboard[0].boardx,_y);
		 var score = scorecurr(scorearr);
		 console.log('score is: ' + score);
		 dump_onto_board();
	  }
	  
	  function dictionary_check(str){return true;}//not yet implemented though I still plan to even though the class is over
	  
	  function flush_by_unique_id(id){;}//todo; not yet implemented
	  
	  function scorecurr(piecelist){//score array
		  var currscore = 0;
		  var wordmod = 1;//identity
		  for(i=0;i<piecelist.length;i++){
			  var cleanx = piecelist[i].boardx;
			  var cleany = piecelist[i].boardy;
			  if(!BOARD[cleanx][cleany].wholeword){currscore = currscore + (piecelist[i].value*BOARD[cleanx][cleany].score);}//apply to letter
			  else{wordmod = wordmod * BOARD[cleanx][cleany].score;//apply to whole word
			  console.log('multiplied wordmod by ' +BOARD[cleanx][cleany].score);
			  currscore = currscore + piecelist[i].value;}//dont forget to add the piece's value
			  
			  
		  }
		  console.log(wordmod);
		  currscore = currscore * wordmod;
		  RUNNING_TALLY = RUNNING_TALLY + currscore;
		  alert('Score value for this word is: '+ currscore);
		  return currscore;
	  }
	  
	  function dump_onto_board(){
		  //steps: 1. loop through globarrplacedonboard and remove it from globarrplaced
		  //2. copy each element of globarrplacedonboard into a var and copy that var into globarrpermonboard
		  //3. destroy all traces of pieces in globarrplacedonboard
		  //4. deal out 7-globarrplaced many pieces and then assign them to the tray
		  //redraw
		  var arraycopvar = new Array();//get ready, we are going to refresh the array
		  for(i = 0; i < globarrplacedonboard.length; i++){
			  var copyvar;
			  copyvar = globarrplacedonboard[i];
			  globarrpermonboard.push(copyvar);
			  console.log('allegedley assigned ' +globarrpermonboard[0]);
		  }
		  globarrplacedonboard.splice(0,globarrplacedonboard.length);//easy way to erase an array
		  
		 for(i = 0; i < globarrplaced.length; i++){
			 if(globarrplaced[i].onboard == false){
				 var copy = globarrplaced[i];
				arraycopvar.push(copy);}
		 }
		 globarrplaced.splice(0,globarrplaced.length);
		 globarrplaced = arraycopvar;
		 
		 var piecesneeded = PIECES_IN_TRAY - globarrplaced.length;//this vector makes sure the correct number of pieces are dealt
		 
		 for(i = 0; i < piecesneeded; i++){
			 globarrplaced.push(deal_piece());
		 }
		 console.log('globarrplaced length is now: '+ globarrplaced);
		 var rect = canvas.getBoundingClientRect;
		 for(i=0; i < globarrplaced.length; i++){
			  globarrplaced[i].worldx = TRAY_START + i*AVG_IMG_WID;
			  globarrplaced[i].worldy = 849.5;
			  globarrplaced[i].worldy = 849.5;
			  globarrplaced[i].homex = globarrplaced[i].worldx;
			  globarrplaced[i].homey = globarrplaced[i].worldy;
		 }
		  
		  //refresh
		  drawpieces();
	  }
	  
	function rewindx(x,y){//given any square, go left until edge of board is hit or until the next left square is empty
		while(1){
			if(x-1 < 0){
				return x;}
			if(BOARD[x-1][y].occupied == false){
				return x;}
		x--;
		}
	}
		
	function rewindy(x,y){//given any square, go up until edge of board is hit or until the next up square is empty
				while(1){
			if(y-1 < 0){
				return y;}
			if(BOARD[x][y-1].occupied == false){
				return y;}
		y--;
		}
	}
	
	function assemblex(x,y){//go from the X value down until the edge of board is hit or not more pieces and put together word
		var piecearr = new Array();
		while(1){
			var addpiece = board_piece_at(x,y);
			piecearr.push(addpiece);
			if(x+1 > 14)
			{return piecearr;}
			if(BOARD[x+1][y].occupied == false){return piecearr;}
			x++;
			}
	}
	
	function assembley(x,y){//go from the Y value down until the edge of board is hit or not more pieces and put together word
				var piecearr = new Array();
		while(1){
			var addpiece = board_piece_at(x,y);
			piecearr.push(addpiece);
			if(y+1 > 14)
			{return piecearr;}
			if(BOARD[x][y+1].occupied == false){return piecearr;}
			y++;
			}
	}
	
	function board_piece_at(x,y){//searches board and returns the piece at this indice; lack of proper hashing makes this costly
		for(i = 0; i < globarrpermonboard.length; i++){
			if(x == globarrpermonboard[i].boardx && y == globarrpermonboard[i].boardy){
			var retvar = globarrpermonboard[i];
			return retvar;}
			
		}
		for(i = 0; i < globarrplacedonboard.length; i++){
			if(x == globarrplacedonboard[i].boardx && y == globarrplacedonboard[i].boardy){
				var retvar = globarrplacedonboard[i];
			return retvar;}
		}
	}
	
	function running_tally()
	{alert('current score total: '+ RUNNING_TALLY);}
window.onload = function() {
    globarr = new Array();
	globarrplaced = new Array();
	globarrplacedonboard = new Array();
	globarrpermonboard = new Array();
	BOARD = new Array(15);
	for(i = 0; i < BOARD.length; i++)
	{BOARD[i] = new Array(15);}
	for(i = 0; i < BOARD.length; i++)
	{
		for(j = 0; j < BOARD.length; j++)
		{
			var p = function(score,occupied,wholeword){return {score: this.score, occupied: this.occupied, wholeword: this.wholeword}};
			p.score = 1;
			p.occupied = false;
			p.wholeword = false;
			BOARD[i][j] = p;
			console.log('TEST board val at ' + i + ',' + j);
		}
		
		
	}
	
	
	BOARD[7][7].wholeword = true;
	BOARD[7][7].score = 2;
	//i am running a bit behind schedule but I do recognize that these scores reflect and if I were not so fatigued I'd have found a more clever way to exploit it
	BOARD[0][0].score =3;
	BOARD[0][0].wholeword = true;
	BOARD[3][0].score =2;
	BOARD[7][0].score =3;
	BOARD[7][0].wholeword = true;
	BOARD[11][0].score =2;
	BOARD[14][0].score =3;
	BOARD[14][0].wholeword = true;
	BOARD[1][1].score =2;
	BOARD[1][1].wholeword = true;
	BOARD[5][1].score =3;
	BOARD[9][1].score =3;
	BOARD[13][1].score =2;
	BOARD[13][1].wholeword = true;
	BOARD[2][2].score =2;
	BOARD[2][2].wholeword = true;
	BOARD[6][2].score =2;
	BOARD[8][2].score =2;
	BOARD[0][3].score =2;
	BOARD[3][3].score =2;
	BOARD[3][3].wholeword = true;
	BOARD[7][3].score =2;
	BOARD[11][3].score =2;
	BOARD[11][3].wholeword = true;
	BOARD[14][3].score =2;
	BOARD[4][4].score =2;
	BOARD[4][4].wholeword = true;
	BOARD[10][4].score =2;
	BOARD[10][4].wholeword = true;
	BOARD[1][5].score =3;
	BOARD[5][5].score =3;
	BOARD[9][5].score =3;
	BOARD[13][5].score =3;
	BOARD[2][6].score =2;
	BOARD[6][6].score =2;
	BOARD[8][6].score =2;
	BOARD[12][6].score =2;
	BOARD[0][7].score =3;
	BOARD[0][7].wholeword = true;
	BOARD[3][7].score =2;
	BOARD[11][7].score =2;
	BOARD[14][7].score =3;
    BOARD[14][7].wholeword = true;	
//so I cut and pasted flipping along the y axis (and yes I could have saved time and done the same along x
    BOARD[0][14].score =3;
	BOARD[0][14].wholeword = true;
	BOARD[3][14].score =2;
	BOARD[7][14].score =3;
	BOARD[7][14].wholeword = true;
	BOARD[1][13].score =2;
	BOARD[1][13].wholeword = true;
	BOARD[5][13].score =3;
	BOARD[9][13].score =3;
	BOARD[13][13].score =2;
	BOARD[13][13].wholeword = true;
	BOARD[2][12].score =2;
	BOARD[2][12].wholeword = true;
	BOARD[6][12].score =2;
	BOARD[8][12].score =2;
	BOARD[0][11].score =2;
	BOARD[3][11].score =2;
	BOARD[3][11].wholeword = true;
	BOARD[7][11].score =2;
	BOARD[11][11].score =2;
	BOARD[11][11].wholeword = true;
	BOARD[14][11].score =2;
	BOARD[4][10].score =2;
	BOARD[4][10].wholeword = true;
	BOARD[10][10].score =2;
	BOARD[10][10].wholeword = true;
	BOARD[1][9].score =3;
	BOARD[5][9].score =3;
	BOARD[9][9].score =3;
	BOARD[13][9].score =3;
	BOARD[2][8].score =2;
	BOARD[6][8].score =2;
	BOARD[8][8].score =2;
	BOARD[12][8].score =2;
	
	
	
	
	console.log('board center val is ' + BOARD[7][7].score);
	var p = $('#imglist');
	p.hide();
    canvas = document.getElementById("myCanvas");
    context = canvas.getContext("2d");
    //img = document.getElementById("A");
    //context.drawImage(img, 100, 100);
	test_func();
}



$( "#canv" ).mousedown(function(event) {
  MOUSEDOWN = true
  console.log(event.clientX + ' ' + event.clientY);
  mypt = getrelativeposition(canvas,event);
  console.log('relativized vars: ' + mypt.x + ',' + mypt.y);
  var p = click_down_coll(mypt.x,mypt.y);
  if(p.hit == true) {console.log('hit');
  drawpieces();}
  if(p.hit == false) {console.log('miss');}
  
  
});

$( "#canv" ).mouseup(function(event) {
  MOUSEDOWN = false;
  console.log('mouseup: ' + event.clientX + ' ' + event.clientY);
  mypt = getrelativeposition(canvas,event);
  console.log('relativized vars: ' + mypt.x + ',' + mypt.y);
  if(CURR_PIECE != NEG_INF)
  {
  if(click_up_coll(mypt.x,mypt.y) == false)
  {	  
   globarrplaced[CURR_PIECE].worldx = globarrplaced[CURR_PIECE].homex;
   globarrplaced[CURR_PIECE].worldy = globarrplaced[CURR_PIECE].homey;
   }
  CURR_PIECE = NEG_INF;
  drawpieces();
  }
});

$( "#canv" ).mousemove(function(event) {
  if(CURR_PIECE == NEG_INF||MOUSEDOWN == false){CURR_PIECE = NEG_INF; return;}//who cares we aren't dragging anything
  console.log('drag: ' + event.clientX + ' ' + event.clientY);
  mypt = getrelativeposition(canvas,event);
  console.log('relativized dragging vars: ' + mypt.x + ',' + mypt.y);
  globarrplaced[CURR_PIECE].worldx = mypt.x;
  globarrplaced[CURR_PIECE].worldy = mypt.y;
  drawpieces();
});

$(document).ready(function() {
    $('#remove-tab').click(function() {
        validate_pieces();
    });
});

$(document).ready(function() {
    $('#new-hand').click(function() {
        new_hand();
    });
});


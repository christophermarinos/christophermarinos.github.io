/*
Christopher Marinos christopher_marinos@student.uml.edu student, GUI1, UMASS Lowell, Fall 2016. Homework 9/9, implement scrabble. 
*/
window.onload = function() {
    globarr = new Array();//prepare the arrays used in this application; as long as push() is used and the programmer promises to never, ever, EVER insert into arrays by indice javascript arrays are a decent solution, in my opinion, at least in this situation.
    globarrplaced = new Array();//either on board or tray, not permanent
    globarrplacedonboard = new Array();//definitely on board
    globarrpermonboard = new Array();//on board forever
    BOARD = new Array(15);//make a double barrel array
    for(i = 0; i < BOARD.length; i++){BOARD[i] = new Array(15);}
    for(i = 0; i < BOARD.length; i++){
        for(j = 0; j < BOARD.length; j++){
            var p = function(score,occupied,wholeword){return {score: this.score, occupied: this.occupied, wholeword: this.wholeword}};
            p.score = 1;//we multiply by this; identity trick to cut out a branch
            p.occupied = false;//do i have a piece on my square here?
            p.wholeword = false;//Is my multiplier applied to the whole word?
            BOARD[i][j] = p;//put it in
            console.log('TEST board val at ' + i + ',' + j);//spammy but nice to see
        }
		
		
    }
	
	//set, by hand, the values: wholeword means its bonus applies to the whole word. score is its multiplier(triple or double)
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
//so I cut and pasted flipping along the y axis (and yes I could have saved time and done the same along x, filling in the center x and y axes by hand, further cutting my workload by half
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
	
	
	
	
    console.log('board center val is ' + BOARD[7][7].score);//console chattiness is crucial for a project this size; errors via alert() lead to programmer fatigue and are clunky
    var p = $('#imglist');//point to the imagelist
    p.hide();//make it non visible
    canvas = document.getElementById("myCanvas");//declare the global vars needed to refer to the canvas, both for draw purposes and to access its rectangle struct
    context = canvas.getContext("2d");//this is not 3d scrabble, fortunately.
    //img = document.getElementById("A");
    //context.drawImage(img, 100, 100);
    test_func();//this used to be the testing function and became the piece distribution function
}



$( "#canv" ).mousedown(function(event) {//mouse hit the canvas if this fires off
    MOUSEDOWN = true//got to have a global or at least a very widely scoped mousedown boolean. I chose global.
    console.log(event.clientX + ' ' + event.clientY);
    mypt = getrelativeposition(canvas,event);
    console.log('relativized vars: ' + mypt.x + ',' + mypt.y);
    var p = click_down_coll(mypt.x,mypt.y);
    if(p.hit == true) {console.log('hit');
    drawpieces();}
    if(p.hit == false) {console.log('miss');}  
});

$( "#canv" ).mouseup(function(event) {//mouseup over the canvas if this fires off
    MOUSEDOWN = false;//Failure to track mousedowns leads to phantom drops and sticky pieces.
    console.log('mouseup: ' + event.clientX + ' ' + event.clientY);
    mypt = getrelativeposition(canvas,event);
    console.log('relativized vars: ' + mypt.x + ',' + mypt.y);
    if(CURR_PIECE != NEG_INF){//if the curr piece is not -9999 we just dropped something somewhere. Respond accordingly.
        if(click_up_coll(mypt.x,mypt.y) == false){//the function returned false; whatever we were trying to do was rejected, piece goes home	  
           globarrplaced[CURR_PIECE].worldx = globarrplaced[CURR_PIECE].homex;
           globarrplaced[CURR_PIECE].worldy = globarrplaced[CURR_PIECE].homey;
           }
    CURR_PIECE = NEG_INF;//whether we dropped or not it cannot hurt to set back to -9999 after this call
    drawpieces();//update
  }
});

$( "#canv" ).mousemove(function(event) {//drag; not a very drag intensive app
    if(CURR_PIECE == NEG_INF||MOUSEDOWN == false){CURR_PIECE = NEG_INF; return;}//who cares we aren't dragging anything
    //console.log('drag: ' + event.clientX + ' ' + event.clientY);//good for testing drag early on bad for spam once the basics are done
    mypt = getrelativeposition(canvas,event);
    //console.log('relativized dragging vars: ' + mypt.x + ',' + mypt.y);//comment in if problems otherwise it generates way too much console spam
    globarrplaced[CURR_PIECE].worldx = mypt.x;//set the piece we are drawing
    globarrplaced[CURR_PIECE].worldy = mypt.y;
    drawpieces();//update
});

$(document).ready(function() {//call validate on the current board setup
    $('#score-word').click(function() {
        validate_pieces();
    });
});

$(document).ready(function() {//sum of scores of all validated pieces
    $('#running-tally').click(function() {
        running_tally();
    });
});

$(document).ready(function() {//dump ALL SEVEN pieces whether they are on the board or not and get 7 more
    $('#new-hand').click(function() {
        new_hand();
    });
});
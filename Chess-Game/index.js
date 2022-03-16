

// it will contain weather a peice is present at pos(i,j) or not
// 0 - represents absent



// 1 - represents present
var kings = [0,0];
var isCastling = 0;
var Rooks = [0,0,0,0];
var peice = ["R","N","B","Q","K","p"];
var player = ["w","b"];
var files = ["a","b","c","d","e","f","g","h"];
var ranks = [1,2,3,4,5,6,7,8];
var board = new Array(8);
var currPlayer = 0;
var isPeiceSelected = false;
var MoveNumber = 1;

var pos1;
var pos2;
var row1;
var col1;
var row2;
var col2;
var cellText;

var peiceImg;


for(var i=0;i<8;i++){
    board[i] = new Array(8);
}

for(var i=0;i<8;i++){
    for(var j=0;j<8;j++){
        setBoard(i,j);
        //console.log(board[i][j]);
    }
}

function setBoard(i,j){
    if(i != 0 && i!= 1 && i != 6 && i!= 7){
        board[i][j] = {
            isFilled: 0,
            color: "",
            peice: ""
        };
    }else{

        if(i == 1){

            board[i][j] = {
                isFilled: 1,
                color: "w",
                peice: "p"
            };
        }else if(i == 6){

            board[i][j] = {
                isFilled: 1,
                color: "b",
                peice: "p"
            };
        }else if(i == 0){
            if(j == 0 || j == 7){

                board[i][j] = {
                    isFilled: 1,
                    color: "w",
                    peice: "R"
                };
            }else if( j== 1 || j == 6){

                board[i][j] = {
                    isFilled: 1,
                    color: "w",
                    peice: "N"
                };
            }else if(j == 2 || j == 5){

                board[i][j] = {
                    isFilled: 1,
                    color: "w",
                    peice: "B"
                };
            }else if(j == 3){

                board[i][j] = {
                    isFilled: 1,
                    color: "w",
                    peice: "Q"
                };
            }else{

                board[i][j] = {
                    isFilled: 1,
                    color: "w",
                    peice: "K"
                };
            }
        }else{
            if(j == 0 || j == 7){

                board[i][j] = {
                    isFilled: 1,
                    color: "b",
                    peice: "R"
                };
            }else if( j== 1 || j == 6){

                board[i][j] = {
                    isFilled: 1,
                    color: "b",
                    peice: "N"
                };
            }else if(j == 2 || j == 5){

                board[i][j] = {
                    isFilled: 1,
                    color: "b",
                    peice: "B"
                };
            }else if(j == 3){

                board[i][j] = {
                    isFilled: 1,
                    color: "b",
                    peice: "Q"
                };
            }else{

                board[i][j] = {
                    isFilled: 1,
                    color: "b",
                    peice: "K"
                };
            }
        }


    }

}
$(".StartAgain").on("click",function(e){
    window.location.reload(true);
});
$(".chess-board td").on("click",function(e){
    
    
    if(isPeiceSelected === false){

        peiceImg = (this).innerText;
        
        pos1 = $(this).attr('id');
        col1 = pos1[0];
        
        for(let pos = 0;pos<8;pos++){
            if(col1 === files[pos]){
                col1 = pos;
                break;
            }
        }
        row1 = Number(pos1[1])-1;
        
        
        
        if(board[row1][col1].isFilled == 1 && board[row1][col1].color === player[currPlayer]){

            cellText = $(this).html()
            isPeiceSelected = true;
            ShowBlink(pos1);
            showLegalMoves();
        }
        
    }else{
        pos2 = $(this).attr('id');
        ShowBlink(pos2);
        col2 = pos2[0];
    
        for(let pos = 0;pos<8;pos++){
            if(col2 === files[pos]){
                col2 = pos;
                break;
            }
        }
        row2 = Number(pos2[1])-1;
        if((board[row2][col2].isFilled == 0 || board[row2][col2].color === player[1-currPlayer]) && isLeagalMove()){

            showInMoveList();
            $("#" + pos1).html("");
            $(this).html(cellText);
            
            if(isCastling === 1 ){
                let id;
                if(col2-col1 === 2 ){
                    id = "h"+(row1+1);
                    
                }else if(col1-col2 === 2){
                    id = "a"+(row1+1);
                }
                
                cellText = $("#" + id).html();
                $("#" + id).html("");
                if(col2-col1 === 2 ){
                    id = files[col1+1] + (row1+1);
                    
                    
                }else if(col1-col2 === 2){
                    id = files[col1-1] + (row1+1);
                }
                

                $("#" + id).html(cellText);
                isCastling = 0;
            }
            placePeice();
            
            currPlayer = 1-currPlayer;
        }
        isPeiceSelected = false;
    }
    
})

function ShowBlink(id){
    $("#" + id).addClass("pressed");
    setTimeout(function(){
        $("#" + id).removeClass("pressed");    
    },200);
}

function showLegalMoves(){
    var peiceName = board[row1][col1].peice;

    if(peiceName === "p"){

        if(player[currPlayer] === "w"){
            for(let i = row1+1;i<=Math.min(row1+2,7);i++){
                if(board[i][col1].isFilled === 0){
                    let id = files[col1];
                    id += i+1;
                    //console.log(id);
                    ShowBlink(id);
                    
                }else{
                    break;
                }
            }
            if(row1+1<=7 && col1+1<=7 && board[row1+1][col1+1].isFilled === 1 && board[row1+1][col1+1].color === player[1-currPlayer]){
                let id = files[col1+1];
                id += row1+2;
                    //console.log(id);
                ShowBlink(id);
            }
            if(row1+1 <= 7 && col1-1>=0 && board[row1+1][col1-1].isFilled === 1 && board[row1+1][col1-1].color === player[1-currPlayer]){
                let id = files[col1-1];
                id += row1+2;
                //console.log(id);
                ShowBlink(id);
            }
        }else{
            for(let i = row1-1;i>=Math.max(row1-2,0);i--){
                if(board[i][col1].isFilled === 0){
                    let id = files[col1];
                    id += i+1;
                    // console.log(id);
                    ShowBlink(id);
                }else{
                    break;
                }
            }

            if(row1-1>=0 && col1-1>=0 && board[row1-1][col1-1].isFilled === 1 && board[row1-1][col1-1].color === player[1-currPlayer] ){
                let id = files[col1-1];
                id += row1;
                    //console.log(id);
                ShowBlink(id);
            }
            if(row1-1>=0 && col1+1>=0 &&  board[row1-1][col1+1].isFilled === 1 && board[row1-1][col1+1].color === player[1-currPlayer] ){
                let id = files[col1+1];
                id += row1;
                    //console.log(id);
                ShowBlink(id);
            }

        }

    }else if(peiceName === "R"){

        for(let x = row1+1;x<=7;x++){
            if((board[x][col1].isFilled === 0)){
                let id = files[col1];
                id += x+1;
                // console.log(id);
                ShowBlink(id);
            }else{
                if(board[x][col1].color === player[1-currPlayer]){
                    let id = files[col1];
                    id += x+1;
                    // console.log(id);
                    ShowBlink(id);
                }
                break;
            }
        }


        for(let x = row1-1;x>=0;x--){
            if((board[x][col1].isFilled === 0)){
                let id = files[col1];
                id += x+1;
                // console.log(id);
                ShowBlink(id);
            }else{
                if(board[x][col1].color === player[1-currPlayer]){
                    let id = files[col1];
                    id += x+1;
                    // console.log(id);
                    ShowBlink(id);
                }
                break;
            }
        }

        for(let x = col1+1;x<=7;x++){
            if((board[row1][x].isFilled === 0)){
                let id = files[x];
                id += row1+1;
                // console.log(id);
                ShowBlink(id);
            }else{
                if(board[row1][x].color === player[1-currPlayer]){
                    let id = files[x];
                    id += row1+1;
                    // console.log(id);
                    ShowBlink(id);
                }
                break;
            }
        }

        for(let x = col1-1;x>=0;x--){
            if((board[row1][x].isFilled === 0)){
                let id = files[x];
                id += row1+1;
                // console.log(id);
                ShowBlink(id);
            }else{
                if(board[row1][x].color === player[1-currPlayer]){
                    let id = files[x];
                    id += row1+1;
                    // console.log(id);
                    ShowBlink(id);
                }
                break;
            }
        }

    }else if(peiceName === "N"){

        if(row1+2<=7 && col1+1<=7 && ((board[row1+2][col1+1].isFilled === 0) || board[row1+2][col1+1].color === player[1-currPlayer] ) ){
            let id = files[col1+1];
            id += row1+2+1;
            // console.log(id);
            ShowBlink(id);
        }
        if(row1+2<=7 && col1-1>=0 && ((board[row1+2][col1-1].isFilled === 0) || (board[row1+2][col1-1].color === player[1-currPlayer]))){
            let id = files[col1-1];
            id += row1+2+1;
            // console.log(id);
            ShowBlink(id);
        }
        if(row1-2>=0 && col1-1>=0 && ((board[row1-2][col1-1].isFilled === 0) || (board[row1-2][col1-1].color === player[1-currPlayer]) )){
            let id = files[col1-1];
            id += row1-2+1;
            // console.log(id);
            ShowBlink(id);
        }
        if(row1-2>=0 && col1+1<=7 && ((board[row1-2][col1+1].isFilled === 0) || (board[row1-2][col1+1].color === player[1-currPlayer]) )){
            let id = files[col1+1];
            id += row1-2+1;
            // console.log(id);
            ShowBlink(id);
        }


        if(row1+1<=7 && col1+2<=7 && ((board[row1+1][col1+2].isFilled === 0) || board[row1+1][col1+2].color === player[1-currPlayer] ) ){
            let id = files[col1+2];
            id += row1+1+1;
            // console.log(id);
            ShowBlink(id);
        }
        if(row1+1<=7 && col1-2>=0 && ((board[row1+1][col1-2].isFilled === 0) || (board[row1+1][col1-2].color === player[1-currPlayer]))){
            let id = files[col1+2];
            id += row1-1+1;
            // console.log(id);
            ShowBlink(id);
        }
        if(row1-1>=0 && col1-2>=0 && ((board[row1-1][col1-2].isFilled === 0) || (board[row1-1][col1-2].color === player[1-currPlayer] ))){
            let id = files[col1-2];
            id += row1-1+1;
            // console.log(id);
            ShowBlink(id);
        }
        if(row1-1>=0 && col1+2<=7 && ((board[row1-1][col1+2].isFilled === 0) || (board[row1-1][col1+2].color === player[1-currPlayer] ))){
            let id = files[col1-2];
            id += row1+1+1;
            // console.log(id);
            ShowBlink(id);
        }



    }else if(peiceName === "B"){

        let x = row1+1;
        let y = col1+1;
        
        while(x<=7 && y<=7){
            let id = files[y];
            id += (x+1)
            if(board[x][y].isFilled === 0){
                ShowBlink(id);
                x++;
                y++;
            }else{
                if(board[x][y].color === player[1-currPlayer]){
                    ShowBlink(id);
                }
                break;
            }
            
        }

        x = row1-1;
        y = col1-1;

        while(x>=0 && y>=0){

            let id = files[y];
            id += (x+1);
            if(board[x][y].isFilled === 0){
                ShowBlink(id);
                x--;
                y--;
            }else{
                if(board[x][y].color === player[1-currPlayer]){
                    ShowBlink(id);
                }
                break;
            }
        }

        x = row1+1;
        y = col1-1;

        while(x<=7 && y>=0){

            let id = files[y];
            id += (x+1);
            if(board[x][y].isFilled === 0){
                ShowBlink(id);
                x++;
                y--;
            }else{
                if(board[x][y].color === player[1-currPlayer]){
                    ShowBlink(id);
                }
                break;
            }
        }

        x = row1-1;
        y = col1+1;


        while(x>=0 && y<=7){

            let id = files[y];
            id += (x+1);
            if(board[x][y].isFilled === 0){
                ShowBlink(id);
                x--;
                y++;
            }else{
                if(board[x][y].color === player[1-currPlayer]){
                    ShowBlink(id);
                }
                break;
            }
        }


    }else if(peiceName === "Q"){

        let x = row1+1;
        let y = col1+1;
        
        while(x<=7 && y<=7){
            let id = files[y];
            id += (x+1)
            if(board[x][y].isFilled === 0){
                ShowBlink(id);
                x++;
                y++;
            }else{
                if(board[x][y].color === player[1-currPlayer]){
                    ShowBlink(id);
                }
                break;
            }
            
        }

        x = row1-1;
        y = col1-1;

        while(x>=0 && y>=0){

            let id = files[y];
            id += (x+1);
            if(board[x][y].isFilled === 0){
                ShowBlink(id);
                x--;
                y--;
            }else{
                if(board[x][y].color === player[1-currPlayer]){
                    ShowBlink(id);
                }
                break;
            }
        }

        x = row1+1;
        y = col1-1;

        while(x<=7 && y>=0){

            let id = files[y];
            id += (x+1);
            if(board[x][y].isFilled === 0){
                ShowBlink(id);
                x++;
                y--;
            }else{
                if(board[x][y].color === player[1-currPlayer]){
                    ShowBlink(id);
                }
                break;
            }
        }

        x = row1-1;
        y = col1+1;


        while(x>=0 && y<=7){

            let id = files[y];
            id += (x+1);
            if(board[x][y].isFilled === 0){
                ShowBlink(id);
                x--;
                y++;
            }else{
                if(board[x][y].color === player[1-currPlayer]){
                    ShowBlink(id);
                }
                break;
            }
        }
        for(x = row1+1;x<=7;x++){
            if((board[x][col1].isFilled === 0)){
                let id = files[col1];
                id += x+1;
                // console.log(id);
                ShowBlink(id);
            }else{
                if(board[x][col1].color === player[1-currPlayer]){
                    let id = files[col1];
                    id += x+1;
                    // console.log(id);
                    ShowBlink(id);
                }
                break;
            }
        }


        for(x = row1-1;x>=0;x--){
            if((board[x][col1].isFilled === 0)){
                let id = files[col1];
                id += x+1;
                // console.log(id);
                ShowBlink(id);
            }else{
                if(board[x][col1].color === player[1-currPlayer]){
                    let id = files[col1];
                    id += x+1;
                    // console.log(id);
                    ShowBlink(id);
                }
                break;
            }
        }

        for(x = col1+1;x<=7;x++){
            if((board[row1][x].isFilled === 0)){
                let id = files[x];
                id += row1+1;
                // console.log(id);
                ShowBlink(id);
            }else{
                if(board[row1][x].color === player[1-currPlayer]){
                    let id = files[x];
                    id += row1+1;
                    // console.log(id);
                    ShowBlink(id);
                }
                break;
            }
        }

        for(x = col1-1;x>=0;x--){
            if((board[row1][x].isFilled === 0)){
                let id = files[x];
                id += row1+1;
                // console.log(id);
                ShowBlink(id);
            }else{
                if(board[row1][x].color === player[1-currPlayer]){
                    let id = files[x];
                    id += row1+1;
                    // console.log(id);
                    ShowBlink(id);
                }
                break;
            }
        }

    }else if(peiceName === "K"){

        if(kings[currPlayer] ===  0){

            // king side catleing
            
            if(board[row1][col1+1].isFilled ===  0 && board[row1][col1+2].isFilled ===0 && Rooks[currPlayer] == 0 ){
                let id = files[col1+2];
                id += row1+1;
                ShowBlink(id);
            }

            // Queen side castleing
            if(board[row1][col1-1].isFilled ===  0 && board[row1][col1-2].isFilled ===0 && board[row1][col1-3].isFilled ===0 && Rooks[currPlayer+2] == 0 ){
                let id = files[col1-2];
                id += row1+1;
                ShowBlink(id);
            }



        }
        if(row1+1<=7 && (board[row1+1][col1].isFilled === 0 || board[row1][col1].color === player[1-currPlayer] )){
            let id = files[col1];
            id += row1+2;
            ShowBlink(id);
        }if(row1-1>=0 && ( (board[row1-1][col1].isFilled === 0) || (board[row1-1][col1].color === player[1-currPlayer]) ) ){

            let id = files[col1];
            id += row1;
            ShowBlink(id);
        }if(col1-1>=0 && ( board[row1][col1-1].isFilled === 0 || board[row1][col1-1].color === player[1-currPlayer] )){

            let id = files[col1-1];
            id += row1+1;
            ShowBlink(id);

        }if(col1+1<=7 && (board[row1][col1+1].isFilled === 0 || board[row1][col1+1].color === player[1-currPlayer]   )){

            let id = files[col1+1];
            id += row1+1;
            ShowBlink(id);

        }if(row1+1<=7 && col1+1<=7 && (board[row1+1][col1+1].isFilled === 0 || board[row1+1][col1+1].color === player[1-currPlayer]   )){

            let id = files[col1+1];
            id += row1+2;
            ShowBlink(id);
        }if(row1+1<=7 && col1-1>=0 && (board[row1+1][col1-1].isFilled === 0 || board[row1+1][col1-1].color === player[1-currPlayer]   )){

            let id = files[col1-1];
            id += row1+2;
            ShowBlink(id);
        }if(row1-1>=0 && col1+1<=7 && (board[row1-1][col1+1].isFilled === 0 || board[row1-1][col1+1].color === player[1-currPlayer]   ) ){

            let id = files[col1+1];
            id += row1;
            ShowBlink(id);
        }if(row1-1>=7 && col1-1>=0 && (board[row1-1][col1-1].isFilled === 0 || board[row1][col1+1].color === player[1-currPlayer]   ) ){

            let id = files[col1-1];
            id += row1;
            ShowBlink(id);
        }



    }

}

function showInMoveList(){
    //var peiceName = board[row1][col1].peice;
    var peiceName = peiceImg;
    let capture = "";
    if(board[row2][col2].isFilled == 1){
        capture += "X";
    }
    //markup = "<tr><td>" + peiceName  + pos1 + capture + pos2 + "</td></tr>";
    
    if(player[currPlayer] === "w"){
        
        
        // tableBody = $("#player1 tbody");
        // tableBody.append(markup);
        let uni1 =  "moveNumber";
        uni1 += MoveNumber;
        markup = "<div class = 'list' id = "+uni1+">"+
                     "<div class = 'wb'>" + peiceName+pos1  + " - "+capture+ " - " + pos2 + "</div>" + 
                 "</div>"    
        $(".moves").append(markup);

    }else{
        
        // tableBody = $("#player2 tbody");
        // tableBody.append(markup);
        markup = "<div class = 'wb'>" + peiceName+pos1  + " - "+capture+ " - " + pos2+ "</div>"
        let uni1 = "moveNumber";
        uni1 += MoveNumber;
        $("#"+uni1).append(markup);
        MoveNumber++;
    }    

}
function placePeice(){


    var peiceName = board[row1][col1].peice;
    
    board[row1][col1].isFilled = 0;
    board[row1][col1].peice = "";
    board[row1][col1].color = "";



    board[row2][col2].isFilled = 1;
    board[row2][col2].peice = peiceName;
    board[row2][col2].color = player[currPlayer];
    
    if(isCastling === 1){
        if(col2-col1 === 2){
            board[row1][col1+1].isFilled = 1;
            board[row1][col1+1].peice = "R";
            board[row1][col1+1].color = player[currPlayer];

            board[row1][col1+3].isFilled = 0;
            board[row1][col1+3].peice = "";
            board[row1][col1+3].color = "";
        }else{
            board[row1][col1-4].isFilled = 0;
            board[row1][col1-4].peice = "";
            board[row1][col1-4].color = "";

            board[row1][col2+1].isFilled = 1;
            board[row1][col2+1].peice = "R";
            board[row1][col2+1].color = player[currPlayer];
        }
    }

}

function isAttackingKing( pName, xP, yP,posXK,posyK,oP,cP){
    
    if(pName == "R"){

        var r = xP+1;
        var c = yP;

        while(r<8){
            if(board[r][c].isFilled == 1){
                if(board[r][c].color == oP){
                    break;
                }else{
                    if(board[r][c].peice == "K"){
                        return true;
                    }
                    break;
                }
            }
            r++;
        }

        r = xP-1;

        while(r>=0){
            if(board[r][c].isFilled == 1){
                if(board[r][c].color == oP){
                    break;
                }else{
                    if(board[r][c].peice == "K"){
                        return true;
                    }
                    break;
                }
            }
            r--;
        }

        r = xP;
        c = yP+1;

        while(c<8){
            if(board[r][c].isFilled == 1){
                if(board[r][c].color == oP){
                    break;
                }else{
                    if(board[r][c].peice == "K"){
                        return true;
                    }
                    break;
                }
            }
            c++;
        }

        c  = yP-1;

        while(c>=0){
            if(board[r][c].isFilled == 1){
                if(board[r][c].color == oP){
                    break;
                }else{
                    if(board[r][c].peice == "K"){
                        return true;
                    }
                    break;
                }
            }
            c--;
        }

        return false;

    }

    if(pName == "B"){
        //console.log("here");
        var x = xP+1;
        var y = yP+1;

        while(x<8 && y<8){

            if(board[x][y].isFilled == 1){
                if(board[x][y].color == oP){
                    //console.log("here");
                    break;
                }else{
                    if(board[x][y].peice == "K"){
                        return true;
                    }
                    break;
                }
            }
            x++,y++;
        }
        x = xP-1;
        y = yP-1;

        while(x>=0 && y>=0){

            if(board[x][y].isFilled == 1){
                if(board[x][y].color == oP){
                    break;
                }else{
                    if(board[x][y].peice == "K"){
                        return true;
                    }
                    break;
                }
            }
            x--,y--;
        }

        x = xP+1;
        y = yP-1;

        while(x<8 && y>=0){

            if(board[x][y].isFilled == 1){
                if(board[x][y].color == oP){
                    break;
                }else{
                    if(board[x][y].peice == "K"){
                        return true;
                    }
                    break;
                }
            }
            x++,y--;
        }
        x = xP-1;
        y = yP+1;

        while(x>=0 && y<8){

            if(board[x][y].isFilled == 1){
                if(board[x][y].color == oP){
                    break;
                }else{
                    if(board[x][y].peice == "K"){
                        return true;
                    }
                    break;
                }
            }
            x--,y++;
        }

        return false;

    }

    else if(pName == "Q"){

        var r = xP+1;
        var c = yP;

        while(r<8){
            if(board[r][c].isFilled == 1){
                if(board[r][c].color == oP){
                    break;
                }else{
                    if(board[r][c].peice == "K"){
                        return true;
                    }
                    break;
                }
            }
            r++;
        }

        r = xP-1;

        while(r>=0){
            if(board[r][c].isFilled == 1){
                if(board[r][c].color == oP){
                    break;
                }else{
                    if(board[r][c].peice == "K"){
                        return true;
                    }
                    break;
                }
            }
            r--;
        }

        r = xP;
        c = yP+1;

        while(c<8){
            if(board[r][c].isFilled == 1){
                if(board[r][c].color == oP){
                    break;
                }else{
                    if(board[r][c].peice == "K"){
                        return true;
                    }
                    break;
                }
            }
            c++;
        }

        c  = yP-1;

        while(c>=0){
            if(board[r][c].isFilled == 1){
                if(board[r][c].color == oP){
                    break;
                }else{
                    if(board[r][c].peice == "K"){
                        return true;
                    }
                    break;
                }
            }
            c--;
        }

        var x = xP+1;
        var y = yP+1;

        while(x<8 && y<8){

            if(board[x][y].isFilled == 1){
                if(board[x][y].color == oP){
                    //console.log("here");
                    break;
                }else{
                    if(board[x][y].peice == "K"){
                        return true;
                    }
                    break;
                }
            }
            x++,y++;
        }
        x = xP-1;
        y = yP-1;

        while(x>=0 && y>=0){

            if(board[x][y].isFilled == 1){
                if(board[x][y].color == oP){
                    break;
                }else{
                    if(board[x][y].peice == "K"){
                        return true;
                    }
                    break;
                }
            }
            x--,y--;
        }

        x = xP+1;
        y = yP-1;

        while(x<8 && y>=0){

            if(board[x][y].isFilled == 1){
                if(board[x][y].color == oP){
                    break;
                }else{
                    if(board[x][y].peice == "K"){
                        return true;
                    }
                    break;
                }
            }
            x++,y--;
        }
        x = xP-1;
        y = yP+1;

        while(x>=0 && y<8){

            if(board[x][y].isFilled == 1){
                if(board[x][y].color == oP){
                    break;
                }else{
                    if(board[x][y].peice == "K"){
                        return true;
                    }
                    break;
                }
            }
            x--,y++;
        }
        return false;
    }

    else if(pName == "N"){
        var r = xP+2;
        var c = yP+1;

        if(r<8 && c<8 && board[r][c].color == cP && board[r][c].peice == "K"){
            return true;
        }

        r = xP+2;
        c = yP-1;
        if(r<8 && c>=0 && board[r][c].color == cP && board[r][c].peice == "K"){
            return true;
        }

        r = xP-2;
        c = yP+1;

        if(r>=0 && c<8 && board[r][c].color == cP && board[r][c].peice == "K"){
            return true;
        }

        r = xP-2;
        c = yP-1;

        if(r>=0 && c>=0 && board[r][c].color == cP && board[r][c].peice == "K"){
            return true;
        }

        r = xP+1;
        c = yP+2;
        if(r<8 && c<8 && board[r][c].color == cP && board[r][c].peice == "K"){
            return true;
        }

        r = xP+1;
        c = yP-2;

        if(r<8 && c>=0 && board[r][c].color == cP && board[r][c].peice == "K"){
            return true;
        }

        r = xP-1;
        c = yP+2;

        if(r>=0 && c<8 && board[r][c].color == cP && board[r][c].peice == "K"){
            return true;
        }

        r = xP-1;
        c = yP-2;

        if(r>=0 && c>=0 && board[r][c].color == cP && board[r][c].peice == "K"){
            return true;
        }
        return false;

    }

    return false;
    

}

function isKingInCheck(){

    var peiceName = board[row1][col1].peice;

    var dummy = {
        isFilled: board[row2][col2].isFilled,
        price: board[row2][col2].peice,
        color: board[row2][col2].color
    };
    
    board[row1][col1].isFilled = 0;
    board[row1][col1].peice = "";
    board[row1][col1].color = "";



    board[row2][col2].isFilled = 1;
    board[row2][col2].peice = peiceName;
    board[row2][col2].color = player[currPlayer];

    var posXK,posyK;
    var cP = currPlayer==0?"w":"b"
    var oP = currPlayer==0?"b":"w";
    for(var i = 0;i<8;i++){
        for(var j = 0;j<8;j++){
            if(board[i][j].peice == "K" && cP == board[i][j].color){
                posXK = i;
                posyK = j;
                break;
            } 
        }
    }
    
    

    for(var i = 0;i<8;i++){
        for(var j = 0;j<8;j++){
            if(oP == board[i][j].color){
                if(isAttackingKing(board[i][j].peice,i,j,posXK,posyK,oP,cP)){
                    
    
                    board[row1][col1].isFilled = 1;
                    board[row1][col1].peice = board[row2][col2].peice;
                    board[row1][col1].color = board[row2][col2].color;

                    board[row2][col2].isFilled = dummy.isFilled;
                    board[row2][col2].peice = dummy.peice;
                    board[row2][col2].color = dummy.color;
                    return true;
                }

            } 
        }
    }

    board[row1][col1].isFilled = 1;
    board[row1][col1].peice = board[row2][col2].peice;
    board[row1][col1].color = board[row2][col2].color;

    board[row2][col2].isFilled = dummy.isFilled;
    board[row2][col2].peice = dummy.peice;
    board[row2][col2].color = dummy.color;

    return false;


}

function isLeagalMove(){
    if(isKingInCheck()){
        return false;
    }
    if(row2 == row1 && col1 == col2)return false;
    
    var peiceName = board[row1][col1].peice;

    if(peiceName == 'p'){
        if(player[currPlayer] == "b"){
            if((col1 == col2) && (row1>row2) &&  ((row1-row2)<=2 ) && (board[row2][col2].isFilled == 0) || ( (row1>row2) && Math.abs(col1-col2) == 1 && board[row2][col2].color === player[1-currPlayer])){
                return true;
            }return false;
        }else{
            if((col1 == col2) && (row2>row1) &&  ((row2-row1)<=2 ) && (board[row2][col2].isFilled == 0) || ( (row2>row1) && Math.abs(col1-col2) == 1 && board[row2][col2].color === player[1-currPlayer])){
                return true;
            }return false;
        }

    }else if(peiceName == 'K'){

        let len = Math.abs(row1-row2) + Math.abs(col1 - col2);

        if(len>2){
            
            return false;
        }else if(len == 2){
            if(col1-3>=0 && (col1-2 === col2)  && board[row1][col1-1].isFilled === 0 && board[row1][col1-2].isFilled === 0 && board[row1][col1-3].isFilled === 0 && kings[currPlayer] === 0 && Rooks[currPlayer+2] === 0){
                isCastling = 1;
                kings[currPlayer]++;
                Rooks[currPlayer+2]++;
                return true;
            }
            else if(col1+2<8 && (col1+2 === col2)  && board[row1][col1+1].isFilled === 0 && board[row1][col1+2].isFilled === 0 && kings[currPlayer] === 0 && Rooks[currPlayer] === 0){
                isCastling = 1;   
                kings[currPlayer]++;
                Rooks[currPlayer]++;
                return true;
            }
            else if(Math.abs(row1-row2) == 1 && ((board[row2][col2].isFilled == 0) || (board[row2][col2].color === player[1-currPlayer]) )){
                kings[currPlayer]++;
                
                return true;
            }else{
                return false;
            }
        }else{
            if(((board[row2][col2].isFilled == 0) || (board[row2][col2].color === player[1-currPlayer]) )){
                kings[currPlayer]++;
                
                return true;
            }
            return false;
        }

    }else if(peiceName == "Q"){
        let x1 = Math.abs(row1-row2);
        let x2 = Math.abs(col1-col2);
        
        if(x1 === x2 || x1 == 0 || x2 == 0){
            //check if there is another peice between point p1 to p2;

            if(x1 == 0 || x2 == 0){

                if(x1 == 0){

                    if(col1>col2){
    
                        let i = col2+1;
    
                        for(i=col2+1;i<col1;i++){
                            if(board[row2][i].isFilled == 1){
                                return false;
                            }
                        }
                        return true;
    
                    }else{
                        
                        let i = col1+1;
    
                        for(i=col1+1;i<col2;i++){
                            if(board[row2][i].isFilled == 1){
                                return false;
                            }
                        }
                        return true;
                    }
    
                }else{
    
    
                    if(row1>row2){
    
                        let i;
    
                        for(i = row2+1;i<row1 ;i++){
                            if(board[i][col1].isFilled == 1 ){
                                return false;
                            }
                        }
                        return true;
    
                    }else{
                        
    
                        let i;
    
                        for(i = row1+1;i<row2 ;i++){
                            if( board[i][col1].isFilled == 1){
                                return false;
                            }
                        }
                        return true;
                    }
    
                }
                

            }else if(x1 == x2){

                if( row2 >row1 && col2>col1 ){
                    let xi = row1+1;
                    let yi = col1+1;
                    while(xi<row2 && yi < col2){
                        if( board[xi][yi].isFilled == 1){
                            return false;
                        }
                        xi++;
                        yi++;
                    }
                    return true;
    
                }else if( row2 < row1 && col2<col1){
                    let xi = row1-1;
                    let yi = col1-1;
                    while(xi>row2 && yi > col2){
                        if( board[xi][yi].isFilled == 1){
                            return false;
                        }
                        xi--;
                        yi--;
                    }
                    return true;
                }else if( row2 > row1 && col2<col1 ){
                    let xi = row1+1;
                    let yi = col1-1;
                    while(xi<row2 && yi > col2){
                        if( board[xi][yi].isFilled == 1){
                            return false;
                        }
                        xi++;
                        yi--;
                    }
                    return true;
                }else{
                    let xi = row1-1;
                    let yi = col1+1;
                    while(xi > row2 && yi < col2){
                        if( board[xi][yi].isFilled == 1){
                            return false;
                        }
                        xi--;
                        yi++;
                    }
                    return true;
                }
    

            }

            return true;
        }else{
            return false;
        }


    }else if(peiceName == "B"){

        let x1 = row1-row2;
        let x2 = col1-col2;
        
        if(Math.abs(x1) === Math.abs(x2)){
            //check if there is another peice between point p1 to p2;

            if( row2 >row1 && col2>col1 ){
                let xi = row1+1;
                let yi = col1+1;
                while(xi<row2 && yi < col2){
                    if( board[xi][yi].isFilled == 1){
                        return false;
                    }
                    xi++;
                    yi++;
                }
                return true;

            }else if( row2 < row1 && col2<col1){
                let xi = row1-1;
                let yi = col1-1;
                while(xi>row2 && yi > col2){
                    if( board[xi][yi].isFilled == 1){
                        return false;
                    }
                    xi--;
                    yi--;
                }
                return true;
            }else if( row2 > row1 && col2<col1 ){
                let xi = row1+1;
                let yi = col1-1;
                while(xi<row2 && yi > col2){
                    if( board[xi][yi].isFilled == 1){
                        return false;
                    }
                    xi++;
                    yi--;
                }
                return true;
            }else{
                let xi = row1-1;
                let yi = col1+1;
                while(xi > row2 && yi < col2){
                    if( board[xi][yi].isFilled == 1){
                        return false;
                    }
                    xi--;
                    yi++;
                }
                return true;
            }


        }else{
            return false;
        }

    }else if(peiceName == "N"){

        let x1 = Math.abs(row1 - row2);
        let x2 = Math.abs(col2 - col1);

        if(((x1 == 2 && x2 == 1) || (x1 == 1 && x2 == 2)) && ((board[row2][col2].isFilled == 0) || (board[row2][col2].color === player[1-currPlayer]) ) ){
            return true;
        }
        return false;


    }else{
        let x1 = Math.abs(row1-row2);
        let x2 = Math.abs(col1-col2);
        if(x1 == 0 || x2 == 0){
            // check if there is another peice between point p1 to p2
            if(x1 == 0){

                if(col1>col2){

                    let i = col2+1;

                    for(i=col2+1;i<col1;i++){
                        if(board[row2][i].isFilled == 1){
                            return false;
                        }
                    }
                    return true;

                }else{
                    
                    let i = col1+1;

                    for(i=col1+1;i<col2;i++){
                        if(board[row2][i].isFilled == 1){
                            return false;
                        }
                    }
                    return true;
                }

            }else{


                if(row1>row2){

                    let i;

                    for(i = row2+1;i<row1 ;i++){
                        if(board[i][col1].isFilled == 1 ){
                            return false;
                        }
                    }
                    return true;

                }else{
                    

                    let i;

                    for(i = row1+1;i<row2 ;i++){
                        if( board[i][col1].isFilled == 1){
                            return false;
                        }
                    }
                    return true;
                }

            }
            
        }
        return false;

    }

}
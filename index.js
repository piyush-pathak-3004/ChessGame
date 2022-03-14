

// it will contain weather a peice is present at pos(i,j) or not
// 0 - represents absent
// 1 - represents present

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

$(".chess-board td").on("click",function(e){
    
    
    if(isPeiceSelected === false){

        pos1 = $(this).attr('id');
        col1 = pos1[0];
        
        for(let pos = 0;pos<8;pos++){
            if(col1 === files[pos]){
                col1 = pos;
                break;
            }
        }
        row1 = Number(pos1[1])-1;
        
        //alert(board[row1][col1]);
        
        if(board[row1][col1].isFilled == 1 && board[row1][col1].color === player[currPlayer]){
            cellText = $(this).html()
            isPeiceSelected = true;
            ShowBlink(pos1);
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
    },100);
}
function showInMoveList(){
    var peiceName = board[row1][col1].peice;
    let capture = "";
    if(board[row2][col2].isFilled == 1){
        capture += "X";
            
    }
    markup = "<tr><th>" + peiceName  + pos1 + capture + pos2 + "</th></tr>";
    if(player[currPlayer] === "w"){
        
        
        tableBody = $("#player1 tbody");
        tableBody.append(markup);
        

    }else{
        
        tableBody = $("#player2 tbody");
        tableBody.append(markup);
        
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
    

}


function isLeagalMove(){
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
            if(Math.abs(row1-row2) == 1 && ((board[row2][col2].isFilled == 0) || (board[row2][col2].color === player[1-currPlayer]) )){
                return true;
            }else{
                return false;
            }
        }else{
            if(((board[row2][col2].isFilled == 0) || (board[row2][col2].color === player[1-currPlayer]) )){
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
function readPosition1(data){
    position1 = data.val();

    player1.x= position1.x;
    player1.y=position1.y;
}

function writePosition1(x,y){
    database.ref('player1/position1').update({
        x:position1.x+x,
        y:position1.y+y
    })
}

function write1Score(score){
    database.ref('player1').update({
        player1Score: score
    })
    

}

async function resetPlayer1Position(){
    var player1PosRef=await database.ref('player1/position1').once("value");
    if(player1PosRef.exists()){
        database.ref('player1/position1').update({
            'x':150,
            'y':300
        })
    }
    return(1);
}

async function resetPlayer1Score(){
    
    player1Score =0;
    var player1ScoreRef= await database.ref('player1/player1Score').once("value");
    if(player1ScoreRef.exists()){
        write1Score(player1Score);
        
    }
    return(1);
}
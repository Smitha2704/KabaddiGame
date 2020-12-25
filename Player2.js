function readPosition2(data){
    position2 = data.val();

    player2.x= position2.x;
    player2.y=position2.y;
}


function writePosition2(x,y){
    database.ref('player2/position2').update({
        x:position2.x+x,
        y:position2.y+y
    })
}

function write2Score(score){
    database.ref('player2').update({
        player2Score: score
    })
}

async function resetPlayer2Position(){
    var player2PosRef=await database.ref('player2/position2').once("value");
    if(player2PosRef.exists()){
        database.ref('player2/position2').update({
            'x':450,
            'y':300
        })
    }
    return(1);

}

async function resetPlayer2Score(){
    player2Score =0;
    
    var player2ScoreRef= await database.ref('player2/player2Score').once("value");
    if(player2ScoreRef.exists()){
        write2Score(player2Score);
    }
    return(1);
}

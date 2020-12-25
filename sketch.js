// add your code here
var player1, player2;
//var player1Score, player2Score;
var p1Animation, p2Animation;
var database;
var gameState =0;
var player1PosRef, player2PosRef;
var position1, position2;
var player1Score=0;
var player2Score=0;


function preload(){
    p1Animation = loadAnimation("assests/player1a.png", "assests/player1b.png","assests/player1a.png");
    p2Animation = loadAnimation("assests/player2a.png","assests/player2b.png","assests/player2a.png");
   
}

function setup(){
    createCanvas(600,600);

    database = firebase.database();

    player1=createSprite(150,250,100,100);
    player1.shapeColor = "red";
    player1.addAnimation("RedPlayer",p1Animation);
    p1Animation.frameDelay = 400;
    player1.scale = 0.3;

    player2=createSprite(450,250,10,10);
    player2.shapeColor = "yellow";
    player2.addAnimation("YellowPlayer",p2Animation);
    p2Animation.frameDelay = 400;
    player2.scale = -0.3;

    var player1PosRef = database.ref('player1/position1');
    player1PosRef.on("value",readPosition1);

    var player2PosRef = database.ref('player2/position2');
    player2PosRef.on("value",readPosition2);

    gameStateRef=database.ref('gameState');
    gameStateRef.on("value",function(data){
        gameState=data.val();
    })
  
    resetPlayer2Position();
    resetPlayer1Position();
    
}

function draw(){
    background("white");
    textSize(15);

    var player1ScoreRef=database.ref("player1/player1Score");
    player1ScoreRef.on("value",function(data){
        player1Score=data.val();
    })
  

    var player2ScoreRef=database.ref("player2/player2Score");
    player2ScoreRef.on("value",function(data){
        player2Score=data.val();
    })

    text(player1Score, 200, 100);
    text(player2Score, 400,100);
    if(gameState ===0){
        fill("black");
        textSize(20);
        stroke("lightgreen");
        strokeWeight(6);
        text("Press space to start toss", 200,250);

        if(keyDown("space")){
            
            var rand = Math.round(random(1,2));
            
    
            if(rand ===1){
                alert("Red Wins toss");

                //Call async function to set state
                setGameState(1);
                
            }
            else{
                alert("Yellow wins toss");

                //Call async function to set state
                setGameState(2);
                
            }
            
        }
    }
    //Condition where red wins toss
    if(gameState === 1){
        
            if(keyDown("d")){
                writePosition1(5,0)
            }
            if(keyDown("a")){
                writePosition1(-5,0)
            }
            if(keyDown("w")){
                writePosition1(0,-5)
            }
            if(keyDown("s")){
                writePosition1(0,5)
            }
            if(keyDown(UP_ARROW)){
                writePosition2(0,-5)
            }
            if(keyDown(DOWN_ARROW)){
                writePosition2(0,5)
            }
        }
        //Condition where yellow wins toss
        else if(gameState === 2){
            if(keyDown(RIGHT_ARROW)){
                writePosition2(5,0)
            }
            if(keyDown(LEFT_ARROW)){
                writePosition2(-5,0)
            }
            if(keyDown(UP_ARROW)){
                writePosition2(0,-5)
            }
            if(keyDown(DOWN_ARROW)){
                writePosition2(0,5)
            }
            if(keyDown("d")){
                writePosition1(5,0)
            }
            if(keyDown("a")){
                writePosition1(-5,0)
            }
    }

   if(gameState ==1 &&position1.x==400){
        player1.readPosition1;
        player2.readPosition2;
        player1Score =player1Score+5;
        player2Score=player2Score-5;
        write1Score(player1Score);
        write2Score(player2Score);
        
        alert("Red won game");
        gameState = 3;

    }
    if(gameState ==2 &&position2.x==200){
        player1.readPosition2;
        player1.readPosition1;
        player1Score =player1Score-5;
        player2Score=player2Score+5;
        write1Score(player1Score);
        write2Score(player2Score);
       
        alert("Yellow won game");
        gameState =3;    
    }
    //Game has ended so ask user if he wants to restart
    if(gameState ===3){
        text("Press r to restart", 200, 200);
        if(keyDown("r")){
        
            resetPlayer1Score();
            resetPlayer2Score();
            resetPlayer1Position();
            resetPlayer2Position(); 
           
            setGameState(0);    
         
        }
       
    }
    drawline1();
    drawline2();
    drawSprites();
}

async function setGameState(state){
    var gameStateRef= await database.ref('gameState').once("value");
    if(gameStateRef.exists){
        database.ref('/').update({
            gameState:state})
        
    }
    console.log(gameState);
   
}
   

function drawline1(){
    stroke("yellow");
    strokeWeight(3);
    for(var i=0; i<600; i=i+20){
        line(130,i,130,i+10);
    }
}

function drawline2(){
    stroke("red");
    strokeWeight(3);
    for(var i=0; i<600; i=i+20){
        line(470,i,470,i+10);
    }
}



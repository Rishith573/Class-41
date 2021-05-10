class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage("car1Img", car1Img);
    car2 = createSprite(300,200);
    car2.addImage("car2Img", car2Img);
    car3 = createSprite(500,200);
    car3.addImage("car3Img", car3Img);
    car4 = createSprite(700,200);
    car4.addImage("car4Img", car4Img);
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      //var display_position = 100;
            background(ground);

      image(track, 0, -displayHeight*4, displayWidth, displayHeight*5);

      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 200;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = 200 + (index*200) + allPlayers[plr].xPos
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       
        textSize(15);
        textAlign(CENTER);
        fill("red");
        text(allPlayers[plr].name, cars[index - 1].x, cars[index - 1].y+75);
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      //player.distance +=10
      //player.update();
      yVelocity += 0.5
      if(keyIsDown(LEFT_ARROW)){
        xVelocity -= 0.5;
      }
      if(keyIsDown(RIGHT_ARROW)){
        xVelocity += 0.5;
      }
    }

    player.distance += yVelocity;
    player.xPos += xVelocity;
    player.update();

    if(player.distance>=3700){
      gameState = 2;
    }

    drawSprites();
  }

  end(){
    console.log("GAME ENDED!");
  }

}

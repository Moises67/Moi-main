function setup() {
  createCanvas(1440, 900);
  suelo = createSprite(720, 855);
  suelo2 = createSprite(2160, 855);
  suelo.addImage(Suelo);
  suelo2.addImage(Suelo);
  suelo.scale = 0.7164179104477612;
  suelo.velocityX = -5.5;
  suelo2.scale = 0.7164179104477612;
  suelo2.velocityX = -5.5;
  jugador = createSprite(205, 525, 30, 30);
  jugador.addAnimation("correr",correr);
  jugador.scale = 0.6;
  var nubes = createGroup();
}
function draw() 
{
  background(77, 182,254);
  if(suelo.x<=-720){
    suelo.x=2160
  }
  if(suelo2.x<=-720){
    suelo2.x=2160
  }
  if(keyDown(32) || keyDown(38)){
    jugador.velocityY -= 10
  }
  if(frameCount % 180 == 0){
    Nube1 = createSprite(1550, random(40, 700));
    Nube2 = createSprite(1600, random(40, 700));
    Nube3 = createSprite(1700, random(40, 700));
    Nube1.addImage(nube1);
    Nube2.addImage(nube2);
    Nube3.addImage(nube3);
    Nube1.scale = random(0.3, 0.5);
    Nube2.scale = random(0.3, 0.5);
    Nube3.scale = random(0.3, 0.5);
    if(Nube1.x >= 500){
      Nube1.velocityX = random(-2, -4);
    }
    else if(Nube1.x >= 200){
      Nube1.velocityX = random(-4, -6);
    }
    if(Nube2.x >= 500){
      Nube2.velocityX = random(-2, -4);
    }
    else if(Nube2.x >= 200){
      Nube2.velocityX = random(-5, -7);
    }
    if(Nube3.x >= 500){
      Nube3.velocityX = random(-2, -4);
    }
    else if(Nube3.x >= 200){
      Nube3.velocityX = random(-5, -4);
    }
  }
  jugador.velocityY += 3
  jugador.collide(suelo);
  jugador.collide(suelo2);
  suelo.debug=true;
  suelo2.debug=true;
  jugador.debug=true;
  drawSprites();
}
function preload(){
  Suelo=loadImage("./SPRITES/Suelo.jpg");
  correr = loadAnimation("./SPRITES/m1.gif","./SPRITES/m2.gif","./SPRITES/m3.gif");
  nube1 = loadImage("./SPRITES/N1.png");
  nube2 = loadImage("./SPRITES/N2.png");
  nube3 = loadImage("./SPRITES/N3.png");
}

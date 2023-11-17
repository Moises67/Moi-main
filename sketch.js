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
  var puntaje = 0;
  vidas = 3;
  play = false;
  perdiste = false;
  grupodeobstaculos = createGroup();
  FUEGO();
  Malo = createSprite(1200, 680);
  Malo.addAnimation("malo", malo);
  Malo.scale=0.5
  Malo.mirrorX(-1);
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
    if(play == false){
      play = true;
    }
    else{
      jugador.velocityY -= 10
    }
  }
  crearNubes();
  if(frameCount % (3*60) == 0){
  crearMalos();
  }
  jugador.velocityY += 3
  jugador.collide(suelo);
  jugador.collide(suelo2);
  jugador.setCollider("rectangle", 0, 30, 60, 120);
  jugador.lifeTime = 50;
  suelo.debug=true;
  suelo2.debug=true;
  jugador.debug=true;
  textSize(20);
  text("vidas:"+ vidas,8,20);
  if(perdiste == true && vidas == 0){
    textSize(90, 20);
    text("Game Over", 500, 460);
    jugador.overlap(grupodeobstaculos);
  }
  else{
    jugador.displace(grupodeobstaculos, gameover);
  }
  Fuego.bounceOff(suelo);
  Fuego.bounceOff(suelo2);
  drawSprites();
}
function preload(){
  Suelo=loadImage("./SPRITES/Suelo.jpg");
  correr = loadAnimation("./SPRITES/m1.gif","./SPRITES/m2.gif","./SPRITES/m3.gif");
  nube1 = loadImage("./SPRITES/N1.png");
  nube2 = loadImage("./SPRITES/N2.png");
  nube3 = loadImage("./SPRITES/N3.png");
  malo = loadAnimation("./SPRITES/b1.gif","./SPRITES/b2.gif","./SPRITES/b3.gif","./SPRITES/b4.gif","./SPRITES/b5.gif");
  fuego = loadAnimation("/SPRITES/f1.png","/SPRITES/f2.png","/SPRITES/f3.png", "/SPRITES/f4.png");
  planta = loadAnimation("./SPRITES/a.png", "./SPRITES/a2.png");
  hongo = loadAnimation("./SPRITES/M1.png", "./SPRITES/M2.png");
}

function gameover(s1, s2){
  if(vidas > 0){
    vidas --;
    s2.destroy();
    play = false;
    perdiste = true;
  }
}
function crearNubes(){
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
    Nube1.lifeTime = 100;
    Nube2.lifeTime = 100;
    Nube3.lifeTime = 100;
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
}
function crearMalos(){
  Malo = createSprite(1400, 700);
  Malo.velocityX = -4;
  var aleatoreo = random(2, 3);
  aleatoreo = Math.round(aleatoreo);
  switch(aleatoreo){
    case 0:
      Malo.addAnimation("malo", malo);
      Malo.scale=0.5
      Malo.mirrorX(-1);
    break;
    case 2:
      Malo.addAnimation("hongo", hongo);
      Malo.scale=10;
    break;
    case 3:
      Malo.addAnimation("planta", planta);
      Malo.scale=1;
      Malo.debug = true;
    break;
  }
  grupodeobstaculos.add(Malo);
}
function FUEGO(){
  Fuego = createSprite(50, 50);
  Fuego.addAnimation("fuego", fuego);
  Fuego.mirrorX(-1);
  Fuego.scale = 0.17;
  Fuego.velocityY=5;
  Fuego.velocityX=+7;
}
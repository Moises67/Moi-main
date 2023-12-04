function setup() {
  createCanvas(1440, 900);
  suelo = createSprite(720, 855);
  suelo2 = createSprite(2160, 855);
  saltando = false;
  suelo.addImage(Suelo);
  suelo2.addImage(Suelo);
  suelo.scale = 0.7164179104477612;
  suelo.velocityX = -5.5;
  suelo2.scale = 0.7164179104477612;
  suelo2.velocityX = -5.5;
  jugador = createSprite(205, 525, 30, 30);
  jugador.addAnimation("correr",correr);
  jugador.addAnimation("muerte",muerte);
  jugador.scale = 0.6;
  var puntaje = 0;
  vidas = 3;
  play = false;
  perdiste = false;
  grupodeobstaculos = createGroup();
  aleatoreo115 = random(1,15);
  lanzallamas = createGroup();
  FUEGO();
  Malo = createSprite(1200, 680);
  Malo.addAnimation("malo", malo);
  Malo.scale=0.5
  Malo.mirrorX(-1);
  Estrella = createSprite(500, 500);
  Estrella.scale=0.4;
  Estrella.addAnimation("estrella", estrella);
}
var fdnshu = false
function draw() 
{
  background(77, 182,254);
  crearNubes();
  if(suelo.x<=-720){
    suelo.x=2160
  }
  if(suelo2.x<=-720){
    suelo2.x=2160
  }
  if((keyWentDown(32) || keyWentDown(38)) && saltando == false){
    if(play == false){
      play = true;
    }
    else{
      jugador.velocityY -= 46;
      saltando = true;
    }
  }
  if(frameCount % (3*60) == 0){
  crearMalos();
  }
  jugador.velocityY += 3;
  jugador.setCollider("rectangle", 0, 30, 60, 120);
  jugador.lifeTime = 50;
  if(keyWentDown(81)){
    fdnshu =!fdnshu;
  }
  if(fdnshu == true){
    suelo.debug=true;
    suelo2.debug=true;
    jugador.debug=true;
    Malo.debug = true;
    Fuego.debug = true;}
  else{
    suelo.debug=false;
    suelo2.debug=false;
    jugador.debug=false;
    Malo.debug = false;
    Fuego.debug = false;
  }
  textSize(20);
  text("vidas:"+ vidas,8,20);
  if(keyWentDown("r")){
    perdiste = true;
    vidas = 0;
  }
  if(perdiste == true && vidas == 0){
    textSize(90, 20);
    text("Game Over", 500, 460);
    jugador.overlap(grupodeobstaculos);
    jugador.changeAnimation("muerte");
    jugador.velocityY -= 10;
    saltando = true;
    jugador.overlap(suelo);
    jugador.overlap(suelo2);
  }
  else{
    jugador.displace(grupodeobstaculos, gameover);
    jugador.collide(suelo, tocarSuelo);
    jugador.collide(suelo2, tocarSuelo);
  }
  if(keyWentDown("f")){
    FUEGO();
  }
  lanzallamas.bounceOff(suelo);
  lanzallamas.bounceOff(suelo2);
  lanzallamas.forEach(element => {
    element.velocityY += 0.5;
  });
  console.log(jugador.y);
  crearNubes();
  drawSprites();
}
function preload(){
  Suelo=loadImage("./SPRITES/Suelo.jpg");
  correr = loadAnimation("./SPRITES/m1.gif","./SPRITES/m2.gif","./SPRITES/m3.gif");
  muerte = loadImage("./SPRITES/m4.png");
  nube1 = loadImage("./SPRITES/N1.png");
  nube2 = loadImage("./SPRITES/N2.png");
  nube3 = loadImage("./SPRITES/N3.png");
  malo = loadAnimation("./SPRITES/b1.gif","./SPRITES/b2.gif","./SPRITES/b3.gif","./SPRITES/b4.gif","./SPRITES/b5.gif");
  fuego = loadAnimation("/SPRITES/f1.png","/SPRITES/f2.png","/SPRITES/f3.png", "/SPRITES/f4.png");
  planta = loadAnimation("./SPRITES/a2.png", "./SPRITES/a3.png");
  hongo = loadAnimation("./SPRITES/M1.png", "./SPRITES/M2.png");
  estrella = loadAnimation("./SPRITES/e1.gif","./SPRITES/e2.gif","./SPRITES/e3.gif","./SPRITES/e4.gif","./SPRITES/e6.gif","./SPRITES/e7.gif","./SPRITES/e8.gif","./SPRITES/e9.gif","./SPRITES/e10.gif","./SPRITES/e11.gif","./SPRITES/e12.gif","./SPRITES/e13.gif","./SPRITES/e14.gif","./SPRITES/e15.gif","./SPRITES/e16.gif","./SPRITES/estrella.gif");
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
    Nube1.lifetime = 900;
    Nube2.lifetime = 900;
    Nube3.lifetime = 900;
    Nube1.depth = 1;
    Nube2.depth = 1;
    Nube3.depth = 1;
    if(Nube1.y >= 500){
      Nube1.velocityX = random(-2, -4);
    }
    else if(Nube1.y >= 200){
      Nube1.velocityX = random(-4, -6);
    }
    if(Nube2.y >= 500){
      Nube2.velocityX = random(-2, -4);
    }
    else if(Nube2.y >= 200){
      Nube2.velocityX = random(-5, -7);
    }
    if(Nube3.y >= 500){
      Nube3.velocityX = random(-2, -4);
    }
    else if(Nube3.y >= 200){
      Nube3.velocityX = random(-5, -4);
    }
  }
}
function crearMalos(){
  Malo = createSprite(1400, 750);
  Malo.velocityX = -5;
  var aleatoreo = random(2, 3);
  aleatoreo = Math.round(aleatoreo);
  switch(aleatoreo){
    case 0:
      Malo.addAnimation("malo", malo);
      Malo.scale=0.5;
      Malo.mirrorX(-1);
    break;
    case 2:
      Malo.addAnimation("hongo", hongo);
      Malo.y = 780;
    break;
    case 3:
      Malo.addAnimation("planta", planta);
      Malo.y = 760;
    break;
  }
  grupodeobstaculos.add(Malo);
}
function FUEGO(){
  Fuego = createSprite(jugador.x + 30, jugador.y);
  Fuego.addAnimation("fuego", fuego);
  Fuego.mirrorX(1);
  Fuego.scale = 0.17;
  Fuego.velocityY = -5;
  Fuego.velocityX-= -20;
  Fuego.setCollider("circle", 62.33, 0, 70);
  Fuego.lifetime = 400;
  lanzallamas.add(Fuego);
}
function tocarSuelo(){
  saltando = false;
}
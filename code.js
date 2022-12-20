var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = { "orderedKeys": [], "propsByKey": {} };
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
        image,
        props.frameSize.x,
        props.frameSize.y,
        frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
    // -----

    var laser1, laser2, edges, rightEdge, leftEdge, bottomEdge, topEdge;
    var treasure, thief;
    function setup() {
      //se crea el sprite del tesoro  y el color 
      treasure = createSprite(390, 10, 30, 30);
      treasure.shapeColor = "blue";

      //se crea el ladron 
      thief = createSprite(10, 389, 30, 30);

      //se crean los laser su color y velocidad 
      laser1 = createSprite(100, 0, 200, 5);
      laser1.shapeColor = "red";
      laser1.velocityY = 2;
      laser1.velocityX = 2;

      laser2 = createSprite(300, 400, 200, 5);
      laser2.shapeColor = "red";
      laser2.velocityY = -2;
      laser2.velocityX = -2;

      //bordes 
      edges = createEdgeSprites();





    }

    function draw() {
      background(220);

      fill("white");
      drawSprites();

      //movimiento del ladron 
      if (keyDown(RIGHT_ARROW)) {
        thief.velocityX = 2;
        thief.velocityY = 0;
      }
      if (keyDown(LEFT_ARROW)) {
        thief.velocityX = -2;
        thief.velocityY = 0;
      }
      if (keyDown(UP_ARROW)) {
        thief.velocityX = 0;
        thief.velocityY = -2;
      }
      if (keyDown(DOWN_ARROW)) {
        thief.velocityX = 0;
        thief.velocityY = 2;
      }

      //cuando atrapen el ladron aparece el texto
      if (laser1.isTouching(thief) || laser2.isTouching(thief)) {
        stroke("black");
        fill("yellow");
        textSize(34);
        text("Ladrón atrapado", 120, 200);

        //se detiene el movimiento
        laser1.velocityY = 0;
        laser2.velocityY = 0;
        thief.velocityY = 0;
        thief.velocityX = 0;
      }
      //cuando el ladron toque el tesoro aparece el texto 
      if (thief.isTouching(treasure)) {
        stroke("black");
        fill("red");
        textSize(24);
        text("El ladrón consiguió el diamante", 20, 200);

        //se detiene el movimiento 
        laser1.velocityY = 0;
        laser2.velocityY = 0;
        thief.velocityY = 0;
        thief.velocityX = 0;
      }

      createEdgeSprites();
      thief.bounceOff(rightEdge);
      thief.bounceOff(leftEdge);
      thief.bounceOff(topEdge);
      thief.bounceOff(bottomEdge);

      //cuando un laser toque un borde se devuelva 
      if (laser1.isTouching(bottomEdge)) {
        laser1.velocityY = -2;
        laser1.velocityX = -1;
      }
      if (laser1.isTouching(topEdge)) {
        laser1.velocityY = 2;
        laser1.velocityX = 1;
      }
      if (laser2.isTouching(bottomEdge)) {
        laser2.velocityY = -2;
        laser2.velocityX = -1;
      }
      if (laser2.isTouching(topEdge)) {
        laser2.velocityY = 2;
        laser2.velocityX = 1;
      }
    }


    // -----
    try { window.draw = draw; } catch (e) { }
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};

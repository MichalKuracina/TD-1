const canvasWidth = 700;
const canvasHeight = 500;

const route = [
  { x: 0, y: 100 },
  { x: 550, y: 100 },
  { x: 550, y: 300 },
  { x: 250, y: 300 },
  { x: 250, y: 200 },
  { x: 100, y: 200 },
  { x: 100, y: 450 },
  { x: 700, y: 450 },
];

let bullets = [];
let turrets = [];
let enemies = [];

let app;
let bullet;
let elapsed = 0;
const interval = 1000;

const spawnInterval = 1000;
let spawnElapsed = 0;
const spawnLimit = 0;
let spawnCounter = 0;

let towerCount = 0;
let enemyCount = 0;
let hudContainer;

let sprite;
let texture;
let spritesheet;

function run() {
  (async () => {
    app = new PIXI.Application();

    await app.init({
      width: canvasWidth,
      height: canvasHeight,
      backgroundColor: 0x338a4a,
    });
    document.body.appendChild(app.canvas);

    grid(app);
    coordinates(app, canvasWidth, canvasHeight);
    hudContainer = hud();

    let futureRoute = Array.from(route);
    futureRoute[0].x = -32;
    await drawRoad(futureRoute);

    // app.stage.on("pointerdown", (event) => {
    //   const mousePosition = event.data.global;
    //   enemy = new Enemy(
    //     Math.round(mousePosition.x),
    //     Math.round(mousePosition.y),
    //     10,
    //     0xfc0303,
    //     5,
    //     5
    //   );
    //   app.stage.addChild(enemy);
    //   enemies.push(enemy);
    // });

    app.stage.eventMode = "static";
    app.stage.hitArea = app.screen;

    // turret = new Turret(200, 200, 10, 0x0f03fc, 1);
    // app.stage.addChild(turret);
    // turrets.push(turret);

    // turret = new Turret(200, 300, 10, 0x0f03fc);
    // app.stage.addChild(turret);
    // turrets.push(turret);

    // bullet = new Bullet(200, 200, 200, 200, 600, 400, 1);
    // app.stage.addChild(bullet);
    // bullets.push(bullet);

    // let enemy = new Enemy(
    //   300,
    //   200,
    //   (radius = 50),
    //   (color = 0xff0000),
    //   (health = 0),
    //   5
    // );
    // app.stage.addChild(enemy);
    // enemies.push(enemy);

    app.ticker.add(updateTick);
  })();
}

function updateTick(deltaTime) {
  hudContainer.children[0].text = `Turrets: ${turrets.length}`;
  hudContainer.children[1].text = `Enemies: ${enemies.length}`;

  spawnElapsed += deltaTime.deltaMS;

  if (spawnElapsed >= spawnInterval) {
    spawnElapsed = 0;
    if (spawnCounter < spawnLimit) {
      const enemy = new Enemy(
        route[0].x,
        route[0].y,
        10,
        0xfc0303,
        5,
        5,
        2,
        Array.from(route)
      );
      app.stage.addChild(enemy);
      enemies.push(enemy);
      spawnCounter++;
    }
  }

  if (enemies.length > 0) {
    for (let i = 0; i < enemies.length; i++) {
      enemies[i].move(deltaTime.deltaMS);

      if (enemies[i].finished) {
        console.log("Collision!");
        app.stage.removeChild(enemies[i]);
        enemies[i].destroy();
        enemies.splice(i, 1);
        i--;
      }
    }
  }

  if (elapsed >= interval) {
    elapsed = 0;
    if (enemies.length > 0) {
      for (let i = 0; i < turrets.length; i++) {
        const closesEnemy = turrets[i].getClosesEnemy(enemies);
        //   console.log(closesEnemy);
        const bullet = turrets[i].shoot(closesEnemy);
        bullet.damage = turrets[i].damage;
        app.stage.addChild(bullet);
        bullets.push(bullet);
      }
      //   console.log("s");
    }
  }

  for (let i = 0; i < bullets.length; i++) {
    bullets[i].move();

    if (checkHitEnemy(bullets[i], enemies)) {
      console.log("Hit!");

      bullets.splice(i, 1);
      i--;

      continue;
    }

    if (checkHitWall(bullets[i])) {
      console.log("Collision!");
      app.stage.removeChild(bullets[i]);
      bullets[i].destroy();
      bullets.splice(i, 1);
      i--;
    }
  }
}

async function drawRoad(routeObj) {
  if (routeObj.length === 1) {
    console.log("Hit end");
    return;
  }

  const atlasData = {
    frames: {
      road: {
        frame: { x: 128, y: 0, w: 64, h: 64 },
        sourceSize: { w: 64, h: 64 },
        spriteSourceSize: { x: 0, y: 0, w: 64, h: 64 },
      },
      q1curve: {
        frame: { x: 64, y: 64, w: 64, h: 64 },
        sourceSize: { w: 64, h: 64 },
        spriteSourceSize: { x: 0, y: 0, w: 64, h: 64 },
      },
      q2curve: {
        frame: { x: 0, y: 64, w: 64, h: 64 },
        sourceSize: { w: 64, h: 64 },
        spriteSourceSize: { x: 0, y: 0, w: 64, h: 64 },
      },
      q3curve: {
        frame: { x: 128, y: 64, w: 64, h: 64 },
        sourceSize: { w: 64, h: 64 },
        spriteSourceSize: { x: 0, y: 0, w: 64, h: 64 },
      },
      q4curve: {
        frame: { x: 128, y: 64, w: 64, h: 64 },
        sourceSize: { w: 64, h: 64 },
        spriteSourceSize: { x: 0, y: 0, w: 64, h: 64 },
      },
    },
    meta: {
      image: "/assets/roads2W.png",
      size: { w: 512, h: 192 },
    },
  };

  const texture = await PIXI.Assets.load(atlasData.meta.image);
  const spritesheet = new PIXI.Spritesheet(texture, atlasData);
  await spritesheet.parse();

  //   [
  //     { x: 0, y: 100 },
  //     { x: 500, y: 100 },
  //     { x: 550, y: 150 },
  //     { x: 500, y: 200 },
  //     { x: 200, y: 200 },
  //     { x: 100, y: 300 },
  //     { x: 150, y: 350 },
  //     { x: 500, y: 400 },
  //     { x: 500, y: 500 },
  //   ];

  const spriteWidth = 64;
  let new_x;
  let new_y;
  let angleRadians;

  if (routeObj[1].y <= routeObj[0].y && routeObj[1].x > routeObj[0].x) {
    console.log("Q1");
    const a = routeObj[0].y - routeObj[1].y;
    const b = routeObj[1].x - routeObj[0].x;
    const c = Math.sqrt(a * a + b * b);
    const newDistance = c - spriteWidth;

    const tangent = b / a;
    angleRadians = Math.atan(tangent);
    const new_a = newDistance * Math.cos(angleRadians);
    const new_b = newDistance * Math.sin(angleRadians);

    new_x = routeObj[0].x + (b - new_b);
    new_y = routeObj[0].y - (a - new_a);
  }

  // Q2
  if (routeObj[1].y < routeObj[0].y && routeObj[1].x <= routeObj[0].x) {
    console.log("Q2");
    const a = routeObj[0].y - routeObj[1].y;
    const b = routeObj[0].x - routeObj[1].x;
    const c = Math.sqrt(a * a + b * b);
    const newDistance = c - spriteWidth;

    const tangent = b / a;
    angleRadians = Math.atan(tangent);
    const new_a = newDistance * Math.cos(angleRadians);
    const new_b = newDistance * Math.sin(angleRadians);

    new_x = routeObj[0].x - (b - new_b);
    new_y = routeObj[0].y - (a - new_a);
  }

  // Q3
  if (routeObj[1].y >= routeObj[0].y && routeObj[1].x < routeObj[0].x) {
    console.log("Q3");
    const a = routeObj[1].y - routeObj[0].y;
    const b = routeObj[0].x - routeObj[1].x;
    const c = Math.sqrt(a * a + b * b);
    const newDistance = c - spriteWidth;

    const tangent = b / a;
    angleRadians = Math.atan(tangent);
    const new_a = newDistance * Math.cos(angleRadians);
    const new_b = newDistance * Math.sin(angleRadians);

    new_x = routeObj[0].x - (b - new_b);
    new_y = routeObj[0].y + (a - new_a);
  }

  // Q4
  if (routeObj[1].y > routeObj[0].y && routeObj[1].x >= routeObj[0].x) {
    console.log("Q4");
    const a = routeObj[1].y - routeObj[0].y;
    const b = routeObj[1].x - routeObj[0].x;
    const c = Math.sqrt(a * a + b * b);
    const newDistance = c - spriteWidth;

    const tangent = b / a;
    angleRadians = Math.atan(tangent);
    const new_a = newDistance * Math.cos(angleRadians);
    const new_b = newDistance * Math.sin(angleRadians);

    new_x = routeObj[0].x + (b - new_b);
    new_y = routeObj[0].y + (a - new_a);
  }

  new_x = Math.round(new_x * 10) / 10;
  new_y = Math.round(new_y * 10) / 10;

  //   console.log(new_x);
  //   console.log(new_y);

  const road = new PIXI.Sprite(spritesheet.textures.road);
  app.stage.addChild(road);
  road.position.set(new_x, new_y);
  road.anchor.set(0.5);
  //   console.log(angleRadians);
  //   road.rotation = angleRadians;

  routeObj[0].x = new_x;
  routeObj[0].y = new_y;

  if (
    isInRange(routeObj[0].x, routeObj[1].x, spriteWidth) &&
    isInRange(routeObj[0].y, routeObj[1].y, spriteWidth)
  ) {
    console.log("reached!");
    routeObj.shift();
    console.log(routeObj);
  }
  await drawRoad(routeObj);

  //   await drawRoad(routeObj);

  // this.position.set(this.x, this.y);
  //   // road.angle = 45;

  // if (
  //   isInRange(this.x, this.route[1].x, this.speed) &&
  //   isInRange(this.y, this.route[1].y, this.speed)
  // ) {
  //   console.log("reached!");
  //   this.route.shift();
  // }
}

function isInRange(number1, number2, limit) {
  const lowerLimit = number2 - limit;
  const upperLimit = number2 + limit;
  if (number1 >= lowerLimit && number1 <= upperLimit) {
    return true;
  } else {
    return false;
  }
}

function checkHitEnemy(bullet, enemies) {
  let hit = false;
  for (let i = 0; i < enemies.length; i++) {
    const dx = Math.abs(bullet.position_x - enemies[i].x);
    const dy = Math.abs(bullet.position_y - enemies[i].y);
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance <= bullet.radius + enemies[i].radius) {
      app.stage.removeChild(bullet);
      bullet.destroy();

      //   enemies[i].health = enemies[i].health - bullet.damage;

      enemies[i].hit(bullet.damage);
      //   console.log(enemies[i].healthWidth);

      if (enemies[i].health <= 0) {
        app.stage.removeChild(enemies[i]);
        enemies[i].destroy();
        enemies.splice(i, 1);
      }

      hit = true;
    }
  }
  return hit;
}

function checkHitWall(bullet) {
  const maxX = bullet.getBounds().maxX;
  const maxY = bullet.getBounds().maxY;
  const minX = bullet.getBounds().minX;
  const minY = bullet.getBounds().minY;

  if (
    minY > app.screen.height ||
    maxY < 0 ||
    maxX < 0 ||
    minX > app.screen.width
  ) {
    return true;
  }

  return false;
}

// const route = [
//     { x: 0, y: 100 },
//     { x: 500, y: 100 },
//     { x: 550, y: 150 },
//     { x: 500, y: 200 },
//     { x: 200, y: 200 },
//     { x: 100, y: 300 },
//     { x: 150, y: 350 },
//     { x: 500, y: 400 },
//     { x: 500, y: 500 },
//   ];

// for (let i = 0; i < route.length; i++) {
//     const pathTileWidth = 50;
//     const pathTile = new PIXI.Graphics();
//     pathTile.roundRect(route[i].x - pathTileWidth, route[i].y - pathTileWidth, 100, 50, 30);
//     pathTile.fill(0x58593e);
//     app.stage.addChild(pathTile);

// }

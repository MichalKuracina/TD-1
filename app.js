const canvasWidth = 700;
const canvasHeight = 500;

const route = [
  { x: 0, y: 100 },
  { x: 500, y: 100 },
  { x: 550, y: 150 },
  { x: 500, y: 200 },
  { x: 200, y: 200 },
  { x: 100, y: 300 },
  { x: 150, y: 350 },
  { x: 500, y: 400 },
  { x: 500, y: 500 },
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
const spawnLimit = 4;
let spawnCounter = 0;

let towerCount = 0;
let enemyCount = 0;
let hudContainer;

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

    const atlasData = {
      frames: {
        enemy1: {
          frame: { x: 0, y: 0, w: 64, h: 64 },
          sourceSize: { w: 64, h: 64 },
          spriteSourceSize: { x: 0, y: 0, w: 64, h: 64 },
        },
        enemy2: {
          frame: { x: 64, y: 0, w: 64, h: 64 },
          sourceSize: { w: 64, h: 64 },
          spriteSourceSize: { x: 0, y: 0, w: 64, h: 64 },
        },
      },
      meta: {
        image: "/assets/roads2W.png",
        // format: 'RGBA8888',
        size: { w: 512, h: 192 },
        // scale: 1
      },
      animations: {
        enemy: ["enemy1", "enemy2"], //array of frames by name
      },
    };

    const texture = await PIXI.Assets.load(atlasData.meta.image);
    const spritesheet = new PIXI.Spritesheet(texture, atlasData);
    await spritesheet.parse();
    const animatedSprite = new PIXI.AnimatedSprite(
      spritesheet.animations.enemy
    );
    app.stage.addChild(animatedSprite);
    animatedSprite.play();
    animatedSprite.animationSpeed = 0.15;
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

    drawPath(route);

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

function drawPath(route) {}

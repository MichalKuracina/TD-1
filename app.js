const canvasWidth = 700;
const canvasHeight = 500;

const route = [
  { x: -64, y: 128 },
  { x: 576, y: 128 },
  { x: 576, y: 320 },
  { x: 256, y: 320 },
  { x: 256, y: 192 },
  { x: 128, y: 192 },
  { x: 128, y: 448 },
  { x: canvasWidth + 64, y: 448 },
];

let bullets = [];
let turrets = [];
let enemies = [];

let app;
let paneObj;
let bullet;
let shootElapsed = 0;
const shootInterval = 1000;

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
// let dragTarget = null;

function run() {
  (async () => {
    app = new PIXI.Application();

    await app.init({
      width: canvasWidth,
      height: canvasHeight,
      backgroundColor: 0x338a4a,
    });
    document.body.appendChild(app.canvas);

    await grass();
    await path(structuredClone(route));
    grid();

    app.stage.eventMode = "static";
    app.stage.hitArea = app.screen;

    turret = new Tower(320, 192, "standard");
    // await turret.initTower();
    turrets.push(turret);

    turret = new Tower(384, 192, "splash");
    // await turret.initTower();
    turrets.push(turret);

    turret = new Tower(448, 192, "slow");
    // await turret.initTower();
    turrets.push(turret);

    // app.stage.addChild(turret);
    // console.log(turrets);
    // turret = new Turret(200, 300, 10, 0x0f03fc);
    // app.stage.addChild(turret);
    // turrets.push(turret);

    // bullet = new Bullet(200, 200, 200, 200, 600, 400, 1);
    // app.stage.addChild(bullet);
    // bullets.push(bullet);

    let enemy = new Enemy(320, 64, 10, 0xfc0303, 1000, 1000, 0, [
      { x: 128, y: 128 },
      { x: 576, y: 64 },
    ]);
    app.stage.addChild(enemy);
    enemies.push(enemy);

    enemy = new Enemy(384, 64, 10, 0xfc0303, 1000, 1000, 0, [
      { x: 128, y: 128 },
      { x: 576, y: 64 },
    ]);
    app.stage.addChild(enemy);
    enemies.push(enemy);

    enemy = new Enemy(448, 64, 10, 0xfc0303, 1000, 1000, 0, [
      { x: 128, y: 128 },
      { x: 576, y: 64 },
    ]);
    app.stage.addChild(enemy);
    enemies.push(enemy);

    // app.stage.addEventListener("pointermove", (e) => {
    //   turrets[0].rotateTower(e.global.x, e.global.y);
    // });

    app.ticker.add(updateTick);
  })();
}

function updateTick(deltaTime) {
  //   hudContainer.children[0].text = `Turrets: ${turrets.length}`;
  //   hudContainer.children[1].text = `Enemies: ${enemies.length}`;

  spawnElapsed += deltaTime.deltaMS;
  shootElapsed += deltaTime.deltaMS;

  if (spawnElapsed >= spawnInterval) {
    spawnElapsed = 0;
    if (spawnCounter < spawnLimit) {
      //   console.log(route);
      //   console.log([0].x);
      //   console.log(route[0].y);
      const enemy = new Enemy(
        route[0].x,
        route[0].y,
        10,
        0xfc0303,
        5,
        5,
        0.5,
        structuredClone(route)
        // Array.from(route)
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
        // console.log("Collision!");
        app.stage.removeChild(enemies[i]);
        enemies[i].destroy();
        enemies.splice(i, 1);
        i--;
      }
    }
  }

  //   // Rotate
  //   if (enemies.length > 0) {
  //     for (let i = 0; i < turrets.length; i++) {
  //       const closesE = turrets[i].getClosesEnemy(enemies);

  //       turrets[i].rotateTower(closesE.x, closesE.y);
  //     }
  //   }

  let bullet = null;
  bullet = turrets[0].shoot2(enemies[0], deltaTime.deltaMS);
  if (bullet) {
    bullet.damage = turrets[0].damage;
    app.stage.addChild(bullet);
    bullets.push(bullet);
  }

  bullet = turrets[1].shoot2(enemies[1], deltaTime.deltaMS);
  if (bullet) {
    bullet.damage = turrets[1].damage;
    app.stage.addChild(bullet);
    bullets.push(bullet);
  }

  bullet = turrets[2].shoot2(enemies[2], deltaTime.deltaMS);
  if (bullet) {
    bullet.damage = turrets[2].damage;
    app.stage.addChild(bullet);
    bullets.push(bullet);
  }

  //   if (shootElapsed >= shootInterval) {
  //     shootElapsed = 0;
  //     if (enemies.length > 0) {
  //       for (let i = 0; i < turrets.length; i++) {
  //         const closesEnemy = turrets[i].getClosesEnemy(enemies);

  //         const bullet = turrets[i].shoot(closesEnemy);

  //         bullet.damage = turrets[i].damage;
  //         app.stage.addChild(bullet);
  //         bullets.push(bullet);
  //       }
  //       //   console.log("s");
  //     }
  //   }

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

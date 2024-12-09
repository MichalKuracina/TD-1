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

    const texture = await PIXI.Assets.load(paneSprites.meta.image);
    const spritesheet = new PIXI.Spritesheet(texture, paneSprites);
    await spritesheet.parse();

    const towerStandardTexture = new PIXI.Sprite(
      spritesheet.textures["standard"]
    );
    let turret = new Tower2(towerStandardTexture, 320, 192, "standard");
    app.stage.addChild(turret);
    turrets.push(turret);

    const towerSplashTexture = new PIXI.Sprite(spritesheet.textures["splash"]);
    turret = new Tower2(towerSplashTexture, 384, 192, "splash");
    app.stage.addChild(turret);
    turrets.push(turret);

    const towerSlowTexture = new PIXI.Sprite(spritesheet.textures["slow"]);
    turret = new Tower2(towerSlowTexture, 448, 192, "slow");
    app.stage.addChild(turret);
    turrets.push(turret);

    let enemy = new Enemy(384, 128, 10, 0xfc0303, 1000, 1000, 0.01, [
      { x: 320, y: 64 },
      { x: 64, y: 64 },
    ]);
    app.stage.addChild(enemy);
    enemies.push(enemy);

    app.ticker.add(updateTick);
  })();
}

function updateTick(deltaTime) {
  //   hudContainer.children[0].text = `Turrets: ${turrets.length}`;
  //   hudContainer.children[1].text = `Enemies: ${enemies.length}`;

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
        0.5,
        structuredClone(route)
      );
      app.stage.addChild(enemy);
      enemies.push(enemy);
      spawnCounter++;
    }
  }

  // Move enemies.
  if (enemies.length > 0) {
    for (let i = 0; i < enemies.length; i++) {
      enemies[i].move(deltaTime.deltaMS);

      if (enemies[i].finished) {
        app.stage.removeChild(enemies[i]);
        enemies[i].destroy();
        enemies.splice(i, 1);
        i--;
      }
    }
  }

  //   if (turrets[0].deleted) {
  //     app.stage.removeChild(turrets[0]);
  //     turrets[0].destroy();
  //     turrets.splice(0, 1);
  //     console.log("deleted");
  //   }

  // Rotate and Shoot.
  if (enemies.length > 0) {
    for (let i = 0; i < turrets.length; i++) {
      const closestEnemy = turrets[i].getClosestEnemy(enemies);
      turrets[i].rotateTower(closestEnemy.x, closestEnemy.y);
      const bullet = turrets[i].shoot(closestEnemy, deltaTime.deltaMS);

      if (bullet) {
        bullet.damage = turrets[i].damage;
        app.stage.addChild(bullet);
        bullets.push(bullet);
      }
    }
  }

  // Move bullets.
  for (let i = 0; i < bullets.length; i++) {
    bullets[i].move();

    if (checkHitEnemy(bullets[i], enemies)) {
      bullets.splice(i, 1);
      i--;

      continue;
    }

    if (checkHitWall(bullets[i])) {
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
      enemies[i].hit(bullet.damage);

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

function checkTowerButtonClicked(pointerPosition, towerUid) {
  // const pointerPosition = event.data.global;
  //   console.log("pointerPositionX " + pointerPosition.x);
  //   console.log("pointerPositionY " + pointerPosition.y);

  const hitObjects = app.stage.children.filter((item) => {
    if (item) {
      return (
        pointerPosition.x > item.tower_x &&
        pointerPosition.x < item.tower_x + item.width &&
        pointerPosition.y > item.tower_y &&
        pointerPosition.y < item.tower_y + item.height &&
        (item.label === "upgrade" + towerUid ||
          item.label === "sell" + towerUid)
        // item.label?.includes(turrets[0].uid)
      );
    }

    // return false;
    // console.log(item?.label);
  });

  if (hitObjects.length === 0 || hitObjects.length > 1) {
    return "";
  } else {
    return hitObjects[0].text.toLowerCase();
  }
}

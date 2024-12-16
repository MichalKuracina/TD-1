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
let towers = [];
let paths = [];
let enemies = [];

let app;
let menu;
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

let gold = 15;
let dragTarget = null;
let twrCircle = null;
let dragTarget_x = 0;
let dragTarget_y = 0;
let towerStandardTexture = null;
// let spritesheet = null;

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
    paths = await path(structuredClone(route), []);
    grid();

    menu = new Menu(gold);
    await menu.initMenu();
    app.stage.addChild(menu);

    const texture = await PIXI.Assets.load(paneSprites.meta.image);
    spritesheet = new PIXI.Spritesheet(texture, paneSprites);
    await spritesheet.parse();

    menu.standardBtn.on("pointerdown", onDragStart, menu.standardBtn);
    menu.splashBtn.on("pointerdown", onDragStart, menu.splashBtn);
    menu.slowBtn.on("pointerdown", onDragStart, menu.slowBtn);

    app.stage.eventMode = "static";
    app.stage.hitArea = app.screen;

    app.stage.on("pointerup", onDragEnd);
    app.stage.on("pointerupoutside", onDragEnd);
    // let turret = new Tower2(towerStandardTexture, 384, 192, "standard");
    // app.stage.addChild(turret);
    // towers.push(turret);

    // const towerSplashTexture = new PIXI.Sprite(spritesheet.textures["splash"]);
    // turret = new Tower2(towerSplashTexture, 384, 192, "splash");
    // app.stage.addChild(turret);
    // towers.push(turret);

    // const towerSlowTexture = new PIXI.Sprite(spritesheet.textures["slow"]);
    // turret = new Tower2(towerSlowTexture, 448, 192, "slow");
    // app.stage.addChild(turret);
    // towers.push(turret);

    // let enemy = new Enemy(355, 128, 10, 0xfc0303, 20, 20, 0.5, [
    //   { x: -64, y: 128 },
    //   { x: canvasWidth + 64, y: 128 },
    // ]);
    // app.stage.addChild(enemy);
    // enemies.push(enemy);

    // enemy = new Enemy(384, 128, 10, 0xfc0303, 20, 20, 0.01, [
    //   { x: 320, y: 64 },
    //   { x: 64, y: 64 },
    // ]);
    // app.stage.addChild(enemy);
    // enemies.push(enemy);

    // enemy = new Enemy(410, 128, 10, 0xfc0303, 20, 20, 0.01, [
    //   { x: 320, y: 64 },
    //   { x: 64, y: 64 },
    // ]);
    // app.stage.addChild(enemy);
    // enemies.push(enemy);

    app.ticker.add(updateTick);
  })();
}

async function onDragStart(event) {
  dragTarget = new PIXI.Sprite(spritesheet.textures[this.label]);
  dragTarget.anchor.set(0.5);
  dragTarget.alpha = 0.5;
  dragTarget.label = this.label;
  dragTarget.position.set(event.data.global.x, event.data.global.y);

  app.stage.addChild(dragTarget);

  twrCircle = new TowerCircle(
    event.data.global.x,
    event.data.global.y,
    this.radius,
    this.bullet_color
  );
  app.stage.addChild(twrCircle);
  dragTarget_x = event.data.global.x;
  dragTarget_y = event.data.global.y;
  app.stage.on("pointermove", onDragMove);
}

function onDragEnd(event) {
  if (dragTarget) {
    app.stage.off("pointermove", onDragMove);

    if (goodToBuild(dragTarget)) {
      const towerTexture = new PIXI.Sprite(
        spritesheet.textures[dragTarget.label]
      );
      const turret = new Tower2(
        towerTexture,
        event.data.global.x,
        event.data.global.y,
        dragTarget.label,
        true
      );
      app.stage.addChild(turret);
      towers.push(turret);
    }

    app.stage.removeChild(dragTarget);
    dragTarget.destroy();
    dragTarget = null;

    app.stage.removeChild(twrCircle);
    twrCircle.destroy();
  }
}

function onDragMove(event) {
  if (dragTarget) {
    if (goodToBuild(dragTarget)) {
      twrCircle.update(
        event.data.global.x - dragTarget_x,
        event.data.global.y - dragTarget_y,
        0x33cc33
      );
    } else {
      twrCircle.update(
        event.data.global.x - dragTarget_x,
        event.data.global.y - dragTarget_y,
        0xff0000
      );
    }
    dragTarget.position.set(event.data.global.x, event.data.global.y);
  }
}

function goodToBuild(dEl) {
  let result = true;

  const elLeftEdge = dEl.x - dEl.width / 3;
  const elRightEdge = dEl.x + dEl.width / 3;
  const elTopEdge = dEl.y - dEl.height / 3;
  const elBottomEdge = dEl.y + dEl.height / 3;

  paths.forEach((item) => {
    const itemLeftEdge = item.x - item.width / 4;
    const itemRightEdge = item.x + item.width / 4;
    const itemTopEdge = item.y - item.height / 4;
    const itemBottomEdge = item.y + item.height / 4;

    if (
      elLeftEdge < itemRightEdge &&
      elRightEdge > itemLeftEdge &&
      elBottomEdge > itemTopEdge &&
      elTopEdge < itemBottomEdge
    ) {
      result = false;
    }
  });

  if (result) {
    towers.forEach((item) => {
      const itemLeftEdge = item.x - item.width / 3;
      const itemRightEdge = item.x + item.width / 3;
      const itemTopEdge = item.y - item.height / 3;
      const itemBottomEdge = item.y + item.height / 3;

      if (
        elLeftEdge < itemRightEdge &&
        elRightEdge > itemLeftEdge &&
        elBottomEdge > itemTopEdge &&
        elTopEdge < itemBottomEdge
      ) {
        result = false;
      }
    });
  }

  if (result) {
    if (
      elLeftEdge < 0 ||
      elRightEdge > canvasWidth ||
      elBottomEdge > canvasHeight ||
      elTopEdge < menu.y + menu.height
    ) {
      result = false;
    }
  }

  return result;
}

function updateTick(deltaTime) {
  //   hudContainer.children[0].text = `Turrets: ${towers.length}`;
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

  // Rotate and Shoot.
  if (enemies.length > 0) {
    for (let i = 0; i < towers.length; i++) {
      const closestEnemy = towers[i].getClosestEnemy(enemies);
      towers[i].rotateTower(closestEnemy.x, closestEnemy.y);
      const bullet = towers[i].shoot(closestEnemy, deltaTime.deltaMS);

      if (bullet) {
        bullet.damage = towers[i].damage;
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

      // Hit primary target.

      enemies[i].hit(bullet.damage, bullet.slowCoefficient);

      const secondaryTargets = enemies.filter(
        (enm) => enm.uid !== enemies[i].uid
      );

      // Hit secondary targets (splash).
      for (let j = 0; j < secondaryTargets.length; j++) {
        const sx = Math.abs(bullet.position_x - secondaryTargets[j].x);
        const sy = Math.abs(bullet.position_y - secondaryTargets[j].y);
        const splashDistance = Math.sqrt(sx * sx + sy * sy);

        if (
          splashDistance <=
          bullet.splashRadius + secondaryTargets[j].radius
        ) {
          secondaryTargets[j].hit(bullet.splashDamage, bullet.slowCoefficient);
        }
      }

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

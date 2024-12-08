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

    const texture = await PIXI.Assets.load(paneSprites.meta.image);
    const spritesheet = new PIXI.Spritesheet(texture, paneSprites);
    await spritesheet.parse();
    const test = new PIXI.Sprite(spritesheet.textures["standard"]);

    turret = new Tower2(test, 320, 192, "standard");

    // await turret.initTower();
    app.stage.addChild(turret);
    turrets.push(turret);

    // turret = new Tower2(384, 192, "splash");
    // // await turret.initTower();
    // turrets.push(turret);

    // turret = new Tower2(448, 192, "slow");
    // // await turret.initTower();
    // turrets.push(turret);

    // app.stage.addChild(turret);
    // console.log(turrets);
    // turret = new Turret(200, 300, 10, 0x0f03fc);
    // app.stage.addChild(turret);
    // turrets.push(turret);

    // bullet = new Bullet(200, 200, 200, 200, 600, 400, 1);
    // app.stage.addChild(bullet);
    // bullets.push(bullet);

    let enemy = new Enemy(320, 64, 10, 0xfc0303, 1000, 1000, 0.01, [
      { x: 320, y: 64 },
      { x: 64, y: 64 },
    ]);
    app.stage.addChild(enemy);
    enemies.push(enemy);

    // enemy = new Enemy(320, 128, 10, 0xfc0303, 1000, 1000, 0.01, [
    //   { x: 320, y: 64 },
    //   { x: 64, y: 64 },
    // ]);
    // app.stage.addChild(enemy);
    // enemies.push(enemy);

    // enemy = new Enemy(448, 64, 10, 0xfc0303, 1000, 1000, 0, [
    //   { x: 128, y: 128 },
    //   { x: 576, y: 64 },
    // ]);
    // app.stage.addChild(enemy);
    // enemies.push(enemy);

    // console.log(turrets[0]);

    // turrets[0].detailButtonSell?.towerButtonContainer?.on(
    //   "pointerdown",
    //   (e) => {
    //     console.log("click");
    //     // app.stage.removeChild(this);
    //     // this.destroy();
    //   }
    // );

    // console.log(turrets[0]);
    // turrets[0].addEventListener("pointerdown", (e) => {
    //   console.log("e");
    // });

    // app.stage.addEventListener("pointermove", (e) => {
    //   turrets[0].rotateTower(e.global.x, e.global.y);
    // });

    // turrets[0].on("pointerdown", (e) => {
    //   console.log("click");
    //   // app.stage.removeChild(this);
    //   // this.destroy();
    // });

    let towerToolTip;
    let towerCircle;
    let towerButtonUpgdare;
    let towerButtonSell;

    turrets[0].on("pointerdown", (event) => {
      //   app.stage.removeChild(turrets[0]);
      //   turrets[0].destroy();
      //   turrets.splice(0, 1);

      //   if (towerToolTip) {
      //     app.stage.removeChild(towerToolTip);
      //     towerToolTip.destroy();
      //   }

      //   if (towerCircle) {
      //     app.stage.removeChild(towerCircle);
      //     towerCircle.destroy();
      //   }

      const buttonOption = checkTowerButtonClicked(
        event.data.global,
        turrets[0].uid
      );

      //   console.log(hitObjects);

      //   if (hitObjects.length === 0) {
      //     return;
      //   }

      switch (buttonOption) {
        case "upgrade":
          turrets[0].upgrade();
          //   const tt = app.stage.children.filter((item) => {
          //     return item.towerUid === "towerToolTip" + turrets[0].uid;
          //   });
          // //   console.log(tt);
          //   tt[0].updateStats(
          //     turrets[0].damage,
          //     turrets[0].speed,
          //     turrets[0].radius
          //   );

          app.stage.removeChild(towerCircle);
          towerCircle.destroy();

          towerCircle = new TowerCircle(
            turrets[0].x,
            turrets[0].y,
            turrets[0].type,
            turrets[0].damage,
            turrets[0].speed,
            turrets[0].radius,
            turrets[0].effect,
            turrets[0].bullet_color,
            turrets[0].width,
            turrets[0].height,
            turrets[0].uid
          );

          app.stage.addChild(towerCircle);

          app.stage.removeChild(towerToolTip);
          towerToolTip.destroy();

          towerToolTip = new TowerToolTip(
            turrets[0].x,
            turrets[0].y,
            turrets[0].type,
            turrets[0].damage,
            turrets[0].speed,
            turrets[0].radius,
            turrets[0].effect,
            turrets[0].bullet_color,
            turrets[0].width,
            turrets[0].height,
            turrets[0].uid
          );

          app.stage.addChild(towerToolTip);

          app.stage.removeChild(towerButtonUpgdare);
          towerButtonUpgdare.destroy();

          app.stage.removeChild(towerButtonSell);
          towerButtonSell.destroy();

          towerButtonUpgdare = new TowerButton(
            turrets[0].x - 16,
            turrets[0].y - 14,
            turrets[0].bullet_color,
            "Upgrade",
            "upgrade" + turrets[0].uid
          );
          app.stage.addChild(towerButtonUpgdare);

          towerButtonSell = new TowerButton(
            turrets[0].x - 16,
            turrets[0].y + 5,
            turrets[0].bullet_color,
            "Sell",
            "sell" + turrets[0].uid
          );
          app.stage.addChild(towerButtonSell);

          break;
        case "sell":
          app.stage.removeChild(turrets[0]);
          turrets[0].destroy();
          turrets.splice(0, 1);

          app.stage.removeChild(towerToolTip);
          towerToolTip.destroy();

          app.stage.removeChild(towerCircle);
          towerCircle.destroy();

          app.stage.removeChild(towerButtonUpgdare);
          towerButtonUpgdare.destroy();

          app.stage.removeChild(towerButtonSell);
          towerButtonSell.destroy();
          break;

        default:
          // do nothing
          break;
      }

      //   if (hitObjects.length > 0) {
      //     // Get the topmost object (last in rendering order)
      //     const topmostObject = hitObjects[hitObjects.length - 1];
      //     console.log(`Topmost Object: ${topmostObject.name}`);
      //   } else {
      //     console.log("No object hit");
      //   }
    });

    turrets[0].on("pointerenter", (event) => {
      //   if (turrets[0].cursorEntered) {
      //     return;
      //   }

      //   turrets[0].cursorEntered = true;

      //   turrets[0].eventMode = "none";

      towerCircle = new TowerCircle(
        turrets[0].x,
        turrets[0].y,
        turrets[0].type,
        turrets[0].damage,
        turrets[0].speed,
        turrets[0].radius,
        turrets[0].effect,
        turrets[0].bullet_color,
        turrets[0].width,
        turrets[0].height,
        turrets[0].uid
      );

      app.stage.addChild(towerCircle);

      towerToolTip = new TowerToolTip(
        turrets[0].x,
        turrets[0].y,
        turrets[0].type,
        turrets[0].damage,
        turrets[0].speed,
        turrets[0].radius,
        turrets[0].effect,
        turrets[0].bullet_color,
        turrets[0].width,
        turrets[0].height,
        turrets[0].uid
      );

      app.stage.addChild(towerToolTip);

      //   console.log(turrets[0].x);
      towerButtonUpgdare = new TowerButton(
        turrets[0].x - 16,
        turrets[0].y - 14,
        turrets[0].bullet_color,
        "Upgrade",
        "upgrade" + turrets[0].uid
      );
      app.stage.addChild(towerButtonUpgdare);

      towerButtonSell = new TowerButton(
        turrets[0].x - 16,
        turrets[0].y + 5,
        turrets[0].bullet_color,
        "Sell",
        "sell" + turrets[0].uid
      );
      app.stage.addChild(towerButtonSell);

      //   //   this.detailButtonUpgrade = new TowerButton(
      //   //     this.x - 18,
      //   //     this.y - 16,
      //   //     this.bullet_color,
      //   //     "Upgrade"
      //   //   );
      //   //   app.stage.addChild(this.detailButtonUpgrade.towerButtonContainer);
      //   this.detailButtonSell = new TowerButton(
      //     this.x - 18,
      //     this.y + 3,
      //     this.bullet_color,
      //     "Sell"
      //   );
      //   app.stage.addChild(this.detailButtonSell.towerButtonContainer);

      //   //   this.detailButtonUpgrade.towerButtonContainer.on("pointerdown", (e) => {
      //   //     console.log("upgrade");
      //   //     this.damage += 1;
      //   //     this.cursorEntered = false;

      //   //     app.stage.removeChild(this.detailTooltip.toolTipContainer);
      //   //     this.detailTooltip.toolTipContainer.destroy();

      //   //     app.stage.removeChild(this.detailButtonUpgrade.towerButtonContainer);
      //   //     this.detailButtonUpgrade.towerButtonContainer.destroy();

      //   //     app.stage.removeChild(this.detailButtonSell.towerButtonContainer);
      //   //     this.detailButtonSell.towerButtonContainer.destroy();
      //   //   });
    });

    turrets[0].on("pointerleave", (event) => {
      //   const mousePosition = event.data.global;
      //   if (
      //     mousePosition.x > turrets[0].x - 32 &&
      //     mousePosition.x < turrets[0].x + 32 &&
      //     mousePosition.y < turrets[0].y + 32 &&
      //     mousePosition.y > turrets[0].y - 32
      //   ) {
      //     return;
      //   }

      //   turrets[0].cursorEntered = false;

      //   const mousePosition = event.data.global;
      //   if (
      //     mousePosition.x > this.x - 32 &&
      //     mousePosition.x < this.x + 32 &&
      //     mousePosition.y < this.y + 32 &&
      //     mousePosition.y > this.y - 32
      //   ) {
      //     return;
      //   }

      //   this.cursorEntered = false;

      app.stage.removeChild(towerToolTip);
      towerToolTip.destroy();

      app.stage.removeChild(towerCircle);
      towerCircle.destroy();

      app.stage.removeChild(towerButtonUpgdare);
      towerButtonUpgdare.destroy();

      app.stage.removeChild(towerButtonSell);
      towerButtonSell.destroy();

      //   app.stage.removeChild(this.detailButtonUpgrade.towerButtonContainer);
      //   this.detailButtonUpgrade.towerButtonContainer.destroy();

      //   app.stage.removeChild(this.detailButtonSell.towerButtonContainer);
      //   this.detailButtonSell.towerButtonContainer.destroy();
    });

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

  if (turrets[0].deleted) {
    app.stage.removeChild(turrets[0]);
    turrets[0].destroy();
    turrets.splice(0, 1);
    console.log("deleted");
  }

  // Rotate
  if (enemies.length > 0) {
    for (let i = 0; i < turrets.length; i++) {
      const closesE = turrets[i].getClosesEnemy(enemies);

      turrets[i].rotateTower(closesE.x, closesE.y);
    }
  }

  let bullet = null;

  if (turrets[0]) {
    bullet = turrets[0].shoot2(enemies[0], deltaTime.deltaMS);
    if (bullet) {
      bullet.damage = turrets[0].damage;
      app.stage.addChild(bullet);
      bullets.push(bullet);
    }
  }

  //   if (turrets[0]) {
  //     bullet = turrets[1].shoot2(enemies[1], deltaTime.deltaMS);
  //     if (bullet) {
  //       bullet.damage = turrets[1].damage;
  //       app.stage.addChild(bullet);
  //       bullets.push(bullet);
  //     }
  //   }
  //   if (turrets[0]) {
  //     bullet = turrets[2].shoot2(enemies[2], deltaTime.deltaMS);
  //     if (bullet) {
  //       bullet.damage = turrets[2].damage;
  //       app.stage.addChild(bullet);
  //       bullets.push(bullet);
  //     }
  //   }
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
      //   console.log("Hit!");

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

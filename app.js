const canvasWidth = 700;
const canvasHeight = 500;

let bullets = [];
let app;
let bullet;
let elapsed = 0;
const interval = 1000;

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

    // app.stage.on("pointerdown", (event) => {
    //   const mousePosition = event.data.global;
    //   createBullet(Math.round(mousePosition.x), Math.round(mousePosition.y));
    // });

    app.stage.eventMode = "static";
    app.stage.hitArea = app.screen;

    turret = new Turret(200, 200, 10, 0x0f03fc);
    app.stage.addChild(turret);

    enemy = new Enemy(600, 400, 10, 0xfc0303);
    app.stage.addChild(enemy);

    bullet = new Bullet3(200, 200, 200, 200, 600, 400, 1);
    app.stage.addChild(bullet);
    bullets.push(bullet);

    app.ticker.add(updateTick);
  })();
}

function updateTick(deltaTime) {
  elapsed += deltaTime.deltaMS;

  //   if (elapsed >= interval) {
  //     elapsed = 0;
  //     const b1 = turret.shoot(enemy);
  //     app.stage.addChild(b1);
  //     bullets.push(b1);
  //   }

  for (let i = 0; i < bullets.length; i++) {
    bullets[i].move();

    if (checkHitEnemy(bullets[i], enemy)) {
      console.log("Hit!");
      app.stage.removeChild(bullets[i]);
      bullets[i].destroy();
      bullets.splice(i, 1);
      i--;

      app.stage.removeChild(enemy);
      enemy.destroy();
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

function checkHitEnemy(bullet, enemy) {
  const dx = Math.abs(bullet.position_x - enemy.x);
  const dy = Math.abs(bullet.position_y - enemy.y);
  const distance = Math.sqrt(dx * dx + dy * dy);

  return distance <= bullet.radius + enemy.radius;
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

class Tower2 extends PIXI.Sprite {
  constructor(texture, x = 0, y = 0, type = "standard") {
    super(texture);
    this.x = x;
    this.y = y;
    this.type = type;
    this.level = 1;
    this.damage = 1;
    this.speed = 1000;
    this.rateOfFire = this.speed;
    this.maxSpeed = 100;
    this.speedStep = 100;
    this.radius = 100;
    this.effect = "none";
    this.bullet_radius = 5;
    this.bullet_color = 0xf4fc03;
    this.bullet_speed = 1;
    this.bullet_splashRadius = 0;
    this.shotTimeElapsed = 0;
    this.detailTooltip = null;
    this.detailButtonUpgrade = null;
    this.detailButtonSell = null;
    this.cost = 5;
    this.towerToolTip = null;
    this.towerCircle = null;
    this.towerButtonUpgdare = null;
    this.towerButtonSell = null;

    this.initTower();
  }

  async initTower() {
    switch (this.type) {
      case "splash":
        this.damage = 3;
        this.speed = 2000;
        this.speedStep = 150;
        this.radius = 200;
        this.effect = "splash";
        this.bullet_radius = 5;
        this.bullet_color = 0x996863;
        this.bullet_speed = 1.3;
        this.cost = 10;
        this.maxSpeed = 200;
        this.bullet_splashRadius = 25;
        break;

      case "slow":
        this.damage = 2;
        this.speed = 3000;
        this.speedStep = 200;
        this.radius = 100;
        this.effect = "slow";
        this.bullet_radius = 7;
        this.bullet_color = 0x85b4f2;
        this.bullet_speed = 1.2;
        this.cost = 15;
        this.maxSpeed = 300;
        this.bullet_splashRadius = 0;
        break;

      default: // "standard"
        this.damage = 1;
        this.speed = 1000;
        this.speedStep = 100;
        this.radius = 300;
        this.effect = "none";
        this.bullet_radius = 3.5;
        this.bullet_color = 0x56a843;
        this.bullet_speed = 1;
        this.cost = 5;
        this.maxSpeed = 100;
        this.bullet_splashRadius = 0;
        break;
    }

    this.position.set(this.x, this.y);
    this.anchor.set(0.5);
    this.label = this.type;
    this.name = this.type;
    this.eventMode = "static";

    this.on("pointerdown", (event) => {
      const buttonOption = this.checkTowerButtonClicked(
        event.data.global,
        this.uid
      );

      switch (buttonOption) {
        case "upgrade":
          this.upgrade();
          this.destroyTowerSprites();
          this.addTowerSprites();
          break;
        case "sell":
          app.stage.removeChild(this);
          this.destroy();

          const towerIndex = turrets.findIndex(
            (obj) => obj["uid"] === this.uid
          );
          turrets.splice(towerIndex, 1);
          this.destroyTowerSprites();
          break;

        default:
          // Do nothing.
          break;
      }
    });

    this.on("pointerenter", (event) => {
      this.addTowerSprites();
    });

    this.on("pointerleave", (event) => {
      this.destroyTowerSprites();
    });
  }

  addTowerSprites() {
    // Add circle.
    this.towerCircle = new TowerCircle(
      this.x,
      this.y,
      this.radius,
      this.bullet_color
    );
    app.stage.addChild(this.towerCircle);

    // Add tooltip.
    this.towerToolTip = new TowerToolTip(
      this.x,
      this.y,
      this.type,
      this.damage,
      this.speed,
      this.radius,
      this.effect,
      this.bullet_color,
      this.width,
      this.height,
      this.uid,
      this.level,
      this.cost
    );
    app.stage.addChild(this.towerToolTip);

    // Add upgrade button.
    this.towerButtonUpgdare = new TowerButton(
      this.x - 16,
      this.y - 14,
      this.bullet_color,
      "Upgrade",
      "upgrade" + this.uid
    );
    app.stage.addChild(this.towerButtonUpgdare);

    // Add sell button.
    this.towerButtonSell = new TowerButton(
      this.x - 16,
      this.y + 5,
      this.bullet_color,
      "Sell",
      "sell" + this.uid
    );
    app.stage.addChild(this.towerButtonSell);
  }

  destroyTowerSprites() {
    // Destroy tooltip.
    app.stage.removeChild(this.towerToolTip);
    this.towerToolTip.destroy();
    // Destroy circle.
    app.stage.removeChild(this.towerCircle);
    this.towerCircle.destroy();
    // Destroy upgrade button.
    app.stage.removeChild(this.towerButtonUpgdare);
    this.towerButtonUpgdare.destroy();
    // Destroy sell button.
    app.stage.removeChild(this.towerButtonSell);
    this.towerButtonSell.destroy();
  }

  upgrade() {
    this.damage += 1;
    this.radius += 10;
    this.cost += 1;

    if (this.rateOfFire - this.speedStep > this.maxSpeed) {
      this.speed += this.speedStep;
      this.level += 1;
      this.rateOfFire -= this.speedStep;
    }
  }

  checkTowerButtonClicked(pointerPosition, towerUid) {
    const hitObjects = app.stage.children.filter((item) => {
      if (item) {
        return (
          pointerPosition.x > item.tower_x &&
          pointerPosition.x < item.tower_x + item.width &&
          pointerPosition.y > item.tower_y &&
          pointerPosition.y < item.tower_y + item.height &&
          (item.label === "upgrade" + towerUid ||
            item.label === "sell" + towerUid)
        );
      }
    });

    if (hitObjects.length === 0 || hitObjects.length > 1) {
      return "";
    } else {
      return hitObjects[0].text.toLowerCase();
    }
  }

  rotateTower(x, y) {
    const dx = x - this.x;
    const dy = y - this.y;
    const angle = Math.atan2(dy, dx);
    const rotationOffset = Math.PI / 2;
    this.rotation = angle + rotationOffset;
  }

  shoot(enemy, deltaMS) {
    this.shotTimeElapsed += deltaMS;

    if (this.shotTimeElapsed >= this.rateOfFire) {
      //   console.log(this.shotTimeElapsed);
      this.shotTimeElapsed = 0;
      const enemy_x = enemy.x;
      const enemy_y = enemy.y;

      const dx = Math.abs(enemy_x - this.x);
      const dy = Math.abs(enemy_y - this.y);
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > this.radius) {
        // Don't shoot. Target is out of range.
        return;
      }

      return new Bullet(
        this.x,
        this.y,
        this.x,
        this.y,
        enemy_x,
        enemy_y,
        this.bullet_speed,
        this.bullet_radius,
        this.bullet_color,
        this.damage,
        this.bullet_splashRadius
      );
    }
  }

  getClosestEnemy(enemies) {
    let currentEnemyDistance;
    let closesEnemyDistance;
    let closesEnemyObject;

    for (let i = 0; i < enemies.length; i++) {
      // Q1
      if (enemies[i].y <= this.y && enemies[i].x > this.x) {
        //   console.log("Q1");
        const a = this.y - enemies[i].y;
        const b = enemies[i].x - this.x;
        currentEnemyDistance = Math.sqrt(a * a + b * b);
      }

      // Q2
      if (enemies[i].y < this.y && enemies[i].x <= this.x) {
        //   console.log("Q2");
        const a = this.y - enemies[i].y;
        const b = this.x - enemies[i].x;
        currentEnemyDistance = Math.sqrt(a * a + b * b);
      }

      // Q3
      if (enemies[i].y >= this.y && enemies[i].x < this.x) {
        //   console.log("Q3");
        const a = enemies[i].y - this.y;
        const b = this.x - enemies[i].x;
        currentEnemyDistance = Math.sqrt(a * a + b * b);
      }

      // Q4
      if (enemies[i].y > this.y && enemies[i].x >= this.x) {
        //   console.log("Q4");
        const a = enemies[i].y - this.y;
        const b = enemies[i].x - this.x;
        currentEnemyDistance = Math.sqrt(a * a + b * b);
      }

      if (i === 0) {
        closesEnemyDistance = currentEnemyDistance;
        closesEnemyObject = enemies[i];
        continue;
      }

      if (currentEnemyDistance < closesEnemyDistance) {
        closesEnemyDistance = currentEnemyDistance;
        closesEnemyObject = enemies[i];
      }
    }
    // console.log(closesEnemyObject.x);
    return closesEnemyObject;
  }
}

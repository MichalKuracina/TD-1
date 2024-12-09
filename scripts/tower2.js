class Tower2 extends PIXI.Sprite {
  constructor(texture, x = 0, y = 0, type = "standard") {
    super(texture);
    this.x = x;
    this.y = y;
    this.type = type;
    this.damage = 1;
    this.speed = 1000;
    this.radius = 100;
    this.effect = "none";
    this.bullet_radius = 5;
    this.bullet_color = 0xf4fc03;
    this.bullet_speed = 1;
    this.shotTimeElapsed = 0;
    this.detailTooltip = null;
    this.detailButtonUpgrade = null;
    this.detailButtonSell = null;
    this.cost = 5;
    this.cursorEntered = false;
    this.deleted = false;

    this.initTower();
  }

  async initTower() {
    switch (this.type) {
      case "splash":
        this.damage = 3;
        this.speed = 2000;
        this.radius = 200;
        this.effect = "splash";
        this.bullet_radius = 5;
        this.bullet_color = 0x996863;
        this.bullet_speed = 1;
        this.cost = 10;
        break;

      case "slow":
        this.damage = 2;
        this.speed = 3000;
        this.radius = 100;
        this.effect = "slow";
        this.bullet_radius = 7;
        this.bullet_color = 0x85b4f2;
        this.bullet_speed = 1;
        this.cost = 15;
        break;

      default: // "standard"
        this.damage = 1;
        this.speed = 1000;
        this.radius = 300;
        this.effect = "none";
        this.bullet_radius = 3.5;
        this.bullet_color = 0x56a843;
        this.bullet_speed = 1;
        this.cost = 5;
        break;
    }

    this.position.set(this.x, this.y);
    this.anchor.set(0.5);
    this.label = this.type;
    this.name = this.type;
    this.eventMode = "static";
  }

  upgrade() {
    this.damage += 1;
    this.speed -= 100;
    this.radius += 10;
    this.cost += 1;
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

    if (this.shotTimeElapsed >= this.speed) {
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
        this.damage
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

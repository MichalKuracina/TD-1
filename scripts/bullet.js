class Bullet extends PIXI.Graphics {
  constructor(
    position_x,
    position_y,
    turret_x,
    turret_y,
    enemy_x,
    enemy_y,
    speed = 1,
    radius = 5,
    color = 0xf4fc03,
    damage = 1,
    splashRadius = 0,
    slowCoefficient = 0,
    effect = "none",
    enemy_uid
  ) {
    super();
    this.position_x = position_x;
    this.position_y = position_y;
    this.turret_x = turret_x;
    this.turret_y = turret_y;
    this.enemy_x = enemy_x;
    this.enemy_y = enemy_y;
    this.speed = speed;
    this.radius = radius;
    this.color = color;
    this.damage = damage;
    this.splashDamage = this.damage / 2;
    this.splashRadius = splashRadius;
    this.slowCoefficient = slowCoefficient;
    this.effect = effect;
    this.enemy_uid = enemy_uid;

    this.distance = 0;
    this.zIndex = 999;

    this.drawBullet();
  }

  drawBullet() {
    this.circle(0, 0, this.radius);
    this.fill(this.color);
  }

  move() {
    this.distance++;

    // Q1
    if (this.enemy_y <= this.turret_y && this.enemy_x > this.turret_x) {
      //   console.log("Q1");
      const a = this.turret_y - this.enemy_y;
      const b = this.enemy_x - this.turret_x;
      const c = Math.sqrt(a * a + b * b);
      const newDistance = c - this.distance * this.speed;

      const tangent = b / a;
      const angleRadians = Math.atan(tangent);
      const new_a = newDistance * Math.cos(angleRadians);
      const new_b = newDistance * Math.sin(angleRadians);

      const new_x = this.turret_x + (b - new_b);
      const new_y = this.turret_y - (a - new_a);

      this.position_x = new_x;
      this.position_y = new_y;
      this.position.set(this.position_x, this.position_y);
    }

    // Q2
    if (this.enemy_y < this.turret_y && this.enemy_x <= this.turret_x) {
      //   console.log("Q2");
      const a = this.turret_y - this.enemy_y;
      const b = this.turret_x - this.enemy_x;
      const c = Math.sqrt(a * a + b * b);
      const newDistance = c - this.distance * this.speed;

      const tangent = b / a;
      const angleRadians = Math.atan(tangent);
      const new_a = newDistance * Math.cos(angleRadians);
      const new_b = newDistance * Math.sin(angleRadians);

      const new_x = this.turret_x - (b - new_b);
      const new_y = this.turret_y - (a - new_a);

      this.position_x = new_x;
      this.position_y = new_y;
      this.position.set(this.position_x, this.position_y);
    }

    // Q3
    if (this.enemy_y >= this.turret_y && this.enemy_x < this.turret_x) {
      //   console.log("Q3");
      const a = this.enemy_y - this.turret_y;
      const b = this.turret_x - this.enemy_x;
      const c = Math.sqrt(a * a + b * b);
      const newDistance = c - this.distance * this.speed;

      const tangent = b / a;
      const angleRadians = Math.atan(tangent);
      const new_a = newDistance * Math.cos(angleRadians);
      const new_b = newDistance * Math.sin(angleRadians);

      const new_x = this.turret_x - (b - new_b);
      const new_y = this.turret_y + (a - new_a);

      this.position_x = new_x;
      this.position_y = new_y;
      this.position.set(this.position_x, this.position_y);
    }

    // Q4
    if (this.enemy_y > this.turret_y && this.enemy_x >= this.turret_x) {
      //   console.log("Q4");
      const a = this.enemy_y - this.turret_y;
      const b = this.enemy_x - this.turret_x;
      const c = Math.sqrt(a * a + b * b);
      const newDistance = c - this.distance * this.speed;

      const tangent = b / a;
      const angleRadians = Math.atan(tangent);
      const new_a = newDistance * Math.cos(angleRadians);
      const new_b = newDistance * Math.sin(angleRadians);

      const new_x = this.turret_x + (b - new_b);
      const new_y = this.turret_y + (a - new_a);

      this.position_x = new_x;
      this.position_y = new_y;
      this.position.set(this.position_x, this.position_y);
    }
  }
  moveToEnemy(enemyX, enemyY) {
    this.distance++;
    this.enemy_x = enemyX;
    this.enemy_y = enemyY;

    // Q1
    if (this.enemy_y <= this.turret_y && this.enemy_x > this.turret_x) {
      //   console.log("Q1");
      const a = this.turret_y - this.enemy_y;
      const b = this.enemy_x - this.turret_x;
      const c = Math.sqrt(a * a + b * b);
      const newDistance = c - this.distance * this.speed;

      const tangent = b / a;
      const angleRadians = Math.atan(tangent);
      const new_a = newDistance * Math.cos(angleRadians);
      const new_b = newDistance * Math.sin(angleRadians);

      const new_x = this.turret_x + (b - new_b);
      const new_y = this.turret_y - (a - new_a);

      this.position_x = new_x;
      this.position_y = new_y;
      this.position.set(this.position_x, this.position_y);
    }

    // Q2
    if (this.enemy_y < this.turret_y && this.enemy_x <= this.turret_x) {
      //   console.log("Q2");
      const a = this.turret_y - this.enemy_y;
      const b = this.turret_x - this.enemy_x;
      const c = Math.sqrt(a * a + b * b);
      const newDistance = c - this.distance * this.speed;

      const tangent = b / a;
      const angleRadians = Math.atan(tangent);
      const new_a = newDistance * Math.cos(angleRadians);
      const new_b = newDistance * Math.sin(angleRadians);

      const new_x = this.turret_x - (b - new_b);
      const new_y = this.turret_y - (a - new_a);

      this.position_x = new_x;
      this.position_y = new_y;
      this.position.set(this.position_x, this.position_y);
    }

    // Q3
    if (this.enemy_y >= this.turret_y && this.enemy_x < this.turret_x) {
      //   console.log("Q3");
      const a = this.enemy_y - this.turret_y;
      const b = this.turret_x - this.enemy_x;
      const c = Math.sqrt(a * a + b * b);
      const newDistance = c - this.distance * this.speed;

      const tangent = b / a;
      const angleRadians = Math.atan(tangent);
      const new_a = newDistance * Math.cos(angleRadians);
      const new_b = newDistance * Math.sin(angleRadians);

      const new_x = this.turret_x - (b - new_b);
      const new_y = this.turret_y + (a - new_a);

      this.position_x = new_x;
      this.position_y = new_y;
      this.position.set(this.position_x, this.position_y);
    }

    // Q4
    if (this.enemy_y > this.turret_y && this.enemy_x >= this.turret_x) {
      //   console.log("Q4");
      const a = this.enemy_y - this.turret_y;
      const b = this.enemy_x - this.turret_x;
      const c = Math.sqrt(a * a + b * b);
      const newDistance = c - this.distance * this.speed;

      const tangent = b / a;
      const angleRadians = Math.atan(tangent);
      const new_a = newDistance * Math.cos(angleRadians);
      const new_b = newDistance * Math.sin(angleRadians);

      const new_x = this.turret_x + (b - new_b);
      const new_y = this.turret_y + (a - new_a);

      this.position_x = new_x;
      this.position_y = new_y;
      this.position.set(this.position_x, this.position_y);
    }
  }
}

class Turret extends PIXI.Graphics {
  constructor(
    x = 0,
    y = 0,
    radius = 10,
    color = 0x0f03fc,
    damage = 1,
    speed = 1
  ) {
    super();
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.damage = damage;
    this.speed = speed;

    this.bullet_radius = 5;
    this.bullet_color = 0xf4fc03;

    this.drawTurret();
  }

  drawTurret() {
    this.circle(0, 0, this.radius);
    this.fill(this.color);
  }

  shoot(enemy) {
    const enemy_x = enemy.x;
    const enemy_y = enemy.y;
    return new Bullet(
      this.x,
      this.y,
      this.x,
      this.y,
      enemy_x,
      enemy_y,
      this.speed,
      this.bullet_radius,
      this.bullet_color,
      this.damage
    );
  }

  getClosesEnemy(enemies) {
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
    return closesEnemyObject;
  }
}

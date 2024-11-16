class Turret extends PIXI.Graphics {
  constructor(x = 0, y = 0, radius = 10, color = 0x0f03fc) {
    super();
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;

    this.drawTurret();
  }

  drawTurret() {
    this.circle(0, 0, this.radius);
    this.fill(this.color);
  }

  shoot(enemy) {
    const enemy_x = enemy.position._x;
    const enemy_y = enemy.position._y;
    // console.log(enemy_X);
    return new Bullet3(this.x, this.y, this.x, this.y, enemy_x, enemy_y, 1);
    // return new Bullet2(this.x, this.y, enemy_x, enemy_y);
  }

  getClosesEnemy(enemies) {
    let currentEnemyDistance;
    let closesEnemyDistance;

    for (let i = 0; i < enemies.length; i++) {
      // Q1
      if (
        enemies[i].enemy_y <= this.turret_y &&
        enemies[i].enemy_x > this.turret_x
      ) {
        //   console.log("Q1");
        const a = this.turret_y - enemies[i].enemy_y;
        const b = enemies[i].enemy_x - this.turret_x;
        currentEnemyDistance = Math.sqrt(a * a + b * b);
      }

      // Q2
      if (
        enemies[i].enemy_y < this.turret_y &&
        enemies[i].enemy_x <= this.turret_x
      ) {
        //   console.log("Q2");
        const a = this.turret_y - enemies[i].enemy_y;
        const b = this.turret_x - enemies[i].enemy_x;
        currentEnemyDistance = Math.sqrt(a * a + b * b);
      }

      // Q3
      if (
        enemies[i].enemy_y >= this.turret_y &&
        enemies[i].enemy_x < this.turret_x
      ) {
        //   console.log("Q3");
        const a = enemies[i].enemy_y - this.turret_y;
        const b = this.turret_x - enemies[i].enemy_x;
        currentEnemyDistance = Math.sqrt(a * a + b * b);
      }

      // Q4
      if (
        enemies[i].enemy_y > this.turret_y &&
        enemies[i].enemy_x >= this.turret_x
      ) {
        //   console.log("Q4");
        const a = enemies[i].enemy_y - this.turret_y;
        const b = enemies[i].enemy_x - this.turret_x;
        currentEnemyDistance = Math.sqrt(a * a + b * b);
      }
    }
    return closesEnemyDistance;
  }

  //   // Method to update the circle's color
  //   setColor(newColor) {
  //     this.color = newColor;
  //     this.drawCircle(); // Redraw with the new color
  //   }

  //   // Method to update the circle's radius
  //   setRadius(newRadius) {
  //     this.radius = newRadius;
  //     this.drawCircle(); // Redraw with the new radius
  //   }
}

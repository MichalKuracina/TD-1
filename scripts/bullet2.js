class Bullet2 extends PIXI.Graphics {
  constructor(
    turret_x,
    turret_y,
    enemy_x,
    enemy_y,
    speed = 1,
    radius = 5,
    color = 0xf4fc03
  ) {
    super();
    this.turret_x = turret_x;
    this.turret_y = turret_y;
    this.enemy_x = enemy_x;
    this.enemy_y = enemy_y;
    this.speed = speed;
    this.radius = radius;
    this.color = color;

    this.drawBullet();
  }

  drawBullet() {
    this.circle(0, 0, this.radius);
    // this.circle(this.turret_x, this.turret_y, this.radius);
    this.fill(this.color);
  }

  updateTurretCoordinates(x, y) {
    this.turret_x = x;
    this.turret_y = y;
    this.position.set(this.turret_x, this.turret_y);
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

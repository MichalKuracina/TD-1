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

  shoot() {
    const enemy_x = enemy.position._x;
    const enemy_y = enemy.position._y;
    // console.log(enemy_X);
    return new Bullet2(this.x, this.y, enemy_x, enemy_y);
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

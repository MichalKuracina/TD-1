class Bullet extends PIXI.Graphics {
  constructor(x = 0, y = 0, speed = 1, radius = 5, color = 0xf4fc03) {
    super();
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.radius = radius;
    this.color = color;

    this.drawBullet();
  }

  drawBullet() {
    this.circle(0, 0, this.radius);
    this.fill(this.color);
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

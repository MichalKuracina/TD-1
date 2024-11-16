class Enemy extends PIXI.Graphics {
  constructor(x = 0, y = 0, radius = 10, color = 0xff0000) {
    super();
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;

    this.drawEnemy();
  }

  drawEnemy() {
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

class Enemy extends PIXI.Graphics {
  constructor(x = 0, y = 0, radius = 10, color = 0xff0000, health = 2) {
    super();
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.health = health;

    this.drawEnemy();
  }

  drawEnemy() {
    // Enemy
    this.circle(0, 0, this.radius);
    this.fill(this.color);

    // Health Bar - Container
    this.rect(
      -this.radius,
      -(this.radius * 2),
      this.radius * 2,
      this.radius / 1.5
    );
    this.fill(0xfcfcfc);

    // Health Bar - health
    this.rect(
      -this.radius + 1,
      -(this.radius * 2) + 1,
      this.radius * 2 - 2,
      this.radius / 1.5 - 2
    );
    this.fill(0xfa0707);
  }
}

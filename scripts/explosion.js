class Explosion extends PIXI.Graphics {
  constructor(x = 0, y = 0, radius = 32, color = 0x56a843) {
    super();
    this.explosion_x = x;
    this.explosion_y = y;
    this.radius = radius;
    this.currentRadius = 2;
    this.color = color;
    this.exlosionFinished = false;
    this.transparency = 1;
  }

  explode() {
    this.clear();
    this.transparency = this.transparency - 0.05;
    this.currentRadius = Math.round(this.currentRadius * 1.2 * 10) / 10;
    this.circle(this.explosion_x, this.explosion_y, this.currentRadius);
    this.fill(this.color);
    this.alpha = this.transparency;

    if (this.currentRadius > this.radius) {
      this.exlosionFinished = true;
    }
  }
}

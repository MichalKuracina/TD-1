class TowerCircle extends PIXI.Graphics {
  constructor(x = 0, y = 0, radius = 100, color = 0x56a843) {
    super();
    this.tower_x = x;
    this.tower_y = y;
    this.radius = radius;
    this.color = color;

    this.initTowerCircle();
  }

  async initTowerCircle() {
    this.eventMode = "none";

    this.circle(this.tower_x, this.tower_y, this.radius);
    this.fill(this.color);
    this.alpha = 0.3;
  }

  //   changePosition(x, y) {
  //     this.position.set(x, y);
  //   }

  //   changeColor(newColor) {
  //     // console.log("ss");
  //     this.clear();
  //     this.circle(this.tower_x, this.tower_y, this.radius);
  //     this.fill(newColor);
  //     this.alpha = 0.3;
  //   }

  update(x, y, newColor) {
    this.clear();
    this.circle(this.tower_x, this.tower_y, this.radius);
    this.position.set(x, y);
    this.fill(newColor);
    this.alpha = 0.3;
  }
}

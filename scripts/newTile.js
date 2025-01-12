class NewTile extends PIXI.Graphics {
  constructor(x, y, label) {
    super();
    this.x = x;
    this.y = y;
    this.label = label;
    this.eventMode = "static";
    this.cursor = "pointer";

    this.initNewTile();
  }

  initNewTile() {
    this.circle(0, 0, 16);
    this.fill(0xffffff);
    this.alpha = 0.5;
  }
}

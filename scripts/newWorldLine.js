class NewWorldLine extends PIXI.Graphics {
  constructor(x1, y1, x2, y2) {
    super();
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;

    this.label = "newWorlLine";

    this.initNewWorldLine();
  }

  initNewWorldLine() {
    this.moveTo(this.x1, this.y1);
    this.lineTo(this.x2, this.y2);
    this.stroke({ width: 4, color: 0xcc0066, alpha: 1 });
  }
}

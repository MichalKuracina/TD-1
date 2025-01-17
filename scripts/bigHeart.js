class BigHeart extends PIXI.Container {
  constructor(x, y, heartSprite) {
    super();
    this.x = x;
    this.y = y;
    this.heartSprite = heartSprite;
  }

  async initBigHeart() {
    // let hh = new PIXI.Sprite(this.heartSprite);
    // hh.zIndex = 999;
    // hh.width = 96;
    // hh.height = 96;
    // hh.position.set(this.x, this.y);
    // hh.anchor.set(0.5);
    // hh.alpha = 1;
    // hh.timeElapsed = 0;

    // this.addChild(hh);

    const fontStyle = {
      fontSize: 12,
      align: "left",
      fill: 0x000000, // black
    };

    const lbl3 = new PIXI.BitmapText({
      text: "TEST",
      style: fontStyle,
    });

    lbl3.x = this.x;
    lbl3.y = this.y;
    this.addChild(lbl3);
  }
}

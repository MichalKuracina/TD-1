class Pane {
  constructor() {
    this.gold = 0;
    this.type1 = 0;
    this.type2 = 0;
    this.type3 = 0;
    this.turrents = 0;
    this.enemies = 0;
    this.t = null;
    // this.drawPane();
  }

  async drawPane() {
    const atlasData = {
      frames: {
        test: {
          frame: { x: 0, y: 0, w: 64, h: 64 },
          sourceSize: { w: 64, h: 64 },
          spriteSourceSize: { x: 0, y: 0, w: 64, h: 64 },
        },
      },
      meta: {
        image: "/assets/spritesheet3.png",
        size: { w: 256, h: 64 },
      },
    };

    const texture = await PIXI.Assets.load(atlasData.meta.image);
    const spritesheet = new PIXI.Spritesheet(texture, atlasData);
    await spritesheet.parse();

    this.t = new PIXI.Sprite(spritesheet.textures.test);

    app.stage.addChild(this.t);
    this.t.position.set(192, 192);
    this.t.anchor.set(0.5);
  }

  rotateD(x, y) {
    this.t.rotation = Math.atan2(y, x) + 1.5;
  }
}

class Pane {
  constructor() {
    this.gold_count = 0;
    this.type1_count = 0;
    this.type2_count = 0;
    this.type3_count = 0;
    this.turrents = 0;
    this.enemies = 0;
    this.coin_sprite = null;
    this.type1_sprite = null;
    this.type2_sprite = null;
    this.type3_sprite = null;
    this.drawPane();
  }

  async drawPane() {
    const atlasData = {
      frames: {
        type1: {
          frame: { x: 0, y: 0, w: 64, h: 64 },
          sourceSize: { w: 64, h: 64 },
          spriteSourceSize: { x: 0, y: 0, w: 64, h: 64 },
        },
        type2: {
          frame: { x: 64, y: 0, w: 64, h: 64 },
          sourceSize: { w: 64, h: 64 },
          spriteSourceSize: { x: 0, y: 0, w: 64, h: 64 },
        },
        type3: {
          frame: { x: 128, y: 0, w: 64, h: 64 },
          sourceSize: { w: 64, h: 64 },
          spriteSourceSize: { x: 0, y: 0, w: 64, h: 64 },
        },
        coin: {
          frame: { x: 192, y: 0, w: 64, h: 64 },
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

    this.coin_sprite = new PIXI.Sprite(spritesheet.textures.coin);
    this.type1_sprite = new PIXI.Sprite(spritesheet.textures.type1);
    this.type2_sprite = new PIXI.Sprite(spritesheet.textures.type2);
    this.type3_sprite = new PIXI.Sprite(spritesheet.textures.type3);

    app.stage.addChild(this.coin_sprite);
    app.stage.addChild(this.type1_sprite);
    app.stage.addChild(this.type2_sprite);
    app.stage.addChild(this.type3_sprite);

    this.coin_sprite.position.set(640, 32);
    this.type1_sprite.position.set(320, 32);
    this.type2_sprite.position.set(384, 32);
    this.type3_sprite.position.set(448, 32);

    this.coin_sprite.anchor.set(0.5);
    this.type1_sprite.anchor.set(0.5);
    this.type2_sprite.anchor.set(0.5);
    this.type3_sprite.anchor.set(0.5);

    this.type1_sprite.rotation = 1.55;
    this.type2_sprite.rotation = 1.55;
    this.type3_sprite.rotation = 1.55;

    this.type3_sprite.alpha = 0.5;
    // this.type3_sprite.blendMode = "darken";
  }
}

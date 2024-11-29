class PaneBtn extends PIXI.Graphics {
  constructor(label) {
    super();
    this.label = label;
    // this.container = null;

    this.drawButton();
  }

  async drawButton() {
    const atlasData = {
      frames: {
        standard: {
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

    // this.container = new PIXI.Container();
    // this.container.label = this.label;

    const texture = await PIXI.Assets.load(atlasData.meta.image);
    const spritesheet = new PIXI.Spritesheet(texture, atlasData);
    await spritesheet.parse();

    // const sprite = new PIXI.Sprite(spritesheet.textures.standard);

    const sprite = new PIXI.Sprite(spritesheet.textures[this.label]);
    paneObj.paneContainer.addChild(sprite);

    sprite.position.set(0, 0);
  }
}

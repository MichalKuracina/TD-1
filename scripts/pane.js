class Pane {
  constructor() {
    this.gold_count = 0;
    this.type1_count = 0;
    this.type2_count = 0;
    this.type3_count = 0;
    this.turrents = 0;
    this.enemies = 0;
    this.coin_sprite = null;
    // this.type1_sprite = null;
    // this.type2_sprite = null;
    // this.type3_sprite = null;
    this.paneContainer = null;
    // this.coinContainer = null;
    // this.type1Container = null;
    // this.type2Container = null;
    // this.type3Container = null;
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

    // Container
    this.paneContainer = new PIXI.Container();
    this.paneContainer.x = 0;
    this.paneContainer.y = 0;
    app.stage.addChild(this.paneContainer);

    // Background
    const backGround = new PIXI.Graphics();
    backGround.rect(0, 0, canvasWidth, 80);
    backGround.fill(0x4d3b25);
    this.paneContainer.addChild(backGround);

    // Separator
    const lineSeparator = new PIXI.Graphics();
    this.paneContainer.addChild(lineSeparator);
    lineSeparator.moveTo(0, 80);
    lineSeparator.lineTo(canvasWidth, 80);
    lineSeparator.stroke({ width: 8, color: 0x2a4d1d, alpha: 1 });

    // Init Element Containers
    const coinContainer = new PIXI.Container();
    coinContainer.label = "coinContainer";
    const type1Container = new PIXI.Container();
    type1Container.label = "type1Container";
    const type2Container = new PIXI.Container();
    type2Container.label = "type2Container";
    const type3Container = new PIXI.Container();
    type3Container.label = "type3Container";

    // Get Sprites
    const texture = await PIXI.Assets.load(atlasData.meta.image);
    const spritesheet = new PIXI.Spritesheet(texture, atlasData);
    await spritesheet.parse();

    const coin_sprite = new PIXI.Sprite(spritesheet.textures.coin);
    const type1_sprite = new PIXI.Sprite(spritesheet.textures.type1);
    const type2_sprite = new PIXI.Sprite(spritesheet.textures.type2);
    const type3_sprite = new PIXI.Sprite(spritesheet.textures.type3);

    // Add Sprites to Containers
    coinContainer.addChild(coin_sprite);
    type1Container.addChild(type1_sprite);
    type2Container.addChild(type2_sprite);
    type3Container.addChild(type3_sprite);

    // Add Sprite Containers to Pane Container
    this.paneContainer.addChild(coinContainer);
    this.paneContainer.addChild(type1Container);
    this.paneContainer.addChild(type2Container);
    this.paneContainer.addChild(type3Container);

    // Position Sub Containers
    this.paneContainer.getChildByLabel("coinContainer").position.set(640, 32);
    this.paneContainer.getChildByLabel("type1Container").position.set(320, 32);
    this.paneContainer.getChildByLabel("type2Container").position.set(384, 32);
    this.paneContainer.getChildByLabel("type3Container").position.set(448, 32);

    this.paneContainer
      .getChildByLabel("coinContainer")
      .children[0].anchor.set(0.5);
    this.paneContainer
      .getChildByLabel("type1Container")
      .children[0].anchor.set(0.5);
    this.paneContainer
      .getChildByLabel("type2Container")
      .children[0].anchor.set(0.5);
    this.paneContainer
      .getChildByLabel("type3Container")
      .children[0].anchor.set(0.5);

    this.paneContainer.getChildByLabel("coinContainer").children[0].alpha = 0.5;
    this.paneContainer.getChildByLabel(
      "type1Container"
    ).children[0].alpha = 0.5;
    this.paneContainer.getChildByLabel(
      "type2Container"
    ).children[0].alpha = 0.5;
    this.paneContainer.getChildByLabel(
      "type3Container"
    ).children[0].alpha = 0.5;

    // this.type1_sprite.rotation = 1.55;
    // this.type2_sprite.rotation = 1.55;
    // this.type3_sprite.rotation = 1.55;

    // this.type3_sprite.alpha = 0.5;
    // this.type3_sprite.setSize(50, 50);
  }
}

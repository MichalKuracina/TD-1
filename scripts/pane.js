class Pane {
  constructor() {
    this.gold = 5;
    this.paneContainer = null;

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

    const standardBtn = new PaneBtn("standard");
    this.paneContainer.addChild(standardBtn);

    // Init Element Containers
    const type1Container = new PIXI.Container();
    type1Container.label = "type1Container";
    const type2Container = new PIXI.Container();
    type2Container.label = "type2Container";
    const type3Container = new PIXI.Container();
    type3Container.label = "type3Container";
    const coinContainer = new PIXI.Container();
    coinContainer.label = "coinContainer";

    // Get Sprites
    const texture = await PIXI.Assets.load(atlasData.meta.image);
    const spritesheet = new PIXI.Spritesheet(texture, atlasData);
    await spritesheet.parse();

    const type1_sprite = new PIXI.Sprite(spritesheet.textures.type1);
    const type2_sprite = new PIXI.Sprite(spritesheet.textures.type2);
    const type3_sprite = new PIXI.Sprite(spritesheet.textures.type3);
    const coin_sprite = new PIXI.Sprite(spritesheet.textures.coin);

    // Add Sprites to Containers
    type1Container.addChild(type1_sprite);
    type2Container.addChild(type2_sprite);
    type3Container.addChild(type3_sprite);
    coinContainer.addChild(coin_sprite);

    // Add Sprite Containers to Pane Container
    this.paneContainer.addChild(type1Container);
    this.paneContainer.addChild(type2Container);
    this.paneContainer.addChild(type3Container);
    this.paneContainer.addChild(coinContainer);

    // Position Sub Containers
    this.paneContainer.getChildByLabel("type1Container").position.set(320, 32);
    this.paneContainer.getChildByLabel("type2Container").position.set(384, 32);
    this.paneContainer.getChildByLabel("type3Container").position.set(448, 32);
    this.paneContainer.getChildByLabel("coinContainer").position.set(576, 32);

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

    // Highlight Sprite
    if (this.gold > 4) {
      this.paneContainer.getChildByLabel(
        "type1Container"
      ).children[0].alpha = 1;
      this.paneContainer.getChildByLabel("type1Container").eventMode = "static";
    } else {
      this.paneContainer.getChildByLabel(
        "type1Container"
      ).children[0].alpha = 0.5;
      this.paneContainer.getChildByLabel("type1Container").eventMode = "none";
    }

    if (this.gold > 9) {
      this.paneContainer.getChildByLabel(
        "type2Container"
      ).children[0].alpha = 1;
    } else {
      this.paneContainer.getChildByLabel(
        "type2Container"
      ).children[0].alpha = 0.5;
    }

    if (this.gold > 14) {
      this.paneContainer.getChildByLabel(
        "type3Container"
      ).children[0].alpha = 1;
    } else {
      this.paneContainer.getChildByLabel(
        "type3Container"
      ).children[0].alpha = 0.5;
    }

    if (this.coin_count === 0) {
      this.paneContainer.getChildByLabel(
        "coinContainer"
      ).children[0].alpha = 0.5;
    }

    // Price Tag Type1
    const type1_count_border = new PIXI.Graphics();
    type1_count_border.roundRect(0, 10, 25, 20, 5);
    type1_count_border.fill(0xeb3440);
    type1Container.addChild(type1_count_border);

    type1_count_border.roundRect(2, 12, 21, 16, 5);
    type1_count_border.fill(0xfaf7f8);
    type1Container.addChild(type1_count_border);

    const type1_count_text = new PIXI.BitmapText({
      text: "5€",
      style: {
        fontSize: 10,
        align: "left",
        fill: 0xfc0303,
      },
    });

    type1_count_text.x = 7;
    type1_count_text.y = 15;

    type1Container.addChild(type1_count_text);

    // Price Tag Type2
    const type2_count_border = new PIXI.Graphics();
    type2_count_border.roundRect(0, 10, 25, 20, 5);
    type2_count_border.fill(0xeb3440);
    type2Container.addChild(type2_count_border);

    type2_count_border.roundRect(2, 12, 21, 16, 5);
    type2_count_border.fill(0xfaf7f8);
    type2Container.addChild(type2_count_border);

    const type2_count_text = new PIXI.BitmapText({
      text: "10€",
      style: {
        fontSize: 10,
        align: "left",
        fill: 0xfc0303,
      },
    });

    type2_count_text.x = 4;
    type2_count_text.y = 15;

    type2Container.addChild(type2_count_text);

    // Price Tag Type3
    const type3_count_border = new PIXI.Graphics();
    type3_count_border.roundRect(0, 10, 25, 20, 5);
    type3_count_border.fill(0xeb3440);
    type3Container.addChild(type3_count_border);

    type3_count_border.roundRect(2, 12, 21, 16, 5);
    type3_count_border.fill(0xfaf7f8);
    type3Container.addChild(type3_count_border);

    const type3_count_text = new PIXI.BitmapText({
      text: "15€",
      style: {
        fontSize: 10,
        align: "left",
        fill: 0xfc0303,
      },
    });

    type3_count_text.x = 4;
    type3_count_text.y = 15;

    type3Container.addChild(type3_count_text);

    // Price Tag Coin
    const coin_count_border = new PIXI.Graphics();
    coin_count_border.roundRect(30, -15, 65, 32, 5);
    coin_count_border.fill(0xeb3440);
    coinContainer.addChild(coin_count_border);

    coin_count_border.roundRect(32, -12.5, 61, 26.5, 5);
    coin_count_border.fill(0xfaf7f8);
    coinContainer.addChild(coin_count_border);

    const coin_count_text = new PIXI.BitmapText({
      text: `${this.gold} €`,
      style: {
        fontSize: 20,
        align: "right",
        fill: 0xfc0303,
      },
    });

    coin_count_text.x = 40;
    coin_count_text.y = -10;

    coinContainer.addChild(coin_count_text);

    this.paneContainer
      .getChildByLabel("type1Container")
      .on("mouseover", (event) => {
        if (
          this.paneContainer.getChildByLabel("type1Container").isInteractive()
        ) {
          this.paneContainer.getChildByLabel("type1Container").cursor =
            "pointer";
        }
      });
    this.paneContainer
      .getChildByLabel("type2Container")
      .on("mouseover", (event) => {
        if (
          this.paneContainer.getChildByLabel("type2Container").isInteractive()
        ) {
          this.paneContainer.getChildByLabel("type2Container").cursor =
            "pointer";
        }
      });
    this.paneContainer
      .getChildByLabel("type3Container")
      .on("mouseover", (event) => {
        if (
          this.paneContainer.getChildByLabel("type3Container").isInteractive()
        ) {
          this.paneContainer.getChildByLabel("type3Container").cursor =
            "pointer";
        }
      });
  }

  addGold(amount) {
    this.gold = this.gold + amount;
    if (this.gold > 999) {
      this.gold = 999;
    }
  }

  substractGold(amount) {
    this.gold = this.gold - amount;
    if (this.gold < 0) {
      this.gold = 0;
    }
  }
}

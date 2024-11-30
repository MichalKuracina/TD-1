class Pane {
  constructor() {
    this.gold = 5;
    this.paneContainer = null;

    this.initializePane();
  }

  async initializePane() {
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

    // Buttons
    const standardBtn = new PaneBtn("standard", 320, 32, this.gold, 5);
    this.paneContainer.addChild(standardBtn);
    const splashBtn = new PaneBtn("splash", 384, 32, this.gold, 10);
    this.paneContainer.addChild(splashBtn);
    const slowBtn = new PaneBtn("slow", 448, 32, this.gold, 15);
    this.paneContainer.addChild(slowBtn);

    standardBtn.eventMode = "static";

    // Get Coin Sprite
    const texture = await PIXI.Assets.load(paneSprites.meta.image);
    const spritesheet = new PIXI.Spritesheet(texture, paneSprites);
    await spritesheet.parse();
    const coinSprite = new PIXI.Sprite(spritesheet.textures.coin);
    this.paneContainer.addChild(coinSprite);
    coinSprite.position.set(576, 32);
    coinSprite.anchor.set(0.5);

    // Price Tag Coin
    const labelBorder = new PIXI.Graphics();
    labelBorder.roundRect(600, 18, 65, 32, 4);
    labelBorder.fill(0xeb3440);
    this.paneContainer.addChild(labelBorder);

    labelBorder.roundRect(602, 20, 61, 27, 3);
    labelBorder.fill(0xfaf7f8);
    this.paneContainer.addChild(labelBorder);

    const labelText = new PIXI.BitmapText({
      text: `${this.gold} €`,
      style: {
        fontSize: 20,
        align: "right",
        fill: 0xfc0303,
      },
    });

    labelText.x = 608;
    labelText.y = 23;

    this.paneContainer.addChild(labelText);
  }

  addGold(amount) {
    this.gold = this.gold + amount;
    if (this.gold > 999) {
      this.gold = 999;
    }
    this.paneContainer.getChildByLabel("standard").addGold(amount);
    this.paneContainer.getChildByLabel("splash").addGold(amount);
    this.paneContainer.getChildByLabel("slow").addGold(amount);
  }

  substractGold(amount) {
    this.gold = this.gold - amount;
    if (this.gold < 0) {
      this.gold = 0;
    }
    this.paneContainer.getChildByLabel("standard").substractGold(amount);
    this.paneContainer.getChildByLabel("splash").substractGold(amount);
    this.paneContainer.getChildByLabel("slow").substractGold(amount);
  }
}

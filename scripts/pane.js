class TopPane {
  constructor() {
    this.gold = 5;
    this.paneContainer = null;
    this.standardBtn = null;

    this.initializeTopPane();
  }

  async initializeTopPane() {
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

    // Get buttons sprites
    const texture = await PIXI.Assets.load(paneSprites.meta.image);
    const spritesheet = new PIXI.Spritesheet(texture, paneSprites);
    await spritesheet.parse();
    // Standard button
    const towerStandardTexture = new PIXI.Sprite(
      spritesheet.textures["standard"]
    );
    const towerSplashTexture = new PIXI.Sprite(spritesheet.textures["splash"]);
    const towerSlowTexture = new PIXI.Sprite(spritesheet.textures["slow"]);
    this.standardBtn = new PaneButton(
      towerStandardTexture,
      "standard",
      320,
      32,
      this.gold,
      5
    );
    this.paneContainer.addChild(this.standardBtn);
    // Splash button
    const splashBtn = new PaneButton(
      towerSplashTexture,
      "splash",
      384,
      32,
      this.gold,
      10
    );
    this.paneContainer.addChild(splashBtn);
    // Slow button
    const slowBtn = new PaneButton(
      towerSlowTexture,
      "slow",
      448,
      32,
      this.gold,
      15
    );
    this.paneContainer.addChild(slowBtn);

    // Standard button label
    const standardLabel = new PaneLabel("standard", 320, 32, this.gold, "5");
    this.paneContainer.addChild(standardLabel);
    // Splash button label
    const splashLabel = new PaneLabel("splash", 384, 32, this.gold, "10");
    this.paneContainer.addChild(splashLabel);
    // Slow button label
    const slowLabel = new PaneLabel("slow", 448, 32, this.gold, "15");
    this.paneContainer.addChild(slowLabel);

    // Get Coin Sprite
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

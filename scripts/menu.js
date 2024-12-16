class Menu extends PIXI.Container {
  constructor(heartSprite, towerSpritesheet, gold, lives, roundsTotal) {
    super();
    this.gold = gold;
    this.lives = lives;
    this.roundsTotal = roundsTotal;
    this.roundCounter = 1;
    this.heartSprite = heartSprite;
    this.towerSpritesheet = towerSpritesheet;
    this.menuIcon1_radius = 300;
    this.menuIcon2_radius = 200;
    this.menuIcon3_radius = 100;
    this.menuIcon1_color = 0x56a843;
    this.menuIcon2_color = 0x996863;
    this.menuIcon3_color = 0x85b4f2;
    this.menuIcon1_price = 5;
    this.menuIcon2_price = 10;
    this.menuIcon3_price = 15;
    this.roundsLbl_x = 0;
    this.heartIcon_x = 160;
    this.menuIcon1_x = 320;
    this.menuIcon2_x = 384;
    this.menuIcon3_x = 448;
    this.menuIcon4_x = 576;
    this.menuIcon_y = 32;
  }

  async initMenu() {
    this.drawMenuBackground();
    const [
      towerStandardTexture,
      towerSplashTexture,
      towerSlowTexture,
      coinTexture,
    ] = await this.getSprites();

    this.drawMenuIcons(
      towerStandardTexture,
      towerSplashTexture,
      towerSlowTexture,
      coinTexture
    );
    this.label = "menuTile";

    this.standardBtn.refreshButtonSprite(this.gold);
    this.splashBtn.refreshButtonSprite(this.gold);
    this.slowBtn.refreshButtonSprite(this.gold);
  }

  drawMenuIcons(
    towerStandardTexture,
    towerSplashTexture,
    towerSlowTexture,
    coinTexture
  ) {
    // Rounds
    this.roundsLbl = new MenuButtonLabel(
      "rounds",
      this.roundsLbl_x,
      this.menuIcon_y,
      0,
      0,
      0,
      `Rounds: ${this.roundCounter}/${this.roundsTotal}`
    );
    this.addChild(this.roundsLbl);
    // Heart button
    this.heartBtn = new MenuButton(
      this.heartSprite,
      "heart",
      this.heartIcon_x,
      this.menuIcon_y
    );
    this.addChild(this.heartBtn);

    this.heartLbl = new MenuButtonLabel(
      "heart",
      this.heartIcon_x,
      this.menuIcon_y,
      this.gold,
      0,
      this.lives
    );

    this.addChild(this.heartLbl);
    // Standard button
    this.standardBtn = new Tower(
      towerStandardTexture,
      this.menuIcon1_x,
      this.menuIcon_y,
      "standard",
      false
    );
    this.addChild(this.standardBtn);
    this.standardLbl = new MenuButtonLabel(
      "standard",
      this.menuIcon1_x,
      this.menuIcon_y,
      this.gold,
      this.menuIcon1_price
    );

    this.addChild(this.standardLbl);
    // Splash button
    this.splashBtn = new Tower(
      towerSplashTexture,
      this.menuIcon2_x,
      this.menuIcon_y,
      "splash",
      false
    );
    this.addChild(this.splashBtn);
    this.splashLbl = new MenuButtonLabel(
      "splash",
      this.menuIcon2_x,
      this.menuIcon_y,
      this.gold,
      this.menuIcon2_price
    );

    this.addChild(this.splashLbl);
    // Slow button
    this.slowBtn = new Tower(
      towerSlowTexture,
      this.menuIcon3_x,
      this.menuIcon_y,
      "slow",
      false
    );
    this.addChild(this.slowBtn);
    this.slowLbl = new MenuButtonLabel(
      "slow",
      this.menuIcon3_x,
      this.menuIcon_y,
      this.gold,
      this.menuIcon3_price
    );

    this.addChild(this.slowLbl);
    // Coin button
    this.coinBtn = new MenuButton(
      coinTexture,
      "coin",
      this.menuIcon4_x,
      this.menuIcon_y,
      this.gold
    );
    this.addChild(this.coinBtn);

    this.coinLbl = new MenuButtonLabel(
      "coin",
      this.menuIcon4_x,
      this.menuIcon_y,
      this.gold
    );

    this.addChild(this.coinLbl);
  }

  updateRoundCounter(roundNumber) {
    this.roundCounter = roundNumber;
    this.roundsLbl.getChildByLabel(
      "rounds"
    ).text = `Rounds: ${this.roundCounter}/${this.roundsTotal}`;
  }

  addGold(amount) {
    this.gold = this.gold + amount;
    if (this.gold > 999) {
      this.gold = 999;
    }
    this.standardBtn.refreshButtonSprite(this.gold);
    this.splashBtn.refreshButtonSprite(this.gold);
    this.slowBtn.refreshButtonSprite(this.gold);
    this.coinLbl.getChildByLabel("coin").text = `${this.gold}€`;
  }

  substractGold(amount) {
    this.gold = this.gold - amount;
    if (this.gold < 0) {
      this.gold = 0;
    }
    this.standardBtn.refreshButtonSprite(this.gold);
    this.splashBtn.refreshButtonSprite(this.gold);
    this.slowBtn.refreshButtonSprite(this.gold);
    this.coinLbl.getChildByLabel("coin").text = `${this.gold}€`;
  }

  substractLives(amount) {
    this.lives = this.lives - amount;
    if (this.lives < 0) {
      this.lives = 0;
    }

    this.heartLbl.getChildByLabel("heart").text = this.lives;
  }

  async getSprites() {
    // Standard button
    const towerStandardTexture = new PIXI.Sprite(
      this.towerSpritesheet.textures["standard"]
    );
    const towerSplashTexture = new PIXI.Sprite(
      this.towerSpritesheet.textures["splash"]
    );
    const towerSlowTexture = new PIXI.Sprite(
      this.towerSpritesheet.textures["slow"]
    );
    const coinTexture = new PIXI.Sprite(this.towerSpritesheet.textures["coin"]);
    return [
      towerStandardTexture,
      towerSplashTexture,
      towerSlowTexture,
      coinTexture,
    ];
  }

  drawMenuBackground() {
    // Background
    const backGround = new PIXI.Graphics();
    backGround.rect(0, 0, canvasWidth, 80);
    backGround.fill(0x4d3b25);
    this.addChild(backGround);
    // Separator
    const lineSeparator = new PIXI.Graphics();
    lineSeparator.moveTo(0, 80);
    lineSeparator.lineTo(canvasWidth, 80);
    lineSeparator.stroke({ width: 8, color: 0x2a4d1d, alpha: 1 });
    this.addChild(lineSeparator);
  }
}

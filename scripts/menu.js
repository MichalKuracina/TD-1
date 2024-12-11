class Menu extends PIXI.Container {
  constructor() {
    super();
    this.menuIcon1_x = 320;
    this.menuIcon2_x = 384;
    this.menuIcon3_x = 448;
    this.menuIcon4_x = 576;
    this.menuIcon_y = 32;
    this.initMenu();
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

    console.log(this.standardBtn);
  }

  drawMenuBackground() {
    // Background
    const backGround = new PIXI.Graphics();
    backGround.rect(0, 0, canvasWidth, 80);
    backGround.fill(0x4d3b25);
    this.addChild(backGround);
    // Separator
    const lineSeparator = new PIXI.Graphics();
    this.addChild(lineSeparator);
    lineSeparator.moveTo(0, 80);
    lineSeparator.lineTo(canvasWidth, 80);
    lineSeparator.stroke({ width: 8, color: 0x2a4d1d, alpha: 1 });
  }
  async getSprites() {
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
    const coinTexture = new PIXI.Sprite(spritesheet.textures["coin"]);
    return [
      towerStandardTexture,
      towerSplashTexture,
      towerSlowTexture,
      coinTexture,
    ];
  }

  drawMenuIcons(
    towerStandardTexture,
    towerSplashTexture,
    towerSlowTexture,
    coinTexture
  ) {
    // Standard button
    this.standardBtn = new MenuButton(
      towerStandardTexture,
      "standard",
      this.menuIcon1_x,
      this.menuIcon_y,
      this.gold,
      5
    );
    this.addChild(this.standardBtn);
    // Splash button
    const splashBtn = new MenuButton(
      towerSplashTexture,
      "splash",
      this.menuIcon2_x,
      this.menuIcon_y,
      this.gold,
      10
    );
    this.addChild(splashBtn);
    // Slow button
    const slowBtn = new MenuButton(
      towerSlowTexture,
      "slow",
      this.menuIcon3_x,
      this.menuIcon_y,
      this.gold,
      15
    );
    this.addChild(slowBtn);
    // Coin button
    const coinBtn = new MenuButton(
      coinTexture,
      "coin",
      this.menuIcon4_x,
      this.menuIcon_y,
      this.gold
    );
    this.addChild(coinBtn);
  }
}

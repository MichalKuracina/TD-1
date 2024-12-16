class Menu extends PIXI.Container {
  constructor(gold) {
    super();
    this.gold = gold;
    this.menuIcon1_radius = 300;
    this.menuIcon2_radius = 200;
    this.menuIcon3_radius = 100;
    this.menuIcon1_color = 0x56a843;
    this.menuIcon2_color = 0x996863;
    this.menuIcon3_color = 0x85b4f2;
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
  }

  drawMenuIcons(
    towerStandardTexture,
    towerSplashTexture,
    towerSlowTexture,
    coinTexture
  ) {
    // Standard button
    this.standardBtn = new Tower2(
      towerStandardTexture,
      this.menuIcon1_x,
      this.menuIcon_y,
      "standard",
      false
    );
    this.addChild(this.standardBtn);
    // Splash button
    this.splashBtn = new Tower2(
      towerSplashTexture,
      this.menuIcon2_x,
      this.menuIcon_y,
      "splash",
      false
    );
    this.addChild(this.splashBtn);
    // Slow button
    this.slowBtn = new Tower2(
      towerSlowTexture,
      this.menuIcon3_x,
      this.menuIcon_y,
      "slow",
      false
    );
    this.addChild(this.slowBtn);
    // Coin button
    this.coinBtn = new MenuButton(
      coinTexture,
      "coin",
      this.menuIcon4_x,
      this.menuIcon_y,
      this.gold
    );
    this.addChild(this.coinBtn);
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

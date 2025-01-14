class GameOver extends PIXI.Graphics {
  constructor(
    // x = 0,
    // y = 0,
    rounds,
    towers,
    enemies
  ) {
    super();
    // this.tower_x = x;
    // this.tower_y = y;
    this.rounds = rounds;
    this.towers = towers;
    this.enemies = enemies;
    this.label = "GameOverDetail";
    this.text_x = app.renderer.width / 2;
    this.text_y = app.renderer.height / 2;
    this.text_row_offset = 30;

    this.initGameOver();
  }

  async initGameOver() {
    this.eventMode = "none";
    const canvasWidth = app.renderer.width;
    const canvasHeight = app.renderer.height;

    const modal = new PIXI.Graphics();
    modal.roundRect(0, 0, canvasWidth, canvasHeight, 1);
    modal.fill(0xffffff); //white
    modal.alpha = 0.3;
    this.addChild(modal);

    const tableBorder = new PIXI.Graphics();
    tableBorder.roundRect(
      canvasWidth / 4,
      canvasHeight / 4,
      canvasWidth / 2,
      canvasHeight / 2,
      10
    );
    tableBorder.fill(0x000000);
    tableBorder.alpha = 1;
    this.addChild(tableBorder);

    const tableBorderWidth = canvasWidth / 100;

    const tableBackground = new PIXI.Graphics();
    tableBackground.roundRect(
      canvasWidth / 4 + tableBorderWidth,
      canvasHeight / 4 + tableBorderWidth,
      canvasWidth / 2 - 2 * tableBorderWidth,
      canvasHeight / 2 - 2 * tableBorderWidth,
      tableBorderWidth
    );
    tableBackground.fill(0x66cc66);
    tableBackground.alpha = 1;
    this.addChild(tableBackground);

    const gameOverlbl = new PIXI.BitmapText({
      text: "GAME OVER",
      style: {
        fontSize: 45,
        align: "left",
        fill: 0xff0000,
      },
    });

    gameOverlbl.x = this.text_x;
    gameOverlbl.y = this.text_y - 65;
    gameOverlbl.anchor.set(0.5);
    this.addChild(gameOverlbl);

    this.writeEntry("Rounds Survived", this.rounds);
    this.writeEntry("Towers Built", this.towers);
    this.writeEntry("Enemies Killed", this.enemies);
  }

  writeEntry(key, value) {
    const fontStyle = {
      fontSize: 25,
      align: "left",
      fill: 0x000000, // black
    };

    const lbl = new PIXI.BitmapText({
      text: `${key}: ${value}`,
      style: fontStyle,
    });

    lbl.x = this.text_x;
    lbl.y = this.text_y;

    this.text_y = this.text_y + this.text_row_offset;
    lbl.anchor.set(0.5);
    this.addChild(lbl);
  }
}

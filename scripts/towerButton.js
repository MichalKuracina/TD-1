class TowerButton extends PIXI.Container {
  constructor(x = 0, y = 0, color = 0x56a843, text = "none") {
    super();
    this.x = x;
    this.y = y;
    this.color = color;
    this.text = text;
    this.towerButtonContainer = null;

    this.initTowerButton();
  }

  async initTowerButton() {
    this.towerButtonContainer = new PIXI.Container();
    const towerButtonBackground = new PIXI.Graphics();
    towerButtonBackground.roundRect(this.x, this.y, 38, 16, 2);
    towerButtonBackground.fill(0x000000);
    towerButtonBackground.roundRect(this.x + 1, this.y + 1, 36, 14, 2);
    towerButtonBackground.fill(this.color);
    this.towerButtonContainer.addChild(towerButtonBackground);

    const fontStyle = {
      fontSize: 9,
      align: "left",
      fill: 0x000000,
    };

    const labelTowerButton = new PIXI.BitmapText({
      text: this.text,
      style: fontStyle,
    });

    labelTowerButton.x = this.x + 2;
    labelTowerButton.y = this.y + 2;
    this.towerButtonContainer.addChild(labelTowerButton);

    this.towerButtonContainer.eventMode = "static";
  }
}

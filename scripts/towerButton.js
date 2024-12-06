class TowerButton extends PIXI.Graphics {
  constructor(x = 0, y = 0, color = 0x56a843, text = "none", label) {
    super();
    // this.x = x;
    // this.y = y;
    this.tower_x = x;
    this.tower_y = y;
    this.color = color;
    this.text = text;
    this.towerButtonContainer = null;
    this.label = label;

    this.initTowerButton();
  }

  async initTowerButton() {
    this.roundRect(this.tower_x, this.tower_y, 38, 16, 2);
    this.fill(0x000000);
    this.roundRect(this.tower_x + 1, this.tower_y + 1, 36, 14, 2);
    this.fill(this.color);
    // this.label = this.text;

    const fontStyle = {
      fontSize: 9,
      align: "left",
      fill: 0x000000,
    };

    const labelTowerButton = new PIXI.BitmapText({
      text: this.text,
      style: fontStyle,
    });

    labelTowerButton.x = this.tower_x + 2;
    labelTowerButton.y = this.tower_y + 2;
    this.addChild(labelTowerButton);

    this.eventMode = "none";
  }
}

class MenuButtonLabel extends PIXI.Graphics {
  constructor(label, x, y, gold, price) {
    super();
    this.label = label;
    this.x = x;
    this.y = y;
    this.gold = gold;
    this.price = price;

    this.initMenuButtonLabel();
  }

  async initMenuButtonLabel() {
    if (this.label === "coin") {
      this.roundRect(30, -15, 60, 35, 4);
      this.fill(0xeb3440);
      this.roundRect(32, -13, 56, 31, 3);
      this.fill(0xfaf7f8);

      const labelText = new PIXI.BitmapText({
        text: `${this.gold}€`,
        style: {
          fontSize: 20,
          align: "left",
          fill: 0xfc0303,
        },
        label: this.label,
      });
      labelText.x = 37;
      labelText.y = -8;
      this.addChild(labelText);
    } else {
      this.roundRect(0, 10, 25, 20, 4);
      this.fill(0xeb3440);
      this.roundRect(2, 12, 21, 16, 3);
      this.fill(0xfaf7f8);

      const labelText = new PIXI.BitmapText({
        text: `${this.price}€`,
        style: {
          fontSize: 10,
          align: "left",
          fill: 0xfc0303,
        },
      });
      labelText.x = 4;
      labelText.y = 14;
      this.addChild(labelText);
    }
  }
}

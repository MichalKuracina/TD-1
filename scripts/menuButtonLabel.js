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

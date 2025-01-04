class MenuButtonLabel extends PIXI.Graphics {
  constructor(label, x, y, gold, price, lives, rounds) {
    super();
    this.label = label;
    this.x = x;
    this.y = y;
    this.gold = gold;
    this.price = price;
    this.lives = lives;
    this.rounds = rounds;

    this.initMenuButtonLabel();
  }

  async initMenuButtonLabel() {
    let labelText;
    switch (this.label) {
      case "rounds":
        this.roundRect(5, -15, 100, 25, 4);
        this.fill(0xeb3440);
        this.roundRect(7, -13, 96, 21, 3);
        this.fill(0xfaf7f8);

        labelText = new PIXI.BitmapText({
          text: this.rounds,
          style: {
            fontSize: 14,
            align: "left",
            fill: 0xfc0303,
          },
          label: this.label,
        });
        labelText.x = 12;
        labelText.y = -10;
        this.addChild(labelText);
        break;
      case "heart":
        this.roundRect(40, -20, 60, 25, 4);
        this.fill(0xeb3440);
        this.roundRect(42, -18, 56, 21, 3);
        this.fill(0xfaf7f8);

        labelText = new PIXI.BitmapText({
          text: this.lives,
          style: {
            fontSize: 15,
            align: "left",
            fill: 0xfc0303,
          },
          label: this.label,
        });
        labelText.x = 60;
        labelText.y = -15;
        this.addChild(labelText);
        break;
      case "coin":
        this.roundRect(30, -15, 60, 35, 4);
        this.fill(0xeb3440);
        this.roundRect(32, -13, 56, 31, 3);
        this.fill(0xfaf7f8);

        labelText = new PIXI.BitmapText({
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
        break;

      default:
        this.roundRect(0, 10, 25, 20, 4);
        this.fill(0xeb3440);
        this.roundRect(2, 12, 21, 16, 3);
        this.fill(0xfaf7f8);

        labelText = new PIXI.BitmapText({
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
        break;
    }
  }
}

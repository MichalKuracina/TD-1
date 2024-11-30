class PaneBtn extends PIXI.Graphics {
  constructor(label, x, y, gold, price) {
    super();
    this.label = label;
    this.x = x;
    this.y = y;
    this.gold = gold;
    this.price = price;
    this.sprite = null;

    this.initializeButton();
  }

  async initializeButton() {
    // Button
    const texture = await PIXI.Assets.load(paneSprites.meta.image);
    const spritesheet = new PIXI.Spritesheet(texture, paneSprites);
    await spritesheet.parse();
    this.sprite = new PIXI.Sprite(spritesheet.textures[this.label]);
    paneObj.paneContainer.addChild(this.sprite);

    this.sprite.position.set(this.x, this.y);
    this.sprite.anchor.set(0.5);

    if (this.gold >= this.price) {
      this.sprite.alpha = 1;
      this.sprite.eventMode = "static";
    } else {
      this.sprite.alpha = 0.5;
      this.sprite.eventMode = "none";
    }
    // console.log(this.sprite.isInteractive());

    // Price Tag
    const labelBorder = new PIXI.Graphics();
    labelBorder.roundRect(this.x, this.y + 10, 25, 20, 4);
    labelBorder.fill(0xeb3440);
    paneObj.paneContainer.addChild(labelBorder);

    labelBorder.roundRect(this.x + 2, this.y + 12, 21, 16, 3);
    labelBorder.fill(0xfaf7f8);
    paneObj.paneContainer.addChild(labelBorder);

    const labelText = new PIXI.BitmapText({
      text: `${this.price}€`,
      style: {
        fontSize: 10,
        align: "left",
        fill: 0xfc0303,
      },
    });

    labelText.x = this.x + 4;
    labelText.y = this.y + 14;

    paneObj.paneContainer.addChild(labelText);

    this.sprite.on("mouseover", (event) => {
      if (this.sprite.isInteractive()) {
        this.sprite.cursor = "pointer";
      }
    });
    // this.sprite.onpointerdown = (event) => {
    //   console.log("down");
    // };
    // this.sprite.onpointerup = (event) => {
    //   console.log("up");
    // };
  }

  addGold(amount) {
    this.gold = this.gold + amount;
    if (this.gold > 999) {
      this.gold = 999;
    }
  }

  substractGold(amount) {
    this.gold = this.gold - amount;
    if (this.gold < 0) {
      this.gold = 0;
    }
  }
}

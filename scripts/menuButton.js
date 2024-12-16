class MenuButton extends PIXI.Sprite {
  constructor(texture, label, x, y, gold, price) {
    super(texture);
    this.label = label;
    this.x = x;
    this.y = y;
    // this.gold = gold;
    // this.price = price;

    this.initMenuButton();
  }

  initMenuButton() {
    this.position.set(this.x, this.y);
    this.anchor.set(0.5);

    if (this.label === "heart") {
      this.width = 30;
      this.height = 30;
    }

    // hearth.anchor.set(0.5);
    // hearth.x = app.screen.width / 2;
    // hearth.y = app.screen.height / 2;
    // hearth.width = 30;
    // hearth.height = 30;
    // app.stage.addChild(hearth);

    // this.label;

    // if (this.label !== "coin") {
    //   if (this.gold >= this.price) {
    //     this.eventMode = "static";
    //     this.cursor = "pointer";
    //   } else {
    //     this.tint = 0x9c9a95;
    //     this.eventMode = "none";
    //   }
    // }
  }

  //   addGold(amount) {
  //     this.gold = this.gold + amount;
  //     if (this.gold > 999) {
  //       this.gold = 999;
  //     }
  //   }

  //   substract(amount) {
  //     this.gold = this.gold - amount;
  //     if (this.gold < 0) {
  //       this.gold = 0;
  //     }
  //   }
}

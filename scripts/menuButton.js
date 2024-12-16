class MenuButton extends PIXI.Sprite {
  constructor(texture, label, x, y, gold, price) {
    super(texture);
    this.label = label;
    this.x = x;
    this.y = y;
    this.gold = gold;
    this.price = price;

    this.initMenuButton();
  }

  initMenuButton() {
    this.position.set(this.x, this.y);
    this.anchor.set(0.5);
    // this.label;

    if (this.label !== "coin") {
      if (this.gold >= this.price) {
        this.eventMode = "static";
        this.cursor = "pointer";
      } else {
        this.tint = 0x9c9a95;
        this.eventMode = "none";
      }
    }

    const lbl = new MenuButtonLabel(
      "lbl_" + this.label,
      this.x,
      this.y,
      this.gold,
      this.price
    );

    this.addChild(lbl);
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

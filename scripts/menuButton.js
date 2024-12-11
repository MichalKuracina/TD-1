class MenuButton extends PIXI.Sprite {
  constructor(texture, label, x, y, gold, price) {
    super(texture);
    this.spriteLabel = label;
    this.x = x;
    this.y = y;
    this.gold = gold;
    this.price = price;

    this.initPaneButton();
  }

  async initPaneButton() {
    this.position.set(this.x, this.y);
    this.anchor.set(0.5);
    this.label;

    if (this.spriteLabel !== "coin") {
      if (this.gold >= this.price) {
        this.eventMode = "static";
        this.cursor = "pointer";
      } else {
        this.tint = 0x9c9a95;
        this.eventMode = "none";
      }
    }
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

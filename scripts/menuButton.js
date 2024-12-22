class MenuButton extends PIXI.Sprite {
  constructor(texture, label, x, y, gold, price) {
    super(texture);
    this.label = label;
    this.x = x;
    this.y = y;
    this.cursor = "pointer";
    // this.gold = gold;
    // this.price = price;

    this.initMenuButton();
  }

  initMenuButton() {
    this.position.set(this.x, this.y);
    this.anchor.set(0.5);

    switch (this.label) {
      case "heart":
        this.width = 15;
        this.height = 15;
        break;
      case "play":
        this.width = 48;
        this.height = 48;

        break;
      case "pause":
        this.width = 48;
        this.height = 48;
        break;
      default:
        break;
    }
  }

  activate() {
    this.eventMode = "static";
    this.cursor = "pointer";
    this.tint = "0x40eb34";
  }

  deactivate() {
    this.eventMode = "none";
    this.tint = "0x808080";
  }
}

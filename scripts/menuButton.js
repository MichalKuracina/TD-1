class MenuButton extends PIXI.Sprite {
  constructor(texture, label, x, y) {
    super(texture);
    this.label = label;
    this.x = x;
    this.y = y;
    this.cursor = "pointer";
    this.zIndex = 1;

    this.initMenuButton();
  }

  initMenuButton() {
    this.position.set(this.x, this.y);
    this.anchor.set(0.5);

    // this.filters = new PIXI.BlurFilter({ strength: 8 });
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
      case "wrldEditor":
        this.width = 48;
        this.height = 48;
        break;
      case "loadBtn":
        this.width = 64;
        this.height = 32;
        break;
      case "saveBtn":
        this.width = 64;
        this.height = 32;
        break;
      default:
        break;
    }
  }

  activate() {
    this.eventMode = "static";
    this.cursor = "pointer";
    this.tint = "0x40eb34";
    this.status = "enabled";
  }

  deactivate() {
    this.eventMode = "none";
    this.tint = "0x808080";
    this.status = "disabled";
  }
}

class TowerToolTip extends PIXI.Graphics {
  constructor(
    x = 0,
    y = 0,
    type = "standard",
    damage = 1,
    speed = 1000,
    radius = 100,
    effect = "none",
    color = 0x56a843,
    towerWidth = 0,
    towerHeight = 0,
    towerUid = null,
    level = 1,
    cost = 5
  ) {
    super();
    this.tower_x = x;
    this.tower_y = y;
    this.type = type;
    this.damage = damage;
    this.speed = speed;
    this.radius = radius;
    this.effect = effect;
    this.color = color;
    this.towerWidth = towerWidth;
    this.towerHeight = towerHeight;
    this.towerUid = "towerToolTip" + towerUid;
    (this.level = level), (this.cost = cost), (this.toolTipContainer = null);
    this.toolTipWidth = 95;
    this.toolTipHeight = 100;
    this.toolTip_x = 0;
    this.toolTip_y = 0;
    this.toolTipCorners = 5;
    this.toolTipGap = 5;

    this.initTowerDetail();
  }

  async initTowerDetail() {
    this.eventMode = "none";
    const canvasWidth = app.renderer.width;
    const canvasHeight = app.renderer.height;

    this.toolTip_x = this.tower_x + this.towerWidth / 2 + this.toolTipGap;
    this.toolTip_y = this.tower_y - this.towerHeight / 2;

    if (this.toolTip_x + this.toolTipWidth > canvasWidth) {
      this.toolTip_x =
        this.tower_x -
        this.towerWidth / 2 -
        this.toolTipGap -
        this.toolTipWidth;
    }

    if (this.toolTip_y + this.toolTipHeight > canvasHeight) {
      this.toolTip_x = this.tower_x - this.towerWidth / 2;
      this.toolTip_y =
        this.tower_y -
        this.towerHeight / 2 -
        this.toolTipGap -
        this.toolTipHeight;
    }

    if (
      this.toolTip_y + this.toolTipHeight > canvasHeight ||
      this.toolTip_x + this.toolTipWidth > canvasWidth
    ) {
      this.toolTip_x =
        this.tower_x -
        this.towerWidth / 2 -
        this.toolTipGap -
        this.toolTipWidth;
      this.toolTip_y =
        this.tower_y -
        this.towerHeight / 2 -
        this.toolTipGap -
        this.toolTipHeight;
    }

    const fontStyle = {
      fontSize: 12,
      align: "left",
      fill: 0x000000,
    };

    this.roundRect(
      this.toolTip_x,
      this.toolTip_y,
      this.toolTipWidth,
      this.toolTipHeight,
      this.toolTipCorners
    );
    this.fill(0x000000);

    this.roundRect(
      this.toolTip_x + 2,
      this.toolTip_y + 2,
      this.toolTipWidth - 4,
      this.toolTipHeight - 4,
      this.toolTipCorners - 1
    );
    this.fill(this.color);

    const labelType = new PIXI.BitmapText({
      text: `Type: ${
        String(this.type).charAt(0).toUpperCase() + String(this.type).slice(1)
      }`,
      style: fontStyle,
    });

    labelType.x = this.toolTip_x + 5;
    labelType.y = this.toolTip_y + 4;
    this.addChild(labelType);

    const labelLevel = new PIXI.BitmapText({
      text: `Level: ${this.level}`,
      style: fontStyle,
    });

    labelLevel.x = this.toolTip_x + 5;
    labelLevel.y = this.toolTip_y + 17;
    this.addChild(labelLevel);

    const lebelCost = new PIXI.BitmapText({
      text: `Cost: ${this.cost}`,
      style: fontStyle,
    });

    lebelCost.x = this.toolTip_x + 5;
    lebelCost.y = this.toolTip_y + 30;
    this.addChild(lebelCost);

    const labelDamage = new PIXI.BitmapText({
      text: `Damage: ${this.damage}`,
      style: fontStyle,
    });

    labelDamage.x = this.toolTip_x + 5;
    labelDamage.y = this.toolTip_y + 43;
    this.addChild(labelDamage);

    const labelSpeed = new PIXI.BitmapText({
      text: `Speed: ${this.speed / 1000}`,
      style: fontStyle,
    });

    labelSpeed.x = this.toolTip_x + 5;
    labelSpeed.y = this.toolTip_y + 56;
    this.addChild(labelSpeed);

    const labelRadius = new PIXI.BitmapText({
      text: `Radius: ${this.radius}`,
      style: fontStyle,
    });

    labelRadius.x = this.toolTip_x + 5;
    labelRadius.y = this.toolTip_y + 69;
    this.addChild(labelRadius);

    const labelEffect = new PIXI.BitmapText({
      text: `Effect: ${this.effect}`,
      style: fontStyle,
    });

    labelEffect.x = this.toolTip_x + 5;
    labelEffect.y = this.toolTip_y + 82;
    this.addChild(labelEffect);
  }
}

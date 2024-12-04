class TowerRadius extends PIXI.Graphics {
  constructor(x = 0, y = 0, radius = 100, color = 0x56a843) {
    super();
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;

    this.initTowerRadius();
  }

  async initTowerRadius() {
    this.circle(0, 0, this.radius);
    this.fill(this.color);
    this.alpha = 0.3;

    // const towerRadius = new PIXI.Graphics();
    // towerRadius.circle(this.x, this.y, this.radius);
    // towerRadius.fill(this.color);
    // towerRadius.alpha = 0.6;
    //     const canvasWidth = app.renderer.width;
    //     const canvasHeight = app.renderer.height;

    //     this.toolTip_x = this.x + this.towerWidth / 2 + this.toolTipGap;
    //     this.toolTip_y = this.y - this.towerHeight / 2;

    //     if (this.toolTip_x + this.toolTipWidth > canvasWidth) {
    //       this.toolTip_x =
    //         this.x - this.towerWidth / 2 - this.toolTipGap - this.toolTipWidth;
    //     }

    //     if (this.toolTip_y + this.toolTipHeight > canvasHeight) {
    //       this.toolTip_x = this.x - this.towerWidth / 2;
    //       this.toolTip_y =
    //         this.y - this.towerHeight / 2 - this.toolTipGap - this.toolTipHeight;
    //     }

    //     if (
    //       this.toolTip_y + this.toolTipHeight > canvasHeight ||
    //       this.toolTip_x + this.toolTipWidth > canvasWidth
    //     ) {
    //       this.toolTip_x =
    //         this.x - this.towerWidth / 2 - this.toolTipGap - this.toolTipWidth;
    //       this.toolTip_y =
    //         this.y - this.towerHeight / 2 - this.toolTipGap - this.toolTipHeight;
    //     }

    //     const fontStyle = {
    //       fontSize: 12,
    //       align: "left",
    //       fill: 0x000000,
    //     };

    //     this.toolTipContainer = new PIXI.Container();
    //     const detailBackground = new PIXI.Graphics();

    //     detailBackground.roundRect(
    //       this.toolTip_x,
    //       this.toolTip_y,
    //       this.toolTipWidth,
    //       this.toolTipHeight,
    //       this.toolTipCorners
    //     );
    //     detailBackground.fill(0x000000);

    //     detailBackground.roundRect(
    //       this.toolTip_x + 2,
    //       this.toolTip_y + 2,
    //       this.toolTipWidth - 4,
    //       this.toolTipHeight - 4,
    //       this.toolTipCorners - 1
    //     );
    //     detailBackground.fill(this.color);
    //     detailBackground.alpha = 0.6;
    //     this.toolTipContainer.addChild(detailBackground);

    //     const labelType = new PIXI.BitmapText({
    //       text: `Type: ${
    //         String(this.type).charAt(0).toUpperCase() + String(this.type).slice(1)
    //       }`,
    //       style: fontStyle,
    //     });

    //     labelType.x = this.toolTip_x + 5;
    //     labelType.y = this.toolTip_y + 4;
    //     this.toolTipContainer.addChild(labelType);

    //     const labelDamage = new PIXI.BitmapText({
    //       text: `Damage: ${this.damage}`,
    //       style: fontStyle,
    //     });

    //     labelDamage.x = this.toolTip_x + 5;
    //     labelDamage.y = this.toolTip_y + 17;
    //     this.toolTipContainer.addChild(labelDamage);

    //     const labelSpeed = new PIXI.BitmapText({
    //       text: `Speed: ${this.speed / 1000}`,
    //       style: fontStyle,
    //     });

    //     labelSpeed.x = this.toolTip_x + 5;
    //     labelSpeed.y = this.toolTip_y + 30;
    //     this.toolTipContainer.addChild(labelSpeed);

    //     const labelRadius = new PIXI.BitmapText({
    //       text: `Radius: ${this.radius}`,
    //       style: fontStyle,
    //     });

    //     labelRadius.x = this.toolTip_x + 5;
    //     labelRadius.y = this.toolTip_y + 43;
    //     this.toolTipContainer.addChild(labelRadius);

    //     const labelEffect = new PIXI.BitmapText({
    //       text: `Effect: ${this.effect}`,
    //       style: fontStyle,
    //     });

    //     labelEffect.x = this.toolTip_x + 5;
    //     labelEffect.y = this.toolTip_y + 56;
    //     this.toolTipContainer.addChild(labelEffect);
  }
}

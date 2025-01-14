class EnemyToolTip extends PIXI.Graphics {
  constructor(
    x = 0,
    y = 0,
    type = "Enemy",
    radius = 100,
    color = 0x56a843,
    health = 1,
    speed = 100,
    gold = 1,
    enemyWidth = 0,
    enemyHeight = 0
  ) {
    super();
    this.tower_x = x;
    this.tower_y = y;

    this.type = type;
    this.radius = radius;
    this.color = color;
    this.health = health;
    this.speed = speed;
    this.gold = gold;
    this.enemyWidth = enemyWidth;
    this.enemyHeight = enemyHeight;
    this.zIndex = 999;

    // this.towerUid = "towerToolTip" + towerUid;

    this.toolTipWidth = 100; // arbitrary num
    this.toolTipHeight = 75; // arbitrary num
    this.toolTip_x = 0;
    this.toolTip_y = 0;
    this.toolTipCorners = 5;
    this.toolTipGap = 5; // gap between tooltip and tower
    this.toolTipTextStart = 4; // where the first row starts
    this.toolTipTextRowOffset = 13; // gap between rows

    this.initTowerDetail();
  }

  async initTowerDetail() {
    this.eventMode = "none";
    const canvasWidth = app.renderer.width;
    const canvasHeight = app.renderer.height;

    this.toolTip_x = this.tower_x + this.enemyWidth / 2 + this.toolTipGap;
    this.toolTip_y = this.tower_y - this.enemyHeight / 2;

    if (this.toolTip_x + this.toolTipWidth > canvasWidth) {
      this.toolTip_x =
        this.tower_x -
        this.enemyWidth / 2 -
        this.toolTipGap -
        this.toolTipWidth;
    }

    if (this.toolTip_y + this.toolTipHeight > canvasHeight) {
      this.toolTip_x = this.tower_x - this.enemyWidth / 2;
      this.toolTip_y =
        this.tower_y -
        this.enemyHeight / 2 -
        this.toolTipGap -
        this.toolTipHeight;
    }

    if (
      this.toolTip_y + this.toolTipHeight > canvasHeight ||
      this.toolTip_x + this.toolTipWidth > canvasWidth
    ) {
      this.toolTip_x =
        this.tower_x -
        this.enemyWidth / 2 -
        this.toolTipGap -
        this.toolTipWidth;
      this.toolTip_y =
        this.tower_y -
        this.enemyHeight / 2 -
        this.toolTipGap -
        this.toolTipHeight;
    }

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

    this.writeEntry(
      "Type",
      String(this.type).charAt(0).toUpperCase() + String(this.type).slice(1)
    );
    this.writeEntry("Radius", this.radius);
    this.writeEntry("Health", this.health);
    this.writeEntry("Speed", this.speed);
    this.writeEntry("Gold", this.gold);
  }

  writeEntry(key, value) {
    const fontStyle = {
      fontSize: 12,
      align: "left",
      fill: 0x000000, // black
    };

    const lbl = new PIXI.BitmapText({
      text: `${key}: ${value}`,
      style: fontStyle,
    });

    lbl.x = this.toolTip_x + 5;
    lbl.y = this.toolTip_y + this.toolTipTextStart;

    this.toolTip_y = this.toolTip_y + this.toolTipTextRowOffset;
    this.addChild(lbl);
  }

  activate() {
    this.toolTipActive = true;
  }

  deactivate() {
    this.toolTipActive = false;
  }

  //   setTooltipTowerActive(){
  //     this.towerIsActive = true;
  //   }
}

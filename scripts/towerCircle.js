class TowerCircle extends PIXI.Graphics {
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
    towerHeight = 0
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
    this.toolTipContainer = null;
    this.toolTipWidth = 95;
    this.toolTipHeight = 75;
    this.toolTip_x = 0;
    this.toolTip_y = 0;
    this.toolTipCorners = 5;
    this.toolTipGap = 5;

    this.initTowerCircle();
  }

  async initTowerCircle() {
    this.eventMode = "none";

    this.circle(this.tower_x, this.tower_y, this.radius);
    this.fill(this.color);
    this.alpha = 0.3;
  }
}

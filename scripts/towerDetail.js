class TowerDetail extends PIXI.Graphics {
  constructor(
    x = 0,
    y = 0,
    type = "standard",
    damage = 1,
    speed = 1000,
    radius = 100,
    effect = "none",
    color = 0x56a843
  ) {
    super();
    this.x = x;
    this.y = y;
    this.type = type;
    this.damage = damage;
    this.speed = speed;
    this.radius = radius;
    this.effect = effect;
    this.color = color;

    this.initTowerDetail();
  }

  async initTowerDetail() {
    const detailBorder = new PIXI.Graphics();
    detailBorder.roundRect(this.x, this.y, 64, 64, 5);
    detailBorder.fill(this.color);
    detailBorder.alpha = 0.5;
    detailBorder.strokeStyle = 100;
    app.stage.addChild(detailBorder);

    // const labelText = new PIXI.BitmapText({
    //   text: `${this.price}€`,
    //   style: {
    //     fontSize: 10,
    //     align: "left",
    //     fill: 0xfc0303,
    //   },
    // });

    // labelText.x = this.x + 4;
    // labelText.y = this.y + 14;

    // app.stage.addChild(labelText);
  }
}

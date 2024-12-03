class Tower extends PIXI.Graphics {
  constructor(
    x = 0,
    y = 0,
    type = "standard",
    // radius = 10,
    // color = 0x0f03fc,
    damage = 1,
    speed = 1
  ) {
    super();
    this.x = x;
    this.y = y;
    this.type = type;
    // this.radius = radius;
    // this.color = color;
    this.damage = damage;
    this.speed = speed;

    this.bullet_radius = 5;
    this.bullet_color = 0xf4fc03;

    // this.initTower();
  }

  async initTower() {
    // this.circle(0, 0, this.radius);
    // this.fill(this.color);
    const texture = await PIXI.Assets.load(paneSprites.meta.image);
    const spritesheet = new PIXI.Spritesheet(texture, paneSprites);
    await spritesheet.parse();
    this.sprite = new PIXI.Sprite(spritesheet.textures[this.type]);
    app.stage.addChild(this.sprite);

    this.sprite.position.set(this.x, this.y);
    this.sprite.anchor.set(0.5);
  }

  rotateTower(x, y) {
    //   rotateTower(enemy) {
    // if (y <= this.y && x > this.x) {
    //   //   console.log("Q1");
    //   const a = this.y - y;
    //   const b = x - this.x;
    //   const tangent = b / a;
    //   this.sprite.rotation = Math.atan(tangent);
    //   //   this.sprite.rotation = Math.atan2(y, x) + 1;
    // }
    // // Q2
    // if (y < this.y && x <= this.x) {
    //   //   console.log("Q2");
    //   const a = this.y - y;
    //   const b = this.x - x;
    //   const tangent = b / a;
    //   this.sprite.rotation = Math.atan(tangent);
    //   //   this.sprite.rotation = Math.atan2(y, x) + 5.5;
    // }
    // // Q3
    // if (y >= this.y && x < this.x) {
    //   //   console.log("Q3");
    //   const a = y - this.y;
    //   const b = this.x - x;
    //   const tangent = b / a;
    //   this.sprite.rotation = Math.atan(tangent);
    //   //   this.sprite.rotation = Math.atan2(y, x) + 2.5;
    // }
    // // Q4
    // if (y > this.y && x >= this.x) {
    //   //   console.log("Q4");
    //   const a = y - this.y;
    //   const b = x - this.x;
    //   const tangent = b / a;
    //   this.sprite.rotation = Math.atan(tangent);
    //   //   this.sprite.rotation = Math.atan2(tangent);
    //   //   this.sprite.rotation = Math.atan2(y, x) + 1.6;
    // }
    // this.sprite.rotation = Math.atan2(y, x) + 1.45;
    // console.log(this.sprite);
    // console.log(Math.atan2(y, x));
    // this.sprite.rotation = Math.atan2(y, x);
    const dx = x - this.sprite.x;
    const dy = y - this.sprite.y;
    const angle = Math.atan2(dy, dx);
    const rotationOffset = Math.PI / 2;
    // Rotate the sprite to face the mouse
    this.sprite.rotation = angle + rotationOffset;
  }

  shoot(enemy) {
    const enemy_x = enemy.x;
    const enemy_y = enemy.y;
    return new Bullet(
      this.x,
      this.y,
      this.x,
      this.y,
      enemy_x,
      enemy_y,
      this.speed,
      this.bullet_radius,
      this.bullet_color,
      this.damage
    );
  }

  getClosesEnemy(enemies) {
    let currentEnemyDistance;
    let closesEnemyDistance;
    let closesEnemyObject;

    for (let i = 0; i < enemies.length; i++) {
      // Q1
      if (enemies[i].y <= this.y && enemies[i].x > this.x) {
        //   console.log("Q1");
        const a = this.y - enemies[i].y;
        const b = enemies[i].x - this.x;
        currentEnemyDistance = Math.sqrt(a * a + b * b);
      }

      // Q2
      if (enemies[i].y < this.y && enemies[i].x <= this.x) {
        //   console.log("Q2");
        const a = this.y - enemies[i].y;
        const b = this.x - enemies[i].x;
        currentEnemyDistance = Math.sqrt(a * a + b * b);
      }

      // Q3
      if (enemies[i].y >= this.y && enemies[i].x < this.x) {
        //   console.log("Q3");
        const a = enemies[i].y - this.y;
        const b = this.x - enemies[i].x;
        currentEnemyDistance = Math.sqrt(a * a + b * b);
      }

      // Q4
      if (enemies[i].y > this.y && enemies[i].x >= this.x) {
        //   console.log("Q4");
        const a = enemies[i].y - this.y;
        const b = enemies[i].x - this.x;
        currentEnemyDistance = Math.sqrt(a * a + b * b);
      }

      if (i === 0) {
        closesEnemyDistance = currentEnemyDistance;
        closesEnemyObject = enemies[i];
        continue;
      }

      if (currentEnemyDistance < closesEnemyDistance) {
        closesEnemyDistance = currentEnemyDistance;
        closesEnemyObject = enemies[i];
      }
    }
    // console.log(closesEnemyObject.x);
    return closesEnemyObject;
  }
}

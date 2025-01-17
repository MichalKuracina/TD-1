class PlusHeart extends PIXI.Container {
  constructor(texture, label, x, y, smallBtnX, smallBtnY, amount) {
    super();
    this.texture = texture;
    this.label = label;
    this.x = x;
    this.y = y;
    this.smallBtnX = smallBtnX;
    this.smallBtnY = smallBtnY;
    this.amount = amount;
    this.zIndex = 1000;
    this.timeElapsed = 0;
    this.timeToFadeout = 0;
    this.active = true;
    this.heartPicture = null;
    this.distance = 0;
    this.speed = 5;

    this.drawHeart();
    this.setText();
  }

  fadeout(deltaMS) {
    this.timeElapsed += deltaMS;
    if (this.timeElapsed >= 2000) {
      this.width = this.width - 10;
      this.height = this.height - 10;
      this.moveToHeart(this.smallBtnX, this.smallBtnY);
    }
  }

  moveToHeart(smallX, smallY) {
    this.distance++;
    this.smallHeartX = smallX;
    this.smallHeartY = smallY;

    // Q1
    if (this.smallHeartY <= this.y && this.smallHeartX > this.x) {
      //   console.log("Q1");
      const a = this.y - this.smallHeartY;
      const b = this.smallHeartX - this.x;
      const c = Math.sqrt(a * a + b * b);
      const newDistance = c - this.distance * this.speed;

      const tangent = b / a;
      const angleRadians = Math.atan(tangent);
      const new_a = newDistance * Math.cos(angleRadians);
      const new_b = newDistance * Math.sin(angleRadians);

      const new_x = this.x + (b - new_b);
      const new_y = this.y - (a - new_a);

      this.position_x = new_x;
      this.position_y = new_y;
      this.position.set(this.position_x, this.position_y);
    }

    // Q2
    if (this.smallHeartY < this.y && this.smallHeartX <= this.x) {
      //   console.log("Q2");
      const a = this.y - this.smallHeartY;
      const b = this.x - this.smallHeartX;
      const c = Math.sqrt(a * a + b * b);
      const newDistance = c - this.distance * this.speed;

      const tangent = b / a;
      const angleRadians = Math.atan(tangent);
      const new_a = newDistance * Math.cos(angleRadians);
      const new_b = newDistance * Math.sin(angleRadians);

      const new_x = this.x - (b - new_b);
      const new_y = this.y - (a - new_a);

      this.position_x = new_x;
      this.position_y = new_y;
      this.position.set(this.position_x, this.position_y);
    }

    // Q3
    if (this.smallHeartY >= this.y && this.smallHeartX < this.x) {
      //   console.log("Q3");
      const a = this.smallHeartY - this.y;
      const b = this.x - this.smallHeartX;
      const c = Math.sqrt(a * a + b * b);
      const newDistance = c - this.distance * this.speed;

      const tangent = b / a;
      const angleRadians = Math.atan(tangent);
      const new_a = newDistance * Math.cos(angleRadians);
      const new_b = newDistance * Math.sin(angleRadians);

      const new_x = this.x - (b - new_b);
      const new_y = this.y + (a - new_a);

      this.position_x = new_x;
      this.position_y = new_y;
      this.position.set(this.position_x, this.position_y);
    }

    // Q4
    if (this.smallHeartY > this.y && this.smallHeartX >= this.x) {
      //   console.log("Q4");
      const a = this.smallHeartY - this.y;
      const b = this.smallHeartX - this.x;
      const c = Math.sqrt(a * a + b * b);
      const newDistance = c - this.distance * this.speed;

      const tangent = b / a;
      const angleRadians = Math.atan(tangent);
      const new_a = newDistance * Math.cos(angleRadians);
      const new_b = newDistance * Math.sin(angleRadians);

      const new_x = this.x + (b - new_b);
      const new_y = this.y + (a - new_a);

      this.position_x = new_x;
      this.position_y = new_y;
      this.position.set(this.position_x, this.position_y);
    }
  }

  drawHeart() {
    const heartPicture = new PIXI.Sprite(this.texture);
    heartPicture.label = "bigHeart";
    heartPicture.width = 96;
    heartPicture.height = 96;
    heartPicture.anchor.set(0.5);
    this.addChild(heartPicture);
  }

  setText() {
    const fontStyle = {
      fontSize: 40,
      align: "left",
      fill: 0xffffff,
    };

    const lbl = new PIXI.BitmapText({
      text: `+${this.amount}`,
      style: fontStyle,
    });

    lbl.x = -lbl.width / 2;
    lbl.y = -(lbl.height / 2) - 5;
    this.addChild(lbl);
  }
}

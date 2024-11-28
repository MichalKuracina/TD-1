function grid() {
  const line = new PIXI.Graphics();
  app.stage.addChild(line);

  const horizontalLines = Math.floor(canvasHeight / 64) + 1;
  const verticalLines = Math.floor(canvasWidth / 64) + 1;

  for (let h = 1; h < horizontalLines; h++) {
    line.moveTo(0, h * 64);
    line.lineTo(app.canvas.width, h * 64);

    const text = new PIXI.BitmapText({
      text: h * 64,
      style: {
        fontSize: 10,
        align: "left",
        fill: 0xfc0303,
      },
    });

    text.x = 0;
    text.y = h * 64;

    app.stage.addChild(text);
  }

  for (let v = 1; v < verticalLines; v++) {
    line.moveTo(v * 64, 0);
    line.lineTo(v * 64, app.canvas.height);

    const text = new PIXI.BitmapText({
      text: v * 64,
      style: {
        fontSize: 10,
        align: "left",
        fill: 0xfc0303,
      },
    });

    text.x = v * 64;
    text.y = 0;

    app.stage.addChild(text);
  }

  line.stroke({ width: 1, color: 0xfc0303, alpha: 0.2 });

  coordinates(app, canvasWidth, canvasHeight);
}

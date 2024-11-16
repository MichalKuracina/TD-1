function grid(app) {
  const line = new PIXI.Graphics();
  app.stage.addChild(line);

  const horizontalLines = Math.floor(canvasHeight / 100);
  const verticalLines = Math.floor(canvasWidth / 100);

  for (let h = 1; h < horizontalLines; h++) {
    line.moveTo(0, h * 100);
    line.lineTo(app.canvas.width, h * 100);

    const text = new PIXI.BitmapText({
      text: h * 100,
      style: {
        fontSize: 10,
        align: "left",
        fill: 0xfc0303,
      },
    });

    text.x = 0;
    text.y = h * 100;

    app.stage.addChild(text);
  }

  for (let v = 1; v < verticalLines; v++) {
    line.moveTo(v * 100, 0);
    line.lineTo(v * 100, app.canvas.height);

    const text = new PIXI.BitmapText({
      text: v * 100,
      style: {
        fontSize: 10,
        align: "left",
        fill: 0xfc0303,
      },
    });

    text.x = v * 100;
    text.y = 0;

    app.stage.addChild(text);
  }

  line.stroke({ width: 1, color: 0xfc0303, alpha: 0.2 });
}

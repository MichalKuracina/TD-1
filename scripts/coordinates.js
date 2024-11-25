function coordinates(app, canvasWidth, canvasHeight) {
  const coordinatesContainer = new PIXI.Container();
  const coordinatesTexts = [
    new PIXI.BitmapText("X:0 Y:0"),
    // new PIXI.BitmapText("Rad: 0"),
  ];

  coordinatesTexts.forEach((text, index) => {
    text.y = index * 20;
    text.anchor.set(0.5);
    text.style = {
      fontSize: 12,
      align: "left",
      fill: 0xfc0303,
    };
    coordinatesContainer.addChild(text);
  });

  coordinatesContainer.x = canvasWidth - 50;
  coordinatesContainer.y = 50;

  app.stage.addChild(coordinatesContainer);

  app.stage.on("pointermove", (event) => {
    const mousePosition = event.data.global;
    coordinatesContainer.children[0].text = `X:${Math.round(
      mousePosition.x
    )} Y:${Math.round(mousePosition.y)}`;
  });

  const cross = new PIXI.Graphics();
  app.stage.addChild(cross);

  const canvasCenterX = canvasWidth / 2;
  const canvasCenterY = canvasHeight / 2;

  cross.moveTo(canvasCenterX - 10, canvasCenterY);
  cross.lineTo(canvasCenterX + 10, canvasCenterY);
  cross.moveTo(canvasCenterX, canvasCenterY - 10);
  cross.lineTo(canvasCenterX, canvasCenterY + 10);
  cross.stroke({ width: 3, color: 0xfc0303, alpha: 1 });
}

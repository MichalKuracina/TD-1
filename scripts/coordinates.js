function coordinates(app, canvasWidth, canvasHeight) {
  const text = new PIXI.BitmapText({
    text: "X:0 Y:0",
    style: {
      fontSize: 10,
      align: "left",
      fill: 0xfc0303,
    },
  });

  text.anchor.set(0.5);
  text.x = canvasWidth - 50;
  text.y = canvasHeight - 50;

  app.stage.addChild(text);

  app.stage.on("pointermove", (event) => {
    const mousePosition = event.data.global;
    text.text = `X:${Math.round(mousePosition.x)} Y:${Math.round(
      mousePosition.y
    )}`;
  });
}

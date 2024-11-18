function hud() {
  const hudContainer = new PIXI.Container();

  const hudTexts = [
    new PIXI.BitmapText("Turrets: 0", {
      fontSize: 15,
      align: "left",
      fill: 0xfc0303,
    }),
    new PIXI.BitmapText("Enemies: 0", {
      fontSize: 15,
      align: "left",
      fill: 0xfc0303,
    }),
  ];

  hudTexts.forEach((text, index) => {
    text.y = index * 20;
    hudContainer.addChild(text);
  });

  hudContainer.x = 10;
  hudContainer.y = 10;

  app.stage.addChild(hudContainer);

  return hudContainer;
}

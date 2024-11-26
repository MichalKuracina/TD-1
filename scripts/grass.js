async function grass() {
  const atlasData = {
    frames: {
      grass: {
        frame: { x: 128, y: 128, w: 64, h: 64 },
        sourceSize: { w: 64, h: 64 },
        spriteSourceSize: { x: 0, y: 0, w: 64, h: 64 },
      },
    },
    meta: {
      image: "/assets/roads2W copy.png",
      size: { w: 512, h: 192 },
    },
  };

  const texture = await PIXI.Assets.load(atlasData.meta.image);
  const spritesheet = new PIXI.Spritesheet(texture, atlasData);
  await spritesheet.parse();

  const tilesV = Math.floor(canvasHeight / 64) + 1;
  const tilesH = Math.floor(canvasWidth / 64) + 1;

  //   console.log(tilesV);
  //   console.log(tilesH);

  for (let i = 0; i < tilesH; i++) {
    console.log(i);
    for (let j = 0; j < tilesV; j++) {
      const x = i * 64;
      const y = j * 64;
      const grass = new PIXI.Sprite(spritesheet.textures.grass);
      app.stage.addChild(grass);
      grass.position.set(x, y);
      //   console.log(i);
      //   grass.anchor.set(0.5);
    }
  }

  //   console.log("aaa");
  //   grass = new PIXI.Sprite(spritesheet.textures.grass);
  //   app.stage.addChild(grass);
  //   grass.position.set(0, 0);
  //   grass = new PIXI.Sprite(spritesheet.textures.grass);
  //   app.stage.addChild(grass);
  //   grass.position.set(0, 64);
  //   grass = new PIXI.Sprite(spritesheet.textures.grass);
  //   app.stage.addChild(grass);
  //   grass.position.set(0, 128);

  //   grass.anchor.set(0.5);

  // //add
  //   app.stage.addChild(road);
  //   road.position.set(new_x, new_y);
  //   road.anchor.set(0.5);

  //   //old
  //   const line = new PIXI.Graphics();
  //   app.stage.addChild(line);

  //   for (let h = 1; h < horizontalLines; h++) {
  //     line.moveTo(0, h * 64);
  //     line.lineTo(app.canvas.width, h * 64);

  //     const text = new PIXI.BitmapText({
  //       text: h * 64,
  //       style: {
  //         fontSize: 10,
  //         align: "left",
  //         fill: 0xfc0303,
  //       },
  //     });

  //     text.x = 0;
  //     text.y = h * 64;

  //     app.stage.addChild(text);
  //   }

  //   for (let v = 1; v < verticalLines; v++) {
  //     line.moveTo(v * 64, 0);
  //     line.lineTo(v * 64, app.canvas.height);

  //     const text = new PIXI.BitmapText({
  //       text: v * 64,
  //       style: {
  //         fontSize: 10,
  //         align: "left",
  //         fill: 0xfc0303,
  //       },
  //     });

  //     text.x = v * 64;
  //     text.y = 0;

  //     app.stage.addChild(text);
  //   }

  //   line.stroke({ width: 1, color: 0xfc0303, alpha: 0.2 });

  //   coordinates(app, canvasWidth, canvasHeight);
}

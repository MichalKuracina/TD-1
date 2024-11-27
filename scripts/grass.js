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
      image: "/assets/spritesheet.png",
      size: { w: 512, h: 192 },
    },
  };

  const texture = await PIXI.Assets.load(atlasData.meta.image);
  const spritesheet = new PIXI.Spritesheet(texture, atlasData);
  await spritesheet.parse();

  const tilesV = Math.floor(canvasHeight / 64) + 1;
  const tilesH = Math.floor(canvasWidth / 64) + 1;

  for (let i = 0; i < tilesH; i++) {
    for (let j = 0; j < tilesV; j++) {
      const x = i * 64;
      const y = j * 64;
      const grass = new PIXI.Sprite(spritesheet.textures.grass);
      app.stage.addChild(grass);
      grass.position.set(x, y);
    }
  }
}

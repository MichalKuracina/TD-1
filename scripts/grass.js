async function grass() {
  //   const texture = await PIXI.Assets.load(roadsSprites.meta.image);
  //   const spritesheet = new PIXI.Spritesheet(texture, roadsSprites);
  //   await spritesheet.parse();

  const tilesV = Math.floor(canvasHeight / 64) + 1;
  const tilesH = Math.floor(canvasWidth / 64) + 1;

  for (let i = 0; i < tilesH; i++) {
    for (let j = 0; j < tilesV; j++) {
      const x = i * 64;
      const y = j * 64;
      const grass = new PIXI.Sprite(roadSpritesheet.textures.grass);
      app.stage.addChild(grass);
      grass.position.set(x, y);
    }
  }
}

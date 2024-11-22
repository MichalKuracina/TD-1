// const atlasData = {
//     frames: {
//       // enemy1: {
//       //   frame: { x: 0, y: 0, w: 64, h: 64 },
//       //   sourceSize: { w: 64, h: 64 },
//       //   spriteSourceSize: { x: 0, y: 0, w: 64, h: 64 },
//       // },
//       road: {
//         frame: { x: 128, y: 0, w: 64, h: 64 },
//         sourceSize: { w: 64, h: 64 },
//         spriteSourceSize: { x: 0, y: 0, w: 64, h: 64 },
//       },
//     },
//     meta: {
//       image: "/assets/roads2W.png",
// format: 'RGBA8888',
//   size: { w: 512, h: 192 },
// scale: 1
// },
//   animations: {
//     enemy: ["enemy1", "enemy2"], //array of frames by name
//   },
//   };

// ANIMATED SPRITE
// texture = await PIXI.Assets.load(atlasData.meta.image);
// spritesheet = new PIXI.Spritesheet(texture, atlasData);
// await spritesheet.parse();
// const animatedSprite = new PIXI.AnimatedSprite(
//   spritesheet.animations.enemy
// );
// app.stage.addChild(animatedSprite);
// animatedSprite.play();
// animatedSprite.animationSpeed = 0.15;
// animatedSprite.position.set(100, 100);

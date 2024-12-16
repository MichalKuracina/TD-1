async function path(routeObj, pathTiles) {
  const spriteWidth = 64;
  let new_x;
  let new_y;

  if (routeObj[1].y <= routeObj[0].y && routeObj[1].x > routeObj[0].x) {
    const a = routeObj[0].y - routeObj[1].y;
    const b = routeObj[1].x - routeObj[0].x;
    const c = Math.sqrt(a * a + b * b);
    const newDistance = c - spriteWidth;

    const tangent = b / a;
    const angleRadians = Math.atan(tangent);
    const new_a = newDistance * Math.cos(angleRadians);
    const new_b = newDistance * Math.sin(angleRadians);

    new_x = routeObj[0].x + (b - new_b);
    new_y = routeObj[0].y - (a - new_a);
  }

  if (routeObj[1].y < routeObj[0].y && routeObj[1].x <= routeObj[0].x) {
    const a = routeObj[0].y - routeObj[1].y;
    const b = routeObj[0].x - routeObj[1].x;
    const c = Math.sqrt(a * a + b * b);
    const newDistance = c - spriteWidth;

    const tangent = b / a;
    const angleRadians = Math.atan(tangent);
    const new_a = newDistance * Math.cos(angleRadians);
    const new_b = newDistance * Math.sin(angleRadians);

    new_x = routeObj[0].x - (b - new_b);
    new_y = routeObj[0].y - (a - new_a);
  }

  if (routeObj[1].y >= routeObj[0].y && routeObj[1].x < routeObj[0].x) {
    const a = routeObj[1].y - routeObj[0].y;
    const b = routeObj[0].x - routeObj[1].x;
    const c = Math.sqrt(a * a + b * b);
    const newDistance = c - spriteWidth;

    const tangent = b / a;
    const angleRadians = Math.atan(tangent);
    const new_a = newDistance * Math.cos(angleRadians);
    const new_b = newDistance * Math.sin(angleRadians);

    new_x = routeObj[0].x - (b - new_b);
    new_y = routeObj[0].y + (a - new_a);
  }

  if (routeObj[1].y > routeObj[0].y && routeObj[1].x >= routeObj[0].x) {
    const a = routeObj[1].y - routeObj[0].y;
    const b = routeObj[1].x - routeObj[0].x;
    const c = Math.sqrt(a * a + b * b);
    const newDistance = c - spriteWidth;

    const tangent = b / a;
    const angleRadians = Math.atan(tangent);
    const new_a = newDistance * Math.cos(angleRadians);
    const new_b = newDistance * Math.sin(angleRadians);

    new_x = routeObj[0].x + (b - new_b);
    new_y = routeObj[0].y + (a - new_a);
  }

  new_x = Math.round(new_x * 10) / 10;
  new_y = Math.round(new_y * 10) / 10;

  //   if (routeObj.length === 1) {
  //     console.log("Hit end");
  //     return;
  //   }

  let direction;
  let nextDirection;

  if (routeObj[1].y === routeObj[0].y && routeObj[1].x > routeObj[0].x) {
    direction = "right";
  }

  if (routeObj[1].y < routeObj[0].y && routeObj[1].x === routeObj[0].x) {
    direction = "top";
  }

  if (routeObj[1].y === routeObj[0].y && routeObj[1].x < routeObj[0].x) {
    direction = "left";
  }

  if (routeObj[1].y > routeObj[0].y && routeObj[1].x === routeObj[0].x) {
    direction = "bottom";
  }

  let road;

  if (direction === "right" || direction === "left") {
    road = new PIXI.Sprite(roadSpritesheet.textures.roadH);
  } else if (direction === "top" || direction === "bottom") {
    road = new PIXI.Sprite(roadSpritesheet.textures.roadV);
  }

  road.position.set(new_x, new_y);
  road.anchor.set(0.5);
  road.label = "roadTile";
  app.stage.addChild(road);
  pathTiles.push(road);

  routeObj[0].x = new_x;
  routeObj[0].y = new_y;

  if (
    isInRange(routeObj[0].x, routeObj[1].x, spriteWidth / 2) &&
    isInRange(routeObj[0].y, routeObj[1].y, spriteWidth / 2)
  ) {
    routeObj.shift();

    if (routeObj.length === 1) {
      return;
    }

    if (routeObj[1].y === routeObj[0].y && routeObj[1].x > routeObj[0].x) {
      nextDirection = "right";
    }

    if (routeObj[1].y < routeObj[0].y && routeObj[1].x === routeObj[0].x) {
      nextDirection = "top";
    }

    if (routeObj[1].y === routeObj[0].y && routeObj[1].x < routeObj[0].x) {
      nextDirection = "left";
    }

    if (routeObj[1].y > routeObj[0].y && routeObj[1].x === routeObj[0].x) {
      nextDirection = "bottom";
    }

    let curve;

    if (
      (direction === "left" && nextDirection === "top") ||
      (direction === "bottom" && nextDirection === "right")
    ) {
      curve = new PIXI.Sprite(roadSpritesheet.textures.q1curve);
    }

    if (
      (direction === "right" && nextDirection === "top") ||
      (direction === "bottom" && nextDirection === "left")
    ) {
      curve = new PIXI.Sprite(roadSpritesheet.textures.q2curve);
    }

    if (
      (direction === "right" && nextDirection === "bottom") ||
      (direction === "top" && nextDirection === "left")
    ) {
      curve = new PIXI.Sprite(roadSpritesheet.textures.q3curve);
    }

    if (
      (direction === "left" && nextDirection === "bottom") ||
      (direction === "top" && nextDirection === "right")
    ) {
      curve = new PIXI.Sprite(roadSpritesheet.textures.q4curve);
    }

    curve.position.set(new_x, new_y);
    curve.anchor.set(0.5);
    app.stage.addChild(curve);
    pathTiles.push(curve);
  }

  result = await path(routeObj, pathTiles);

  return pathTiles;
}

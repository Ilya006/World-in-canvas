function getNearestPoint(loc, points, threshold = Number.MAX_SAFE_INTEGER) {
  let minDist = Number.MAX_SAFE_INTEGER
  let nearest = null

  for (const point of points) {
    const dist = distance(loc, point)

    if (dist < minDist && dist < threshold) {
      minDist = dist
      nearest = point
    }
  }

  return nearest
}

function distance(loc, point) {
  return Math.hypot(loc.x - point.x, loc.y - point.y)
}
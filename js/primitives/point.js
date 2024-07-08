class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  equals(point) {
    return this.x == point.x && this.y == point.y
  }

  draw(ctx, { size = 18, color = 'black' } = {}) {
    ctx.beginPath()
    ctx.moveTo(this.x, this.y)
    ctx.arc(this.x, this.y, Math.floor(size / 2), 0, Math.PI * 2)
    ctx.fillStyle = color
    ctx.fill()
  } 
}
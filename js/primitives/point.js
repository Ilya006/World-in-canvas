class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  equals(point) {
    return this.x == point.x && this.y == point.y
  }

  draw(ctx, { size = 18, color = 'black', outline = false, fill = 0 } = {}) {
    const radius = Math.floor(size / 2)
    ctx.beginPath()
    ctx.moveTo(this.x, this.y)
    ctx.fillStyle = color
    ctx.arc(this.x, this.y, radius, 0, Math.PI * 2)
    ctx.fill()

    if (outline) {
      ctx.beginPath()
      ctx.lineWidth = 2
      ctx.strokeStyle = 'yellow'
      ctx.arc(this.x, this.y, radius * 0.6, 0, Math.PI * 2)
      ctx.stroke()
    }

    if (fill) {
      ctx.beginPath()
      ctx.fillStyle = 'yellow'
      ctx.arc(this.x, this.y, radius * 0.4, 0, Math.PI * 2)
      ctx.fill()
    }
  } 
}
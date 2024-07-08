class Segment {
  constructor(p1, p2) {
    this.p1 = p1
    this.p2 = p2
  }

  equals(segment) {
    return this.include(segment.p1) && this.include(segment.p2)
  }

  include(point) {
    return this.p1.equals(point) || this.p2.equals(point)
  }

  draw(ctx, { size = 2, color = 'black' } = {}) {
    ctx.beginPath()
    ctx.lineWidth = size
    ctx.strokeStyle = color
    ctx.moveTo(this.p1.x, this.p1.y)
    ctx.lineTo(this.p2.x, this.p2.y)
    ctx.stroke()
  }
}
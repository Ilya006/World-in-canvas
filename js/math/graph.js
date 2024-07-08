class Graph {
  constructor(points = [], segments = []) {
    this.points = points
    this.segments = segments
  }

  /* 
  * Points
  */
  addPoint(point) {
    this.points.push(point)
  }

  containsPoint(point) {
    return this.points.find((p) => p.equals(point))
  }

  tryAddPoint(point) {
    if(!this.containsPoint(point)) {
      this.addPoint(point)
      return true
    }
    return false
  }

  removePoint(point) {
    const segs = this.getSegmentsWithPoint(point)
    segs.forEach(seg => this.removeSegment(seg))
    this.points.splice(this.points.indexOf(point), 1)
  }

  /* 
  * Segments
  */
  addSegment(segment) {
    this.segments.push(segment)
  }

  containsSegment(segment) {
    return this.segments.find((s) => s.equals(segment))
  }

  tryAddSegment(segment) {
    if(!this.containsSegment(segment)) {
      this.addSegment(segment)
      return true
    }
    return false
  }

  removeSegment(segment) {
    this.segments.splice(this.segments.indexOf(segment), 1)
  }

  getSegmentsWithPoint(point) {
    const segs = []

    for(const seg of this.segments) {
      if (seg.include(point)) {
        segs.push(seg)
      }
    }
    
    return segs
  }

  /*
  * Other
  */
  removeAll() {
    this.segments.length = 0
    this.points.length = 0
  }

  /*
  * Main
  */

  draw(ctx) {
    for (const segment of this.segments) {
      segment.draw(ctx)
    }

    for (const point of this.points) {
      point.draw(ctx)
    }
  }
}
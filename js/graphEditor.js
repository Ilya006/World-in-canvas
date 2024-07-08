class GraphEditor {
  constructor(canvas, graph) {
    this.canvas = canvas
    this.graph = graph

    this.selected = null
    this.hovered = null
    this.dragging = false
    this.mouse = null

    this.ctx = this.canvas.getContext('2d')

    this.#addEventListeners()
  }

  #addEventListeners() {
    this.canvas.addEventListener('mousedown', ({ button, offsetX, offsetY }) => {
      if (button === 0) { // left click
        if (this.hovered) {
          this.#select(this.hovered)
          this.selected = this.hovered
          this.dragging = true
          return
        } else {
          this.#select(this.mouse)
        }
  
        this.graph.addPoint(this.mouse)
        this.selected = this.mouse
        this.hovered = this.mouse
      }

      if (button === 2) { // right click
        if (this.hovered) {
          this.#removePoint(this.hovered)
        } else {
          this.selected = null
        }
      }
    })

    this.canvas.addEventListener('mousemove', ({ offsetX, offsetY }) => {
      this.mouse = new Point(offsetX, offsetY)
      this.hovered = getNearestPoint(this.mouse, this.graph.points, 10)

      if (this.dragging) {
        this.selected.x = this.mouse.x
        this.selected.y = this.mouse.y
      }
    })

    this.canvas.addEventListener('contextmenu', (event) => event.preventDefault())
    this.canvas.addEventListener('mouseup', () => this.dragging = false)
  }

  #removePoint(point) {
    this.graph.removePoint(point)
    this.hovered = null

    if (this.selected == point) {
      this.selected = null
    }
  }

  #select(point) {
    if (this.selected) {
      this.graph.tryAddSegment(new Segment(this.selected, point))
    }
  }

  display() {
    this.graph.draw(this.ctx)
    if (this.selected) {
      const intent = this.hovered ? this.hovered : this.mouse
      new Segment(this.selected, intent).draw(this.ctx, { dash: [3, 3] })
      this.selected.draw(this.ctx, { outline: true })
    }
    if (this.hovered) {
      this.hovered.draw(this.ctx, { fill: true })
    }
  }
}
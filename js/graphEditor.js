class GraphEditor {
  constructor(canvas, graph) {
    this.canvas = canvas
    this.graph = graph

    this.selected = null
    this.hovered = null
    this.dragging = false

    this.ctx = this.canvas.getContext('2d')

    this.#addEventListeners()
  }

  #addEventListeners() {
    this.canvas.addEventListener('mousedown', ({ button, offsetX, offsetY }) => {
      if (button === 0) { // left click
        const mouse = new Point(offsetX, offsetY)

        if (this.hovered) {
          this.selected = this.hovered
          this.dragging = true
          return
        }
  
        this.graph.addPoint(mouse)
        this.selected = mouse
        this.hovered = mouse
      }

      if (button === 2) { // right click
        if (this.hovered) {
          this.#removePoint(this.hovered)
        }
      }
    })

    this.canvas.addEventListener('mousemove', ({ offsetX, offsetY }) => {
      const mouse = new Point(offsetX, offsetY)
      this.hovered = getNearestPoint(mouse, this.graph.points, 10)

      if (this.dragging) {
        this.selected.x = mouse.x
        this.selected.y = mouse.y
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

  display() {
    this.graph.draw(this.ctx)
    if (this.selected) {
      this.selected.draw(this.ctx, { outline: true })
    }
    if (this.hovered) {
      this.hovered.draw(this.ctx, { fill: true })
    }
  }
}
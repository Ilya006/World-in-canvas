function draw() {
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')

  const p1 = new Point(100, 100)
  const p2 = new Point(500, 600)
  const p3 = new Point(800, 250)
  const p4 = new Point(100, 800)

  const s1 = new Segment(p1, p2)
  const s2 = new Segment(p1, p3)
  const s3 = new Segment(p2, p3)
  const s4 = new Segment(p4, p1)

  const graph = new Graph([p1, p2, p3, p4], [s1, s2, s3, s4])
  const graphEditor = new GraphEditor(canvas, graph)

  animation()

  function animation() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    graphEditor.display()
    window.requestAnimationFrame(animation)
  }

  window.graph = graph
}

window.addEventListener('load', draw)
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

  const addPointBtn = document.getElementById('addPointBtn')
  const addSegmentBtn = document.getElementById('addSegmentBtn')
  const removePointBtn = document.getElementById('removePointBtn')
  const removeSegmentBtn = document.getElementById('removeSegmentBtn')
  const removeAllBtn = document.getElementById('removeAllBtn')

  addPointBtn.addEventListener('click', handleAddPint)
  addSegmentBtn.addEventListener('click', handleAddSegment)
  removePointBtn.addEventListener('click', handleRemovePoint)
  removeSegmentBtn.addEventListener('click', handleRemoveSegment)
  removeAllBtn.addEventListener('click', handleRemoveAll)

  function handleAddPint() {
    const success = graph.tryAddPoint(
      new Point(
        Math.floor(Math.random() * canvas.width),
        Math.floor(Math.random() * canvas.height)
      )
    )
    if (success) {
      draw(ctx)
    }
    console.log(success)
  }

  function handleAddSegment() {
    const index1 = Math.floor(Math.random() * graph.points.length)
    const index2 = Math.floor(Math.random() * graph.points.length)

    const success = graph.tryAddSegment(
      new Segment(graph.points[index1], graph.points[index2])
    )
    if (success) {
      draw(ctx)
    }
    console.log(success)
  }

  function handleRemovePoint() {
    if (!graph.points.length) {
      console.log('No points')
      return
    }
    const index = Math.floor(Math.random() * graph.points.length)
    graph.removePoint(graph.points[index])
    draw(ctx)
  }

  function handleRemoveSegment() {
    if (!graph.segments.length) {
      console.log('No segment')
      return
    }
    const index = Math.floor(Math.random() * graph.segments.length)
    graph.removeSegment(graph.segments[index])
    draw(ctx)
  }

  function handleRemoveAll() {
    graph.removeAll()
    draw(ctx)
  }

  function draw(ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    graph.draw(ctx)
  }

  window.graph = graph
  
  graph.draw(ctx)
}

window.addEventListener('load', draw)
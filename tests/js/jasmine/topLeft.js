describe('topLeft', function() {

  it('should return identical values through window scrolling', function() {
    // Jasmine dependent code below
    var div = document.getElementsByTagName('div')[26]
    var initialTL = $_(div).topLeft()
    window.scrollTo(0, 100)
    var afterScrollTL = div.$_.topLeft()
    // Windows Phone has decimal values for top/left and they are
    // off by a margin less than 1. All other platforms work with
    // simple equality checks: afterScrollTL = initialTL
    expect(afterScrollTL).toEqual(initialTL)
    window.scrollTo(0, 200)
    afterScrollTL = div.$_.topLeft()
    expect(afterScrollTL).toEqual(initialTL)
    window.scrollTo(0, 400)
    afterScrollTL = div.$_.topLeft()
    expect(afterScrollTL).toEqual(initialTL)
    window.scrollTo(0, 600)
    afterScrollTL = div.$_.topLeft()
    expect(afterScrollTL).toEqual(initialTL)
    window.scrollTo(0, 800)
    afterScrollTL = div.$_.topLeft()
    expect(afterScrollTL).toEqual(initialTL)
  })

  it('should return identical values through window scrolling for element with absolute position', function() {
    if(!$_.capabilities.absolutePosition) {
      return
    }
    $_(document.body).append('<div id=topleft-absolute style=position:absolute;top:100px;left:100px></div>')
    var div = document.body.$_.lastChild()
    var initialTL = div.topLeft()
    // Windows Phone has decimal values for top/left and they are
    // off by a margin less than 1. All other platforms work with
    // simple equality checks: afterScrollTL.? = initialTL.?
    window.scrollTo(0, 100)
    var afterScrollTL = div.topLeft()
    expect(afterScrollTL).toEqual(initialTL)
    window.scrollTo(0, 200)
    afterScrollTL = div.topLeft()
    expect(afterScrollTL).toEqual(initialTL)
    window.scrollTo(0, 400)
    afterScrollTL = div.topLeft()
    expect(afterScrollTL).toEqual(initialTL)
    window.scrollTo(0, 600)
    afterScrollTL = div.topLeft()
    expect(afterScrollTL).toEqual(initialTL)
    window.scrollTo(0, 800)
    afterScrollTL = div.topLeft()
    expect(afterScrollTL).toEqual(initialTL)
    div.element.parentNode.removeChild(div.element)
    window.scrollTo(0, 0)
  })

  it('should return identical values through window scrolling for element with fixed position', function() {
    if(!$_.capabilities.fixedPosition) {
      return
    }
    $_(document.body).append('<div id=topleft-fixed style=position:fixed;top:100px;left:100px></div>')
    var div = document.body.$_.lastChild()
    var initialTL = div.topLeft(), afterScrollTL
    expect(initialTL.left).toEqual(100)
    // When it comes to scrolling and rendering fixed elements, older
    // OS's have some huge crazy to mad issues. Various versions were
    // tried. For one version where scrollTo is put under a 0 timeout
    // handler, things work for android; but again not on others e.g.
    // iOS, winphone, opera os etc. Also, when this 0 timeout version
    // is put under runs() and waitsFor() blocks of Jasmine, things do
    // not work.
    window.scrollTo(0, 100)
    var afterScrollTL = div.topLeft()
    expect(afterScrollTL.left).toEqual(initialTL.left)
    expect(afterScrollTL.top-initialTL.top).toEqual(100)
    window.scrollTo(0, 200)
    afterScrollTL = div.topLeft()
    expect(afterScrollTL.left).toEqual(initialTL.left)
    expect(afterScrollTL.top-initialTL.top).toEqual(200)
    window.scrollTo(0, 400)
    afterScrollTL = div.topLeft()
    expect(afterScrollTL.left).toEqual(initialTL.left)
    expect(afterScrollTL.top-initialTL.top).toEqual(400)
    window.scrollTo(0, 600)
    afterScrollTL = div.topLeft()
    expect(afterScrollTL.left).toEqual(initialTL.left)
    expect(afterScrollTL.top-initialTL.top).toEqual(600)
    window.scrollTo(0, 800)
    afterScrollTL = div.topLeft()
    expect(afterScrollTL.left).toEqual(initialTL.left)
    expect(afterScrollTL.top-initialTL.top).toEqual(800)
    div.element.parentNode.removeChild(div.element)
    window.scrollTo(0, 0)
  })

})

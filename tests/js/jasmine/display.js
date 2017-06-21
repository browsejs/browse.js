describe('hide', function() {

  it('should hide a given element', function() {
    var el = $_(document.body).append('<div></div>').lastChild()
    el.hide()
    expect(el.element.offsetWidth).toEqual(0)
    expect(el.element.style.$_savedDisplay).toEqual('block')
    el.element.parentNode.removeChild(el.element)
  })

  it('should silently do nothing for an element with inline none display', function() {
    var el = $_(document.body).append('<div style=display:none></div>').lastChild()
    expect(el.element.offsetWidth).toEqual(0)
    el.hide()
    expect(el.element.offsetWidth).toEqual(0)
    el.element.parentNode.removeChild(el.element)
  })

  it('should silently do nothing for an element hidden already', function() {
    var el = $_(document.body).append('<div></div>').lastChild()
    el.hide()
    expect(el.element.offsetWidth).toEqual(0)
    expect(el.element.style.$_savedDisplay).toEqual('block')
    el.hide()
    expect(el.element.offsetWidth).toEqual(0)
    expect(el.element.style.$_savedDisplay).toEqual('block')
    el.element.parentNode.removeChild(el.element)
  })

})

describe('show', function() {

  it('should show a hidden element', function() {
    var el = $_(document.body).append('<div style=display:none></div>').lastChild()
    el.show()
    expect(el.element.offsetWidth).not.toEqual(0)
    el.element.parentNode.removeChild(el.element)
  })

  it('should show a element hidden using a css class', function() {
    var el = $_(document.body).append('<div class=hidden></div>').lastChild()
    expect(el.element.offsetWidth).toEqual(0)
    el.show()
    expect(el.element.offsetWidth).not.toEqual(0)
    el.element.parentNode.removeChild(el.element)
  })

  it('should silently do nothing for an element with implicit non-none display', function() {
    var el = $_(document.body).append('<div></div>').lastChild()
    var width = el.element.offsetWidth
    el.show()
    expect(el.element.offsetWidth).not.toEqual(0)
    expect(el.element.offsetWidth).toEqual(width)
    el.element.parentNode.removeChild(el.element)
  })

  it('should silently do nothing for an element already shown', function() {
    var el = $_(document.body).append('<div style=display:none></div>').lastChild()
    el.show()
    expect(el.element.offsetWidth).not.toEqual(0)
    el.show()
    expect(el.element.offsetWidth).not.toEqual(0)
    el.element.parentNode.removeChild(el.element)
  })

  it('should show after hiding', function() {
    var el = $_(document.body).append('<div></div>').lastChild()
    var width = el.element.offsetWidth
    el.hide().show()
    expect(width).not.toEqual(0)
    expect(el.element.offsetWidth).toEqual(width)
    expect(el.element.style.$_savedDisplay).toEqual('block')
    el.element.parentNode.removeChild(el.element)
  })

})

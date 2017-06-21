describe('innerWidth', function() {

  it('should return 0 for a div with 0 width specified', function() {
    var elem = $_(document.body).append('<div style=width:0></div>').lastChild()
    expect(elem.innerWidth()).toEqual(0)
    elem.element.parentNode.removeChild(elem.element)
  })

  it('should return a value identical to "width()" for an element with no overflow', function() {
    var elem = $_(document.body).append('<div style=width:40px;overflow:none></div>').lastChild()
    expect(elem.width()).toEqual(40)
    expect(elem.innerWidth()).toEqual(elem.width())
    elem.element.parentNode.removeChild(elem.element)
  })

  it('should return a value greater than "width()" for an element with overflow', function() {
    var elem = $_(document.body).append('<div style=max-width:30px;width:30px;overflow-x:scroll>xxxxxxxxxxxxxxxxxxxxxxxxxx</div>').lastChild()
    expect(elem.width()).toEqual(30)
    expect(elem.innerWidth()).toBeGreaterThan(elem.width())
    elem.element.parentNode.removeChild(elem.element)
  })

})

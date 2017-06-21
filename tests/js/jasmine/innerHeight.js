describe('innerHeight', function() {

  it('should return 0 for a div with no height specified', function() {
    var elem = $_(document.body).append('<div></div>').lastChild()
    expect(elem.innerHeight()).toEqual(0)
    elem.element.parentNode.removeChild(elem.element)
  })

  it('should return a value identical to "height()" for an element with no overflow', function() {
    var elem = $_(document.body).append('<div style=line-height:40px;height:40px>x</div>').lastChild()
    expect(elem.height()).toEqual(40)
    expect(elem.innerHeight()).toEqual(elem.height())
    elem.element.parentNode.removeChild(elem.element)
  })

  it('should return a value greater than "height()" for an element with overflow', function() {
    var elem = $_(document.body).append('<div style=max-height:30px;height:30px;overflow:scroll>x<br>x<br>x<br>x<br>x<br>x<br>x<br>x</div>').lastChild()
    expect(elem.height()).toEqual(30)
    expect(elem.innerHeight()).toBeGreaterThan(elem.height())
    elem.element.parentNode.removeChild(elem.element)
  })

})

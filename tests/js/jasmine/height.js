describe('height', function() {

  it('should return 0 for a div with no height specified', function() {
    var elem = $_(document.body).append('<div></div>').lastChild()
    expect(elem.height()).toEqual(0)
    elem.element.parentNode.removeChild(elem.element)
  })

  it('should return correct height for an element with css height', function() {
    var elem = $_(document.body).append('<div style=height:20px></div>').lastChild()
    expect(elem.height()).toEqual(20)
    elem.element.parentNode.removeChild(elem.element)
  })

  it('should return correct height for an element with height attribute', function(){
    var elem = $_(document.body).append('<iframe frameborder=0 height=40>').lastChild()
    expect(elem.height()).toEqual(40)
    elem.element.parentNode.removeChild(elem.element)
  })

  it('should return correct height for an element with css padding and height', function() {
    var elem = $_(document.body).append('<div style=height:20px;padding:4px></div>').lastChild()
    expect(elem.height()).toEqual(28)
    elem.element.parentNode.removeChild(elem.element)
  })

  it('should return correct height for an element with css border and height', function() {
    var elem = $_(document.body).append('<div style="height:20px;border:solid 1px black"></div>').lastChild()
    expect(elem.height()).toEqual(22)
    elem.element.parentNode.removeChild(elem.element)
  })

  it('should return correct height for an element with css padding, border, and height', function() {
    var elem = $_(document.body).append('<div style="height:20px;padding:4px;border:solid 1px black"></div>').lastChild()
    expect(elem.height()).toEqual(30)
    elem.element.parentNode.removeChild(elem.element)
  })

  it('should not get effected with margins', function() {
    var elem = $_(document.body).append('<div style=height:20px;margin:4px></div>').lastChild()
    expect(elem.height()).toEqual(20)
    elem.element.parentNode.removeChild(elem.element)
  })

  it('should return correct height for an element with border-box box-sizing', function() {
    if(!$_.capabilities.boxSizing) {
      return
    }
    var elem = $_(document.body).append('<div style="height:20px;padding:4px;box-sizing:border-box;border:solid 1px black"></div>').lastChild()
    expect(elem.height()).toEqual(20)
    elem.element.parentNode.removeChild(elem.element)
  })

})

describe('width', function() {

  it('should return 0 for a div with 0px width specified', function() {
    var elem = $_(document.body).append('<div style=width:0px></div>').lastChild()
    expect(elem.width()).toEqual(0)
    elem.element.parentNode.removeChild(elem.element)
  })

  it('should return correct width for an element with css width', function() {
    var elem = $_(document.body).append('<div style=width:20px></div>').lastChild()
    expect(elem.width()).toEqual(20)
    elem.element.parentNode.removeChild(elem.element)
  })

  it('should return correct width for an element with width attribute', function(){
    var elem = $_(document.body).append('<iframe frameborder=0 width=40>').lastChild()
    expect(elem.width()).toEqual(40)
    elem.element.parentNode.removeChild(elem.element)
  })

  it('should return correct width for an element with css padding and width', function() {
    var elem = $_(document.body).append('<div style=width:20px;padding:4px></div>').lastChild()
    expect(elem.width()).toEqual(28)
    elem.element.parentNode.removeChild(elem.element)
  })

  it('should return correct width for an element with css border and width', function() {
    var elem = $_(document.body).append('<div style="width:20px;border:solid 1px black"></div>').lastChild()
    expect(elem.width()).toEqual(22)
    elem.element.parentNode.removeChild(elem.element)
  })

  it('should return correct width for an element with css padding, border, and width', function() {
    var elem = $_(document.body).append('<div style="width:20px;padding:4px;border:solid 1px black"></div>').lastChild()
    expect(elem.width()).toEqual(30)
    elem.element.parentNode.removeChild(elem.element)
  })

  it('should not get effected with margins', function() {
    var elem = $_(document.body).append('<div style=width:20px;margin:4px></div>').lastChild()
    expect(elem.width()).toEqual(20)
    elem.element.parentNode.removeChild(elem.element)
  })

  it('should return correct width for an element with border-box box-sizing', function() {
    if(!$_.capabilities.boxSizing) {
      return
    }
    var elem = $_(document.body).append('<div style="width:20px;padding:4px;box-sizing:border-box;border:solid 1px black"></div>').lastChild()
    expect(elem.width()).toEqual(20)
    elem.element.parentNode.removeChild(elem.element)
  })

})

describe('getClass', function() {

  function id(id) {
    return document.getElementById(id)
  }

  function $rem(elem) {
    elem.element.parentNode.removeChild(elem.element)
  }

  function bapp(html) {
    $_(document.body).append(html)
  }

  function gc(elem) {
    return elem.getClass()
  }

  it('should return empty string if no classes exist', function() {
    expect($_(document.body).getClass()).toEqual('')
  })

  it('should return single class string for a div element with exactly one class', function() {
    bapp('<div class=test-gc id=gc-div></div>')
    var elem = $_(id('gc-div'))
    expect(gc(elem)).toEqual('test-gc')
    $rem(elem)
  })

  it('should return multiple classes string for a div element with multiple classes', function() {
    bapp('<div class="test-gc-1 test-gc-2 test-gc-3" id=gc-div></div>')
    var elem = $_(id('gc-div'))
    expect(gc(elem)).toEqual('test-gc-1 test-gc-2 test-gc-3')
    $rem(elem)
  })

})

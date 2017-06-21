describe('addClass', function() {

  function id(id) {
    return $_(document.getElementById(id))
  }

  function $rem(elem) {
    elem.element.parentNode.removeChild(elem.element)
  }

  function bapp(html) {
    return $_(document.body).append(html)
  }

  function ac(elem, arg) {
    return elem.addClass(arg)
  }

  function hc(elem, arg) {
    return elem.hasClass(arg)
  }

  function gc(elem) {
    return elem.getClass()
  }

  function $body() {
    return $_(document.body)
  }

  var vcnErr = new Error('Expected a valid class name')

  it('should throw error for null class argument', function() {
    expect(function(){ac($body(),null)}).toThrow(vcnErr)
  })

  it('should throw error for empty class argument', function() {
    expect(function(){ac($body(),'')}).toThrow(vcnErr)
  })

  it('should add a new class for a div element with no classes', function() {
    bapp('<div></div>')
    var el = $body().lastChild()
    ac(el,'ac-none-1')
    expect(hc(el,'ac-none-1')).toEqual(true)
    $rem(el)
  })

  it('should add a new class for a div element with existing classes', function() {
    bapp('<div class=ac-exist-1></div>')
    var el = $body().lastChild()
    ac(el,'ac-exist-2')
    expect(hc(el,'ac-exist-1')).toEqual(true)
    expect(hc(el,'ac-exist-2')).toEqual(true)
    $rem(el)
  })

  it('should not add an existing class again for a div element', function() {
    bapp('<div class=ac-already-1></div>')
    var el = $body().lastChild()
    expect(hc(el,'ac-already-1')).toEqual(true)
    ac(el,'ac-already-1')
    expect(gc(el)).toEqual('ac-already-1')
    $rem(el)
  })

  it('should throw error for class arguments with trailing or beginning space for a div element', function() {
    bapp('<div></div>')
    var el = $body().lastChild()
    expect(function(){ac(el,'ac-space-1 ')}).toThrow(vcnErr)
    expect(hc(el,'ac-space-1')).toEqual(false)
    expect(function(){ac(el,' ac-space-2')}).toThrow(vcnErr)
    expect(hc(el,'ac-space-2')).toEqual(false)
    expect(function(){ac(el,' ac-space-3 ')}).toThrow(vcnErr)
    expect(hc(el,'ac-space-3')).toEqual(false)
    $rem(el)
  })

  it('should throw error for class arguments with spaces in between for a div element', function() {
    bapp('<div></div>')
    var el = $body().lastChild()
    expect(function(){ac(el,'ac-within-1 ac-within-2')}).toThrow(vcnErr)
    expect(hc(el,'ac-within-1')).toEqual(false)
    expect(hc(el,'ac-within-2')).toEqual(false)
    $rem(el)
  })

})

describe('removeClass', function() {

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

  function rc(elem, arg) {
    return elem.removeClass(arg)
  }

  function $body() {
    return $_(document.body)
  }

  var vcnErr = new Error('Expected a valid class name')

  it('should throw error for null argument for a div element with a class', function() {
    bapp('<div class=rc-null></div>')
    var el = $body().lastChild()
    expect(function(){rc(el,null)}).toThrow(vcnErr)
    expect(hc(el,'rc-null')).toBe(true)
    $rem(el)
  })

  it('should throw error for empty argument for a div element with a class', function() {
    bapp('<div class=rc-empty></div>')
    var el = $body().lastChild()
    expect(function(){rc(el,'')}).toThrow(vcnErr)
    expect(hc(el,'rc-empty')).toBe(true)
    $rem(el)
  })

  it('should remove nothing for a valid argument for a div element with no classes', function() {
    bapp('<div></div>')
    var el = $body().lastChild()
    rc(el,'rc-none-1')
    expect(gc(el)).toEqual('')
    $rem(el)
  })

  it('should remove nothing for valid but non-existing class argument for a div element with a class', function() {
    bapp('<div class=rc-exist-1></div>')
    var el = $body().lastChild()
    rc(el,'rc-exist-2')
    expect(hc(el,'rc-exist-1')).toEqual(true)
    ac(el,'rc-exist-2')
    rc(el,'rc-exist-4')
    expect(hc(el,'rc-exist-1')).toEqual(true)
    expect(hc(el,'rc-exist-2')).toEqual(true)
    $rem(el)
  })

  it('should remove single existing class of a div element', function() {
    bapp('<div class=rc-single-1></div>')
    var el = $body().lastChild()
    expect(hc(el,'rc-single-1')).toEqual(true)
    rc(el,'rc-single-1')
    expect(hc(el,'rc-single-1')).toEqual(false)
    $rem(el)
  })

  it('should remove exisiting argument classes for a div element', function() {
    bapp('<div class="rc-1 rc-2 rc-3"></div>')
    var el = $body().lastChild()
    expect(hc(el,'rc-1')).toEqual(true)
    rc(el,'rc-1')
    expect(hc(el,'rc-1')).toEqual(false)
    expect(hc(el,'rc-2')).toEqual(true)
    rc(el,'rc-2')
    expect(hc(el,'rc-2')).toEqual(false)
    expect(hc(el,'rc-3')).toEqual(true)
    rc(el,'rc-3')
    expect(hc(el,'rc-3')).toEqual(false)
    $rem(el)
  })

  it('should throw error for class names with trailing or beginning space for a div element', function() {
    bapp('<div class=rc-space-1></div>')
    var el = $body().lastChild()
    expect(function(){rc(el,'rc-space-1 ')}).toThrow(vcnErr)
    expect(hc(el,'rc-space-1')).toEqual(true)
    expect(function(){rc(el,' rc-space-1')}).toThrow(vcnErr)
    expect(hc(el,'rc-space-1')).toEqual(true)
    expect(function(){rc(el,' rc-space-1 ')}).toThrow(vcnErr)
    expect(hc(el,'rc-space-1')).toEqual(true)
    ac(ac(el,'rc-space-2'),'rc-space-3')
    expect(function(){rc(el,'rc-space-2 ')}).toThrow(vcnErr)
    expect(hc(el,'rc-space-2')).toEqual(true)
    expect(function(){rc(el,' rc-space-2')}).toThrow(vcnErr)
    expect(hc(el,'rc-space-2')).toEqual(true)
    expect(function(){rc(el,' rc-space-2 ')}).toThrow(vcnErr)
    expect(hc(el,'rc-space-2')).toEqual(true)
    expect(function(){rc(el,'rc-space-3 ')}).toThrow(vcnErr)
    expect(hc(el,'rc-space-3')).toEqual(true)
    expect(function(){rc(el,' rc-space-3')}).toThrow(vcnErr)
    expect(hc(el,'rc-space-3')).toEqual(true)
    expect(function(){rc(el,' rc-space-3 ')}).toThrow(vcnErr)
    expect(hc(el,'rc-space-3')).toEqual(true)
    $rem(el)
  })

  it('should throw error for class names with spaces in between for a div element', function() {
    bapp('<div class="rc-within-1 rc-within-2"></div>')
    var el = $body().lastChild()
    expect(function(){rc(el,'rc-within-1 rc-within-2')}).toThrow(vcnErr)
    expect(hc(el,'rc-within-1')).toEqual(true)
    expect(hc(el,'rc-within-2')).toEqual(true)
    expect(function(){rc(el,'c-within-1 rc-within')}).toThrow(vcnErr)
    expect(hc(el,'rc-within-1')).toEqual(true)
    expect(hc(el,'rc-within-2')).toEqual(true)
    $rem(el)
  })

})

describe('hasClass', function() {

  function id(id) {
    return $_(document.getElementById(id))
  }

  function $rem(elem) {
    elem.element.parentNode.removeChild(elem.element)
  }

  function bapp(html) {
    return $_(document.body).append(html)
  }

  function hc(elem, arg) {
    return elem.hasClass(arg)
  }

  function $body() {
    return $_(document.body)
  }

  var vcnErr = new Error('Expected a valid class name')

  it('should throw error for null class argument for element with no classes', function() {
    expect(function(){hc($body(),null)}).toThrow(vcnErr)
  })

  it('should throw error for empty string class argument for element with no classes', function() {
    expect(function(){hc($body(),'')}).toThrow(vcnErr)
  })

  it('should return false for valid class argument for a div element with no classes', function() {
    expect(hc($body(),'some-class')).toEqual(false)
  })

  it('should throw error for null class argument for a div element with one class', function() {
    bapp('<div class=hc-single></div>')
    var el = $body().lastChild()
    expect(function(){hc(el,null)}).toThrow(vcnErr)
    $rem(el)
  })

  it('should throw error for empty class argument for a div element with one class', function() {
    bapp('<div class=hc-single></div>')
    var el = $body().lastChild()
    expect(function(){hc(el,'')}).toThrow(vcnErr)
    $rem(el)
  })

  it('should return true for existing class argument for a div element with one class', function() {
    bapp('<div class=hc-single></div>')
    var el = $body().lastChild()
    expect(hc(el,'hc-single')).toEqual(true)
    $rem(el)
  })

  it('should return false for class arguments that are substrings of existing classes of a div', function() {
    bapp('<div class="hc-1"></div>')
    var el = $body().lastChild()
    expect(hc(el,'hc')).toEqual(false)
    expect(hc(el,'c')).toEqual(false)
    expect(hc(el,'c-1')).toEqual(false)
    $rem(el)
  })

  it('should return true for existing classes arguments for a div element with multiple classes', function() {
    bapp('<div class="hc-1 hc-2 hc-3"></div>')
    var el = $body().lastChild()
    expect(hc(el,'hc-1')).toEqual(true)
    expect(hc(el,'hc-2')).toEqual(true)
    expect(hc(el,'hc-3')).toEqual(true)
    $rem(el)
  })

  it('should throw error for class arguments with trailing or beginning space for a div element', function() {
    bapp('<div class="hc-1 hc-2 hc-3"></div>')
    var el = $body().lastChild()
    expect(function(){hc(el,' hc-1')}).toThrow(vcnErr)
    expect(function(){hc(el,'hc-1 ')}).toThrow(vcnErr)
    expect(function(){hc(el,' hc-1 ')}).toThrow(vcnErr)
    expect(function(){hc(el,' hc-2')}).toThrow(vcnErr)
    expect(function(){hc(el,'hc-2 ')}).toThrow(vcnErr)
    expect(function(){hc(el,' hc-2 ')}).toThrow(vcnErr)
    expect(function(){hc(el,'hc-3 ')}).toThrow(vcnErr)
    expect(function(){hc(el,' hc-3')}).toThrow(vcnErr)
    expect(function(){hc(el,' hc-3 ')}).toThrow(vcnErr)
    $rem(el)
  })

  it('should throw error for class arguments that are substrings of existing class list with at least one space separating the substrings, for a div element', function() {
    bapp('<div class="hc-1 hc-2 hc-3"></div>')
    var el = $body().lastChild()
    expect(function(){hc(el,'-c-1 hc-2')}).toThrow(vcnErr)
    expect(function(){hc(el,'c-1 hc-2 has')}).toThrow(vcnErr)
    expect(function(){hc(el,'hc-1 hc-2')}).toThrow(vcnErr)
    $rem(el)
  })

})

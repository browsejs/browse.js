describe('browse', function() {

  it('should return null for a non-element node', function() {
    expect($_("String")).toBe(null)
  })

  it('should return a valid browse object for an element', function() {
    var obj = $_(document.body)
    expect(obj).toBeTruthy()
    expect(obj.element).toBeTruthy()
    expect(obj.element.tagName.toLowerCase()).toEqual('body')
  })

  it('should create $_ member', function() {
    var obj = $_(document.body)
    expect(document.body.$_).toBeTruthy()
    expect(document.body.$_.element).toBeTruthy()
    expect(document.body.$_.element).toEqual(document.body)
  })

  it('should return null for a browse wrapper', function() {
    expect($_($_(document.body))).toBeNull()
  })

  it('should not create a new browse object more than once', function() {
    var ch = document.body.childNodes[0]
    while(ch && 1 !== ch.nodeType) ch = ch.nextSibling
    expect(ch).not.toBeNull()
    expect($_(ch)).toEqual($_(ch))
  })

})

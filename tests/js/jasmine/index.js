describe('index', function() {

  var noSupError = new Error('Method not supported on this element')

  it('should throw an error if applied on html element', function() {
    var func = function() { return $_(document.documentElement).index() }
    expect(func).toThrow(noSupError)
  })

  it('should throw an error if applied on body element', function() {
    var func = function() { return $_(document.body).index() }
    expect(func).toThrow(noSupError)
  })

  it('should return 0 for first child obtained through firstChild method', function() {
    expect($_(document.body).firstChild().index()).toEqual(0)
  })

  it('should return 0 for first element child preceded by a text node', function() {
    var pivot = $_(document.body).firstChild()
    var dummy = document.createTextNode("abcdef123")
    document.body.insertBefore(dummy, pivot.element.nextSibling)
    expect(pivot.index()).toEqual(0)
    dummy.parentNode.removeChild(dummy)
  })

  it('should return 0 for first element child preceded by a comment node', function() {
    var pivot = $_(document.body).firstChild()
    var dummy = document.createComment("abcdef123")
    document.body.insertBefore(dummy, pivot.element.nextSibling)
    expect(pivot.index()).toEqual(0)
    dummy.parentNode.removeChild(dummy)
  })

  it('should return 0 for first element child preceded by multiple non-element siblings', function() {
    var pivot = $_(document.body).firstChild()
    var dummy1 = document.createComment("abcdef123")
    document.body.insertBefore(dummy1, pivot.element.nextSibling)
    var dummy2 = document.createTextNode("abcdef123")
    document.body.insertBefore(dummy2, pivot.element.nextSibling)
    var dummy3 = document.createComment("abcdef123")
    document.body.insertBefore(dummy3, pivot.element.nextSibling)
    var dummy4 = document.createTextNode("abcdef123")
    document.body.insertBefore(dummy4, pivot.element.nextSibling)
    expect(pivot.index()).toEqual(0)
    dummy1.parentNode.removeChild(dummy1)
    dummy2.parentNode.removeChild(dummy2)
    dummy3.parentNode.removeChild(dummy3)
    dummy4.parentNode.removeChild(dummy4)
  })

  it('should return 1 for second element child preceded by one element and non-element siblings', function() {
    var pivot = $_(document.body).firstChild()
    var dummy1 = document.createComment("abcdef123")
    document.body.insertBefore(dummy1, pivot.element)
    var dummy2 = document.createTextNode("abcdef123")
    document.body.insertBefore(dummy2, pivot.element)
    var dummy0 = document.createElement('div')
    document.body.insertBefore(dummy0, pivot.element)
    var dummy3 = document.createComment("abcdef123")
    document.body.insertBefore(dummy3, pivot.element)
    var dummy4 = document.createTextNode("abcdef123")
    document.body.insertBefore(dummy4, pivot.element)
    expect(pivot.index()).toEqual(1)
    dummy0.parentNode.removeChild(dummy0)
    dummy1.parentNode.removeChild(dummy1)
    dummy2.parentNode.removeChild(dummy2)
    dummy3.parentNode.removeChild(dummy3)
    dummy4.parentNode.removeChild(dummy4)
  })

  it('should return a valid value for last element child', function() {
    var pivot = $_(document.body).lastChild()
    var child = document.body.firstChild
    var index = 0
    while(child !== pivot.element) {
      if(Node.ELEMENT_NODE === child.nodeType) {
        ++index
      }
      child = child.nextSibling
    }
    expect(pivot.index()).toEqual(index)
  })

})

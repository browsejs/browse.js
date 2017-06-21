describe('next', function() {

  it('should return null in case of no siblings', function() {
    expect($_(document.body).next).toEqual(jasmine.any(Function))
    expect($_(document.body).next()).toBeNull()
  })

  it('should return null for a last child', function() {
    expect($_(document.body).lastChild().next()).toBeNull()
  })

  it('should return expected next element sibling', function() {
    var pivot = $_(document.body).firstChild()
    var next = pivot.next()
    expect(next).toBeDefined()
    expect(next).not.toBeNull()
    var expectedNext = pivot.element.nextSibling
    while (expectedNext && Node.ELEMENT_NODE !== expectedNext.nodeType) {
      expectedNext = expectedNext.nextSibling
    }
    expect(next.element).toEqual(expectedNext)
  })

  it('should return expected next element sibling with a text node sibling in between', function() {
    var pivot = $_(document.body).firstChild()
    var dummy = document.createTextNode("abcdef123")
    document.body.insertBefore(dummy, pivot.element.nextSibling)
    var next = pivot.next()
    expect(next).toBeDefined()
    expect(next).not.toBeNull()
    var expectedNext = pivot.element.nextSibling
    while (expectedNext && Node.ELEMENT_NODE !== expectedNext.nodeType) {
      expectedNext = expectedNext.nextSibling
    }
    expect(next.element).toEqual(expectedNext)
    dummy.parentNode.removeChild(dummy)
  })

  it('should return expected next element sibling with a comment node sibling in between', function() {
    var pivot = $_(document.body).firstChild()
    var dummy = document.createComment("abcdef123")
    document.body.insertBefore(dummy, pivot.element.nextSibling)
    var next = pivot.next()
    expect(next).toBeDefined()
    expect(next).not.toBeNull()
    var expectedNext = pivot.element.nextSibling
    while (expectedNext && Node.ELEMENT_NODE !== expectedNext.nodeType) {
      expectedNext = expectedNext.nextSibling
    }
    expect(next.element).toEqual(expectedNext)
    dummy.parentNode.removeChild(dummy)
  })

  it('should return expected next element sibling with multiple non-element siblings in between', function() {
    var pivot = $_(document.body).firstChild()
    var dummy1 = document.createComment("abcdef123")
    document.body.insertBefore(dummy1, pivot.element.nextSibling)
    var dummy2 = document.createTextNode("abcdef123")
    document.body.insertBefore(dummy2, pivot.element.nextSibling)
    var dummy3 = document.createComment("abcdef123")
    document.body.insertBefore(dummy3, pivot.element.nextSibling)
    var dummy4 = document.createTextNode("abcdef123")
    document.body.insertBefore(dummy4, pivot.element.nextSibling)
    var next = pivot.next()
    expect(next).toBeDefined()
    expect(next).not.toBeNull()
    var expectedNext = pivot.element.nextSibling
    while (expectedNext && Node.ELEMENT_NODE !== expectedNext.nodeType) {
      expectedNext = expectedNext.nextSibling
    }
    expect(next.element).toEqual(expectedNext)
    dummy1.parentNode.removeChild(dummy1)
    dummy2.parentNode.removeChild(dummy2)
    dummy3.parentNode.removeChild(dummy3)
    dummy4.parentNode.removeChild(dummy4)
  })

})

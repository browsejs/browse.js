describe('previous', function() {

  it('should return null in case of no siblings', function() {
    expect(typeof($_(document.documentElement).previous)).toEqual('function')
    expect($_(document.documentElement).previous()).toBeNull()
  })

  it('should return null for a first child', function() {
    expect($_(document.body).firstChild().previous()).toBeNull()
  })

  it('should return expected previous element sibling', function() {
    var pivot = $_(document.body).lastChild()
    var previous = pivot.previous()
    expect(previous).toBeDefined()
    expect(previous).not.toBeNull()
    var expectedPrevious = pivot.element.previousSibling
    while (expectedPrevious && Node.ELEMENT_NODE !== expectedPrevious.nodeType) {
      expectedPrevious = expectedPrevious.previousSibling
    }
    expect(previous.element).toEqual(expectedPrevious)
  })

  it('should return expected previous element sibling with a text node sibling in between', function() {
    var pivot = $_(document.body).lastChild()
    var dummy = document.createTextNode("abcdef123")
    document.body.insertBefore(dummy, pivot.element)
    var previous = pivot.previous()
    expect(previous).toBeDefined()
    expect(previous).not.toBeNull()
    var expectedPrevious = pivot.element.previousSibling
    while (expectedPrevious && Node.ELEMENT_NODE !== expectedPrevious.nodeType) {
      expectedPrevious = expectedPrevious.previousSibling
    }
    expect(previous.element).toEqual(expectedPrevious)
    dummy.parentNode.removeChild(dummy)
  })

  it('should return expected previous element sibling with a comment node sibling in between', function() {
    var pivot = $_(document.body).lastChild()
    var dummy = document.createComment("abcdef123")
    document.body.insertBefore(dummy, pivot.element)
    var previous = pivot.previous()
    expect(previous).toBeDefined()
    expect(previous).not.toBeNull()
    var expectedPrevious = pivot.element.previousSibling
    while (expectedPrevious && Node.ELEMENT_NODE !== expectedPrevious.nodeType) {
      expectedPrevious = expectedPrevious.previousSibling
    }
    expect(previous.element).toEqual(expectedPrevious)
    dummy.parentNode.removeChild(dummy)
  })

  it('should return expected previous element sibling with multiple non-element siblings in between', function() {
    var pivot = $_(document.body).lastChild()
    var dummy1 = document.createComment("abcdef123")
    document.body.insertBefore(dummy1, pivot.element)
    var dummy2 = document.createTextNode("abcdef123")
    document.body.insertBefore(dummy2, pivot.element)
    var dummy3 = document.createComment("abcdef123")
    document.body.insertBefore(dummy3, pivot.element)
    var dummy4 = document.createTextNode("abcdef123")
    document.body.insertBefore(dummy4, pivot.element)
    var previous = pivot.previous()
    expect(previous).toBeDefined()
    expect(previous).not.toBeNull()
    var expectedPrevious = pivot.element.previousSibling
    while (expectedPrevious && Node.ELEMENT_NODE !== expectedPrevious.nodeType) {
      expectedPrevious = expectedPrevious.previousSibling
    }
    expect(previous.element).toEqual(expectedPrevious)
    dummy1.parentNode.removeChild(dummy1)
    dummy2.parentNode.removeChild(dummy2)
    dummy3.parentNode.removeChild(dummy3)
    dummy4.parentNode.removeChild(dummy4)
  })
})

describe('lastChild', function() {

  it('should return null in case there is no child', function() {
    var scriptNode = document.getElementsByTagName('script')[0]
    expect(scriptNode).not.toBeNull()
    expect(typeof($_(scriptNode).lastChild)).toEqual('function')
    expect($_(scriptNode).lastChild()).toBeNull()
  })

  it('should return the expected last element child', function() {
    var lastChild = $_(document.body).lastChild()
    expect(lastChild).not.toBeNull()
    expect(lastChild.element).toBeDefined()
    var numChildren = document.body.childNodes.length
    var expectedLastChild = document.body.childNodes[numChildren - 1]
    while (expectedLastChild && Node.ELEMENT_NODE !== expectedLastChild.nodeType) {
      expectedLastChild = expectedLastChild.previousSibling
    }
    expect(lastChild.element).toEqual(expectedLastChild)
  })

  it('should return the expected last element child followed by a text node', function() {
    var dummy = document.createTextNode("abcdef123")
    document.body.appendChild(dummy)
    var lastChild = $_(document.body).lastChild()
    expect(lastChild).not.toBeNull()
    expect(lastChild.element).toBeDefined()
    var numChildren = document.body.childNodes.length
    var expectedLastChild = document.body.childNodes[numChildren - 1]
    while (expectedLastChild && Node.ELEMENT_NODE !== expectedLastChild.nodeType) {
      expectedLastChild = expectedLastChild.previousSibling
    }
    expect(lastChild.element).toEqual(expectedLastChild)
    dummy.parentNode.removeChild(dummy)
  })

  it('should return the expected last element child followed by a comment node', function() {
    var dummy = document.createComment("abcdef123")
    document.body.appendChild(dummy)
    var lastChild = $_(document.body).lastChild()
    expect(lastChild).not.toBeNull()
    expect(lastChild.element).toBeDefined()
    var numChildren = document.body.childNodes.length
    var expectedLastChild = document.body.childNodes[numChildren - 1]
    while (expectedLastChild && Node.ELEMENT_NODE !== expectedLastChild.nodeType) {
      expectedLastChild = expectedLastChild.previousSibling
    }
    expect(lastChild.element).toEqual(expectedLastChild)
    dummy.parentNode.removeChild(dummy)
  })

  it('should return the expected last element child followed by multiple non-element nodes', function() {
    var dummy1 = document.createComment("abcdef123")
    document.body.appendChild(dummy1)
    var dummy2 = document.createTextNode("abcdef123")
    document.body.appendChild(dummy2)
    var dummy3 = document.createComment("abcdef123")
    document.body.appendChild(dummy3)
    var dummy4 = document.createTextNode("abcdef123")
    document.body.appendChild(dummy4)
    var lastChild = $_(document.body).lastChild()
    expect(lastChild).not.toBeNull()
    expect(lastChild.element).toBeDefined()
    var numChildren = document.body.childNodes.length
    var expectedLastChild = document.body.childNodes[numChildren - 1]
    while (expectedLastChild && Node.ELEMENT_NODE !== expectedLastChild.nodeType) {
      expectedLastChild = expectedLastChild.previousSibling
    }
    expect(lastChild.element).toEqual(expectedLastChild)
    dummy1.parentNode.removeChild(dummy1)
    dummy2.parentNode.removeChild(dummy2)
    dummy3.parentNode.removeChild(dummy3)
    dummy4.parentNode.removeChild(dummy4)
  })

})

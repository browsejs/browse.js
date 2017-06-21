describe('firstChild', function() {

  it('should return null in case there is no child', function() {
    var scriptNode = document.getElementsByTagName('script')[0]
    expect(scriptNode).not.toBeNull()
    expect($_(scriptNode).firstChild).toEqual(jasmine.any(Function))
    expect(scriptNode.$_.firstChild()).toBeNull()
  })

  it('should return the expected first element child', function() {
    var firstChild = $_(document.body).firstChild()
    expect(firstChild).not.toBeNull()
    expect(firstChild.element).toBeDefined()
    var expectedFirstChild = document.body.childNodes[0]
    while (expectedFirstChild && Node.ELEMENT_NODE !== expectedFirstChild.nodeType) {
      expectedFirstChild = expectedFirstChild.nextSibling
    }
    expect(firstChild.element).toEqual(expectedFirstChild)
  })

  it('should return the expected first element child preceded by a text node', function() {
    var dummy = document.createTextNode("abcdef123")
    document.body.insertBefore(dummy, document.body.childNodes[0])
    var firstChild = $_(document.body).firstChild()
    expect(firstChild).not.toBeNull()
    expect(firstChild.element).toBeDefined()
    var expectedFirstChild = document.body.childNodes[0]
    while (expectedFirstChild && Node.ELEMENT_NODE !== expectedFirstChild.nodeType) {
      expectedFirstChild = expectedFirstChild.nextSibling
    }
    expect(firstChild.element).toEqual(expectedFirstChild)
    dummy.parentNode.removeChild(dummy)
  })

  it('should return the expected first element child preceded by a comment node', function() {
    var dummy = document.createComment("abcdef123")
    document.body.insertBefore(dummy, document.body.childNodes[0])
    var firstChild = $_(document.body).firstChild()
    expect(firstChild).not.toBeNull()
    expect(firstChild.element).toBeDefined()
    var expectedFirstChild = document.body.childNodes[0]
    while (expectedFirstChild && Node.ELEMENT_NODE !== expectedFirstChild.nodeType) {
      expectedFirstChild = expectedFirstChild.nextSibling
    }
    expect(firstChild.element).toEqual(expectedFirstChild)
    dummy.parentNode.removeChild(dummy)
  })

  it('should return the expected first element child preceded by multiple non-element nodes', function() {
    var dummy1 = document.createComment("abcdef123")
    document.body.insertBefore(dummy1, document.body.childNodes[0])
    var dummy2 = document.createTextNode("abcdef123")
    document.body.insertBefore(dummy2, document.body.childNodes[0])
    var dummy3 = document.createComment("abcdef123")
    document.body.insertBefore(dummy3, document.body.childNodes[0])
    var dummy4 = document.createTextNode("abcdef123")
    document.body.insertBefore(dummy4, document.body.childNodes[0])
    var firstChild = $_(document.body).firstChild()
    expect(firstChild).not.toBeNull()
    expect(firstChild.element).toBeDefined()
    var expectedFirstChild = document.body.childNodes[0]
    while (expectedFirstChild && Node.ELEMENT_NODE !== expectedFirstChild.nodeType) {
      expectedFirstChild = expectedFirstChild.nextSibling
    }
    expect(firstChild.element).toEqual(expectedFirstChild)
    dummy1.parentNode.removeChild(dummy1)
    dummy2.parentNode.removeChild(dummy2)
    dummy3.parentNode.removeChild(dummy3)
    dummy4.parentNode.removeChild(dummy4)
  })

})

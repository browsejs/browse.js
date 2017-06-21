describe('nthChild', function() {

  it('should return null in case there is no child', function() {
    var scriptNode = document.getElementsByTagName('script')[0]
    expect(scriptNode).not.toBeNull()
    expect($_(scriptNode).nthChild).toEqual(jasmine.any(Function))
    expect(scriptNode.$_.nthChild(0)).toBeNull()
  })

  it('should return the expected first element child', function() {
    var nthChild = $_(document.body).nthChild(0)
    expect(nthChild).not.toBeNull()
    expect(nthChild.element).toBeDefined()
    var expectedFirstChild = document.body.childNodes[0]
    while (expectedFirstChild && Node.ELEMENT_NODE !== expectedFirstChild.nodeType) {
      expectedFirstChild = expectedFirstChild.nextSibling
    }
    expect(nthChild.element).toEqual(expectedFirstChild)
  })

  it('should return the expected first element child preceded by a text node', function() {
    var dummy = document.createTextNode("abcdef123")
    document.body.insertBefore(dummy, document.body.childNodes[0])
    var nthChild = $_(document.body).nthChild(0)
    expect(nthChild).not.toBeNull()
    expect(nthChild.element).toBeDefined()
    var expectedFirstChild = document.body.childNodes[0]
    while (expectedFirstChild && Node.ELEMENT_NODE !== expectedFirstChild.nodeType) {
      expectedFirstChild = expectedFirstChild.nextSibling
    }
    expect(nthChild.element).toEqual(expectedFirstChild)
    dummy.parentNode.removeChild(dummy)
  })

  it('should return the expected first element child preceded by a comment node', function() {
    var dummy = document.createComment("abcdef123")
    document.body.insertBefore(dummy, document.body.childNodes[0])
    var nthChild = $_(document.body).nthChild(0)
    expect(nthChild).not.toBeNull()
    expect(nthChild.element).toBeDefined()
    var expectedFirstChild = document.body.childNodes[0]
    while (expectedFirstChild && Node.ELEMENT_NODE !== expectedFirstChild.nodeType) {
      expectedFirstChild = expectedFirstChild.nextSibling
    }
    expect(nthChild.element).toEqual(expectedFirstChild)
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
    var nthChild = $_(document.body).nthChild(0)
    expect(nthChild).not.toBeNull()
    expect(nthChild.element).toBeDefined()
    var expectedFirstChild = document.body.childNodes[0]
    while (expectedFirstChild && Node.ELEMENT_NODE !== expectedFirstChild.nodeType) {
      expectedFirstChild = expectedFirstChild.nextSibling
    }
    expect(nthChild.element).toEqual(expectedFirstChild)
    dummy1.parentNode.removeChild(dummy1)
    dummy2.parentNode.removeChild(dummy2)
    dummy3.parentNode.removeChild(dummy3)
    dummy4.parentNode.removeChild(dummy4)
  })

  function countChildren(element) {
    var counter = 0, child = element.firstChild
    while(child) {
      if(Node.ELEMENT_NODE === child.nodeType) {
        ++counter
      }
      child = child.nextSibling
    }
    return counter
  }

  function compareLastWithNth() {
    var numChildren = countChildren(document.body),
      nthChild = $_(document.body).nthChild(numChildren - 1),
      lastChild = $_(document.body).lastChild()
    expect(lastChild).not.toBeNull()
    expect(lastChild.element).toBeDefined()
    expect(nthChild).not.toBeNull()
    expect(nthChild.element).toBeDefined()
    expect(lastChild.element).toEqual(nthChild.element)
  }

  it('should return the expected last element child', function() {
    compareLastWithNth()
  })

  it('should return the expected last element child followed by a text node', function() {
    var dummy = document.createTextNode("abcdef123")
    document.body.appendChild(dummy)
    compareLastWithNth()
    dummy.parentNode.removeChild(dummy)
  })

  it('should return the expected last element child followed by a comment node', function() {
    var dummy = document.createComment("abcdef123")
    document.body.appendChild(dummy)
    compareLastWithNth()
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
    compareLastWithNth()
    dummy1.parentNode.removeChild(dummy1)
    dummy2.parentNode.removeChild(dummy2)
    dummy3.parentNode.removeChild(dummy3)
    dummy4.parentNode.removeChild(dummy4)
  })

  it('should return the expected nth child', function() {
    var dummy1 = document.createComment("abcdef123")
    document.body.insertBefore(dummy1, $_(document.body).firstChild().element)
    var dummy2 = document.createTextNode("abcdef123")
    document.body.insertBefore(dummy2, $_(document.body).lastChild().element)
    var dummy3 = document.createComment("abcdef123")
    document.body.insertBefore(dummy3, $_(document.body).firstChild().element)
    var dummy4 = document.createTextNode("abcdef123")
    document.body.insertBefore(dummy4, $_(document.body).lastChild().element)
    var dummy5 = document.createElement('div'),
      dummy6 = document.createElement('div')
    document.body.insertBefore(dummy5, $_(document.body).lastChild().element)
    document.body.insertBefore(dummy6, $_(document.body).lastChild().element)
    var numChildren = countChildren(document.body)
    expect($_(document.body).nthChild(numChildren - 3).element).toEqual(dummy5)
    expect($_(document.body).nthChild(numChildren - 2).element).toEqual(dummy6)
    dummy1.parentNode.removeChild(dummy1)
    dummy2.parentNode.removeChild(dummy2)
    dummy3.parentNode.removeChild(dummy3)
    dummy4.parentNode.removeChild(dummy4)
    dummy5.parentNode.removeChild(dummy5)
    dummy6.parentNode.removeChild(dummy6)
  })

})

describe('append', function() {

  function id(id) {
    return $_(document.getElementById(id))
  }

  function $rem(elem) {
    elem.element.parentNode.removeChild(elem.element)
  }

  function bapp(html) {
    return $_(document.body).append(html)
  }

  function $body() {
    return $_(document.body)
  }

  it('should create a new p element as last child of body', function() {
    var lastChild = $body().lastChild()
    bapp('<p id=apnd-end-abc>xyz</p>')
    var e1 = id('apnd-end-abc')
    expect(e1).not.toBeNull()
    expect($body().lastChild()).not.toEqual(lastChild)
    expect($body().lastChild()).toEqual(e1)
    expect(lastChild.next()).toEqual(e1)
    expect(e1.next()).toBeNull()
    $rem(e1)
  })

  it('should create new elements in given order inside body', function() {
    var lastChild = $body().lastChild()
    bapp('<p id=apnd-order-abc>xyz</p><div id=apnd-order-def></div><img id=apnd-order-ghi>')
    var e1 = id('apnd-order-abc'),
      e2 = id('apnd-order-def'),
      e3 = id('apnd-order-ghi')
    expect(e1).not.toBeNull()
    expect(e2).not.toBeNull()
    expect(e3).not.toBeNull()
    expect(lastChild.next()).toEqual(e1)
    expect(e1.next()).toEqual(e2)
    expect(e2.next()).toEqual(e3)
    expect(e3.next()).toBeNull()
    expect($body().lastChild()).toEqual(e3)
    $rem(e1)
    $rem(e2)
    $rem(e3)
  })

  it('should create new elements inside an empty div element', function() {
    var divs = document.getElementsByTagName('div'),
      empty = null
    for (var i = 0; i < divs.length; ++i) {
      if (!divs[i].childNodes.length) {
        empty = $_(divs[i])
        break
      }
    }
    expect(empty).not.toBeNull()
    empty.append('<p id=apnd-empty-abc>xyz</p><div id=apnd-empty-def></div><img id=apnd-empty-ghi>')
    var e1 = id('apnd-empty-abc'),
      e2 = id('apnd-empty-def'),
      e3 = id('apnd-empty-ghi')
    expect(e1).not.toBeNull()
    expect(e2).not.toBeNull()
    expect(e3).not.toBeNull()
    expect(empty.firstChild()).toEqual(e1)
    expect(e1.next()).toEqual(e2)
    expect(empty.lastChild()).toEqual(e3)
    $rem(e1)
    $rem(e2)
    $rem(e3)
  })

  it('should create new elements inside an non-empty div element', function() {
    var divs = document.getElementsByTagName('div'),
      notEmpty = null
    for (var i = 0; i < divs.length; ++i) {
      if (divs[i].childNodes.length) {
        notEmpty = $_(divs[i])
        break
      }
    }
    expect(notEmpty).not.toBeNull()
    var lastChild = notEmpty.lastChild()
    notEmpty.append('<p id=apnd-notEmpty-abc>xyz</p><div id=apnd-notEmpty-def></div><img id=apnd-notEmpty-ghi>')
    var e1 = id('apnd-notEmpty-abc'),
      e2 = id('apnd-notEmpty-def'),
      e3 = id('apnd-notEmpty-ghi')
    expect(e1).not.toBeNull()
    expect(e2).not.toBeNull()
    expect(e3).not.toBeNull()
    expect(lastChild.next()).toEqual(e1)
    expect(e1.next()).toEqual(e2)
    expect(notEmpty.lastChild()).toEqual(e3)
    $rem(e1)
    $rem(e2)
    $rem(e3)
  })

  it('should be able to create comments', function() {
    var last = $body().lastChild()
    bapp('<!-- a comment -->')
    expect($body().lastChild()).toEqual(last)
  })

  it('should be able to create text nodes', function() {
    var last = $body().lastChild()
    bapp(' some text ')
    expect($body().lastChild()).toEqual(last)
  })

})

describe('after', function() {

  it('should not allow creating elements after html and body', function() {
    $_(document.body).after('<div id=after-body>xyz</div>')
    expect(document.getElementById('after-body')).toBeNull()
    $_(document.documentElement).after('<div id=after-html>xyz</div>')
    expect(document.getElementById('after-html')).toBeNull()
  })

  it('should create elements in given order', function() {
    var div = document.getElementsByTagName('div')[0]
    $_(div).after('<div id=after-order-div></div><p id=after-order-p></p><ul id=after-order-ul></ul>')
    var e1 = document.getElementById('after-order-div'),
      e2 = document.getElementById('after-order-p'),
      e3 = document.getElementById('after-order-ul')
    expect(e1).not.toBeNull()
    expect(e2).not.toBeNull()
    expect(e3).not.toBeNull()
    expect(div.$_.next().element).toEqual(e1)
    expect(e1.$_.next().element).toEqual(e2)
    expect(e2.$_.next().element).toEqual(e3)
    e1.parentNode.removeChild(e1)
    e2.parentNode.removeChild(e2)
    e3.parentNode.removeChild(e3)
  })

  it('should create elements after a last child', function() {
    var last = $_(document.body).lastChild()
    last.after('<div id=after-last-div></div><p id=after-last-p></p>')
    var e1 = document.getElementById('after-last-div'),
      e2 = document.getElementById('after-last-p')
    expect(e1).not.toBeNull()
    expect(e2).not.toBeNull()
    expect(document.body.$_.lastChild()).not.toEqual(last)
    expect(last.next().element).toEqual(e1)
    expect(e1.$_.next().element).toEqual(e2)
    expect(document.body.$_.lastChild()).toEqual(e2.$_)
    e1.parentNode.removeChild(e1)
    e2.parentNode.removeChild(e2)
  })

})

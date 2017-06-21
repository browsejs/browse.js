describe('remove', function() {

  it('should remove the element', function() {
    var elem = $_(document.body).append('<div id=remove-test></div>').lastChild()
    elem.remove()
    expect(document.getElementById('remove-test')).toBeNull()
  })

  it('should throw error for an already removed element', function() {
    var elem = $_(document.body).append('<div id=remove-test></div>').lastChild()
    elem.remove()
    expect(document.getElementById('remove-test')).toBeNull()
    try {
      elem.remove()
      expect('should not have come here').toEqual('')
    }
    catch(e) {
      expect(e.message).toBeDefined()
      expect(e.message).not.toBeNull()
      expect(e.message).toNotEqual('')
    }
  })

})

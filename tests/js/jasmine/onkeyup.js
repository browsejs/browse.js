describe('onkeyup', function() {

  it('should attach a handler that gets called on triggering keyup on an element', function() {
    var text = $_(document.body).append('<input type=text>').lastChild()
    var spy = {
      callback: function(e) {
      }
    }
    spyOn(spy, 'callback').andCallThrough()
    text.onkeyup(spy.callback)
    text.trigger('keyup')
    expect(spy.callback).toHaveBeenCalled()
    text.element.parentNode.removeChild(text.element)
  })

  it('should attach a handler that receives event with params specified in triggering keyup on an element', function() {
    var text = $_(document.body).append('<input type=text>').lastChild()
    var spy = {
      callback: function(e) {
        expect(e.keyCode||e.which).toEqual(2)
        expect(e.shiftKey).toEqual(true)
        expect(e.location).toEqual(1)
        expect(e.view).toNotEqual('xyz')
      }
    }
    spyOn(spy, 'callback').andCallThrough()
    text.onkeyup(spy.callback)
    text.trigger('keyup', { keyCode: 2, shiftKey: true, location: 1, view: 'xyz' })
    expect(spy.callback).toHaveBeenCalled()
    text.element.parentNode.removeChild(text.element)
  })

  it('should attach a handler that gets called on triggering keyup on document', function() {
    var spy = {
      callback: function(e) {
      }
    }
    spyOn(spy, 'callback').andCallThrough()
    $_.onkeyup(spy.callback)
    $_.trigger('keyup')
    expect(spy.callback).toHaveBeenCalled()
  })

  it('should attach a handler that receives event with params specified in triggering keyup on document', function() {
    var spy = {
      callback: function(e) {
        expect(e.keyCode||e.which).toEqual(2)
        expect(e.shiftKey).toEqual(true)
        expect(e.location).toEqual(1)
        expect(e.view).toNotEqual('xyz')
      }
    }
    spyOn(spy, 'callback').andCallThrough()
    $_.onkeyup(spy.callback)
    $_.trigger('keyup', { keyCode: 2, shiftKey: true, location: 1, view: 'xyz' })
    expect(spy.callback).toHaveBeenCalled()
  })

})

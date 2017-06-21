describe('onclick', function() {

  it('should attach a handler that gets called on triggering click on an element', function() {
    var button = $_(document.body).append('<input type=submit value=abc>').lastChild()
    var spy = {
      callback: function(e) {
      }
    }
    spyOn(spy, 'callback').andCallThrough()
    button.onclick(spy.callback)
    button.trigger('click')
    expect(spy.callback).toHaveBeenCalled()
    button.element.parentNode.removeChild(button.element)
  })

  it('should attach a handler that receives event with params specified in triggering click on an element', function() {
    var button = $_(document.body).append('<input type=submit value=abc>').lastChild()
    var spy = {
      callback: function(e) {
        expect(e.button).toEqual(1)
        expect(e.ctrlKey).toEqual(true)
        expect(e.metaKey).toEqual(true)
        expect(e.detail).toNotEqual('xyz')
      }
    }
    spyOn(spy, 'callback').andCallThrough()
    button.onclick(spy.callback)
    button.trigger('click', { button: 1, ctrlKey: true, metaKey: true, detail: 'xyz' })
    expect(spy.callback).toHaveBeenCalled()
    button.element.parentNode.removeChild(button.element)
  })

  it('should attach a handler that gets called on triggering click on document', function() {
    var spy = {
      callback: function(e) {
      }
    }
    spyOn(spy, 'callback').andCallThrough()
    $_.onclick(spy.callback)
    $_.trigger('click')
    expect(spy.callback).toHaveBeenCalled()
  })

  it('should attach a handler that receives event with params specified in triggering click on document', function() {
    var spy = {
      callback: function(e) {
        expect(e.button).toEqual(1)
        expect(e.ctrlKey).toEqual(true)
        expect(e.metaKey).toEqual(true)
        expect(e.detail).toNotEqual('xyz')
      }
    }
    spyOn(spy, 'callback').andCallThrough()
    $_.onclick(spy.callback)
    $_.trigger('click', { button: 1, ctrlKey: true, metaKey: true, detail: 'xyz' })
    expect(spy.callback).toHaveBeenCalled()
  })

})

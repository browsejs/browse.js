describe('onchange', function() {

  it('should attach a handler that gets called on triggering change on an element', function() {
    var text = $_(document.body).append('<input type=text>').lastChild()
    var spy = {
      callback: function(e) {
      }
    }
    spyOn(spy, 'callback').andCallThrough()
    text.onchange(spy.callback)
    text.trigger('change')
    expect(spy.callback).toHaveBeenCalled()
    text.element.parentNode.removeChild(text.element)
  })

  it('should attach a handler that gets called on triggering change on document', function() {
    var spy = {
      callback: function(e) {
      }
    }
    spyOn(spy, 'callback').andCallThrough()
    $_.onchange(spy.callback)
    $_.trigger('change')
    expect(spy.callback).toHaveBeenCalled()
  })

})

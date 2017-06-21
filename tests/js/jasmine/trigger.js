describe('trigger', function() {

  it('should throw an error for unsupported event type triggered on an element', function() {
    expect(function(){$_(document.body).trigger('mousemove')}).toThrow(new Error('Unsupported event mousemove'))
  })

  it('should throw an error for unsupported event type triggered on document', function() {
    expect(function(){$_.trigger('mousemove')}).toThrow(new Error('Unsupported event mousemove'))
  })

})

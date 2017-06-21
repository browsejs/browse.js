describe('opacity', function() {

  describe('get', function() {

    it('should return 1 for default case (no opacity changes made)', function() {
      var el = $_(document.body)
      expect(el.opacity()).toEqual(1.0)
    })

  })

  describe('set', function() {

    it('should throw an error in case of non-float opacity value', function() {
      var el = $_(document.body)
      expect(function(){el.opacity('abc')}).toThrow(new Error('Opacity value must be >= 0 and <= 1'))
      expect(el.opacity()).toEqual(1.0)
    })

    it('should throw an error in case of a value less than 0', function() {
      var el = $_(document.body)
      expect(function(){el.opacity(-2.0)}).toThrow(new Error('Opacity value must be >= 0 and <= 1'))
      expect(el.opacity()).toEqual(1.0)
    })

    it('should throw an error in case of a value greater than 1', function() {
      var el = $_(document.body)
      expect(function(){el.opacity(2.0)}).toThrow(new Error('Opacity value must be >= 0 and <= 1'))
      expect(el.opacity()).toEqual(1.0)
    })

    it('should set and get a valid opacity value', function() {
      var el = $_(document.body)
      expect(el.opacity(0.5).opacity()).toEqual(0.5)
      expect(el.opacity(1.0).opacity()).toEqual(1.0)
      expect(el.opacity(0.5).opacity()).toEqual(0.5)
      expect(el.opacity(1.0).opacity()).toEqual(1.0)
    })

  })

})

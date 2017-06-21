describe('Array', function() {

  it('should have forEach method', function() {
    var array = []
    expect(array.forEach).toBeDefined()
    expect(array.forEach).toEqual(jasmine.any(Function))
  })

  it('should have every method', function() {
    var array = []
    expect(array.every).toBeDefined()
    expect(array.every).toEqual(jasmine.any(Function))
  })

  it('should have indexOf method', function() {
    var array = []
    expect(array.indexOf).toBeDefined()
    expect(array.indexOf).toEqual(jasmine.any(Function))
  })

  it('should have remove method', function() {
    var array = []
    expect(array.remove).toBeDefined()
    expect(array.remove).toEqual(jasmine.any(Function))
  })

  describe('forEach', function() {

    it('must loop through all elements', function() {
      var array = [1, 2, 3]
      array.forEach(function(val, idx, arr) {
        arr[idx] = val + 1
        return 1 // try to break out
      })
      expect(array).toEqual([2, 3, 4])
    })

  })

  describe('every', function() {

    it('should loop through all elements until falsy result', function() {
      var array = [1, 2, 3]
      array.every(function(val, idx, arr) {
        arr[idx] = val + 1
        return arr[idx] % 2 ? false : true
      })
      expect(array).toEqual([2, 3, 3])
    })

  })

  describe('indexOf', function() {

    it('should return correct index of an existing element', function() {
      var array = [1, 2, 2, 3]
      expect(array.indexOf(2)).toEqual(1)
    })

    it('should return -1 for a non-existing element', function() {
      var array = [1, 2, 2, 3]
      expect(array.indexOf(4)).toEqual(-1)
    })

  })

  describe('remove', function() {

    it('should remove last member', function() {
      var array = [1, 2, 4, 2, 3]
      array.remove(3)
      expect(array).toEqual([1, 2, 4, 2])
    })

    if('should remove first member', function() {
      var array = [1, 2, 4, 2]
      array.remove(1)
      expect(array).toEqual([2, 4, 2])
    })

    it('should remove first occurence of a repeated member', function() {
      var array = [2, 4, 2]
      array.remove(2)
      expect(array).toEqual([4, 2])
    })

    it('should remove specified number of members', function() {
      var array = [2, 4, 3]
      array.remove(4, 2)
      expect(array).toEqual([2])
    })

    it('should remove minimum of specified number and existing number of members', function() {
      var array = [2, 4, 3]
      array.remove(4, 10)
      expect(array).toEqual([2])
    })

    it('should retain existing members if asked to remove a non-existing member', function() {
      var array = [2, 4, 3]
      array.remove(5)
      expect(array).toEqual([2, 4, 3])
    })

  })

})

if(window.NodeList) {

  describe('NodeList', function() {

    it('should have forEach method', function() {
      expect(NodeList.prototype.forEach).toBeDefined()
      expect(NodeList.prototype.forEach).toEqual(jasmine.any(Function))
    })

    it('should have every method', function() {
      expect(NodeList.prototype.every).toBeDefined()
      expect(NodeList.prototype.every).toEqual(jasmine.any(Function))
    })
  })

}

if(window.HTMLCollection) {

  describe('HTMLCollection', function() {

    it('should have forEach method', function() {
      expect(HTMLCollection.prototype.forEach).toBeDefined()
      expect(HTMLCollection.prototype.forEach).toEqual(jasmine.any(Function))
    })

    it('should have every method', function() {
      expect(HTMLCollection.prototype.every).toBeDefined()
      expect(HTMLCollection.prototype.every).toEqual(jasmine.any(Function))
    })
  })

}

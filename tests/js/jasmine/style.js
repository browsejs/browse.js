describe('style', function() {

  function checkUnitSupport(unit, prop) {
    var el = $_(document.body).append('<div style=' + prop + ':5' + unit + '></div>').lastChild()
    var val = el.style(prop)
    if('auto' === val || 0 === parseInt(val)) {
      return false
    }
    return true
  }

  describe('get', function() {

    it('should return null if no property is specified', function() {
      expect($_(document.body).style()).toBeNull()
    })

    it('should provide valid existing style properties', function() {
      $_(document.body).append('<div id=test-style style=margin-left:4px;width:8px;border-top-style:solid></div>')
      var last = $_(document.body).lastChild()
      expect(last.style('margin-left')).toEqual('4px')
      expect(last.style('width')).toEqual('8px')
      expect(last.style('border-top-style')).toEqual('solid')
      last.element.parentNode.removeChild(last.element)
    })

    it('should compute ch unit measurements into px', function() {
      if(!checkUnitSupport('ch', 'height')) return
      $_(document.body).append('<div id=test-style style=height:4ch></div>')
      var last = $_(document.body).lastChild()
      var height = last.style('height')
      expect(height).toMatch(/^[\d\.]+px/)
      expect(parseInt(height)).toBeGreaterThan(0)
      last.element.parentNode.removeChild(last.element)
    })

    it('should compute cm unit measurements into px', function() {
      if(!checkUnitSupport('cm', 'height')) return
      $_(document.body).append('<div id=test-style style=height:4cm></div>')
      var last = $_(document.body).lastChild()
      var height = last.style('height')
      expect(height).toMatch(/^[\d\.]+px/)
      expect(parseInt(height)).toBeGreaterThan(0)
      last.element.parentNode.removeChild(last.element)
    })

    it('should compute mm unit measurements into px', function() {
      if(!checkUnitSupport('mm', 'height')) return
      $_(document.body).append('<div id=test-style style=height:4mm></div>')
      var last = $_(document.body).lastChild()
      var height = last.style('height')
      expect(height).toMatch(/^[\d\.]+px/)
      expect(parseInt(height)).toBeGreaterThan(0)
      last.element.parentNode.removeChild(last.element)
    })

    it('should compute in unit measurements into px', function() {
      if(!checkUnitSupport('mm', 'height')) return
      $_(document.body).append('<div id=test-style style=height:2in></div>')
      var last = $_(document.body).lastChild()
      var height = last.style('height')
      expect(height).toMatch(/^[\d\.]+px/)
      expect(parseInt(height)).toBeGreaterThan(0)
      last.element.parentNode.removeChild(last.element)
    })

    it('should compute pt unit measurements into px', function() {
      if(!checkUnitSupport('pt', 'height')) return
      $_(document.body).append('<div id=test-style style=height:4pt></div>')
      var last = $_(document.body).lastChild()
      var height = last.style('height')
      expect(height).toMatch(/^[\d\.]+px/)
      expect(parseInt(height)).toBeGreaterThan(0)
      last.element.parentNode.removeChild(last.element)
    })

    it('should compute pc unit measurements into px', function() {
      if(!checkUnitSupport('pc', 'height')) return
      $_(document.body).append('<div id=test-style style=height:4pc></div>')
      var last = $_(document.body).lastChild()
      var height = last.style('height')
      expect(height).toMatch(/^[\d\.]+px/)
      expect(parseInt(height)).toBeGreaterThan(0)
      last.element.parentNode.removeChild(last.element)
    })

    it('should compute em unit measurements into px', function() {
      if(!checkUnitSupport('em', 'font-size')) return
      $_(document.body).append('<div id=test-style style=font-size:14px><div id=test-style-child style=font-size:1em></div></div>')
      var last = $_(document.body).lastChild()
      var child = last.firstChild()
      var fontSize = child.style('font-size')
      expect(fontSize).toMatch(/^[\d\.]+px/)
      expect(parseInt(fontSize)).toEqual(14)
      last.element.parentNode.removeChild(last.element)
    })

    it('should compute ex unit measurements into px', function() {
      if(!checkUnitSupport('ex', 'height')) return
      $_(document.body).append('<div id=test-style style=font-size:14px;height:4ex></div>')
      var last = $_(document.body).lastChild()
      var height = last.style('height')
      expect(height).toMatch(/^[\d\.]+px/)
      expect(parseInt(height)).toBeGreaterThan(0)
      last.element.parentNode.removeChild(last.element)
    })

    it('should compute % unit measurements into px', function() {
      if(!checkUnitSupport('%', 'height')) return
      $_(document.body).append('<div id=test-style style=height:50px><div id=test-style-child style=height:10%></div></div>')
      var last = $_(document.body).lastChild()
      var child = last.firstChild()
      var height = child.style('height')
      expect(height).toMatch(/^[\d\.]+px/)
      expect(parseInt(height)).toBeGreaterThan(0)
      last.element.parentNode.removeChild(last.element)
    })

    it('should compute vh unit measurements into px', function() {
      if(!checkUnitSupport('vh', 'height')) return
      $_(document.body).append('<div id=test-style style=height:10vh></div>')
      var last = $_(document.body).lastChild()
      var height = last.style('height')
      expect(height).toMatch(/^[\d\.]+px/)
      expect(parseInt(height)).toBeGreaterThan(0)
      last.element.parentNode.removeChild(last.element)
    })

    it('should compute vw unit measurements into px', function() {
      if(!checkUnitSupport('vw', 'height')) return
      $_(document.body).append('<div id=test-style style=height:10vw></div>')
      var last = $_(document.body).lastChild()
      var height = last.style('height')
      expect(height).toMatch(/^[\d\.]+px/)
      expect(parseInt(height)).toBeGreaterThan(0)
      last.element.parentNode.removeChild(last.element)
    })

    it('should compute rem unit measurements into px', function() {
      if(!checkUnitSupport('rem', 'font-size')) return
      $_(document.body).append('<div id=test-style style=font-size:2rem></div>')
      var last = $_(document.body).lastChild()
      var fontSize = last.style('font-size')
      checkUnitSupport(fontSize, 'rem')
      expect(fontSize).toMatch(/^[\d\.]+px/)
      expect(parseInt(fontSize)).toBeGreaterThan(0)
      last.element.parentNode.removeChild(last.element)
    })

  })

  describe('set', function() {

    it('should set a given style property', function() {
      $_(document.body).append('<div id=test-style></div>')
      var last = $_(document.body).lastChild()
      last.style('margin-left', '4px')
      last.style('width', '8px')
      last.style('border-top-style', 'solid')
      expect(last.style('margin-left')).toEqual('4px')
      expect(last.style('width')).toEqual('8px')
      expect(last.style('border-top-style')).toEqual('solid')
      last.element.parentNode.removeChild(last.element)
    })

  })

})

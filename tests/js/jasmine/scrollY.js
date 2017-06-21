describe('scrollY', function() {

  function cbCheck1(before) {
    var after = new Date(),
      time = after.getTime() - before.getTime()
    //log('time taken (ms)', time)
    expect($_.getCurrY()).toEqual(100)
    return time
  }

  function cbCheck2(time, interval) {
    if('requestAnimationFrame' in window) {
      expect(time).toBeGreaterThan(interval-17)
      expect(time-interval).toBeLessThan(100)
    }
    else {
      if(Math.abs(time-interval) > frameInterval) {
        //log('Animation overshot by more than 16ms')
      }
    }
  }

  function updateChangeRates(begin, before, changeRates) {
    var currTime = new Date()
    var rate = (10 * Math.abs(begin - $_.getCurrY()))/(currTime.getTime() - before.getTime())
    if(!isNaN(rate)) {
      changeRates.push(rate)
    }
  }

  function calcMeanVarRates(changeRates) {
    changeRates.shift()
    var mean = 0.0
    changeRates.forEach(function(rate) {
      mean += rate
    })
    mean /= changeRates.length
    var variance = 0.0
    changeRates.forEach(function(rate) {
      variance += Math.pow(rate - mean, 2)
    })
    variance /= changeRates.length
    //log(changeRates)
    //log(mean)
    //log(variance)
    return {mean: mean, variance: variance}
  }

  function checkMeanVariance(changeRates, meanMax, varMax, varMin) {
    if(!('requestAnimationFrame' in window)) {
      return
    }
    var ret = calcMeanVarRates(changeRates)
    expect(ret.mean).toBeLessThan(meanMax)
    expect(ret.variance).toBeLessThan(varMax)
    if(undefined !== varMin) {
      expect(ret.variance).toBeGreaterThan(varMin)
    }
  }

  var frameInterval = 16

  describe('linear mode', function() {

    it('should work to achieve desired scroll position', function() {
      var elem = $_(document.body).append('<div style=background-color:black;height:4000px>').lastChild()
      var interval = 1000, done = false
      var spy = {
        callback: function(obj) {
          cbCheck1(before)
          done = true
        }
      }
      spyOn(spy, 'callback').andCallThrough()
      var before
      runs(function() {
        before = new Date()
        $_.scrollY(100, interval, function(obj){spy.callback(obj)})
      })
      waitsFor(function() {
        return done
      }, 'scrollY callback should have been called', 3000)
      runs(function() {
        done = false
        expect(spy.callback).toHaveBeenCalled()
        elem.element.parentNode.removeChild(elem.element)
        done = true
      })
      waitsFor(function() {
        return done
      }, 'scrollY checks should have been done', 3000)
    })

    it('should run for a duration less than javascript frame interval', function() {
      var elem = $_(document.body).append('<div style=background-color:black;height:4000px>').lastChild()
      var interval = 5, done = false
      var spy = {
        callback: function(obj) {
          cbCheck1(before)
          done = true
        }
      }
      spyOn(spy, 'callback').andCallThrough()
      window.scrollTo(0, 0)
      var before = new Date()
      runs(function() {
        $_.scrollY(100, interval, function(obj){spy.callback(obj)})
      })
      waitsFor(function() {
        return done
      }, 'scrollY callback should have been called', 1000)
      runs(function() {
        done = false
        expect(spy.callback).toHaveBeenCalled()
        elem.element.parentNode.removeChild(elem.element)
        done = true
      })
      waitsFor(function() {
        return done
      }, 'scrollY checks should have been done', 3000)
    })

    it('should complete in a time close to given duration', function() {
      var elem = $_(document.body).append('<div style=background-color:black;height:4000px>').lastChild()
      var interval = 1000, done = false
      var spy = {
        callback: function(obj) {
          var time = cbCheck1(before)
          cbCheck2(time, interval)
          done = true
        }
      }
      spyOn(spy, 'callback').andCallThrough()
      var before
      window.scrollTo(0, 0)
      runs(function() {
        before = new Date()
        $_.scrollY(100, interval, function(obj){spy.callback(obj)})
      })
      waitsFor(function() {
        return done
      }, 'scrollY callback should have been called', 3000)
      runs(function() {
        done = false
        expect(spy.callback).toHaveBeenCalled()
        elem.element.parentNode.removeChild(elem.element)
        done = true
      })
      waitsFor(function() {
        return done
      }, 'scrollY checks should have been done', 3000)
    })

    it('should work from any scroll position', function() {
      var elem = $_(document.body).append('<div style=background-color:black;height:4000px>').lastChild()
      var interval = 1000, done = false
      var spy = {
        callback: function(obj) {
          var time = cbCheck1(before)
          cbCheck2(time, interval)
          done = true
        }
      }
      spyOn(spy, 'callback').andCallThrough()
      var before
      runs(function() {
        before = new Date()
        window.scrollTo(0, 500)
        $_.scrollY(100, interval, function(obj){spy.callback(obj)})
      })
      waitsFor(function() {
        return done
      }, 'scrollY callback should have been called', 3000)
      runs(function() {
        done = false
        expect(spy.callback).toHaveBeenCalled()
        elem.element.parentNode.removeChild(elem.element)
        done = true
      })
      waitsFor(function() {
        return done
      }, 'scrollY checks should have been done', 3000)
    })

    it('should use the linear mode by default', function() {
      var elem = $_(document.body).append('<div style=background-color:black;height:4000px>').lastChild()
      var interval = 1000, done = false
      var spy = {
        callback: function(obj) {
          var time = cbCheck1(before)
          cbCheck2(time, interval)
          done = true
        }
      }
      spyOn(spy, 'callback').andCallThrough()
      window.scrollTo(0, 0)
      var before, begin, changeRates = [ ]
      runs(function() {
        before = new Date()
        begin = $_.getCurrY()
        $_.scrollY(100, interval, function(obj){spy.callback(obj)})
      })
      waitsFor(function() {
        updateChangeRates(begin, before, changeRates)
        return done
      }, 'scrollY callback should have been called', 3000)
      runs(function() {
        done = false
        expect(spy.callback).toHaveBeenCalled()
        elem.element.parentNode.removeChild(elem.element)
        checkMeanVariance(changeRates, 1.0, 0.05, 0.001)
        done = true
      })
      waitsFor(function() {
        return done
      }, 'scrollY checks should have been done', 3000)
    })

    it('should use a linear course in time', function() {
      var elem = $_(document.body).append('<div style=background-color:black;height:4000px>').lastChild()
      var interval = 1000, done = false
      var spy = {
        callback: function(obj) {
          var time = cbCheck1(before)
          cbCheck2(time, interval)
          done = true
        }
      }
      spyOn(spy, 'callback').andCallThrough()
      window.scrollTo(0, 0)
      var before, begin, changeRates = [ ]
      runs(function() {
        before = new Date()
        begin = $_.getCurrY()
        $_.scrollY(100, interval, 'linear', function(obj){spy.callback(obj)})
      })
      waitsFor(function() {
        updateChangeRates(begin, before, changeRates)
        return done
      }, 'scrollY callback should have been called', 3000)
      runs(function() {
        done = false
        expect(spy.callback).toHaveBeenCalled()
        elem.element.parentNode.removeChild(elem.element)
        checkMeanVariance(changeRates, 1.0, 0.05, 0.001)
        done = true
      })
      waitsFor(function() {
        return done
      }, 'scrollY checks should have been done', 3000)
    })

  })

  describe('easeInQuadratic mode', function() {

    it('should work to achieve desired scroll position', function() {
      var elem = $_(document.body).append('<div style=background-color:black;height:4000px>').lastChild()
      var interval = 1000, done = false
      var spy = {
        callback: function(obj) {
          cbCheck1(before)
          done = true
        }
      }
      spyOn(spy, 'callback').andCallThrough()
      var before
      runs(function() {
        before = new Date()
        $_.scrollY(100, interval, 'easeInQuadratic', function(obj){spy.callback(obj)})
      })
      waitsFor(function() {
        return done
      }, 'scrollY callback should have been called', 3000)
      runs(function() {
        done = false
        expect(spy.callback).toHaveBeenCalled()
        elem.element.parentNode.removeChild(elem.element)
        done = true
      })
      waitsFor(function() {
        return done
      }, 'scrollY checks should have been done', 3000)
    })

    it('should run for a duration less than javascript frame interval', function() {
      var elem = $_(document.body).append('<div style=background-color:black;height:4000px>').lastChild()
      var interval = 5, done = false
      var spy = {
        callback: function(obj) {
          cbCheck1(before)
          done = true
        }
      }
      spyOn(spy, 'callback').andCallThrough()
      window.scrollTo(0, 0)
      var before = new Date()
      runs(function() {
        $_.scrollY(100, interval, 'easeInQuadratic', function(obj){spy.callback(obj)})
      })
      waitsFor(function() {
        return done
      }, 'scrollY callback should have been called', 1000)
      runs(function() {
        done = false
        expect(spy.callback).toHaveBeenCalled()
        elem.element.parentNode.removeChild(elem.element)
        done = true
      })
      waitsFor(function() {
        return done
      }, 'scrollY checks should have been done', 3000)
    })

    it('should complete in a time close to given duration', function() {
      var elem = $_(document.body).append('<div style=background-color:black;height:4000px>').lastChild()
      var interval = 1000, done = false
      var spy = {
        callback: function(obj) {
          var time = cbCheck1(before)
          cbCheck2(time, interval)
          done = true
        }
      }
      spyOn(spy, 'callback').andCallThrough()
      var before
      window.scrollTo(0, 0)
      runs(function() {
        before = new Date()
        $_.scrollY(100, interval, 'easeInQuadratic', function(obj){spy.callback(obj)})
      })
      waitsFor(function() {
        return done
      }, 'scrollY callback should have been called', 3000)
      runs(function() {
        done = false
        expect(spy.callback).toHaveBeenCalled()
        elem.element.parentNode.removeChild(elem.element)
        done = true
      })
      waitsFor(function() {
        return done
      }, 'scrollY checks should have been done', 3000)
    })

    it('should work from any scroll position', function() {
      var elem = $_(document.body).append('<div style=background-color:black;height:4000px>').lastChild()
      var interval = 1000, done = false
      var spy = {
        callback: function(obj) {
          var time = cbCheck1(before)
          cbCheck2(time, interval)
          done = true
        }
      }
      spyOn(spy, 'callback').andCallThrough()
      var before
      runs(function() {
        before = new Date()
        window.scrollTo(0, 500)
        $_.scrollY(100, interval, 'easeInQuadratic', function(obj){spy.callback(obj)})
      })
      waitsFor(function() {
        return done
      }, 'scrollY callback should have been called', 3000)
      runs(function() {
        done = false
        expect(spy.callback).toHaveBeenCalled()
        elem.element.parentNode.removeChild(elem.element)
        done = true
      })
      waitsFor(function() {
        return done
      }, 'scrollY checks should have been done', 3000)
    })

    it('should use a quadratic course in time with change rate always increasing', function() {
      var elem = $_(document.body).append('<div style=background-color:black;height:4000px>').lastChild()
      var interval = 1000, done = false
      var spy = {
        callback: function(obj) {
          var time = cbCheck1(before)
          cbCheck2(time, interval)
          done = true
        }
      }
      spyOn(spy, 'callback').andCallThrough()
      window.scrollTo(0, 0)
      var before, begin, changeRates = [ ]
      runs(function() {
        before = new Date()
        begin = $_.getCurrY()
        $_.scrollY(100, interval, 'easeInQuadratic', function(obj){spy.callback(obj)})
      })
      waitsFor(function() {
        updateChangeRates(begin, before, changeRates)
        return done
      }, 'scrollY callback should have been called', 3000)
      runs(function() {
        done = false
        expect(spy.callback).toHaveBeenCalled()
        elem.element.parentNode.removeChild(elem.element)
        checkMeanVariance(changeRates, 0.6, 0.11, 0.05)
        if('requestAnimationFrame' in window) {
          for(var idx = 30; idx < changeRates.length; ++idx) {
            expect(changeRates[idx-5]).toBeLessThan(changeRates[idx])
          }
        }
        done = true
      })
      waitsFor(function() {
        return done
      }, 'scrollY checks should have been done', 3000)
    })

  })

  describe('easeOutQuadratic mode', function() {

    it('should work to achieve desired scroll position', function() {
      var elem = $_(document.body).append('<div style=background-color:black;height:4000px>').lastChild()
      var interval = 1000, done = false
      var spy = {
        callback: function(obj) {
          cbCheck1(before)
          done = true
        }
      }
      spyOn(spy, 'callback').andCallThrough()
      var before
      runs(function() {
        before = new Date()
        $_.scrollY(100, interval, 'easeOutQuadratic', function(obj){spy.callback(obj)})
      })
      waitsFor(function() {
        return done
      }, 'scrollY callback should have been called', 3000)
      runs(function() {
        done = false
        expect(spy.callback).toHaveBeenCalled()
        elem.element.parentNode.removeChild(elem.element)
        done = true
      })
      waitsFor(function() {
        return done
      }, 'scrollY checks should have been done', 3000)
    })

    it('should run for a duration less than javascript frame interval', function() {
      var elem = $_(document.body).append('<div style=background-color:black;height:4000px>').lastChild()
      var interval = 5, done = false
      var spy = {
        callback: function(obj) {
          cbCheck1(before)
          done = true
        }
      }
      spyOn(spy, 'callback').andCallThrough()
      window.scrollTo(0, 0)
      var before = new Date()
      runs(function() {
        $_.scrollY(100, interval, 'easeOutQuadratic', function(obj){spy.callback(obj)})
      })
      waitsFor(function() {
        return done
      }, 'scrollY callback should have been called', 1000)
      runs(function() {
        done = false
        expect(spy.callback).toHaveBeenCalled()
        elem.element.parentNode.removeChild(elem.element)
        done = true
      })
      waitsFor(function() {
        return done
      }, 'scrollY checks should have been done', 3000)
    })

    it('should complete in a time close to given duration', function() {
      var elem = $_(document.body).append('<div style=background-color:black;height:4000px>').lastChild()
      var interval = 1000, done = false
      var spy = {
        callback: function(obj) {
          var time = cbCheck1(before)
          cbCheck2(time, interval)
          done = true
        }
      }
      spyOn(spy, 'callback').andCallThrough()
      var before
      window.scrollTo(0, 0)
      runs(function() {
        before = new Date()
        $_.scrollY(100, interval, 'easeOutQuadratic', function(obj){spy.callback(obj)})
      })
      waitsFor(function() {
        return done
      }, 'scrollY callback should have been called', 3000)
      runs(function() {
        done = false
        expect(spy.callback).toHaveBeenCalled()
        elem.element.parentNode.removeChild(elem.element)
        done = true
      })
      waitsFor(function() {
        return done
      }, 'scrollY checks should have been done', 3000)
    })

    it('should work from any scroll position', function() {
      var elem = $_(document.body).append('<div style=background-color:black;height:4000px>').lastChild()
      var interval = 1000, done = false
      var spy = {
        callback: function(obj) {
          var time = cbCheck1(before)
          cbCheck2(time, interval)
          done = true
        }
      }
      spyOn(spy, 'callback').andCallThrough()
      var before
      runs(function() {
        before = new Date()
        window.scrollTo(0, 500)
        $_.scrollY(100, interval, 'easeOutQuadratic', function(obj){spy.callback(obj)})
      })
      waitsFor(function() {
        return done
      }, 'scrollY callback should have been called', 3000)
      runs(function() {
        done = false
        expect(spy.callback).toHaveBeenCalled()
        elem.element.parentNode.removeChild(elem.element)
        done = true
      })
      waitsFor(function() {
        return done
      }, 'scrollY checks should have been done', 3000)
    })

    it('should use a quadratic course in time with change rate decreasing post around 1/3 mark', function() {
      var elem = $_(document.body).append('<div style=background-color:black;height:4000px>').lastChild()
      var interval = 1000, done = false
      var spy = {
        callback: function(obj) {
          var time = cbCheck1(before)
          cbCheck2(time, interval)
          done = true
        }
      }
      spyOn(spy, 'callback').andCallThrough()
      window.scrollTo(0, 0)
      var before, begin, changeRates = [ ]
      runs(function() {
        before = new Date()
        begin = $_.getCurrY()
        $_.scrollY(100, interval, 'easeOutQuadratic', function(obj){spy.callback(obj)})
      })
      waitsFor(function() {
        updateChangeRates(begin, before, changeRates)
        return done
      }, 'scrollY callback should have been called', 3000)
      runs(function() {
        done = false
        expect(spy.callback).toHaveBeenCalled()
        elem.element.parentNode.removeChild(elem.element)
        checkMeanVariance(changeRates, 1.5, 0.1, 0.04)
        if('requestAnimationFrame' in window) {
          for(var idx = 40; idx < changeRates.length; ++idx) {
            expect(changeRates[idx-5]).toBeGreaterThan(changeRates[idx])
          }
        }
        window.scrollTo(0, 0)
        done = true
      })
      waitsFor(function() {
        return done
      }, 'scrollY checks should have been done', 3000)
    })

  })

})


describe('fadeIn', function() {

  function cbCheck1(obj, before, elem) {
    var after = new Date(),
      time = after.getTime() - before.getTime()
    //log('time taken (ms)', time)
    expect(obj).toEqual(elem)
    expect(obj.element.offsetHeight).toEqual(20)
    expect(obj.opacity()).toEqual(1.0)
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

  function updateChangeRates(elem, before, changeRates) {
    var currTime = new Date()
    var rate = (1000 * elem.opacity())/(currTime.getTime() - before.getTime())
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

    it('should complete to get a 100% opacity visible element', function() {
      var elem = $_(document.body).append('<div style=display:none;background-color:black;height:20px>').lastChild()
      var interval = 1000, done = false
      elem.opacity(0)
      var spy = {
        callback: function(obj) {
          cbCheck1(obj, before, elem)
          done = true
        }
      }
      spyOn(spy, 'callback').andCallThrough()
      var before = new Date()
      runs(function() {
        elem.fadeIn(interval, function(obj){spy.callback(obj)})
      })
      waitsFor(function() {
        return done
      }, 'fadeIn callback should have been called', 3000)
      runs(function() {
        done = false
        expect(spy.callback).toHaveBeenCalled()
        elem.element.parentNode.removeChild(elem.element)
        done = true
      })
      waitsFor(function() {
        return done
      }, 'fadeIn checks should have been done', 3000)
    })

    it('should run for a duration less than javascript frame interval', function() {
      var elem = $_(document.body).append('<div style=display:none;background-color:black;height:20px>').lastChild()
      var interval = 5, done = false
      elem.opacity(0)
      var spy = {
        callback: function(obj) {
          cbCheck1(obj, before, elem)
          done = true
        }
      }
      spyOn(spy, 'callback').andCallThrough()
      var before = new Date()
      runs(function() {
        elem.fadeIn(interval, function(obj){spy.callback(obj)})
      })
      waitsFor(function() {
        return done
      }, 'fadeIn callback should have been called', 1000)
      runs(function() {
        done = false
        expect(spy.callback).toHaveBeenCalled()
        elem.element.parentNode.removeChild(elem.element)
        done = true
      })
      waitsFor(function() {
        return done
      }, 'fadeIn checks should have been done', 3000)
    })

    it('should complete in a time close to given duration', function() {
      var elem = $_(document.body).append('<div style=display:none;background-color:black;height:20px>').lastChild()
      var interval = 1000, done = false
      elem.opacity(0)
      var spy = {
        callback: function(obj) {
          var time = cbCheck1(obj, before, elem)
          cbCheck2(time, interval)
          done = true
        }
      }
      spyOn(spy, 'callback').andCallThrough()
      var before = new Date()
      runs(function() {
        elem.fadeIn(interval, function(obj){spy.callback(obj)})
      })
      waitsFor(function() {
        return done
      }, 'fadeIn callback should have been called', 3000)
      runs(function() {
        done = false
        expect(spy.callback).toHaveBeenCalled()
        elem.element.parentNode.removeChild(elem.element)
        done = true
      })
      waitsFor(function() {
        return done
      }, 'fadeIn checks should have been done', 3000)
    })

    it('should work starting with any opacity level', function() {
      var elem = $_(document.body).append('<div style=display:none;background-color:black;height:20px>').lastChild()
      var interval = 1000, done = false
      elem.opacity(0.3)
      var spy = {
        callback: function(obj) {
          var time = cbCheck1(obj, before, elem)
          cbCheck2(time, interval)
          done = true
        }
      }
      spyOn(spy, 'callback').andCallThrough()
      var before = new Date()
      runs(function() {
        elem.fadeIn(interval, function(obj){spy.callback(obj)})
      })
      waitsFor(function() {
        return done
      }, 'fadeIn callback should have been called', 3000)
      runs(function() {
        done = false
        expect(spy.callback).toHaveBeenCalled()
        elem.element.parentNode.removeChild(elem.element)
        done = true
      })
      waitsFor(function() {
        return done
      }, 'fadeIn checks should have been done', 3000)
    })

    it('should use this mode by default', function() {
      var elem = $_(document.body).append('<div style=display:none;background-color:black;height:20px>').lastChild()
      var interval = 1000, done = false
      elem.opacity(0)
      var spy = {
        callback: function(obj) {
          cbCheck1(obj, before, elem)
          done = true
        }
      }
      spyOn(spy, 'callback').andCallThrough()
      var before = new Date(), changeRates = [ ]
      runs(function() {
        elem.fadeIn(interval, function(obj){spy.callback(obj)})
      })
      waitsFor(function() {
        updateChangeRates(elem, before, changeRates)
        return done
      }, 'fadeIn callback should have been called', 3000)
      runs(function() {
        done = false
        expect(spy.callback).toHaveBeenCalled()
        elem.element.parentNode.removeChild(elem.element)
        checkMeanVariance(changeRates, 1.0, 0.05)
        done = true
      })
      waitsFor(function() {
        return done
      }, 'fadeIn checks should have been done', 3000)
    })

    it('should take a linear course in time', function() {
      var elem = $_(document.body).append('<div style=display:none;background-color:black;height:20px>').lastChild()
      var interval = 1000, done = false
      elem.opacity(0)
      var spy = {
        callback: function(obj) {
          cbCheck1(obj, before, elem)
          done = true
        }
      }
      spyOn(spy, 'callback').andCallThrough()
      var before = new Date(), changeRates = [ ]
      runs(function() {
        elem.fadeIn(interval, 'linear', function(obj){spy.callback(obj)})
      })
      waitsFor(function() {
        updateChangeRates(elem, before, changeRates)
        return done
      }, 'fadeIn callback should have been called', 3000)
      runs(function() {
        done = false
        expect(spy.callback).toHaveBeenCalled()
        elem.element.parentNode.removeChild(elem.element)
        checkMeanVariance(changeRates, 1.0, 0.05)
        done = true
      })
      waitsFor(function() {
        return done
      }, 'fadeIn checks should have been done', 3000)
    })

  })

  describe('easeInQuadratic mode', function() {

    it('should complete to get a 100% opacity visible element', function() {
      var elem = $_(document.body).append('<div style=display:none;background-color:black;height:20px>').lastChild()
      var interval = 1000, done = false
      elem.opacity(0)
      var spy = {
        callback: function(obj) {
          cbCheck1(obj, before, elem)
          done = true
        }
      }
      spyOn(spy, 'callback').andCallThrough()
      var before = new Date()
      runs(function() {
        elem.fadeIn(interval, 'easeInQuadratic', function(obj){spy.callback(obj)})
      })
      waitsFor(function() {
        return done
      }, 'fadeIn callback should have been called', 3000)
      runs(function() {
        done = false
        expect(spy.callback).toHaveBeenCalled()
        elem.element.parentNode.removeChild(elem.element)
        done = true
      })
      waitsFor(function() {
        return done
      }, 'fadeIn checks should have been done', 3000)
    })

    it('should run for a duration less than javascript frame interval', function() {
      var elem = $_(document.body).append('<div style=display:none;background-color:black;height:20px>').lastChild()
      var interval = 5, done = false
      elem.opacity(0)
      var spy = {
        callback: function(obj) {
          cbCheck1(obj, before, elem)
          done = true
        }
      }
      spyOn(spy, 'callback').andCallThrough()
      var before = new Date()
      runs(function() {
        elem.fadeIn(interval, 'easeInQuadratic', function(obj){spy.callback(obj)})
      })
      waitsFor(function() {
        return done
      }, 'fadeIn callback should have been called', 1000)
      runs(function() {
        done = false
        expect(spy.callback).toHaveBeenCalled()
        elem.element.parentNode.removeChild(elem.element)
        done = true
      })
      waitsFor(function() {
        return done
      }, 'fadeIn checks should have been done', 3000)
    })

    it('should complete in a time close to given duration', function() {
      var elem = $_(document.body).append('<div style=display:none;background-color:black;height:20px>').lastChild()
      var interval = 1000, done = false
      elem.opacity(0)
      var spy = {
        callback: function(obj) {
          var time = cbCheck1(obj, before, elem)
          cbCheck2(time, interval)
          done = true
        }
      }
      spyOn(spy, 'callback').andCallThrough()
      var before = new Date()
      runs(function() {
        elem.fadeIn(interval, 'easeInQuadratic', function(obj){spy.callback(obj)})
      })
      waitsFor(function() {
        return done
      }, 'fadeIn callback should have been called', 3000)
      runs(function() {
        done = false
        expect(spy.callback).toHaveBeenCalled()
        elem.element.parentNode.removeChild(elem.element)
        done = true
      })
      waitsFor(function() {
        return done
      }, 'fadeIn checks should have been done', 3000)
    })

    it('should work starting with any opacity level', function() {
      var elem = $_(document.body).append('<div style=display:none;background-color:black;height:20px>').lastChild()
      var interval = 1000, done = false
      elem.opacity(0.3)
      var spy = {
        callback: function(obj) {
          var time = cbCheck1(obj, before, elem)
          cbCheck2(time, interval)
          done = true
        }
      }
      spyOn(spy, 'callback').andCallThrough()
      var before = new Date()
      runs(function() {
        elem.fadeIn(interval, 'easeInQuadratic', function(obj){spy.callback(obj)})
      })
      waitsFor(function() {
        return done
      }, 'fadeIn callback should have been called', 3000)
      runs(function() {
        done = false
        expect(spy.callback).toHaveBeenCalled()
        elem.element.parentNode.removeChild(elem.element)
        done = true
      })
      waitsFor(function() {
        return done
      }, 'fadeIn checks should have been done', 3000)
    })

    it('should take a quadratic course in time with change rate always increasing', function() {
      var elem = $_(document.body).append('<div style=display:none;background-color:black;height:20px>').lastChild()
      var interval = 1000, done = false
      elem.opacity(0)
      var spy = {
        callback: function(obj) {
          cbCheck1(obj, before, elem)
          done = true
        }
      }
      spyOn(spy, 'callback').andCallThrough()
      var before = new Date(), changeRates = [ ]
      runs(function() {
        elem.fadeIn(interval, 'easeInQuadratic', function(obj){spy.callback(obj)})
      })
      waitsFor(function() {
        updateChangeRates(elem, before, changeRates)
        return done
      }, 'fadeIn callback should have been called', 3000)
      runs(function() {
        done = false
        expect(spy.callback).toHaveBeenCalled()
        elem.element.parentNode.removeChild(elem.element)
        checkMeanVariance(changeRates, 0.7, 0.11, 0.03)
        var sum = 0
        for(var idx = 0; idx < 5; ++idx) {
          sum += changeRates[idx]
          //log(sum)
        }
        for(var n = 1, idx = n * 5; idx < changeRates.length; idx += 5) {
          var nextSum = 0
          for(var idx2 = idx; idx2 < idx + 5 && idx2 < changeRates.length; ++idx2) {
            nextSum += changeRates[idx2]
          }
          if(idx2 === idx + 5) {
            expect(nextSum).toBeGreaterThan(sum)
            // A lot of browsers liked them; but then there were some
            // that can't stick to these strict checks. As of now these
            // checks have been moved to work on browsers that use frames
            // and not timers
            if(nextSum > 0.1 && 'requestAnimationFrame' in window) {
              expect(nextSum - sum).toBeGreaterThan(0.1)
              expect(nextSum - sum).toBeLessThan(0.7)
            }
            //log(nextSum)
          }
          sum = nextSum
        }
        done = true
      })
      waitsFor(function() {
        return done
      }, 'fadeIn checks should have been done', 3000)
    })

  })

  describe('easeOutQuadratic mode', function() {

    it('should complete to get a 100% opacity visible element', function() {
      var elem = $_(document.body).append('<div style=display:none;background-color:black;height:20px>').lastChild()
      var interval = 1000, done = false
      elem.opacity(0)
      var spy = {
        callback: function(obj) {
          cbCheck1(obj, before, elem)
          done = true
        }
      }
      spyOn(spy, 'callback').andCallThrough()
      var before = new Date()
      runs(function() {
        elem.fadeIn(interval, 'easeOutQuadratic', function(obj){spy.callback(obj)})
      })
      waitsFor(function() {
        return done
      }, 'fadeIn callback should have been called', 3000)
      runs(function() {
        done = false
        expect(spy.callback).toHaveBeenCalled()
        elem.element.parentNode.removeChild(elem.element)
        done = true
      })
      waitsFor(function() {
        return done
      }, 'fadeIn checks should have been done', 3000)
    })

    it('should run for a duration less than javascript frame interval', function() {
      var elem = $_(document.body).append('<div style=display:none;background-color:black;height:20px>').lastChild()
      var interval = 5, done = false
      elem.opacity(0)
      var spy = {
        callback: function(obj) {
          cbCheck1(obj, before, elem)
          done = true
        }
      }
      spyOn(spy, 'callback').andCallThrough()
      var before = new Date()
      runs(function() {
        elem.fadeIn(interval, 'easeOutQuadratic', function(obj){spy.callback(obj)})
      })
      waitsFor(function() {
        return done
      }, 'fadeIn callback should have been called', 1000)
      runs(function() {
        done = false
        expect(spy.callback).toHaveBeenCalled()
        elem.element.parentNode.removeChild(elem.element)
        done = true
      })
      waitsFor(function() {
        return done
      }, 'fadeIn checks should have been done', 3000)
    })

    it('should complete in a time close to given duration', function() {
      var elem = $_(document.body).append('<div style=display:none;background-color:black;height:20px>').lastChild()
      var interval = 1000, done = false
      elem.opacity(0)
      var spy = {
        callback: function(obj) {
          var time = cbCheck1(obj, before, elem)
          cbCheck2(time, interval)
          done = true
        }
      }
      spyOn(spy, 'callback').andCallThrough()
      var before = new Date()
      runs(function() {
        elem.fadeIn(interval, 'easeOutQuadratic', function(obj){spy.callback(obj)})
      })
      waitsFor(function() {
        return done
      }, 'fadeIn callback should have been called', 3000)
      runs(function() {
        done = false
        expect(spy.callback).toHaveBeenCalled()
        elem.element.parentNode.removeChild(elem.element)
        done = true
      })
      waitsFor(function() {
        return done
      }, 'fadeIn checks should have been done', 3000)
    })

    it('should work starting with any opacity level', function() {
      var elem = $_(document.body).append('<div style=display:none;background-color:black;height:20px>').lastChild()
      var interval = 1000, done = false
      elem.opacity(0.3)
      var spy = {
        callback: function(obj) {
          var time = cbCheck1(obj, before, elem)
          cbCheck2(time, interval)
          done = true
        }
      }
      spyOn(spy, 'callback').andCallThrough()
      var before = new Date()
      runs(function() {
        elem.fadeIn(interval, 'easeOutQuadratic', function(obj){spy.callback(obj)})
      })
      waitsFor(function() {
        return done
      }, 'fadeIn callback should have been called', 3000)
      runs(function() {
        done = false
        expect(spy.callback).toHaveBeenCalled()
        elem.element.parentNode.removeChild(elem.element)
        done = true
      })
      waitsFor(function() {
        return done
      }, 'fadeIn checks should have been done', 3000)
    })

    it('should take a quadratic course in time with change rate decreasing post around 1/3 mark', function() {
      var elem = $_(document.body).append('<div style=display:none;background-color:black;height:20px>').lastChild()
      var interval = 1000, done = false
      elem.opacity(0)
      var spy = {
        callback: function(obj) {
          cbCheck1(obj, before, elem)
          done = true
        }
      }
      spyOn(spy, 'callback').andCallThrough()
      var before = new Date(), changeRates = [ ]
      runs(function() {
        elem.fadeIn(interval, 'easeOutQuadratic', function(obj){spy.callback(obj)})
      })
      waitsFor(function() {
        updateChangeRates(elem, before, changeRates)
        return done
      }, 'fadeIn callback should have been called', 3000)
      runs(function() {
        done = false
        expect(spy.callback).toHaveBeenCalled()
        elem.element.parentNode.removeChild(elem.element)
        checkMeanVariance(changeRates, 1.5, 0.16, 0.04)
        changeRates.shift()
        changeRates.shift()
        changeRates.pop()
        var sum = 0
        for(var n = 6, idx = n * 5; idx < (n + 1)*5; ++idx) {
          sum += changeRates[idx]
        }
        //log(sum)
        for(var n = 7, idx = n * 5; idx < changeRates.length; idx += 5) {
          var nextSum = 0
          for(var idx2 = idx; idx2 < idx + 5 && idx2 < changeRates.length; ++idx2) {
            nextSum += changeRates[idx2]
          }
          if(idx2 === idx + 5) {
            expect(nextSum).toBeLessThan(sum)
            // A lot of browsers liked them; but then there were some
            // that can't stick to these strict checks. As of now these
            // checks have been moved to work on browsers that use frames
            // and not timers
            if('requestAnimationFrame' in window) {
              expect(sum - nextSum).toBeGreaterThan(0.09)
              expect(sum - nextSum).toBeLessThan(0.6)
            }
            //log(nextSum)
          }
          sum = nextSum
        }
        done = true
      })
      waitsFor(function() {
        return done
      }, 'fadeIn checks should have been done', 3000)
    })

    it('should work for the swing alias', function() {
      var elem = $_(document.body).append('<div style=display:none;background-color:black;height:20px>').lastChild()
      var interval = 1000, done = false
      elem.opacity(0)
      var spy = {
        callback: function(obj) {
          cbCheck1(obj, before, elem)
          done = true
        }
      }
      spyOn(spy, 'callback').andCallThrough()
      var before = new Date(), changeRates = [ ]
      runs(function() {
        elem.fadeIn(interval, 'swing', function(obj){spy.callback(obj)})
      })
      waitsFor(function() {
        updateChangeRates(elem, before, changeRates)
        return done
      }, 'fadeIn callback should have been called', 3000)
      runs(function() {
        done = false
        expect(spy.callback).toHaveBeenCalled()
        elem.element.parentNode.removeChild(elem.element)
        checkMeanVariance(changeRates, 1.5, 0.15, 0.05)
        changeRates.shift()
        changeRates.shift()
        changeRates.pop()
        var sum = 0
        for(var n = 6, idx = n * 5; idx < (n + 1)*5; ++idx) {
          sum += changeRates[idx]
        }
        //log(sum)
        for(var n = 7, idx = n * 5; idx < changeRates.length; idx += 5) {
          var nextSum = 0
          for(var idx2 = idx; idx2 < idx + 5 && idx2 < changeRates.length; ++idx2) {
            nextSum += changeRates[idx2]
          }
          if(idx2 === idx + 5) {
            expect(nextSum).toBeLessThan(sum)
            // A lot of browsers liked them; but then there were some
            // that can't stick to these strict checks. As of now these
            // checks have been moved to work on browsers that use frames
            // and not timers
            if('requestAnimationFrame' in window) {
              expect(sum - nextSum).toBeGreaterThan(0.1)
              expect(sum - nextSum).toBeLessThan(0.5)
            }
            //log(nextSum)
          }
          sum = nextSum
        }
        done = true
      })
      waitsFor(function() {
        return done
      }, 'fadeIn checks should have been done', 3000)
    })

  })

})

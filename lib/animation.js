var __frame_interval__ = 16

var _reqAnimFrame = window.requestAnimationFrame
  || window.mozRequestAnimationFrame
  || window.webkitRequestAnimationFrame
  || window.msRequestAnimationFrame

if(undefined !== _reqAnimFrame) {
  window.requestAnimationFrame = _reqAnimFrame
}

/** global: browse */

browse.prototype.fadeIn = function() {
  var duration = arguments[0] < __frame_interval__ ? __frame_interval__ : arguments[0],
    mode = 'string' === typeof(arguments[1]) ? arguments[1] : undefined,
    callback = !mode ? arguments[1] : arguments[2]
  this.show()
  var tick = _fadeInTick(
    this,
    duration,
    mode || 'linear',
    callback)
  _queueAnimationStep(tick)
  return this
}

browse.prototype.fadeOut = function() {
  var duration = arguments[0] < __frame_interval__ ? __frame_interval__ : arguments[0],
    mode = 'string' === typeof(arguments[1]) ? arguments[1] : undefined,
    callback = !mode ? arguments[1] : arguments[2]
  var tick = _fadeOutTick(
    this,
    duration,
    mode || 'linear',
    callback)
  _queueAnimationStep(tick)
  return this
}

browse.scrollY = function() {
  var toY = arguments[0],
    duration = arguments[1] < __frame_interval__ ? __frame_interval__ : arguments[1],
    mode = 'string' === typeof(arguments[2]) ? arguments[2] : undefined,
    callback = !mode ? arguments[2] : arguments[3]
  var tick = _scrollYTick(
    this,
    toY,
    duration,
    mode || 'linear',
    callback)
  _queueAnimationStep(tick)
  return this
}

function _fadeInTick(obj, duration, mode, callback) {
  var beginOpacity = obj.opacity(),
    beginTime = (new Date()).getTime()
  var tick = function() {
    var opacity = _getAnimationStep(beginTime, duration, beginOpacity, 1.0, mode)
    obj.opacity(opacity)
    if(opacity < 1) {
      _queueAnimationStep(tick)
      return
    }
    callback(obj)
  }
  return tick
}

function _fadeOutTick(obj, duration, mode, callback) {
  var beginOpacity = obj.opacity(),
    beginTime = (new Date()).getTime()
  var tick = function() {
    var opacity = _getAnimationStep(beginTime, duration, beginOpacity, 0, mode)
    obj.opacity(opacity)
    if(opacity > 0) {
      _queueAnimationStep(tick)
      return
    }
    obj.hide()
    callback(obj)
  }
  return tick
}

function _scrollYTick(obj, toY, duration, mode, callback) {
  var currX = _getCurrX(),
    beginY = _getCurrY(),
    beginTime = (new Date()).getTime()
  var tick = function() {
    var nextY = _getAnimationStep(beginTime, duration, beginY, toY, mode)
    window.scrollTo(currX, nextY)
    if(nextY !== toY) {
      _queueAnimationStep(tick)
      return
    }
    callback(obj)
  }
  return tick
}

function _getAnimationStep(beginTime, duration, beginVal, endVal, mode) {
  var elapsed = (new Date()).getTime() - beginTime
  if(elapsed < duration) {
    switch(mode) {
      case 'easeInQuadratic':
        return beginVal + (elapsed /= duration) * elapsed * (endVal - beginVal)
      case 'swing':
      case 'easeOutQuadratic':
        return beginVal + (elapsed /= duration) * (elapsed - 2) * (beginVal - endVal)
      default:
        return beginVal + (elapsed / duration) * (endVal - beginVal)
    }
  }
  else {
    return endVal
  }
}

function _queueAnimationStep(func) {
  if('requestAnimationFrame' in window) {
    window.requestAnimationFrame(func)
  }
  else {
    setTimeout(func, __frame_interval__)
  }
}

      /*case 'easeInOutQuadratic':
        if(elapsed <= (duration / 2)) {
          return _getAnimationStep(beginTime, duration / 2, beginVal, (beginVal + endVal) / 2, 'easeInQuadratic')
        }
        else {
          return _getAnimationStep(beginTime + duration / 2, duration / 2, (beginVal + endVal) / 2, endVal, 'easeOutQuadratic')
        }*/

/**
 * https://github.com/dperini/ContentLoaded
*/

/** global: browse */

var
  _root = document.documentElement,
  _modern = document.addEventListener,
  _add = _modern ? 'addEventListener' : 'attachEvent',
  _rem = _modern ? 'removeEventListener' : 'detachEvent',
  _pre = _modern ? '' : 'on'

browse.ready = function(callback) {
  var
  init = _readyInit(callback),
  poll = _readyPoll()
  if(document.readyState === 'complete') {
    callback('lazy')
  }
  else {
    _notModernCheckForReady(poll)
    document[_add](_pre + 'DOMContentLoaded', init, false)
    document[_add](_pre + 'readystatechange', init, false)
    window[_add](_pre + 'load', init, false)
  }
}

function _readyInit(callback) {
  var done = false
  var init = function(e) {
    if(e.type === 'readystatechange' && document.readyState !== 'complete') {
      return
    }
    (e.type === 'load' ? window : document)[_rem](_pre + e.type, init, false)
    if(!done) {
      done = true
      callback(e.type)
    }
  }
  return init
}

function _readyPoll() {
  var poll = function() {
    try {
      _root.doScroll('left')
    } catch(e) {
      setTimeout(poll, 20)
      return
    }
    init('poll')
  }
  return poll
}

function _notModernCheckForReady(poll) {
  try {
    if(!_modern && _root.doScroll && !window.frameElement) {
      poll()
    }
  } catch(e) {
    // ignore
  }
}

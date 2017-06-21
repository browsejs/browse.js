function _ajaxTimeout(xhr, url, options) {
  if(options.timeout) {
    if(_ajaxUsingOnTimeout(xhr, url, options)) {
      return
    }
    _ajaxUsingTimer(xhr, url, options)
  }
}

function _ajaxUsingOnTimeout(xhr, url, options) {
  if('ontimeout' in xhr && 'timeout' in xhr) {
    try {
      xhr.timeout = options.timeout
      xhr.ontimeout = function() {
        _ajaxResponse(xhr, url, options)
      }
      return true
    }
    catch(e){
      // ignore
    }
  }
  return false
}

function _ajaxUsingTimer(xhr, url, options) {
  setTimeout(function() {
    try {
      xhr.abort()
    }
    catch(e) {
      // ignore
    }
    options.error('incomplete request', 0, url, xhr)
  }, options.timeout)
}

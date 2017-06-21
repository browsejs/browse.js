/** global: __ready_state_done__ */

function _ajaxOnload(xhr, url, options) {
  if('onload' in xhr) {
    xhr.onload = function() {
      _ajaxResponse(xhr, url, options)
    }
    xhr.onerror = function() {
      _ajaxResponse(xhr, url, options)
    }
  }
  else {
    xhr.onreadystatechange = function() {
      if(__ready_state_done__ === xhr.readyState) {
        _ajaxResponse(xhr, url, options)
      }
    }
  }
}

function _ajaxResponse(xhr, url, options) {
  if(0 === xhr.status) {
    options.error(xhr.responseText || 'incomplete request', xhr.status, url, xhr)
  }
  else if(200 <= xhr.status && 299 >= xhr.status) {
    options.success(_ajaxParsedResponse(xhr, options), xhr.status, url, xhr)
  }
  else {
    options.error(_ajaxParsedResponse(xhr, options), xhr.status, url, xhr)
  }
}

function _ajaxParsedResponse(xhr, options) {
  switch(options.format) {
    case 'json':
      try {
        return JSON.parse(xhr.responseText)
      }
      catch(e) {
        return null
      }
    case 'xml':
      return xhr.responseXML
    default:
      return xhr.responseText
  }
}

/** global: browse */

browse.ajax = function(url, options) {
  var xhr = _ajaxXhr()
  url = _ajaxNonce(url, options)
  _ajaxOnload(xhr, url, options)
  _ajaxTimeout(xhr, url, options)
  try {
    _ajaxData(options)
    if(options.useIframe) {
      throw new Error('No support for sending forms with selected files using iframe')
    }
    xhr.open(options.method, url, true)
    _ajaxHeaders(xhr, options.headers)
    _ajaxContentType(xhr, options)
    if(options.beforeSend) {
      options.beforeSend(xhr, options)
    }
    xhr.send(options.method.match(__methods_with_data__) && options.data || null)
  }
  catch(e) {
    _ajaxError(e, xhr, url, options)
  }
}

function _ajaxXhr() {
  if(window.ActiveXObject && (document.documentMode <= 8 || !window.XMLHttpRequest)) {
    return new window.ActiveXObject('Microsoft.XmlHttp')
  }
  return new window.XMLHttpRequest()
}

function _ajaxError(err, xhr, url, options) {
  var status
  try {
    status = xhr.status
  }
  catch(e) {
    status = 0
  }
  options.error(err.message, status, url, xhr)
}

var
  __ajax_nonce__ = +(new Date()),
  __ready_state_done__ = 4,
  __content_form_urlencoded__ = "application/x-www-form-urlencoded; charset=utf-8",
  __content_json__ = "application/json; charset=utf-8",
  __content_multipart__ = 'multipart/form-data; charset=utf-8',
  __methods_with_data__ = /^(POST|PATCH|PUT)$/,
  __methods_with_response__ = /^(GET|HEAD|OPTIONS)$/

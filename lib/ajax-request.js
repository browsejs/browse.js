/** global: __methods_with_response__ */
/** global: __ajax_nonce__ */
/** global: __methods_with_data__ */
/** global: __content_form_urlencoded__ */
/** global: __content_json__ */
/** global: __content_multipart__ */

function _ajaxNonce(url, options) {
  if(false === options.cache && options.method.match(__methods_with_response__)) {
    if(!url.match(/_=/)) {
      url += !url.match(/\?/)
        ? '?_='
        : url.match(/\?$/)
          ? '_='
          : '&_='
      url += __ajax_nonce__++
    }
  }
  return url
}

function _ajaxHeaders(xhr, headers) {
  if(headers) {
    /* eslint-disable guard-for-in */
    for (var key in headers) {
      xhr.setRequestHeader(key, headers[key])
    }
    /* eslint-enable guard-for-in */
  }
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
}

function _ajaxContentType(xhr, options) {
  if(_ajaxNoContentTypeNeeded(options)) {
    return
  }
  if(!options.contentType) {
    options.contentType = __content_form_urlencoded__
  }
  _ajaxHandleContentType(xhr, options)
}

function _ajaxHandleContentType(xhr, options) {
  switch(options.contentType.toLowerCase()) {
    case __content_form_urlencoded__:
    case __content_json__:
      xhr.setRequestHeader('Content-type', options.contentType)
      break
    case __content_multipart__:
      if(options.multipartBoundary) {
        xhr.setRequestHeader('Content-type', __content_multipart__ + '; boundary=' + options.multipartBoundary)
      }
      break
    default:
      throw new Error('Unsupported content type ' + options.contentType)
  }
}

function _ajaxNoContentTypeNeeded(options) {
  return(options.headers && options.headers['Content-type'] || !options.method.match(__methods_with_data__))
}

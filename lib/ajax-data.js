/** global: __methods_with_data__ */
/** global: __content_form_urlencoded__ */
/** global: __content_json__ */
/** global: __content_multipart__ */

function _ajaxData(options) {
  if(!_ajaxNeedToProcessData(options)) {
    return
  }
  if(!options.contentType) {
    options.contentType = __content_form_urlencoded__
  }
  _ajaxProcessData(options)
}

function _ajaxProcessData(options) {
  switch(options.contentType.toLowerCase()) {
    case __content_form_urlencoded__:
      _ajaxUrlencodedData(options)
      break
    case __content_json__:
      options.data = JSON.stringify(options.data)
      break
    case __content_multipart__:
      _ajaxMultipart(options)
      break
    default:
      throw new Error('Unsupported content type ' + options.contentType)
  }
}

function _ajaxNeedToProcessData(options) {
  return (options.method.match(__methods_with_data__) && options.data && 'object' === typeof(options.data))
}

function _ajaxUrlencodedData(options) {
  var vars = [ ]
  /* eslint-disable guard-for-in */
  for (var key in options.data) {
    vars.push(key + '=' + encodeURIComponent(options.data[key]))
  }
  /* eslint-enable guard-for-in */
  options.data = vars.join('&')
}

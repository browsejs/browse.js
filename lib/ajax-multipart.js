function _ajaxMultipart(options) {
  if(_canUseFormData()) {
    options.data = _ajaxFormData(options.data)
  }
  else {
    var data = _ajaxMultipartString(options.data)
    if('use-iframe' !== data) {
      options.data = data.string
      options.multipartBoundary = data.boundary
    }
    else {
      options.useIframe = true
    }
  }
}

function _canUseFormData() {
  return(window.FormData && !_isSafari5())
}

function _isForm(data) {
  return(_isDOMElement(data) && 'form' === data.tagName.toLowerCase())
}

function _isSafari5() {
  var ua = window.navigator.userAgent
  return (ua.match(/ Safari\//) && ua.match(/Version\/5.0/))
}

function _ajaxFormData(data) {
  if(_isForm(data)) {
    return new window.FormData(data)
  }
  else {
    var formData = new window.FormData()
    /* eslint-disable guard-for-in */
    for(var key in data) {
      formData.append(key, data[key])
    }
    /* eslint-enable guard-for-in */
    return formData
  }
}

function _ajaxMultipartString(data) {
  if(_isForm(data)) {
    return _noFilesInForm(data) ? _ajaxDataToMultipartString(_formToObject(data)) : 'use-iframe'
  }
  else {
    return _ajaxDataToMultipartString(data)
  }
}

function _noFilesInForm(form) {
  var elements = form.elements
  for(var idx = 0; idx < elements.length; ++idx) {
    if('file' === elements[idx].type.toLowerCase()) {
      if(elements[idx].files && elements[idx].files.length) {
        return false
      }
    }
  }
  return true
}

function _formToObject(form) {
  var elements = form.elements
  var data = { }
  for(var idx = 0; idx < elements.length; ++idx) {
    var element = elements[idx]
    if(!element.name || 'file' === element.type.toLowerCase()) {
      continue
    }
    data[element.name] = $_(element).value()
  }
  return data
}

function _ajaxDataToMultipartString(data) {
  var boundary = '---------------------------' + Math.random().toString().substr(2)
  var str = ''
  /* eslint-disable guard-for-in */
  for(var key in data) {
    str += '--' + boundary
      + '\r\nContent-Disposition: form-data; name="' + key + '"'
      //+ '\r\nContent-type: application/octet-stream'
      + '\r\n\r\n' + data[key] + '\r\n'
  }
  /* eslint-enable guard-for-in */
  str += '--' + boundary + '--\r\n'
  return { string: str, boundary: boundary }
}

function _createHtmlEvent(type) {
  var e
  if('createEvent' in document) {
    e = document.createEvent('Event')
    e.initEvent(type, 'change' !== type, true)
  }
  else /*if('createEventObject' in document)*/ {
    e = document.createEventObject()
    e.type = type
  }
  e.synthetic = true
  return e
}

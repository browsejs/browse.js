/*function _createGenericEvent(type, params) {
  var e
  if('createEvent' in document) {
    e = document.createEvent('Event')
    e.initEvent(type, 'change' !== type, true)
  }
  else if('createEventObject' in document) {
    e = document.createEventObject()
    e.type = type
  }
  else { //if('Event' in window)
    e = new window.Event(type)
  }
  e.synthetic = true
  if(params) {
    for(var key in params) {
      if(params.hasOwnProperty(key)) {
        e[key] = params[key]
      }
    }
  }
  return e
}*/

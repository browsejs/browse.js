/** global: browse */

browse.prototype.value = function(value) {
  if(undefined === value) {
    return _getControlValue(this.element)
  }
  _setControlValue(this.element, value)
  return this
}

function _getControlValue(element) {
  if('value' in element) {
    var def
    if(!element.value && (def = _handleFalsyControlValue(element))) {
      return def
    }
    return element.value
  }
  throw new TypeError('Element does not support entering or selecting a value')
}

function _setControlValue(element, value) {
  if('value' in element) {
    element.value = value
    var tagName = element.tagName.toLowerCase()
    if('select' === tagName) {
      _setSelectValue(element, value)
    }
    else if('textarea' === tagName) {
      element.innerHTML = value
    }
    return
  }
  throw new TypeError('Element does not support entering or selecting a value')
}

var _onTypes = ['radio', 'checkbox']

function _handleFalsyControlValue(element) {
  var tagName = element.tagName.toLowerCase()
  if('option' === tagName) {
    return element.innerHTML
  }
  if('input' === tagName && -1 !== _onTypes.indexOf(element.type)) {
    return 'on'
  }
  return undefined
}

function _setSelectValue(element, value) {
  var options = element.getElementsByTagName('option'), idx
  for(idx = 0; idx < options.length; ++idx) {
    var option = options[idx]
    if(value === option.value) {
      option.setAttribute('selected', '')
    }
    else {
      option.removeAttribute('selected')
    }
  }
}

/** global: browse */

browse.prototype.style = function(property, value) {
  if(!property) {
    return null
  }
  if(undefined === value) {
    return _getStyle(this.element, property)
  }
  this.element.style[_fromHyphenatedToCamelCase(property)] = value
  return this
}

function _getStyle(element, property) {
  if(document.defaultView && document.defaultView.getComputedStyle) {
    return document.defaultView.getComputedStyle(element, null).getPropertyValue(property)
  }
  else /*if(element.currentStyle)*/ {
    var value = element.currentStyle[_fromHyphenatedToCamelCase(property)]
    if(/^\d+(ch|cm|em|ex|in|mm|%|pc|pt|rem|vh|vw)?$/i.test(value)) { 
      value = _handleCssUnit(element, value)
    }
    return value
  }
}

function _fromHyphenatedToCamelCase(property) {
  return property.replace(/\-(\w)/g, function(str, letter) {
    return letter.toUpperCase()
  })
}

function _handleCssUnit(element, value) {
  // courtesy: https://stackoverflow.com/a/2664055/3348386
  var saveLeft = element.style.left,
    saveRtLeft = element.runtimeStyle.left
  element.runtimeStyle.left = element.currentStyle.left
  element.style.left = value
  value = element.style.pixelLeft + "px"
  element.style.left = saveLeft
  element.runtimeStyle.left = saveRtLeft
  return value
}

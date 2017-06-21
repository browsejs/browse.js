/** global: browse */

var
  __ie_opacity_regex__ = new RegExp(/alpha\(opacity=([\d\.]+)\)/),
  __ie_opacity_expr__ = /alpha\(opacity=[\d\.]+\)/

browse.prototype.opacity = function(value) {
  var element = this.element
  if(undefined === value) {
    return _getOpacity(element.style)
  }
  _setOpacity(element.style, value)
  return this
}

function _getOpacity(style) {
  if('opacity' in style) {
    return style.opacity !== '' ? parseFloat(style.opacity) : 1.0
  }
  else /*if('filter' in style)*/ {
    var match = __ie_opacity_regex__.exec(style.filter)
    return null !== match ? parseFloat(match[1]) / 100 : 1.0
  }
}

function _setOpacity(style, value) {
  value = parseFloat(value)
  if(isNaN(value) || value < 0 || value > 1) {
    throw Error('Opacity value must be >= 0 and <= 1')
  }
  if('opacity' in style) {
    style.opacity = value
  }
  else /*if('filter' in style)*/ {
    var match = __ie_opacity_regex__.exec(style.filter)
    var valueStr = 'alpha(opacity=' + (100 * value) + ')'
    style.filter = (null === match)
      ? valueStr
      : style.filter.replace(__ie_opacity_expr__, valueStr)
  }
}

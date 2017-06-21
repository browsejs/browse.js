/** global: browse */

browse.prototype.show = function() {
  var style = this.element.style
  style.display = style.$_savedDisplay || _defaultDisplayProperty(this.element.nodeName)
  return this
}

browse.prototype.hide = function() {
  var style = this.element.style
  if('none' !== style.display) {
    style.$_savedDisplay = style.display || _defaultDisplayProperty(this.element.nodeName)
  }
  style.display = 'none'
  return this
}

var _defaultDisplays = { }

function _defaultDisplayProperty(nodeName) {
  if(!(nodeName in _defaultDisplays)) {
    var temp = document.createElement(nodeName)
    document.body.appendChild(temp)
    _defaultDisplays[nodeName] = $_(temp).style('display')
    temp.parentNode.removeChild(temp)
  }
  return _defaultDisplays[nodeName]
}

/** global: browse */

browse.prototype.topLeft = function() {
  if(this.element.getBoundingClientRect) {
    var rect = this.element.getBoundingClientRect()
    return {
      top: rect.top + _getCurrY() - browse.capabilities.adjustOffsetY,
      left: rect.left + _getCurrX() - browse.capabilities.adjustOffsetX
    }
  }
  throw new Error('No support for getBoundingClientRect')
}

function _getCurrX() {
  return window.scrollX || window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft
}

function _getCurrY() {
  return window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
}

browse.getCurrX = _getCurrX
browse.getCurrY = _getCurrY

/** global: browse */

browse.prototype.remove = function() {
  this.element.parentNode.removeChild(this.element)
  this.element = undefined
}

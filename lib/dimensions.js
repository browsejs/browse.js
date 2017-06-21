/** global: browse */

browse.prototype.height = function() {
  return this.element.offsetHeight
}

browse.prototype.innerHeight = function() {
  return this.element.scrollHeight
}

browse.windowHeight = function() {
  return (window.innerHeight || document.documentElement.clientHeight/* || document.body.clientHeight*/)
}

browse.prototype.width = function() {
  return this.element.offsetWidth
}

browse.prototype.innerWidth = function() {
  return this.element.scrollWidth
}

browse.windowWidth = function() {
  return (window.innerWidth || document.documentElement.clientWidth/* || document.body.clientWidth*/)
}

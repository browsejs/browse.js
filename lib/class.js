/** global: browse */

browse.prototype.getClass = function() {
  try {
    return this.element.classList.value || Array.prototype.join.call(this.element.classList, ' ')
  }
  catch(e) {
    return this.element.className
  }
}

browse.prototype.hasClass = function(className) {
  if(!className || className.match(/ /)) {
    throw new Error('Expected a valid class name')
  }
  var element = this.element
  try {
    return element.classList.contains(className)
  }
  catch(e) {
    return ((' '+element.className+' ').indexOf(' '+className+' ') > -1)
  }
}

browse.prototype.addClass = function(className) {
  if(!className || className.match(/ /)) {
    throw new Error('Expected a valid class name')
  }
  var element = this.element
  try {
    element.classList.add(className)
  }
  catch(e) {
    if((' '+element.className+' ').indexOf(' '+className+' ') === -1) {
      element.className += ' ' + className
    }
  }
  return this
}

browse.prototype.removeClass = function(className) {
  if(!className || className.match(/ /)) {
    throw new Error('Expected a valid class name')
  }
  var element = this.element
  try {
    element.classList.remove(className)
  }
  catch(e) {
    var existingWithSpaces = ' ' + element.className + ' '
    var argumentWithSpaces = new RegExp(' ' + className + ' ', 'g')
    if(existingWithSpaces.match(argumentWithSpaces)) {
      element.className = existingWithSpaces.replace(argumentWithSpaces, '').replace(/^\s+|\s+$/g, '')
    }
  }
  return this
}

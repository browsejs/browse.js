window.Node = window.Node || {
  ELEMENT_NODE: 1,
  TEXT_NODE: 3,
  COMMENT_NODE: 8,
  DOCUMENT_NODE: 9
}

var
  __node_type_element__ = window.Node.ELEMENT_NODE,
  __node_type_text__ = window.Node.TEXT_NODE,
  __node_type_comment__ = window.Node.COMMENT_NODE,
  __node_type_document__ = window.Node.DOCUMENT_NODE

/** global: browse */

browse.prototype.firstChild = function() {
  if('firstElementChild' in this.element) {
    return browse(this.element.firstElementChild)
  }
  var child = this.element.firstChild
  while(child && __node_type_element__ !== child.nodeType) {
    child = child.nextSibling
  }
  return browse(child)
}

browse.prototype.lastChild = function() {
  if('lastElementChild' in this.element) {
    return browse(this.element.lastElementChild)
  }
  var child = this.element.lastChild
  while(child && __node_type_element__ !== child.nodeType) {
    child = child.previousSibling
  }
  return browse(child)
}

browse.prototype.next = function() {
  if('nextElementSibling' in this.element) {
    return browse(this.element.nextElementSibling)
  }
  var next = this.element.nextSibling
  while(next && __node_type_element__ !== next.nodeType) {
    next = next.nextSibling
  }
  return browse(next)
}

browse.prototype.previous = function() {
  if('previousElementSibling' in this.element) {
    return browse(this.element.previousElementSibling)
  }
  var previous = this.element.previousSibling
  while(previous && __node_type_element__ !== previous.nodeType) {
    previous = previous.previousSibling
  }
  return browse(previous)
}

browse.prototype.index = function() {
  if(-1 !== ['html', 'body'].indexOf(this.element.tagName.toLowerCase())) {
    throw new Error('Method not supported on this element')
  }
  var child = this.element.parentNode.firstChild,
    index = 0
  while(child !== this.element) {
    if(__node_type_element__ === child.nodeType) {
      ++index
    }
    child = child.nextSibling
  }
  return index
}

browse.prototype.nthChild = function(idx) {
  var child = this.element.firstChild
  while(child) {
    while(child && __node_type_element__ !== child.nodeType) {
      child = child.nextSibling
    }
    if(child && 0 === idx) {
      return browse(child)
    }
    --idx
    child = child.nextSibling
  }
  return null
}

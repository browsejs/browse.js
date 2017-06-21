/** global: browse */

browse.prototype.append = function(html, tagName) {
  if(!_safeInsertAdjacentHtml(this.element, 'beforeend', html)) {
    var temp = _deriveTagAndSafeSetInnerHTML(this.element, html, tagName)
    while(temp.childNodes.length) {
      this.element.appendChild(temp.childNodes[0])
    }
  }
  return this
}

browse.prototype.prepend = function(html, tagName) {
  if(!_safeInsertAdjacentHtml(this.element, 'afterbegin', html)) {
    var temp = _deriveTagAndSafeSetInnerHTML(this.element, html, tagName)
    var firstChild = this.element.firstChild || undefined
    while(temp.childNodes.length) {
      this.element.insertBefore(temp.childNodes[0], firstChild)
    }
  }
  return this
}

browse.prototype.after = function(html, tagName) {
  if(-1 === ['html', 'body'].indexOf(this.element.tagName.toLowerCase())
    && !_safeInsertAdjacentHtml(this.element, 'afterend', html))
  {
    var temp = _deriveTagAndSafeSetInnerHTML(this.element.parentNode, html, tagName, 'div')
    var next = this.next() && this.next().element || undefined
    while(temp.childNodes.length) {
      this.element.parentNode.insertBefore(temp.childNodes[0], next)
    }
  }
  return this
}

browse.prototype.before = function(html, tagName) {
  if(-1 === ['html', 'body'].indexOf(this.element.tagName.toLowerCase())
    && !_safeInsertAdjacentHtml(this.element, 'beforebegin', html))
  {
    var temp = _deriveTagAndSafeSetInnerHTML(this.element.parentNode, html, tagName, 'div')
    while(temp.childNodes.length) {
      this.element.parentNode.insertBefore(temp.childNodes[0], this.element)
    }
  }
  return this
}

var __ie_invalid_target__ = /Invalid target element for this operation/

function _safeInsertAdjacentHtml(element, spec, html) {
  try {
    element.insertAdjacentHTML(spec, html)
    return true
  }
  catch(e) {
    return null !== e.message.match(__ie_invalid_target__)
  }
}

function _deriveTagAndSafeSetInnerHTML(element, html, tagName, defTag) {
  tagName = tagName || element && element.tagName.toLowerCase().replace(/body/, '') || defTag
  var temp = document.createElement(tagName)
  try {
    temp.innerHTML = html
  }
  catch(e) {
    // do nothing
  }
  return temp
}

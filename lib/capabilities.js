/** global: browse */

browse.capabilities = {
  'adjustOffsetX'   : 0,
  'adjustOffsetY'   : 0,
  'absolutePosition': false,
  'fixedPosition'   : false,
  'boxSizing'       : false,
  'css3Selectors'   : false
}

function _detectionInsertStyle(rules) {
  var noBody = !document.body
  var body = document.body || document.createElement('body')
  body.created = noBody
  var div = document.createElement('div')
  div.id = 'browse-detector'
  var style = document.createElement('style')
  style.type = 'text/css';
  if(style.styleSheet) {
    style.styleSheet.cssText = rules
  }
  else {
    style.appendChild(document.createTextNode(rules))
  }
  (!body.created ? div : body).appendChild(style)
  body.appendChild(div)
  if(body.created) {
    document.documentElement.appendChild(body)
  }
  return {body:body, div:div}
}

function _detectionInsertContent(html) {
  var noBody = !document.body
  var body = document.body || document.createElement('body')
  body.created = noBody
  var div = document.createElement('div')
  if(!_safeInsertAdjacentHtml(div, 'beforeend', html)) {
    try {
      div.innerHTML = html
    }
    catch(e) {
      //
    }
  }
  body.appendChild(div)
  if(body.created) {
    document.documentElement.appendChild(body)
  }
  return {body:body, div:div}
}

function _detectionCleanup(created) {
  if(created.body.created) {
    created.body.parentNode.removeChild(created.body)
  }
  else {
    created.div.parentNode.removeChild(created.div)
  }
}

function _detectBodyOffset() {
  var created = _detectionInsertContent('')
  try {
    var rect = document.body.getBoundingClientRect()
    var marginLeft = parseInt(_getStyle(created.body, 'margin-left'), 10)
    var marginTop = parseInt(_getStyle(created.body, 'margin-top'), 10)
    browse.capabilities.adjustOffsetY = rect.top + _getCurrY() - marginTop
    browse.capabilities.adjustOffsetX = rect.left + _getCurrX() - marginLeft
  }
  catch(e) {
    // ignore
  }
  _detectionCleanup(created)
}

function _detectAbsolutePosition() {
  var created = _detectionInsertContent('<div id=test-absolute style=position:absolute;left:-800px></div>')
  var s = _remPosAndScroll(0, 0)
  var left = _getElementLeftById('test-absolute')
  browse.capabilities.absolutePosition = (left === -800)
  window.scrollTo(s.sX, s.sY)
  _detectionCleanup(created)
}

function _detectFixedPosition() {
  var created = _detectionInsertContent('<div id=test-fixed style=position:fixed;left:-800px></div>')
  var s = _remPosAndScroll(100, 100)
  var left = _getElementLeftById('test-fixed')
  browse.capabilities.fixedPosition = (left === -800)
  window.scrollTo(s.sX, s.sY)
  _detectionCleanup(created)
}

function _detectBoxSizing() {
  var created = _detectionInsertStyle('#browse-detector{box-sizing:border-box;height:40px;padding:4px}')
  browse.capabilities.boxSizing = (created.div.style.boxSizing && 40 === created.div.offsetHeight)
  _detectionCleanup(created)
}

function _detectCss3Selectors() {
  var created = _detectionInsertContent('<div></div><p></p>')
  try {
    var find = document.querySelectorAll('div ~ p')
    browse.capabilities.css3Selectors = (null !== find)
  }
  catch (e) {
    // ignore
  }
  _detectionCleanup(created)
}

function _remPosAndScroll(x, y) {
  var s = {
    sX: _getCurrX(),
    sY: _getCurrY()
  }
  window.scrollTo(x, y)
  return s
}

function _getElementLeftById(id) {
  var element = document.getElementById(id)
  try {
    var rect = element.getBoundingClientRect()
    return (rect.left - browse.capabilities.adjustOffsetX)
  }
  catch(e) {
    return 0
  }
}

_detectBodyOffset()
_detectAbsolutePosition()
_detectFixedPosition()
_detectBoxSizing()
_detectCss3Selectors()

( /* eslint-disable complexity */ /* eslint-disable max-statements */ /* eslint-disable no-shadow-restricted-names */
  function(ns, undefined) {
    /* eslint-enable complexity */
    /* eslint-enable max-statements */ /* eslint-enable no-shadow-restricted-names */
    function browse(element) {
      if (!element || !_isDOMElement(element)) {
        return null
      }
      if (element.$_) {
        return element.$_
      }
      return new _create(element)
    }

    function _create(element) {
      this.element = element
      this.element.$_ = this
    }

    _create.prototype = browse.prototype

    /*function _isDOMNode(obj){
      return (
        typeof Node === "object"
        ? obj instanceof Node
        : obj && typeof obj === "object" && typeof obj.nodeType === "number" && typeof obj.nodeName === "string"
      )
    }*/

    function _isDOMElement(obj) {
      return (
        typeof window.HTMLElement === "object" ?
        obj instanceof window.HTMLElement :
        null !== obj && typeof obj === "object" && obj.nodeType === 1 && typeof obj.nodeName === "string"
      )
    }

    /** global: ns */
    ns = window.$_ = browse

    function _forEach(callback) {
      for (var idx = 0; idx < this.length; ++idx) {
        callback(this[idx], idx, this)
      }
    }

    function _every(callback) {
      for (var idx = 0; idx < this.length; ++idx) {
        if (!callback(this[idx], idx, this)) {
          return
        }
      }
    }

    /* eslint-disable no-extend-native */
    Array.prototype.forEach = Array.prototype.forEach || _forEach
    Array.prototype.every = Array.prototype.every || _every

    Array.prototype.indexOf = Array.prototype.indexOf || function(member) {
      for (var idx = 0; idx < this.length; ++idx) {
        if (this[idx] === member) {
          return idx
        }
      }
      return -1
    }

    Array.prototype.remove = function(member, howMany) {
      var idx = this.indexOf(member)
      if (-1 !== idx) {
        this.splice(idx, howMany || 1)
      }
    }
    /* eslint-enable no-extend-native */

    var _arrayTypes = ['NodeList', 'HTMLCollection']

    _arrayTypes.forEach(function(type) {
      if (window[type]) {
        window[type].prototype.forEach = window[type].prototype.forEach || _forEach
        window[type].prototype.every = window[type].prototype.every || _every
      }
    })

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
      if ('firstElementChild' in this.element) {
        return browse(this.element.firstElementChild)
      }
      var child = this.element.firstChild
      while (child && __node_type_element__ !== child.nodeType) {
        child = child.nextSibling
      }
      return browse(child)
    }

    browse.prototype.lastChild = function() {
      if ('lastElementChild' in this.element) {
        return browse(this.element.lastElementChild)
      }
      var child = this.element.lastChild
      while (child && __node_type_element__ !== child.nodeType) {
        child = child.previousSibling
      }
      return browse(child)
    }

    browse.prototype.next = function() {
      if ('nextElementSibling' in this.element) {
        return browse(this.element.nextElementSibling)
      }
      var next = this.element.nextSibling
      while (next && __node_type_element__ !== next.nodeType) {
        next = next.nextSibling
      }
      return browse(next)
    }

    browse.prototype.previous = function() {
      if ('previousElementSibling' in this.element) {
        return browse(this.element.previousElementSibling)
      }
      var previous = this.element.previousSibling
      while (previous && __node_type_element__ !== previous.nodeType) {
        previous = previous.previousSibling
      }
      return browse(previous)
    }

    browse.prototype.index = function() {
      if (-1 !== ['html', 'body'].indexOf(this.element.tagName.toLowerCase())) {
        throw new Error('Method not supported on this element')
      }
      var child = this.element.parentNode.firstChild,
        index = 0
      while (child !== this.element) {
        if (__node_type_element__ === child.nodeType) {
          ++index
        }
        child = child.nextSibling
      }
      return index
    }

    browse.prototype.nthChild = function(idx) {
      var child = this.element.firstChild
      while (child) {
        while (child && __node_type_element__ !== child.nodeType) {
          child = child.nextSibling
        }
        if (child && 0 === idx) {
          return browse(child)
        }
        --idx
        child = child.nextSibling
      }
      return null
    }

    /** global: browse */

    browse.prototype.append = function(html, tagName) {
      if (!_safeInsertAdjacentHtml(this.element, 'beforeend', html)) {
        var temp = _deriveTagAndSafeSetInnerHTML(this.element, html, tagName)
        while (temp.childNodes.length) {
          this.element.appendChild(temp.childNodes[0])
        }
      }
      return this
    }

    browse.prototype.prepend = function(html, tagName) {
      if (!_safeInsertAdjacentHtml(this.element, 'afterbegin', html)) {
        var temp = _deriveTagAndSafeSetInnerHTML(this.element, html, tagName)
        var firstChild = this.element.firstChild || undefined
        while (temp.childNodes.length) {
          this.element.insertBefore(temp.childNodes[0], firstChild)
        }
      }
      return this
    }

    browse.prototype.after = function(html, tagName) {
      if (-1 === ['html', 'body'].indexOf(this.element.tagName.toLowerCase()) &&
        !_safeInsertAdjacentHtml(this.element, 'afterend', html)) {
        var temp = _deriveTagAndSafeSetInnerHTML(this.element.parentNode, html, tagName, 'div')
        var next = this.next() && this.next().element || undefined
        while (temp.childNodes.length) {
          this.element.parentNode.insertBefore(temp.childNodes[0], next)
        }
      }
      return this
    }

    browse.prototype.before = function(html, tagName) {
      if (-1 === ['html', 'body'].indexOf(this.element.tagName.toLowerCase()) &&
        !_safeInsertAdjacentHtml(this.element, 'beforebegin', html)) {
        var temp = _deriveTagAndSafeSetInnerHTML(this.element.parentNode, html, tagName, 'div')
        while (temp.childNodes.length) {
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
      } catch (e) {
        return null !== e.message.match(__ie_invalid_target__)
      }
    }

    function _deriveTagAndSafeSetInnerHTML(element, html, tagName, defTag) {
      tagName = tagName || element && element.tagName.toLowerCase().replace(/body/, '') || defTag
      var temp = document.createElement(tagName)
      try {
        temp.innerHTML = html
      } catch (e) {
        // do nothing
      }
      return temp
    }

    /** global: browse */

    browse.prototype.remove = function() {
      this.element.parentNode.removeChild(this.element)
      this.element = undefined
    }

    /** global: browse */

    browse.prototype.height = function() {
      return this.element.offsetHeight
    }

    browse.prototype.innerHeight = function() {
      return this.element.scrollHeight
    }

    browse.windowHeight = function() {
      return (window.innerHeight || document.documentElement.clientHeight /* || document.body.clientHeight*/ )
    }

    browse.prototype.width = function() {
      return this.element.offsetWidth
    }

    browse.prototype.innerWidth = function() {
      return this.element.scrollWidth
    }

    browse.windowWidth = function() {
      return (window.innerWidth || document.documentElement.clientWidth /* || document.body.clientWidth*/ )
    }

    /** global: browse */

    browse.prototype.getClass = function() {
      try {
        return this.element.classList.value || Array.prototype.join.call(this.element.classList, ' ')
      } catch (e) {
        return this.element.className
      }
    }

    browse.prototype.hasClass = function(className) {
      if (!className || className.match(/ /)) {
        throw new Error('Expected a valid class name')
      }
      var element = this.element
      try {
        return element.classList.contains(className)
      } catch (e) {
        return ((' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1)
      }
    }

    browse.prototype.addClass = function(className) {
      if (!className || className.match(/ /)) {
        throw new Error('Expected a valid class name')
      }
      var element = this.element
      try {
        element.classList.add(className)
      } catch (e) {
        if ((' ' + element.className + ' ').indexOf(' ' + className + ' ') === -1) {
          element.className += ' ' + className
        }
      }
      return this
    }

    browse.prototype.removeClass = function(className) {
      if (!className || className.match(/ /)) {
        throw new Error('Expected a valid class name')
      }
      var element = this.element
      try {
        element.classList.remove(className)
      } catch (e) {
        var existingWithSpaces = ' ' + element.className + ' '
        var argumentWithSpaces = new RegExp(' ' + className + ' ', 'g')
        if (existingWithSpaces.match(argumentWithSpaces)) {
          element.className = existingWithSpaces.replace(argumentWithSpaces, '').replace(/^\s+|\s+$/g, '')
        }
      }
      return this
    }

    /** global: browse */

    browse.prototype.topLeft = function() {
      if (this.element.getBoundingClientRect) {
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

    /** global: browse */

    var eventTypes = ['click', 'keyup', 'change']

    eventTypes.forEach(function(type) {
      browse.prototype['on' + type] = function(callback) {
        _addEventHandler(this.element, callback, type)
        return this
      }
      browse['on' + type] = function(callback) {
        _addEventHandler(document, callback, type)
      }
    })

    var
      __html_events_regex__ = /^(change)$/,
      __keyboard_events_regex__ = /^(keyup)$/,
      __mouse_events_regex__ = /^(click)$/

    browse.prototype.trigger = function(type, params) {
      _triggerEvent(this.element, type, params)
      return this
    }

    browse.trigger = function(type, params) {
      _triggerEvent(document, type, params)
    }

    function _addEventHandler(element, callback, eventName) {
      if ('addEventListener' in element) {
        element.addEventListener(eventName, callback, false)
      } else {
        element.attachEvent('on' + eventName, function() {
          callback.apply(element, arguments)
        })
      }
    }

    function _dispatchEvent(element, e) {
      if ('dispatchEvent' in element) {
        element.dispatchEvent(e)
      } else /*if('fireEvent' in element)*/ {
        element.fireEvent('on' + e.type, e)
      }
    }

    function _triggerEvent(element, type, params) {
      if (type.match(__html_events_regex__)) {
        _dispatchEvent(element, _createHtmlEvent(type))
      } else if (type.match(__keyboard_events_regex__)) {
        _dispatchEvent(element, _createKeyboardEvent(type, params))
      } else if (type.match(__mouse_events_regex__)) {
        _dispatchEvent(element, _createMouseEvent(type, params))
      } else {
        throw new Error('Unsupported event ' + type)
      }
    }

    function _eventDataFromDefsAndParams(defs, allowed, params) {
      var input = {}
      /* eslint-disable guard-for-in */
      for (var key in defs) {
        input[key] = defs[key]
      }
      /* eslint-enable guard-for-in */
      if (params) {
        for (key in params) {
          if (-1 !== allowed.indexOf(key)) {
            input[key] = params[key]
          }
        }
      }
      return input
    }

    var _mouseEventDefs = {
        bubbles: true,
        cancelable: true,
        view: window,
        detail: 0,
        screenX: 0,
        screenY: 0,
        clientX: 0,
        clientY: 0,
        ctrlKey: false,
        altKey: false,
        shiftKey: false,
        metaKey: false,
        button: 0,
        buttons: 0,
        relatedTarget: null,
        region: null
      },
      _allowedMouseEventParams = [
        'ctrlKey',
        'altKey',
        'shiftKey',
        'metaKey',
        'button',
        'buttons'
      ]

    function _createMouseEvent(type, params) {
      var e,
        input = _eventDataFromDefsAndParams(_mouseEventDefs, _allowedMouseEventParams, params)
      _processMouseEventType(input, type)
      if ('MouseEvent' in window) {
        e = _nonIeMouseEvent(type, input)
      } else /*if('createEventObject' in document)*/ {
        e = _ieMouseEvent(type, input)
      }
      e.synthetic = true
      return e
    }

    function _nonIeMouseEvent(type, input) {
      var e
      try {
        e = new window.MouseEvent(type, input)
      } catch (err) {
        e = document.createEvent('MouseEvents')
        e.initMouseEvent(type, input.bubbles, input.cancelable, input.view,
          input.detail, input.screenX, input.screenY, input.clientX,
          input.clientY, input.ctrlKey, input.altKey, input.shiftKey,
          input.metaKey, input.button, input.relatedTarget)
      }
      return e
    }

    function _ieMouseEvent(type, input) {
      var e = document.createEventObject()
      e.type = type
      /* eslint-disable guard-for-in */
      for (var key in input) {
        e[key] = input[key]
      }
      /* eslint-enable guard-for-in */
      return e
    }

    function _processMouseEventType(input, type) {
      input.cancelable = (type !== 'mousemove')
      /*input.relatedTarget =
        /^(mouseenter|mouseover|mouseout|mouseleave)$/.test(type)
        ? document.body.parentNode
        : null*/
    }

    var _keyboardEventDefs = {
        bubbles: true,
        cancelable: true,
        view: window,
        key: '',
        code: '',
        location: 0,
        ctrlKey: false,
        altKey: false,
        shiftKey: false,
        metaKey: false,
        repeat: false,
        isComposing: false,
        charCode: 0,
        keyCode: 0,
        which: 0
      },
      _allowedKeyboardEventParams = [
        'key',
        'code',
        'location',
        'ctrlKey',
        'altKey',
        'shiftKey',
        'metaKey',
        'repeat',
        'isComposing',
        'charCode',
        'keyCode'
      ],
      _notAllowedKeyboardEventParams = [
        'bubbles',
        'cancelable',
        'view',
        'which'
      ]

    if ('KeyboardEvent' in window) {
      var temp
      try {
        temp = new window.KeyboardEvent('keyup', {})
        /* eslint-disable guard-for-in */
        for (var key in temp) {
          var type = typeof(temp[key])
          if ('function' !== type && 'object' !== type && key.match(/^[a-z]/) &&
            -1 === _allowedKeyboardEventParams.indexOf(key) &&
            -1 === _notAllowedKeyboardEventParams.indexOf(key)) {
            _allowedKeyboardEventParams.push(key)
          }
        }
        /* eslint-enable guard-for-in */
      } catch (e) {
        // ignore
      }
    }

    function _createKeyboardEvent(type, params) {
      var e,
        input = _eventDataFromDefsAndParams(_keyboardEventDefs, _allowedKeyboardEventParams, params)
      if ('KeyboardEvent' in window || 'createEvent' in document) {
        e = _nonIeKbEvent(type, input)
      } else /*if('createEventObject' in document)*/ {
        e = _ieKbEvent(type, input)
      }
      e.synthetic = true
      return e
    }

    function _nonIeKbEvent(type, input) {
      var e
      try {
        e = new window.KeyboardEvent(type, input)
        var keys = ['keyCode', 'location']
        keys.forEach(function(key) {
          if (e[key] !== input[key]) {
            Object.defineProperty(e, key, {
              get: function() {
                return input[key]
              }
            })
          }
        })
      } catch (err) {
        e = document.createEvent('Events')
        e.initEvent(type, input.bubbles, input.cancelable)
        e.view = input.view
        for (var key in input) {
          if (-1 !== _allowedKeyboardEventParams.indexOf(key)) {
            e[key] = input[key]
          }
        }
      }
      return e
    }

    function _ieKbEvent(type, input) {
      var e = document.createEventObject()
      e.type = type
      /* eslint-disable guard-for-in */
      for (var key in input) {
        e[key] = input[key]
      }
      /* eslint-enable guard-for-in */
      return e
    }

    /*
    var _modifierMap = {
      'ctrlKey': 'Control',
      'shiftKey': 'Shift',
      'altKey': 'Alt',
      'metaKey': 'Meta'
    }

    function _getModifierArg(input) {
      var used = [ ]
      for(var key in _modifierMap) {
        if(input[key]) {
          used.push(_modifierMap[key])
        }
      }
      return used.join(' ')
    }*/

    function _createHtmlEvent(type) {
      var e
      if ('createEvent' in document) {
        e = document.createEvent('Event')
        e.initEvent(type, 'change' !== type, true)
      } else /*if('createEventObject' in document)*/ {
        e = document.createEventObject()
        e.type = type
      }
      e.synthetic = true
      return e
    }

    /** global: browse */

    browse.prototype.value = function(value) {
      if (undefined === value) {
        return _getControlValue(this.element)
      }
      _setControlValue(this.element, value)
      return this
    }

    function _getControlValue(element) {
      if ('value' in element) {
        var def
        if (!element.value && (def = _handleFalsyControlValue(element))) {
          return def
        }
        return element.value
      }
      throw new TypeError('Element does not support entering or selecting a value')
    }

    function _setControlValue(element, value) {
      if ('value' in element) {
        element.value = value
        var tagName = element.tagName.toLowerCase()
        if ('select' === tagName) {
          _setSelectValue(element, value)
        } else if ('textarea' === tagName) {
          element.innerHTML = value
        }
        return
      }
      throw new TypeError('Element does not support entering or selecting a value')
    }

    var _onTypes = ['radio', 'checkbox']

    function _handleFalsyControlValue(element) {
      var tagName = element.tagName.toLowerCase()
      if ('option' === tagName) {
        return element.innerHTML
      }
      if ('input' === tagName && -1 !== _onTypes.indexOf(element.type)) {
        return 'on'
      }
      return undefined
    }

    function _setSelectValue(element, value) {
      var options = element.getElementsByTagName('option'),
        idx
      for (idx = 0; idx < options.length; ++idx) {
        var option = options[idx]
        if (value === option.value) {
          option.setAttribute('selected', '')
        } else {
          option.removeAttribute('selected')
        }
      }
    }

    /** global: browse */

    browse.prototype.style = function(property, value) {
      if (!property) {
        return null
      }
      if (undefined === value) {
        return _getStyle(this.element, property)
      }
      this.element.style[_fromHyphenatedToCamelCase(property)] = value
      return this
    }

    function _getStyle(element, property) {
      if (document.defaultView && document.defaultView.getComputedStyle) {
        return document.defaultView.getComputedStyle(element, null).getPropertyValue(property)
      } else /*if(element.currentStyle)*/ {
        var value = element.currentStyle[_fromHyphenatedToCamelCase(property)]
        if (/^\d+(ch|cm|em|ex|in|mm|%|pc|pt|rem|vh|vw)?$/i.test(value)) {
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

    /** global: browse */

    var
      __ie_opacity_regex__ = new RegExp(/alpha\(opacity=([\d\.]+)\)/),
      __ie_opacity_expr__ = /alpha\(opacity=[\d\.]+\)/

    browse.prototype.opacity = function(value) {
      var element = this.element
      if (undefined === value) {
        return _getOpacity(element.style)
      }
      _setOpacity(element.style, value)
      return this
    }

    function _getOpacity(style) {
      if ('opacity' in style) {
        return style.opacity !== '' ? parseFloat(style.opacity) : 1.0
      } else /*if('filter' in style)*/ {
        var match = __ie_opacity_regex__.exec(style.filter)
        return null !== match ? parseFloat(match[1]) / 100 : 1.0
      }
    }

    function _setOpacity(style, value) {
      value = parseFloat(value)
      if (isNaN(value) || value < 0 || value > 1) {
        throw Error('Opacity value must be >= 0 and <= 1')
      }
      if ('opacity' in style) {
        style.opacity = value
      } else /*if('filter' in style)*/ {
        var match = __ie_opacity_regex__.exec(style.filter)
        var valueStr = 'alpha(opacity=' + (100 * value) + ')'
        style.filter = (null === match) ?
          valueStr :
          style.filter.replace(__ie_opacity_expr__, valueStr)
      }
    }

    /** global: browse */

    browse.prototype.show = function() {
      var style = this.element.style
      style.display = style.$_savedDisplay || _defaultDisplayProperty(this.element.nodeName)
      return this
    }

    browse.prototype.hide = function() {
      var style = this.element.style
      if ('none' !== style.display) {
        style.$_savedDisplay = style.display || _defaultDisplayProperty(this.element.nodeName)
      }
      style.display = 'none'
      return this
    }

    var _defaultDisplays = {}

    function _defaultDisplayProperty(nodeName) {
      if (!(nodeName in _defaultDisplays)) {
        var temp = document.createElement(nodeName)
        document.body.appendChild(temp)
        _defaultDisplays[nodeName] = $_(temp).style('display')
        temp.parentNode.removeChild(temp)
      }
      return _defaultDisplays[nodeName]
    }

    var __frame_interval__ = 16

    var _reqAnimFrame = window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.msRequestAnimationFrame

    if (undefined !== _reqAnimFrame) {
      window.requestAnimationFrame = _reqAnimFrame
    }

    /** global: browse */

    browse.prototype.fadeIn = function() {
      var duration = arguments[0] < __frame_interval__ ? __frame_interval__ : arguments[0],
        mode = 'string' === typeof(arguments[1]) ? arguments[1] : undefined,
        callback = !mode ? arguments[1] : arguments[2]
      this.show()
      var tick = _fadeInTick(
        this,
        duration,
        mode || 'linear',
        callback)
      _queueAnimationStep(tick)
      return this
    }

    browse.prototype.fadeOut = function() {
      var duration = arguments[0] < __frame_interval__ ? __frame_interval__ : arguments[0],
        mode = 'string' === typeof(arguments[1]) ? arguments[1] : undefined,
        callback = !mode ? arguments[1] : arguments[2]
      var tick = _fadeOutTick(
        this,
        duration,
        mode || 'linear',
        callback)
      _queueAnimationStep(tick)
      return this
    }

    browse.scrollY = function() {
      var toY = arguments[0],
        duration = arguments[1] < __frame_interval__ ? __frame_interval__ : arguments[1],
        mode = 'string' === typeof(arguments[2]) ? arguments[2] : undefined,
        callback = !mode ? arguments[2] : arguments[3]
      var tick = _scrollYTick(
        this,
        toY,
        duration,
        mode || 'linear',
        callback)
      _queueAnimationStep(tick)
      return this
    }

    function _fadeInTick(obj, duration, mode, callback) {
      var beginOpacity = obj.opacity(),
        beginTime = (new Date()).getTime()
      var tick = function() {
        var opacity = _getAnimationStep(beginTime, duration, beginOpacity, 1.0, mode)
        obj.opacity(opacity)
        if (opacity < 1) {
          _queueAnimationStep(tick)
          return
        }
        callback(obj)
      }
      return tick
    }

    function _fadeOutTick(obj, duration, mode, callback) {
      var beginOpacity = obj.opacity(),
        beginTime = (new Date()).getTime()
      var tick = function() {
        var opacity = _getAnimationStep(beginTime, duration, beginOpacity, 0, mode)
        obj.opacity(opacity)
        if (opacity > 0) {
          _queueAnimationStep(tick)
          return
        }
        obj.hide()
        callback(obj)
      }
      return tick
    }

    function _scrollYTick(obj, toY, duration, mode, callback) {
      var currX = _getCurrX(),
        beginY = _getCurrY(),
        beginTime = (new Date()).getTime()
      var tick = function() {
        var nextY = _getAnimationStep(beginTime, duration, beginY, toY, mode)
        window.scrollTo(currX, nextY)
        if (nextY !== toY) {
          _queueAnimationStep(tick)
          return
        }
        callback(obj)
      }
      return tick
    }

    function _getAnimationStep(beginTime, duration, beginVal, endVal, mode) {
      var elapsed = (new Date()).getTime() - beginTime
      if (elapsed < duration) {
        switch (mode) {
          case 'easeInQuadratic':
            return beginVal + (elapsed /= duration) * elapsed * (endVal - beginVal)
          case 'swing':
          case 'easeOutQuadratic':
            return beginVal + (elapsed /= duration) * (elapsed - 2) * (beginVal - endVal)
          default:
            return beginVal + (elapsed / duration) * (endVal - beginVal)
        }
      } else {
        return endVal
      }
    }

    function _queueAnimationStep(func) {
      if ('requestAnimationFrame' in window) {
        window.requestAnimationFrame(func)
      } else {
        setTimeout(func, __frame_interval__)
      }
    }

    /*case 'easeInOutQuadratic':
      if(elapsed <= (duration / 2)) {
        return _getAnimationStep(beginTime, duration / 2, beginVal, (beginVal + endVal) / 2, 'easeInQuadratic')
      }
      else {
        return _getAnimationStep(beginTime + duration / 2, duration / 2, (beginVal + endVal) / 2, endVal, 'easeOutQuadratic')
      }*/

    /** global: browse */

    browse.ajax = function(url, options) {
      var xhr = _ajaxXhr()
      url = _ajaxNonce(url, options)
      _ajaxOnload(xhr, url, options)
      _ajaxTimeout(xhr, url, options)
      try {
        _ajaxData(options)
        if (options.useIframe) {
          throw new Error('No support for sending forms with selected files using iframe')
        }
        xhr.open(options.method, url, true)
        _ajaxHeaders(xhr, options.headers)
        _ajaxContentType(xhr, options)
        if (options.beforeSend) {
          options.beforeSend(xhr, options)
        }
        xhr.send(options.method.match(__methods_with_data__) && options.data || null)
      } catch (e) {
        _ajaxError(e, xhr, url, options)
      }
    }

    function _ajaxXhr() {
      if (window.ActiveXObject && (document.documentMode <= 8 || !window.XMLHttpRequest)) {
        return new window.ActiveXObject('Microsoft.XmlHttp')
      }
      return new window.XMLHttpRequest()
    }

    function _ajaxError(err, xhr, url, options) {
      var status
      try {
        status = xhr.status
      } catch (e) {
        status = 0
      }
      options.error(err.message, status, url, xhr)
    }

    var
      __ajax_nonce__ = +(new Date()),
      __ready_state_done__ = 4,
      __content_form_urlencoded__ = "application/x-www-form-urlencoded; charset=utf-8",
      __content_json__ = "application/json; charset=utf-8",
      __content_multipart__ = 'multipart/form-data; charset=utf-8',
      __methods_with_data__ = /^(POST|PATCH|PUT)$/,
      __methods_with_response__ = /^(GET|HEAD|OPTIONS)$/

    /** global: __methods_with_response__ */
    /** global: __ajax_nonce__ */
    /** global: __methods_with_data__ */
    /** global: __content_form_urlencoded__ */
    /** global: __content_json__ */
    /** global: __content_multipart__ */

    function _ajaxNonce(url, options) {
      if (false === options.cache && options.method.match(__methods_with_response__)) {
        if (!url.match(/_=/)) {
          url += !url.match(/\?/) ?
            '?_=' :
            url.match(/\?$/) ?
            '_=' :
            '&_='
          url += __ajax_nonce__++
        }
      }
      return url
    }

    function _ajaxHeaders(xhr, headers) {
      if (headers) {
        /* eslint-disable guard-for-in */
        for (var key in headers) {
          xhr.setRequestHeader(key, headers[key])
        }
        /* eslint-enable guard-for-in */
      }
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
    }

    function _ajaxContentType(xhr, options) {
      if (_ajaxNoContentTypeNeeded(options)) {
        return
      }
      if (!options.contentType) {
        options.contentType = __content_form_urlencoded__
      }
      _ajaxHandleContentType(xhr, options)
    }

    function _ajaxHandleContentType(xhr, options) {
      switch (options.contentType.toLowerCase()) {
        case __content_form_urlencoded__:
        case __content_json__:
          xhr.setRequestHeader('Content-type', options.contentType)
          break
        case __content_multipart__:
          if (options.multipartBoundary) {
            xhr.setRequestHeader('Content-type', __content_multipart__ + '; boundary=' + options.multipartBoundary)
          }
          break
        default:
          throw new Error('Unsupported content type ' + options.contentType)
      }
    }

    function _ajaxNoContentTypeNeeded(options) {
      return (options.headers && options.headers['Content-type'] || !options.method.match(__methods_with_data__))
    }

    function _ajaxTimeout(xhr, url, options) {
      if (options.timeout) {
        if (_ajaxUsingOnTimeout(xhr, url, options)) {
          return
        }
        _ajaxUsingTimer(xhr, url, options)
      }
    }

    function _ajaxUsingOnTimeout(xhr, url, options) {
      if ('ontimeout' in xhr && 'timeout' in xhr) {
        try {
          xhr.timeout = options.timeout
          xhr.ontimeout = function() {
            _ajaxResponse(xhr, url, options)
          }
          return true
        } catch (e) {
          // ignore
        }
      }
      return false
    }

    function _ajaxUsingTimer(xhr, url, options) {
      setTimeout(function() {
        try {
          xhr.abort()
        } catch (e) {
          // ignore
        }
        options.error('incomplete request', 0, url, xhr)
      }, options.timeout)
    }

    /** global: __methods_with_data__ */
    /** global: __content_form_urlencoded__ */
    /** global: __content_json__ */
    /** global: __content_multipart__ */

    function _ajaxData(options) {
      if (!_ajaxNeedToProcessData(options)) {
        return
      }
      if (!options.contentType) {
        options.contentType = __content_form_urlencoded__
      }
      _ajaxProcessData(options)
    }

    function _ajaxProcessData(options) {
      switch (options.contentType.toLowerCase()) {
        case __content_form_urlencoded__:
          _ajaxUrlencodedData(options)
          break
        case __content_json__:
          options.data = JSON.stringify(options.data)
          break
        case __content_multipart__:
          _ajaxMultipart(options)
          break
        default:
          throw new Error('Unsupported content type ' + options.contentType)
      }
    }

    function _ajaxNeedToProcessData(options) {
      return (options.method.match(__methods_with_data__) && options.data && 'object' === typeof(options.data))
    }

    function _ajaxUrlencodedData(options) {
      var vars = []
      /* eslint-disable guard-for-in */
      for (var key in options.data) {
        vars.push(key + '=' + encodeURIComponent(options.data[key]))
      }
      /* eslint-enable guard-for-in */
      options.data = vars.join('&')
    }

    function _ajaxMultipart(options) {
      if (_canUseFormData()) {
        options.data = _ajaxFormData(options.data)
      } else {
        var data = _ajaxMultipartString(options.data)
        if ('use-iframe' !== data) {
          options.data = data.string
          options.multipartBoundary = data.boundary
        } else {
          options.useIframe = true
        }
      }
    }

    function _canUseFormData() {
      return (window.FormData && !_isSafari5())
    }

    function _isForm(data) {
      return (_isDOMElement(data) && 'form' === data.tagName.toLowerCase())
    }

    function _isSafari5() {
      var ua = window.navigator.userAgent
      return (ua.match(/ Safari\//) && ua.match(/Version\/5.0/))
    }

    function _ajaxFormData(data) {
      if (_isForm(data)) {
        return new window.FormData(data)
      } else {
        var formData = new window.FormData()
        /* eslint-disable guard-for-in */
        for (var key in data) {
          formData.append(key, data[key])
        }
        /* eslint-enable guard-for-in */
        return formData
      }
    }

    function _ajaxMultipartString(data) {
      if (_isForm(data)) {
        return _noFilesInForm(data) ? _ajaxDataToMultipartString(_formToObject(data)) : 'use-iframe'
      } else {
        return _ajaxDataToMultipartString(data)
      }
    }

    function _noFilesInForm(form) {
      var elements = form.elements
      for (var idx = 0; idx < elements.length; ++idx) {
        if ('file' === elements[idx].type.toLowerCase()) {
          if (elements[idx].files && elements[idx].files.length) {
            return false
          }
        }
      }
      return true
    }

    function _formToObject(form) {
      var elements = form.elements
      var data = {}
      for (var idx = 0; idx < elements.length; ++idx) {
        var element = elements[idx]
        if (!element.name || 'file' === element.type.toLowerCase()) {
          continue
        }
        data[element.name] = $_(element).value()
      }
      return data
    }

    function _ajaxDataToMultipartString(data) {
      var boundary = '---------------------------' + Math.random().toString().substr(2)
      var str = ''
      /* eslint-disable guard-for-in */
      for (var key in data) {
        str += '--' + boundary +
          '\r\nContent-Disposition: form-data; name="' + key + '"'
          //+ '\r\nContent-type: application/octet-stream'
          +
          '\r\n\r\n' + data[key] + '\r\n'
      }
      /* eslint-enable guard-for-in */
      str += '--' + boundary + '--\r\n'
      return {
        string: str,
        boundary: boundary
      }
    }

    /** global: __ready_state_done__ */

    function _ajaxOnload(xhr, url, options) {
      if ('onload' in xhr) {
        xhr.onload = function() {
          _ajaxResponse(xhr, url, options)
        }
        xhr.onerror = function() {
          _ajaxResponse(xhr, url, options)
        }
      } else {
        xhr.onreadystatechange = function() {
          if (__ready_state_done__ === xhr.readyState) {
            _ajaxResponse(xhr, url, options)
          }
        }
      }
    }

    function _ajaxResponse(xhr, url, options) {
      if (0 === xhr.status) {
        options.error(xhr.responseText || 'incomplete request', xhr.status, url, xhr)
      } else if (200 <= xhr.status && 299 >= xhr.status) {
        options.success(_ajaxParsedResponse(xhr, options), xhr.status, url, xhr)
      } else {
        options.error(_ajaxParsedResponse(xhr, options), xhr.status, url, xhr)
      }
    }

    function _ajaxParsedResponse(xhr, options) {
      switch (options.format) {
        case 'json':
          try {
            return JSON.parse(xhr.responseText)
          } catch (e) {
            return null
          }
        case 'xml':
          return xhr.responseXML
        default:
          return xhr.responseText
      }
    }

    /**
     * https://github.com/dperini/ContentLoaded
     */

    /** global: browse */

    var
      _root = document.documentElement,
      _modern = document.addEventListener,
      _add = _modern ? 'addEventListener' : 'attachEvent',
      _rem = _modern ? 'removeEventListener' : 'detachEvent',
      _pre = _modern ? '' : 'on'

    browse.ready = function(callback) {
      var
        init = _readyInit(callback),
        poll = _readyPoll()
      if (document.readyState === 'complete') {
        callback('lazy')
      } else {
        _notModernCheckForReady(poll)
        document[_add](_pre + 'DOMContentLoaded', init, false)
        document[_add](_pre + 'readystatechange', init, false)
        window[_add](_pre + 'load', init, false)
      }
    }

    function _readyInit(callback) {
      var done = false
      var init = function(e) {
        if (e.type === 'readystatechange' && document.readyState !== 'complete') {
          return
        }
        (e.type === 'load' ? window : document)[_rem](_pre + e.type, init, false)
        if (!done) {
          done = true
          callback(e.type)
        }
      }
      return init
    }

    function _readyPoll() {
      var poll = function() {
        try {
          _root.doScroll('left')
        } catch (e) {
          setTimeout(poll, 20)
          return
        }
        init('poll')
      }
      return poll
    }

    function _notModernCheckForReady(poll) {
      try {
        if (!_modern && _root.doScroll && !window.frameElement) {
          poll()
        }
      } catch (e) {
        // ignore
      }
    }

    /** global: browse */

    browse.capabilities = {
      'adjustOffsetX': 0,
      'adjustOffsetY': 0,
      'absolutePosition': false,
      'fixedPosition': false,
      'boxSizing': false,
      'css3Selectors': false
    }

    function _detectionInsertStyle(rules) {
      var noBody = !document.body
      var body = document.body || document.createElement('body')
      body.created = noBody
      var div = document.createElement('div')
      div.id = 'browse-detector'
      var style = document.createElement('style')
      style.type = 'text/css';
      if (style.styleSheet) {
        style.styleSheet.cssText = rules
      } else {
        style.appendChild(document.createTextNode(rules))
      }
      (!body.created ? div : body).appendChild(style)
      body.appendChild(div)
      if (body.created) {
        document.documentElement.appendChild(body)
      }
      return {
        body: body,
        div: div
      }
    }

    function _detectionInsertContent(html) {
      var noBody = !document.body
      var body = document.body || document.createElement('body')
      body.created = noBody
      var div = document.createElement('div')
      if (!_safeInsertAdjacentHtml(div, 'beforeend', html)) {
        try {
          div.innerHTML = html
        } catch (e) {
          //
        }
      }
      body.appendChild(div)
      if (body.created) {
        document.documentElement.appendChild(body)
      }
      return {
        body: body,
        div: div
      }
    }

    function _detectionCleanup(created) {
      if (created.body.created) {
        created.body.parentNode.removeChild(created.body)
      } else {
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
      } catch (e) {
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
      } catch (e) {
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
      } catch (e) {
        return 0
      }
    }

    _detectBodyOffset()
    _detectAbsolutePosition()
    _detectFixedPosition()
    _detectBoxSizing()
    _detectCss3Selectors()

  }(window.browse = window.browse || {}))
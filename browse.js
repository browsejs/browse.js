(function(ns, undefined) {

    function browse(element)
    {
        if (!element || !isDOMElement(element)) return null

        if (element.$_) return element.$_

        return new create(element)
    }

    browse.functions = browse.prototype

    function create(element)
    {
        this.element = element

        this.element.$_ = this
    }

    create.prototype = browse.prototype

    /*function isDOMNode(obj){
        return (
            typeof Node === "object"
            ? obj instanceof Node
            : obj && typeof obj === "object" && typeof obj.nodeType === "number" && typeof obj.nodeName === "string"
        )
    }*/

    function isDOMElement(obj){
        return (
            typeof HTMLElement === "object"
            ? obj instanceof HTMLElement
            : obj && typeof obj === "object" && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === "string"
        )
    }

    ns = window.$_ = browse

    function forEach(callback)
    {
        for (var idx = 0; idx < this.length; ++idx)
        {
            callback(this[idx], idx, this)
        }
    }

    function every(callback)
    {
        for (var idx = 0; idx < this.length; ++idx)
        {
            if(! callback(this[idx], idx, this))
                return
        }
    }

    Array.prototype.forEach = Array.prototype.forEach || forEach
    Array.prototype.every = Array.prototype.every || every

    Array.prototype.indexOf = Array.prototype.indexOf || function(member)
    {
        for (var idx = 0; idx < this.length; ++idx)
        {
            if (this[idx] === member) return idx
        }

        return -1
    }

    Array.prototype.remove = function(member, howMany)
    {
        var idx = this.indexOf(member)

        if (-1 !== idx)
        {
            this.splice(idx, howMany || 1)
        }
    }

    // Array-like objects/types

    if (window.NodeList)
    {
        NodeList.prototype.forEach = NodeList.prototype.forEach || forEach
        NodeList.prototype.every = NodeList.prototype.every || every
    }

    window.Node = window.Node || {
        ELEMENT_NODE: 1,
        TEXT_NODE: 3,
        COMMENT_NODE: 8,
        DOCUMENT_NODE: 9
    };

    var __node_type_element__ = Node.ELEMENT_NODE,
        __node_type_text__ = Node.TEXT_NODE,
        __node_type_comment__ = Node.COMMENT_NODE,
        __node_type_document__ = Node.DOCUMENT_NODE


    browse.functions.firstChild = function()
    {
        if ('firstElementChild' in this.element)
            return browse(this.element.firstElementChild)

        var child = this.element.firstChild

        while (child && __node_type_element__ !== child.nodeType)
            child = child.nextSibling

        return browse(child)
    }

    browse.functions.lastChild = function()
    {
        if ('lastElementChild' in this.element)
            return browse(this.element.lastElementChild)

        var child = this.element.lastChild

        while (child && __node_type_element__ !== child.nodeType)
            child = child.previousSibling

        return browse(child)
    }

    browse.functions.next = function()
    {
        if ('nextElementSibling' in this.element)
            return browse(this.element.nextElementSibling)

        var next = this.element.nextSibling

        while(next && __node_type_element__ !== next.nodeType)
            next = next.nextSibling

        return browse(next)
    }

    browse.functions.previous = function()
    {
        if ('previousElementSibling' in this.element)
            return browse(this.element.previousElementSibling)

        var previous = this.element.previousSibling

        while(previous && __node_type_element__ !== previous.nodeType)
            previous = previous.previousSibling

        return browse(previous)
    }

    browse.functions.append = function(html, tagName)
    {
        if (this.element.insertAdjacentHTML)
        {
            if (safeInsertAdjacentHtml(this.element, 'beforeend', html))
                return this
        }

        tagName = tagName || this.element.tagName.toLowerCase()
        var temp = document.createElement(tagName)

        safeSetInnerHTML(temp, html)

        while(temp.childNodes.length)
            this.element.appendChild(temp.childNodes[0])

        return this
    }

    browse.functions.prepend = function(html, tagName)
    {
        if (this.element.insertAdjacentHTML)
        {
            if (safeInsertAdjacentHtml(this.element, 'afterbegin', html))
                return this
        }

        tagName = tagName || this.element.tagName.toLowerCase()
        var temp = document.createElement(tagName)

        safeSetInnerHTML(temp, html)

        var firstChild = this.element.firstChild

        while(temp.childNodes.length)
            insertBeforeOrAppendChild(firstChild, this.element, temp.childNodes[0])

        return this
    }

    browse.functions.after = function(html, tagName)
    {
        var tag = this.element.tagName.toLowerCase()

        if ('html' === tag || 'body' === tag)
            return this

        if (this.element.insertAdjacentHTML)
        {
            if (safeInsertAdjacentHtml(this.element, 'afterend', html))
                return this
        }

        tagName = tagName
            || ( this.element.parentNode && this.element.parentNode.tagName )
            || 'div'

        var temp = document.createElement(tagName)

        safeSetInnerHTML(temp, html)

        var next = this.next() ? this.next().element : null

        while(temp.childNodes.length)
            insertBeforeOrAppendChild(next, this.element.parentNode,
                temp.childNodes[0])

        return this
    }

    browse.functions.before = function(html, tagName)
    {
        var tag = this.element.tagName.toLowerCase()

        if ('html' === tag || 'body' === tag)
            return this

        if (this.element.insertAdjacentHTML)
        {
            if (safeInsertAdjacentHtml(this.element, 'beforebegin', html))
                return this
        }

        tagName = tagName
            || ( this.element.parentNode && this.element.parentNode.tagName )
            || 'div'
        var temp = document.createElement(tagName)

        safeSetInnerHTML(temp, html)

        while(temp.childNodes.length)
            this.element.parentNode.insertBefore(temp.childNodes[0],
                                                this.element)

        return this
    }

    browse.functions.hasClass = function(className)
    {
        if(!className || className.match(/ /)) return false

        var element = this.element

        if ('classList' in element && element.classList.contains(className))
        {
            return true
        }
        else if ('className' in element)
        {
            return ((' '+element.className+' ').indexOf(' '+className+' ') > -1)
        }

        return false
    }

    browse.functions.addClass = function(className)
    {
        if(!className || className.match(/ /)) return this

        var element = this.element

        if ('classList' in element && !element.classList.contains(className))
        {
            element.classList.add(className)
        }
        else if ('className' in element)
        {
            if((' '+element.className+' ').indexOf(' '+className+' ') === -1)
            {
                element.className += ' ' + className
            }
        }

        return this
    }

    browse.functions.removeClass = function(className)
    {
        if(!className || className.match(/ /)) return this

        var element = this.element

        if ('classList' in element && element.classList.contains(className))
        {
            element.classList.remove(className)
        }
        else if ('className' in element)
        {
            var existingWithSpaces = ' ' + element.className + ' '
            var argumentWithSpaces = new RegExp(' ' + className + ' ', 'g')

            if(existingWithSpaces.match(argumentWithSpaces))
            {
                element.className =
                    existingWithSpaces.replace(argumentWithSpaces, '')
                    .replace(/^ /, '').replace(/ $/, '')
            }
        }

        return this
    }

    browse.functions.topLeft = function()
    {
        var element = this.element

        if (element.getBoundingClientRect)
        {
            var rect = element.getBoundingClientRect()

            return {
                top : ('top' in rect ? rect.top : rect.y) + getCurrY() -
                        browse.capabilities.adjustOffsetY,
                left: ('left' in rect ? rect.left : rect.x) + getCurrX() -
                        browse.capabilities.adjustOffsetX
            }
        }

        return { top : 0, left : 0 }
    }

    browse.functions.height = function()
    {
        return this.element.offsetHeight
    }

    browse.windowHeight = function()
    {
        return (
            window.innerHeight ||
            document.documentElement.clientHeight ||
            document.body.clientHeight
        )
    }

    browse.functions.width = function()
    {
        return this.element.offsetWidth
    }

    browse.windowWidth = function()
    {
        return (
            window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth
        )
    }

    browse.functions.remove = function()
    {
        removeElement(this.element)
    }


    function removeElement(element)
    {
        if (element.remove)
        {
            element.remove()
        }
        else
        {
            element.parentNode.removeChild(element)
        }
    }

    var __ie_invalid_target__ = /Invalid target element for this operation/

    function safeInsertAdjacentHtml(element, spec, html)
    {
        try
        {
            element.insertAdjacentHTML(spec, html)
            return true
        }
        catch(e)
        {
            console.log(e.message)
            console.log('insertAdjacentHTML failed: ' + element.tagName + ' ' + html)
            if (e.message.match(__ie_invalid_target__))
                return true
            return false
        }
    }

    function safeSetInnerHTML(element, html)
    {
        try
        {
            element.innerHTML = html
        }
        catch(e)
        {
            console.log(e.message)
            console.log('setting innerHTML failed: ' + element.tagName + ' ' + html)
        }
    }

    function insertBeforeOrAppendChild(before, par, what)
    {
        if (before)
        {
            par.insertBefore(what, before)
        }
        else
        {
            par.appendChild(what)
        }
    }


    function getCurrX()
    {
        return window.scrollX || window.pageXOffset ||
               document.documentElement.scrollLeft || document.body.scrollLeft
    }

    browse.getCurrX = getCurrX

    function getCurrY()
    {
        return window.scrollY || window.pageYOffset ||
               document.documentElement.scrollTop || document.body.scrollTop
    }

    browse.getCurrY = getCurrY

    browse.functions.onclick = function(callback)
    {
        addEventHandler(this.element, callback, 'click')

        return this
    }

    browse.functions.onkeyup = function(callback)
    {
        addEventHandler(this.element, callback, 'keyup')

        return this
    }

    browse.functions.onchange = function(callback)
    {
        addEventHandler(this.element, callback, 'change')

        return this
    }

    var __generic_events_regex__ = /^(change)$/,
        __mouse_events_regex__ = /^(click)$/

    browse.functions.trigger = function(type)
    {
        if (type.match(__generic_events_regex__))
        {
            dispatchEvent(this.element, createGenericEvent(type))
        }
        else if (type.match(__mouse_events_regex__))
        {
            dispatchEvent(this.element, createMouseEvent(type))
        }
    }

    function addEventHandler(element, callback, eventName)
    {
        if (element.addEventListener)
        {
            element.addEventListener(eventName, callback)
        }
        else
        {
            element.attachEvent('on' + eventName, function()
            {
                callback.apply(element, arguments)
            })
        }
    }

    function createGenericEvent(type)
    {
        var e

        if (document.createEvent)
        {
            e = document.createEvent('Event')
            e.initEvent(type, true, true)
        }
        else
        if (document.createEventObject)
        {
            e = document.createEventObject()
            e.type = type
        }
        else
        {
            e = new Event(type)
        }

        e.synthetic = true
        return e
    }

    var __copy_mouse_event__ = {
        bubbles: true,
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
        relatedTarget: undefined
    }

    function createMouseEvent(type)
    {
        var e

        __copy_mouse_event__.cancelable = (type !== 'mousemove')

        if (document.createEvent)
        {
            e = document.createEvent('MouseEvents')
            e.initMouseEvent(type, __copy_mouse_event__.bubbles,
                __copy_mouse_event__.cancelable, __copy_mouse_event__.view,
                __copy_mouse_event__.detail, __copy_mouse_event__.screenX,
                __copy_mouse_event__.screenY, __copy_mouse_event__.clientX,
                __copy_mouse_event__.clientY, __copy_mouse_event__.ctrlKey,
                __copy_mouse_event__.altKey, __copy_mouse_event__.shiftKey,
                __copy_mouse_event__.metaKey, __copy_mouse_event__.button,
                (/^(mouseover|mouseout)$/.test(type) ?
                    document.body.parentNode : null))
        }
        else
        if (document.createEventObject)
        {
            e = document.createEventObject()
            e.type = type
            for (var key in __copy_mouse_event__)
            {
                e[key] = __copy_mouse_event__[key]
            }
        }
        else
        {
            e = new MouseEvent(type, __copy_mouse_event__)
        }

        e.synthetic = true
        return e
    }

    function dispatchEvent(element, e)
    {
        if (element.dispatchEvent)
        {
            element.dispatchEvent(e)
        }
        else if (element.fireEvent)
        {
            element.fireEvent('on' + e.type, e)
        }
    }

    browse.functions.value = function()
    {
        if (undefined !== this.element.value)
            return this.element.value

        switch(this.element.tagName.toLowerCase())
        {
            case 'select'   :
                var value
                this.element.querySelectorAll('option').forEach(function(option, i)
                {
                    if (option.selected || 0 === i)
                    {
                        value = option.value || option.getAttribute('value') ||
                                option.innerHTML
                    }
                })
                return value

            case 'option'   :
                return this.element.getAttribute('value') || this.element.innerHTML

            case 'textarea' :
                return this.element.innerHTML

            case 'input'    :
                switch (this.element.type)
                {
                    case 'radio':
                    case 'checkbox':
                        return this.element.getAttribute('value') || 'on'
                    default:
                        return this.element.getAttribute('value') || undefined
                }

            default :
                throw new TypeError('Cannot get value of a non-input element')
        }
    }

    browse.functions.setValue = function(val)
    {
        if (undefined !== this.element.value)
        {
            this.element.value = val
            return this
        }

        switch(this.element.tagName.toLowerCase())
        {
            case 'select'   :
                var value
                this.element.querySelectorAll('option').forEach(function(option, i)
                {
                    value = option.value || option.getAttribute('value') ||
                                option.innerHTML

                    if (value === val)
                        option.selected = true
                })
                break

            case 'option'   :
                if (this.element.setAttribute)
                {
                    this.element.setAttribute('value', val)
                }
                else
                {
                    this.element.innerHTML = val
                }
                break

            case 'textarea' :
                this.element.innerHTML = val
                break

            case 'input'    :
                this.element.setAttribute && this.element.setAttribute('value', val)
                break

            default :
                throw new TypeError('Cannot set value of a non-input element')
        }

        return this
    }

    var __opacity_regex__ = /^alpha\(opacity=([0-9]+)\)/g

    browse.functions.style = function(property)
    {
        if (!property) return null

        if (this.element.currentStyle)
        {
            property = property.replace(/\-(\w)/g, function(str, letter) {
                return letter.toUpperCase();
            })

            return this.element.currentStyle[property]
        }
        else if (document.defaultView && document.defaultView.getComputedStyle)
        {
            return document.defaultView.getComputedStyle(this.element, null)
                .getPropertyValue(property)
        }
        else return null
    }

    browse.functions.opacity = function(value)
    {
        var element = this.element

        if (undefined === value)
        {
            if (undefined !== element.style.opacity)
            {
                return element.style.opacity !== '' ? parseFloat(element.style.opacity) : 1
            }
            else if (undefined !== element.style.filter)
            {
                return parseFloat(
                    element.style.filter.match(__opacity_regex__)[1]) / 100
            }
            else throw Error('No support for opacity on the browser')
        }

        if (undefined !== element.style.opacity)
        {
            element.style.opacity = parseFloat(value)
        }
        else if (undefined !== element.style.filter)
        {
            element.style.filter = 'alpha(opacity=' + ((100 * parseFloat(value)) | 0) + ')'
        }
        else throw Error('No support for opacity on the browser')

        return this
    }

    browse.functions.display = function(value)
    {
        var element = this.element

        if (undefined === value)
        {
            return element.style.display
        }

        if ('none' === value && 'none' !== element.style.display)
        {
            element.style.savedDisplay = element.style.display
        }

        element.style.display = value

        return this
    }

    browse.functions.fadeIn = function(duration, callback)
    {
        duration = duration < __frame_interval__ ?
                    __frame_interval__ :
                    duration

        var element = this.element,
            opacity = this.opacity(),
            step = ((1.0 - opacity) * __frame_interval__) / duration,
            $_ = this

        console.log('fade-in step', step, 'start', opacity)

        this.display(this.element.style.savedDisplay || '')

        var tick = function()
        {
            opacity += step

            if (opacity > 1) opacity = 1

            $_.opacity(opacity)

            console.log('step', opacity, $_.opacity())

            if (opacity < 1)
            {
                setupAnimationFrame(tick)
            }
            else
            {
                if (callback) callback(element)
            }
        }

        tick()

        return this
    }

    browse.functions.fadeOut = function(duration, callback)
    {
        duration = duration < __frame_interval__ ?
                    __frame_interval__ :
                    duration

        var element = this.element,
            opacity = this.opacity(),
            step = (opacity * __frame_interval__) / duration,
            $_ = this

        console.log('fade-out step', step)

        var tick = function()
        {
            opacity -= step

            if (opacity < 0) opacity = 0

            $_.opacity(opacity)

            console.log('step', opacity, $_.opacity())

            if (opacity > 0)
            {
                setupAnimationFrame(tick)
            }
            else
            {
                $_.display('none')

                if (callback) callback(element)
            }
        }

        tick()

        return this
    }

    browse.functions.scrollY = function(toY, duration)
    {
        if (window !== this.element)
        {
            throw new Error('The function scrollY can be added to window only')
        }

        duration = duration < __frame_interval__ ?
                    __frame_interval__ :
                    duration

        var element = this.element,
            currX = getCurrX(),
            currY = getCurrY()
            step = Math.ceil(((toY - currY) * __frame_interval__) / duration),
            direction = currY < toY ? 'down' : 'up'

        var tick = function()
        {
            currY = currY + step

            if ('down' === direction && currY > toY) currY = toY
            else if ('up' === direction && currY < toY) currY = toY

            element.scrollTo(currX, currY)

            if ('down' === direction && currY < toY ||
                'up' === direction && currY > toY)
            {
                setupAnimationFrame(tick)
            }
        }

        tick()
    }

    var __frame_interval__ = 16

    window.requestAnimationFrame = window.requestAnimationFrame ||
                                    window.mozRequestAnimationFrame ||
                                    window.webkitRequestAnimationFrame

    function setupAnimationFrame(func)
    {
        (window.requestAnimationFrame && window.requestAnimationFrame(func)) ||
        setTimeout(func, __frame_interval__)
    }

    /**
     * https://github.com/dperini/ContentLoaded
    */

    browse.ready = function(callback)
    {
        var done = false,
            top = true,

        root = document.documentElement,
        modern = document.addEventListener,
        add = modern ? 'addEventListener' : 'attachEvent',
        rem = modern ? 'removeEventListener' : 'detachEvent',
        pre = modern ? '' : 'on',

        init = function(e)
        {
            if (e.type === 'readystatechange' && document.readyState !== 'complete') return

            (e.type === 'load' ? window : document)[rem](pre + e.type, init, false)

            if (!done && (done = true)) callback(e.type || e)
        },

        poll = function()
        {
            try { root.doScroll('left') } catch(e) { setTimeout(poll, 20); return; }
            init('poll')
        }

        if (document.readyState === 'complete') callback('lazy')
        else {
            if (!modern && root.doScroll) {
                try { top = !window.frameElement; } catch(e) { }
                if (top) poll()
            }
            document[add](pre + 'DOMContentLoaded', init, false)
            document[add](pre + 'readystatechange', init, false)
            window[add](pre + 'load', init, false)
        }
    }

    browse.capabilities =
    {
        'adjustOffsetX'     : 0,
        'adjustOffsetY'     : 0,
        'absolutePosition'  : false,
        'fixedPosition'     : false
    }

    function detectIEWindowOffset()
    {
        var rect = document.body.getBoundingClientRect()
        var marginLeft = parseInt($_(document.body).style('margin-left'))
        var marginTop = parseInt($_(document.body).style('margin-top'))
        if (!marginLeft) marginLeft = 0
        if (!marginTop) marginTop = 0

        browse.capabilities.adjustOffsetY =
            ('top' in rect ? rect.top : rect.y) + getCurrY() - marginTop

        browse.capabilities.adjustOffsetX =
            ('left' in rect ? rect.left : rect.x) + getCurrX() - marginLeft
    }

    function testAbsolutePositionSupport()
    {
        var sX = window.scrollX || window.pageXOffset
        var sY = window.scrollY || window.pageYOffset
        window.scrollTo(0, 0)
        var element = document.createElement('div')
        element.innerHTML =
            '<div id=test-absolute style=position:absolute;left:-800px></div>'
        document.body.appendChild(element)
        var absoluteElement = document.getElementById('test-absolute')
        var rect = absoluteElement.getBoundingClientRect()
        var left = ('left' in rect ? rect.left : rect.x) -
            browse.capabilities.adjustOffsetX
        browse.capabilities.absolutePosition = (left === -800)
        element.parentNode.removeChild(element)
        window.scrollTo(sX, sY)
    }

    function testFixedPositionSupport()
    {
        var sX = window.scrollX || window.pageXOffset
        var sY = window.scrollY || window.pageYOffset
        window.scrollTo(100, 100)
        var element = document.createElement('div')
        element.innerHTML =
            '<div id=test-fixed style=position:fixed;left:-800px></div>'
        document.body.appendChild(element)
        var fixedElement = document.getElementById('test-fixed')
        var rect = fixedElement.getBoundingClientRect()
        var left = ('left' in rect ? rect.left : rect.x) -
            browse.capabilities.adjustOffsetX
        browse.capabilities.fixedPosition = (left === -800)
        element.parentNode.removeChild(element)
        window.scrollTo(sX, sY)
    }

    browse.ready(function()
    {
        detectIEWindowOffset()
        testAbsolutePositionSupport()
        testFixedPositionSupport()
    })

})(window.browse = window.browse || {})

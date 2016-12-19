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

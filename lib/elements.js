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

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

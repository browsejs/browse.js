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

browse.ajax = function(url, options)
{
    var xhr = getXhr()

    if ('onload' in xhr)
    {
        xhr.onload = function()
        {
            handleAjaxResponse(xhr, options)
        }
    }

    xhr.onreadystatechange = function()
    {
        console.log(xhr, options, 'readyState', xhr.readyState)

        if (__ready_state_done__ === xhr.readyState)
        {
            if (!('onload' in xhr))
            {
                handleAjaxResponse(xhr, options)
            }
        }
    }

    if (options.timeout)
    {
        if (('ontimeout' in xhr) && ('timeout' in xhr))
        {
            xhr.ontimeout = function()
            {
                handleAjaxAbort(xhr, options)
            }

            xhr.timeout = options.timeout
        }
        else
        {
            setTimeout(function()
            {
                try
                {
                    xhr.abort()

                    handleAjaxAbort(xhr, options)
                }
                catch(e)
                {
                    console.error && console.error(e.message, e.stack)
                    processAjaxException(xhr, options)
                }
            },
            options.timeout)
        }
    }

    if (false === options.cache && options.method.match(__methods_without_data__))
    {
        if (!url.match(/\?/))
            url += '?'

        if (!url.match(/\?_=/) && !url.match(/&_=/))
        {
            if (url.match(/\?$/))
                url += '_=' + (ajaxNonce++)
            else
                url += '&_=' + (ajaxNonce++)
        }
    }

    if (options.data && options.method.match(__methods_with_data__))
    {
        if((! options.contentType ||
            __content_type_post_form__ === options.contentType) &&
            'object' === typeof(options.data))
        {
            var vars = [ ]
            for (var key in options.data)
            {
                vars.push(key + '=' + encodeURIComponent(options.data[key]))
            }

            options.data = vars.join('&')
        }
    }

    if (options.contentType)
    {
        xhr.setRequestHeader('Content-type', options.contentType + '')
    }
    else
    {
        xhr.setRequestHeader('Content-type', __content_type_post_form__)
    }

    if (options.headers)
    {
        for (var key in headers)
        {
            xhr.setRequestHeader(key, headers[key])
        }
    }

    try
    {
        xhr.open(options.method, url, true)

        xhr.send(options.data || null)
    }
    catch(e)
    {
        console.error && console.error(e.message, e.stack)

        processAjaxException(xhr, options)
    }
}

function getXhr()
{
    if (window.ActiveXObject)
    {
        // Force ActiveXObject for IE < 8 or in case XMLHttpRequest is
        // not available
        if (document.documentMode < 8 || !window.XMLHttpRequest)
        {
            for(var idx = 0; idx < __ms_ajax_versions__.length; ++idx)
            {
                try
                {
                    return new ActiveXObject(__ms_ajax_versions__[idx])
                }
                catch(e)
                { }
            }
        }

        // For IE >= 8, Edge, always go with XMLHttpRequest
        return new XMLHttpRequest()
    }
    else
    if (window.XMLHttpRequest)
    {
        return new XMLHttpRequest()
    }
    else
    {
        throw new Error('No Ajax Support')
    }
}

function handleAjaxResponse(xhr, options)
{
    try
    {
        // @TODO
    }
    catch(e)
    {
    }
}

function handleAjaxAbort(xhr, options)
{
}

var ajaxNonce = +(new Date()),

    __ready_state_done__        = 4,

    __content_type_post_form__  = "application/x-www-form-urlencoded; charset=UTF-8",
    __content_type_json__       = "application/json; charset=UTF-8",
    __content_type_multipart__  = 'multipart/form-data',

    __methods_with_data__       = /^(POST|PATCH|PUT)$/,
    __methods_without_data__    = /^(GET|HEAD|OPTIONS)$/,

    __ms_ajax_versions__        = [
        "MSXML2.XmlHttp.6.0",
        "MSXML2.XmlHttp.5.0",
        "MSXML2.XmlHttp.4.0",
        "MSXML2.XmlHttp.3.0",
        "MSXML2.XmlHttp.2.0",
        "Microsoft.XmlHttp"
    ]

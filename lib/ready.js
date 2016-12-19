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

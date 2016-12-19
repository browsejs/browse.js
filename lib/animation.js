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

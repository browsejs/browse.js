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

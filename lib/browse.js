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

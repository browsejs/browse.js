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

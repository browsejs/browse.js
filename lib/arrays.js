function _forEach(callback) {
  for(var idx = 0; idx < this.length; ++idx) {
    callback(this[idx], idx, this)
  }
}

function _every(callback) {
  for(var idx = 0; idx < this.length; ++idx) {
    if(! callback(this[idx], idx, this)) {
      return
    }
  }
}

/* eslint-disable no-extend-native */
Array.prototype.forEach = Array.prototype.forEach || _forEach
Array.prototype.every = Array.prototype.every || _every

Array.prototype.indexOf = Array.prototype.indexOf || function(member) {
  for(var idx = 0; idx < this.length; ++idx) {
    if(this[idx] === member) {
      return idx
    }
  }
  return -1
}

Array.prototype.remove = function(member, howMany) {
  var idx = this.indexOf(member)
  if(-1 !== idx) {
    this.splice(idx, howMany || 1)
  }
}
/* eslint-enable no-extend-native */

var _arrayTypes = [ 'NodeList', 'HTMLCollection' ]

_arrayTypes.forEach(function(type) {
  if(window[type]) {
    window[type].prototype.forEach = window[type].prototype.forEach || _forEach
    window[type].prototype.every = window[type].prototype.every || _every
  }
})

function log() {
  try {
    if(window.console && window.console.log) {
      if(window.console.log.apply) {
        window.console.log.apply(window.console, arguments)
      }
      else {
        var message = Array.prototype.join.call(arguments, ' ')
        window.console.log(message)
      }
    }
  }
  catch(e) {
    // ignore
  }
}

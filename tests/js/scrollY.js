$_.ready(function() {

  var frameInterval = 16
  var httpHost = window.location.href.replace(/:7982.*$/, ':3000')

  function test_1() {
    var elem = $_(document.body).append('<div style=background-color:darkgreen;height:4000px>').lastChild()
    var interval = 1500
    var before = new Date()
    $_.scrollY(200, interval, function(obj){
      setTimeout(function() {
      var after = new Date(),
        time = after.getTime() - before.getTime()
      log('time taken (ms)', time)
      log('current post', $_.getCurrY(), 'expected pos 200')
      $_.ajax(httpHost + '/scrollY', {
        method: 'POST',
        contentType: 'application/json',
        data: {
          measured: $_.getCurrY(),
          expected: 200
        },
        success: function() {
          log('sent scroll data successfully')
          elem.element.parentNode.removeChild(elem.element)
          window.scrollTo(0, 0)
        },
        error: function() {
          log('error sending scroll data')
        }
      })
    }, 2000)
    })
  }

  // Uncomment the following to enable this scrollY test
  //test_1()
  //

})

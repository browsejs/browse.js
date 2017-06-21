var readyFlag = false

$_.ready(function() {
  expect(window.document).toBeDefined()
  expect(document.body).toBeDefined()
  expect(document.documentElement).toBeDefined()
  readyFlag = true
})

describe('ready', function() {

  it('should help detect completion of document loading', function() {
    runs(function() {
      //
    })
    waitsFor(function() {
      return readyFlag
    }, "readyFlag should be set", 100)
  })

  it('should work when doing a lazy detect', function() {
    var readyFlag2 = false
    runs(function() {
      $_.ready(function() {
        expect(window.document).toBeDefined()
        expect(document.body).toBeDefined()
        expect(document.documentElement).toBeDefined()
        readyFlag2 = true
      })
    })
    waitsFor(function() {
      return readyFlag2
    }, "readyFlag2 should be set", 200)
  })

})

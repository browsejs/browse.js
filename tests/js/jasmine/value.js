describe('value', function() {

  describe('get', function() {

    it('should throw an error when getting value of a non-control element', function() {
      var el = $_(document.body)
      expect(function(){el.value()}).toThrow(new Error('Element does not support entering or selecting a value'))
    })

    it('should return value of first option of a select if no option is selected', function() {
      $_(document.body).append('<form id=test-form><select id=test-form-select><option value=abc>abc</option><option value=def>def</option></select></form>')
      var value = $_(document.getElementById('test-form-select')).value()
      var form = document.getElementById('test-form')
      form.parentNode.removeChild(form)
      expect(value).toEqual('abc')
    })

    it('should return value of selected option of a select', function() {
      $_(document.body).append('<form id=test-form><select id=test-form-select><option value=abc>abc</option><option value=def selected>def</option></select></form>')
      var value = $_(document.getElementById('test-form-select')).value()
      var form = document.getElementById('test-form')
      form.parentNode.removeChild(form)
      expect(value).toEqual('def')
    })

    it('should return value of last selected option of a select if multiple options are selected', function() {
      $_(document.body).append('<form id=test-form><select id=test-form-select><option value=abc>abc</option><option value=def selected>def</option><option value=ghi selected>ghi</option></select></form>')
      var value = $_(document.getElementById('test-form-select')).value()
      var form = document.getElementById('test-form')
      form.parentNode.removeChild(form)
      expect(value).toEqual('ghi')
    })

    it('should return value of an option child of a select', function() {
      $_(document.body).append('<form id=test-form><select id=test-form-select><option value=abc>abc</option><option>def</option><option value=ghi selected>ghi</option></select></form>')
      var options = document.getElementById('test-form-select').getElementsByTagName('option')
      expect($_(options[0]).value()).toEqual('abc')
      expect($_(options[1]).value()).toEqual('def')
      expect($_(options[2]).value()).toEqual('ghi')
      var form = document.getElementById('test-form')
      form.parentNode.removeChild(form)
    })

    it('should return html of a textarea as its value', function() {
      $_(document.body).append('<form id=test-form><textarea id=test-form-textarea>abcdefghi</textarea></form>')
      var value = $_(document.getElementById('test-form-textarea')).value()
      var form = document.getElementById('test-form')
      form.parentNode.removeChild(form)
      expect(value).toEqual('abcdefghi')
    })

    it('should return value of a text type input', function() {
      $_(document.body).append('<form id=test-form><input type=text id=test-form-input-text value=abcdefghi></form>')
      var value = $_(document.getElementById('test-form-input-text')).value()
      var form = document.getElementById('test-form')
      form.parentNode.removeChild(form)
      expect(value).toEqual('abcdefghi')
    })

    it('should return value of an empty text type input', function() {
      $_(document.body).append('<form id=test-form><input type=text id=test-form-input-text value></form>')
      var value = $_(document.getElementById('test-form-input-text')).value()
      var form = document.getElementById('test-form')
      form.parentNode.removeChild(form)
      expect(value).toEqual('')
    })

    it('should return value of a password type input', function() {
      $_(document.body).append('<form id=test-form><input type=password id=test-form-input-password value=abcdefghi></form>')
      var value = $_(document.getElementById('test-form-input-password')).value()
      var form = document.getElementById('test-form')
      form.parentNode.removeChild(form)
      expect(value).toEqual('abcdefghi')
    })

    it('should return value of a hidden type input', function() {
      $_(document.body).append('<form id=test-form><input type=hidden id=test-form-input-hidden value=abcdefghi></form>')
      var value = $_(document.getElementById('test-form-input-hidden')).value()
      var form = document.getElementById('test-form')
      form.parentNode.removeChild(form)
      expect(value).toEqual('abcdefghi')
    })

    it('should return default value of a radio button type input', function() {
      $_(document.body).append('<form id=test-form><input type=radio id=test-form-input-radio></form>')
      var value = $_(document.getElementById('test-form-input-radio')).value()
      var form = document.getElementById('test-form')
      form.parentNode.removeChild(form)
      expect(value).toEqual('on')
    })

    it('should return value of a radio button type input', function() {
      $_(document.body).append('<form id=test-form><input type=radio id=test-form-input-radio value=abcdefghi></form>')
      var value = $_(document.getElementById('test-form-input-radio')).value()
      var form = document.getElementById('test-form')
      form.parentNode.removeChild(form)
      expect(value).toEqual('abcdefghi')
    })

    it('should return default value of a checkbox type input', function() {
      $_(document.body).append('<form id=test-form><input type=checkbox id=test-form-input-checkbox></form>')
      var value = $_(document.getElementById('test-form-input-checkbox')).value()
      var form = document.getElementById('test-form')
      form.parentNode.removeChild(form)
      expect(value).toEqual('on')
    })

    it('should return value of a checkbox type input', function() {
      $_(document.body).append('<form id=test-form><input type=checkbox id=test-form-input-checkbox value=abcdefghi></form>')
      var value = $_(document.getElementById('test-form-input-checkbox')).value()
      var form = document.getElementById('test-form')
      form.parentNode.removeChild(form)
      expect(value).toEqual('abcdefghi')
    })

    it('should return value of a button type input', function() {
      $_(document.body).append('<form id=test-form><input type=button id=test-form-input-button value=abcdefghi></form>')
      var value = $_(document.getElementById('test-form-input-button')).value()
      var form = document.getElementById('test-form')
      form.parentNode.removeChild(form)
      expect(value).toEqual('abcdefghi')
    })

    it('should return value of a submit type input', function() {
      $_(document.body).append('<form id=test-form><input type=submit id=test-form-input-submit value=abcdefghi></form>')
      var value = $_(document.getElementById('test-form-input-submit')).value()
      var form = document.getElementById('test-form')
      form.parentNode.removeChild(form)
      expect(value).toEqual('abcdefghi')
    })

    it('should return value of a reset type input', function() {
      $_(document.body).append('<form id=test-form><input type=reset id=test-form-input-reset value=abcdefghi></form>')
      var value = $_(document.getElementById('test-form-input-reset')).value()
      var form = document.getElementById('test-form')
      form.parentNode.removeChild(form)
      expect(value).toEqual('abcdefghi')
    })

  })

  describe('set', function() {

    it('should throw an error when setting value of a non-control element', function() {
      var el = $_(document.body)
      expect(function(){el.value('abc')}).toThrow(new Error('Element does not support entering or selecting a value'))
    })

    it('should set value of a select with no options selected beforehand', function() {
      $_(document.body).append('<form id=test-form><select id=test-form-select><option value=abc>abc</option><option value=def>def</option></select></form>')
      var value = $_(document.getElementById('test-form-select')).value('def').value()
      var form = document.getElementById('test-form')
      form.parentNode.removeChild(form)
      expect(value).toEqual('def')
    })

    it('should change the value of a select with an option already selected', function() {
      $_(document.body).append('<form id=test-form><select id=test-form-select><option value=abc>abc</option><option value=def selected>def</option></select></form>')
      var value = $_(document.getElementById('test-form-select')).value('abc').value()
      var form = document.getElementById('test-form')
      form.parentNode.removeChild(form)
      expect(value).toEqual('abc')
    })

    it('should change the value of a select with multiple options already selected', function() {
      $_(document.body).append('<form id=test-form><select id=test-form-select><option value=abc>abc</option><option value=def selected>def</option><option value=ghi selected>ghi</option></select></form>')
      var value = $_(document.getElementById('test-form-select')).value('abc').value()
      var form = document.getElementById('test-form')
      form.parentNode.removeChild(form)
      expect(value).toEqual('abc')
    })

    it('should set value of an option child of a select', function() {
      $_(document.body).append('<form id=test-form><select id=test-form-select><option value=abc>abc</option><option>def</option><option value=ghi selected>ghi</option></select></form>')
      var options = document.getElementById('test-form-select').getElementsByTagName('option')
      expect($_(options[0]).value('jkl').value()).toEqual('jkl')
      expect($_(options[1]).value('mno').value()).toEqual('mno')
      expect($_(options[2]).value('pqr').value()).toEqual('pqr')
      var form = document.getElementById('test-form')
      form.parentNode.removeChild(form)
    })

    it('should set html of a textarea when setting its value', function() {
      $_(document.body).append('<form id=test-form><textarea id=test-form-textarea>abcdefghi</textarea></form>')
      var value = $_(document.getElementById('test-form-textarea')).value('jklmnopqr').value()
      expect(value).toEqual('jklmnopqr')
      expect(document.getElementById('test-form-textarea').innerHTML).toEqual('jklmnopqr')
      var form = document.getElementById('test-form')
      form.parentNode.removeChild(form)
    })

    it('should set value of a text type input', function() {
      $_(document.body).append('<form id=test-form><input type=text id=test-form-input-text value=abcdefghi></form>')
      var value = $_(document.getElementById('test-form-input-text')).value('jklmnopqr').value()
      var form = document.getElementById('test-form')
      form.parentNode.removeChild(form)
      expect(value).toEqual('jklmnopqr')
    })

    it('should set value of a password type input', function() {
      $_(document.body).append('<form id=test-form><input type=password id=test-form-input-password value=abcdefghi></form>')
      var value = $_(document.getElementById('test-form-input-password')).value('jklmnopqr').value()
      var form = document.getElementById('test-form')
      form.parentNode.removeChild(form)
      expect(value).toEqual('jklmnopqr')
    })

    it('should set value of a hidden type input', function() {
      $_(document.body).append('<form id=test-form><input type=hidden id=test-form-input-hidden value=abcdefghi></form>')
      var value = $_(document.getElementById('test-form-input-hidden')).value('jklmnopqr').value()
      var form = document.getElementById('test-form')
      form.parentNode.removeChild(form)
      expect(value).toEqual('jklmnopqr')
    })

    it('should set value of a radio button type input', function() {
      $_(document.body).append('<form id=test-form><input type=radio id=test-form-input-radio value=abcdefghi></form>')
      var value = $_(document.getElementById('test-form-input-radio')).value('jklmnopqr').value()
      var form = document.getElementById('test-form')
      form.parentNode.removeChild(form)
      expect(value).toEqual('jklmnopqr')
    })

    it('should return value of a checkbox type input', function() {
      $_(document.body).append('<form id=test-form><input type=checkbox id=test-form-input-checkbox value=abcdefghi></form>')
      var value = $_(document.getElementById('test-form-input-checkbox')).value('jklmnopqr').value()
      var form = document.getElementById('test-form')
      form.parentNode.removeChild(form)
      expect(value).toEqual('jklmnopqr')
    })

    it('should return value of a button type input', function() {
      $_(document.body).append('<form id=test-form><input type=button id=test-form-input-button value=abcdefghi></form>')
      var value = $_(document.getElementById('test-form-input-button')).value('jklmnopqr').value()
      var form = document.getElementById('test-form')
      form.parentNode.removeChild(form)
      expect(value).toEqual('jklmnopqr')
    })

    it('should return value of a submit type input', function() {
      $_(document.body).append('<form id=test-form><input type=submit id=test-form-input-submit value=abcdefghi></form>')
      var value = $_(document.getElementById('test-form-input-submit')).value('jklmnopqr').value()
      var form = document.getElementById('test-form')
      form.parentNode.removeChild(form)
      expect(value).toEqual('jklmnopqr')
    })

    it('should return value of a reset type input', function() {
      $_(document.body).append('<form id=test-form><input type=reset id=test-form-input-reset value=abcdefghi></form>')
      var value = $_(document.getElementById('test-form-input-reset')).value('jklmnopqr').value()
      var form = document.getElementById('test-form')
      form.parentNode.removeChild(form)
      expect(value).toEqual('jklmnopqr')
    })

  })

})

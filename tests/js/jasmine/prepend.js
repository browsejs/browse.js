describe('prepend', function() {

  it('should create a new elements as first child', function() {
    var firstChild = $_(document.body).firstChild()
    document.body.$_.prepend('<p id=prepend-begin-abc>xyz</p>')
    var e1 = document.getElementById('prepend-begin-abc')
    expect(e1).not.toBeNull()
    expect(document.body.$_.firstChild()).not.toEqual(firstChild)
    expect(document.body.$_.firstChild()).toEqual(e1.$_)
    expect(firstChild.previous()).toEqual(e1.$_)
    expect(e1.$_.previous()).toBeNull()
    e1.parentNode.removeChild(e1)
  })

  it('should create new elements in given order', function() {
    var firstChild = $_(document.body).firstChild()
    document.body.$_.prepend('<p id=prepend-order-abc>xyz</p><div id=prepend-order-def></div><img id=prepend-order-ghi>')
    var e1 = document.getElementById('prepend-order-abc'),
      e2 = document.getElementById('prepend-order-def'),
      e3 = document.getElementById('prepend-order-ghi')
    expect(e1).not.toBeNull()
    expect(e2).not.toBeNull()
    expect(e3).not.toBeNull()
    expect(firstChild.previous().element).toEqual(e3)
    expect($_(e3).previous().element).toEqual(e2)
    expect($_(e2).previous().element).toEqual(e1)
    expect($_(e1).previous()).toBeNull()
    expect(document.body.$_.firstChild()).toEqual(e1.$_)
    e1.parentNode.removeChild(e1)
    e2.parentNode.removeChild(e2)
    e3.parentNode.removeChild(e3)
  })

  it('should create new elements inside an empty element', function() {
    var divs = document.getElementsByTagName('div'),
      empty = null
    for (var i = 0; i < divs.length; ++i) {
      if (!divs[i].childNodes.length) {
        empty = divs[i]
        break
      }
    }
    expect(empty).not.toBeNull()
    $_(empty).prepend('<p id=prepend-empty-abc>xyz</p><div id=prepend-empty-def></div><img id=prepend-empty-ghi>')
    var e1 = document.getElementById('prepend-empty-abc'),
      e2 = document.getElementById('prepend-empty-def'),
      e3 = document.getElementById('prepend-empty-ghi')
    expect(e1).not.toBeNull()
    expect(e2).not.toBeNull()
    expect(e3).not.toBeNull()
    expect(empty.$_.lastChild().element).toEqual(e3)
    expect(e3.$_.previous().element).toEqual(e2)
    expect(empty.$_.firstChild().element).toEqual(e1)
    e1.parentNode.removeChild(e1)
    e2.parentNode.removeChild(e2)
    e3.parentNode.removeChild(e3)
  })

  it('should create new elements inside an non-empty element', function() {
    var divs = document.getElementsByTagName('div'),
      notEmpty = null
    for (var i = 0; i < divs.length; ++i) {
      if (divs[i].childNodes.length) {
        notEmpty = divs[i]
        break
      }
    }
    expect(notEmpty).not.toBeNull()
    var firstChild = $_(notEmpty).firstChild()
    notEmpty.$_.prepend('<p id=prepend-notEmpty-abc>xyz</p><div id=prepend-notEmpty-def></div><img id=prepend-notEmpty-ghi>')
    var e1 = document.getElementById('prepend-notEmpty-abc'),
      e2 = document.getElementById('prepend-notEmpty-def'),
      e3 = document.getElementById('prepend-notEmpty-ghi')
    expect(e1).not.toBeNull()
    expect(e2).not.toBeNull()
    expect(e3).not.toBeNull()
    expect(firstChild.previous().element).toEqual(e3)
    expect(e3.$_.previous().element).toEqual(e2)
    expect(notEmpty.$_.firstChild().element).toEqual(e1)
    e1.parentNode.removeChild(e1)
    e2.parentNode.removeChild(e2)
    e3.parentNode.removeChild(e3)
  })

  it('should fail with table tags in some browsers', function() {
    $_(document.body).prepend('<table id=prepend-table123></table>')
    var table = document.getElementById('prepend-table123')
    expect(table).not.toBeNull()
    $_(table).prepend('<tbody id=prepend-tbody123></tbody>')
    $_(table).prepend('<thead id=prepend-thead123></thead>')
    var thead = document.getElementById('prepend-thead123')
    var tbody = document.getElementById('prepend-tbody123')
    if(!thead||!tbody) table.parentNode.removeChild(table)
    expect(thead).not.toBeNull()
    expect(tbody).not.toBeNull()
    $_(thead).prepend('<tr id=prepend-theadtr123></tr>')
    $_(tbody).prepend('<tr id=prepend-tbodytr123></tr>')
    var thead_tr = document.getElementById('prepend-theadtr123')
    var tbody_tr = document.getElementById('prepend-tbodytr123')
    if(!thead_tr||!tbody_tr) table.parentNode.removeChild(table)
    expect(thead_tr).not.toBeNull()
    expect(tbody_tr).not.toBeNull()
    $_(thead_tr).prepend('<th id=prepend-theadtrth123>abc</th>')
    $_(tbody_tr).prepend('<td id=prepend-tbodytrtd123>abc</td>')
    var thead_tr_th = document.getElementById('prepend-theadtrth123')
    var tbody_tr_td = document.getElementById('prepend-tbodytrtd123')
    if(!thead_tr_th||!tbody_tr_td) table.parentNode.removeChild(table)
    expect(thead_tr_th).not.toBeNull()
    expect(tbody_tr_td).not.toBeNull()
    table.parentNode.removeChild(table)
  })

})

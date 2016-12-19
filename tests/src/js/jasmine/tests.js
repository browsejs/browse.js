/**
 * Suite: Browse
 * Description: Test the browse wrapper/initializer function
 */
describe('browse', function()
{
    /** Test: Wrap a non HTMLElement node */
    it('should return null for a non-HTMLElement node', function()
    {
        // the DOM element being accessed below is a Text node
        expect($_("String")).toBe(null)
    })

    /** Test: Wrap body element and check its internal browse structure */
    it('should return a valid object for body element', function()
    {
        expect($_(document.body)).toBeTruthy()
        expect($_(document.body).element).toBeTruthy()
        expect($_(document.body).element.tagName.toLowerCase())
            .toEqual('body')
    })

    /** Test: Once an element has been wrapped it must have an '$_' member */
    it('should create the $_ member', function()
    {
        expect(document.body.$_).toBeTruthy()
        expect(document.body.$_.element).toBeTruthy()
        expect(document.body.$_.element).toEqual(document.body)
    })

    /** Test: Wrapping a browse.js wrapper should return null */
    it('should return null for a browse.js wrapper', function()
    {
        expect($_($_(document.body))).toBeNull()
    })
})

/**
 * Suite: ready
 * Description: tests the functionality of browse.ready
*/
describe('ready', function()
{
    it('should help detect completion of document loading', function()
    {
        var flag = false
        runs(function()
        {
            $_.ready(function()
            {
                expect(window.document).toBeDefined()
                expect(document.body).toBeDefined()
                expect(document.documentElement).toBeDefined()
                flag = true
            })
        })
        waitsFor(function()
        {
            return flag
        }, "tests readiness flag", 100)
    })
})

/**
 * Suite: Array
 * Description: Test the methods added by us (in case absent)
 */
describe('Array', function()
{
    /** Test: forEach method must exist on an array as browse.js adds it */
    it('should have forEach method', function()
    {
        var array = []
        expect(array.forEach).toBeDefined()
        expect(typeof(array.forEach)).toEqual('function')
    })

    /** Test: every method must exist on an array as browse.js adds it */
    it('should have every method', function()
    {
        var array = []
        expect(array.every).toBeDefined()
        expect(typeof(array.every)).toEqual('function')
    })

    /** Test: indexOf method must exist on an array as browse.js adds it */
    it('should have indexOf method', function()
    {
        var array = []
        expect(array.indexOf).toBeDefined()
        expect(typeof(array.indexOf)).toEqual('function')
    })

    /** Test: remove method must exist on an array as browse.js adds it */
    it('should have remove method', function()
    {
        var array = []
        expect(array.remove).toBeDefined()
        expect(typeof(array.remove)).toEqual('function')
    })

    /** Test: observe that forEach works */
    it('forEach method should loop through all elements', function()
    {
        var array = [1, 2, 3]
        array.forEach(function(val, idx, arr)
        {
            arr[idx] = val + 1
            return 1 // try to break out
        })
        expect(array).toEqual([2, 3, 4])
    })

    /** Test: observe that every works until false is returned */
    it('every method should loop through all elements until falsy result',
    function()
    {
        var array = [1, 2, 3]
        array.every(function(val, idx, arr)
        {
            arr[idx] = val + 1
            return (arr[idx] % 2 ? false : true)
        })
        expect(array).toEqual([2, 3, 3])
    })

    /** Test: observe that indexOf works */
    it('indexOf method should return correct index', function()
    {
        var array = [1, 2, 2, 3]
        expect(array.indexOf(2)).toEqual(1)
        expect(array.indexOf(4)).toEqual(-1)
    })

    /** Test: observe that remove works */
    it('remove method should remove expected members', function()
    {
        var array = [1, 2, 4, 2, 3]
        array.remove(3)
        expect(array).toEqual([1, 2, 4, 2])
        array.remove(1)
        expect(array).toEqual([2, 4, 2])
        array.remove(2)
        expect(array).toEqual([4, 2])
        array.remove(4, 2)
        expect(array).toEqual([])
        array = [1, 3]
        array.remove(3, 3)
        expect(array).toEqual([1])
    })
})

if (window.NodeList)
{
    /**
     * Suite: NodeList
     * Description: Tests methods added by us to NodeList (if absent)
     */
    describe('NodeList', function()
    {
        /** Test: forEach method must exist on NodeList as we add it */
        it('should have forEach method', function()
        {
            expect(NodeList.prototype.forEach).toBeDefined()
            expect(typeof(NodeList.prototype.forEach)).toEqual(
                'function')
        })

        /** Test: every method must exist on NodeList as we add it */
        it('should have every method', function()
        {
            expect(NodeList.prototype.every).toBeDefined()
            expect(typeof(NodeList.prototype.every)).toEqual(
                'function')
        })
    })
}

/**
 * Suite: firstChild
 * Description: Tests the firstChild API
 */
describe('firstChild', function()
{
    /** Should return null for elements with no children */
    it('should return null in case there is no child', function()
    {
        var scriptNode = document.getElementsByTagName('script')[0]
        expect(scriptNode).not.toBeNull()
        expect(typeof($_(scriptNode).firstChild)).toEqual(
            'function')
        expect($_(scriptNode).firstChild()).toBeNull()
    })

    /** Should return the valid first element child */
    it('should return a valid element which is first element child',
    function()
    {
        var firstChild = $_(document.body).firstChild()
        expect(firstChild).not.toBeNull()
        expect(firstChild.element).toBeDefined()
        var expectedFirstChild = document.body.childNodes[0]
        while (expectedFirstChild &&
            Node.ELEMENT_NODE !== expectedFirstChild.nodeType)
        {
            expectedFirstChild = expectedFirstChild.nextSibling
        }
        expect(firstChild.element).toEqual(expectedFirstChild)
    })
})

/**
 * Suite: lastChild
 * Description: Tests the lastChild API
 */
describe('lastChild', function()
{
    /** Should return null for elements with no children */
    it('should return null in case there is no child', function()
    {
        var scriptNode = document.getElementsByTagName('script')[0]
        expect(scriptNode).not.toBeNull()
        expect(typeof($_(scriptNode).lastChild)).toEqual(
            'function')
        expect($_(scriptNode).lastChild()).toBeNull()
    })

    /** Should return the valid last element child */
    it('should return a valid element which is last element child',
    function()
    {
        var lastChild = $_(document.body).lastChild()
        expect(lastChild).not.toBeNull()
        expect(lastChild.element).toBeDefined()
        var numChildren = document.body.childNodes.length
        var expectedLastChild = document.body.childNodes[numChildren - 1]
        while (expectedLastChild &&
            Node.ELEMENT_NODE !== expectedLastChild.nodeType)
        {
            expectedLastChild = expectedLastChild.previousSibling
        }
        expect(lastChild.element).toEqual(expectedLastChild)
    })
})

/**
 * Suite: next
 * Description: Tests the next API
 */
describe('next', function()
{
    /** Should return null for an elment with no siblings */
    it('should return null in case there are no siblings', function()
    {
        expect(typeof($_(document.body).next)).toEqual('function')
        expect($_(document.body).next()).toBeNull()
    })

    /** Should return null for an elment which is the last child */
    it('should return null in case of last child', function()
    {
        expect($_(document.body).lastChild().next()).toBeNull()
    })

    /** Should return a valid element in case there is a sibling */
    it('should return valid next element sibling', function()
    {
        var next = $_(document.body).firstChild().next()
        expect(next).toBeDefined()
        expect(next).not.toBeNull()
        var expectedNext = $_(document.body).firstChild().element.nextSibling
        while (expectedNext && Node.ELEMENT_NODE !== expectedNext.nodeType)
        {
            expectedNext = expectedNext.nextSibling
        }
        expect(next.element).toEqual(expectedNext)
    })
})

/**
 * Suite: previous
 * Description: Tests the previous API
 */
describe('previous', function()
{
    /** Should return null for an elment with no siblings */
    it('should return null in case there are no siblings', function()
    {
        expect(typeof($_(document.documentElement).previous)).toEqual('function')
        expect($_(document.documentElement).previous()).toBeNull()
    })

    /** Should return null for an elment which is the first child */
    it('should return null in case of first child', function()
    {
        expect($_(document.body).firstChild().previous()).toBeNull()
    })

    /** Should return a valid element in case there is a sibling */
    it('should return valid previous element sibling', function()
    {
        var previous = $_(document.body).lastChild().previous()
        expect(previous).toBeDefined()
        expect(previous).not.toBeNull()
        var expectedPrevious = $_(document.body).lastChild().element
            .previousSibling
        while (expectedPrevious && Node.ELEMENT_NODE !==
            expectedPrevious.nodeType)
        {
            expectedPrevious = expectedPrevious.previousSibling
        }
        expect(previous.element).toEqual(expectedPrevious)
    })
})

/**
 * Suite: append
 * Description: Tests the append API
 */
describe('append', function()
{
    /** Should add all html only at the end */
    it('should add new elements at the end', function()
    {
        var lastChild = $_(document.body).lastChild()
        $_(document.body).append('<p id=append-end-abc>xyz</p>')
        var e1 = document.getElementById('append-end-abc')
        expect(e1).not.toBeNull()
        expect($_(e1).next()).toBeNull()
        expect(lastChild.next().element).toEqual(e1)
        e1.parentNode.removeChild(e1)
    })

    /** Should add all html in the given order */
    it('should add new elements in the given order', function()
    {
        var lastChild = $_(document.body).lastChild()
        $_(document.body).append(
            '<p id=append-order-abc>xyz</p><div id=append-order-def></div><img id=append-order-ghi>'
        )
        var e1 = document.getElementById('append-order-abc'),
            e2 = document.getElementById('append-order-def'),
            e3 = document.getElementById('append-order-ghi')
        expect(e1).not.toBeNull()
        expect(e2).not.toBeNull()
        expect(e3).not.toBeNull()
        expect(lastChild.next().element).toEqual(e1)
        expect($_(e1).next().element).toEqual(e2)
        expect($_(e2).next().element).toEqual(e3)
        expect($_(e3).next()).toBeNull()
        e1.parentNode.removeChild(e1)
        e2.parentNode.removeChild(e2)
        e3.parentNode.removeChild(e3)
    })

    /** Should append in case there were no children before */
    it('should add new elements when no children exist', function()
    {
        var divs = document.getElementsByTagName('div'),
            empty = null
        for (var i = 0; i < divs.length; ++i)
        {
            if (!divs[i].childNodes.length)
            {
                empty = divs[i]
                break
            }
        }
        expect(empty).not.toBeNull()
        $_(empty).append(
            '<p id=append-empty-abc>xyz</p><div id=append-empty-def></div><img id=append-empty-ghi>'
        )
        var e1 = document.getElementById('append-empty-abc'),
            e2 = document.getElementById('append-empty-def'),
            e3 = document.getElementById('append-empty-ghi')
        expect(e1).not.toBeNull()
        expect(e2).not.toBeNull()
        expect(e3).not.toBeNull()
        expect($_(empty).firstChild().element).toEqual(e1)
        expect($_(empty).firstChild().next().element).toEqual(e2)
        expect($_(empty).lastChild().element).toEqual(e3)
        e1.parentNode.removeChild(e1)
        e2.parentNode.removeChild(e2)
        e3.parentNode.removeChild(e3)
    })

    /** Should take care of IE < 8 issues with table, tbody, thead, tr */
    it('should work around IE <= 8 issues with table related tags',
    function()
    {
        $_(document.body).append('<table id=append-table123></table>')
        var table = document.getElementById('append-table123')
        if (!table) return
        expect(table).not.toBeNull()
        $_(table).append('<thead id=append-thead123></thead>')
        var thead = document.getElementById('append-thead123')
        $_(table).append('<tbody id=append-tbody123></tbody>')
        var tbody = document.getElementById('append-tbody123')
        if (thead)
        {
            $_(thead).append('<tr id=append-theadtr123></tr>')
            var thead_tr = document.getElementById('append-theadtr123')
            if (thead_tr)
            {
                $_(thead_tr).append('<th id=append-theadtrth123>abc</th>')
                var thead_tr_th = document.getElementById('append-theadtrth123')
                expect(thead_tr_th).not.toBeNull()
            }
        }
        if (tbody)
        {
            $_(tbody).append('<tr id=append-tbodytr123></tr>')
            var tbody_tr = document.getElementById('append-tbodytr123')
            if (tbody_tr)
            {
                $_(tbody_tr).append('<td id=append-tbodytrtd123>abc</td>')
                var tbody_tr_td = document.getElementById('append-tbodytrtd123')
                expect(tbody_tr_td).not.toBeNull()
            }
        }
        table.parentNode.removeChild(table)
    })
})

/**
 * Suite: prepend
 * Description: Tests the prepend API
 */
describe('prepend', function()
{
    /** Should add all html only at the beginning */
    it('should add new elements at the beginning', function()
    {
        var firstChild = $_(document.body).firstChild()
        $_(document.body).prepend('<p id=prepend-begin-abc>xyz</p>')
        var e1 = document.getElementById('prepend-begin-abc')
        expect(e1).not.toBeNull()
        expect($_(e1).previous()).toBeNull()
        expect(firstChild.previous().element).toEqual(e1)
        e1.parentNode.removeChild(e1)
    })

    /** Should add all html in the given order */
    it('should add new elements in the given order', function()
    {
        var firstChild = $_(document.body).firstChild()
        $_(document.body).prepend(
            '<p id=prepend-order-abc>xyz</p><div id=prepend-order-def></div><img id=prepend-order-ghi>'
        )
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
        e1.parentNode.removeChild(e1)
        e2.parentNode.removeChild(e2)
        e3.parentNode.removeChild(e3)
    })

    /** Should prepend in case there were no children before */
    it('should add new elements when no children exist', function()
    {
        var divs = document.getElementsByTagName('div'),
            empty = null
        for (var i = 0; i < divs.length; ++i)
        {
            if (!divs[i].childNodes.length)
            {
                empty = divs[i]
                break
            }
        }
        expect(empty).not.toBeNull()
        $_(empty).prepend(
            '<p id=prepend-empty-abc>xyz</p><div id=prepend-empty-def></div><img id=prepend-empty-ghi>'
        )
        var e1 = document.getElementById('prepend-empty-abc'),
            e2 = document.getElementById('prepend-empty-def'),
            e3 = document.getElementById('prepend-empty-ghi')
        expect(e1).not.toBeNull()
        expect(e2).not.toBeNull()
        expect(e3).not.toBeNull()
        expect($_(empty).firstChild().element).toEqual(e1)
        expect($_(empty).firstChild().next().element).toEqual(e2)
        expect($_(empty).lastChild().element).toEqual(e3)
        e1.parentNode.removeChild(e1)
        e2.parentNode.removeChild(e2)
        e3.parentNode.removeChild(e3)
    })

    /** Should take care of IE < 8 issues with table, tbody, thead, tr */
    it('should work around IE <= 8 issues with table related tags',
    function()
    {
        $_(document.body).prepend('<table id=prepend-table123></table>')
        var table = document.getElementById('prepend-table123')
        if (!table) return
        expect(table).not.toBeNull()
        $_(table).prepend('<thead id=prepend-thead123></thead>')
        var thead = document.getElementById('prepend-thead123')
        $_(table).prepend('<tbody id=prepend-tbody123></tbody>')
        var tbody = document.getElementById('prepend-tbody123')
        if (thead)
        {
            $_(thead).prepend('<tr id=prepend-theadtr123></tr>')
            var thead_tr = document.getElementById('prepend-theadtr123')
            if (thead_tr)
            {
                $_(thead_tr).prepend('<th id=prepend-theadtrth123>abc</th>')
                var thead_tr_th = document.getElementById('prepend-theadtrth123')
                expect(thead_tr_th).not.toBeNull()
            }
        }
        if (tbody)
        {
            $_(tbody).prepend('<tr id=prepend-tbodytr123></tr>')
            var tbody_tr = document.getElementById('prepend-tbodytr123')
            if (tbody_tr)
            {
                $_(tbody_tr).prepend('<td id=prepend-tbodytrtd123>abc</td>')
                var tbody_tr_td = document.getElementById('prepend-tbodytrtd123')
                expect(tbody_tr_td).not.toBeNull()
            }
        }
        table.parentNode.removeChild(table)
    })
})

/**
 * Suite: after
 * Description: test functionality of after api
 */
describe('after', function()
{
    /** inserting after html or body should not be allowed */
    it('should not allow inserting after html or body', function()
    {
        $_(document.body).after('<div id=after-body>xyz</div>')
        expect(document.getElementById('after-body')).toBeNull()
        $_(document.documentElement).after('<div id=after-html>xyz</div>')
        expect(document.getElementById('after-html')).toBeNull()
    })

    /** should insert new elements in proper order */
    it('should insert new elements in the given order', function()
    {
        var div = document.getElementsByTagName('div')[0]
        $_(div).after(
            '<div id=after-order-div></div><p id=after-order-p></p><ul id=after-order-ul></ul>'
        )
        var e1 = document.getElementById('after-order-div'),
            e2 = document.getElementById('after-order-p'),
            e3 = document.getElementById('after-order-ul')
        expect(e1).not.toBeNull()
        expect(e2).not.toBeNull()
        expect(e3).not.toBeNull()
        expect(div.$_.next().element).toEqual(e1)
        expect($_(e1).next().element).toEqual(e2)
        expect($_(e2).next().element).toEqual(e3)
        e1.parentNode.removeChild(e1)
        e2.parentNode.removeChild(e2)
        e3.parentNode.removeChild(e3)
    })

    /** should be able to insert right at the end */
    it('should insert new elements after last child', function()
    {
        var last = $_(document.body).lastChild()
        last.after(
            '<div id=after-last-div></div><p id=after-last-p></p>'
        )
        var e1 = document.getElementById('after-last-div'),
            e2 = document.getElementById('after-last-p')
        expect(e1).not.toBeNull()
        expect(e2).not.toBeNull()
        expect(last.next().element).toEqual(e1)
        expect($_(e1).next().element).toEqual(e2)
        expect(document.body.$_.lastChild().element).toEqual(e2)
        e1.parentNode.removeChild(e1)
        e2.parentNode.removeChild(e2)
    })
})

/**
 * Suite: before
 * Description: test functionality of before api
 */
describe('before', function()
{
    /** inserting before html or body should not be allowed */
    it('should not allow inserting before html or body', function()
    {
        $_(document.body).before('<div id=before-body>xyz</div>')
        expect(document.getElementById('before-body')).toBeNull()
        $_(document.documentElement).before('<div id=before-html>xyz</div>')
        expect(document.getElementById('before-html')).toBeNull()
    })

    /** should insert new elements in proper order */
    it('should insert new elements in the given order', function()
    {
        var div = $_(document.body).lastChild().element
        $_(div).before(
            '<div id=before-order-div></div><p id=before-order-p></p><ul id=before-order-ul></ul>'
        )
        var e1 = document.getElementById('before-order-div'),
            e2 = document.getElementById('before-order-p'),
            e3 = document.getElementById('before-order-ul')
        expect(e1).not.toBeNull()
        expect(e2).not.toBeNull()
        expect(e3).not.toBeNull()
        expect(div.$_.previous().element).toEqual(e3)
        expect($_(e3).previous().element).toEqual(e2)
        expect($_(e2).previous().element).toEqual(e1)
        e1.parentNode.removeChild(e1)
        e2.parentNode.removeChild(e2)
        e3.parentNode.removeChild(e3)
    })

    /** should be able to insert right at the beginning */
    it('should insert new elements before first child', function()
    {
        var first = $_(document.body).firstChild()
        first.before(
            '<div id=before-first-div></div><p id=before-first-p></p>'
        )
        var e1 = document.getElementById('before-first-div'),
            e2 = document.getElementById('before-first-p')
        expect(e1).not.toBeNull()
        expect(e2).not.toBeNull()
        expect(first.previous().element).toEqual(e2)
        expect($_(e2).previous().element).toEqual(e1)
        expect(document.body.$_.firstChild().element).toEqual(e1)
        e1.parentNode.removeChild(e1)
        e2.parentNode.removeChild(e2)
    })
})

/**
 * Suite: hasClass
 * Description: tests the hasClass api
*/
describe('hasClass', function()
{
    /** No classes, ask for null, expect false */
    it('should return false for null argument for element with no classes',
    function()
    {
        expect($_(document.body).hasClass(null)).toEqual(false)
    })

    /** No classes, ask for empty string, expect false */
    it('should return false for empty argument for element with no classes',
    function()
    {
        expect($_(document.body).hasClass('')).toEqual(false)
    })

    /** No classes, ask for any given string, expect false */
    it('should return false for element with no classes', function()
    {
        expect($_(document.body).hasClass('some-class')).toEqual(false)
    })

    /** Exactly one class, ask for null, expect false */
    it('should return false for null argument for element with one class',
    function()
    {
        $_(document.body).append('<div class=has-class-single></div>')
        var $_newElem = document.body.$_.lastChild()
        expect($_newElem.hasClass(null)).toEqual(false)
        $_newElem.element.parentNode.removeChild($_newElem.element)
    })

    /** Exactly one class, ask for empty string, expect false */
    it('should return false for empty argument for element with one class',
    function()
    {
        $_(document.body).append('<div class=has-class-single></div>')
        var $_newElem = document.body.$_.lastChild()
        expect($_newElem.hasClass('')).toEqual(false)
        $_newElem.element.parentNode.removeChild($_newElem.element)
    })

    /** Exactly one class, ask for the same, expect true */
    it('should find existing class for element with one class', function()
    {
        $_(document.body).append('<div class=has-class-single></div>')
        var $_newElem = document.body.$_.lastChild()
        expect($_newElem.hasClass('has-class-single')).toEqual(true)
        $_newElem.element.parentNode.removeChild($_newElem.element)
    })

    /** Three classes, ask for all of them, expect true for all */
    it('should find all classes from beginning to end in list', function()
    {
        $_(document.body).append(
            '<div class="has-class-1 has-class-2 has-class-3"></div>'
        )
        var $_newElem = document.body.$_.lastChild()
        expect($_newElem.hasClass('has-class-1')).toEqual(true)
        expect($_newElem.hasClass('has-class-2')).toEqual(true)
        expect($_newElem.hasClass('has-class-3')).toEqual(true)
        $_newElem.element.parentNode.removeChild($_newElem.element)
    })

    /** Few classes, play with space at beginning and/or end, expect false */
    it('should return false for arguments with trailing or beginning space',
    function()
    {
        $_(document.body).append(
            '<div class="has-class-1 has-class-2 has-class-3"></div>'
        )
        var $_newElem = document.body.$_.lastChild()
        expect($_newElem.hasClass(' has-class-1')).toEqual(false)
        expect($_newElem.hasClass('has-class-1 ')).toEqual(false)
        expect($_newElem.hasClass(' has-class-1 ')).toEqual(false)
        expect($_newElem.hasClass(' has-class-2')).toEqual(false)
        expect($_newElem.hasClass('has-class-2 ')).toEqual(false)
        expect($_newElem.hasClass(' has-class-2 ')).toEqual(false)
        expect($_newElem.hasClass('has-class-3 ')).toEqual(false)
        expect($_newElem.hasClass(' has-class-3')).toEqual(false)
        expect($_newElem.hasClass(' has-class-3 ')).toEqual(false)
        $_newElem.element.parentNode.removeChild($_newElem.element)
    })

    /** Substring match should not work */
    it('should not match substrings of classes', function()
    {
        $_(document.body).append(
            '<div class="has-class-1 has-class-2 has-class-3"></div>'
        )
        var $_newElem = document.body.$_.lastChild()
        expect($_newElem.hasClass('has-class')).toEqual(false)
        expect($_newElem.hasClass(' has-class')).toEqual(false)
        expect($_newElem.hasClass('-class-1')).toEqual(false)
        $_newElem.element.parentNode.removeChild($_newElem.element)
    })

    /** Strings overlapping two or more classes should not work */
    it('should not match combinations of substrings of classes', function()
    {
        $_(document.body).append(
            '<div class="has-class-1 has-class-2 has-class-3"></div>'
        )
        var $_newElem = document.body.$_.lastChild()
        expect($_newElem.hasClass('-class-1 has-class-2')).toEqual(false)
        expect($_newElem.hasClass('class-1 has-class-2 has')).toEqual(false)
        expect($_newElem.hasClass('has-class-1 has-class-2')).toEqual(false)
        $_newElem.element.parentNode.removeChild($_newElem.element)
    })
})

/**
 * Suite: addClass
 * Description: tests addClass api
*/
describe('addClass', function()
{
    /** Null class should not be allowed */
    it('should gracefully ignore null argument', function()
    {
        $_(document.body).addClass(null)
        expect(document.body.$_.hasClass(null)).toBe(false)
    })

    /** Empty class name should not be allowed */
    it('should gracefully ignore empty argument', function()
    {
        $_(document.body).addClass('')
        expect(document.body.$_.hasClass('')).toBe(false)
    })

    /** Element with no classes should be able to add a class */
    it('should add a new class when no classes exist', function()
    {
        $_(document.body).append('<div></div>')
        var $_newElem = document.body.$_.lastChild()
        $_newElem.addClass('add-class-none-1')
        expect($_newElem.hasClass('add-class-none-1')).toEqual(true)
        $_newElem.element.parentNode.removeChild($_newElem.element)
    })

    /** Should be able to add a class when a class already exists */
    it('should add a new class when classes exist', function()
    {
        $_(document.body).append('<div class=add-class-exist-1></div>')
        var $_newElem = document.body.$_.lastChild()
        $_newElem.addClass('add-class-exist-2')
        expect($_newElem.hasClass('add-class-exist-1')).toEqual(true)
        expect($_newElem.hasClass('add-class-exist-2')).toEqual(true)
        $_newElem.element.parentNode.removeChild($_newElem.element)
    })

    /** Should refuse arguments with trailing or beginning space */
    it('should refuse class names with trailing or beginning space', function()
    {
        $_(document.body).append('<div></div>')
        var $_newElem = document.body.$_.lastChild()
        $_newElem.addClass('add-class-space-1 ')
        expect($_newElem.hasClass('add-class-space-1')).toEqual(false)
        $_newElem.addClass(' add-class-space-2')
        expect($_newElem.hasClass('add-class-space-2')).toEqual(false)
        $_newElem.addClass(' add-class-space-3 ')
        expect($_newElem.hasClass('add-class-space-3')).toEqual(false)
        $_newElem.element.parentNode.removeChild($_newElem.element)
    })

    /** Should refuse arguments with space within */
    it('should refuse space separated class names', function()
    {
        $_(document.body).append('<div></div>')
        var $_newElem = document.body.$_.lastChild()
        $_newElem.addClass('add-class-within-1 add-class-within-2')
        expect($_newElem.hasClass('add-class-within-1')).toEqual(false)
        expect($_newElem.hasClass('add-class-within-2')).toEqual(false)
        $_newElem.element.parentNode.removeChild($_newElem.element)
    })
})

/**
 * Suite: removeClass
 * Description: tests removeClass api
*/
describe('removeClass', function()
{
    /** Null class should not be allowed */
    it('should gracefully ignore null argument', function()
    {
        $_(document.body).append('<div class=remove-class-null></div>')
        var $_newElem = document.body.$_.lastChild()
        $_newElem.removeClass(null)
        expect($_newElem.hasClass('remove-class-null')).toBe(true)
        $_newElem.element.parentNode.removeChild($_newElem.element)
    })

    /** Empty class name should not be allowed */
    it('should gracefully ignore empty argument', function()
    {
        $_(document.body).append('<div class=remove-class-empty></div>')
        var $_newElem = document.body.$_.lastChild()
        $_newElem.removeClass('')
        expect($_newElem.hasClass('remove-class-empty')).toBe(true)
        $_newElem.element.parentNode.removeChild($_newElem.element)
    })

    /** Element with no classes should be able to deal with removing class */
    it('should remove nothing when no classes exist', function()
    {
        $_(document.body).append('<div></div>')
        var $_newElem = document.body.$_.lastChild()
        $_newElem.removeClass('remove-class-none-1')
        $_newElem.element.parentNode.removeChild($_newElem.element)
    })

    /** Should be able to deal with a non-matching argument */
    it('should remove nothing when argument class does not exist', function()
    {
        $_(document.body).append('<div class=remove-class-exist-1></div>')
        var $_newElem = document.body.$_.lastChild()
        $_newElem.removeClass('remove-class-exist-2')
        expect($_newElem.hasClass('remove-class-exist-1')).toEqual(true)
        $_newElem.addClass('remove-class-exist-2')
        $_newElem.addClass('remove-class-exist-3')
        $_newElem.removeClass('remove-class-exist-4')
        expect($_newElem.hasClass('remove-class-exist-1')).toEqual(true)
        expect($_newElem.hasClass('remove-class-exist-2')).toEqual(true)
        expect($_newElem.hasClass('remove-class-exist-3')).toEqual(true)
        $_newElem.element.parentNode.removeChild($_newElem.element)
    })

    /** Should remove single existing class */
    it('should remove single existing class', function()
    {
        $_(document.body).append('<div class=remove-class-single-1></div>')
        var $_newElem = document.body.$_.lastChild()
        expect($_newElem.hasClass('remove-class-single-1')).toEqual(true)
        $_newElem.removeClass('remove-class-single-1')
        expect($_newElem.hasClass('remove-class-single-1')).toEqual(false)
        $_newElem.element.parentNode.removeChild($_newElem.element)
    })

    /** Should remove existing classes */
    it('should remove argument class if it exists', function()
    {
        $_(document.body).append(
            '<div class="remove-class-1 remove-class-2 remove-class-3"></div>')
        var $_newElem = document.body.$_.lastChild()
        expect($_newElem.hasClass('remove-class-1')).toEqual(true)
        $_newElem.removeClass('remove-class-1')
        expect($_newElem.hasClass('remove-class-1')).toEqual(false)
        expect($_newElem.hasClass('remove-class-2')).toEqual(true)
        $_newElem.removeClass('remove-class-2')
        expect($_newElem.hasClass('remove-class-2')).toEqual(false)
        expect($_newElem.hasClass('remove-class-3')).toEqual(true)
        $_newElem.removeClass('remove-class-3')
        expect($_newElem.hasClass('remove-class-3')).toEqual(false)
        $_newElem.element.parentNode.removeChild($_newElem.element)
    })

    /** Should refuse arguments with trailing or beginning space */
    it('should refuse class names with trailing or beginning space', function()
    {
        $_(document.body).append('<div class=remove-class-space-1></div>')
        var $_newElem = document.body.$_.lastChild()
        $_newElem.removeClass('remove-class-space-1 ')
        expect($_newElem.hasClass('remove-class-space-1')).toEqual(true)
        $_newElem.removeClass(' remove-class-space-1')
        expect($_newElem.hasClass('remove-class-space-1')).toEqual(true)
        $_newElem.removeClass(' remove-class-space-1 ')
        expect($_newElem.hasClass('remove-class-space-1')).toEqual(true)
        $_newElem.addClass('remove-class-space-2')
            .addClass('remove-class-space-3')
        $_newElem.removeClass('remove-class-space-2 ')
        expect($_newElem.hasClass('remove-class-space-2')).toEqual(true)
        $_newElem.removeClass(' remove-class-space-2')
        expect($_newElem.hasClass('remove-class-space-2')).toEqual(true)
        $_newElem.removeClass(' remove-class-space-2 ')
        expect($_newElem.hasClass('remove-class-space-2')).toEqual(true)
        $_newElem.removeClass('remove-class-space-3 ')
        expect($_newElem.hasClass('remove-class-space-3')).toEqual(true)
        $_newElem.removeClass(' remove-class-space-3')
        expect($_newElem.hasClass('remove-class-space-3')).toEqual(true)
        $_newElem.removeClass(' remove-class-space-3 ')
        expect($_newElem.hasClass('remove-class-space-3')).toEqual(true)
        $_newElem.element.parentNode.removeChild($_newElem.element)
    })

    /** Should refuse arguments with space within */
    it('should refuse space separated class names', function()
    {
        $_(document.body).append(
            '<div class="remove-class-within-1 remove-class-within-2"></div>')
        var $_newElem = document.body.$_.lastChild()
        $_newElem.removeClass('remove-class-within-1 remove-class-within-2')
        expect($_newElem.hasClass('remove-class-within-1')).toEqual(true)
        expect($_newElem.hasClass('remove-class-within-2')).toEqual(true)
        $_newElem.removeClass('class-within-1 remove-class-within')
        expect($_newElem.hasClass('remove-class-within-1')).toEqual(true)
        expect($_newElem.hasClass('remove-class-within-2')).toEqual(true)
        $_newElem.element.parentNode.removeChild($_newElem.element)
    })
})

/**
 * Suite: style
 * Description: tests the functionality of style api
*/
describe('style', function()
{
    it('should provide style properties', function()
    {
        $_(document.body).append(
            '<div style=margin-left:4px;width:8px;border-top-style:solid></div>'
        )
        var last = $_(document.body).lastChild()
        expect(last.style('margin-left')).toEqual('4px')
        expect(last.style('width')).toEqual('8px')
        expect(last.style('border-top-style')).toEqual('solid')
    })
})

/**
 * Suite: topLeft
 * Description: tests topLeft functionality
*/
describe('topLeft', function()
{
    /** should return consistent values post scrolling */
    it('should return consistent values through window scrolling', function()
    {
        // Jasmine dependent code below
        var div = document.getElementsByTagName('div')[26]
        var initialTL = $_(div).topLeft()
        window.scrollTo(0, 100)
        var afterScrollTL = $_(div).topLeft()
        // Windows Phone has decimal values for top/left and they are
        // off by a margin less than 1. All other platforms work with
        // simple equality checks: afterScrollTL.? = initialTL.?
        expect(Math.abs(afterScrollTL.top-initialTL.top)).toBeLessThan(1)
        expect(Math.abs(afterScrollTL.left-initialTL.left)).toBeLessThan(1)
        window.scrollTo(0, 200)
        afterScrollTL = $_(div).topLeft()
        expect(Math.abs(afterScrollTL.top-initialTL.top)).toBeLessThan(1)
        expect(Math.abs(afterScrollTL.left-initialTL.left)).toBeLessThan(1)
        window.scrollTo(0, 400)
        afterScrollTL = $_(div).topLeft()
        expect(Math.abs(afterScrollTL.top-initialTL.top)).toBeLessThan(1)
        expect(Math.abs(afterScrollTL.left-initialTL.left)).toBeLessThan(1)
        window.scrollTo(0, 600)
        afterScrollTL = $_(div).topLeft()
        expect(Math.abs(afterScrollTL.top-initialTL.top)).toBeLessThan(1)
        expect(Math.abs(afterScrollTL.left-initialTL.left)).toBeLessThan(1)
        window.scrollTo(0, 800)
        afterScrollTL = $_(div).topLeft()
        expect(Math.abs(afterScrollTL.top-initialTL.top)).toBeLessThan(1)
        expect(Math.abs(afterScrollTL.left-initialTL.left)).toBeLessThan(1)
    })

    /** should return valid values of absolute position elements */
    it('should return valid values for absolute position', function()
    {
        if(! $_.capabilities.absolutePosition)
            return
        $_(document.body).append(
            '<div id=topleft-absolute style=position:absolute;top:100px;left:100px></div>'
        )
        var $_div = document.body.$_.lastChild()
        var initialTL = $_div.topLeft()
        // Windows Phone has decimal values for top/left and they are
        // off by a margin less than 1. All other platforms work with
        // simple equality checks: afterScrollTL.? = initialTL.?
        expect(Math.abs(initialTL.top-100)).toBeLessThan(1)
        expect(Math.abs(initialTL.left-100)).toBeLessThan(1)
        window.scrollTo(0, 100)
        var afterScrollTL = $_div.topLeft()
        expect(Math.abs(afterScrollTL.top-initialTL.top)).toBeLessThan(1)
        expect(Math.abs(afterScrollTL.left-initialTL.left)).toBeLessThan(1)
        window.scrollTo(0, 200)
        afterScrollTL = $_div.topLeft()
        expect(Math.abs(afterScrollTL.top-initialTL.top)).toBeLessThan(1)
        expect(Math.abs(afterScrollTL.left-initialTL.left)).toBeLessThan(1)
        window.scrollTo(0, 400)
        afterScrollTL = $_div.topLeft()
        expect(Math.abs(afterScrollTL.top-initialTL.top)).toBeLessThan(1)
        expect(Math.abs(afterScrollTL.left-initialTL.left)).toBeLessThan(1)
        window.scrollTo(0, 600)
        afterScrollTL = $_div.topLeft()
        expect(Math.abs(afterScrollTL.top-initialTL.top)).toBeLessThan(1)
        expect(Math.abs(afterScrollTL.left-initialTL.left)).toBeLessThan(1)
        window.scrollTo(0, 800)
        afterScrollTL = $_div.topLeft()
        expect(Math.abs(afterScrollTL.top-initialTL.top)).toBeLessThan(1)
        expect(Math.abs(afterScrollTL.left-initialTL.left)).toBeLessThan(1)
        $_div.element.parentNode.removeChild($_div.element)
        window.scrollTo(0, 0)
    })

    /** should return valid values of fixed position elements */
    it('should return valid values for fixed position', function()
    {
        if(! $_.capabilities.fixedPosition)
            return
        $_(document.body).append(
            '<div id=topleft-fixed style=position:fixed;top:100px;left:100px></div>'
        )
        var $_div = document.body.$_.lastChild()
        var initialTL = $_div.topLeft(), afterScrollTL
        expect(initialTL.left).toEqual(100)
        $_div.element.parentNode.removeChild($_div.element)

        // When it comes to scrolling and rendering fixed elements, older
        // OS's have some huge crazy to mad issues. Various versions were
        // tried. For one version where scrollTo is put under a 0 timeout
        // handler, things work for android; but again not on others e.g.
        // iOS, winphone, opera os etc. Also, when this 0 timeout version
        // is put under runs() and waitsFor() blocks of Jasmine, things do
        // not work.
    })
})

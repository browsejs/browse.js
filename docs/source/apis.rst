API Documentation
=================

browse.js wrapper
-----------------

$_
..

Synopsis
~~~~~~~~

Wraps the argument (should be a valid HTML element) into a ``browse.js`` object and returns it.

.. code-block:: javascript

    function $_(element)

Example
~~~~~~~

.. code-block:: javascript

    var obj = $_(document.body)
    // The above does the following:
    // --> obj.element === document.body
    // --> document.body.$_ === obj

Return Value
~~~~~~~~~~~~

The ``browse.js`` wrapper object. Returns ``null`` if the argument passed is not a valid HTML element.

Document-scope APIs
-------------------

ready
.....

Synopsis
~~~~~~~~

Execute a user-specified function once the document is loaded. No arguments are provided to the user-specified function.

.. code-block:: javascript

    $_.ready(callback)

Example
~~~~~~~

.. code-block:: javascript

    $_.ready(function() {
      // do something
    })

Window-scope APIs
-----------------

windowHeight
............

Synopsis
~~~~~~~~

Returns the height of the browser window.

.. code-block:: javascript

    $_.windowHeight()

windowWidth
...........

Synopsis
~~~~~~~~

Returns the width of the browser window.

.. code-block:: javascript

    $_.windowWidth()

DOM Lookups
-----------

firstChild
..........

Synopsis
~~~~~~~~

Get the first HTML element child of a given HTML element. Called on the ``browse.js`` object that wraps the given HTML element.

.. code-block:: javascript

    browse.prototype.firstChild()

Example
~~~~~~~

.. code-block:: html

    <div id=my-div>
      <div></div>
    </div>

.. code-block:: javascript

    var div = $_(document.getElementById('my-div'))
    var firstChild = div.firstChild()

Return Value
~~~~~~~~~~~~

Returns ``browse.js`` wrapper object of the first HTML element child if one exists. Returns ``null`` otherwise.

lastChild
.........

Synopsis
~~~~~~~~

Get the last HTML element child of a given HTML element. Called on the ``browse.js`` object that wraps the given HTML element.

.. code-block:: javascript

    browse.prototype.lastChild()

Example
~~~~~~~

.. code-block:: html

    <div id=my-div>
      <div></div>
    </div>

.. code-block:: javascript

    var div = $_(document.getElementById('my-div'))
    var lastChild = div.lastChild()

Return Value
~~~~~~~~~~~~

Returns ``browse.js`` wrapper object of the last HTML element child if one exists. Returns ``null`` otherwise.

next
....

Synopsis
~~~~~~~~

Get the next HTML element sibling of an HTML element. Called on the ``browse.js`` object that wraps the given HTML element.

.. code-block:: javascript

    browse.prototype.next()

Example
~~~~~~~

.. code-block:: html

    <div id=my-div></div>
    <div></div>

.. code-block:: javascript

    var div = $_(document.getElementById('my-div'))
    var next = div.next()

Return Value
~~~~~~~~~~~~

Returns ``browse.js`` wrapper object of the next HTML element sibling if one exists. Returns ``null`` otherwise.

previous
........

Synopsis
~~~~~~~~

Get the previous HTML element sibling of an HTML element. Called on the ``browse.js`` object that wraps the given HTML element.

.. code-block:: javascript

    browse.prototype.previous()

Example
~~~~~~~

.. code-block:: html

    <div></div>
    <div id=my-div></div>

.. code-block:: javascript

    var div = $_(document.getElementById('my-div'))
    var ret = div.previous()

Return Value
~~~~~~~~~~~~

Returns ``browse.js`` wrapper object of the previous HTML element sibling if one exists. Returns ``null`` otherwise.

index
.....

Synopsis
~~~~~~~~

Gets the index (0-based) of an element relative to its parent. Called on the ``browse.js`` object that wraps the HTML element the index of which is required.

.. code-block:: javascript

    browse.prototype.index()

Example
~~~~~~~

.. code-block:: html

    <div>
      <div></div>
      <p></p>
      <div id=my-div></div>
    </div>

.. code-block:: javascript

    var div = $_(document.getElementById('my-div'))
    var idx = div.index() // --> 2

Return Value
~~~~~~~~~~~~

Return a number.

nthChild
........

Synopsis
~~~~~~~~

Get the nth child (0-based, so n=10 is 11th child) of a given HTML element. Called on the ``browse.js`` object that wraps the given HTML element.

.. code-block:: javascript

    browse.prototype.nthChild(n)

Example
~~~~~~~

.. code-block:: html

    <div id=parent-div>
      <div></div>
      <p></p>
      <div id=my-div></div>
    </div>

.. code-block:: javascript

    var div = $_(document.getElementById('parent-div'))
    var nthChild = div.nthChild(2) // --> <div id=my-div></div>

Return Value
~~~~~~~~~~~~

Returns ``browse.js`` wrapper object of the nth child, if one exists. Returns ``null`` otherwise.

DOM Tree Modification
---------------------

append
......

Synopsis
~~~~~~~~

Append given HTML into a given HTML element. Called on the ``browse.js`` object that wraps the given HTML element.

.. code-block:: javascript

    browse.prototype.append(htmlString)

Example
~~~~~~~

.. code-block:: html

    <div id=my-div></div>

.. code-block:: javascript

    var div = $_(document.getElementById('my-div'))
    div.append('<div></div>')

Change in DOM after the above ``append`` call (represented using HTML):

.. code-block:: html

    <div id=my-div>
      <div></div>
    </div>

Return Value
~~~~~~~~~~~~

Returns the ``browse.js`` wrapper object on which ``append`` has been called. This can be used for chaining other API calls on this object e.g. ``obj.append(...).next()``.

prepend
.......

Synopsis
~~~~~~~~

Prepend given HTML into a given HTML element. Called on the ``browse.js`` object that wraps the given HTML element.

.. code-block:: javascript

    browse.prototype.prepend(htmlString)

Example
~~~~~~~

.. code-block:: html

    <div id=my-div></div>

.. code-block:: javascript

    var div = $_(document.getElementById('my-div'))
    div.prepend('<div></div>')

Change in DOM after the above ``prepend`` call (represented using HTML):

.. code-block:: html

    <div id=my-div>
      <div></div>
    </div>

Return Value
~~~~~~~~~~~~

Returns the ``browse.js`` wrapper object on which ``prepend`` has been called. This can be used for chaining other API calls on this object e.g. ``obj.prepend(...).next()``.

after
.....

Synopsis
~~~~~~~~

Insert given HTML just after a given HTML element to create new siblings. Called on the ``browse.js`` object that wraps the given HTML element.

.. code-block:: javascript

    browse.prototype.after(htmlString)

Example
~~~~~~~

.. code-block:: html

    <div id=my-div></div>

.. code-block:: javascript

    var div = $_(document.getElementById('my-div'))
    div.after('<div id=another></div>')

Change in DOM after the above ``after`` call (represented using HTML):

.. code-block:: html

    <div id=my-div></div>
    <div id=another></div>

Return Value
~~~~~~~~~~~~

Returns the ``browse.js`` wrapper object on which ``after`` has been called. This can be used for chaining other API calls on this object e.g. ``obj.after(...).next()``.

before
......

Synopsis
~~~~~~~~

Insert given HTML just before a given HTML element to create new siblings. Called on the ``browse.js`` object that wraps the given HTML element.

.. code-block:: javascript

    browse.prototype.before(htmlString)

Example
~~~~~~~

.. code-block:: html

    <div id=my-div></div>

.. code-block:: javascript

    var div = $_(document.getElementById('my-div'))
    div.before('<div id=another></div>')

Change in DOM after the above ``before`` call (represented using HTML):

.. code-block:: html

    <div id=another></div>
    <div id=my-div></div>

Return Value
~~~~~~~~~~~~

Returns the ``browse.js`` wrapper object on which ``before`` has been called. This can be used for chaining other API calls on this object e.g. ``obj.before(...).next()``.

remove
......

Synopsis
~~~~~~~~

Removes an HTML element from DOM. Called on the ``browse.js`` object that wraps the given HTML element.

.. code-block:: javascript

    browse.prototype.remove()

Example
~~~~~~~

.. code-block:: html

    <div id=my-div></div>
    <p></p>

.. code-block:: javascript

    var div = $_(document.getElementById('my-div'))
    div.remove()

Change in DOM after the above ``remove`` call (represented using HTML):

.. code-block:: html

    <p></p>

Element Dimensions & Position
-----------------------------

height
......

Synopsis
~~~~~~~~

Returns the visible height (in px) of an HTML element. Called on the ``browse.js`` object that wraps the given HTML element.

.. code-block:: javascript

    browse.prototype.height()

Example
~~~~~~~

.. code-block:: html

    <div id=my-div style=height:40px></div>
    <img id=my-img height=40>

.. code-block:: javascript

    var div = $_(document.getElementById('my-div'))
    div.height() // --> 40
    var img = $_(document.getElementById('my-img'))
    img.height() // --> 40

Return Value
~~~~~~~~~~~~

A number that represents height of the given element in pixels (px unit).

width
.....

Synopsis
~~~~~~~~

Returns the visible width (in px) of an HTML element. Called on the ``browse.js`` object that wraps the given HTML element.

.. code-block:: javascript

    browse.prototype.width()

Example
~~~~~~~

.. code-block:: html

    <div id=my-div style=width:40px></div>
    <img id=my-img width=40>

.. code-block:: javascript

    var div = $_(document.getElementById('my-div'))
    div.width() // --> 40
    var img = $_(document.getElementById('my-img'))
    img.width() // --> 40

Return Value
~~~~~~~~~~~~

A number that represents width of the given element in pixels (px unit).

innerHeight
...........

Synopsis
~~~~~~~~

Returns the height (in px) of an HTML element's contents. It is different from the visible height when the element has a vertical scroll bar. Called on the ``browse.js`` object that wraps the given HTML element.

.. code-block:: javascript

    browse.prototype.innerHeight()

Example
~~~~~~~

.. code-block:: html

    <div id=my-div style=max-height:20px;overflow:scroll><!-- some contents here --></div>

.. code-block:: javascript

    var div = $_(document.getElementById('my-div'))
    div.innerHeight() // --> 47 (randomly picked)
    div.height() // --> 20

Return Value
~~~~~~~~~~~~

A number that represents inner height of the given element in pixels (px unit).

innerWidth
..........

Synopsis
~~~~~~~~

Returns the width (in px) of an HTML element's contents. It is different from the visible width when the element has a horizontal scroll bar. Called on the ``browse.js`` object that wraps the given HTML element.

.. code-block:: javascript

    browse.prototype.innerWidth()

Example
~~~~~~~

.. code-block:: html

    <div id=my-div style=max-width:20px;overflow:scroll><!-- some contents here --></div>

.. code-block:: javascript

    var div = $_(document.getElementById('my-div'))
    div.innerWidth() // --> 83 (randomly picked)
    div.width() // --> 20

Return Value
~~~~~~~~~~~~

A number that represents inner width of the given element in pixels (px unit).

topLeft
.......

Synopsis
~~~~~~~~

Returns the position of an HTML element, relative to the document's top-left corner (not relative to window's top-left).

.. code-block:: javascript

    browse.topLeft()

Example
~~~~~~~

.. code-block:: html

    <div id=my-div</div>

.. code-block:: javascript

    var div = $_(document.getElementById('my-div'))
    var topLeft = div.topLeft() // --> { top: 106, left: 203 }

Return Value
~~~~~~~~~~~~

An object of the following format:

.. code-block:: javascript

    { top: <Number>, left: <Number> }

For example:

.. code-block:: javascript

    { top: 33, left: 121 }

Element Attributes
------------------

``browse.js`` has no APIs to access the attributes and it is recommended to use ``getAttribute``, ``hasAttribute``, ``setAttribute`` and ``removeAttribute`` DOM APIs that are available widely.

However; there are some attributes that have implementation-specific differences across browsers, and APIs have been provided for them.

getClass
........

Synopsis
~~~~~~~~

Get the value of the ``class`` attribute of an HTML element. Called on the ``browse.js`` object that wraps the given HTML element.

.. code-block:: javascript

    browse.prototype.getClass()

Example
~~~~~~~

.. code-block:: html

    <div class="my-class-1 my-class-2" id=my-div></div>

.. code-block:: javascript

    var div = $_(document.getElementById('my-div'))
    div.getClass() // --> "my-class-1 my-class-2"

Return Value
~~~~~~~~~~~~

A string which contains the value of the ``class`` attribute of the element.

hasClass
........

Synopsis
~~~~~~~~

Checks if an HTML element has the given argument class. Called on the ``browse.js`` object that wraps the given HTML element.

.. code-block:: javascript

    browse.prototype.hasClass(className)

Example
~~~~~~~

.. code-block:: html

    <div class="my-class-1 my-class-2" id=my-div></div>

.. code-block:: javascript

    var div = $_(document.getElementById('my-div'))
    div.hasClass('my-class-1') // --> true
    div.hasClass('my-class-abc') // --> false

Return Value
~~~~~~~~~~~~

A boolean. True if argument class exists. False otherwise.

addClass
........

Synopsis
~~~~~~~~

Adds the argument class to an HTML element (if it did not exist already). Called on the ``browse.js`` object that wraps the given HTML element.

.. code-block:: javascript

    browse.prototype.addClass(className)

Example
~~~~~~~

.. code-block:: html

    <div id=my-div></div>

.. code-block:: javascript

    var div = $_(document.getElementById('my-div'))
    div.addClass('my-class-1')

Change in DOM after the above ``addClass`` call (represented using HTML):

.. code-block:: html

    <div id=my-div class=my-class-1></div>

Return Value
~~~~~~~~~~~~

Returns the ``browse.js`` wrapper object on which ``addClass`` has been called. This can be used for chaining other API calls on this object e.g. ``obj.addClass(...).next()``.

removeClass
...........

Synopsis
~~~~~~~~

Removes the argument class to an HTML element (if it exists). Called on the ``browse.js`` object that wraps the given HTML element.

.. code-block:: javascript

    browse.prototype.removeClass(className)

Example
~~~~~~~

.. code-block:: html

    <div id=my-div class=my-class></div>

.. code-block:: javascript

    var div = $_(document.getElementById('my-div'))
    div.removeClass('my-class')

Change in DOM after the above ``removeClass`` call (represented using HTML):

.. code-block:: html

    <div id=my-div class=""></div>

Return Value
~~~~~~~~~~~~

Returns the ``browse.js`` wrapper object on which ``removeClass`` has been called. This can be used for chaining other API calls on this object e.g. ``obj.removeClass(...).next()``.

Working with Input Controls
---------------------------

value
.....

Synopsis
~~~~~~~~

Used to get and set the value of an input control HTML element (all ``input`` types, ``select``, ``option``, and ``textarea``). Called on the ``browse.js`` object that wraps the given HTML element.

.. code-block:: javascript

    browse.prototype.value()
    browse.prototype.value(someValue)

Example
~~~~~~~

.. code-block:: html

    <input type=text name=text id=text value=10>

.. code-block:: javascript

    var text = $_(document.getElementById('text'))
    text.value() // --> '10'
    text.value('abc')

Change in DOM after the above ``value`` call to set the value of an input control (represented using HTML):

.. code-block:: html

    <input type=text name=text id=text value=abc>

Return Value
~~~~~~~~~~~~

Returns the value of the input control element (a String) when ``value`` is called without an argument.

Returns the ``browse.js`` wrapper object on which ``value`` has been called, in case called with an argument. This can be used for chaining other API calls on this object e.g. ``obj.value(...).next()``.

Style Access & Manipulation
---------------------------

hide
....

Synopsis
~~~~~~~~

Hides the given HTML element by setting its ``display`` style property appropriately. Called on the ``browse.js`` object that wraps the given HTML element.

.. code-block:: javascript

    browse.prototype.hide()

Example
~~~~~~~

.. code-block:: html

    <div id=my-div></div>

.. code-block:: javascript

    var div = $_(document.getElementById('my-div'))
    div.hide()

Change in DOM after calling ``hide`` above (represented as HTML):

.. code-block:: html

    <div id=my-div style=display:none></div>

Return Value
~~~~~~~~~~~~

Returns the ``browse.js`` wrapper object on which ``hide`` has been called. This can be used for chaining other API calls on this object e.g. ``obj.hide(...).next()``.

show
....

Synopsis
~~~~~~~~

Shows a hidden HTML element by setting its ``display`` style property appropriately. Called on the ``browse.js`` object that wraps the given HTML element.

.. code-block:: javascript

    browse.prototype.show()

Example
~~~~~~~

.. code-block:: html

    <div id=my-div style=display:none></div>

.. code-block:: javascript

    var div = $_(document.getElementById('my-div'))
    div.show()

Change in DOM after calling ``show`` above (represented as HTML):

.. code-block:: html

    <div id=my-div></div>

Return Value
~~~~~~~~~~~~

Returns the ``browse.js`` wrapper object on which ``show`` has been called. This can be used for chaining other API calls on this object e.g. ``obj.show(...).next()``.

opacity
.......

Synopsis
~~~~~~~~

Sets and gets opacity of an HTML element. Called on the ``browse.js`` object that wraps the given HTML element.

.. code-block:: javascript

    browse.prototype.opacity()
    browse.prototype.opacity(opacityVal)

Example
~~~~~~~

.. code-block:: html

    <div id=my-div></div>

.. code-block:: javascript

    var div = $_(document.getElementById('my-div'))
    var opacity = div.opacity() // --> 1.0
    div.opacity(0.4)

Change in DOM after calling ``opacity`` above to set the opacity (represented as HTML):

.. code-block:: html

    <div id=my-div style=opacity:0.4></div> // most browsers
    <div id=my-div style="filter:alpha(opacity=40)"></div> // old IE

Return Value
~~~~~~~~~~~~

Returns the opacity (decimal number) of the element when called without any arguments.

Returns the ``browse.js`` wrapper object on which ``opacity`` has been called, in case called with an argument. This can be used for chaining other API calls on this object e.g. ``obj.opacity(...).next()``.

style
.....

Synopsis
~~~~~~~~

Sets and gets style properties of an HTML element. Called on the ``browse.js`` object that wraps the given HTML element.

**NOTE**: The specific methods ``hide``, ``show``, and ``opacity`` defined above should be used for their respective purpose, rather than using this method to set/get the style properties involved (``display``, and ``opacity``/``filter``).

.. code-block:: javascript

    browse.prototype.style(property)
    browse.prototype.style(property, value)

Example
~~~~~~~

.. code-block:: html

    <div id=my-div style=color:red></div>

.. code-block:: javascript

    var div = $_(document.getElementById('my-div'))
    var color = div.style('color') // --> 'red'
    div.style('color', 'blue')
    div.style('width', '20px')

Change in DOM after calling ``style`` above to set style properties (represented as HTML):

.. code-block:: html

    <div id=my-div style=color:blue;width:20px></div>

Return Value
~~~~~~~~~~~~

Returns a style property when called with only the 1st argument ``property``.

Returns the ``browse.js`` wrapper object on which ``style`` has been called, in case called with two arguments. This can be used for chaining other API calls on this object e.g. ``obj.style(...).next()``.

Animation
---------

Following animation modes are supported across all animation APIs:

* ``linear``\ (default)
* ``swing``
* ``easeInQuadratic``
* ``easeOutQuadratic``

fadeOut
.......

Synopsis
~~~~~~~~

Fades out an HTML element in given ``duration`` (milliseconds) using the provided animation ``mode`` (optional) and invokes user-provided ``callback`` once done. The default ``mode`` is ``linear``. No arguments are passed to the ``callback``.

.. code-block:: javascript

    browse.prototype.fadeOut(duration, callback)
    browse.prototype.fadeOut(duration, mode, callback)

Example
~~~~~~~

.. code-block:: html

    <div id=my-div></div>

.. code-block:: javascript

    var div = $_(document.getElementById('my-div'))
    div.fadeOut(300, function() {
      // do something
    })
    div.fadeOut(300, 'swing', function() {
      // do something
    })

Change in DOM after invoking any of the ``fadeOut`` calls above (represented as HTML):

.. code-block:: html

    <div id=my-div style=display:none;opacity:0></div>

Return Value
~~~~~~~~~~~~

Returns the ``browse.js`` wrapper object on which ``fadeOut`` has been called, in case called with two arguments. This can be used for chaining other API calls on this object e.g. ``obj.fadeOut(...).next()``.

fadeIn
......

Synopsis
~~~~~~~~

Fades in an HTML element in given ``duration`` (milliseconds) using the provided animation ``mode`` (optional) and invokes user-provided ``callback`` once done. The default ``mode`` is ``linear``. No arguments are passed to the ``callback``.

.. code-block:: javascript

    browse.prototype.fadeIn(duration, callback)
    browse.prototype.fadeIn(duration, mode, callback)

Example
~~~~~~~

.. code-block:: html

    <div id=my-div style=display:none;opacity:0></div>

.. code-block:: javascript

    var div = $_(document.getElementById('my-div'))
    div.fadeIn(300, function() {
      // do something
    })
    div.fadeIn(300, 'easeInQuadratic', function() {
      // do something
    })

Change in DOM after invoking any of the ``fadeIn`` calls above (represented as HTML):

.. code-block:: html

    <div id=my-div style=opacity:1></div>

Return Value
~~~~~~~~~~~~

Returns the ``browse.js`` wrapper object on which ``fadeIn`` has been called, in case called with two arguments. This can be used for chaining other API calls on this object e.g. ``obj.fadeIn(...).next()``.

scrollY
.......

Synopsis
~~~~~~~~

Scrolls the window to given ``toY`` position in given ``duration`` (milliseconds) using the provided animation ``mode`` (optional) and invokes user-provided ``callback`` once done. No arguments are passed to the ``callback``.

.. code-block:: javascript

    $_.scrollY(toY, duration, callback)
    $_.scrollY(toY, duration, mode, callback)

Example
~~~~~~~

.. code-block:: javascript

    $_.scrollY(100, 2000, function() { 
      // do something
    })
    $_.scrollY(100, 2000, 'easeOutQuadratic', function() { 
      // do something
    })

Events
------

onclick
.......

Synopsis
~~~~~~~~

Binds a handler function to an HTML element or ``document`` for the ``click`` event. An ``event`` argument is passed to the ``callback``.

.. code-block:: javascript

    browse.prototype.onclick(callback)
    $_.onclick(callback)

Example
~~~~~~~

.. code-block:: html

    <input type=submit name=submit id=submit>

.. code-block:: javascript

    var submit = $_(document.getElementById('submit'))
    submit.onclick(function(e){
      // do something
    })
    $_.onclick(function(e){
      // do something when document receives a click
    }

Return Value
~~~~~~~~~~~~

The version used to bind a handler to ``document`` does not return anything.

The version used to bind a handler to an HTML element returns the ``browse.js`` wrapper object on which ``onclick`` has been called, in case called with two arguments. This can be used for chaining other API calls on this object e.g. ``obj.onclick(...).next()``.

onkeyup
.......

Synopsis
~~~~~~~~

Binds a handler function to an HTML element or ``document`` for the ``keyup`` event. An ``event`` argument is passed to the ``callback``.

.. code-block:: javascript

    browse.prototype.onkeyup(callback)
    $_.onkeyup(callback)

Example
~~~~~~~

.. code-block:: html

    <input type=text name=text id=text value=10>

.. code-block:: javascript

    var text = $_(document.getElementById('text'))
    text.onkeyup(function(e){
      // do something
    })
    $_.onkeyup(function(e){
      // do something when document receives a keyup
    })

Return Value
~~~~~~~~~~~~

The version used to bind a handler to ``document`` does not return anything.

The version used to bind a handler to an HTML element returns the ``browse.js`` wrapper object on which ``onkeyup`` has been called, in case called with two arguments. This can be used for chaining other API calls on this object e.g. ``obj.onkeyup(...).next()``.

onchange
........

Synopsis
~~~~~~~~

Binds a handler function to an HTML element or ``document`` for the ``change`` event. No arguments are passed to the ``callback``.

.. code-block:: javascript

    browse.prototype.onchange(callback)
    $_.onkeyup(callback)

Example
~~~~~~~

.. code-block:: html

    <input type=text name=text id=text value=10>

.. code-block:: javascript

    var text = $_(document.getElementById('text'))
    text.onchange(function(){
      // do something
    })
    $_.onchange(function(){
      // do something when document receives a change
    })

Return Value
~~~~~~~~~~~~

The version used to bind a handler to ``document`` does not return anything.

The version used to bind a handler to an HTML element returns the ``browse.js`` wrapper object on which ``onchange`` has been called, in case called with two arguments. This can be used for chaining other API calls on this object e.g. ``obj.onchange(...).next()``.

trigger
.......

Synopsis
~~~~~~~~

Triggers an event on an HTML element or ``document``. Currently, following events can be triggered:

* ``click``
* ``keyup``
* ``change``

.. code-block:: javascript

    browse.prototype.trigger('change')
    browse.prototype.trigger('keyup'||'click', event)
    $_.trigger('change')
    $_.trigger('keyup'||'click', event)

Example
~~~~~~~

.. code-block:: html

    <input type=text name=text id=text value=10>
    <input type=submit name=submit id=submit>

.. code-block:: javascript

    var text = $_(document.getElementById('text'))
    text.trigger('change')
    text.trigger('keyup', {keyCode: 2})
    var submit = $_(document.getElementById('submit'))
    submit.trigger('click', {button: 1, ctrlKey: true})
    $_.trigger('change')
    $_.trigger('keyup', {keyCode: 2})
    $_.trigger('click', {button: 1, ctrlKey: true})

**Pending Documentation**: Specification of the event parameters for different event types.

Return Value
~~~~~~~~~~~~

The version used with ``document`` does not return anything.

The version used with an HTML element returns the ``browse.js`` wrapper object on which ``trigger`` has been called, in case called with two arguments. This can be used for chaining other API calls on this object e.g. ``obj.trigger(...).next()``.

AJAX
----

ajax
....

Synopsis
~~~~~~~~

Performs an AJAX request to specified ``url`` while applying the ``options`` provided.

.. code-block:: javascript

    $_.ajax(url, options)

Allowed keys and values in the argument ``options`` object are as follows:

+-----------------+------------+-------------+----------------+--------------------------------------+
| Name            | Required?  | Default     | Allowed Values | Description                          |
+=================+============+=============+================+======================================+
| ``method``      | Yes        | None        | ``GET``        | Uppercase name of HTTP verb/method   |
|                 |            |             | ``POST``       | to be used                           |
|                 |            |             | ``PATCH``      |                                      |
|                 |            |             | ``PUT``        |                                      |
|                 |            |             | ``DELETE``     |                                      |
|                 |            |             | ``OPTIONS``    |                                      |
|                 |            |             | ``HEAD``       |                                      |
+-----------------+------------+-------------+----------------+--------------------------------------+
| ``success``     | Yes        | None        |                | A function to call once there is a   |
|                 |            |             |                | 2XX status. Expected signature:      |
|                 |            |             |                | ``function(data, status, url, xhr)`` |
+-----------------+------------+-------------+----------------+--------------------------------------+
| ``error``       | Yes        | None        |                | A function to call once there is an  |
|                 |            |             |                | error status. Expected signature:    |
|                 |            |             |                | ``function(err, status, url, xhr)``  |
+-----------------+------------+-------------+----------------+--------------------------------------+
| ``timeout``     | No         | None        |                | If provided, a timeout of given      |
|                 |            |             |                | milliseconds is applied to the       |
|                 |            |             |                | request                              |
+-----------------+------------+-------------+----------------+--------------------------------------+
| ``headers``     | No         | None        |                | An object containing headers to add  |
|                 |            |             |                | to the HTTP request                  |
+-----------------+------------+-------------+----------------+--------------------------------------+
| ``contentType`` | No         | applicatio\ | application/x-\| Desired value for ``Content-type``   |
|                 |            | n/x-www-fo\ | www-form-urlen\| header. **NOTE**: Do not add this    |
|                 |            | rm-urlenco\ | coded; charset\| header in ``headers`` if using the   |
|                 |            | ed; charse\ | t=utf-8        | ``contentType`` key.                 |
|                 |            | t=utf-8     |                |                                      |
|                 |            |             | multipart/form\|                                      |
|                 |            |             | -data; charset\|                                      |
|                 |            |             | =utf-8         |                                      |
|                 |            |             |                |                                      |
|                 |            |             | application/js\|                                      |
|                 |            |             | on; charset=ut\|                                      |
|                 |            |             | f-8            |                                      |
+-----------------+------------+-------------+----------------+--------------------------------------+
| ``data``        | No         | None        | ``String``     | The data to send with a request like |
|                 |            |             | ``Object``     | ``POST``, ``PATCH``, and ``PUT``.    |
|                 |            |             |                | It is ignored for ``GET``, ``HEAD``, |
|                 |            |             |                | and ``OPTIONS``.                     |
+-----------------+------------+-------------+----------------+--------------------------------------+
| ``format``      | No         | None        | ``json``       | The response body is parsed as per   |
|                 |            |             | ``xml``        | the format specified and passed as   |
|                 |            |             |                | ``data`` parameter of ``success``    |
|                 |            |             |                | callback, or as ``err`` parameter of |
|                 |            |             |                | ``error`` callback.                  |
+-----------------+------------+-------------+----------------+--------------------------------------+
| ``cache``       | No         | ``false``   | ``Boolean``    | If it is ``true``, a nonce is added  |
|                 |            |             |                | to the URL to avoid response caching |
|                 |            |             |                | in the server.                       |
+-----------------+------------+-------------+----------------+--------------------------------------+

Example
~~~~~~~

Sending a GET request with caching in server disallowed, a timeout of 5 seconds, and JSON being the expected format of response data:

.. code-block:: javascript

    $_.ajax('http://myhost.com/', {
      method: 'GET',
      cache: false,
      timeout: 5000,
      format: 'json',
      success: function(response, status, url, xhr) {
        // do something
      },
      error: function(error, status, url, xhr) {
        // do something
      }
    })

Sending a POST request that should send stringized JSON data created using the input data provided:

.. code-block:: javascript

    $_.ajax('http://myhost.com/', {
      method: 'POST',
      data: {a: 1, b: 2},
      contentType: 'application/json; charset=utf-8',
      timeout: 5000,
      success: function(response, status, url, xhr) {
        // do something
      },
      error: function(error, status, url, xhr) {
        // do something
      }
    })

Sending files using ``multipart/form-data``:

.. code-block:: html

    <form id=my-form enctype=multipart/form-data>
      <input type=file name=file>
    </form>

.. code-block:: javascript

    $_.ajax('http://myhost.com/', {
      method: 'POST',
      data: document.getElementById('my-form'),
      contentType: 'multipart/form-data; charset=utf-8',
      timeout: 5000,
      success: function(response, status, url, xhr) {
        // do something
      },
      error: function(error, status, url, xhr) {
        // do something
      }
    })

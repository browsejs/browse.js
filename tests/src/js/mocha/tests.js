/**
 * Tests for browse wrapper
*/

var expect = chai.expect

describe('Browse', function() {

    // Test: Wrap a non HTMLElement node
    it('should return null for a non-HTMLElement node', function() {
        // the DOM element being accessed below is a Text node
        expect($_(document.documentElement.firstChild.firstChild)).to.be.null
    })

    // Test: Wrap body element and check its internal browse structure
    it('should return a valid object for body element', function() {
        expect($_(document.body)).to.be.ok
        expect($_(document.body).element).to.be.ok
        expect($_(document.body).element.tagName.toLowerCase()).to.be.equal('body')
    })
})

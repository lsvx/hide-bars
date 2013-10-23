"use strict";

/**
 * Creates a new hideBars instance.
 * @constructor
 * @param {...string|object|Array.<string, obejct>} el - A string
 * representing an element selector, an HTML node, an array of a mix of element
 * selectors and HTML nodes, or any number of these.
 * @returns {object} A new instance of hideBars.prototype.init.
 */
var hideBars = function( el ) {
    /**
     * Return a new instance of the init method. This is the true hideBars
     * object.
     */
    return new hideBars.prototype.init( arguments );
};

hideBars.prototype = {

    /**
     * @member constructor
     * Set the constructor of hideBars and init to be hideBars.
     */
    constructor: hideBars,

    /**
     * @method init
     * @param {...string|object|Array.<string, obejct>} el - A string
     * representing an element selector, an HTML node, an array of a mix of element
     * selectors and HTML nodes, or any number of these. Internally, this
     * method is supplied with an arguments list as its sole parameter.
     * @returns this
     */
    init: function( el ) {
        var args = Array.prototype.slice.call( arguments );

        for ( var i = 0; i < args.length; i++ ) {
            /** Case if argument is a string. */
            if ( _toString( args[ i ] ) === "[object String]" ) {
                var query = document.querySelectorAll( args[ i ] );
                for ( var j = 0; j < query.length; j++ ) {
                    this.init( query[ j ] );
                }
            }
            /** Case if argument is an array or arguments list. */
            else if ( _toString( args[ i ] ) === "[object Array]" || _toString( args[ i ] ) === "[object Arguments]" ) {
                for ( var k = 0; k < args[ i ].length; k++ ) {
                    this.init( args[ i ][ k ] );
                }
            }
            /** Case if the argument is a DOM node. */
            else if ( ~ _toString( args[ i ] ).indexOf( "[object HTML" ) ) {
                return this.hideBars( args[ i ] );
            }
            /** Case where we don't really know or care what the argument is. */
            else { return this; }
        }
    },

    /**
     * @method hideBars
     * @param {object} el - A DOM node whose scrollbars we wish to hide.
     * @returns this
     */
    hideBars: function( el ) {
        /** If the parent of el is already `wrapper` and the child is
         * `container` then skip wrapping el; if not, create the elements. */
        if ( !_hasClass( el.parentNode, "hidebars-wrapper" ) || !_hasClass( el.childNodes[ 0 ], "hidebars-container" ) ) {
            var parent = el.parentNode,
                wrapper = document.createElement( "div" ),
                container = document.createElement( "div" ),
                children = Array.prototype.slice.call( el.childNodes );

            wrapper.className = "hidebars hidebars-wrapper";
            container.className = "hidebars hidebars-container";

            /** Apply the necessary styles to actually hide the scrollbars. */
            wrapper.style.cssText = "overflow: hidden;";
            container.style.cssText = "height: 100%; width: 100%;";

            /** Wrap the element in a new parent. */
            parent.replaceChild( wrapper, el );
            wrapper.appendChild( el );

            /** Wrap the child nodes with a container. */
            for ( var i = 0; i < children.length; i++ ) {
                container.appendChild( children[ i ] );
            }
            el.appendChild( container );
        }

        /** Scale elements to hide the scrollbars. */
        this.update( el );

       return this;
    },

    /** @method update
     * @param {object} el - A DOM node that has already been prepped by
     * `hideBars` and needs to be scaled in order to have its scrollbars
     * hidden. This method is useful for updating elments when the page is
     * resized.
     */
    update: function( el ) {
        /** Reset the element's size before beginning. */
        el.style.width = "";
        el.style.height = "";
        el.parentNode.style.width = "";
        el.parentNode.style.height = "";
        el.parentNode.style.position = "";

       /** Make the wrapper element the same size as the scrollable element. */
        el.parentNode.style.width = el.offsetWidth + "px";
        el.parentNode.style.height = el.offsetHeight + "px";

        /** Scale the element so its bars are hidden. */
        el.style.width = 2 * el.offsetWidth - el.childNodes[ 0 ].offsetWidth + "px";
        el.style.height = 2 * el.offsetHeight - el.childNodes[ 0 ].offsetHeight + "px";

        /** Add `position: relative;` to solve an issue in Firefox. */
        el.parentNode.style.position = "relative";

        return this;
    }
};

/**
 * @function _toString
 * A small helper method to identify the type of object that is supplied as the
 * method's argument.
 * @param {*} o - Any type of object.
 * @return {string} A string describing the type of the argument.
 */
var _toString = function( o ) {
    return Object.prototype.toString.call( o );
};

/**
 * @function _hasClass
 * A small helper function to test if an element has a particular class.
 * @param {object} el - The element we wish to test.
 * @param {string} className - The class we wish to test.
 * @return {boolean} True if `el` has class `className`; false if it does not.
 */
var _hasClass = function( el, className ) {
    return ( " " + el.className + " " ).indexOf( className ) > -1;
};

/**
 * Make the `init` class have the same prototype chain as hideBars so we can
 * call `this.init` when we are already inside an instance of `init`.
 */
hideBars.prototype.init.prototype = hideBars.prototype;

/** Expose `HideBars`. */
module.exports = hideBars;

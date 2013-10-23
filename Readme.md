
# hide-bars

  Hide the horizontal and vertical scrollbars on any element.

## Installation

  Install with [component(1)](http://component.io):

    $ component install lsvx/hide-bars

## Usage

  To hide an element's scrollbars, simply call `hideBars` with an argument.

````js
var hideBars = require( "hide-bars" );

// Hide scrollbars on all elements with class `scrollthingy`.
hideBars( ".scrollthingy" );
````

  `hideBars` accepts lots of different kinds of arguments; you can pass it a string representing an element selector, a DOM node, an array of strings and DOM nodes, arrays of arrays of strings etc. For example:

````js
// Hide scrollbars on some element I found with jQuery.
hideBars( $myEl[0] );

// Hide scrollbars on a ton of stuff.
hideBars( "#scroller", [ scrollEl, scrollElTwo, ".scrollElThree" ] );
````

  In some cases, your scrollable element may change sizes and the bars will no longer be hidden. Your can update your element simply by calling `hideBars( myElement )` again.


## API

### hideBars(...string|object|array)
  Hide the scrollbars on any element. You can supply as many arguments as you like. Returns `this`.

## License

  MIT

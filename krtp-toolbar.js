(function($) {
  $.fn.kairosToolbar = function(options) {
    // Grab the current date
    var currentDate = new Date();
    // Array of months, for numeric access and conversion
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    // Build out a Month DD, YYYY access date:
    var accessDate = months[currentDate.getMonth()] + ' ' + currentDate.getDate() + ', ' + currentDate.getFullYear();
    // URL-based metadata
    var accessURL = location.href;
    // Small array of the volume and issue (aka, series) numbers
    var accessSeries = [];
    // Collect all of the DC. metadata elements, and put them into a reusable object
    var DC = {};
    // Logic for looping through the <meta name="DC.attribute" content="value"> elements; watch
    // for elements that can appear multiple times, like DC.creator
    // Tack on the in-house APA.author element, too

    // Pack all of the metadata from above into HTML...
    // ...and insert it into the DOM

    // Also load up the external CSS file for styling the toolbar

    // Check for the presence of <meta name="viewport"> tag; if it doesn't exist, assume we're
    // dealing with a non-responsive webtext...load a class that loads CSS for an old-school-style
    // toolbar

    // Otherwise, looks like it should be responsive...

    // Check the viewport size and a CSS content: property to determine initial state, and
    // check that against the default or user-supplied breakpoints to determine the class to
    // load...

    // Whenever the window is resized (TODO: confirm that that event fires on an orientation
    // change), check the viewport size and CSS content: property again, swapping out classes
    // as needed...

    // Functionality goes here for opening, expanding(?), and closing the toolbar; depending on
    // the design, this functionality may be class-dependent (e.g., a small-screen toolbar that
    // appears to slide up from the bottom of the screen; a wide-screen toolbar that slides out
    // across the screen like the current one...



    // keep it chainable
    return this;
  };
}(jQuery));

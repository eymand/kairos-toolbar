/* ===========================================================
 * kairos-toolbar.js v0.1
 * ===========================================================
 *
 * Created by Karl Stolley
 * http://karlstolley.com/ - @karlstolley
 *
 * Copyright 2013 Kairos: A Journal of Rhetoric, Technology,
 * and Pedagogy.
 * http://kairos.technorhetoric.net
 *
 * A small jQuery plugin that takes Dublin Core metadata and
 * a few other bits of data and makes citation information
 * available, along with Kairos branding, on webtexts
 * published by Kairos.
 * https://github.com/karlstolley/kairos-toolbar
 *
 * ========================================================== */


// The opening semicolon is a safety mechanism to protect against
// shoddy plugins and other JavaScript cruft that may not correctly
// terminate. See this little Stack Overflow exchange the topic:
// http://stackoverflow.com/questions/7365172/semicolon-before-self-invoking-function
// Use jQuery.noConflict() to avoid collisions with other JavaScript
// libraries that may use the $ alias; see
// http://api.jquery.com/jQuery.noConflict/
;jQuery.noConflict();
(function($) {
  $.fn.kairosToolbar = function(options) {

    // Basic variables
    var currentDate = new Date(), // Grab the current date
        months = [ // Array of months; getMonth() will return these values
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December'
        ],
        accessDate = months[currentDate.getMonth()] + ' ' + currentDate.getDate() + ', ' + currentDate.getFullYear(),
        DC = { creator: [] };
    // Logic for looping through the <meta name="DC.attribute" content="value"> elements; watch
    // for elements that can appear multiple times, like DC.creator
    var metaDC = $('meta[name^="DC\."]', 'head');
    $.each((metaDC), function(index,value){
      var field = $(value).attr('name').substr(3);
      var content = $(value).attr('content');
      if (field == 'creator') {
        DC.creator.push(content);
      }
      else {
        DC[field] = content;
      }
    });

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

    // functions


    // authors = ["Karl Stolley", "Amy Ferdinandt Stolley", "Homer J. Simpson"];
    function processAuthorList(style,names) {
      var processedNames = []

      function processAuthor(style,name) {
        var name = name.split(" "); // Separate name parts into an array
        var lastname = name.pop(); // right now, Jr., III, etc. will break this
        if (style == "mla") {
          return lastname + ", " + name.join(" ");
        }
        if (style == "apa") {
          return lastname + ", " + name.map(processInitials).join(" ");
        }
        function processInitials(name) {
          return name.substr(0,1) + ".";
        }
      }

      function joinNames(namelist,andStyle) {
        // List of three or more authors
        if (namelist.length > 2) {
          var lastAuthor = namelist.pop();
          return namelist.join(", ") + ", " + andStyle + " " + lastAuthor;
        }
        // List of two or fewer authors
        else {
          return namelist.join(" " + andStyle + " ");
        }
      }

      // Let's get down to business, having written those inner functions:

      if (style == "mla") {
        var andStyle = "and";
        processedNames[0] = processAuthor(style,names[0]);
        for(var i = 1; i < names.length; i++) {
          processedNames.push(names[i]);
        }
      }

      if (style == "apa") {
        var andStyle = "&amp;";
        for(var i = 0; i < names.length; i++) {
          processedNames.push(processAuthor(style,names[i]))
        }
      }

      return joinNames(processedNames,andStyle);

    }


  };

  // DOM Ready event to fire toolbar
  $(function() {
    // Check for the existence of the kairos Toolbar options hash;
    // if it doesn't exist, execute w/ defaults
    if (typeof kairosToolbarOptions == "undefined") {
      $('#test').html("Execute with Defaults");
    }
    // Otherwise, execute with custom options; note that this requires
    // setting up the custom options above where the toolbar script loads
    else
    {
      $('#test').html("Execute with Customizations");
    }
  });

}(jQuery));


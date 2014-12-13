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

/* jshint -W032 */

// The opening semicolon is a safety mechanism to protect against
// shoddy plugins and other JavaScript cruft that may not correctly
// terminate. See this little Stack Overflow exchange the topic:
// http://stackoverflow.com/questions/7365172/semicolon-before-self-invoking-function
;
// Conditionally load jQuery if an author hasn't done so already; this will pull from the
// Google CDN, so that means A) no extra stress on the Kairos server and B) increased
// likelihood that a user will already have a cached copy of jQuery
// Based on a technique by @benbalter https://gist.github.com/gists/902090/
var kairosToolbarMaybeLoadJq, kairosToolbarInit;

kairosToolbarMaybeLoadJq = function() {
  var jQ;
  if (!(typeof jQuery !== "undefined" && jQuery !== null)) {
    jQ = document.createElement('script');
    jQ.type = 'text/javascript';
    jQ.onload = jQ.onreadystatechange = kairosToolbarInit;
    // This will load the latest jQuery 1.x.x; it should be
    // possible to load a different/specific version from the
    // kairosToolbarOptions hash -- although that will require
    // testing the toolbar itself on many different versions
    jQ.src = '//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
    return document.body.appendChild(jQ);
  }
  else {
    return kairosToolbarInit();
  }
};

if (window.addEventListener) {
  window.addEventListener('load', kairosToolbarMaybeLoadJq, false);
} else if (window.attachEvent) {
  window.attachEvent('onload', kairosToolbarMaybeLoadJq);
}

// Use jQuery.noConflict() to avoid collisions with other JavaScript
// libraries that may use the $ alias; see
// http://api.jquery.com/jQuery.noConflict/
kairosToolbarInit = function() {
  jQuery.noConflict();
  (function($) {
    $.fn.kairosToolbar = function(options) {
      if (typeof options == "undefined") {
        options = {}; // empty options object as a sanity check
      }
      // Basic variables
      // Object to hold Dublin Core metadata;
      // Properties here hold metadata processed below,
      // TODO: Enable these to be overridden by the options hash
      var DC = {
        creator: [], // Hold one or more creators (separate in Dublin core)
        authorList: {mla: "", kairos: "", apa: ""}, // Formatted author lists
        accessDate: {mla: "", kairos: ""}, // placeholder for different access-date styles
        formattedTitle: {mla: "", kairos: "", apa: ""}, // raw or Sentence case titles
        volume: "",
        issue: "",
        publicationYear: ""
      };

      // Toolbar functions

      // Function to process the current date of access
      function processAccessDate(style) {
        var currentDate = new Date(), // Grab the current date
        months = [ // Array of month/abbrev arrays; getMonth() will return these values
          ['January','Jan'],
          ['February','Feb'],
          ['March','Mar'],
          ['April','Apr'],
          ['May','May'],
          ['June','June'],
          ['July','July'],
          ['August','Aug'],
          ['September','Sept'],
          ['October','Oct'],
          ['November','Nov'],
          ['December','Dec']
        ];
        if (style=="mla") {
          return currentDate.getDate() +
                 ' ' + months[currentDate.getMonth()][1] +
                 '. ' + currentDate.getFullYear();
        }
        if (style=="kairos") {
          return months[currentDate.getMonth()][0] +
                 ' ' + currentDate.getDate() +
                 ', ' + currentDate.getFullYear();
        }
      }


      // Function for reading through the <meta name="DC.attribute" content="value">
      // elements and populating the DC object
      function buildDC() {
        var metaDC = $('meta[name^="DC"]', 'head'); // look for <meta name="DC... in <head>
        // Function to extract volume and issue number from DC.series
        function processYear(date) {
          DC.publicationYear = DC.date.substr(0,4);
        }
        function processSource(source) {
          source = source.split(".");
          DC.volume = source[0];
          DC.issue = source[1];
        }
        $.each((metaDC), function(index,value){
          var field = $(value).attr('name');
          field = field.substr(field.indexOf('.') + 1);// Look for & remove DC. or DCTERMS.
          var content = $(value).attr('content');
          // Because webtexts can have multiple creators (authors), watch for that
          if (field == 'creator') {
            DC.creator.push(content);
          }
          else {
            DC[field] = content;
          }
        });
        processSource(DC.source);
        processYear(DC.date);
        processTitle(DC.title);
        processAuthorList(DC.creator);
      }

      // Function to take DC.creator array and make it a list of authors in
      // proper Kairos, APA, and styles
      function processAuthorList(names) {

        // Handle custom author lists
        if (options.authorList) {
          DC.authorList = {
            kairos: options.authorList.kairos || authorList('kairos',names),
            apa: options.authorList.apa || authorList('apa',names),
            mla: options.authorList.mla || authorList('mla',names)
          };
        }
        else {
          DC.authorList = {
            kairos: authorList('kairos',names),
            apa: authorList('apa',names),
            mla: authorList('mla',names)
          };
        }

        function processAuthor(style,name) {
          name = name.split(" "); // Separate name parts into an array
          var lastname = name.pop(); // right now, Jr., III, etc. will break this
          if ((style == "mla") || (style == "kairos")) {
            return lastname + ", " + name.join(" ");
          }
          if (style == "apa") {
            // Older IE (before v. 9) will choke on .map, e.g.,
            // name.map(processInitials).join(" ")
            // so use the jQuery $.map instead
            // (see http://api.jquery.com/jquery.map/
            name = $.map(name, function(n) {
              return processInitials(n);
            });
            return lastname + ", " + name.join(" ");
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
            if (andStyle == "&amp;") { andStyle = ", &amp;"; }
            else { andStyle = " " + andStyle; }
            return namelist.join(andStyle + " ");
          }
        }

        // Let's get down to business, having written those inner functions:

        function authorList(style,names) {
          var processedNames = [], andStyle, i;

          if (style == "mla") {
            andStyle = "and"; // final author separated by 'and' in MLA
            // Only the first author becomes Lastname, Firstname in MLA Style
            processedNames[0] = processAuthor(style,names[0]);
            // Push remainder of names into processedNames array as-is
            for(i = 1; i < names.length; i++) {
              processedNames.push(names[i]);
            }
          }

          if ((style == "apa") || (style=="kairos")) {
            andStyle = "&amp;"; // final author separated by ', &' in APA
            // All authors become, Lastname, F. M. in APA style
            for(i = 0; i < names.length; i++) {
              processedNames.push(processAuthor(style,names[i]));
            }
          }

          return joinNames(processedNames,andStyle);
        }

      }

      function processTitle(title) {
      // Handle custom title formats
        if (options.formattedTitle) {
          DC.formattedTitle = {
            // Use titles from options; may contain HTML, e.g., "Awesome stuff in <i>Star Wars</i>"
            kairos: options.formattedTitle.kairos || sentenceCase(DC.title),
            apa: options.formattedTitle.apa || sentenceCase(DC.title),
            mla: options.formattedTitle.mla || DC.title
          };
        }
        else {
          DC.formattedTitle = {
            // Use titles from options; may contain HTML, e.g., "Awesome stuff in <i>Star Wars</i>"
            kairos: sentenceCase(DC.title),
            apa: sentenceCase(DC.title),
            mla: DC.title
          };
        }

        function sentenceCase(title) {
          title = title.split(": "); // in the case of a title with a colon; returns an array regardless
          for (var i = 0; i < title.length; i++) {
            title[i] = title[i].toLowerCase();
            title[i] = title[i].charAt(0).toUpperCase() + title[i].substr(1);
          }
          return title.join(": ");
        }
      }

      // Function for building the HTML payload
      function prepareHTML() {
        return  "<div id=\"kt-kairos-toolbar\">" +
                "<dl class=\"kt-citations\">" +
                "<dt id=\"kt-kairos-btn\">Kairos</dt>" +
                "<dd id=\"kt-kairos\" class=\"kt-citation\">" +
                DC.authorList.kairos + " (" + DC.publicationYear + "). " + DC.formattedTitle.kairos + ". <cite>Kairos: A Journal of Rhetoric, Technology, and Pedagogy " + DC.volume + "</cite>(" + DC.issue + "). Retrieved " + processAccessDate('kairos') + ", from " + DC.identifier +
                "</dd>" +
                "<dt id=\"kt-mla-btn\">MLA</dt>" +
                "<dd id=\"kt-mla\" class=\"kt-citation\">" +
                DC.authorList.mla + ". “" + DC.formattedTitle.mla + ".” <cite>Kairos: A Journal of Rhetoric, Technology, and Pedagogy</cite> " + DC.source + " (" + DC.publicationYear + "). Web. " + processAccessDate('mla') + ". &lt;" + DC.identifier + "&gt;" +
                "</dd>" +
                "<dt id=\"kt-apa-btn\">APA</dt>" +
                "<dd id=\"kt-apa\" class=\"kt-citation\">" +
                DC.authorList.apa + " (" + DC.publicationYear + "). " + DC.formattedTitle.apa + ". <cite>Kairos: A Journal of Rhetoric, Technology, and Pedagogy " + DC.volume + "</cite>(" + DC.issue + "). Retrieved from " + DC.identifier +
                "</dd>" +
                "</dl>" +
                "<p><a href=\"http://kairos.technorhetoric.net/"+DC.source+"/\">Issue "+DC.source+" Contents</a></p>" +
                "</div>";
      }

      // End of functions

      // STEPS:

      // Build the Dublin Core Metadata from the webtext
      buildDC();

      // Pack all of the metadata from above into HTML...
      $('body').append(prepareHTML());
      // ...and insert it into the DOM

      // Also load up the external CSS file for styling the toolbar
      $('head').append('<link rel="stylesheet" type="text/css" href="../src/kairos-toolbar-styles.css" />');
      // Check for the presence of <meta name="viewport"> tag; if it doesn't exist, assume we're
      // dealing with a non-responsive webtext. Otherwise, load up a responsive CSS prefix on
      // <html>
      if($('meta[name="viewport"]', 'head').length > 0) {
        $('html').addClass('kt-rwd');
      }

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

    // DOM Ready event to fire toolbar
    $(function() {
      // Check for the existence of the kairos Toolbar options hash;
      // if it doesn't exist, execute w/ defaults
      if (typeof kairosToolbarOptions == "undefined") {
        //$('#test').html("Execute with Defaults");
        $('html').kairosToolbar();
      }
      // Otherwise, execute with custom options; note that this requires
      // setting up the custom options above where the toolbar script loads
      else
      {
        //$('#test').html("Execute with Customizations");
        $('html').kairosToolbar(kairosToolbarOptions);
      }
    });

  }(jQuery));
};

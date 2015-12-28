# The Kairos Toolbar

This is a complete rewrite of the old Toolbar to reflect better practices in JavaScript and contemporary, responsive page design.

### Design Goals
* Rewrite using jQuery, as a jQuery module and using `jQuery.noConflict()` to avoid collisions with any other JavaScript libraries that webtext authors use that also make use of the jQuery `$` alias. **DONE.**
* Provide retina-ready @2x graphics for the Kairos logo. **DONE. IMPROVED.** Created an SVG of the logo and used fontello to make a custom icon font.
* Provide a mechanism/policy that allows webtext authors to bring their own jQuery/version. Offer guidelines to Kairos editors for this. **DONE.**
* Provide an API for using the Kairos Toolbar on responsive webtexts; the API will enable authors to specify breakpoints to match their own responsive designs. It might be worth investigating [a technique such as this](http://bricss.net/post/22198838298/easily-checking-in-javascript-if-a-css-media-query-has) to move the API into author’s CSS, rather than necessarily requiring a bunch of on-page JavaScript configuration.


### Notes to Self
* Be sure to look at list of assets at http://kairos.technorhetoric.net/toolbar/ -- all will need to be replaced, but for the sake of preservation, they should be downloaded and added to the `master` branch of this repository.

### To Do
* The `kairosToolbarOptions` object should allow:
  1. Custom Kairos/APA-style titles (e.g., for titles that include proper nouns) **DONE.**
  2. Custom Author names (to address the issue of names Mies van der Rohe, without having to inject non-breaking spaces into DC metadata) **DONE**.
  3. The ability to disable to the toolbar’s display (e.g., for *inner* pages that have full-screen media). Honestly it’s probably better just not to load the toolbar in those cases, although the right toolbar design (e.g., vanishing on downward scroll, reappearing on upward) might make that moot.

* Make sure that my polite use of `jQuery.noConflict()` doesn’t inadvertently mess up author uses of jQuery; if it does, it’s probably possible to somehow use the BYO jQuery logic to change things up for jQuery users. **DONE**.
* Determine the feasibility (and interest) of fully replacing the old toolbar in past webtexts. Given the above goals, that seems unlikely. It might be worth thinking about versioning the recreated toolbar filenames, if not.

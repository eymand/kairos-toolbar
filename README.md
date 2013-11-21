# The Kairos Toolbar

This is a complete rewrite of the old Toolbar to reflect better practices in JavaScript and contemporary, responsive page design.

### Design Goals
* Rewrite using jQuery, as a jQuery module and using `jQuery.noConflict()` to avoid collisions with any other JavaScript libraries that webtext authors use that also make use of the jQuery `$` alias.
* Provide an API for using the Kairos Toolbar on responsive webtexts; the API will enable authors to specify breakpoints to match their own responsive designs. It might be worth investigating [a technique such as this](http://bricss.net/post/22198838298/easily-checking-in-javascript-if-a-css-media-query-has) to move the API into author’s CSS, rather than necessarily requiring a bunch of on-page JavaScript configuration.
* Provide retina-ready @2x graphics for the Kairos logo.
* Provide a mechanism/policy that allows webtext authors to bring their own jQuery/version. Offer guidelines to Kairos editors for this.
* Determine the feasibility of fully replacing the old toolbar in past webtexts (given the above goals, that seems unlikely).

### Notes to Self
* Be sure to look at list of assets at http://kairos.technorhetoric.net/toolbar/ -- all will need to be replaced, but for the sake of preservation, they should be downloaded and added to the `master` branch of this repository.

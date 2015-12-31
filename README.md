# The Kairos Toolbar

This is the branding and citation toolbar for *Kairos: A Journal of Rhetoric, Technology, and
Pedagogy*.

## Use in Webtexts

### Basic: Loading the Toolbar with Defaults

Paste this line right before the closing `</body>` tag (not in the `<head>` — let the webtext load
up everything it needs before the toolbar itself even begins to load):

```html
<script type="text/javascript" src="/toolbar/2.0/kairos-toolbar.min.js"></script>
```

### Loading the Toolbar with Custom Options

Paste these lines right before the closing `</body>` tag (not in the `<head>` — let the webtext load
up everything it needs before the toolbar itself even begins to load):

```html
<script type="text/javascript">
//<![CDATA[
/*
kairosToolbarOptions = {
  formattedTitle: {
    tc: "George Lucas Whipped Up a Winner with <i>Star Wars</i>",
    sc: "George Lucas whipped up a winner with <i>Star Wars</i>",
  },
  authorList: {
    full: "van der Rohe, Mies and Marquis de Sade",
    abbr: "van der Rohe, M., &amp; de Sade, M.",
    fullamp: "van der Rohe, Mies, &amp; de Sade, Marquis"
  }
}
*/
//]]>
</script>
<script type="text/javascript" src="/toolbar/2.0/kairos-toolbar.min.js"></script>
```

### Custom Options

The toolbar accepts a hash of custom options, `kairosToolbarOptions`, for webtexts that have special
or complex titles and author names.

#### Titles with Proper Nouns or Italics

Sometimes titles are more complex than can be represented in the plain text of Dublin Core metadata.
That includes titles with proper nouns, as well as titles that refer to other major titles. The
toolbar automatically adds quotation marks and terminal punctuation as needed to webtext titles, so
do not add them here.

Also, because the as-is Dublin Core metadata will preserve proper nouns, the toolbar can just use
that for Title Case titles, and you can submit just the Sentence case title you need to specifically
modify.

```javascript
kairosToolbarOptions = {
  formattedTitle: {
    sc: "Some great title",
    tc: "Some Great Title"
  }
}
```

### Authors with Compound Last Names

The toolbar automatically inverts first and last names, and creates initials for styles that do not
use full first names. However, when names are more complex, the toolbar can do weird things. Passing
in these values manually will ensure proper citation display. Note that the `abbr` and `fullamp`
(full name plus ampersand) lists should use an escaped ampersand, `&amp;`, before the final author
name in the list. (`full`, for simple full names, should just use an `and`):

```javascript
kairosToolbarOptions = {
  authorList: {
    full: "van der Rohe, Mies and Marquis de Sade",
    abbr: "van der Rohe, M., &amp; de Sade, M.",
    fullamp: "van der Rohe, Mies, &amp; de Sade, Marquis"
  }
}
```

## Some Guidelines for Webtext Preparation

* It would be best if authors set any background image/color on `html` rather than on `body` in their CSS.


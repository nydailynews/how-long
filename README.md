# How Long
Clocks to keep track of elapsed time or countdown until something happens.

## Usage

### How to create a new how-long

1. `cd` into the `www` directory.
1. `cp -fr _blank name-of-your-new-how-long` to create a new directory for your how-long project, with the boilerplate HTML.
1. Now that you have the blank HTML, here are the strings you need to search-and-replace with real values:
    1. Values that are in multiple places, so need to be searched-and-replaced:
        1. TITLE
        1. DESCRIPTION
        1. SLUG _should be whatever `name-of-your-new-how-long` is_
    1. Values that are only in one place, so can be edited in-place.
        1. OVERLINE
        1. KEYWORDS
        1. SOMELINKSHERE _add a link or more to related content_
        1. UNTILWHAT _flesh out the twitter text_
        1. AUTHOR
        1. PARSELY-KEYWORDS
1. You'll also have to change the date that's hard-coded, `March 29, 2018 13:10:00`, to whatever the date and time is you're counting too.
1. On the line below the `POINT TO THE RIGHT SECTION` section, update the link and the text to point to the right section.
1. On the line with `FEEDSLUG` in it, figure out how to get a new article feed up in there.

# Exercise 6.2 — Histogram Filters

Adds interactive filter buttons (All / LED / LCD / OLED) to the Exercise 6.1
histogram, letting the user explore energy consumption patterns for each
screen technology. Built by [Your Name].

## Structure

- `index.html` — adds `<div id="filters_screen">` above the histogram
- `css/`
  - `base.css` — page layout, typography, and the `.filters`/`.filter` button styles
  - `visualisation.css` — chart styling (unchanged from Exercise 6.1)
- `data/`
  - `W6_TVdata.csv` — unchanged from Exercise 6.1
- `js/`
  - `load-data.js` — unchanged; already called `populateFilters(data)`
  - `shared-constants.js` — adds the `filters_screen` array (id/label/isActive per button)
  - `interactions.js` — `populateFilters` builds the buttons and wires up click
    handling; `updateHistogram` re-bins the (optionally filtered) data and
    transitions the bars to their new height
  - `histogram.js` — unchanged from Exercise 6.1

## Running locally

Same as Exercise 6.1 — serve the folder with a local server (e.g. VS Code
Live Server); opening `index.html` directly will fail because `d3.csv()`
can't fetch over `file://`.

## Known limitation (carried over from the exercise's own code)

`updateHistogram` updates each bar's `y` and `height` but not its `x`/`width`,
and the data join has no `.exit()` handling. In this data set the bin edges
happen to line up across the full set and every filtered subset (all stop on
round 200-wide boundaries), so filtering looks correct. But when a filtered
subset's bins stop earlier than the full data's (e.g. LCD tops out at 1800
instead of 2800), the bars for the missing bins keep their old height instead
of disappearing. The exercise's own follow-up questions ("rescale axis after
filtering", "pros and cons of transitions") point at this same gap — fixing
it would mean adding `.exit().remove()` handling and recalculating `xScale`'s
domain per filter, which is flagged as optional/extension work, not part of
the base exercise.

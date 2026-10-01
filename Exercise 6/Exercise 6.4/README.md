# Exercise 6.4 — Tooltips

Builds on Exercise 6.3. Hovering over a dot in the scatterplot shows a tooltip
with that TV's screen size (inches). Filters on the histogram still work.
Built by [Your Name].

## What changed from 6.3
- `js/interactions.js` — replaced the empty stubs with:
  - `createTooltip(data)` — appends a hidden tooltip group (rounded rect + text) to `innerChartS`
  - `handleMouseEvents()` — `mouseenter` sets the text to `d.screenSize`, reads the
    circle's `cx`/`cy` with `getAttribute`, and fades the tooltip in above the circle;
    `mouseleave` hides it again
- `js/load-data.js` — now calls `createTooltip(data)`
- `index.html` — hint text for the scatterplot

## Running locally
Serve the folder with a local server (e.g. VS Code Live Server); `d3.csv()` can't fetch over `file://`.

## GenAI use
Code generated with Claude (Anthropic) and reviewed by me.

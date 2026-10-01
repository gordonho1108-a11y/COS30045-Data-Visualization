# Exercise 6.3 — Scatterplot

Builds on Exercise 6.2 (histogram + filters). Adds a scatterplot below the
histogram plotting labelled energy consumption (y) against star rating (x),
with circles coloured by screen technology and a legend in the top right.
Built by [Your Name].

## What changed from 6.2
- `index.html` — new `<div id="scatterplot">` below the histogram; loads `js/scatterplot.js`
- `css/style.css` — the former `base.css` (renamed, as per the unit's naming)
- `css/visualisation.css` — adds scatterplot/legend styles
- `js/shared-constants.js` — adds `innerChartS`, `xScaleS`, `yScaleS`, `colorScale`, `tooltipWidth/Height`
- `js/scatterplot.js` — new: `drawScatterplot(data)`
- `js/load-data.js` — also calls `drawScatterplot(data)`, `createTooltip()`, `handleMouseEvents()`
- `js/interactions.js` — empty `createTooltip` / `handleMouseEvents` stubs (filled in Exercise 6.4)

## Running locally
Serve the folder with a local server (e.g. VS Code Live Server); `d3.csv()` can't fetch over `file://`.

## GenAI use
Code generated with Claude (Anthropic) and reviewed by me.

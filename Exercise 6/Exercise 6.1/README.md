# Exercise 6.1 — TV Energy Consumption Histogram

A D3 histogram showing the distribution of labelled energy consumption
(kWh/year) across ~4,200 TV models. Built by [Your Name].

## Structure

- `index.html` — page shell; loads the CSS and JS files in the required order
- `css/`
  - `base.css` — general page layout and typography
  - `visualisation.css` — styling shared by the charts (responsive SVG, axis text)
- `data/`
  - `W6_TVdata.csv` — brand, model, screenSize, screenTech, star, energyConsumption
    (see `W6 TV Data.knwf` on Canvas for the KNIME workflow used to create it)
- `js/`
  - `load-data.js` — loads and parses the CSV, then calls `drawHistogram` and `populateFilters`
  - `shared-constants.js` — chart dimensions, margins, colours, scales and the bin generator, shared across charts
  - `histogram.js` — builds the bins and draws the histogram
  - `interactions.js` — placeholder for the filter controls built in Exercise 6.2

## Running locally

`d3.csv()` fetches the data file, so opening `index.html` directly
(`file://...`) will fail. Serve the folder with a local server instead, e.g.
the VS Code Live Server extension, or:

```
npx serve .
```

## Notes

- Following a break down of the data, one TV model has an unusually high
  energy consumption (2,652 kWh/year) compared to the rest of the data set,
  which is why the histogram's last few bins are hard to see. It has been
  left in for Exercise 6.1; whether to exclude it is worth considering once
  filtering is added in Exercise 6.2.
- `interactions.js` currently defines an empty `populateFilters` function so
  the page runs without errors; Exercise 6.2 will fill it in.

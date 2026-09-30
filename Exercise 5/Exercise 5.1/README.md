# Appliance Energy Consumption Website

A small multi-page website demonstrating HTML, CSS and JavaScript fundamentals,
built for Exercise 0.2.

## Pages

- `index.html` — Home page: intro content, appliance overview, FAQ accordion
- `televisions.html` — Television energy use content + interactive energy calculator
- `charts.html` — Exercise 5.1: D3 vertical bar chart (mean energy use by TV screen type)
- `about.html` — About Us page

## Structure

```
/
  index.html
  televisions.html
  charts.html
  about.html
  assets/
    css/
      style.css      # all site styling (colours match the provided logo)
    js/
      script.js      # footer year, FAQ accordion, energy calculator
      bar-chart.js   # Exercise 5.1 D3 bar chart
    img/
      PowerIcon.png   # provided logo, used in nav (links to Home) and hero art
    data/
      Data_exercise_5.1.csv   # data for the bar chart
  README.md
```

## Features implemented

- Consistent top navigation on all four pages, with the logo (links back to
  Home), a hover effect, and a clearly marked "active" page.
- Footer on every page with the current year (via JavaScript), author name,
  and a Generative AI acknowledgement.
- Home page FAQ section, hidden by default, toggled open/closed with
  JavaScript (accordion behaviour).
- Optional JavaScript extension: an appliance energy calculator on the
  Televisions page. Users choose a preset television (or enter a custom
  wattage), set hours of use per day and an electricity price, and get
  daily/monthly/yearly energy use and cost, calculated entirely client-side.
  Results update in place, and invalid input is validated with inline error
  messages rather than browser alerts.

## Generative AI use

Parts of the HTML/CSS/JavaScript in this project were drafted with the
assistance of a Generative AI tool and then reviewed. All figures used
(wattages, prices, usage hours) are placeholder values for demonstration
only and are not sourced from a verified dataset.

## Notes

- Replace `[Your Name]` in the footer and About Us page with your own name
  before submitting.
- All wattage, pricing and usage figures throughout the site are
  placeholders — swap them for real values if you extend this in Exercise 1.

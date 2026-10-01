// ==========================================================================
// Exercise 6.3 — Scatterplot of energy consumption by star rating (D3 v7)
// Uses innerChartS, xScaleS, yScaleS and colorScale from shared-constants.js
// ==========================================================================

const drawScatterplot = data => {
  // Set the dimensions and margins of the chart area
  const svg = d3
    .select("#scatterplot")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`) // Responsive SVG
    .attr("class", "responsive-svg-container")
    .attr("role", "img")
    .attr(
      "aria-label",
      `Scatterplot of labelled energy consumption by star rating for ${data.length} TV models`
    );

  // Create an inner chart group with margins (declared in shared-constants.js)
  innerChartS = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

  // ---- Scales ----
  const maxStar = d3.max(data, d => d.star); // max star rating for the xScaleS domain
  const maxEnergy = d3.max(data, d => d.energyConsumption); // max energy for the yScaleS domain

  xScaleS.domain([0, maxStar]).range([0, innerWidth]);
  yScaleS.domain([0, maxEnergy]).range([innerHeight, 0]).nice();

  // ---- Colour scale: one hue per screen technology ----
  colorScale
    .domain(data.map(d => d.screenTech)) // unique screenTech values
    .range(d3.schemeCategory10); // predefined colour scheme

  // ---- Draw the circles ----
  innerChartS
    .selectAll("circle")
    .data(data)
    .join("circle")
    .attr("r", 3)
    .attr("cx", d => xScaleS(d.star))
    .attr("cy", d => yScaleS(d.energyConsumption))
    .attr("fill", d => colorScale(d.screenTech))
    .attr("opacity", 0.5); // less opaque so overlapping points are easier to see

  // ---- Axes (same pattern as the histogram) ----
  innerChartS
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(d3.axisBottom(xScaleS));

  innerChartS.append("g").attr("class", "y-axis").call(d3.axisLeft(yScaleS));

  // x-axis label
  innerChartS
    .append("text")
    .attr("class", "axis-label")
    .text("Star Rating")
    .attr("x", innerWidth / 2)
    .attr("y", innerHeight + 40)
    .attr("text-anchor", "middle");

  // y-axis label (runs vertically along the y-axis)
  innerChartS
    .append("text")
    .attr("class", "axis-label")
    .text("Labelled Energy Consumption (kWh/year)")
    .attr("transform", "rotate(-90)")
    .attr("x", -innerHeight / 2)
    .attr("y", -margin.left + 18)
    .attr("text-anchor", "middle");

  // ---- Legend (top right) ----
  const legend = svg
    .append("g")
    .attr("class", "legend")
    .attr("transform", `translate(${width - 100}, ${margin.top})`); // position the legend

  // Loop through the colour scale domain to create legend entries
  colorScale.domain().forEach((screenTech, i) => {
    // Create a group for each legend entry, spaced out by 20px
    const legendRow = legend.append("g").attr("transform", `translate(0, ${i * 20})`);

    // Add a coloured rectangle for each screenTech
    legendRow.append("rect").attr("width", 10).attr("height", 10).attr("fill", colorScale(screenTech));

    // Add text next to the rectangle
    legendRow
      .append("text")
      .attr("x", 20)
      .attr("y", 10)
      .attr("text-anchor", "start")
      .style("alignment-baseline", "middle")
      .text(screenTech);
  });
};

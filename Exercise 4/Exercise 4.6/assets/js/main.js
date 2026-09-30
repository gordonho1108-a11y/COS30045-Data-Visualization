// ==========================================================================
// Exercise 4.6 — Scaling charts
// Adds a linear scale (xScale) for bar widths and a band scale (yScale)
// for bar thickness/spacing, so the chart adapts to the svg's size
// instead of using raw pixel values.
// ==========================================================================

// viewBox width is 600 (400px for bars + 200px reserved for labels in 4.7).
// Height is 700 rather than 1600, since the band scale (with padding)
// now controls spacing instead of a fixed barHeight/barSpacing.
const svg = d3.select(".responsive-svg-container")
  .append("svg")
  .attr("viewBox", "0 0 600 700")
  .style("border", "1px solid black");

const drawBarChart = data => {

  // Step 1: Linear scale for our quantitative count data (x-axis).
  // Domain covers a little past our highest count (~1096) for breathing room.
  const xScale = d3.scaleLinear()
    .domain([0, 1200])
    .range([0, 400]);

  // Step 2: Band scale for our categorical brand data (y-axis).
  // Automatically works out bar thickness + spacing for however many
  // categories (brands) we have, with padding between bars.
  const yScale = d3.scaleBand()
    .domain(data.map(d => d.brand))
    .range([0, 700])
    .padding(0.1);

  svg
    .selectAll("rect")
    .data(data)
    .join("rect")
    .attr("class", d => {
      return `bar bar-${d.count}`;
    })
    .attr("width", d => xScale(d.count))
    .attr("height", yScale.bandwidth())
    .attr("fill", "blue")
    .attr("x", 0)
    .attr("y", d => yScale(d.brand));

};

// Load, type, and sort the data, then draw the chart.
d3.csv("data/tvBrandCount.csv", d => {
  return {
    brand: d.brand,
    count: +d.count // => converts to number
  };
}).then(data => {

  console.log(data);
  console.log(data.length);
  console.log(d3.max(data, d => d.count));
  console.log(d3.min(data, d => d.count));
  console.log(d3.extent(data, d => d.count)); // => array with min and max

  data.sort((a, b) => b.count - a.count);
  console.log(data);

  drawBarChart(data);

});

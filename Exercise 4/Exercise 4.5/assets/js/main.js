// ==========================================================================
// Exercise 4.5 — D3 binding and drawing with data
// ==========================================================================

// Create the responsive svg canvas (carried over from Exercise 4.3)
const svg = d3.select(".responsive-svg-container")
  .append("svg")
  .attr("viewBox", "0 0 1200 1600")
  .style("border", "1px solid black");

// Step 1/2/3: Bind the data to rectangles, size and space them out.
const drawBarChart = data => {

  const barHeight = 20;
  const barSpacing = 5;

  svg
    .selectAll("rect")
    .data(data)
    .join("rect")
    .attr("class", d => {
      return `bar bar-${d.count}`;
    })
    .attr("width", d => d.count)
    .attr("height", barHeight)
    .attr("fill", "blue")
    .attr("x", 0)
    .attr("y", (d, i) => i * (barHeight + barSpacing));

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

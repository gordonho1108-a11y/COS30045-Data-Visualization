// ==========================================================================
// Exercise 4.4 — Load data from CSV
// ==========================================================================

// Step 2: Create the responsive svg canvas (carried over from Exercise 4.3)
const svg = d3.select(".responsive-svg-container")
  .append("svg")
  .attr("viewBox", "0 0 1200 1600")
  .style("border", "1px solid black");

// Step 1: Use d3.csv() to load and type our data.
// The count column arrives as a string, so we convert it to a number with +d.count.
d3.csv("data/tvBrandCount.csv", d => {
  return {
    brand: d.brand,
    count: +d.count // => converts to number
  };
}).then(data => {

  // Step 2: Check the data has loaded and been typed correctly.
  console.log(data);

  // Step 3: Find some basic information about the data set.
  console.log(data.length);
  console.log(d3.max(data, d => d.count));
  console.log(d3.min(data, d => d.count));
  console.log(d3.extent(data, d => d.count)); // => array with min and max

  // Sort the data so the largest brands appear first.
  data.sort((a, b) => b.count - a.count);
  console.log(data);

  // Pass the loaded (and sorted) data to drawBarChart, which we will
  // build in the next exercise.
  drawBarChart(data);

});

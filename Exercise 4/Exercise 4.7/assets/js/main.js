// ==========================================================================
// Exercise 4.7 — Adding labels
// Groups each bar with its label so they move together, then adds the
// brand name (left of the bar) and the count value (right of the bar).
// ==========================================================================

const svg = d3.select(".responsive-svg-container")
  .append("svg")
  .attr("viewBox", "0 0 600 700")
  .style("border", "1px solid black");

const drawBarChart = data => {

  // Step 1: xScale range stays the same width for the bars themselves.
  // We reserve 100px of x-space (via the rect's fixed x offset below)
  // for the brand-name labels to sit in, to the left of the bars.
  const labelWidth = 100;

  const xScale = d3.scaleLinear()
    .domain([0, 1200])
    .range([0, 400]);

  const yScale = d3.scaleBand()
    .domain(data.map(d => d.brand))
    .range([0, 700])
    .padding(0.1);

  // Step 2: Group container so each bar + its labels move together,
  // positioned vertically using the yScale via transform/translate.
  const barAndLabel = svg
    .selectAll("g")
    .data(data)
    .join("g")
    .attr("transform", d => `translate(0, ${yScale(d.brand)})`);

  // Step 3: Add back the rectangles inside each group.
  // x is offset by labelWidth to leave room for the brand-name label.
  // y is 0, since the group's translate already handles vertical position.
  barAndLabel
    .append("rect")
    .attr("class", d => {
      return `bar bar-${d.count}`;
    })
    .attr("width", d => xScale(d.count))
    .attr("height", yScale.bandwidth())
    .attr("fill", "blue")
    .attr("x", labelWidth)
    .attr("y", 0);

  // Step 4: Add the brand name label, right-aligned just before the bar.
  barAndLabel
    .append("text")
    .text(d => d.brand)
    .attr("x", labelWidth - 10)
    .attr("y", yScale.bandwidth() / 2 + 4)
    .attr("text-anchor", "end")
    .style("font-size", "13px");

  // Step 5: Add the count value, just after the end of each bar.
  barAndLabel
    .append("text")
    .text(d => d.count)
    .attr("x", d => labelWidth + xScale(d.count) + 5)
    .attr("y", yScale.bandwidth() / 2 + 4)
    .style("font-size", "13px");

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

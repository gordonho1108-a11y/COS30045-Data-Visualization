// ==========================================================================
// Exercise 4.3 — D3 set up
// Creates a responsive SVG canvas (using viewBox) inside the
// .responsive-svg-container div, and adds one hardcoded test rectangle
// to confirm the canvas is working before real data is wired in
// during Exercise 4.4+.
// ==========================================================================

// Step 2: Create svg object within the responsive container, using viewBox
// so it scales responsively with its parent.
const svg = d3.select(".responsive-svg-container")
  .append("svg")
  .attr("viewBox", "0 0 1200 1600")
  .style("border", "1px solid black");

// Step 3: Add a test svg rectangle (hardcoded attributes for now).
svg.append("rect")
  .attr("x", 100)
  .attr("y", 100)
  .attr("width", 414)
  .attr("height", 50)
  .attr("fill", "cyan");

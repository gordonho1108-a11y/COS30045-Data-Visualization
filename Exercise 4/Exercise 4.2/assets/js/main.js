// ==========================================================================
// Exercise 4.2 — D3: manipulate and add elements to the webpage
// ==========================================================================

// Step 2: Apply a style to an html element using D3
// Selects the page's <h1> (the hero heading) and changes its colour.
d3.select("h1")
  .style("color", "green");

// Step 3: Append an element using D3
// Selects the .d3-demo-target <div> and appends a new <p> with some text.
d3.select(".d3-demo-target")
  .append("p")
  .text("Purchasing a low energy consumption TV will help with your energy bills!");

// Step 4: Append an svg shape using D3
// Selects the .d3-demo-svg <svg> and appends a rectangle with attributes
// so it is visible (position, size, colour).
d3.select(".d3-demo-svg")
  .append("rect")
  .attr("x", 50)
  .attr("y", 50)
  .attr("width", 100)
  .attr("height", 30)
  .style("fill", "green");

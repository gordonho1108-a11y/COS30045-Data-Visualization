// Exercise 4.2 — D3: manipulate and add elements to the webpage
d3.select("h1")
  .style("color", "green");

// Selects the .d3-demo-target <div> and appends a new <p> with some text.
d3.select(".d3-demo-target")
  .append("p")
  .text("Purchasing a low energy consumption TV will help with your energy bills!");

// Selects the svg and appends a rectangle with attributes
// so it is visible (position, size, colour).
d3.select("svg")
  .append("rect")
  .attr("x", 50)
  .attr("y", 50)
  .attr("width", 100)
  .attr("height", 30)
  .style("fill", "green");

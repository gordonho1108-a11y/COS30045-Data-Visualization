const svg = d3.select(".responsive-svg-container")
  .append("svg")
  .attr("viewBox", "0 0 1200 1600")
  .style("border", "1px solid black");

svg.append("rect")
  .attr("x", 100)
  .attr("y", 100)
  .attr("width", 414)
  .attr("height", 50)
  .attr("fill", "cyan");

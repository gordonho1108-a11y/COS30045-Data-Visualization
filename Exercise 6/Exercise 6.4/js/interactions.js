// ==========================================================================
// Exercise 6.2 — Filters for the histogram built in Exercise 6.1 (D3 v7)
// Uses the filters_screen array and binGenerator set up in shared-constants.js.
// ==========================================================================

const populateFilters = data => {
  // Add the buttons to the user interface using the filter array from shared-constants.js
  d3.select("#filters_screen")
    .selectAll(".filter")
    .data(filters_screen)
    .join("button")
    .attr("class", d => `filter ${d.isActive ? "active" : ""}`)
    .text(d => d.label)
    .on("click", (e, d) => {
      console.log("Clicked filter:", e);
      console.log("Clicked filter data:", d);

      // If the clicked filter is not already active, update the active state of the filters
      if (!d.isActive) {
        // make sure button clicked is not already active
        filters_screen.forEach(filter => {
          filter.isActive = d.id === filter.id ? true : false;
        });

        // update the filter buttons based on which one was clicked
        d3.selectAll("#filters_screen .filter").classed("active", filter => (filter.id === d.id ? true : false));

        updateHistogram(d.id, data);
      }
    });
};

const updateHistogram = (filterId, data) => {
  // Create updatedData: the full data set if "all" is selected, otherwise
  // only the rows matching the selected screen technology
  const updatedData = filterId === "all" ? data : data.filter(tv => tv.screenTech === filterId);

  // Use the filtered data to update the bins using the shared bin generator
  const updatedBins = binGenerator(updatedData);

  // Use the updated bins to redraw the histogram bars, with a transition
  d3.selectAll("#histogram rect")
    .data(updatedBins)
    .transition()
    .duration(500)
    .ease(d3.easeCubicInOut)
    .attr("y", d => yScale(d.length))
    .attr("height", d => innerHeight - yScale(d.length));
};

// ==========================================================================
// Exercise 6.4 — Tooltip for the scatterplot (shows screen size on hover)
// Uses innerChartS, tooltipWidth/tooltipHeight and barColor from
// shared-constants.js. Both functions are called from load-data.js after
// drawScatterplot, so the circles already exist.
// ==========================================================================

const createTooltip = data => {
  // Append the tooltip group to the scatterplot's inner chart, hidden at first.
  // .style (not .attr) so it overrides any other formatting.
  const tooltip = innerChartS
    .append("g")
    .attr("class", "tooltip")
    .attr("transform", "translate(0, 500)") // parked out of the way
    .style("opacity", 0)
    .style("pointer-events", "none"); // never block the mouse over the circles

  // Tooltip background rectangle
  tooltip
    .append("rect")
    .attr("width", tooltipWidth)
    .attr("height", tooltipHeight)
    .attr("rx", 3)
    .attr("ry", 3)
    .attr("fill", barColor)
    .attr("fill-opacity", 0.75);

  // Tooltip text (updated on mouse over)
  tooltip
    .append("text")
    .text("NA")
    .attr("x", tooltipWidth / 2)
    .attr("y", tooltipHeight / 2 + 2)
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .attr("fill", "white")
    .style("font-weight", 900);
};

const handleMouseEvents = () => {
  // Mouse events for the scatterplot circles
  innerChartS
    .selectAll("circle")
    .on("mouseenter", (e, d) => {
      console.log("Mouse entered circle", d);

      // 1. Update the tooltip text with the screen size
      d3.select(".tooltip text").text(d.screenSize);

      // 2. Circle centre, read from the element that triggered the event
      const cx = e.target.getAttribute("cx");
      const cy = e.target.getAttribute("cy");

      // 3. Position the tooltip above the circle and fade it in
      d3.select(".tooltip")
        .attr("transform", `translate(${cx - 0.5 * tooltipWidth}, ${cy - 1.5 * tooltipHeight})`)
        .transition()
        .duration(200)
        .style("opacity", 1);
    })
    .on("mouseleave", (e, d) => {
      console.log("Mouse left circle", d);

      // 4. Hide the tooltip and move it out of the way
      d3.select(".tooltip")
        .style("opacity", 0)
        .attr("transform", "translate(0, 500)");
    });
};

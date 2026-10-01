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
// Exercise 6.3 — placeholders. The tooltip is built in Exercise 6.4; these
// empty functions let load-data.js call them now without throwing errors.
// ==========================================================================
const createTooltip = () => {};
const handleMouseEvents = () => {};

// ==========================================================================
// Exercise 5.3 — Donut chart (D3 v7)
// Data: count of TV models by screen size category (aggregated in KNIME)
// ==========================================================================

const drawDonutChart = data => {
  // ---- 1. Chart dimensions, sized relative to radius rather than margins ----
  const width = 1000;
  const height = 500;
  const radius = Math.min(width, height) / 2 - 20; // leave some padding

  // ---- 2. Colour scale: one colour per category, not tied to a position ----
  const color = d3
    .scaleOrdinal()
    .domain(data.map(d => d.Screensize_Category))
    .range(d3.schemeSet2);

  // ---- 3. Work out the start/end angle of each slice from the counts ----
  // Sorting is disabled so slices stay in the order they appear in the CSV
  // (large, medium, small) rather than being reordered largest-first.
  const pie = d3
    .pie()
    .value(d => d.Count)
    .sort(null);

  // ---- 4. Arc generator: inner radius > 0 turns the pie into a donut ----
  const arcGenerator = d3
    .arc()
    .innerRadius(radius * 0.6) // 60% of available radius
    .outerRadius(radius * 1) // 100% of available radius
    .padAngle(0.015) // small gap between slices
    .cornerRadius(4); // slightly rounded slice ends

  // ---- 5. SVG container, centred so (0,0) is the middle of the donut ----
  const total = d3.sum(data, d => d.Count);
  const svg = d3
    .select("#donut-chart")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("class", "responsive-svg-container")
    .attr("role", "img")
    .attr(
      "aria-label",
      "Donut chart of TV screen size categories: " +
        data
          .map(d => `${d.Screensize_Category} ${Math.round((d.Count / total) * 100)}%`)
          .join(", ")
    );

  const innerChart = svg
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

  // ---- 6. Bind data and draw one path (arc) per slice ----
  innerChart
    .selectAll("path")
    .data(pie(data))
    .join("path")
    .attr("d", arcGenerator)
    .attr("fill", d => color(d.data.Screensize_Category)) // use category for colour
    .attr("stroke", "white")
    .attr("stroke-width", 2);

  // ---- 7. Labels: category name + percentage, placed in the middle of each
  // slice using the arc generator's own centroid (as suggested on the
  // exercise page) ----
  const labelGroup = innerChart
    .selectAll(".slice-label")
    .data(pie(data))
    .join("g")
    .attr("class", "slice-label")
    .attr("transform", d => `translate(${arcGenerator.centroid(d)})`);

  labelGroup
    .append("text")
    .attr("class", "slice-label__name")
    .attr("text-anchor", "middle")
    .text(d => d.data.Screensize_Category);

  labelGroup
    .append("text")
    .attr("class", "slice-label__pct")
    .attr("dy", "1.2em")
    .attr("text-anchor", "middle")
    .text(d => `${Math.round((d.data.Count / total) * 100)}%`);

  // Total count, shown in the empty centre of the donut
  innerChart
    .append("text")
    .attr("class", "donut-total")
    .attr("text-anchor", "middle")
    .attr("dy", "-0.2em")
    .text(total.toLocaleString());

  innerChart
    .append("text")
    .attr("class", "donut-total-label")
    .attr("text-anchor", "middle")
    .attr("dy", "1.3em")
    .text("TV models");
};

// ---- Load the data, then draw ----
// This data has already been aggregated in KNIME (see the exercise page), so
// no grouping/summing is needed here - just read it in and convert Count to
// a number.
d3.csv("assets/data/Data_exercise_5.3.csv")
  .then(raw => {
    // Read columns by position (not by name): the provided CSV is saved with
    // a leading byte-order-mark (BOM) character, which some tools merge into
    // the first header's name (e.g. "\uFEFFScreensize_Category"). Using
    // raw.columns[0]/[1] avoids relying on that name matching exactly.
    const [categoryCol, countCol] = raw.columns;
    const data = raw.map(d => ({
      Screensize_Category: d[categoryCol].trim(),
      Count: +d[countCol]
    }));

    console.log(data); // check the data has loaded and parsed correctly

    // No sort applied: we want small/medium/large to stay in the order the
    // CSV provides them, matching the exercise's disabled pie() sort.

    drawDonutChart(data);
  })
  .catch(error => {
    console.error("Could not load the donut chart data:", error);
    const holder = document.getElementById("donut-chart");
    if (holder) {
      holder.innerHTML =
        '<p class="chart-error">Sorry, the chart data could not be loaded. ' +
        "Check that the CSV file name and path are correct.</p>";
    }
  });

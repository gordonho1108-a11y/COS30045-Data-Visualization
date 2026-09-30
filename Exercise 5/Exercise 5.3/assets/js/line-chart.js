// ==========================================================================
// Exercise 5.2 — Scatter plot and line chart with scaled axes (D3 v7)
// Data: average wholesale electricity spot price ($/MWh) in Australia, 1998-2024
// (Tasmania and Snowy are excluded from "Average Price" as they don't cover
// the full time span - see ARE_Spot_Prices.csv)
// ==========================================================================

const drawLineChart = data => {
  // ---- 1. Same margins/size as Exercise 5.1, so both charts line up ----
  const margin = { top: 40, right: 170, bottom: 45, left: 40 };
  const width = 1000;
  const height = 500;
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // ---- 2. Responsive SVG container ----
  const svg = d3
    .select("#line-chart")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("class", "responsive-svg-container")
    .attr("role", "img")
    .attr(
      "aria-label",
      "Line chart of average electricity spot price in dollars per megawatt hour, " +
        `Australia, ${data[0].year} to ${data[data.length - 1].year}, ` +
        `starting at $${data[0].averagePrice} and ending at $${data[data.length - 1].averagePrice}`
    );

  const innerChart = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // ---- 3. Scales ----
  // Both year and averagePrice are continuous, so both use scaleLinear.
  // d3.extent gives [min, max] of year (1998, 2024) in one go.
  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(data, d => d.year))
    .range([0, innerWidth]);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, d => d.averagePrice)])
    .range([innerHeight, 0])
    .nice();

  // ---- 4. Axes ----
  // Force the x-axis to treat year as an integer, so D3 doesn't label it
  // with decimal years (e.g. 2001.5).
  const bottomAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));
  const leftAxis = d3.axisLeft(yScale);

  innerChart
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(bottomAxis);

  innerChart.append("g").attr("class", "y-axis").call(leftAxis);

  // y-axis label
  innerChart
    .append("text")
    .attr("class", "axis-label")
    .text("Average Price ($ per MWh)")
    .attr("x", -margin.left)
    .attr("y", -10)
    .attr("text-anchor", "start");

  // x-axis label
  innerChart
    .append("text")
    .attr("class", "axis-label")
    .text("Year")
    .attr("x", innerWidth / 2)
    .attr("y", innerHeight + 40)
    .attr("text-anchor", "middle");

  // ---- 5. Line generator: turns each {year, averagePrice} row into an x,y point ----
  const lineGenerator = d3
    .line()
    .x(d => xScale(d.year))
    .y(d => yScale(d.averagePrice));

  // ---- 6. Draw the line as a single path ----
  innerChart
    .append("path")
    .datum(data) // one path needs the whole array bound as a single datum
    .attr("class", "price-line")
    .attr("d", lineGenerator)
    .attr("fill", "none")
    .attr("stroke", "green")
    .attr("stroke-width", 2);

  // ---- 7. Scatter points on top of the line, one circle per year ----
  innerChart
    .selectAll(".point")
    .data(data)
    .join("circle")
    .attr("class", "point")
    .attr("r", 4)
    .attr("cx", d => xScale(d.year))
    .attr("cy", d => yScale(d.averagePrice))
    .attr("fill", "green");

  // Label the end of the line, matching the "Average Price ($ per mWh)" label
  // shown in the exercise example.
  const last = data[data.length - 1];
  innerChart
    .append("text")
    .attr("class", "line-end-label")
    .attr("x", xScale(last.year) + 8)
    .attr("y", yScale(last.averagePrice) + 4)
    .text("Average Price ($ per MWh)");
};

// ---- Load and prepare the data, then draw ----
d3.csv("assets/data/ARE_Spot_Prices.csv")
  .then(raw => {
    const data = raw
      .map(d => ({
        year: +d.Year, // + converts the string to a number so the axis is continuous, not categorical
        averagePrice: +d["Average Price (notTas-Snowy)"]
      }))
      .sort((a, b) => a.year - b.year); // ensure the line is drawn left-to-right by year

    console.log(data); // check the data has loaded and parsed correctly

    drawLineChart(data);
  })
  .catch(error => {
    console.error("Could not load the line chart data:", error);
    const holder = document.getElementById("line-chart");
    if (holder) {
      holder.innerHTML =
        '<p class="chart-error">Sorry, the chart data could not be loaded. ' +
        "Check that the CSV file name, path, and column headers are correct.</p>";
    }
  });

const drawBarChart = data => {
  // ---- 1. Inner chart margins and dimensions (D3 margin convention) ----
  const margin = { top: 40, right: 170, bottom: 25, left: 40 };
  const width = 1000;
  const height = 500;
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // ---- 2. Responsive SVG container (viewBox, no fixed width/height) ----
  const svg = d3
    .select("#bar-chart")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("class", "responsive-svg-container")
    .attr("role", "img")
    .attr(
      "aria-label",
      "Vertical bar chart of mean annual energy consumption in kWh for 55 inch " +
        "televisions by screen technology: " +
        data.map(d => `${d.Screen_Tech.toUpperCase()} ${Math.round(d.Energy_Consumption)} kWh`).join(", ")
    );

  // ---- 3. Inner chart group, shifted by the left and top margins ----
  const innerChart = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // ---- 4. Scales ----
  // Categories (screen type) on x, so a band scale; values on y, so a linear scale.
  const xScale = d3
    .scaleBand()
    .domain(data.map(d => d.Screen_Tech))
    .range([0, innerWidth])
    .padding(0.1);

  // y range is [innerHeight, 0] because SVG y grows downward.
  // .nice() rounds the top of the axis up (369 -> 400), leaving headroom so the
  // tallest bar's value label doesn't collide with the axis title.
  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, d => d.Energy_Consumption)])
    .range([innerHeight, 0])
    .nice();

  // ---- 5. Axes ----
  const bottomAxis = d3
    .axisBottom(xScale)
    .tickSize(0)
    .tickFormat(d => d.toUpperCase()); // "led" -> "LED"
  const leftAxis = d3.axisLeft(yScale);

  innerChart
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0, ${innerHeight})`) // move x-axis from the top to the bottom
    .call(bottomAxis);

  innerChart.append("g").attr("class", "y-axis").call(leftAxis);

  // y-axis label
  innerChart
    .append("text")
    .attr("class", "axis-label")
    .text("Energy Consumption (kWh/year)")
    .attr("x", -margin.left)
    .attr("y", -10)
    .attr("text-anchor", "start");

  // ---- 6. Bars ----
  innerChart
    .selectAll(".bar")
    .data(data)
    .join("rect")
    .attr("class", "bar")
    .attr("x", d => xScale(d.Screen_Tech))
    .attr("y", d => yScale(d.Energy_Consumption))
    .attr("width", xScale.bandwidth())
    .attr("height", d => innerHeight - yScale(d.Energy_Consumption)) // y is upside down
    .attr("fill", "green");

  // ---- 7. Value labels above each bar ----
  innerChart
    .selectAll(".bar-label")
    .data(data)
    .join("text")
    .attr("class", "bar-label")
    .attr("x", d => xScale(d.Screen_Tech) + xScale.bandwidth() / 2)
    .attr("y", d => yScale(d.Energy_Consumption) - 6)
    .attr("text-anchor", "middle")
    .text(d => `${Math.round(d.Energy_Consumption)} kWh`);
};

// ---- Load and prepare the data, then draw ----
// Column names are read from the file header, so this works with either the
// tidied header (Screen_Tech, Energy_Consumption) or the original long one.
d3.csv("assets/data/Data_exercise_5.1.csv")
  .then(raw => {
    const [techCol, valueCol] = raw.columns;
    const data = raw.map(d => ({
      Screen_Tech: d[techCol].trim(),
      Energy_Consumption: +d[valueCol] // + converts the string to a number
    }));

    console.log(data); // check the data has loaded and parsed correctly

    // Sort so the highest energy consumer is first (left)
    data.sort((a, b) => b.Energy_Consumption - a.Energy_Consumption);

    drawBarChart(data);
  })
  .catch(error => {
    console.error("Could not load the chart data:", error);
    const holder = document.getElementById("bar-chart");
    if (holder) {
      holder.innerHTML =
        '<p class="chart-error">Sorry, the chart data could not be loaded. ' +
        "Check that the CSV file name and path are correct.</p>";
    }
  });

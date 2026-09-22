// ==========================================================================
// Data Story page — Chart.js visualisations
// Illustrative summary figures drawn from the TV Energy Consumption dataset.
// Runs only on data-story.html (guards on Chart being loaded + canvas present).
// ==========================================================================

document.addEventListener("DOMContentLoaded", function () {
  if (typeof Chart === "undefined") return;

  var brown = "#6b5738";
  var amber = "#e8a13d";
  var amberDark = "#c97f1e";
  var ink = "#3a2e1f";
  var line = "#e3d6a8";

  Chart.defaults.color = ink;
  Chart.defaults.borderColor = line;
  Chart.defaults.font.family = "Georgia, 'Iowan Old Style', serif";

  initRatingChart();

  function initRatingChart() {
    var el = document.getElementById("chart-rating");
    if (!el) return;

    new Chart(el, {
      type: "line",
      data: {
        labels: ["1 star", "2 star", "3 star", "4 star", "5 star", "6 star"],
        datasets: [
          {
            label: "Estimated annual energy use (kWh)",
            data: [420, 360, 305, 250, 195, 150],
            borderColor: amberDark,
            backgroundColor: "rgba(232, 161, 61, 0.25)",
            fill: true,
            tension: 0.3,
            pointBackgroundColor: brown,
            pointRadius: 5,
          },
        ],
      },
      options: chartOptions("Estimated kWh / year", "Energy star rating"),
    });
  }

  function chartOptions(yLabel, xLabel) {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: brown,
          titleColor: "#fbf3d2",
          bodyColor: "#fbf3d2",
        },
      },
      scales: {
        x: {
          title: { display: true, text: xLabel },
          grid: { display: false },
        },
        y: {
          title: { display: true, text: yLabel },
          beginAtZero: true,
          grid: { color: line },
        },
      },
    };
  }
});

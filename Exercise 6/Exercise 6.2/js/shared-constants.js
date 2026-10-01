// Set up dimensions and margins
const margin = { top: 40, right: 30, bottom: 50, left: 70 };
const width = 800; // Total width of the chart
const height = 400; // Total height of the chart
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

// Set up colors accessible globally — matching the site's own palette
// (--brown and --paper in css/base.css) rather than arbitrary chart colours
const barColor = "#6b5738"; // --brown
const bodyBackgroundColor = "#fffdf6"; // --paper

// set up the scales
const xScale = d3.scaleLinear();
const yScale = d3.scaleLinear();

// Create a bin generator using d3.bin
const binGenerator = d3.bin().value(d => d.energyConsumption); // Accessor for energyConsumption

// Array of filter options for screen types
const filters_screen = [
  { id: "all", label: "All", isActive: true },
  { id: "LED", label: "LED", isActive: false },
  { id: "LCD", label: "LCD", isActive: false },
  { id: "OLED", label: "OLED", isActive: false }
];

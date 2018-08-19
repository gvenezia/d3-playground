// =================== Data & Chart Prep ======================
// Choose your dataset
const dataSet = '/assets/test_data/bar_graph_data.csv';

// Set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// Set the ranges
var x = d3.scaleBand()
            .range([0, width])
            .padding(0.1);

var y = d3.scaleLinear()
            .range([height, 0]);  

// append the svg object to the body of the page 
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("body").append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
            .append("g")
              .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");

// =================== Data & Chart Processing ======================
// Get the data and use a callback function for processing it
d3.csv(dataSet, function(error, data) {
  if (error) throw error;

  // Format the data from the CSV strings
  data.forEach(function(d) { 
    d.sales = +d.sales;
  });
  
  // Scale the range of the data within the domains
  x.domain(data.map(function(d) { return d.salesperson; }));
  y.domain([0, d3.max(data, function(d) { return d.sales; })]);
  
  // Append the rectangles for the bar chart
  svg.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.salesperson); }) 
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return y(d.sales); }) 
      .attr("height", function(d) { return height - y(d.sales); });
  
  // Add the x Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));
  
  // Add the y Axis
  svg.append("g")
      .call(d3.axisLeft(y));
});
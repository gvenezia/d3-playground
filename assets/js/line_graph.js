// Choose your dataset
const dataSet = '/assets/test_data/data3.csv';

// ==================== Set up Variables ============================
// set the dimensions and margins of the graph
const margin = {top: 100, right: 200, bottom: 200, left: 200},
      width = 1560 - margin.left - margin.right,
      height = 900 - margin.top - margin.bottom;

// parse the date / time
const parseTime = d3.timeParse('%d-%b-%y');

// define ticks to make dynamic
const configuredTicks = d3.timeDay.every(5);

// set the ranges
const x = d3.scaleTime().range([0, width]),
      yLeft = d3.scaleLinear().range([height, 0]),
      yRight = d3.scaleLinear().range([height, 0]);

// define curve to make dynamic
const curveType = d3.curveMonotoneX;

// define the line
let valueline = d3.line()
    .curve( curveType )
    .x( (d) => x(d.date) )
    .y( (d) => yLeft(d.open) );

// define the 2nd line
let valueline2 = d3.line()
    .curve( curveType )
    .x( (d) => x(d.date) )
    .y( (d) => yRight(d.close) );    

// define the area
let area = d3.area()
    .curve( curveType )
    .x( (d) => x(d.date) )
    .y0( (d) => yRight(d.close) )
    .y1( (d) => yLeft(d.open) );

// append the svg obgect to the body of the page
let svg = d3.select('body').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    // Reveal the scatterplot on hover
    .on('mouseover', () => {
        d3.selectAll('circle')
          .transition()
          .duration(400)
          .style('fill-opacity', 1);
    })
    .on('mouseout', () => {
        d3.selectAll('circle')
          .transition()
          .duration(900)
          .style('fill-opacity', 0);
    })
  .append('g') // appends a 'group' element to 'svg'
    .attr('transform', `translate(${margin.left}, ${margin.top})`); // moves the 'group' element to the top left margin

// ==================== Functions ============================
// Gridlines
const makeXGrid = () => d3.axisBottom(x).ticks(configuredTicks);
const makeYGrid = () => d3.axisLeft(yLeft).ticks(5);
const makeYRightGrid = () => d3.axisLeft(yRight).ticks(5);

// Scatterplotting
const plotValuelineDots = (data, yFunction, xCoordinate, yCoordinate) => {
  return svg.selectAll('dot')
              .data(data)
              .enter()
            .append('circle')
              .style('fill-opacity', 0)
              .attr('r', 5)
              .attr('cx', (d) => x( d[xCoordinate]) ) 
              .attr('cy', (d) => yFunction( d[yCoordinate]) );
};


// ==================== Get Data, Draw Graph ============================
// Get the data
d3.csv(dataSet, (error, data) => {
  if (error) throw error;

  // format the data
  data.forEach( (d) => {
      d.date = parseTime(d.date);
      d.close = +d.close;
      d.open = +d.open;
  });

  // Scale the range of the data
  x.domain( d3.extent(data, (d) => d.date ) );
  yLeft.domain( [0, d3.max(data, (d) => Math.max(d.open) )] );
  yRight.domain( [0, d3.max(data, (d) => Math.max(d.close) )] );

  // 

  // Add the valueline path
  svg.append('path')
      .data([data])
      .attr('class', 'line')
      .style('stroke-dasharray', ("5, 1"))
      .attr('d', valueline);

  // Add the 2nd valueline path
  svg.append('path')
      .data([data])
      .attr('class', 'line2')
      .style('stroke-dasharray', ("8, 1"))
      .attr('d', valueline2);

  // Add label for d.close valueline
  svg.append('text')
      .data([data])
      .attr('x', width + 5)
      .attr('y', (d) => yRight(d[0]['close']) ) // access the last object in data, then access the close value
      .attr('dy', '.25em') 
      .style('fill', 'maroon')
      .text('— Close');

  // Add label for d.open valueline2
  svg.append('text')
      .data([data])
      .attr('x', width + 5)
      .attr('y', (d) => yLeft(d[0]['open']) ) // access the last object in data, then access the close value
      .attr('dy', '.25em')
      .style('fill', 'steelblue')
      .text('— Open');

  // Add the are under the valueline
  svg.append('path')
      .data([data])
      .attr('class', 'area')
      .attr('d', area);

  // Add the X Axis
  svg.append('g')
      .attr('class', 'f')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x)
        .ticks(d3.timeDay.every(5))
        .tickFormat(d3.timeFormat('%b %_d'))) 
      .selectAll('text')
        .style('text-anchor', 'end')
        .attr('dx', '-.8em')
        .attr('dy', '-.15em')
        .attr('transform', 'rotate(-40)');

  // Add X Gridlines
  // svg.append('g')
  //     .attr('class', 'grid')
  //     .attr('transform', `translate(0, ${height})`)
  //     .call(makeXGrid()
  //       .tickSize(-height)
  //       .tickFormat('')
  //     );

  // Add Text label for X Axis
  svg.append('text')
      .attr('class', 'f')
      .attr('x', width / 2)
      .attr('y', height + margin.top - 10)
      .style('text-anchor', 'middle')
      .text('Date');
        

  // Add the Left Y Axis for 'Open'
  svg.append('g')
      .attr('class', 'axisLeft')
      .call(d3.axisLeft(yLeft));

  // Add the Right Y Axis for 'Close'
  svg.append('g')
      .attr('class', 'axisRight')
      .attr('transform', `translate(${width}, 0)`)
      .call(d3.axisRight(yRight));

  // Add Text label for Y Left Axis
  svg.append('text')
      .attr('class', 'f')
      .attr('x', 0 - (margin.left / 2)) 
      .attr('y', height / 2 )
      .attr('class', 'yAxisLabel')
      .text('Value @ Open');

  // Add Text label for Y Right Axis
  svg.append('text')
      .attr('class', 'f')
      .attr('x', width + (margin.right / 2) ) 
      .attr('y', height / 2 )
      .attr('class', 'yAxisLabel')
      .text('Value @ Close');

  // // Add Y Left Gridlines
  // svg.append('g')
  //     .attr('class', 'grid')
  //     .call(makeYGrid()
  //       .tickSize(-width)
  //       .tickFormat('')
  //     );

  // // Add Y Right Gridlines
  // svg.append('g')
  //     .attr('class', 'grid')
  //     .call(makeYRightGrid()
  //       .tickSize(-width)
  //       .tickFormat('')
  //     );

  // Add the scatterplot
  plotValuelineDots(data, yLeft, 'date', 'open');
  plotValuelineDots(data, yRight, 'date', 'close');


});

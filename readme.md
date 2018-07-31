# D3 Playground

This repo provides a simple setup for exploring the D3 library. Currently, it is configured for working with a line graph or a bar graph. 

## How to use
Everything you need to start working with D3 is included in this repo: a codebase, data, and a simple server.

#### Installation
To set up the repo, simply clone the repo in your desired folder, then do an `npm install` to install dependencies. When you are ready to fire up your local server, simply type `http-server` or on the command line.

##### Configuration
The type of graph is determined by `index.html`. Simply uncomment the CSS `≤link>` and graph `<script>` that you want to display. Different datasets are set within the graph's js file w/ the variable `dataSet`.

## What kind of server does it use?
I use the npm package, `http-server`, to set up a simple local server.  (Alternatively, you can use a simple Python server: `python -m SimpleHTTPServer {portnumber}`).

## Resources used
These simple graphs are written with d3.js v4 and based on @mbostock's example [here](http://bl.ocks.org/mbostock/02d893e3486c70c4475f). 

These simple graphs are designed to be used as a starting point for further development as part of documenting an update to the book [D3 Tips and Tricks](https://leanpub.com/d3-t-and-t-v4) to version 4 of d3.js.

Here are some screenshots of the basic setup and modifications that I've made:
![screenshot of bar graph in the browser](https://github.com/gvenezia/d3-playground/blob/master/assets/screenshots/bar_graph.png)
![screenshot of the graph in the browser](https://github.com/gvenezia/d3-playground/blob/master/assets/screenshots/graph.png)
![screenshot of graph 2 in the browser](https://github.com/gvenezia/d3-playground/blob/master/assets/screenshots/line_graph_2.png)
![screenshot of graph 3 in the browser](https://github.com/gvenezia/d3-playground/blob/master/assets/screenshots/line_graph_3.png)

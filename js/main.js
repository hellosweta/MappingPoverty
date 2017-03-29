// // create an svg element
// const svg = d3.select("svg"),
//     width = +svg.attr("width"),
//     height = +svg.attr("height");
//
// // create a geo path - https://github.com/mbostock/d3/wiki/Geo-Paths
//
// // var projection = d3.geo.albers()
// // .rotate([-105, 0])
// // .center([-10, 65])
// // .parallels([52, 64])
// // .scale(700)
// // .translate([width / 2, height / 2]);
// //
// // var path = d3.geo.path().projection(projection);
//
// const x = d3.scaleLinear()
//     .domain([3, 50])
//     .rangeRound([600, 860]);
//
// const color = d3.scaleThreshold()
//     // .domain(d3.range(3, 50))
//     .domain([5, 10, 20, 30, 40])
//     .range(d3.schemeBlues[5]);
//
// // const color = d3.scale.threshold()
// //     .domain([10, 20, 30, 40, 50, 60])
// //     .range(["#f2f0f7", "#dadaeb", "#bcbddc", "#9e9ac8", "#756bb1", "#54278f"]);
//
// const g = svg.append("g")
//     .attr("class", "key")
//     .attr("transform", "translate(0,20)");
//
// g.selectAll("rect")
//   .data(color.range().map( d => {
//     d = color.invertExtent(d);
//     if (d[0] == null) d[0] = x.domain()[0];
//     if (d[1] == null) d[1] = x.domain()[1];
//     return d;
//   }))
//   .enter().append("rect")
//     .attr("height", 8)
//     .attr("x", d => x(d[0]))
//     .attr("width", d => x(d[1]) - x(d[0]))
//     .attr("fill", d => color(d[0]))
//
// g.append("text")
//     .attr("class", "caption")
//     .attr("x", x.range()[0])
//     .attr("y", -10)
//     .attr("fill", "#000")
//     .attr("text-anchor", "start")
//     .attr("font-weight", "bold")
//     .text("Poverty Rate");
//
// g.call(d3.axisBottom(x)
//     .tickSize(13)
//     .tickFormat((x, i) => ( i ? x : x + "%" ))
//     .tickValues(color.domain()))
//   .select(".domain")
//     .remove();
//
// let  PovertyEstimates = d3.geoAlbers()
//     .scale(170)
//     .rotate([100,0,0])
//     .translate([width/2, height/2])
//     .clipAngle(90);
//
// const path = d3.geo.path.projection(PovertyEstimates);
//
// const ready = (error, us) => {
//   if (error) throw error;
//
//
//
//   svg.append("g")
//       .attr("class", "counties")
//     .selectAll("path")
//     .data(topojson.feature(us, us.objects.counties).features)
//     .enter().append("path")
//       .console.log(PovertyEstimates)
//       .attr("fill", d => (color(d.rate = PovertyEstimates.get(d.id)) ))
//       .attr("d", path)
//     .append("title")
//       .text(d => (d.rate + "%" ));
//
//   svg.append("path")
//       .datum(topojson.mesh(us, us.objects.states, (a, b) => ( a !== b ) ))
//       .attr("class", "states")
//       .attr("d", path)
//
//   // .on("mouseover", function(d) {
//   //   d3.select(this).transition().duration(300).style("opacity", 1);
//   //   div.transition().duration(300)
//   //   .style("opacity", 1)
//   //   div.text(nameById[d.properties.region] + " : " + rateById[d.properties.region])
//   //   .style("left", (d3.event.pageX) + "px")
//   //   .style("top", (d3.event.pageY -30) + "px");
//   // })
//   // .on("mouseout", function() {
//   //   d3.select(this)
//   //   .transition().duration(300)
//   //   .style("opacity", 0.8);
//   //   div.transition().duration(300)
//   //   .style("opacity", 0);
//   // });
//
//   const zoom = d3.geo.zoom()
//     .projection(PovertyEstimates)
//     .on("zoom.redraw", function() {
//       d3.event.sourceEvent.preventDefault();
//       svg.selectAll("path").attr("d", path);
//
//     })
// };
//
// d3.queue()
// .defer(d3.json, "https://d3js.org/us-10m.v1.json")
// .defer(d3.tsv, "../data/PovertyEstimates.tsv", d => ( PovertyEstimates.set(d.id, +d.rate, +d.Area_Name, +d.State)) )
// .await(ready);

let width;
let height;
let projection;
let path;
let graticule;
let svg;

let PovertyEstimates = d3.map();
const init = () => {
  setMap();
  setKey();
  processData();
  loadData();
  // animateMap();
};

const setMap = () => {
  width = 960;
  height = 600;
  // projection  = d3.geoAlbersUsa()
  //   .scale(1070)
  //   .translate([width /2, height/2]);

  graticule = d3.geo.graticule();

  svg = d3.select("#map").append("svg")
          .attr("width", width)
          .attr("height", height);

  path = d3.geoPath()
};

const x = d3.scaleLinear()
    .domain([3, 50])
    .rangeRound([600, 860]);

const color = d3.scaleThreshold()
    // .domain(d3.range(3, 50))
    .domain([5, 10, 20, 30, 40])
    .range(d3.schemeBlues[5]);


const setKey = () => {




  const g = svg.append("g")
      .attr("class", "key")
      .attr("transform", "translate(0,40)")


  g.selectAll("rect")
    .data(color.range().map( d => {
      d = color.invertExtent(d);
      if (d[0] == null) d[0] = x.domain()[0];
      if (d[1] == null) d[1] = x.domain()[1];
      return d;
    }))
    .enter().append("rect")
      .attr("height", 8)
      .attr("x", d => x(d[0]))
      .attr("width", d => x(d[1]) - x(d[0]))
      .attr("fill", d => color(d[0]))

  g.append("text")
      .attr("class", "caption")
      .attr("x", x.range()[0])
      .attr("y", -10)
      .attr("fill", "#000")
      .attr("text-anchor", "start")
      .attr("font-weight", "bold")
      .text("Poverty Rate");

  g.call(d3.axisBottom(x)
      .tickSize(13)
      .tickFormat((x, i) => ( i ? x : x + "%" ))
      .tickValues(color.domain()))
    .select(".domain")
      .remove();

};

const loadData = () => {
  d3.queue()
    .defer(d3.json, "https://d3js.org/us-10m.v1.json")
    .defer(d3.tsv, "../data/PovertyEstimates.tsv", d => {
      return (PovertyEstimates.set(d.id, d.rate).set(`State${d.id}`, d.State).set(`County${d.id}`, d.Area_Name))
  // makes map ^^
    })
    .await(ready);

};

const processData =  (error, us) => {
  if (error) throw error;

  svg.append("g")
      .attr("class", "counties")
    .selectAll("path")
    .data(topojson.feature(us, us.objects.counties).features)
    .enter().append("path")
      .attr("fill", d => {
        d.county = PovertyEstimates.get(`County${d.id}`)
        d.state = PovertyEstimates.get(`State${d.id}`)
        return color(d.rate = PovertyEstimates.get(d.id)) })
      .attr("d", path)
    .append("title")
      .text(d => {
        return(`${d.county}, ${d.state}
        Poverty Rate: ${d.rate}%`)
      })

  svg.append("path")
      .datum(topojson.mesh(us, us.objects.states, (a, b) => ( a !== b ) ))
      .attr("class", "states")
      .attr("d", path)
};

window.onload = init(); 

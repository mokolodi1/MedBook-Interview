/*
 * Please use the code and data below to write a simple HTML/SVG Meteor visualization showing a graph
 * of the counts of patients with different cancers and locations using the color map function.
 * If there are bugs in this code, please fix and document them.

 * You may use the D3 library, but you do not have to.

 * You may deploy this to meteor.com or heroku.com
 * Please keep it simple.

 * Please complete by Friday night if possible.

 * Ted

 */


// given code

let value_color_scale =  ["red", "green", "blue", "orange", "black", "yellow"];
let value_color_scale_i = 0;
let value_color_map = {};

function color_map(attribute, value) {
  let key = attribute + ";" + value;

  // interpretation: set value_color_map[key] if it's not defined
  if (!value_color_map[key]) {
    let color = value_color_scale[value_color_scale_i++ % value_color_scale.length];
    value_color_map[key] = color;
  }

  // changed ret to return
  return value_color_map[key];
}

// written code

Template.body.onCreated(function () {
  const instance = this;

  instance.subscribe("patients");
});

Template.graph.onRendered(function () {
  let patientsArray = Patients.find().fetch();

  // code modeled after https://bl.ocks.org/mbostock/3886208
  var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  var x = d3.scale.ordinal()
      .rangeRoundBands([0, width], .1);

  var y = d3.scale.linear()
      .rangeRound([height, 0]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .tickFormat(d3.format(".2s"));

  var svg = d3.select("#graph-attach").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // figure out the domain of locations
  let uniqueLocations = _.uniq(_.pluck(patientsArray, "location"));

  // group by location and then number of patients by disease
  let locations = _.map(uniqueLocations, (location) => {
    let total = 0;
    let y0 = 0;

    let diseases = _.chain(patientsArray)
        .where({location})
        .groupBy("disease")
        // generate the data
        .map((singleDiseasePatients, disease) => {
          let patientCount = singleDiseasePatients.length;
          total += patientCount;

          return {
            disease,
            patientCount,
            color: color_map("disease", disease),
          };
        })
        .sortBy("disease")
        .map((disease) => {
          // NOTE: y0, y1 must generated after the sort
          return _.extend(disease, {
            y0: y0,
            y1: y0 += disease.patientCount,
          });
        })
        .value();

    return {
      location,
      diseases,
      total,
    };
  });
  locations.sort((a, b) => {
    return b.total - a.total;
  });

  x.domain(locations.map(function(d) { return d.location; }));
  y.domain([0, d3.max(locations, function(d) { return d.total; })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Patients");

  var location = svg.selectAll(".location")
      .data(locations)
    .enter().append("g")
      .attr("class", "g")
      .attr("transform", function(d) {
        return "translate(" + x(d.location) + ",0)";
      });

  location.selectAll("rect")
      .data(function(d) { console.log("d:", d); return d.diseases; })
    .enter().append("rect")
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.y1); })
      .attr("height", function(d) { return y(d.y0) - y(d.y1); })
      .style("fill", function(d) { return d.color; });

  // reverse the diseases so that it shows up in the same order as
  // they show in the stacked graph
  let diseases = _.uniq(_.pluck(patientsArray, "disease")).sort().reverse();
  var legend = svg.selectAll(".legend")
      .data(diseases)
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", (d) => { return color_map("disease", d); });

  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d; });
});

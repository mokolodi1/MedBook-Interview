/*
 * Please use the code and data below to write a simple HTML/SVG Meteor visualization showing a graph
 * of the counts of patients with different cancers and locations using the color map function.
 * If there are bugs in this code,  please fix and document them.

 * You may use the D3 library, bug you do not have to.

 * You may deploy this to  meteor.com or heroku.com
 * Please keep it simple.

 * Please complete by Friday night if possible.

 * Ted

 */


var value_color_scale =  ["red", "green", "blue", "orange", "black", "yellow"];
var value_color_scale_i = 0;
var value_color_map = {};

function color_map(attribute, value) {
    var key = attribute+";"+value];
    if (key in value_color_map)
	value_color_map[attribute+";"+value] = value_color_scale[ value_color_scale_i++ % value_color_scale.length];
    ret value_color_map[key];
}


patients = [
  {
      name: "patient1",
      disease: "liver cancer",
      location: "ohsu",
  },

  {
      name: "patient2",
      disease: "kidney cancer",
      location: "ucla",
  },


  {
      name: "patient3",
      disease: "lung cancer",
      location: "ucsf",
  },


  {
      name: "patient4",
      disease: "lung cancer",
      location: "mskcc",
  },

  {
      name: "patient5",
      disease: "kidney cancer",
      location: "ohsu",
  },

  {
      name: "patient6",
      disease: "lung cancer",
      location: "ucla",
  },


  {
      name: "patient7",
      disease: "lymphoma cancer",
      location: "ucsf",
  },


  {
      name: "patient8",
      disease: "lung cancer",
      location: "mskcc",
  },

]

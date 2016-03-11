// let patients = [
//   {
//     name: "patient1",
//     disease: "liver cancer",
//     location: "ohsu",
//   },
//   {
//     name: "patient2",
//     disease: "kidney cancer",
//     location: "ucla",
//   },
//   {
//     name: "patient3",
//     disease: "lung cancer",
//     location: "ucsf",
//   },
//   {
//     name: "patient4",
//     disease: "lung cancer",
//     location: "mskcc",
//   },
//   {
//     name: "patient5",
//     disease: "kidney cancer",
//     location: "ohsu",
//   },
//   {
//     name: "patient6",
//     disease: "lung cancer",
//     location: "ucla",
//   },
//   {
//     name: "patient7",
//     disease: "lymphoma cancer",
//     location: "ucsf",
//   },
//   {
//     name: "patient8",
//     disease: "lung cancer",
//     location: "mskcc",
//   },
// ];

// populate the Patients collection if empty
Meteor.startup(function () {
  if (Patients.find().count() === 0) {
    let diseases = [
      "liver cancer",
      "lung cancer",
      "lymphoma cancer",
      "kidney cancer"
    ];

    let locations = [
      "mskcc",
      "ucsf",
      "ohsu",
      "ucla",
    ];

    _.times(200, (number) => {
      Patients.insert({
        name: "patient" + number,
        disease: diseases[_.random(0, diseases.length - 1)],
        location: locations[_.random(0, locations.length - 1)],
      });
    });
  }
});

Meteor.publish("patients", function () {
  return Patients.find({});
});

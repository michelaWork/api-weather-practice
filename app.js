const express = require("express");
const axios = require("axios");
const app = express();
const port = 5000;

const people = [
  ["Franchetto Emiliani", 55.9714744024537, -3.16865488534372],
  ["Marcella De Lollo", 42.6590731461043, 13.703121929364],
  ["John Johnny", 42.3497248085007, -71.0575026424646],
  ["Jane Auderbin", 37.3491173059758, -121.886679290754],
  ["Erminio Ferroni", 37.792660922621, 12.4573546886199],
  ["Ornella Bertrame", 37.7603144505292, 12.494807725852],
  ["Frank Cicio", 35.3979743284537, 8.12019241547058],
];

app.listen(port, () => {
  console.log("Server listening on port " + port);
});

app.get("/", async (req, res) => {
  var result = "<table><tr><th>Name</th><th>Position</th><th>Temperature</th></tr>";
  for (let i = 0; i < people.length; i++) {
    const name = people[i][0];
    const lat = people[i][1];
    const lon = people[i][2];
    const urlPosition = `https://geocode.maps.co/reverse?lat=${lat}&lon=${lon}`;
    const urlWeather = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

    try {
      const responsePosition = await axios.get(urlPosition);
      const position = responsePosition.data.display_name;
      const responseWeather = await axios.get(urlWeather);
      const weather = responseWeather.data.current_weather.temperature;

      result += `<tr><td>${name}</td><td>${position}</td><td>${weather}</td></tr>`
    } catch (error) {
      console.log(error);
    }
  }
  res.send(result);
});

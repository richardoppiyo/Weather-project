const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){

  res.sendFile(__dirname + "/index.html");

 // res.send("Server is runing very well");
});


// This receive the post request from the form
app.post("/",function(req,res){
  // console.log(req.body.cityName);
  const unit = "metric";
  const apiKey = "4fa6727f945ff29090ec237ab62c34ad";
  const query = req.body.cityName;
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query + "&appid="+ apiKey + "&units=" + unit;
  https.get(url,function(response){

    // console.log(response.statusCode);

    response.on("data",function(data){
      const weatherData = JSON.parse(data);

      const temp = weatherData.main.temp;
      const pressure = weatherData.main.pressure;
      const icon =  weatherData.weather[0].icon;

      const imageURL = "https://openweathermap.org/img/wn/" + icon +"@2x.png";
      // console.log(weatherData);
      // console.log(temp);
      // console.log(pressure);

      res.write("<p> The temperature in " +  query + " is " + temp + " Celsius </p>");
      res.write(" <h1>The atmospheric pressure in " +  query + " is " + pressure + " Pascal</h1>");

      res.write("<img src=" + imageURL + ">")
      res.send();
    })
  });
})

app.listen(3000,function(){

  console.log("Server connected on pORT 3000");
});

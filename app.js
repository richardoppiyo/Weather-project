const express = require("express");
const https = require("https");

const app = express();

app.get("/",function(req,res){

  const url = "https://api.openweathermap.org/data/2.5/weather?q=chittoor&appid=4fa6727f945ff29090ec237ab62c34ad&units=metrics";
  https.get(url,function(response){

    console.log(response);
  });


});



app.listen(3000,function(){

  console.log("Server connected on pORT 3000");
});

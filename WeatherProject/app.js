
const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

app = express()
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post('/', function(req, res) {
    const query = req.body.cityName;
    // console.log(query);
    // const query = "London";
    const apiKey = "7f6aa91edd4360a1695571e8db97a4c0"
    const units = "imperial"
    const url = "https://api.openweathermap.org/data/2.5/weather?appid=" + apiKey + "&q=" + query + "&units=" + units + "";
    https.get(url, function(response) {
        console.log("status code: ", response.statusCode);
        response.on('data', function(data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            console.log(temp);
            const weatherDescription = weatherData.weather[0].description;
            console.log(weatherDescription)
            const coordLon = weatherData.coord.lon;
            const coordLat = weatherData.coord.lat;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<h1>The temperature in " + query + " is " + temp + " degrees fahrenheit</h1>");
            res.write("<p>The weather is " + weatherDescription + "</p>")
            res.write("<img src=" + imageURL +">");
            res.send();
    })
    })


})


app.listen(3000, function() {
    console.log("Server is running on port 3000");
})

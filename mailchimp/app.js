const request = require('request');
const express = require('express');
const bodyParser = require('body-parser');
const https = require("https");

app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"))

app.get('/', function(req, res) {
    res.sendFile(__dirname + "/signup.html");
    // console.log("Hello, world!")
});

app.post("/", function(req, res){
const firstName = req.body.fName;
const lastName = req.body.lName;
const email = req.body.eMail;
const data = {
    members: [
        {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName

            }
        }

    ]
};
const jsonData = JSON.stringify(data)
const url = "https://us21.api.mailchimp.com/3.0/lists/e47a7dbd12"
const options = {
    method: "POST",
    auth:"aadehamid@gmail.com:5c4eba0c5c3f3cc6137ec494c416233e-us"
}

const request = https.request(url, options, function(response){
    response.on("data", function(data){
        console.log(JSON.parse(data));
    if (response.statusCode === 200){
        res.sendFile(__dirname + "/success.html")
    } else {
        res.sendFile(__dirname + "/failure.html")
    }

    })

});
request.write(jsonData);
request.end();

console.log("The name of the new signee is " + firstName + " " + lastName + ". " + "Email is " + email +".")
});

app.post("/failure", function(req, res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function() {
    console.log("The server is running on port 3000")
});

// Mail Chimp API Key: 5c4eba0c5c3f3cc6137ec494c416233e-us21
// mailchimp audience ID: e47a7dbd12

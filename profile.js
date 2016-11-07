var https = require("https");
var http = require("http");


//Print message
function printMessage(username, badgeCount, points) {
  var message = username + " has " + badgeCount + " total badges(s) and " + points + " points in JS";
  console.log(message);
}


//Print error
function printError(error){
  console.log("Error:" + error.message);
}

//Connect
function get(username){
  var request = https.get("https://teamtreehouse.com/" + username + ".json", function(response) {
    // console.log(response.statusCode);
    var body = "";
    response.on('data', function (chunk){
      body += chunk;
    });
    response.on('end', function() {
      if(response.statusCode === 200) {
        try {
          var profile = JSON.parse(body);
          printMessage(username, profile.badges.length, profile.points.JavaScript);
        } catch(error) {
          //Parse error
          printError(error);
        }
      } else {
        printError({message: "There was an error getting the profile for " + username + ". (" + http.STATUS_CODES[response.statusCode] + ")"});
      }
    });
  });

  //connection error
  request.on('error', printError);
}

module.exports.get = get;

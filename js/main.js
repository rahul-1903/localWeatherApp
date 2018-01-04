var api = "https://fcc-weather-api.glitch.me/api/current?";
var lat, lon;
var tempUnit = "C";
var curTempInC;

$(document).ready(function() {
   if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(function(position) {
           var lat = "lat="+position.coords.latitude;
           var lon = "lon="+position.coords.longitude;
           getWeather(lat, lon);
       });
   } 
    else {
        console.log("Geolocation is not supported by this browser.");
    }
    // testing
    $("#city").click(function() {
        var t = $("#tempunit").text();
        if (t=="C") t= "true";
        $("#city").text(t);
    });
    // putting the details in proper place
    $("#tempunit").click(function() {
        var curTempUnit = $("#tempunit").text();
        var newTempUnit = curTempUnit == "C" ? "F" : "C";
        $("#tempunit").text(newTempUnit);
        if (newTempUnit == "F") {
            var t = parseInt($("#temp").text());
            var farh = Math.round(t*9/5+32);
            $("#temp").text(farh+"");
        }
        else {
            $("#temp").text(curTempInC+"");
        }
    });
});

function getWeather(lat, lon) {
    var urlstr = api + lat + "&" + lon;
    $.ajax({
        url: urlstr ,
        success: function(result) {
            $("#city").text(result.name + ", ");
            $("#country").text(result.sys.country);
            curTempInC = Math.round(result.main.temp * 10)/10;
            $("#temp").text(curTempInC);
            document.getElementById("deg").style.visibility = "visible";
            $("#tempunit").text(tempUnit);
            var wthr = result.weather[0].main;
            $("#desc").text(wthr);
            getBackground(wthr);
            var src = result.weather[0].icon;
            var img = document.createElement("img");
            img.src = src;
            img.height = 150;
            img.width = 100;
            var s = document.getElementById("icon");
            s.appendChild(img);
        }
    });
}
function getBackground(wthr) {
    var wthr = wthr.toLowerCase();
    var url;
    switch(wthr) {
        case 'smoke' : url = "url('../img/smoke.jpg')"; break;
        case "mist": url = "../img/mist.gif"; break;
        case 'clear': url = "../img/clear.jpg"; break;
        case 'clouds': url = "../img/clouds.jpg"; break;
        case 'drizzle': url = "../img/drizzle.jpg"; break;
        case 'rain': url = "../img/rain.jpg"; break;
        case 'snow': url = "../img/snow.jpeg"; break;
        case 'thunderstorm': "../img/thunderstorm.jpg"; break;
        default: url = "url('../img/plainBlue.jpg')";
    }
    document.getElementById("local1").style.backgroundImage = url;
}

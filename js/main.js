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
        case 'smoke' : url = "url('http://i377.photobucket.com/albums/oo212/rahul19z/smoke_zpsmcwjoel7.jpg')"; break;
        case "mist": url = "url('http://i377.photobucket.com/albums/oo212/rahul19z/mist_zpsytp0qlw7.jpg')"; break;
        case 'clear': url = "url('http://i377.photobucket.com/albums/oo212/rahul19z/clear_zpsoqac9qv8.jpg')"; break;
        case 'clouds': url = "url('http://i377.photobucket.com/albums/oo212/rahul19z/clouds_zpsqfgiwhx5.jpg')"; break;
        case 'drizzle': url = "url('http://i377.photobucket.com/albums/oo212/rahul19z/drizzle_zpsojctvk0g.jpg')"; break;
        case 'rain': url = "url('http://i377.photobucket.com/albums/oo212/rahul19z/rain_zpsc3enqwlt.jpg')"; break;
        case 'snow': url = "url('http://i377.photobucket.com/albums/oo212/rahul19z/snow_zpsetticdhw.jpeg')"; break;
        case 'thunderstorm': "url('http://i377.photobucket.com/albums/oo212/rahul19z/thunderstorm_zpsl28nd8cl.jpg')"; break;
        default: url = "url('../img/plainBlue.jpg')";
    }
    document.getElementById("local1").style.backgroundImage = url;
}
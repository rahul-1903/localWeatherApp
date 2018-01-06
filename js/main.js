(function( $ ) {
    'use strict';
 
    $(function() {
        // alert( 'JavaScript Loaded!' );
    });
 
})( jQuery );
var api = "https://fcc-weather-api.glitch.me/api/current?";
var lat, lon;
var tempUnit = "C";
var curTempInC;

$(document).ready(function() {
   if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(function(position) {
           lat = "lat="+position.coords.latitude;
           lon = "lon="+position.coords.longitude;
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
    wthr = wthr.toLowerCase();
    var url;
    switch(wthr) {
        case 'smoke' : url = "url('http://imghst.co/83/xA_xwq5!It.jpg')"; break;
        case "mist": url = "url('http://imghst.co/92/0&b1aWR8WV.jpg')"; break;
        case 'clear': url = "url('http://imghst.co/100/CaDTqKsMJb.jpg')"; break;
        case 'clouds': url = "url('http://imghst.co/91/4O)vaP2i3E.jpg')"; break;
        case 'drizzle': url = "url('http://imghst.co/78/)SSyMZX!fR.jpg')"; break;
        case 'rain': url = "url('http://imghst.co/83/ou6SICCxwV.jpg')"; break;
        case 'snow': url = "url('http://imghst.co/92/Eca0rx_shy.jpeg')"; break;
        case 'thunderstorm': "url('http://imghst.co/74/KVQ!LRk3Y9.jpg')"; break;
        default: url = "url('http://imghst.co/98/j8f8WuT5(e.jpg')";
    }
    document.getElementById("local1").style.backgroundImage = url;
}

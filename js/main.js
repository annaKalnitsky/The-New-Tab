

/*-------- Weather widget  ----*/

// Tutorial by http://youtube.com/CodeExplained
// api key : 82005d27a116c2880c8f0fcb866998a0

// SELECT ELEMENTS
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

// App data
const weather = {};

weather.temperature = {
    unit : "celsius"
}

// APP CONSTS AND VARS
const KELVIN = 273;
// API KEY
const key = "f1c0cb9df77001219850829ab209c099";

// CHECK IF BROWSER SUPPORTS GEOLOCATION
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}

// SET USER'S POSITION
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    getWeather(latitude, longitude);
}

// SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

// GET WEATHER FROM API PROVIDER
function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    
    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function(){
            displayWeather();
        });
}

// DISPLAY WEATHER TO UI
function displayWeather(){
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

// C to F conversion
function celsiusToFahrenheit(temperature){
    return (temperature * 9/5) + 32;
}

// WHEN THE USER CLICKS ON THE TEMPERATURE ELEMENET
tempElement.addEventListener("click", function(){
    if(weather.temperature.value === undefined) return;
    
    if(weather.temperature.unit == "celsius"){
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);
        
        tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    }else{
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius"
    }
});

/*-------- Once Shown Modal  ----*/

$(document).ready(function() {
    if(localStorage.getItem('popState') != 'shown'){
        $("#once-popup").delay(2000).fadeIn();
        localStorage.setItem('popState','shown')
    }

    $('#popup-close').click(function(e) 
    {
    $('#once-popup').fadeOut(); 
    });
    $('#once-popup').click(function(e) 
    {
    $('#once-popup').fadeOut(); 
    });
});



/*--------Change background IMG ---------*/

 function changeimg1(){
      document.getElementById('container__main').style.backgroundImage = "url(img/nitish-meena-ANo5_iE9dcU-unsplash.jpg)";
    }
function changeimg2(){
      document.getElementById('container__main').style.backgroundImage = "url(img/ferdinand-stohr-W1FIkdPAB7E-unsplash.jpg)";
    }
function changeimg3(){
      document.getElementById('container__main').style.backgroundImage = "url(img/carl-cerstrand-oBPSdIOYHNg-unsplash.jpg)";
    }
function changeimg4(){
      document.getElementById('container__main').style.backgroundImage = "url(img/paul-gilmore-KT3WlrL_bsg-unsplash.jpg)";
    }
function changeimg5(){
      document.getElementById('container__main').style.backgroundImage = "url(img/tanvi-malik-OeC1wIsKNpk-unsplash.jpg)";
    }

// Off/On Switch

function showMe (box) {
var vis = (box.checked) ? "none" : "block" ;
document.getElementById('cont').style.display = vis;
}


function showMe2 (box) {
var vis = (box.checked) ? "none" : "block" ;
document.getElementById('stars').style.display = vis;
}


//Modal

var suggestions = [];

$(function () {
  $('#account__btn').click(function (e) {
    e.preventDefault()
     $('#exampleModal').arcticmodal();
  });

//Preloader 

    var $preloader = $('#page-preloader'),
        $spinner   = $preloader.find('.spinner');
    $spinner.fadeOut();
    $preloader.delay(350).fadeOut('slow');
    

//Google search

    $('input[name=odin]').on('change', function () {
        var $frm = $('.search__form');
        var action = '';

        $frm.find('.toremove').remove();

        switch ($(this).val().toLowerCase()) {
            case 'images':
                //action = 'https://www.google.com/imghp';

                action = 'https://www.google.com/search';
                $frm.append('<input type="hidden" name="newwindow" value="1" class="toremove" /><input type="hidden" name="tbm" value="isch" class="toremove" />');

                break;
            case 'videos':
                //action = 'https://www.google.com/videohp';

                action = 'https://www.google.com/search';
                $frm.append('<input type="hidden" name="tbm" value="vid" class="toremove" /><input type="hidden" name="hl" value="ru" class="toremove" /><input type="hidden" name="source" value="hp" class="toremove" />');

                break;
            case 'maps':
            
                action = 'https://www.google.com/maps';
                break;
            default:

                action = 'https://www.google.com/search';
                break;
        }

        $frm.attr('action', action);
        $('.search__input').focus();
    });

//Autocomplete 

    $('.search__input').autocomplete({
        source: function(request, resp) {
            AutocompleteResponse = resp;

            $.ajax({
                url: 'http://ff.search.yahoo.com/gossip',
                dataType: 'jsonp',
                async: false,
                xhrFields: {
                    withCredentials: false
                },
                crossDomain: true,
                data: {
                    output:   'jsonp',
                    command:  request.term,
                    format:   'json',
                    callback: 'suggsearchCallback'
                },
            });
        }
    });
});

function suggsearchCallback(resp) {

  Suggestions = [];

    $.each(resp.gossip.results, function(i, val) {
        Suggestions.push(val.key);
    });

    AutocompleteResponse(Suggestions);
}


  


  


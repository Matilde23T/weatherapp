/* credenziali api openweathermap*/
const apiKey = "ac6e160e996d47519a581967815a31e9";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

/*sviluppo variabili html*/
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherVideo = document.querySelector(".weatherVideo");
const banner = document.querySelector(".banner");


async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    /* risposta al errore di nome errato*/
    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        
    }else{

var data = await response.json();

/* recupero info collegate al api*/
document.querySelector(".city").innerHTML = data.name;
document.querySelector(".temperature").innerHTML =  Math.round(data.main.temp)+ "°C";
document.querySelector(".min-temp").innerHTML = Math.round(data.main.temp_min ) + "°C";
document.querySelector(".max-temp").innerHTML = Math.round(data.main.temp_max ) + "°C";


        if(data.weather[0].main == "Clouds"){
            /*cambia icona*/
            weatherIcon.src = "./assets/images/cloud.png";
            /*cambia video*/
            changeWeatherVideo("./assets/videos/coludyday.mp4");
            }
            else if(data.weather[0].main == "Clear"){
                weatherIcon.src = "./assets/images/sun.png"
                changeWeatherVideo("./assets/videos/sunnyday.mp4");

            }
            else if(data.weather[0].main == "Rain"){
                weatherIcon.src = "./assets/images/rain.png";
                changeWeatherVideo("./assets/videos/rainingday.mp4");
            }
            else if(data.weather[0].main == "mist"){
                weatherIcon.src = "./assets/images/rain.png";
            }
            else if(data.weather[0].main == "Drizzle"){
                weatherIcon.src = "./assets/images/rain.png";
                changeWeatherVideo("./assets/videos/rainingday.mp4");
            }
            else if(data.weather[0].main == "Snow"){
                weatherIcon.src = "./assets/images/snow.png";
                changeWeatherVideo("./assets/videos/snow.mp4");
            }
            
            document.querySelector(".weather").style.display = "block";
            document.querySelector(".error").style.display = "none";
            
    }
    
    


}
/* funzione cambia video */
function changeWeatherVideo(videoSrc) {
    const videoSource = weatherVideo.querySelector('source'); 
    videoSource.src = videoSrc; 
    weatherVideo.load(); 
    weatherVideo.play(); 
}


searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
    
})

const weatherContainer = document.querySelector(".weather-container");
const locationContainer = document.querySelector(".locationNews-container");
let weatherData;
let locationCity;
let newsLocationData;
const symbolArray = ['KO', 'GOOGL', 'AAPL', 'TSLA', 'DAL'];

// const geoLocation = function () {
//     axios.get("http://www.geoplugin.net/json.gp?ip=xx.xx.xx.xx")
//         .then(data => {
//             locationCity = data.data["geoplugin_city"];
//             console.log(locationCity);
//         })
// }
// let $locationString = geoLocation();
// let encodedString = encodeURIComponent($locationString);
// console.log(encodedString);
// console.log(geoLocation());

$(function () {
    const geoLocation = function () {
        axios.get("https://www.geoplugin.net/json.gp?ip=xx.xx.xx.xx")
            .then(data => {
                locationCity = data.data["geoplugin_city"];
                return locationCity;
            })
    }
    let $locationString = geoLocation();
    let encodedString = encodeURIComponent($locationString);
    let locationData;
    axios.get(`https://api.weatherstack.com/current?access_key=${weatherApi}&query=Atlanta&units=f`)
        .then(data => {
            weatherData = data.data.current;
            weatherContainer.innerHTML = renderWeather(weatherData);
        })
    axios.get(`https://newsapi.org/v2/everything?apiKey=${newsApiKey}&q=${encodedString}`)
        .then(data => {
            locationData = data.data.articles;
            console.log(locationData);
            locationContainer.innerHTML = renderLocationNews(locationData);
            newsLocationData = response.data.articles;
        })
})

const renderLocationNews = function (newsLocationArray) {
    let newsLocationHtmlArray = newsLocationArray.map(function (currentStory, i) {
        return `<div class="movie col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                        <div class="card">
                        <a href="${currentStory.url}"><img src=${currentStory.urlToImage} id="0" class="card-img-top" alt="${currentStory.title}"></a>
                        <div id="card-stuff" class="card-body">
                                <h6 class="card-title">${currentStory.title}</h6>
                                <p class="card-text">Author: ${currentStory.author}</p>
                                <button id="news-button" class="btn btn-danger mb-2" onclick="readStory('${currentStory.url}')">Read Story</button>
                                </div>
                        </div>
                        </div>`
    });
    return newsLocationHtmlArray.join("");
};


const renderWeather = function (data) {
    for (const property in weatherData) {
        return x = `<div class="movie col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
        <div>
            <img src=${weatherData["weather_icons"][0]} id="0" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">Temp: ${weatherData["temperature"]}</h5>
                <p class="card-text">${weatherData["weather_descriptions"][0]}</p>
                <p class="card-text">Precipitation: ${weatherData["precip"]}%</p>
                <p class="card-text">Humidity: ${weatherData["humidity"]}</p>
                <p class="card-text">Wind Speed: ${weatherData["wind_speed"]}mph</p>
            </div>
        </div>
    </div>`
    };
};

const stocksPgraph = document.querySelector("#stocks");

const arrayOfPromises = Promise.all(symbolArray.map(stockSymbol => {
    return axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stockSymbol}&interval=60min&apikey=${stockApiKey}`)
}))
    .then(responses => {
        responses.forEach((response, i) => {
            let timeSeries60Min = response.data["Time Series (60min)"];
            innerLoop:
            for (let key in timeSeries60Min) {
                addToTicker(symbolArray[i], timeSeries60Min[key]["4. close"]);
                break innerLoop;
            }
        })
    });

function addToTicker(symbol, data) {
    stocksPgraph.append(" ", symbol, ": ", data, " ");
}

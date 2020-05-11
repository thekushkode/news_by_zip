const weatherContainer = document.querySelector(".weather-container");
const locationContainer = document.querySelector(".locationNews-container");
let weatherData;
let locationCity;
let newsLocationData;
let locationData;
const symbolArray = ['KO', 'GOOGL', 'AAPL', 'TSLA', 'DAL'];
const socialLinks = document.querySelector(".socialIG");

const geoLocation = function () {
    axios.get("http://www.geoplugin.net/json.gp?ip=xx.xx.xx.xx")
        .then(data => {
            locationCity = data.data["geoplugin_city"];
            let encodedString4 = encodeURIComponent(locationCity)
            axios.get(`https://newsapi.org/v2/everything?apiKey=${newsApiKey}&q=${encodedString4}`)
                .then(data => {
                locationData = data.data.articles;
                locationContainer.innerHTML = renderLocationNews(locationData);
                newsLocationData = locationData;
                })
        })
}

$(function () {
    geoLocation();
    axios.get(`http://api.weatherstack.com/current?access_key=${weatherApi}&query=Atlanta&units=f`)
        .then(data => {
            weatherData = data.data.current;
            weatherContainer.innerHTML = renderWeather(weatherData);
        });
});

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
        return `<img src=${weatherData["weather_icons"][0]} id="0" class="card-img-top" style="padding: 30px 100px 30px 100px;">
        <p class="card-title" style="font-family: 'Source Sans Pro';">Temp: ${weatherData["temperature"]}</p>
        <p class="card-text" style="font-family: 'Source Sans Pro';">${weatherData["weather_descriptions"][0]}</p>
        <p class="card-text" style="font-family: 'Source Sans Pro';">Precipitation: ${weatherData["precip"]}%</p>
        <p class="card-text" style="font-family: 'Source Sans Pro';">Humidity: ${weatherData["humidity"]}</p>
        <p class="card-text" style="font-family: 'Source Sans Pro';">Wind Speed: ${weatherData["wind_speed"]}mph</p>`
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

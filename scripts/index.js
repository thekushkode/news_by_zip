const weatherContainer = document.querySelector(".weather-container");
let weatherData;
const symbolArray = ['KO', 'GOOGL', 'AAPL', 'TSLA', 'DAL'];

$(function () {
    axios.get("http://api.weatherstack.com/current?access_key=1b963aaec64922ece9101f2139f57884&query=Atlanta&units=f")
        .then(data => {
            weatherData = data.data.current;
            weatherContainer.innerHTML = renderWeather(weatherData);
        })
})


const renderWeather = function (data) {
    for (const property in weatherData) {
        return x = `<div class="movie col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
        <div class="card" style="width: 100%;">
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
            console.log(responses);
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

const newsContainer = document.querySelector(".news-container");
const myForm = document.querySelector("#search-form");

const renderNews = function (newsArray) {
    let newsHtmlArray = newsArray.map(function (currentStory) {
        return `<div class="movie col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                    <div class="card" style="width: 100%;">
                        <img src=${currentStory.urlToImage} id="0" class="card-img-top" alt="${currentStory.title}">
                        <div class="card-body">
                            <h5 class="card-title">${currentStory.title}</h5>
                            <p class="card-text">Author: ${currentStory.author}</p>
                            <p class="card-text">Published: ${currentStory.publishedAt}</p>
                            <button  class="btn btn-primary" onclick="saveToNewsList('${currentStory.url}')">Add Story</button>
                        </div>
                    </div>
                </div>`
    });
    return newsHtmlArray.join("");
};

function saveToNewsList(url) {
    axios.get(`http://newsapi.org/v2/everything?from=2020-04-04&apiKey=63dc9736629747c99b0094c3e0afb20e&i=${imdbID}`)
        .then(response => {
            console.log(response.data);
            let news = response.data;
            let newsListJSON = localStorage.getItem("newslist");
            let newslist = JSON.parse(newslistJSON);
            if (newslist === null) {
                newslist = [];
            };
            newslist.push(news);
            newsListJSON = JSON.stringify(newslist);
            localStorage.setItem("newslist", newsListJSON);
        })
};

window.addEventListener("DOMContentLoaded", function () {
    myForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const $searchString = $(".search-bar").val();
        let urlEncodedSearchString = encodeURIComponent($searchString)
        axios.get("http://newsapi.org/v2/everything?from=2020-04-04&apiKey=63dc9736629747c99b0094c3e0afb20e&q=" + urlEncodedSearchString)
            .then(function (response) {
                newsContainer.innerHTML = renderNews(response.data.articles);
            })
    })
});
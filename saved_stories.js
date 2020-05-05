
const renderSavedNews = function (newsArray) {
    let savedNewsHtmlArray = newsArray.map(function (currentStory, i) {
        return `<div id="newsdata-${i}" class="movie col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                    <div class="card" style="width: 100%;">
                        <a href="${currentStory.url}"><img src=${currentStory.urlToImage} id="0" class="card-img-top" alt="${currentStory.title}"></a>
                        <div class="card-body">
                            <h5 class="card-title">${currentStory.title}</h5>
                            <p class="card-text">Author: ${currentStory.author}</p>
                            <p class="card-text">Published: ${currentStory.publishedAt}</p>
                            <button  id="readstory" class="btn btn-secondary" onclick="readStory('${currentStory.url}')">Read Story</button>
                            <hr>
                            <button  class="btn btn-primary" onclick="removeFromNewsList('${i}')">Remove Story</button>
                        </div>
                    </div>
                </div>`
    });
    return savedNewsHtmlArray.join("");
};

window.addEventListener("DOMContentLoaded", function () {
    const newslistJSON = localStorage.getItem("newslist");
    let parsedNews = JSON.parse(newslistJSON);
    newsContainer.innerHTML = renderSavedNews(parsedNews);
});

function removeFromNewsList(url) {
    let newslistJSON = localStorage.getItem("newslist");
    let newslist = JSON.parse(newslistJSON);
    let index = newslist.findIndex(obj => {
        return obj.url === url
    })
    newslist.splice(index, 1);
    newslistJSON = JSON.stringify(newslist);
    localStorage.setItem("newslist", newslistJSON);
    newsContainer.innerHTML = renderSavedMovies(newslist);
};

function removeFromNewsList(index) {
    let newslistJSON = localStorage.getItem("newslist");
    let newslist = JSON.parse(newslistJSON);
    newslist.splice(index, 1);
    newslistJSON = JSON.stringify(newslist);
    localStorage.setItem("newslist", newslistJSON);
    newsContainer.innerHTML = renderSavedNews(newslist);
};
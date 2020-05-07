const newsContainer = document.querySelector(".news-container");
const myForm = document.querySelector("#search-form");
let newsData;

const renderNews = function (newsArray) {
    let newsHtmlArray = newsArray.map(function (currentStory, i) {
        return `<div id="card_format">
                        <div class="card">
                        <a href="${currentStory.url}"><img src=${currentStory.urlToImage} id="0" class="card-img-top" alt="${currentStory.title}"></a>
                        <div class="card-body">
                                <h5 class="card-title">${currentStory.title}</h5>
                                <p class="card-text">Author: ${currentStory.author}</p>
                                <button class="story_btn btn btn-danger" onclick="readStory('${currentStory.url}')">Read </button>
                                <button  class="story_btn btn btn-primary" onclick="saveToNewsList('${i}')">Save</button>
                                </div>
                        </div>
                        </div>`
    });
    return newsHtmlArray.join("");
};

// let newsApiKey = "f21c4734cbcd4f5292b1f63ee57ef784";
window.addEventListener("DOMContentLoaded", function () {
    myForm.addEventListener("submit", function (e) {
        e.preventDefault();
        let zipcode = document.querySelector("#search_bar").value;
        axios.get(`http://ZiptasticAPI.com/${zipcode}`).then(data => {
            let $searchString = data.data.city;
            let urlEncodedSearchString = encodeURIComponent($searchString)
            if (!category) {
                axios.get(`http://newsapi.org/v2/everything?apiKey=${newsApiKey}&q=` + urlEncodedSearchString)
                    .then(function (response) {
                        newsContainer.innerHTML = renderNews(response.data.articles);
                        newsData = response.data.articles;
                    })
            } else {
                axios.get(`http://newsapi.org/v2/everything?apiKey=${newsApiKey}&q=` + urlEncodedSearchString + "%20" + category)
                    .then(function (response) {
                        newsContainer.innerHTML = renderNews(response.data.articles);
                        newsData = response.data.articles;
                    })
            }
        })
    });
});

function saveToNewsList(index) {
    let news = newsData[index];
    let newsListJSON = localStorage.getItem("newslist");
    let newslist = JSON.parse(newsListJSON);
    if (newslist === null) {
        newslist = [];
    };
    newslist.push(news);
    newsListJSON = JSON.stringify(newslist);
    localStorage.setItem("newslist", newsListJSON);
};

const readStory = function (url) {
    window.location.assign(url);
};

let interests = ["Sports", "Television", "Beauty", "Lifestyle", "Crime", "Technology"];
let dropDown = document.getElementById("dropdown");
let category;
dropDown.addEventListener("change", event => {
    category = event.target.value;
});


function createDropdownValues(element) {
    let interestOptions = document.createElement("option");
    interestOptions.setAttribute("value", element);
    interestOptions.textContent = element;
    dropDown.appendChild(interestOptions);
};
interests.map(createDropdownValues);

const b1 = document.querySelector("#b1");
const b2 = document.querySelector("#b2");
const b3 = document.querySelector("#b3");
const b4 = document.querySelector("#b4");
const b5 = document.querySelector("#b5");
const b6 = document.querySelector("#b6");

b1.addEventListener("click", e => {
    category = e.target.value;
});

b2.addEventListener("click", e => {
    category = e.target.value;
});

b3.addEventListener("click", e => {
    category = e.target.value;
});

b4.addEventListener("click", e => {
    category = e.target.value;
});

b5.addEventListener("click", e => {
    category = e.target.value;
});

b6.addEventListener("click", e => {
    category = e.target.value;
});


window.addEventListener("DOMContentLoaded", function () {

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
        axios.get(`http://newsapi.org/v2/everything?apiKey=${newsApiKey}&i=${url}`)
            .then(response => {
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
    
    
    let interests = ["Sports", "Television", "Beauty", "Lifestyle", "Crime", "Technology"]
    let dropDown = document.getElementById("dropdown"); 
    let category
    dropDown.addEventListener("change", event => { 
    category = event.target.value 
    return category
    })
    
    
    function createDropdownValues(element) {
        let interestOptions = document.createElement("option");
        interestOptions.setAttribute("value", element);
        
        interestOptions.textContent = element
        
        dropDown.appendChild(interestOptions) 
        
    }
    
    
    interests.map(createDropdownValues)


    myForm.addEventListener("submit", function (e) {
        e.preventDefault();
        let zipcode = document.querySelector(".form-control").value;
        axios.get(`http://ZiptasticAPI.com/${zipcode}`).then(data => {
            let $searchString = data.data.city;
            let urlEncodedSearchString = encodeURIComponent(`${$searchString}`) 
            let completeString = `${urlEncodedSearchString}+${category}`
            axios.get(`http://newsapi.org/v2/everything?apiKey=${newsApiKey}&q=${completeString}`)
                    .then(function (response) {
                        newsContainer.innerHTML = renderNews(response.data.articles)
                    } 
                    )
        })
    })








 
});



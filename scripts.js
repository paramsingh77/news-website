const API_KEY = "b31a29199cd54dc090902638c607245c"
    
const url = "https://newsapi.org/v2/everything?q=";


window.addEventListener('load', () => fetchNews("USA"));

// async function fetchNews(query) {
//     const response = await fetch(`${url}${query}&apiKey=${API_KEY}`);
//     const data = await response.json();
//     console.log(data);
//     bindData(data.articles);
// }

async function fetchNews(query) {
    const response = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    if (!response.ok) {
        console.error(`Error: ${response.status}`);  // print the HTTP status if it's not a 2xx success status
        return;
    }
    const data = await response.json();
    console.log(data);
    if (!data.articles) {
        console.error(`Error: 'articles' property not found in response`); // print an error message if 'articles' is not found
        return;
    }
    bindData(data.articles);
}

function bindData(articles) {
    const cardsContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card');
    cardsContainer.innerHTML = "";
    articles.forEach((article) => {
        if(!article) return;
        if (!article.urlToImage) return;

        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}


function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector("#title");
    const newsSource = cardClone.querySelector("#new-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    })
    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener('click', () => {
        window.open(article.url,"_blank")
    })
}

let currSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    currSelectedNav?.classList.remove("active");
    currSelectedNav = navItem;
    currSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");


searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
});

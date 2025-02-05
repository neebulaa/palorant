import { get } from "../utils.js";

const newsContainer = document.querySelector(".news-container");

export default async function NewsList(){
    const news = await get("./assets/data/news.json");
    
    const newsEl = news.map(newsData => {
        return `<a href="news-detail.html">
                    <article class="news-card">
                        <div class="news-card-image">
                            <img src="${newsData.thumb}" alt="palorant - news ${newsData.title}">
                        </div>
                        <h3 class="news-card-title">${newsData.title}</h3>
                        <p class="news-card-description">${newsData.description}</p>
                        <p class="news-card-date">02 - January - 2025</p>
                    </article>
                </a>`;
    }).join('');

    newsContainer.innerHTML = newsEl;

    return news;
}
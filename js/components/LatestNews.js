import { get, delay } from "../utils.js";

const latestNewsImages = document.querySelector('.latest-news-content-images');
const latestNewsContentTitle = document.querySelector('.latest-news-content-description h3');
const latestNewsContentDescription = document.querySelector('.latest-news-content-description p');
const latestNewsIdentifiers = document.querySelector('.latest-news-content-navigator-identifiers');

let currentInterval = null;
const INTERVAL_TIME = 3000;

function changeLatestNewsInfo(data, index){
    latestNewsContentTitle.textContent = data[index].title
    latestNewsContentDescription.textContent = data[index].description;
}

function slide(data, index, navigator){
    latestNewsImages.style.translate = index * -100 + "%";
            
    const currentActive = document.querySelector(".latest-news-content-navigator-identifiers span.active");
    currentActive.classList.remove('active');
    navigator[index].classList.add('active');

    changeLatestNewsInfo(data, index);
}

function automate(data, index, navigator){
    currentInterval = setInterval(() => {
        slide(data, index, navigator);
        if(index >= data.length - 1){
            index = 0;
        }else {
            index += 1;
        }
    }, INTERVAL_TIME);
}

export default async function LatestNews(){
    //initialization
    const latestNews = await get("./assets/data/latest-news.json");

    latestNewsContentTitle.textContent = latestNews[0].title;
    latestNewsContentDescription.textContent = latestNews[0].description;
    const latestNewsThumbEls = latestNews.map(news => {
        return `
        <figure class="latest-news-content-image">
            <img src="${news.thumb}" alt="palorant_latest2">
        </figure>
        `;
    }).join('');
    const latestNewsIdentifierPillsEl = latestNews.map((_, index) => {
        return `<span class="${index == 0 ? 'active' : ''}"></span>`;
    }).join('');
    latestNewsIdentifiers.innerHTML = latestNewsIdentifierPillsEl;

    latestNewsImages.innerHTML = latestNewsThumbEls;

    // operation
    const latestNewsIdentifierPills = document.querySelectorAll('.latest-news-content-navigator-identifiers span');
    latestNewsIdentifierPills.forEach((navigator, index) => {   
        navigator.addEventListener('click', function(){
            slide(latestNews, index, latestNewsIdentifierPills);
            clearInterval(currentInterval);
            currentInterval = null;
            if(index == latestNews.length - 1){
                index = -1;
            }

            automate(latestNews, index + 1, latestNewsIdentifierPills);
        });
    })

    automate(latestNews, 1, latestNewsIdentifierPills);
    return latestNews;
}

// const BASE_URL = "https://neebulaa.github.io/palorant/";
const BASE_URL = "/";
// example https://neebulaa.github.io/palorant/

export function getUrl(url){
    return BASE_URL + url;
}

export async function delay(ms){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}

export async function get(url){
    return await fetch(BASE_URL + url).then(res => res.json());
}

export function getPropertyValue(el, property){
    return getComputedStyle(el).getPropertyValue(property);
}

export function setPropertyValue(el, property, value){
    return el.style.setProperty(property, value);
}

export function getFileName(){
    const currentPath = window.location.pathname;
    let fileName = currentPath.split("/").pop();
    fileName = fileName.split('.')[0];

    return fileName; 
    // in website that root at / this will returns ""
}
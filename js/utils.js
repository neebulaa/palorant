export async function delay(ms){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}

export async function get(url){
    return await fetch(url).then(res => res.json());
}

export function getPropertyValue(el, property){
    return getComputedStyle(el).getPropertyValue(property);
}

export function setPropertyValue(el, property, value){
    return el.style.setProperty(property, value);
}
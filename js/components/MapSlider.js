const mapImages = document.querySelector("#maps-slider .map-images");
const mapName = document.querySelector("#maps-slider .map-name");
const mapDesc = document.querySelector("#maps-slider .map-description");
const mapNavPrev = document.querySelector("#maps-slider .map-navigator .btn-map-navigator:first-child");
const mapNavNext = document.querySelector("#maps-slider .map-navigator .btn-map-navigator:last-child");
const addImagesSelectionGallery = document.querySelector("#maps-additional-images .selection-gallery");
const addImagesSelectionPreviewImg = document.querySelector("#maps-additional-images .selection-preview img");

const queue = [];

function getMiddleIndex(length){
    return (length - 1) / 2;
}

function formatMapImages(el){
    const formattedQueue = [];
    let mid = getMiddleIndex(queue.length > 5 ? 5 : queue.length);
    for(let i = 0; i < mid; i++){
        formattedQueue[i] = queue[mid + 1 + i];
    }
    for(let i = mid; i < queue.length; i++){
        formattedQueue[i] = queue[i - mid];
    }

    return formattedQueue.map(image => `
        <div class="map-image">
            <img src="${image.thumb}" alt="map-bg-${image.name}">
        </div>
    `);
}

function insertListenerToMapNavigator(){
    mapNavPrev.addEventListener("click", function(){
        const obj = queue.pop();
        queue.unshift(obj);
        
        mapImages.innerHTML = formatMapImages();
        mapName.innerHTML = queue[0].name;
        mapDesc.innerHTML = queue[0].description;

        addImagesSelectionGallery.innerHTML = queue[0].additionalImages.map((img, i) => {
            return `
                <div class="selection-gallery-image ${i == 0 ? 'active' : ''}">
                    <img src="${img}" alt="sunset-ss">
                </div>
            `;
        }).join('');
        addImagesSelectionPreviewImg.src = queue[0].additionalImages[0];
    });
    
    mapNavNext.addEventListener("click", function(){
        const obj = queue.shift();
        queue.push(obj);

        mapImages.innerHTML = formatMapImages();
        
        mapName.innerHTML = queue[0].name;
        mapDesc.innerHTML = queue[0].description;
        addImagesSelectionGallery.innerHTML = queue[0].additionalImages.map((img, i) => {
            return `
                <div class="selection-gallery-image ${i == 0 ? 'active' : ''}">
                    <img src="${img}" alt="sunset-ss">
                </div>
            `;
        }).join('');
        addImagesSelectionPreviewImg.src = queue[0].additionalImages[0];
    });
    
    document.addEventListener("click", function(e){
        if(e.target.classList.contains("selection-gallery-image")){
            document.querySelectorAll(".selection-gallery-image").forEach(e => e.classList.remove('active'));
            e.target.classList.add('active');
            addImagesSelectionPreviewImg.src = e.target.firstElementChild.src;
        }
    });
}

export default async function MapSlider(images){
    images.forEach(image => {
        queue.push(image);
    });
    mapImages.innerHTML = formatMapImages().join("");
    mapName.innerHTML = queue[0].name;
    mapDesc.innerHTML = queue[0].description;
    addImagesSelectionGallery.innerHTML = queue[0].additionalImages.map((img, i) => {
        return `
            <div class="selection-gallery-image ${i == 0 ? 'active' : ''}">
                <img src="${img}" alt="sunset-ss">
            </div>
        `;
    }).join('');
    addImagesSelectionPreviewImg.src = queue[0].additionalImages[0];

    insertListenerToMapNavigator();
    return images;
}
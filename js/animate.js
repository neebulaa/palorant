const animateElements = document.querySelectorAll("[data-animate]");

animateElements.forEach(el => {
    el.style.opacity = 0;
    el.animate([{
        opacity: 0,
        transform: "translate(0, 20px)"
    }, {
        opacity: 1,
        transform: "translate(0)"
    }], {
        duration: 1000,
        iteration: 1,
        delay: 5100,
        fill: "forwards"
    });
});
export default async function Footer(){
    const footerEl = await fetch("../../page-parts/Footer.html").then(res => res.text());
    const footerRoot = document.querySelector('footer#footer');
    footerRoot.innerHTML = footerEl;

    const backToTopBtn = document.querySelector('.btn.back-to-top');
    backToTopBtn.addEventListener('click', function(){
        window.scrollTo(0,0);
    })
}
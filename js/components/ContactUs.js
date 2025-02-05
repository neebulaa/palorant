export default async function ContactUs(){
    const contactUsEl = await fetch("./page-parts/ContactUs.html").then(res => res.text());
    const contactUsRoot = document.querySelector('section#contact-us');
    
    const parser = new DOMParser();
    const doc = parser.parseFromString(contactUsEl, 'text/html');
    const bodyContent = doc.body.innerHTML;
    contactUsRoot.innerHTML = bodyContent;

    const backToTopBtn = document.querySelector('.btn.back-to-top');
    backToTopBtn.addEventListener('click', function(){
        window.scrollTo(0,0);
    })
}
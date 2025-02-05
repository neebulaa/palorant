export default async function Footer(){
    const footerEl = await fetch("./page-parts/Footer.html").then(res => res.text());
    const footerRoot = document.querySelector('footer#footer');
    
    const parser = new DOMParser();
    const doc = parser.parseFromString(footerEl, 'text/html');
    const bodyContent = doc.body.innerHTML;
    footerRoot.innerHTML = bodyContent;
}
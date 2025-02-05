export default async function Navbar(){
    const navbarEl = await fetch("./page-parts/Navbar.html").then(res => res.text());
    const navbarRoot = document.querySelector('nav#navbar');

    const parser = new DOMParser();
    const doc = parser.parseFromString(navbarEl, 'text/html');
    const bodyContent = doc.body.innerHTML;
    navbarRoot.innerHTML = bodyContent;

    // highlight current active link
    const currentPath = window.location.pathname;
    let fileName = currentPath.slice(1).split('.')[0];
    if(fileName == 'news-detail'){
        fileName =  'news';
    }
    
    const currentActive = document.querySelector('.navlink-active');
    currentActive.classList.remove('navlink-active');
    const toActive = document.querySelector(`li[data-page="${fileName}"]`);
    toActive.classList.add('navlink-active');


    // nav burger
    const navbar = document.querySelector("#navbar");
    const navBurger = document.querySelector('#navbar .navbar-burger-wrapper');
    navBurger.addEventListener('click', function(){
        navbar.classList.toggle("navbar-open");
    });
}
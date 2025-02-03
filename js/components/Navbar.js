export default async function Navbar(){
    // init
    const navbarEl = await fetch("../../page-parts/Navbar.html").then(res => res.text());
    const navbarRoot = document.querySelector('nav#navbar');
    navbarRoot.innerHTML = navbarEl;


    // operation
    const navbar = document.querySelector("#navbar");
    const navBurger = document.querySelector('#navbar .navbar-burger-wrapper');

    navBurger.addEventListener('click', function(){
        navbar.classList.toggle("navbar-open");
    });
}
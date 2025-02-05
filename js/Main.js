import Home from './pages/Home.js';
import News from './pages/News.js';
import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';
import ContactUs from './components/ContactUs.js';


async function loadData(){
    const location = window.location.pathname;
    Navbar();
    if(location == '/index.html'){
        await Home();
    }else if(location == '/news.html'){
        await News();
    }
    ContactUs();
    Footer();
}

loadData();
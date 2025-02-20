import Home from './pages/Home.js';
import News from './pages/News.js';
import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';
import ContactUs from './components/ContactUs.js';
import { getFileName } from './utils.js';


async function loadData(){
    Navbar();
    const fileName = getFileName();
    if(fileName == 'index' || fileName == ""){
        await Home();
    }else if(fileName == 'news'){
        await News();
    }
    ContactUs();
    Footer();
}

loadData();
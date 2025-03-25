import Home from './pages/Home.js';
import News from './pages/News.js';
import Maps from './pages/Maps.js';
import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';
import ContactUs from './components/ContactUs.js';
import { getFileName } from './utils.js';
import { ReportBug } from './pages/ReportBug.js';

async function loadData(){
    Navbar();
    const fileName = getFileName();
    if(fileName == 'index' || fileName == ""){
        await Home();
    }else if(fileName == 'news'){
        await News();
    }else if (fileName == 'maps'){
        await Maps();
    }else if(fileName == 'report-bug'){
        ReportBug(); // validation
    }
    ContactUs();
    Footer();
}

loadData();
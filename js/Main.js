import Home from './pages/Home.js';
import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';

const data = {};

async function loadData(){
    Navbar();
    await Home();
    Footer();
}

loadData();
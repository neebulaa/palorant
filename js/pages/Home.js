import BestAgents from "../components/BestAgents.js";
import LatestNews from "../components/LatestNews.js";

export default async function Home(){
    const bestAgents = await BestAgents();
    const latestNews = await LatestNews();
    
    return {
        bestAgents,
        latestNews
    }
}
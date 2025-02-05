import NewsList from "../components/NewsList.js";

export default async function News(){
    const news = await NewsList(); 

    return {news};
}
import { get } from "../utils.js";
import MapSlider from "../components/MapSlider.js";

export default async function Maps(){
    const images = await get("./assets/data/maps.json");
    const mapSlider = await MapSlider(images);   
}
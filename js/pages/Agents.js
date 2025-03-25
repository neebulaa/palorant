import { get } from "../utils.js";
import AgentWardrobe from "../components/AgentWardrobe.js";

export default async function Maps(){
    const agents = await get("./assets/data/agents.json");
    const agentWardrobe = await AgentWardrobe(agents);   
}
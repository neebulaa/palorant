import { get, setPropertyValue } from "../utils.js";

const bestAgentsRoot = document.querySelector('#best-agents');
const bestAgentsWardobe = document.querySelector('.best-agents-wardrobe');
const bestAgentsBody = document.querySelector('.best-agents-agent-body');
const bestAgentsBodyImg = document.querySelector('.best-agents-agent-body img');
const bestAgentsRoleText = document.querySelector('.best-agents-agent-info-role p');
const bestAgentsRoleIcon = document.querySelector('.best-agents-agent-info-role .icon img');
const bestAgentsName = document.querySelector('.best-agents-agent-info-name');
const bestAgentsDescription = document.querySelector('.best-agents-agent-info-description');
const bestAgentsContentTitle = document.querySelector('.best-agents-content h2');
const bestAgentsContentDescription = document.querySelector('.best-agents-content p');

function changeBestAgentsInfo(agent, data){
    const agentData = data.find(el => el.name == agent) ?? {};

    bestAgentsName.textContent = agentData.name;
    bestAgentsDescription.textContent = agentData.description;
    bestAgentsRoleText.textContent= agentData.role.text;
    bestAgentsRoleIcon.src = agentData.role.icon;
    bestAgentsContentTitle.textContent = agentData.title;
    bestAgentsContentDescription.textContent = agentData.titleDescription;
    setPropertyValue(bestAgentsRoot, '--agent-wallpaper', `url(../../assets/images/agent-images/wallpaper/${agentData.slug}.png)`);
}

function changeBestAgentsBody(agent, data){
    bestAgentsBody.animate([
        {
            translate: '-50%'
        },
        {
            translate: '100vw'
        }
    ], {
        duration: 400,
        iterations: 1,
        fill: "forwards"
    }).finished.then(() => {
        bestAgentsBodyImg.src = data.find(el => el.name == agent)?.image;
        bestAgentsBody.animate([
            {
                translate: '100vw'
            },
            {
                translate: '-50%'
            }
        ], {
            duration: 400,
            iterations: 1,
            fill: "forwards"
        });
    });
}

export default async function BestAgents(){
    //initalization
    const bestAgents = await get("./assets/data/best-agents.json");
    
    setPropertyValue(bestAgentsRoot, '--agent-wallpaper', `url(../../assets/images/agent-images/wallpaper/${bestAgents[0].slug}.png)`);
    bestAgentsBodyImg.src = bestAgents[0].image;
    bestAgentsName.textContent = bestAgents[0].name;
    bestAgentsDescription.textContent = bestAgents[0].description;
    bestAgentsRoleText.textContent= bestAgents[0].role.text;
    bestAgentsRoleIcon.src = bestAgents[0].role.icon;
    bestAgentsContentTitle.textContent = bestAgents[0].title;
    bestAgentsContentDescription.textContent = bestAgents[0].titleDescription;
    const bestAgentsEls = bestAgents.map((agent, index) => {
        return `
            <figure class="best-agents-wardrobe-profile ${index == 0 ? 
                'best-agents-wardrobe-profile-active' : ''}" data-agent="${agent.name}">
                <img src="${agent.profile}" alt="palorant_wardobe-profile-${agent.name}">
            </figure>
            `;
        }).join('');
        
    bestAgentsWardobe.innerHTML = bestAgentsEls;

    // operation
    const bestAgentsWardobeProfiles = document.querySelectorAll(".best-agents-wardrobe-profile");
    bestAgentsWardobeProfiles.forEach(profile => {
        profile.addEventListener("click", function(){
            const currentActive = document.querySelector(".best-agents-wardrobe-profile-active");
            currentActive.classList.remove('best-agents-wardrobe-profile-active');
            profile.classList.add('best-agents-wardrobe-profile-active');
            
            changeBestAgentsBody(profile.dataset.agent, bestAgents);
            changeBestAgentsInfo(profile.dataset.agent, bestAgents);
        });
    });
    return bestAgents;
}
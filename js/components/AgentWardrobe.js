import { get, setPropertyValue } from "../utils.js";
const transitionPage = document.querySelector("#transition-page");
const agentWardrobe = document.querySelector("#agent-wardrobe");
const agentName = document.querySelector("#agent-wardrobe .agent-name");
const agentLargeName = document.querySelector("#agent-wardrobe .large-agent-name");
const agentSignature = document.querySelector("#agent-wardrobe .agent-signature-saying");
const agentDescription = document.querySelector("#agent-wardrobe .agent-description");
const agentRoleImg = document.querySelector("#agent-wardrobe .agent-role img");
const agentRoleName = document.querySelector("#agent-wardrobe .agent-role p");
const agentBodyImg = document.querySelector("#agent-wardrobe .agent-body img");
const agentWardrobeProfilesViewer = document.querySelector("#agent-wardrobe .agent-selection-profiles-slider-viewer");
const agentSpecialAbilities = document.querySelector("#agent-special-abilities .agent-special-abilities-icon .agent-abilities");
const abilityName = document.querySelector("#agent-special-abilities .agent-special-abilities-info .ability-name");
const abilityDesc = document.querySelector("#agent-special-abilities .agent-special-abilities-info .ability-description");
const abilityVideo = document.querySelector("#agent-special-abilities .agent-special-abilities-info .ability-video");

const leftButtonWardrobe = document.querySelector("#agent-wardrobe .btn-agent-wardrobe-selection-navigator:first-child");
const rightButtonWardrobe = document.querySelector("#agent-wardrobe .btn-agent-wardrobe-selection-navigator:last-child");
let totalSlide = 0;
let currentActiveSlide = 0;
let agentProfilePerSlider = 6;
let previousWindowWidth = innerWidth;
let firstTimeResize = 1;

function changeAgentInfo(agentData){
    setPropertyValue(agentWardrobe, "--agent-color", agentData.agentColor);
    agentLargeName.textContent = agentData.name;
    agentName.textContent = agentData.name;
    agentDescription.textContent = agentData.description;
    agentRoleImg.src = agentData.role.icon;
    agentRoleName.textContent = agentData.role.text;
    agentSignature.textContent = '"' + agentData.signatureSaying + '"';
    agentBodyImg.src = agentData.image;

    // special abilities
    agentSpecialAbilities.innerHTML = '';
    const abilitiesEl = agentData.specialAbilities.map((ability, index) => {
        const agentAbility = document.createElement('div');
        agentAbility.classList.add('agent-ability');
        if(index == 0) agentAbility.classList.add('active');
        agentAbility.innerHTML = `
            <span class="icon">
                <img src="${ability.image}" alt="${ability.name}">
            </span>
        `;
        agentAbility.addEventListener('click', function(){
            document.querySelector(".agent-ability.active").classList.remove('active');
            agentAbility.classList.add('active');
            abilityName.textContent = ability.name;
            abilityDesc.textContent = ability.description;
            abilityVideo.src = ability.video;
        });

        return agentAbility;
    });

    abilitiesEl.forEach(el => agentSpecialAbilities.append(el));
    abilityName.textContent = agentData.specialAbilities[0].name;
    abilityDesc.textContent = agentData.specialAbilities[0].description;
    abilityVideo.src = agentData.specialAbilities[0].video;
}

function insertClickEventToAgentProfile(agents){
    const agentProfiles = document.querySelectorAll(".agent-selection-profile");
    agentProfiles.forEach(profile => {
        profile.addEventListener("click", function(){
            agentProfiles.forEach(e => e.classList.remove('active'));
            profile.classList.add('active');
            
            transitionPage.classList.add("show");
            transitionPage.animate([
                {
                    opacity: 1,
                },
                {
                    opacity: 0
                }
            ], {
                duration: 200,
                iterations: 1,
                fill: "forwards"
            }).finished.then(() => {
                transitionPage.classList.remove("show");
            });

            const agentData = agents.find(el => el.slug == profile.dataset.agent) ?? {};
            changeAgentInfo(agentData);
        });
    });
}

function insertListener(agents){
    leftButtonWardrobe.addEventListener('click', function(){
        if(currentActiveSlide <= 0) return;
        currentActiveSlide -= 1;
        agentWardrobeProfilesViewer.style.translate = currentActiveSlide * -100 + '%';
    });

    rightButtonWardrobe.addEventListener('click', function(){
        if(currentActiveSlide >= totalSlide - 1) return;
        currentActiveSlide += 1;
        agentWardrobeProfilesViewer.style.translate = currentActiveSlide * -100 + '%';
    });

    insertClickEventToAgentProfile();

    window.addEventListener('resize', function(){
        if (window.innerWidth !== previousWindowWidth || firstTimeResize) {
            firstTimeResize = 0;
            checkScreenSize(agents);
        }
    });
}

function checkScreenSize(agents){
    const currentWidth = window.innerWidth;
    if ((previousWindowWidth < 500 && currentWidth > 500 && currentWidth <= 768) || (currentWidth > 500 && currentWidth <= 768)) {
        // <500px to 501-768px
        previousWindowWidth = currentWidth;
        agentProfilePerSlider = 4;
        resizeWardrobeSelection(agents);
    } 
    else if ((previousWindowWidth < 768 && currentWidth > 768) || currentWidth > 768) {
        //<768px to >768px
        previousWindowWidth = currentWidth;
        agentProfilePerSlider = 6;
        resizeWardrobeSelection(agents);
    } 
    else if ((previousWindowWidth > 768 && currentWidth < 768 && currentWidth >= 500)) {
        // > 768px to 500-767px
        previousWindowWidth = currentWidth;
        agentProfilePerSlider = 4;
        resizeWardrobeSelection(agents);
    } 
    else if ((previousWindowWidth > 500 && currentWidth <= 500) || currentWidth <= 500) {
        // >=500px to <500px
        previousWindowWidth = currentWidth;
        agentProfilePerSlider = 3;
        resizeWardrobeSelection(agents);
    }
}

function resizeWardrobeSelection(agents){
    const previousProfileEl = document.querySelectorAll(".agent-selection-profile");
    console.log(previousProfileEl);
    const slider = [];
    currentActiveSlide = 0;
    agentWardrobeProfilesViewer.style.translate = currentActiveSlide * -100 + '%';
    totalSlide = 0;
    for(let i = 0; i < Math.ceil(agents.length / agentProfilePerSlider);  i++){
        totalSlide += 1;
        const sliderEl = document.createElement('div');
        sliderEl.classList.add('agent-selection-profiles-slide');
        const profileEl = agents.slice(i * agentProfilePerSlider, i * agentProfilePerSlider + agentProfilePerSlider).map((agent, index) => 
            `
            <div class="agent-selection-profile ${ previousProfileEl[i * agentProfilePerSlider + index].classList.contains('active') ? 'active' : ''}" data-agent=${agent.slug}>
                <img src="${agent.profile}" alt="agent-profile-${agent.name}">
            </div>
            `
        ).join('');
        sliderEl.innerHTML = profileEl;
        slider.push(sliderEl);
    }
    
    agentWardrobeProfilesViewer.innerHTML = '';
    slider.forEach(slide => agentWardrobeProfilesViewer.append(slide));
    insertClickEventToAgentProfile(agents);
}

export default async function AgentWardrobe(agents){
    setPropertyValue(agentWardrobe, "--agent-color", agents[0].agentColor);
    agentLargeName.textContent = agents[0].name;
    agentName.textContent = agents[0].name;
    agentDescription.textContent = agents[0].description;
    agentRoleImg.src = agents[0].role.icon;
    agentRoleName.textContent = agents[0].role.text;
    agentSignature.textContent = '"' + agents[0].signatureSaying + '"';
    agentBodyImg.src = agents[0].image;

    // special abilities
    agentSpecialAbilities.innerHTML = '';
    const abilitiesEl = agents[0].specialAbilities.map((ability, index) => {
        const agentAbility = document.createElement('div');
        agentAbility.classList.add('agent-ability');
        if(index == 0) agentAbility.classList.add('active');
        agentAbility.innerHTML = `
            <span class="icon">
                <img src="${ability.image}" alt="${ability.name}">
            </span>
        `;
        agentAbility.addEventListener('click', function(){
            document.querySelector(".agent-ability.active").classList.remove('active');
            agentAbility.classList.add('active');
            abilityName.textContent = ability.name;
            abilityDesc.textContent = ability.description;
            abilityVideo.src = ability.video;
        });

        return agentAbility;
    });

    abilitiesEl.forEach(el => agentSpecialAbilities.append(el));
    abilityName.textContent = agents[0].specialAbilities[0].name;
    abilityDesc.textContent = agents[0].specialAbilities[0].description;
    abilityVideo.src = agents[0].specialAbilities[0].video;
    // console.log(agents[0].specialAbilities[0].video)

    checkScreenSize(agents);
    insertListener(agents);

    return agents;
}
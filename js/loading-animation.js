const loadingAnimation = document.querySelector("#loading-animation");
const loadingAnimationWrapper = loadingAnimation.querySelector(".loading-animation-wrapper");
const loadingAnimationTextQueue = [
    {
        text: "0%",
        perText: true,
        last: false
    }, 
    {
        text: "100%",
        perText: true,
        last: false
    }, 
    {
        text: "PALO",
        perText: false,
        last: true
    }
];

loadingAnimationTextQueue.forEach(async (textObj, textIndex) => {
    await delay(1900 * textIndex);

    if(textObj.last){
        const wordSpanObj = document.createElement("span");
        wordSpanObj.innerHTML = textObj.text;
        wordSpanObj.classList.add("letter-span");
        loadingAnimationWrapper.append(wordSpanObj);
        wordSpanObj.classList.add("letter-span-animate-movein");
        await delay(300);
        wordSpanObj.classList.add("letter-span-animate-scale");
        await delay(1000);
        wordSpanObj.classList.add("letter-span-animate-hide");
        await delay(1200);
        wordSpanObj.remove();
    }else {
        let text = [...textObj.text];
        text.forEach(async (letter, letterIndex) => {
            const letterSpanObj = document.createElement("span");
            letterSpanObj.innerHTML = letter;
            letterSpanObj.classList.add("letter-span");
            loadingAnimationWrapper.append(letterSpanObj);
            await delay(100 * letterIndex);
            letterSpanObj.classList.add("letter-span-animate-movein");
            await delay(1000);
            letterSpanObj.classList.add("letter-span-animate-moveout");
            await delay(600);
            letterSpanObj.remove();
        });
    }
}); 

delay(5300).then(() => {
    loadingAnimation.remove();
});


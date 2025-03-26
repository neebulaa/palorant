const form = document.querySelector("#report-form-form");
const fileInput = document.querySelector("#file");
const emailInput = document.querySelector("#email");
const descriptionInput = document.querySelector("#description");
const additionalInfoInput = document.querySelector("#additional-information");
const usernameInput = document.querySelector("#username");
const serverInput = document.querySelector("#server");
const fileLabel = document.querySelector('.file-label');
export function ReportBug(){
    form.addEventListener("submit", function(e){
        e.preventDefault();

        // validate if required
        if(emailInput.classList.contains("required") && emailInput.value == '') {
            setErrorMessage(emailInput, true, "Email is required");
        }else {
            setErrorMessage(emailInput, false, "");
        }

        if(descriptionInput.classList.contains("required") && descriptionInput.value == ''){ 
            setErrorMessage(descriptionInput, true, "Description is required");
        }else {
            setErrorMessage(descriptionInput, false, "");
        }

        if(fileInput.classList.contains("required") && fileInput.files[0] == null){
            setErrorMessage(fileInput, true, "File is required");
        }else {
            setErrorMessage(fileInput, false, "");
        }
        
        if(additionalInfoInput.classList.contains("required") && additionalInfoInput.value == ''){ 
            setErrorMessage(additionalInfoInput, true, "Additional Information is required");
        }else {
            setErrorMessage(additionalInfoInput, false, "");
        }
        
        if(usernameInput.classList.contains("required") && usernameInput.value == ''){ 
            setErrorMessage(usernameInput, true, "Username is required");
        }else {
            setErrorMessage(usernameInput, false, "");
        }

        if(serverInput.classList.contains("required") && serverInput.value == ''){ 
            setErrorMessage(serverInput, true, "Server is required");
        }else {
            setErrorMessage(serverInput, false, "");
        }
        
        // validate file criteria (size and type)
        if(fileInput.classList.contains("required") && fileInput.files[0] != null && !validFile(fileInput)){
            fileInput.value = '';
            fileLabel.textContent = "Upload Files";
        };

        // validate description at least 5 characters
        if(descriptionInput.classList.contains("required") && descriptionInput.value != '' && descriptionInput.value.length < 5){
            setErrorMessage(descriptionInput, true, "Description length is at least 5 characters");
            descriptionInput.value = '';
        }
        
        // validate username at least 4 characters
        if(usernameInput.classList.contains("required") && usernameInput.value != '' && usernameInput.value.length < 4){
            setErrorMessage(usernameInput, true, "Username length is at least 4 characters");
            usernameInput.value = '';
        }

        // validate file criteria (size and type)
        if(emailInput.classList.contains("required") && emailInput.value != '' && !validEmailDomain(emailInput));
        
        if(
            (emailInput.classList.contains("required") && emailInput.value == '') ||
            (descriptionInput.classList.contains('required') && descriptionInput.value == '') || 
            (additionalInfoInput.classList.contains("required") && additionalInfoInput.value == '') || 
            (usernameInput.classList.contains("required") && usernameInput.value == '') ||
            (serverInput.classList.contains("required") && serverInput.value == '') ||
            (fileInput.classList.contains("required") && fileInput.files[0] == null) || !validFile(fileInput) ||
            descriptionInput.value.length < 5 || usernameInput.value.length < 4
        ) return;

        window.location.href = "./report-success.html";
    });
    fileInput.addEventListener('change', function(){
        const file = fileInput.files[0];
        fileLabel.textContent = file.name;
    });
}


function validFile(fileInput){
    const file = fileInput.files[0];
    fileLabel.textContent = file.name;

    // validate file size
    const maxFileSize = 2 * 1024 * 1024; 
    if (file.size > maxFileSize) {
        setErrorMessage(fileInput, true, "File size exceeds 2MB");
        return false;
    }

    // validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
        setErrorMessage(fileInput, true, "Invalid file type! Only JPG, PNG, and PDF are allowed");
        return false;
    }

    return true;
}

function validEmailDomain(emailInput){
    const email = emailInput.value;
    const validDomains = ['@gmail.com', 'ppti22.id', '@hci.co'];
    let valid = 0;
    validDomains.forEach(domain => {
        if (email.endsWith(domain)) {
            valid = 1;
        }
    })
    if(!valid){
        setErrorMessage(emailInput, true, "Email domain can only be " + validDomains.join(", "));
        return false;
    }

    return true;
}

function setErrorMessage(inputEl, open, message){
    const errorMsgEl = inputEl.nextElementSibling;
    if(!open){
        errorMsgEl.style.display = "none";
        errorMsgEl.textContent = '';
        return;
    }
    if(errorMsgEl){
        errorMsgEl.style.display = "block";
        errorMsgEl.textContent = message;
    }
}
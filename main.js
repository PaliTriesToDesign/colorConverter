// Variable with the hex digit values
// Get input hex value from UI when clicking on the button and store it in a variable
// Apply that color to the color preview div
// Convert the input value to a decimal value
// store each color in a variable (r, g, b)
// Display the RGB value on the UI

const hexDigits = '0123456789ABCDEF';
const mainContainer = document.querySelector('.main');
const optionsButtons = document.querySelectorAll('.option-button');

optionsButtons.forEach(button => {
    button.addEventListener('click', () => {
        
        if(document.querySelector('.input-container')){
            document.querySelector('.input-container').remove();
        }
        
        let inputContainer = document.createElement('div');

        if(button.classList.contains('hex-to-rgb')){
            resetStates(optionsButtons[1], document.querySelector('.result'), document.querySelector('.color-wrapper'));
            hexFunctionalities(inputContainer, mainContainer);
        } else if(button.classList.contains('rgb-to-hex')){
            resetStates(optionsButtons[0], document.querySelector('.result'), document.querySelector('.color-wrapper'));
            rgbFunctionalities(inputContainer, mainContainer);
        };

        optionsButtons.forEach(button => {
            button.classList.remove('active-option');
        });

        button.classList.add('active-option');
    });
});



function getBrightness(color) {
    // Extract the red, green, and blue components
    let r = parseInt(color.substring(1, 3), 16);
    let g = parseInt(color.substring(3, 5), 16);
    let b = parseInt(color.substring(5, 7), 16);
  
    // Calculate luminance
    let luminance = 0.299 * r + 0.587 * g + 0.114 * b;
  
    return luminance;
};

function hexToRgb(hex){
    let r = parseInt(hex.substring(1, 3), 16);
    let g = parseInt(hex.substring(3, 5), 16);
    let b = parseInt(hex.substring(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
};

function convertComponents(convertButton, optionsButtons, hex, luminance){
    if(luminance > 128){
        convertButton.style.color = '#171717';
        convertButton.style.border = `2px solid #171717`;

    } else {
        convertButton.style.color = 'white';
        convertButton.style.border = `2px solid ${hex}`;
    };

    optionsButtons.forEach(button => {
        if(button.classList.contains('active-option')){
            button.style.backgroundColor = hex;
            if(luminance > 128){
                button.style.color = '#171717';
            } else {
                button.style.color = 'white';
                button.style.border = `2px solid #171717`;
            };
        };
    });

    convertButton.style.backgroundColor = hex;
};

function createHexInput(){
    let inputWrapper = document.createElement('div');
    inputWrapper.classList.add('input-wrapper');
    inputWrapper.innerHTML = `
        <p>#</p>
        <input pattern="[a-zA-Z0-9]" type="text" id="hex" placeholder="">
        <button class="convert-button">
            <i class="fa-solid fa-arrow-rotate-left"></i>
        </button>
    `;

    return inputWrapper;
}

function hexFunctionalities(inputContainer, mainContainer){
    inputContainer.classList.add('input-container');
    mainContainer.appendChild(inputContainer);
    inputContainer.appendChild(createHexInput());
    const convertButton = document.querySelector('.convert-button');
    const colorPreview = document.querySelector('.color-wrapper');
    const userInput = document.querySelector('input[type="text"]');

    convertButton.addEventListener('click', () => {
        let body = document.querySelector('body');
        let colorPreviewText  = document.querySelector('.color-content-wrapper');        
        let hexValue = '#' + userInput.value.toUpperCase();
        let result = document.createElement('p');
                
        if(hexValue.length === 7){
            inputContainer.appendChild(result);
            colorPreview.style.backgroundColor = hexValue;
            colorPreview.classList.add('active-color');
            createResults(result, hexValue);

            let luminance = getBrightness(hexValue);

            if(luminance > 128){
                colorPreviewText.style.color = '#171717';
            } else {
                colorPreviewText.style.color = 'white';
            };
            convertComponents(convertButton, optionsButtons, hexValue, getBrightness(hexValue));
        } else {
            colorPreview.classList.remove('active-color');  
            createWarningMessage(result, body);
        };
    });
};

function rgbFunctionalities(inputContainer, mainContainer){
    inputContainer.classList.add('input-container');
    mainContainer.appendChild(inputContainer);
    inputContainer.appendChild(createRgbInput());
}

function createRgbInput(){
    let inputWrapper = document.createElement('div');
    inputWrapper.classList.add('input-wrapper');
    inputWrapper.innerHTML = `
        <p>rgb</p>
        <input type="text" id="red" placeholder="0">
        <input type="text" id="green" placeholder="0">
        <input type="text" id="blue" placeholder="0">
        <button class="convert-button">
            <i class="fa-solid fa-arrow-rotate-left"></i>
        </button>
    `;

    return inputWrapper;
};

function createResults(result, hexValue){
    removeMessages();
    result.classList.add('result');
    result.style.color = '#0a0c30';
    result.innerHTML = `<b>${hexToRgb(hexValue)}</b>
        <button class="copy-button">
        <i class="fa-regular fa-clone"></i>
        </button>`;

    let copyButton = document.querySelector('.copy-button');
    copyButton.addEventListener('click', () => {
        copyToClipboard(result);
        copyButton.appendChild(copiedTooltip());
        setTimeout(() => {
            document.querySelector('.copy-tool-tip').remove();
        }, 1000);
    });
};

function createWarningMessage(result, body){
    removeMessages();
    result.classList.add('error-message');
    body.appendChild(result);
    result.innerText = `Enter a valid value`;
};

function removeMessages(){
    if(document.querySelector('.error-message')){
        document.querySelector('.error-message').remove();
    };
    if(document.querySelector('.result')){
        document.querySelector('.result').remove();
    };
    
}

function resetStates(button, results, colorPreview){
    if(button.classList.contains('active-option')){
        button.style.backgroundColor = 'var(--main-color)';
        button.style.color = 'white';
        button.style.border = 'var(--border)';
    } else {
        button.style.backgroundColor = 'white';
        button.style.color = 'var(--main-color)';
        button.style.border = 'var(--border)';
    };

    colorPreview.classList.remove('active-color');
};

function copyToClipboard(result){
    let resultText = result.innerText;
    let tempInput = document.createElement('input');
    tempInput.value = resultText;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
}

function copiedTooltip(){
    let copiedTooltip = document.createElement('div');
    copiedTooltip.classList.add('copy-tool-tip');
    copiedTooltip.innerText = 'Copied!';
    return copiedTooltip;
}

// Variable with the hex digit values
// Get input hex value from UI when clicking on the button and store it in a variable
// Apply that color to the color preview div
// Convert the input value to a decimal value
// Convert the decimal value to a binary value
// store each color in a variable (r, g, b)
// Display the RGB value on the UI

const hexDigits = '0123456789ABCDEF';
const mainContainer = document.querySelector('.main');
const optionsButtons = document.querySelectorAll('.option-button');
const userInput = document.querySelector('input[type="text"]');
const colorPreview = document.querySelector('.color-preview');
const convertButton = document.querySelector('.convert-button');

optionsButtons.forEach(button => {
    
    button.addEventListener('click', () => {
        optionsButtons.forEach(button => {
            button.classList.remove('active-option');
        });
        button.classList.add('active-option');
    });
});

convertButton.addEventListener('click', () => {
    if(document.querySelector('.result')){
        document.querySelector('.result').remove();
    }

    let body = document.querySelector('body');
    let colorPreviewText  = document.querySelector('.color-preview p');

    let result = document.createElement('p');
    result.classList.add('result');

    let hexValue = '#' + userInput.value.toUpperCase();

    if(hexValue.length === 7){
        mainContainer.appendChild(result);
        colorPreview.style.backgroundColor = hexValue;

        if(hexValue === '#FFFFFF'){
            body.style.backgroundColor = '#333333';
        } else {
            body.style.backgroundColor = hexValue;
        }
        result.style.color = '#0a0c30';
        result.innerHTML = `<b>${hexValue}</b> is equal to <b>${hexToRgb(hexValue)}</b>`;

        let luminance = getBrightness(hexValue);
        if(luminance > 128){
            colorPreviewText.style.color = '#0a0c30';
        } else {
            colorPreviewText.style.color = 'white';
        }

        console.log(hexToRgb(hexValue));

    } else {
        mainContainer.appendChild(result);
        colorPreview.style.backgroundColor = hexValue;
        body.style.backgroundColor = '#0a0c30';
        colorPreview.style.backgroundColor = 'white';
        result.style.color = 'red';
        result.innerText = `Please enter a valid value.`;  
    }
});

function getBrightness(color) {
    // Extract the red, green, and blue components
    let r = parseInt(color.substring(1, 3), 16);
    let g = parseInt(color.substring(3, 5), 16);
    let b = parseInt(color.substring(5, 7), 16);
  
    // Calculate luminance
    let luminance = 0.299 * r + 0.587 * g + 0.114 * b;
  
    return luminance;
}

function hexToRgb(hex){
    let r = parseInt(hex.substring(1, 3), 16);
    let g = parseInt(hex.substring(3, 5), 16);
    let b = parseInt(hex.substring(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
};

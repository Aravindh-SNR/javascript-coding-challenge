// Write a function that converts HEX to RGB. 
// Then Make that function auto-detect the formats so that if you enter HEX color format it returns RGB 
// and if you enter RGB color format it returns HEX.

//Function to convert hex color to rgb. Color is passed in one of the following formats: #NNN or #NNNNNN
const hexToRgb = hex => {
    if(hex.length === 4) {
        hex = `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`
    }

    const red = `${hex[1]}${hex[2]}`;
    const green = `${hex[3]}${hex[4]}`;
    const blue = `${hex[5]}${hex[6]}`;

    return `rgb(${parseInt(red, 16)}, ${parseInt(green, 16)}, ${parseInt(blue, 16)})`;
}

//Function to convert rgb color to hex. Color is passed in the following format: rgb(N,N,N)
const rgbToHex = rgb => {
    const index1 = rgb.indexOf("(");
    const index2 = rgb.indexOf(",");
    const index3 = rgb.lastIndexOf(",");
    const index4 = rgb.indexOf(")");
    
	const red = rgb.substring(index1 + 1, index2);
	const green = rgb.substring(index2 + 1, index3);
	const blue = rgb.substring(index3 + 1, index4);

	let hashRed = Number(red).toString(16).toUpperCase();
	let hashGreen = Number(green).toString(16).toUpperCase();
	let hashBlue = Number(blue).toString(16).toUpperCase();

	hashRed = hashRed.length<2 ? `0${hashRed}` : hashRed;
	hashGreen = hashGreen.length<2 ? `0${hashGreen}` : hashGreen;
	hashBlue = hashBlue.length<2 ? `0${hashBlue}` : hashBlue;

	return `#${hashRed}${hashGreen}${hashBlue}`;
}

//Detecting the format of the color entered using regular expressions and displaying color in the other format
const detectFormat = color => {
    const inputColor = document.querySelector("#color").value.replace(/ /g, "");

    const hexPattern = /(^#[0-9A-F]{3}$|^#([0-9A-F]{2}){3}$)/i;
    const rgbPattern = /^rgb\((([0-9]|[1-9][0-9]|[1][0-9][0-9]|[2][0-4][0-9]|25[0-5]),){2}([0-9]|[1-9][0-9]|[1][0-9][0-9]|[2][0-4][0-9]|25[0-5])\)$/i;
    
    if(hexPattern.test(inputColor)) {
        output = hexToRgb(inputColor);
    } else if(rgbPattern.test(inputColor)) {
        output = rgbToHex(inputColor);
    } else {
        output = "Oops! Incorrect input format, please try again.";
    }

    const outputColor = document.querySelector("#output_color");
    outputColor.innerText = output;
}

//Listening to clicks on the 'Convert color' button
document.querySelector("#submit_color").addEventListener("click", detectFormat);
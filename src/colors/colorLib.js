class Color {
    constructor(red, green, blue) {
        this.red = Number(red);
        this.green = Number(green);
        this.blue = Number(blue);
    }

    generateRandomHexes(n) {
        let hexArray = [[this.red, this.green, this.blue, generateHexCode(this.red, this.green, this.blue)]];
        for(let i = 0; i < n-1; i++) {
            const randomRed = Math.abs(Math.floor(Math.random()*256) - this.red);
            const randomGreen = Math.abs(Math.floor(Math.random()*256) - this.green);
            const randomBlue = Math.abs(Math.floor(Math.random()*256) - this.blue);
            hexArray.push([randomRed, randomGreen, randomBlue, generateHexCode(randomRed, randomGreen, randomBlue)]);
        }
        return hexArray;
    }
}

// helper functions
function generateHexCode(red, green, blue) {
    return "#" + convertDecimalToHex(red) + convertDecimalToHex(green) + convertDecimalToHex(blue);
}

function convertDecimalToHex(colorInDecimal) {
    let output = "";
    const hexStr = colorInDecimal.toString(16);
    if (hexStr.length === 1 && hexStr.match(/[a-z]/i)) {
        output += 0 + hexStr.toUpperCase();
    } else if (hexStr.length === 1 && !hexStr.match(/[a-z]/i)) {
        output += 0 + hexStr;
    } else {
        for (let i= 0; i < hexStr.length; i++) {
            if(hexStr[i].match(/[a-z]/i))
                output += hexStr[i].toUpperCase();
            else
                output += hexStr[i];
        }
    }
    return output;
}

module.exports = {
    Color: Color,
};
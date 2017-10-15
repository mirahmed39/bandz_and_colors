// colors.js
const express = require('express');
const path = require('path');
const Color = require('./colorLib').Color;
const fs = require('fs');
const app = express();

// reading colors.txt and collecting data
let colorMap = {};
let colors = fs.readFileSync('colors.txt', 'utf8');
colors = colors.split('\r\n');
colors.forEach(function(ele) {
    const nameAndHex = ele.split(',');
    colorMap[nameAndHex[1]] = nameAndHex[0];
});

console.log(colorMap.hasOwnProperty('#008080'));

// express functionalities
const publicPath = path.resolve(__dirname, 'public');
app.set('view engine', 'hbs');
app.use(express.static(publicPath));

app.get('/', function (req, res) {
    res.redirect('/colors');
});

app.get('/colors', function (req, res) {
    const error = false;
    const red = req.query.red;
    const green = req.query.green;
    const blue = req.query.blue;
    const total = req.query.total;
    if ((red>=0 && red<=255)&&(green>=0 && green<=255)&&(blue>=0 && blue<=255)&&(total>=2&&total<=100)) {
        const color = new Color(red, green, blue);
        const colorPallete = color.generateRandomHexes(total);
        console.log("this is the color pallete:");
        console.log(colorPallete);
        let colors= [];
        colorPallete.forEach(function (ele) {
            if(colorMap.hasOwnProperty(ele[3])) {
                const match = colorMap[ele[3]];
                const obj = {red: ele[0], green: ele[1], blue: ele[2], hex: ele[3], name: match};
                colors.push(obj);
            } else {
                const obj = {red: ele[0], green: ele[1], blue: ele[2], hex: ele[3], name: "No name"};
                colors.push(obj);
            }
        });
        res.render('colors', {colors: colors});
    } else {
        const errorMessage = "Hey Red, Green and Blue should be from 0 though 255, and 'How Many' should be " +
            "between 2 and 10";
        res.render('colors', {errorMessage:errorMessage});
    }
});

app.get('/about', function (req, res) {
    res.render('about', {});
});

app.listen(3000);
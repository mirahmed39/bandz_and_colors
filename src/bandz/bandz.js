// bandz.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

const publicPath = path.resolve(__dirname, 'public');

app.set('view engine', 'hbs');

app.use(express.static(publicPath));
app.use(bodyParser.urlencoded({extended: false}));

let allBands = [
    {name: "Nsync", genre: "Pop", location: "Orlando, FL", description: "Justin Timberlake Began Here"},
    {name: "Judas Priest", genre: "Metal", location: "London, UK", description: "Rob Halford is the boss"},
    {name: "David Guetta", genre: "Electronic", location: "New York City, NY", description: "David guetta can play cool songs"},
];

app.get('/', function (req, res) {
    const filterBy = req.query.filterGenre;
    let filteredGenres; // contains the band objects with the genre client requested.
    /*
    if client does not provide any filter options, that means query string should be
    empty and the default band name should be displayed. Otherwise only the filtered ones
     will be shown.
    */
    if(filterBy !== undefined) {
        filteredGenres = allBands.filter(function (ele) {
            return ele.genre.toLowerCase() === filterBy.toLowerCase();
        });
        res.render('bands', {filteredGenres: filteredGenres});
    } else {
        filteredGenres = allBands;
        res.render('bands', {filteredGenres: filteredGenres});
    }

});

app.post('/', function(req, res) {
    const bandName = req.body.name;
    let bandExists = false;
    /*
    check if the band client wants to add already exists in allBands array.
    if it does, it redirects to the '/' without making any changes to allBands.
    otherwise, it creates a band object with the info provided by the client and
    pushes it to allBands.
     */
    for (let obj of allBands) {
        if (obj.name === bandName) {
            bandExists = true;
            break;
        }
    }
    if (bandExists === false) {
        const bandLocation = req.body.location;
        const bandDescription = req.body.description;
        const bandGenre = req.body.genre;
        const newBand = {name: bandName, genre: bandGenre, location: bandLocation, description: bandDescription};
        allBands.push(newBand);
    }
    res.redirect('/');
});


app.listen(3000);
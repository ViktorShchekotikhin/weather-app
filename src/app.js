const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

console.log(__dirname);
console.log(path.join(__dirname, '../public'));

const app = express();
const port = process.env.PORT || 4000

// Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and view location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Viktor Shchekotikhin'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Viktor Shchekotikhin'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Viktor Shchekotikhin',
        text: 'Help page'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send([{
            error: "You must provide a search term"
        }]);
    } else {
        geocode(req.query.address, (err, { latitide, longitude, place_name } = {}) => {
            if (err) {
                return res.send([{
                    error: err
                }])
            }
            forecast(latitide, longitude, (err, forecastData) => {
                if (err) {
                    return res.send([{
                        error: err
                    }]);
                } else {
                    return res.send([{
                        location: place_name,
                        data: forecastData

                    }])
                }
            })
        })
    }

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'Viktor Shchekotikhin'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'Viktor Shchekotikhin'
    })
})

app.listen(port, () => {
    console.log(`server start on ${port} port`)
})
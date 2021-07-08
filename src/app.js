const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000


// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Rami'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        image: './img/robot.png',
        name: 'Rami'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {        
        title: 'Help Page',
        message: 'Feel free to contact us for help',
        name: 'Rami'
    })
})

app.get('/weather', (req, response) => {

    if(!req.query.address){
        return response.send({
            error: 'You must provide an address term'
        })
    }

    const address = req.query.address
    geoCode.geoCode(address, (error, { lat, lon, location } = {}) => {
        if(error){
            return response.send({ error })
        }

        forecast.forecast(lat, lon , (error, forecastData) => {
            if(error){
                return response.send({ error })
            }           

            response.send({
                forecast: forecastData,      
                location,          
                address
             })
        });
    })

   
   
    
})

app.get('/products', (req, res) => {
    
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
       products: [] 
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        name: 'Rami',
        title: '404 page',
        message: 'Help article not found'
    })
})

app.get('/*', (req, res) => {
    res.render('404', {
        name: 'Rami',
        title: '404 page',
        message: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
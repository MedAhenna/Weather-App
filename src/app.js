import express from "express"
import { fileURLToPath } from 'url'
import path from 'path'
import hbs from 'hbs'
import geocode from './utils/geocode.js'
import forecast from './utils/forecast.js'


const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

// Define Paths for Express Config
const publicDir = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

const app = express()
const port = process.env.PORT || 3000

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: "Mohamed Ahenna"
    })
})

app.get('/products', (req, res) => {

    if (!req.query.rating) {
        res.send({
            error: "You most provide a search term"
        })
    } else {
        res.send({
            search: req.query.search,
            rating: req.query.rating
        })
    }

})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: "Mohamed Ahenna"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Mohamed Ahenna',
        helpText: 'If you have any questions ask google'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        res.send({
            error: 'Address most be proveded'
        })
    } else {
        geocode(req.query.address, (error, data) => {
            if (error) {
                res.send({ error })
            } else {
                forecast(data, (error, forecatsData) => {
                    if (error) {
                        res.send({ error })
                    }

                    res.send({
                        forecast: forecatsData,
                        location: data.location
                    })
                })
            }
        })

    }
    // res.send({
    //     forecast: "It's snowing",
    //     location: "agadir"
    // })
})

app.get('/footer', (req, res) => {
    res.render('footer')
})

app.get('/header', (req, res) => {
    res.render('header')
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        error: 'Help article not found'
    })
})

app.get("*", (req, res) => {
    res.render('404', {
        error: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('server start')
})
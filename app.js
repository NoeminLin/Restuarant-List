// required packages used in the project
const express = require('express')
const app = express()
const port = 3000

// require express-handlebars here
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

// setting template engine
app.engine('handlebars', exphbs.engine({
    defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// routes setting
app.get('/', (req, res) => {
    res.render('index', {
        restaurants: restaurantList.results
    })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
    const restaurant_id = Number(req.params.restaurant_id)
    const restaurant = restaurantList.results.filter(item => item.id === restaurant_id)[0]
    res.render('show', {
        restaurant: restaurant
    })
})

app.get('/search', (req, res) => {
    const keyword = req.query.keyword.trim()
    const restaurants = restaurantList.results.filter(item => {
        return (item.name.toLowerCase().includes(keyword.toLowerCase()) ||
            item.name_en.includes(keyword.toLowerCase()) ||
            item.category.includes(keyword.toLowerCase())
            )
    })
    res.render('search', {
        keyword: keyword,
        restaurants: restaurants
    })
})

app.listen(port, () => {
    console.log(`Express is running on http://localhost:${port}`)
})
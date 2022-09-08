const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

// use .env for dev use
if (process.env.NODE_ENV != "staging" && process.env.NODE_ENV != "production") {
    require('dotenv').config();
}

express()
    .use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', function(req, res) {
      res.render('pages/index', { rnwAPIKey : process.env.RAISENOW_API_KEY });
    })
    .get('/api', function(req, res) {
    })
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))

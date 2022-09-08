const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const fetch = require("node-fetch");

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
        const url = process.env.RNW_API_ENDPOINT + '/oauth2/token';
        const data = {
            'grant_type': 'client_credentials',
            'client_id': process.env.RNW_CLIENT_ID,
            'client_secret': process.env.RNW_CLIENT_SECRET
        };

        const customHeaders = {
            "Content-Type": "application/json",
        }

        fetch(url, {
            method: "POST",
            headers: customHeaders,
            body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((jsonBody) => {
            console.log(jsonBody);
            res.send(jsonBody);
        })
    })
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))

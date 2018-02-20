'use strict';

const express = require('express');
const app = express();

const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const cors = require('cors');
const bodyParser = require('body-parser');

// 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const authCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        // YOUR-AUTH0-DOMAIN name e.g prosper.auth0.com
        jwksUri: "https://recoil.auth0.com/.well-known/jwks.json"
    }),
    // This is the identifier we set when we created the API
    audience: '{YOUR-API-AUDIENCE-ATTRIBUTE}',
    issuer: '{YOUR-AUTH0-DOMAIN}',
    algorithms: ['RS256']
});

const path = require('path');

module.exports = {
    app: function () {
        const app = express();
        const indexPath = path.join(__dirname, '../public/index.html');
        const publicPath = express.static(path.join(__dirname, '../public'));

        app.use('/', publicPath);
        app.use(express.static(__dirname + '../public'))

        // handle every other route with index.html
        app.get('*', function (request, response) {
            response.sendFile(path.join(__dirname, '../public/index.html'))
        })

        return app;
    }
}
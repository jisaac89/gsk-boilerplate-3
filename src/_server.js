'use strict';

const express = require('express');
const passport = require('passport');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const cors = require('cors');
const bodyParser = require('body-parser');
const Auth0Strategy = require('passport-auth0');
const path = require('path');

const env = {
    AUTH0_CLIENT_ID: 'UtSVwHMRSxkrQmb0DuH7wZ6sU8HrnBTK',
    AUTH0_DOMAIN: 'recoil.auth0.com',
    AUTH0_CALLBACK_URL: '/callback'
};

// Configure Passport to use Auth0
const strategy = new Auth0Strategy(
    {
        domain: 'recoil.auth0.com',
        clientID: 'UtSVwHMRSxkrQmb0DuH7wZ6sU8HrnBTK',
        clientSecret: '5G6yqhWubD8PvidJrDIQOAlOPKp94qSOTZD4moBzFifmWgIEI_c5jQH0QwWdU__P',
        callbackURL: '/callback',
        scope: 'openid profile email phone'
    },
    (accessToken, refreshToken, extraParams, profile, done) => {

        var info = {
            "profile": profile,
            "accessToken": accessToken,
            "refreshToken": refreshToken,
            "extraParams": extraParams
        };

        return done(null, info);
    }
);

module.exports = {
    app: function () {
        const app = express();
        const indexPath = path.join(__dirname, '../public/index.html');
        const publicPath = express.static(path.join(__dirname, '../public'));

        passport.use(strategy);

        passport.serializeUser(function (user, done) {
            done(null, user);
        });

        passport.deserializeUser(function (user, done) {
            done(null, user);
        });

        app.use(express.static(__dirname + '../public'));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        // app.use(cors());
        app.use('/', publicPath);
        app.use(passport.initialize());
        app.use(passport.session());

        // BEGIN PASSPORT

        app.get(
            '/login',
            passport.authenticate('auth0', {
                clientID: env.AUTH0_CLIENT_ID,
                domain: env.AUTH0_DOMAIN,
                redirectUri: env.AUTH0_CALLBACK_URL,
                audience: 'https://recoil.auth0.com/api/v2/',
                scope: 'openid profile email phone'
            }),
            function (req, res) {
                res.redirect('/');
            }
        );

        app.get('/logout', (req, res) => {
            req.logout();
            res.redirect('/');
        });

        async function getUserInfo(req) {
            return await req.user;
        }

        app.get(
            '/callback',
            passport.authenticate('auth0', {
                failureRedirect: '/errors'
            }), (req, res) => {
                getUserInfo(req) //first have to wait to get the info to use it.
                    .then(function (userinfo) {
                        console.log(userinfo.profile._json);
                        res.cookie('access_token', userinfo.extraParams.access_token);
                        res.cookie('id_token', userinfo.extraParams.id_token);
                        res.cookie('user_profile', userinfo.profile);
                        res.sendFile(path.join(__dirname, '../public/index.html'))
                    })

            }
        );

        app.get('*', function (request, response) {
            response.sendFile(path.join(__dirname, '../public/index.html'))
        })

        return app;
    }
}
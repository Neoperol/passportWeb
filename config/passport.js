// config/passport.js

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

//Rutas del api
var apiRoutes = require('../utils/apiRoutes');

// load up the user model
var User            = require('../app/models/user');

//Modulos para hacer peticiones http
var request = require("request")


// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        console.log("entro en el serializae user");
        done(null, user);
    });

    // used to deserialize the user
    passport.deserializeUser(function(user, done) {
        console.log("--------------en el deserializeUser");
        console.log(user);
        done(null, user);
        /*User.findById(id, function(err, user) {
            done(err, user);
        });*/
    });

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form
        
            request.post({
                url: apiRoutes.login(),
                form:{
                    email: email,
                    password: password,
                    uidevice: "QWEQWEQWEQWEQWEQWEQWEQWE",
                    device: "$.browser.version"
                },
                json: true
            }, function(error, response, body) {
                console.dir(arguments);
            if (!error && response.statusCode === 201) {
                    console.dir(body);
                    return done(null, body);
                }else if(!error && response.statusCode == 401){
                    return done(null, false, req.flash('loginMessage', 'Oops! User or password Wrong.'));

                }else{
                    return done(null, false, req.flash('loginMessage', 'Sorry, Servers Errors'));
                }

            });
    }));

};




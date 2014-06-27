/*
 gHaloChat, A chat application using node, angularjs & mongodb
 Author: Ashwath
 Date:
 Copyright:

 */


var express = require('express'),
    stylus = require('stylus'),
    passport = require('passport');

module.exports = function(app, cfg){


    function compile(str, path){
        return stylus(str).set('filename', path);
    }

    app.configure(function(){

        app.set('views', cfg.rootPath + '/server/views');
        app.set('view engine', 'jade');
        app.use(express.logger('dev'));
        app.use(express.cookieParser());
        app.use(express.bodyParser());

        app.use(express.session({secret: 'gHalo Chat gems'}));
        app.use(passport.initialize());
        app.use(passport.session());

        app.use(stylus.middleware(
            {
                src: cfg.rootPath + '/public',
                compile: compile
            }

        ));
        app.use(express.static(cfg.rootPath + '/public'));
    });

}
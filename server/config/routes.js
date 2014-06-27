/*
 gHaloChat, A chat application using node, angularjs & mongodb
 Author: Ashwath
 Date:
 Copyright:

 */

var auth = require('./auth'),
    users = require('../controllers/users');

module.exports = function(app){

    app.get('/partials/:partialPath', function(req, res){
        //res.render('partials/' + req.params.partialPath)
        res.render('../../public/app/partials/' + req.params.partialPath)
    });


    app.post('/signin', auth.authenticate);

    app.post('/users/', users.createUser);

    //catch all route  * needed
    app.get('/', function(req, res){
        res.render('index', {
            bootstrappedUser: req.user
        });
    });
}
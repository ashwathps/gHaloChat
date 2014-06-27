var express = require('express'),
    nm = require('express-namespace'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

var http = require('http');


var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development'

var app = express();

var config = {
    rootPath: __dirname
}
require('./server/config/express')(app, config);

require('./server/config/mongoose.js')(env);

require('./server/config/routes.js')(app);

require('./server/api/routes/api_routes.js')(app);

var User = mongoose.model('User');
passport.use(new LocalStrategy(
    function(username, password, done) {
        //console.log('LocalStrategy ');  email: password
        User.findOne({username: username}).exec(function (err, user) {
            if (user && user.authenticateBymodel(password)) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }
));

passport.serializeUser(function(user, done){
    if(user){
        done(null, user._id);
    }
});

passport.deserializeUser(function(id, done){
    //console.log('deserializeUser ' );
    User.findOne({_id: id }).exec(function(err, user){
        if(user){
            return done(null, user);
        }else{
            return done(null, false);
        }
    });
});


var port = process.env.PORT || 4040;
app.listen(port);
console.log("Server is ready to server from port 4040");


/*
function compile(str, path){
    return stylus(str).set('filename', path);
}

if(env === 'development') {
    mongoose.connect('mongodb://localhost/sampledb');
}else {
    mongoose.connect("mongodb://test2:ghalo@ds039768.mongolab.com:39768/coolthings_db");
}

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.on('open', function callback(){
    console.log('gHaloChat DB ready to be queried');
});

var userSchema = mongoose.Schema({ username: String, email: String});
var User = mongoose.model('User', userSchema);

 User.find({}).exec(function(err, coll){
     if(coll.length === 0){
        User.create({username: 'Bot', email:'Bot@gHaloChat.com'});
        User.create({username: 'a', email:'a@a.com'});
     }
 });


app.configure(function(){

    app.set('views', __dirname + '/server/views');
    app.set('view engine', 'jade');
    app.use(express.logger('dev'));
    app.use(express.cookieParser());
    app.use(express.bodyParser());

    app.use(express.session({secret: 'gHalo Chat gems'}));
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(stylus.middleware(
        {
            src: __dirname + '/public',
            compile: compile
        }

    ));
    app.use(express.static(__dirname + '/public'));
});
*/



/*
app.get('/partials/:partialPath', function(req, res){
    //res.render('partials/' + req.params.partialPath)
    res.render('../../public/app/' + req.params.partialPath)
});


app.post('/signin', auth.authenticate);
app.all('/api/list_users', function(req, res){

});

//catch all route  * needed

app.get('/', function(req, res){
    res.render('index', {
        bootstrappedUser: req.user
    });
});

, {
 dbMessage: mongoMsg
 });*/

/*
var messageschema = mongoose.Schema({message: String});
var msg = mongoose.model('Message', messageschema);
var mongoMsg;
msg.findOne().exec(function(err, mdoc){
    mongoMsg = mdoc.message;
});*/

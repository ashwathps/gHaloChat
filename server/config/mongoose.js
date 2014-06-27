/*
 gHaloChat, A chat application using node, angularjs & mongodb
 Author: Ashwath
 Date:
 Copyright:

 */

var mongoose = require('mongoose'),
    encrypt = require('../utils/encryptmod');

var mSchema = mongoose.Schema;

module.exports = function(env) {

    var db_config = require('./environment')[env];

    mongoose.connect(db_config.dbConnString);

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.on('open', function callback() {
        console.log('gHaloChat DB ready to be queried');
    });

    var mbSchema = new mSchema({sid: String, msgs: [mSchema.Types.ObjectId]});
    var userSchema = mSchema(
                    {   username: {
                            type: String,
                            required: '{PATH} is required',
                            unique: true
                        },
                        email: String,
                        salt: String,
                        hashedPwd: String,
                        mailbox: [mbSchema]
                    });

    userSchema.methods = {
        authenticateBymodel: function(passToMatch){
            var result =  encrypt.hashPwd(this.salt, passToMatch) === this.hashedPwd;
            console.log('authenticateBymodel ' + result);
            return result
        }
    };
    var mailQueueSchema = mSchema(
        {
            msg: String,
            sentTmstmp: Date,
            rcvTmstmp: {type: Date, default: Date.now},
            dlvTmstmp: {type: Date, default: Date.now},
            sender: mSchema.Types.ObjectId
        }
    );

    var User = mongoose.model('User', userSchema);
    var msgQ = mongoose.model('Message', mailQueueSchema);

    User.find({}).exec(function (err, coll) {
        if (coll.length === 0) {
            //sample data
            var salt, hash;
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, '1234'); //default pwd
            User.create({username: 'ashwath', email: 'ashwath@gh.com', salt: salt, hashedPwd: hash});

            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, '1234'); //default pwd
            User.create({username: 'a', email: 'a@gh.com', salt: salt, hashedPwd: hash});

            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, '1234'); //default pwd
            User.create({username: 'ram', email: 'ram@gh.com', salt: salt, hashedPwd: hash});

            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, '1234'); //default pwd
            User.create({username: 'john', email: 'john@gh.com', salt: salt, hashedPwd: hash});

            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, '1234'); //default pwd
            User.create({username: 'michael', email: 'mick@gh.com', salt: salt, hashedPwd: hash});
        }
    });
    //var m = new msgQ;
    //m.save();

    msgQ.find({}).exec(function (err, coll) {
        if (coll.length === 0) {
            msgQ.create({
                msg: 'Welcome to gHaloChat, you can now chat will all other gHaloChat users, Happy Chatting!!!',
                sentTmstmp: Date.now()
            });
        }
    });
};

/*
 gHaloChat, A chat application using node, angularjs & mongodb
 Author: Ashwath
 Date:
 Copyright:

 */

module.exports = {

    development: {
        dbConnString: "mongodb://localhost/sampledb",
        port: 4040
    },

    production:{
        dbConnString: "mongodb://deploy:ghalo@ds039768.mongolab.com:39768/coolthings_db",
        port: 8080
    }
}
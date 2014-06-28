gHaloChat
=============

Angularjs and nodejs based application to demonstrate a simple chat feature.
---------------
gHaloChat is built using nodejs, angularjs and mongoDB for persistence.
It uses REST APIs to interact with the server and embraces all the SPA rules (almost)

###Its hosted on Heroku
    http://warm-ravine-7119.herokuapp.com
    
###UI/CSS
    Using twitter's Bootstrap
    

###security and access
Uses passport with Local strategy for authenticating users.

Sha1 with 128 Byte entcryption using the node's crypto module. hashed & salted.
    > npm install crypto
    > npm install passport

###persistence
Uses mongodb hosted on MongoLab.com

###copyright and license
    MIT, feel free to make any changes.
    



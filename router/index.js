var express = require('express');

module.exports = function () {

    var router = express.Router();

    // router.post('/ssgrid', gridController); controller would have its own logic which is csrf protected.
    router.post('/ssgrid', (req,res) => res.send("Controller Validated")); 
    router.post('/login', (req, res) => res.send('Log in api Succesfully Validated!!'));
    router.post('/signup', (req, res) => res.send('Signup api Succesfully Validated!!'));  
    router.get('/lineups/find', () => {console.log("Controller Validated")});

    router.post('/grid/channelList', () => {console.log("Controller Validated")})

    router.get('/user/me', () => {console.log("Controller Validated")});
    router.post('/user/signup', () => {console.log("Controller Validated")});
    router.post('/user/addtofav', () => {console.log("Controller Validated")});
    router.post('/user/updateAccount', () => {console.log("Controller Validated")});
    router.post('/user/myShowsAiring', () => {console.log("Controller Validated")});
    router.post('/user/favorites', () => {console.log("Controller Validated")});
    router.post('/user/ChannelAddtofav', () => {console.log("Controller Validated")});
    router.post('/user/updatePreferences', () => {console.log("Controller Validated")});


    return router;
};

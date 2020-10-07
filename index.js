
const express = require('express'); 
const csrf = require('csurf'); 
const cookieParser = require('cookie-parser'); 
const bodyParser = require('body-parser'); 
const router = require('./router');

var csrfProtection = csrf({ 
    cookie: true
 }); 
var parseForm = bodyParser.urlencoded({ extended: false }); 
   
var app = express(); 
app.set('view engine','ejs') 
   
app.use(cookieParser()); 

/**
 * 
 * Define template view Routes here
 * 
 */

// API to get CSRF TOKEN in express server form for different views (index, accounts, login, signup and user views with and withour csrf token)
app.get('/', csrfProtection, function (req, res) { 
  // pass the csrfToken to the view -----> when implementing on express server.
  res.render('index', { csrfToken: req.csrfToken() }); 
});

// if tried this route without csrfProtection middleware will return 403(/process route is protected with csrf protection)
app.get('/accounts', function (req, res) { 
    res.render('accounts'); // we are not passing csrfToken here in view/api to check if form validates without token 
});

app.get('/user', csrfProtection, function (req, res) { 
    res.render('user', { csrfToken: req.csrfToken() }); 
});

app.get('/login', csrfProtection, function (req, res) { 
    res.render('login', { csrfToken: req.csrfToken() }); 
});

app.get('/signup', csrfProtection, function (req, res) { 
    res.render('signup', { csrfToken: req.csrfToken() }); 
});



// API to get CSRF TOKEN in on a client side using React/Angular
app.get('/api', csrfProtection, function (req, res) { 
    // Pass the csrfToken in to the request header with ajax call using jquery/fetch/axios---> make get request to /api for csrf token
    res.json({'X-CSRF_TOKEN': req.csrfToken()})
}); 

/**
 * 
 * Define api Routes here
 * 
 */

//  we can pass csrf middleware to the individual post api for protection
app.post('/process', parseForm,  
      csrfProtection, function (req, res) { 
  res.send('Form Successfully Validated!!'); 
}); 

app.post('/user', parseForm,  
      csrfProtection, function (req, res) { 
  res.send('User api Successfully Validated!!'); 
}); 

// or  we can pass csrf middleware inside router to protect all request
// login and signup routes are inside the router.
app.use('/api',parseForm,csrfProtection, router());


// error handler
app.use(function (err, req, res, next) {
    if (err.code !== 'EBADCSRFTOKEN') return next(err)
   
    // handle CSRF token errors here
    res.status(403)
    res.send('Invalid CSRF TOKEN / Form tampered')
})

app.listen(3000, (err) => { 
   if (err) console.log(err); 
   console.log('Server Running'); 
}); 
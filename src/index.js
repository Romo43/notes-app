const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');

// Initiliazations
const app = express();
require('./database');

// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('views engine', '.hbs');

// Middlewares
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));
app.use(flash());

// Global Variables
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error_email = req.flash('error_email');
    next();
});
// Routes
app.use(require('./routes/index.js'));
app.use(require('./routes/users.js'));
app.use(require('./routes/notes.js'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Server is listenning
app.listen(app.get('port'), () =>{
    console.log('Server on port', app.get('port'));
});
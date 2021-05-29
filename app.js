var express = require('express');
var exhbs = require('express-handlebars');
var bodyParser = require('body-parser');


var userdb = require('./lib/userdb.js');

var app = express();

app.engine('.hbs',exhbs({
    defaultLayout:'main',
    extname:'.hbs',
    layoutsDir:__dirname+'/views/layout/',
    partialsDir:__dirname+'/views/layout/'
}));

//set the view engine is .hbs
app.set('view engine', '.hbs');
// default ./view
//app.set('views',viewPath)
app.set('view cache', true);
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.post('/test', (req, res)=>{
    userdb.readData(req.body['type'], req.body['table'], req.body['years'], (data) =>{
        res.status(200).send({
            data: data
        })
    });
})
app.get('/',(req, res)=>{
    res.render('home',{
        homeSel: true,
        navSel: false,
        anaSel: false,
        testSel: false,
        conSel: false
    });
})
app.get('/navigation',(req, res)=>{
    res.render('navigation',{
        homeSel: false,
        navSel: true,
        anaSel: false,
        testSel: false,
        conSel: false
    });
})
app.get('/analysis',(req, res)=>{
    res.render('analysis',{
        homeSel: false,
        navSel: false,
        anaSel: true,
        testSel: false,
        conSel: false
    });
})
app.get('/test',(req, res)=>{
    res.render('test',{
        homeSel: false,
        navSel: false,
        anaSel: false,
        testSel: true,
        conSel: false
    });
})
app.get('/contact',(req, res)=>{
    res.render('contact',{
        homeSel: false,
        navSel: false,
        anaSel: false,
        testSel: false,
        conSel: true
    });
})


app.use((req, res, next)=>{
    res.status(404);
    res.render('404');
})
app.use((err,req, res, next)=>{
    console.error(err.stack);
    res.status(500);
    res.render('500');
})
app.listen('7999',()=>{
    console.log("Web build.");
})
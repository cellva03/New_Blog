const express = require('express');
const blogRoutes = require('./routes/blogRoutes')
const mongoose = require('mongoose');
// const Blog = require('./models/blog.js');
const serverless = require('serverless-http');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true}));

const dbURI = 'mongodb://Selva:Selva03@blog-shard-00-00.5ihud.mongodb.net:27017,blog-shard-00-01.5ihud.mongodb.net:27017,blog-shard-00-02.5ihud.mongodb.net:27017/selva-blog?ssl=true&replicaSet=atlas-pi94wt-shard-0&authSource=admin&retryWrites=true&w=majority';
mongoose.connect(dbURI)
    .then(()=>{
        console.log('DataBase Connected');
        app.listen(PORT);
    })
    .catch((e)=>{
        console.log(e);
    })

app.set('view engine', 'ejs');

// app.use(morgan('dev'));

app.use(express.static( __dirname + "/public"));

app.get('/', (req, res) => {

    res.redirect('/blogs');
});

app.get('/about', (req, res) => {

    res.render('about',{ head: 'About' })
});

// app.get('/about-us', (req, res) => {
    // res.redirect('/about');
// })

app.get('/create', (req, res) => {
    res.render('create',{ head: 'Create' })
})

app.use(blogRoutes);

app.use((req, res) => {
    // res.status(400).sendFile(path.resolve('../Http/404.html'));
    res.status(400).render('404');
})

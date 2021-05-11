const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const connection = require('./databases/connection')

// Models ↓
const Article = require('./articles/Article')
const Category = require('./categories/Category')

// Controllers ↓
const categoriesController = require('./categories/CategoriesController')
const articlesController = require('./articles/ArticlesController')

// Body Parser ↓
app.use(express.urlencoded({extended: false}))
app.use(express.json());

// View Engine ↓
app.set('view engine', 'ejs')

// Static ↓
app.use(express.static('public'))

// Databases
connection.authenticate()
.then(()=>{console.log('Database start')})
.catch(err=>{console.log('Database error')})

// Routes
app.use("/", categoriesController)
app.use("/", articlesController)

//Routes ↓

app.get('/home', (req,res) => {
    res.render('partials/homenova')
})

app.get('/', (req, res) => {
    Article.findAll({
        order:[['id','DESC']]
    }).then(articles => {
        Category.findAll().then(categories => {
            res.render('index', {articles:articles, categories:categories});

        })
    })
})

app.get('/:slug', (req,res) => {
    var slug = req.params.slug

    Article.findOne({
        where: {
            slug:slug
        }
    }).then(article => {
        if(article != undefined){
            Category.findAll().then(categories => {
                res.render('article', {article:article, categories:categories});
    
            })
        }else{
            res.redirect("/")
        }
    }).catch(err => {
        res.redirect("/", console.log(err))
    })
})




app.listen(8080, () => {console.log('Server started')})
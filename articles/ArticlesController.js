const express = require('express')
const router = express.Router()
const Category = require('../categories/Category')
const Article = require('../articles/Article')
const slugify = require('slugify')
const teste = require('./teste')


// List articles
router.get('/admin/articles', (req, res) => {
    Article.findAll({
        include: {model: Category}
    }).then(articles => {
        res.render('admin/articles/index', {articles:articles})
    })
})

// Create articles
router.get('/admin/articles/new', (req, res) => {
    Category.findAll().then((categories) => {
        res.render('admin/articles/new', {categories:categories})
    })
    
})

//Save articles
router.post('/articles/save', (req, res) => {
    var title = req.body.title
    var body = req.body.body
    var category = req.body.category

    Article.create({
        title: title,
        slug: slugify(title),
        body: body,
        categoryId: category
        }).then(() => {
            res.redirect('/admin/articles')
        })
})

// Delete articles

router.post('/articles/delete', (req, res) => {
    var id = req.body.id
    if(id != undefined){
        if(!isNaN(id)){
            Article.destroy({
                where:{
                    id:id
                }
            }).then(() => {
                res.redirect('/admin/articles')
            })
        }else{ 
            res.redirect('/admin/articles')
        }
    }else{
        res.redirect('/admin/articles')
    }
})

// teste ↓
{

    // router.get('/admin/articles/newa', (req, res) => {
    //     teste.findAll().then((testes) => {
    //         res.render('admin/articles/newa', {testes:testes})
    //     })
        
    // })
    
    // router.post('/admin/articles/newa/save', (req, res) => {
    //     teste.create({
    //         nome: req.body.nome,
    //         idade: req.body.idade
    //     }).then(() => {
    //         res.redirect('/admin/articles/newa')
    //     })
        
    // })
    
    // router.post('/admin/articles/newa/delete', (req, res) => {
    //     var id = req.body.id
    //     if(id != undefined){
    //         if(!isNaN(id)){
    //             teste.destroy({
    //                 where:{
    //                     id:id
    //                 }
    //             }).then(() => {
    //                 res.redirect('/admin/articles/newa')
    //             })
    //         }else {
    //             res.redirect('/admin/articles/newa')
    //         }
    //     }else {
    //         res.redirect('/admin/articles/newa')
    //     }
    // })
    
    // router.get('/admin/articles/newa/edit/:id', (req, res) => {
    //     var id = req.params.id
    
    //     if(isNaN(id)){
    //         res.redirect('/admin/articles/newa')
    //     }
    
    //     teste.findByPk(id).then((testes) => {
    //         if(testes != undefined){
    //             res.render('../views/admin/articles/newaedit', {testes:testes})
    //         }else{
                
    //             res.redirect('/admin/articles/newa')
    //         }
    //     }).catch(erro => {
    //         res.send(erro)
    //     })
    
    // })
    
    // router.post('/admin/articles/newa/edit/save', (req,res) => {
    //     var id = req.body.id
    //     var nome = req.body.nome
    
    //     teste.update({ nome:nome }, {
    //         where:{
    //             id:id
    //         }
    //     }).then(() => {
    //         res.redirect('/admin/articles/newa')
    //     })
    
    // })
    
    //teste ↑
}

module.exports = router;
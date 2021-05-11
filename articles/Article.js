const Sequelize = require('sequelize')
const connection = require('../databases/connection')
const Category = require('../categories/Category') // Importando model Category para fazer relacionamento

const Article = connection.define('articles',{
    title: {
        type: Sequelize.STRING,
        allowNull: false
    }, slug: {
        type: Sequelize.STRING,
        allowNull: false
    }, body: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

// Metodo 1-P-1 é definido por .belongsTo()
// Metodo 1-P-M é definido por .hasMany()

Category.hasMany(Article) // 1 Categoria pertence a varios Articles
Article.belongsTo(Category) // 1 Article percente a 1 Category

// Article.sync({force: true}).then(() => console.log('Tabela Article atualizada'))

module.exports = Article;


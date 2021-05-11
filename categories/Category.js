const Sequelize = require('sequelize')
const connection = require('../databases/connection')

const Category = connection.define('categories',{
    title: {
        type: Sequelize.STRING,
        allowNull: false
    }, slug: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

// Category.sync({force: true}).then(() => console.log('Tabela category atualizada'))

module.exports = Category;
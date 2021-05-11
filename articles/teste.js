const Sequelize = require('sequelize')
const connection = require('../databases/connection')


const teste = connection.define('tabela', {
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    idade: {
        type: Sequelize.STRING,
        allowNull: false
    }
})


// teste.sync({force:false})


module.exports = teste
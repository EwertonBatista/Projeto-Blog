const Sequelize = require('sequelize')

const connection = new Sequelize('guiapress','ewerton2one','1234567', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
})


module.exports = connection;
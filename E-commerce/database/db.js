const { Sequelize } = require('sequelize');

// Configuración de Sequelize para SQLite
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './ecommerce.db',  // Ruta a tu base de datos SQLite
});

// Probar la conexión
sequelize.authenticate()
    .then(() => {
        console.log('Conexión establecida correctamente con SQLite.');
    })
    .catch(err => {
        console.error('Error al conectar a la base de datos:', err);
    });

module.exports = sequelize;


const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const sequelize = require('./database/db');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Rutas
app.use('/api', userRoutes); 
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);


// Sincronización con la base de datos
sequelize.sync({ force: false })  // force: true para borrar y recrear la tabla cada vez que se inicie el servidor
    .then(() => {
        console.log('Tablas sincronizadas');
    })
    .catch(err => console.error('Error al sincronizar tablas:', err));

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

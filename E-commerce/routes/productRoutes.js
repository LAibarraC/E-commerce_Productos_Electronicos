const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const path = require('path'); 
const upload = require('../config/multerConfig');

//const multer = require('multer'); // Importar multer

/*const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Carpeta donde se guardarán las imágenes
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Nombra el archivo con un timestamp
    }
});

// Configurar `multer` para recibir hasta 3 imágenes con nombres específicos (image1, image2, image3)
const upload = multer({ storage: storage }).fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 }
]);*/

// Ruta para crear productos
router.post('/products', upload, productController.createProduct);
 

// Rutas para obtener todos los productos y operaciones CRUD
router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProduct);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);
router.get('/products/search', productController.searchProducts);

// Middleware para manejar errores de multer
router.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(500).json({ success: false, message: err.message });
    } else if (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
    next();
});

module.exports = router;

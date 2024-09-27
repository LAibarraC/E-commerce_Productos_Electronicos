const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const path = require('path'); 
const multer = require('multer'); // Importar multer

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Carpeta donde se guardarán las imágenes
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Nombra el archivo con un timestamp
    }
});
const upload = multer({ storage: storage });
//router.post('/products', upload.array('images', 3), productController.createProduct); // Solo una declaración de la ruta
router.post('/products', upload.array('images', 3), productController.createProduct);
 

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

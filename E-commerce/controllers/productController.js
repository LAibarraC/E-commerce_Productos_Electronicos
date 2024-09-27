// controllers/productController.js
const productService = require('../services/productService');
const Joi = require('joi');
//const path = require('path'); 

class ProductController {
    // Esquema de validación para los productos
    static productSchema = Joi.object({
        name: Joi.string().optional(),
        code: Joi.string().optional(),
        brand: Joi.string().optional(),
        color: Joi.string().optional(),
        price: Joi.number().optional(),
        discount: Joi.number().optional(),
        length: Joi.number().optional(),
        height: Joi.number().optional(),
        status: Joi.boolean().optional(),
        model: Joi.string().optional(),
        stock: Joi.number().optional(),
        weight: Joi.number().optional(),
        width: Joi.number().optional(),
        warranty: Joi.number().optional(),
        description: Joi.string().optional(),
        image1: Joi.string().optional().allow(null),
        image2: Joi.string().optional().allow(null),
        image3: Joi.string().optional().allow(null),
        tags: Joi.array().items(Joi.string()).optional(),
        categoryId: Joi.number().required()
    });

    async createProduct(req, res) {
        try {
            const productData = req.body;

            // Verifica si se han subido imágenes y asigna a los campos correspondientes
            if (productData.tags) {
                productData.tags = productData.tags.split(',').map(tag => tag.trim());
            } else {
                productData.tags = null; // O dejar como un arreglo vacío []
            }
            
            const files = req.files;
            if (files) {
                const baseUrl = req.protocol + '://' + req.get('host');
                
                // Asignar cada imagen subida a su campo correspondiente (si existe)
                productData.image1 = files.image1 ? `${baseUrl}/uploads/${files.image1[0].filename}` : null;
                productData.image2 = files.image2 ? `${baseUrl}/uploads/${files.image2[0].filename}` : null;
                productData.image3 = files.image3 ? `${baseUrl}/uploads/${files.image3[0].filename}` : null;
            }

            console.log('Generated Image URLs:', productData.image1, productData.image2, productData.image3);

            // Validar el producto
            await ProductController.productSchema.validateAsync(productData);

            // Crear el producto en la base de datos
            const productId = await productService.createProduct(productData);
            res.status(201).json({ success: true, id: productId, message: 'Producto guardado exitosamente' });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ success: false, message: 'Error en el servidor', error: error.message });
        }
    }
    
    
    

    async getAllProducts(req, res) {
        try {
            const products = await productService.getAllProducts();
            res.json({ success: true, products });
        } catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    }

    async getProduct(req, res) {
        try {
            const productId = req.params.id; 
            const product = await productService.getProduct(productId);
            if (!product) {
                return res.status(404).json({ success: false, message: 'Producto no encontrado' });
            }
            res.json({ success: true, product });
        } catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    }

    async updateProduct(req, res) {
        try {
            const productId = req.params.id;
            const productData = await ProductController.productSchema.validateAsync(req.body);
            await productService.updateProduct(productId, productData);
            res.json({ success: true, message: 'Producto actualizado exitosamente' });
        } catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    }

    async deleteProduct(req, res) {
        try {
            const productId = req.params.id;
            await productService.deleteProduct(productId);
            res.json({ success: true, message: 'Producto eliminado exitosamente' });
        } catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    }

    async searchProducts(req, res) {
        try {
            const { query } = req.query; // Asumiendo que la búsqueda viene en la query
            const products = await productService.searchProducts(query);
            res.json({ success: true, products });
        } catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    }
}

module.exports = new ProductController();


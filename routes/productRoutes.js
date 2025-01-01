const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController'); // Keep this as is
const upload = require('../config/multer');

// Middleware for overriding methods
const methodOverride = require('method-override');
router.use(methodOverride('_method'));

// Route handlers, using productController methods
router.get('/', productController.getAllProducts); // Get all products
router.get('/create', productController.renderCreateForm); // Render create form
router.post('/', upload.single('image'), productController.createProduct); // Create product
router.get('/:id', productController.getProductById); // Show product details
router.get('/:id/edit', productController.renderEditForm); // Show edit form
router.put('/:id', upload.single('image'), productController.updateProduct); // Update product
router.delete('/:id', productController.deleteProduct); // Delete product

module.exports = router;

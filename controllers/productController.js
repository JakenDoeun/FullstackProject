const Product = require("../models/productModel");
const upload = require('../config/multer');

exports.getAllProducts_buy = async (req, res) => {
    try {
        const products = await Product.getAll_sale();
        console.log(products)
        let title = "List of Properties";
        res.render('product/house_list', {products,title});
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).send("Error fetching products");
    }
};

exports.getAllProducts_rent = async (req, res) => {
    try {
        const products = await Product.getAll_rent();
        console.log(products)
        let title = "Properties For Rent";
        res.render('product/house_list_rent', {products,title});
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).send("Error fetching products");
    }
};

exports.renderCreateForm = (req, res) => {
    let title = "Sell House";
    res.render('product/create', { title });
};

exports.createProduct = async (req, res) => {
    try {
        const { type,
            bedroom,
            bathroom,
            size,
            price,
            name,
            address_info,
            description,
            } = req.body;
        let image_path = "";

        // If there's an uploaded file, set the image path
        if (req.file) {
            image_path = `/uploads/${req.file.filename}`;
        }

        await Product.create({ type, bedroom, bathroom, size, price, name, address_info, description, img: image_path });
        res.redirect("/");
    } catch (err) {
        console.error(err); // Log the error for debugging
        let backurl = '/';
        req.flash('error', err.sqlMessage);
        return res.redirect(backurl);
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.getById(req.params.id);
        console.log('Requested Product ID:', req.params.id);
        let title = "Show product";
        if (product) {
            res.render('product/show', { product, title });
        } else {    
            res.status(404).send('Product not found');
        }
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).send('Error fetching product');
    }
};

exports.renderEditForm = async (req, res) => {
    try {
        const product = await Product.getById(req.params.id);
        let title = "Edit Product";
        if (product) {
            res.render('product/edit', { product, title });
        } else {
            res.status(404).send('Product not found');
        }
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).send('Error fetching product');
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        let image_path = "";

        if (req.file) {
            image_path = `/uploads/${req.file.filename}`;
        } else {
            const product = await Product.getById(req.params.id);
            image_path = product.image;
        }

        await Product.update(req.params.id, { name, description, price, image: image_path });
        res.redirect('/product');
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).send('Error updating product');
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        await Product.delete(req.params.id);
        res.redirect('/product');
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).send('Error deleting product');
    }
};

exports.renderHomePage = async (req, res) => {
    try {
        // Fetch properties for rent and sell from the database
        const propertiesRent = await Product.getFour_random_sale();
        const propertiesSell = await Product.getFour_random_rent();
        const title = "Home"
        res.render('index/index', {
            propertiesRent,
            propertiesSell, title
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching properties.");
    }
};

exports.contact = async (req, res) => {
    try {
        let title = "Contact";
        res.render('product/contact', {title});
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).send("Error fetching products");
    }
};
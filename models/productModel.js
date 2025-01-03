const db = require("../config/database");

class Product {
    // Get all products
    static async getAll() {
        const [rows] = await db.query('SELECT * FROM house_info');
        return rows;
    }

    static async getAll_sale() {
        const [rows_sale] = await db.query('SELECT * FROM house_info WHERE type = \'SELL\'');
        return rows_sale;
    }

    //Get all product for rent
    static async getAll_rent() {
        const [rows_rent] = await db.query('SELECT * FROM house_info WHERE type = \'RENT\' ');
        return rows_rent
    }    
    // Create a new product
    static async create(data) {
        const result = await db.query(
            "INSERT INTO house_info (type, bedroom, bathroom, size, price, name, address_info, description, img) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [
                data.type,
                data.bedroom,
                data.bathroom,
                data.size,
                data.price,
                data.name,
                data.address_info,
                data.description,
                data.img,
            ]
        );
        return result;
    }

    // Get a product by ID
    static async getById(id) {
        const [rows] = await db.query('SELECT * FROM house_info WHERE house_id = ?', [id]);
        return rows[0];
    }
    
    // Update a product
    static async update(id, data) {
        const result = await db.query(
            'UPDATE house_info SET type = ?, bedroom = ?, bathroom = ?, size = ?, price = ?, name = ?, address_info = ?, description = ?, img = ? WHERE house_id = ?',
            [
                data.type,
                data.bedroom,
                data.bathroom,
                data.size,
                data.price,
                data.name,
                data.address_info,
                data.description,
                data.img,
            ]
        );
        return result;
    }

    // Delete a product
    static async delete(id) {
        const result = await db.query('DELETE FROM house_info WHERE house_id = ?', [id]);
        return result;
    }

    // Get 4 random products for sale
    static async getFour_random_sale() {
        const [rows_sale] = await db.query('SELECT * FROM house_info WHERE type = \'SELL\' ORDER BY RAND() LIMIT 4');
        return rows_sale;
    }

    // Get 4 random products for rent
    static async getFour_random_rent() {
        const [rows_rent] = await db.query('SELECT * FROM house_info WHERE type = \'RENT\' ORDER BY RAND() LIMIT 4');
        return rows_rent;
    }

}

module.exports = Product;

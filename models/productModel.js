const db = require("../config/database");

class Product {
    static async getAll() {
        const [rows] = await db.query('SELECT * FROM `house_info`');
        return rows;
    }

    static async create(data) {
        const result = await db.query(
            "INSERT INTO house_info (type, price, street, city, state, address_info, description, img) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [
                data.type,
                data.price,
                data.street,
                data.city,
                data.state,
                data.address_info,
                data.description,
                data.img,
            ]
        );
        return result;
    }

    static async getById(id) {
        const [rows] = await db.query('SELECT * FROM house_info WHERE house_id = ?', [id]);
        return rows[0];
    }

    static async update(id, data) {
        const result = await db.query(
            'UPDATE house_info SET type = ?, price = ?, street = ?, city = ?, state = ?, address_info = ?, description = ?, img = ?, seller_id = ? WHERE house_id = ?',
            [
                data.type,
                data.price,
                data.street,
                data.city,
                data.state,
                data.address_info,
                data.description,
                data.img,
                id,
            ]
        );
        return result;
    }

    static async delete(id) {
        const result = await db.query('DELETE FROM house_info WHERE house_id = ?', [id]);
        return result;
    }
}

module.exports = Product;

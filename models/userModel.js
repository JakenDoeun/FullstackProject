const db = require("../config/database");

class Users {
    // This is for user to register (create user in database)
    static async register(data) {
            const result = await db.query(
                "INSERT INTO user_info (username, firstname, lastname, phone_number, email, password) VALUES (?, ?, ?, ?, ?, ? )",
                [
                    data.username,
                    data.firstname,
                    data.lastname,
                    data.phone_number,
                    data.email,
                    data.password,
                ]
            );
            return result;
        }

    //Login
    static async findUserByCredentials(email, password) {
        const [rows] = await db.query(
            "SELECT id, username, email FROM user_info WHERE email = ? AND password = ?",
            [email, password]
        );

        if (rows.length > 0) {
            return rows[0]; // Return the user record if credentials match
        } else {
            return null; // Return null if no matching user is found
        }
    }

    
}




module.exports = Users;
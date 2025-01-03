const Users = require("../models/userModel");

//display the register form
exports.renderCreateFormUser = (req, res) => {
    let title = "JustHome";
    res.render('user/register', { title });
};
//for create or post new user to database
exports.createUsers = async (req, res) => {
    try {
        console.log('User registered successfully');
        const { username,
            firstname,
            lastname,
            phone_number,
            email,
            password
            } = req.body;

        await Users.register({ username, firstname, lastname, phone_number, email, password });
        res.redirect("/houses");
    } catch (err) {
        console.error(err); // Log the error for debugging
        let backurl = '/';
        req.flash('error', 'There was a problem with your registration. Please try again.');
        return res.redirect(backurl);
    }
};

exports.renderloginUser = (req, res) => {
    let title = "Login";
    let error_credentials;
    res.render('user/login', { title, error_credentials });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Users.findUserByCredentials(email, password);
        if (user) {
            console.log('Login');
            req.session.userId = user.id; // Store user ID in session
            res.redirect(`/houses`); // Redirect to user's page
        } else {
            res.render('user/login', { error_credentials:'Invalid email or password. Please try again.' });
        }
    } catch (error) {
        console.error('Error in login:', error);
        res.status(500).render('user/login', { error: 'An error occurred. Please try again later.' });
    }
};

// for user to logout
exports.logout = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            return res.redirect('/houses'); // Redirect back if an error occurs
        }
        res.clearCookie('connect.sid'); // Clear the session cookie
        res.redirect('/'); // Redirect to the register page
    });
};
// Get the user profile (for display)
exports.getUserProfile = async (req, res) => {
    try {
        const userId = req.session.userId; // Get user ID from the session
        if (!userId) {
            return res.redirect('user/login'); // If not logged in, redirect to the login page
        }

        // Fetch the user details using the model
        const user = await Users.getUserById(userId);

        if (user) {
            res.render('user/profile', { title: 'User Profile', user }); // Render user profile
        } else {
            res.status(404).send('User not found'); // If no user found with the given ID
        }
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).send('An error occurred while fetching your profile.');
    }
};
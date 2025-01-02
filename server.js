require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');

const productRoutes = require('./routes/productRoutes');

// Middleware
app.use(express.urlencoded({ extended: true }));

// Session middleware for storing session data
app.use(session({ 
    secret: 'cyber cadt idri idt idg', // Use a proper secret key here
    saveUninitialized: true, 
    resave: true 
}));

// Flash middleware for handling temporary messages
app.use(flash());

// Make flash messages available in all views
app.use((req, res, next) => {
    res.locals.messages = req.flash();
    next();
});

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Serve static files (e.g., CSS, images)
app.use(express.static(path.join(__dirname, 'public')));

app.use("/",productRoutes); // This links all product-related routes to '/' and sub-routes

// Start the server
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

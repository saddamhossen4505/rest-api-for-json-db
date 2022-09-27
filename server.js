const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const expressLayout = require('express-ejs-layouts');
const userRoute = require('./routes/userRoute');



// Init Express.
const app = express();

// Init Environment Variables.
dotenv.config();
const PORT = process.env.PORT || 8080;


// Static-Folder.
app.use(express.static('public'));

// Data Manage.
app.use(express.json());
app.use(express.urlencoded({ extended : false }));


// Init EJS.
app.set("view engine", "ejs");
app.use(expressLayout);


// Init router.
app.use('/api/v1/user', userRoute );


// Create Server.
app.listen(PORT, () => {
    console.log(`server is running on port${PORT}`.bgMagenta.black);
});
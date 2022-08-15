const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/users';
require('dotenv').config();

const app= express();

const port = process.env.port || 3000

mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "correction error:"));
db.once("open", () => {
    console.log("Database connected");
});

app.use(express.json());

app.use(express.static(__dirname + '/views'));

app.use('/register',userRoutes)
app.use('/login',userRoutes)
app.use('/logout',userRoutes)

app.listen(port, () => {
    console.log(`nodemailerProject is listening at http://localhost:${port}`)
  })
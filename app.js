const express = require('express');

const userRoutes = require('./routes/userRoutes')
const stockRoutes = require('./routes/stockRoutes')
const partRoutes = require('./routes/partRoutes')
const companyRoutes = require('./routes/companyRoutes')
const emailService = require('./services/emailService')
const app = express();
var docs = require("express-mongoose-docs");

app.use(express.json());
app.use(userRoutes)
app.use(stockRoutes)
app.use(partRoutes);
app.use(companyRoutes)

app.get('/hello', (req, res) => {
    res.status(200).json({message: 'Hello World!'});
})

module.exports = app;
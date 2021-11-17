const express = require('express');

const userRoutes = require('./routes/userRoutes')
const stockRoutes = require('./routes/stockRoutes')
const partRoutes = require('./routes/partRoutes')
const transactionRoutes = require('./routes/transactionRoutes')
const companyRoutes = require('./routes/companyRoutes')
const partClassRoutes = require('./routes/partClassRoutes')
const warehouseRoutes = require('./routes/warehouseRoutes')
const emailService = require('./services/emailService')
const app = express();
var docs = require("express-mongoose-docs");

app.use(express.json());
app.use(userRoutes)
app.use(stockRoutes)
app.use(partRoutes);
app.use(companyRoutes)
app.use(transactionRoutes)
app.use(partClassRoutes)
app.use(warehouseRoutes)

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Laoprogramm backend',
        part: '/part/',
        company: '/company',
        stock:'/stock',
        login:'/login'
});
})

module.exports = app;
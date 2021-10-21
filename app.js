const express = require('express');

const userRoutes = require('./routes/userRoutes')
const stockRoutes = require('./routes/stockRoutes')
const partRoutes = require('./routes/partRoutes')
const app = express();


app.use(express.json());

app.use(userRoutes)
app.use(stockRoutes)
app.use(partRoutes);


app.get('/hello', (req, res) => {
    res.status(200).json({message: 'Hello World!'});
})

module.exports = app;
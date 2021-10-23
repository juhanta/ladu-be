const express = require('express');

const userRoutes = require('./routes/userRoutes')
const stockRoutes = require('./routes/stockRoutes')
const partRoutes = require('./routes/partRoutes')
const app = express();
var docs = require("express-mongoose-docs");

app.use(express.json());
docs(app);
app.use(userRoutes)
docs(app);
app.use(stockRoutes)
docs(app);
app.use(partRoutes);
docs(app);


app.get('/hello', (req, res) => {
    res.status(200).json({message: 'Hello World!'});
})

module.exports = app;
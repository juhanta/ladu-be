const  stockService   = require('../services/stockService');

const stockController = {};


stockController.getStockByCompany = async (req, res) => {
    const id = req.params.id
    const stock = await stockService.getStockByCompany(id);
    res.status(200).json({
        stock})
};

module.exports = stockController;
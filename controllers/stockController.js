const  stockService   = require('../services/stockService');
const  partService   = require('../services/partService');

const stockController = {};


stockController.getStockByCompany = async (req, res) => {
    const id = req.params.id
    const stock = await stockService.getStockByCompany(id);
    res.status(200).json({
        stock})
};


stockController.getStockByPart = async (req, res) => {
    const companyID = parseInt(req.params.companyID,10)
    const partID = parseInt(req.params.partID,10)
    const warehouseID = parseInt(req.params.warehouseID,10)
    if (!companyID){
        res.status(400).json({
            error: 'Company ID puudu'
        })
    }
    if (!partID){
        res.status(400).json({
            error: 'PartID puudu'
        })
    }
    if (!warehouseID){
        res.status(400).json({
            error: 'warehouseID puudu'
        })
    }
    
    console.log(companyID, partID, warehouseID)
    const stock = await stockService.getStockByPart(companyID, partID, warehouseID);
    res.status(200).json({
        stock})
};

stockController.getStockWithAllLots = async (req, res) => {
    const companyID = parseInt(req.params.companyID,10)
    const partID = parseInt(req.params.partID,10)
    if (!companyID){
        res.status(400).json({
            error: 'Company ID puudu'
        })
    }
    if (!partID){
        res.status(400).json({
            error: 'PartID puudu'
        })
    }
    
    const stock = await stockService.getStockWithAllLots(companyID, partID);
    res.status(200).json({
        stock})
};



stockController.addStockToCompany = async (req, res) => {
    const companyID = req.body.companyID
    const warehouseID = req.body.warehouseID
    const partID = req.body.partID
    let lotID = req.body.lotID
    const qty = req.body.qty
    
    console.log(partID)
    const lotRequired = await partService.getPartByPartID(companyID,partID)
    if (lotRequired[0].lotTracked === 1 && !lotID) {
        res.status(400).json({
            error: 'Partii on antud tootel nõutud.'
        })
    }
    if(lotRequired[0].lotTracked === 0){
        lotID = null
    }
    if(companyID && warehouseID && partNum && qty){
        const newStock = {
            partID : partID,
            companyID: companyID,
            warehouseID: warehouseID,
            lotID: lotID,
            qty: qty
        }
        const addStock = await stockService.addStock(newStock);
            res.status(200).json({
                addStock})
            }

};

module.exports = stockController;
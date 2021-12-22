const stockService = require('../services/stockService');
const transactionService   = require('../services/transactionService');
const partService = require('../services/partService');

const transactionController = {};

transactionController.newTransaction = async (req, res) => {
    const companyID = req.body.companyID
    const warehouseID = req.body.warehouseID
    const partNum = req.body.partNum
    let lotID = req.body.lotID
    const qty = req.body.qty
    const partID = req.body.partID
    const comment = req.body.comment
    const userID = req.body.userID
    const transactionID = req.body.transactionID
    if (qty <= 0 ){
        res.status(400).json({
            error: 'Vigane kogus!'
        })
    }
    const lotRequired = await partService.getPartByPartID(companyID,partID)
    if (lotRequired[0].lotTracked === 1 && !lotID) {
        res.status(400).json({
            error: 'Partii on antud tootel nõutud.'
        })
    }
    if(lotRequired[0].lotTracked === 0){
        lotID = null
    }
    const isStock = await stockService.getStockByPartLot(companyID, partID, warehouseID,lotID)
    if (isStock.length > 0){
    if (isStock[0].qty >= qty){
        if(companyID && warehouseID && partID && qty && userID && transactionID){
            const newTransaction = {
                partID : partID,
                companyID: companyID,
                warehouseID: warehouseID,
                lotID: lotID,
                qty: qty,
                comment : comment,
                userID : userID,
                transactionID : transactionID
            }
    
            
            const addTransaction = await transactionService.addTransaction(newTransaction,isStock);
            
            res.status(200).json({
                addTransaction})
            }else{
                res.status(400).json({
                    error: 'Kõik väljad peavad olema täidetud'
                })
            }
        }
    
    else{
        res.status(400).json({
            error: 'Puudub piisav laoseis'
        })
    }
    }else{
        res.status(400).json({
            error: 'Puudub laost'
        })
    }

};


transactionController.getTransactionType = async (req, res) => {
    const companyID = req.body.companyID
    const transaction = await transactionService.getTransactionType(companyID);
    res.status(200).json({
        transaction})
};


transactionController.getCompanyTransactions = async (req, res) => {
    const companyID = req.body.companyID
    const transactions = await transactionService.getCompanyTransactions(companyID);
    res.status(200).json({
        transactions})
};




module.exports = transactionController;

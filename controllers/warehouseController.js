const  warehouseService   = require('../services/warehouseService');

const warehouseController = {};


warehouseController.getWarehouse = async (req, res) => {
    const companyID = parseInt(req.params.id, 10);
    const warehouse = await warehouseService.getWarehouse(companyID);
    res.status(200).json({
        warehouse})
};


warehouseController.addWarehouse = async (req, res) => {
    const companyID = req.body.companyID
    const warehouseCode = req.body.warehouseCode
    
    if(companyID && warehouseCode) {
        const warehouse = await warehouseService.addWarehouse(companyID,warehouseCode);
        res.status(200).json({
            warehouse})
    }
    else{
        res.status(400).json({
            error: 'Kõik väljad on kohustuslikud!'
        })
    }
    
};

warehouseController.addPartToWarehouse = async (req, res) => {
    const companyID = req.body.companyID
    const warehouseID = req.body.warehouseID
    const partID = req.body.partID

    if(companyID && warehouseID && partID) {
        const newRelation={
            companyID : companyID,
            warehouseID : warehouseID,
            partID : partID
        }
        const partToWarehouse = await warehouseService.addPartToWarehouse(newRelation);
        res.status(200).json({
            partToWarehouse})
    }
    else{
        res.status(400).json({
            error: 'Kõik väljad on kohustuslikud!'
        })
    }
    
};




module.exports = warehouseController;
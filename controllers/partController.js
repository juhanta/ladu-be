const  partService   = require('../services/partService');

const partController = {};


partController.getPartByPartNum = async (req, res) => {
    const companyID = parseInt(req.params.companyID,10)
    const partID = parseInt(req.params.partID,10)
    const part = await partService.getPartByPartID(companyID,partID);
    res.status(200).json({
        part})
};


partController.getLotsByPart = async (req, res) => {
    const companyID = parseInt(req.params.companyID,10)
    const partID = parseInt(req.params.partID,10)
    const part = await partService.getLotsByPart(companyID,partID);
    res.status(200).json({
        part})
};

partController.getPartsByCompany = async (req, res) => {
    const companyID = req.params.id
    const part = await partService.getPartsByCompany(companyID);
    res.status(200).json({
        part})
};


partController.addPart = async (req, res) => {
    const partNum = req.body.partNum
    const description = req.body.description
    const companyID = req.body.companyID
    const classID = req.body.classID
    const lotTracked = req.body.lotTracked
    const reminder = req.body.reminder
    const minQty = req.body.minQty
    if (partNum && description && companyID && classID && lotTracked && reminder && minQty) {
        const checkForPart = await partService.getPartByPartNum(companyID,partNum)
        if(checkForPart.length){
            res.status(400).json({
                error: 'Sellise tootenumbriga toode on juba olemas!'
            })
        }
        else{
            const newPart = {
            partNum: partNum,
            description: description,
            companyID: companyID,
            classID: classID,
            lotTracked: lotTracked,
            reminder: reminder,
            minQty: minQty
            }
            const addPart = await partService.addPart(newPart);
            res.status(200).json({
                addPart})
            }
    }else{
        res.status(400).json({
            error: 'Kõik väljad on kohustuslikud!'
        })
    }
    
};

partController.changePart = async (req, res) => {
    const partNum = req.body.partNum
    const partID = req.params.partID
    console.log(partNum)
    const description = req.body.description
    const companyID = req.body.companyID
    const classID = req.body.classID
    const lotTracked = req.body.lotTracked
    const reminder = req.body.reminder
    const minQty = req.body.minQty
    if (partID && partNum && description && companyID && classID && lotTracked && reminder && minQty) {
        const checkForPart = await partService.getPartByPartID(companyID,partID)
        if(checkForPart.length === 0){
            res.status(400).json({
                error: 'Error. Sellist toodet pole'
            })
        }
        else{
            const changedPart = {
            partNum: partNum,
            description: description,
            companyID: companyID,
            classID: classID,
            lotTracked: lotTracked,
            reminder: reminder,
            minQty: minQty
            }
            const changePart = await partService.changePart(partID,changedPart);
            res.status(200).json({
                status: 'Muudetud'})
            }
    }else{
        res.status(400).json({
            error: 'Kõik väljad on kohustuslikud!'
        })
    }
    
};


partController.addParToWarehouse = async (req, res) => {
    const partID= req.body.partID
    const warehouseID = req.body.warehouseID
    const companyID = req.body.companyID
   
    if (partID && warehouseID) {
        const checkForPart = await partService.getPartByPartID(companyID,partID)
        if(checkForPart.length === 0){
            res.status(400).json({
                error: 'Error. Sellist toodet pole'
            })
        }
        else{
            const partToWhse = {
                partID : partID,
                companyID : companyID,
                warehouseID : warehouseID
            }
           
            const changePart = await partService.addPartToWarehouse(partToWhse);
            res.status(200).json({
                status: 'Muudetud'})
            }
    }else{
        res.status(400).json({
            error: 'Kõik väljad on kohustuslikud!'
        })
    }
    
};

partController.removePartFromWarehouse = async (req, res) => {
    const partID= req.body.partID
    const warehouseID = req.body.warehouseID
    const companyID = req.body.companyID
   
    if (partID && warehouseID && companyID) {
        const checkForPart = await partService.getPartByPartID(companyID,partID)
        const checkForStock = await parService.getStockByPartSum(companyID,partID);
        console.log(checkForStock)
        if(checkForPart.length === 0){
            res.status(400).json({
                error: 'Error. Sellist toodet pole'
            })
        }

        else{
            const partToWhse = {
                partID : partID,
                companyID : companyID,
                warehouseID : warehouseID
            }
           
            //const changePart = await partService.addPartToWarehouse(partToWhse);
            res.status(200).json({
                status: 'Muudetud'})
            }
    }else{
        res.status(400).json({
            error: 'Kõik väljad on kohustuslikud!'
        })
    }
    
};



partController.addLot = async (req, res) => {
    const partID = req.body.partID
    const lotNum = req.body.lotNum
    const companyID = req.body.companyID
    const purchased = req.body.purchased
    const bestBeforeDt = req.body.bestBeforeDate
   
    if (partID && lotNum && companyID && purchased && bestBeforeDt) {
    
            const newLot = {
            partID: partID,
            lotNum: lotNum,
            companyID: companyID,
            purchased: purchased,
            bestBeforeDt: bestBeforeDt,
            }
            const addLot = await partService.addLot(newLot);
            res.status(200).json({
                addLot})
            
    }else{
        res.status(400).json({
            error: 'Kõik väljad on kohustuslikud!'
        })
    }
    
};
module.exports = partController;
const  partService   = require('../services/partService');

const partController = {};


partController.getPartByPartNum = async (req, res) => {
    const companyID = req.body.companyID
    const partNum = req.body.partNum
    const part = await partService.getPartByPartNum(companyID,partNum);
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
    if (partNum && description && companyID && classID && lotTracked && reminder) {
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
            reminder: reminder
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
    const partNum = req.params.partNum
    console.log(partNum)
    const description = req.body.description
    const companyID = req.body.companyID
    const classID = req.body.classID
    const lotTracked = req.body.lotTracked
    const reminder = req.body.reminder
    if (partNum && description && companyID && classID && lotTracked && reminder) {
        const checkForPart = await partService.getPartByPartNum(companyID,partNum)
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
            reminder: reminder
            }
            const changePart = await partService.changePart(changedPart);
            res.status(200).json({
                status: 'Muudetud'})
            }
    }else{
        res.status(400).json({
            error: 'Kõik väljad on kohustuslikud!'
        })
    }
    
};


module.exports = partController;
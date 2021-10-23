const  partService   = require('../services/partService');

const partController = {};


partController.getPartByPartNum = async (req, res) => {
    const companyId = req.body.companyId
    const partNum = req.body.partNum
    console.log(companyId, partNum)
    const part = await partService.getPartByPartNum(companyId,partNum);
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
                newPart})
            }
    }else{
        res.status(400).json({
            error: 'Kõik väljad on kohustuslikud!'
        })
    }
    
};



module.exports = partController;
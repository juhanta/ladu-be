const  partClassService   = require('../services/partClassService');

const partClassController = {};


partClassController.getPartClass = async (req, res) => {
    const companyID = parseInt(req.params.id, 10);
    const partClass = await partClassService.getPartClass(companyID);
    res.status(200).json({
        partClass})
};

partClassController.getPartClassDetail = async (req, res) => {
    const companyID = req.body.companyID
    const partClassID = req.body.partClassID
    const partClass = await partClassService.getPartClassDetail(companyID, partClassID);
    res.status(200).json({
        partClass})
};



partClassController.addPartClass = async (req, res) => {
    const companyID = req.body.companyID
    const description = req.body.description
    console.log(companyID, description)
    const partClassExists = await partClassService.ifNameExists(companyID, description);
    if (partClassExists.length > 0) {
        res.status(400).json({
            error: 'Sellise nimega klass on juba olemas!'
    })
    }else{
    if(companyID && description) {
        const partClass = await partClassService.addPartClass(companyID,description);
        res.status(200).json({
            partClass})
    }
    else{
        res.status(400).json({
            error: 'Kõik väljad on kohustuslikud!'
        })
    }
}
    
};




module.exports = partClassController;
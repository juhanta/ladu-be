const  partService   = require('../services/partService');

const partController = {};


partController.getPartById = async (req, res) => {
    const companyId = req.body.companyId
    const partId = req.body.partId
    console.log(companyId, partId)
    const part = await partService.getPartById(companyId,partId);
    res.status(200).json({
        part})
};



module.exports = partController;
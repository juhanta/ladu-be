const  companyService   = require('../services/companyService');

const companyController = {};


companyController.getCompanyForUser = async (req, res) => {
    const userID = parseInt(req.userId, 10);
    const company = await companyService.getCompanyForUser(userID);
    res.status(200).json({
        company})
};

companyController.getCompanyInfo = async (req, res) => {
    const userID = parseInt(req.userId, 10);
    const company = await companyService.getCompanyForUser(userID);
    res.status(200).json({
        company})
};




module.exports = companyController;
const db = require("../db")

const companyService = {};


companyService.getCompanyForUser =  async (userID) => {
    const company = await db.query("SELECT company.ID, company.Name FROM whse.company LEFT JOIN usercompany on usercompany.companyID = company.ID WHERE usercompany.userID = ?", [userID])
    return company;
    
  };

module.exports = companyService;
const db = require("../db")

const partClassService = {};


partClassService.getPartClass =  async (companyID) => {
    const partClass = await db.query("SELECT ID, description FROM partclass WHERE companyID = ? AND deleted = 0", [companyID])
    return partClass;
    
  };

partClassService.addPartClass =  async (companyID,description) => {
    const partClass = await db.query("INSERT INTO partclass SET companyID = ?, description = ?", [companyID,description])
    return true;
    
  };

module.exports = partClassService;
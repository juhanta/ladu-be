const db = require("../db")

const partService = {};


partService.getPartById =  async (companyId,partId) => {
    const part = await db.query("SELECT * FROM whse.part WHERE CompanyID = ? AND PartNum = ?", [companyId, partId])
    return part;
  };

partService.addPart =  async (companyId,partId) => {
    const part = await db.query("SELECT * FROM whse.part WHERE CompanyID = ? AND PartNum = ?", [companyId, partId])
    return part;
  };

module.exports = partService;
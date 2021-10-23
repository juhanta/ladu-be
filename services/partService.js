const db = require("../db")

const partService = {};


partService.getPartByPartNum =  async (companyId,partNum) => {
    const part = await db.query("SELECT * FROM whse.part WHERE CompanyID = ? AND PartNum = ? AND deleted = 0", [companyId, partNum])
    console.log(part)
    return part;
    
  };

partService.addPart =  async (newPart) => {
    const part = await db.query("INSERT INTO part SET ? ", [newPart])
    return newPart;
  };

partService.changePart =  async (changedPart) => {
    const part = await db.query("UPDATE part SET ? WHERE PartNum = ? AND companyID = ?", [changedPart, changedPart.partNum, changedPart.companyID])
    return true;
  };

module.exports = partService;
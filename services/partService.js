const db = require("../db")

const partService = {};


partService.getPartByPartNum =  async (companyID,partNum) => {
    const part = await db.query("SELECT * FROM part WHERE companyID = ? AND partNum = ? AND deleted = 0", [companyID, partNum])
    return part;
    
  };

  partService.getPartByPartID =  async (companyID,partID) => {
    const part = await db.query("SELECT * FROM part WHERE companyID = ? AND ID = ? AND deleted = 0", [companyID, partID])
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

partService.getPartID = async (companyID, partNum) =>{
  console.log(companyID, partNum)
    const partID = await db.query("SELECT ID FROM part WHERE partNum = ? AND companyID = ? ", [partNum, companyID] )
    
    return partID[0].ID;
  };

module.exports = partService;
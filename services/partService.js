const db = require("../db")

const partService = {};


partService.getPartByPartNum =  async (companyID,partNum) => {
    const part = await db.query("SELECT * FROM part WHERE companyID = ? AND partNum = ? AND deleted = 0", [companyID, partNum])
    return part;
    
  };

  partService.getPartsByCompany =  async (companyID) => {
    const partClass = await db.query("SELECT * FROM part WHERE companyID = ? AND deleted = 0", [companyID])
    return partClass;
    
  };

  partService.getPartByPartID =  async (companyID,partID) => {
    const part = await db.query("SELECT * FROM part WHERE companyID = ? AND ID = ? AND deleted = 0", [companyID, partID])
    return part;
    
  };

partService.addPart =  async (newPart) => {
    const part = await db.query("INSERT INTO part SET ? ", [newPart])
    const addedPart = await db.query("SELECT * FROM part WHERE id = LAST_INSERT_ID();")
    return addedPart;
  };

partService.changePart =  async (partID,changedPart) => {
    const part = await db.query("UPDATE part SET ? WHERE ID = ? AND companyID = ?", [changedPart, partID, changedPart.companyID])
    return true;
  };

partService.getPartID = async (companyID, partNum) =>{
  console.log(companyID, partNum)
    const partID = await db.query("SELECT ID FROM part WHERE partNum = ? AND companyID = ? ", [partNum, companyID] )
    
    return partID[0].ID;
  };

module.exports = partService;
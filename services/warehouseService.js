const db = require("../db")

const warehouseService = {};


warehouseService.getWarehouse =  async (companyID) => {
    const warehouse = await db.query("SELECT ID, warehouseCode FROM warehouse WHERE companyID = ? AND deleted = 0", [companyID])
    return warehouse;
    
  };

warehouseService.addWarehouse =  async (companyID,warehouseCode) => {
    const warehouse = await db.query("INSERT INTO warehouse SET companyID = ?, warehousecode = ?", [companyID,warehouseCode])
    return true;
    
  };

  warehouseService.addPartToWarehouse =  async (newRelation) => {
    const warehouse = await db.query("INSERT INTO partwhse SET ?", [newRelation])
    return true;
    
  };

module.exports = warehouseService;
const db = require("../db")

const stockService = {};


stockService.getStockByCompany =  async (company) => {
    const stock = await db.query('SELECT partwhse.companyID,partwhse.partID, part.partNum, part.description as partDescription, partclass.Description AS partClass, warehouse.ID as whID,  warehouse.WareHouseCode, COALESCE(SUM(stock.qty),0) AS qty, CASE WHEN COALESCE(SUM(stock.qty),0) < part.minQty THEN 1 ELSE 0 END AS notification from partwhse LEFT JOIN part on part.ID = partwhse.partID left JOIN stock on stock.partID = partwhse.partID  and stock.warehouseID = partwhse.warehouseID left join warehouse on partwhse.warehouseID = warehouse.id left join partclass on partclass.ID = part.classID WHERE partwhse.companyID = ? group by warehousecode,partID', [company])
    return stock;
  };


stockService.getStockByPart =  async (companyID, partID, warehouseID) => {
    const stock = await db.query('SELECT part.ID as partID, stock.companyID, warehouse.warehouseCode, part.partNum, partlot.ID AS lotID, partlot.lotnum, partlot.BestBeforeDt, stock.qty FROM stock LEFT JOIN part on part.ID = stock.partID left join partlot on partlot.ID = stock.lotID LEFT JOIN warehouse on warehouse.ID = stock.warehouseID WHERE stock.companyID = ? AND stock.partID = ? AND stock.warehouseID = ?', [companyID, partID, warehouseID])

    return stock;
  };

stockService.getStockByPartSum = async(companyID, partID) => {
const stock = await db.query('SELECT partwhse.companyID,partwhse.partID, part.partNum, part.description as partDescription, partclass.Description AS partClass,  warehouse.WareHouseCode, COALESCE(SUM(stock.qty),0) AS qty from partwhse LEFT JOIN part on part.ID = partwhse.partID left JOIN stock on stock.partID = partwhse.partID  and stock.warehouseID = partwhse.warehouseID left join warehouse on partwhse.warehouseID = warehouse.id left join partclass on partclass.ID = part.classID WHERE partwhse.companyID = ? and part.ID = ? group by warehousecode,partID',[companyID, partID])
return stock

}

  stockService.getStockWithAllLots =  async (companyID, partID) => {
    const stock = await db.query('SELECT part.ID as partID ,stock.companyID, warehouse.warehouseCode, part.partNum, partlot.lotnum, partlot.ID as lotID, partlot.BestBeforeDt, stock.qty FROM stock LEFT JOIN part on part.ID = stock.partID left join partlot on partlot.ID = stock.lotID LEFT JOIN warehouse on warehouse.ID = stock.warehouseID WHERE stock.companyID = ? AND stock.partID = ?', [companyID, partID])
    console.log(stock)
    return stock;
  };

stockService.getStockByPartLot =  async (companyID, partID, warehouseID,lotID) => {
    if (lotID == null) {
      const stock = await db.query('SELECT * FROM stock WHERE companyID = ? AND partID = ? AND warehouseID = ? AND lotID IS NULL', [companyID, partID, warehouseID])
      return stock
    }
    else{
      const stock = await db.query('SELECT * FROM stock WHERE companyID = ? AND partID = ? AND warehouseID = ? AND lotID = ?', [companyID, partID, warehouseID,lotID])

      return stock;
    }
    
  };

stockService.addStock =  async (newStock) => {
  
    const stock = await db.query("INSERT INTO stock SET ? ", [newStock])
    return stock;
  };

stockService.addStocktoStock = async(companyID, warehouseID,lotInStock,qty) => {
  console.log("stocktostock")

  const stock = await db.query("UPDATE stock SET qty = qty + ? WHERE lotID = ? AND companyID = ? AND warehouseID = ?", [qty, lotInStock.lotID,companyID,warehouseID])

}
module.exports = stockService;
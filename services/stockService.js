const db = require("../db")

const stockService = {};


stockService.getStockByCompany =  async (company) => {
    const stock = await db.query('SELECT partwhse.companyID,partwhse.partID, part.partNum, part.description as partDescription, partclass.Description AS partClass,  warehouse.WareHouseCode, COALESCE(SUM(stock.qty),0) AS qty from partwhse LEFT JOIN part on part.ID = partwhse.partID left JOIN stock on stock.partID = partwhse.partID left join warehouse on partwhse.warehouseID = warehouse.id left join partclass on partclass.ID = part.classID WHERE partwhse.companyID = ? group by partID', [company])
    return stock;
  };


stockService.getStockByPart =  async (companyID, partID, warehouseID) => {
    const stock = await db.query('SELECT stock.companyID, warehouse.warehouseCode, part.partNum, partlot.lotnum, partlot.BestBeforeDt, stock.qty FROM whse.stock LEFT JOIN part on part.ID = stock.partID left join partlot on partlot.ID = stock.lotID LEFT JOIN warehouse on warehouse.ID = stock.warehouseID WHERE stock.companyID = ? AND stock.partID = ? AND stock.warehouseID = ?', [companyID, partID, warehouseID])

    return stock;
  };

stockService.addStock =  async (newStock) => {
    const stock = await db.query("INSERT INTO stock SET ? ", [newStock])
    return stock;
  };



module.exports = stockService;
const db = require("../db")

const stockService = {};


stockService.getStockByCompany =  async (company) => {
    const stock = await db.query('SELECT stock.ID, company.Name AS "Company Name", warehouse.WareHouseCode, part.PartNum, part.Description,stock.Qty,  partlot.LotNum, partlot.BestBeforeDt FROM whse.stock LEFT JOIN whse.company on whse.Company.ID = stock.CompanyID LEFT JOIN whse.warehouse on whse.stock.WareHouseID = whse.warehouse.ID LEFT JOIN whse.part on whse.stock.partID = whse.part.ID LEFT JOIN whse.partlot on whse.stock.LotID = whse.partlot.ID WHERE stock.companyID = ?', [company])
    return stock;
  };

stockService.addStock =  async (newStock) => {
    const stock = await db.query("INSERT INTO stock SET ? ", [newStock])
    return stock;
  };



module.exports = stockService;
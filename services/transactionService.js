const db = require("../db")

const transactionService = {};

transactionService.addTransaction =  async (newTransaction,isStock) => {
    const stock = await db.query("INSERT INTO parttrans SET ? ", [newTransaction])
    console.log(isStock[0].ID)
    const removeStock = await db.query("UPDATE stock SET qty = qty - ? WHERE ID = ? ", [newTransaction.qty, isStock[0].ID])
    const deleteLot = await db.query("SELECT * FROM stock WHERE ID = ? ",[isStock[0].ID])
    if(deleteLot[0].qty === 0){
       const deletePartLot = await db.query("UPDATE partlot SET deleted = 1 WHERE ID = ?", [deleteLot[0].lotID])
       const deleteStock = await db.query("DELETE from stock where ID = ? ", [isStock[0].ID])
    }
    return true;
  };

  transactionService.addPosTransaction =  async (newTransaction) => {
    const stock = await db.query("INSERT INTO parttrans SET ? ", [newTransaction])
    console.log(isStock[0].ID)
    //const removeStock = await db.query("UPDATE stock SET qty = qty - ? WHERE ID = ? ", [newTransaction.qty, isStock[0].ID])
    //const deleteLot = await db.query("SELECT * FROM stock WHERE ID = ? ",[isStock[0].ID])
    //if(deleteLot[0].qty === 0){
    //   const deletePartLot = await db.query("UPDATE partlot SET deleted = 1 WHERE ID = ?", [deleteLot[0].lotID])
    //   const deleteStock = await db.query("DELETE from stock where ID = ? ", [isStock[0].ID])
   // }
    return true;
  };

transactionService.getTransactionType =  async (companyID) => {
    const transactionType = await db.query("SELECT * FROM transtype")
    return transactionType;
    
  };


transactionService.getCompanyTransactions =  async (companyID) => {
    const transactions = await db.query("SELECT parttrans.ID, company.Name AS Company, warehouse.WareHouseCode, part.partNum, parttrans.qty, partlot.LotNum, parttrans.comment, user.email, transtype.Description FROM parttrans LEFt JOIN company on company.id = parttrans.CompanyID LEFT JOIN warehouse on warehouse.id = parttrans.WarehouseID LEFT JOIN part on part.id = parttrans.partID LEFT JOIN partlot on partlot.id = parttrans.lotID LEFT JOIN user on user.ID = parttrans.userID LEFT JOIN transtype on transtype.ID = parttrans.TransactionID WHERE parttrans.companyID = ?",companyID)
    return transactions;
    
  };

  
transactionService.getPartTransactions =  async (companyID,partID) => {
  const transactions = await db.query("SELECT parttrans.ID, company.Name AS Company, warehouse.WareHouseCode, part.partNum, parttrans.qty, partlot.LotNum, parttrans.comment, user.email, transtype.Description FROM parttrans LEFt JOIN company on company.id = parttrans.CompanyID LEFT JOIN warehouse on warehouse.id = parttrans.WarehouseID LEFT JOIN part on part.id = parttrans.partID LEFT JOIN partlot on partlot.id = parttrans.lotID LEFT JOIN user on user.ID = parttrans.userID LEFT JOIN transtype on transtype.ID = parttrans.TransactionID WHERE parttrans.companyID = ? AND parttrans.partID = ? ",[companyID,partID])
  return transactions;
  
};


  
module.exports = transactionService

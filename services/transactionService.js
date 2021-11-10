const db = require("../db")

const transactionService = {};

transactionService.addTransaction =  async (newTransaction,isStock) => {
    const stock = await db.query("INSERT INTO parttrans SET ? ", [newTransaction])
    console.log(isStock[0].ID)
    const removeStock = await db.query("UPDATE stock SET qty = qty - ? WHERE ID = ? ", [newTransaction.qty, isStock[0].ID])
    console.log(removeStock)
    return true;
  };

  

module.exports = transactionService

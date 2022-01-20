
const cron = require('node-cron');
const nodemailer = require('nodemailer');
const { emailHost, port, emailUser, emailPassword, smtpPort } = require('../config');
const db = require("../db")

const emailService = {};

cron.schedule('0 00 08 * * *', async () => {
    const data = await emailService.emailToSend()
    if (!data){
        console.log("pole mida saata")
    }else{
        console.log(data)
        var transporter = nodemailer.createTransport({
            host: emailHost,
            port: smtpPort,
            secure: true, // upgrade later with STARTTLS
            auth: {
              user: emailUser,
              pass: emailPassword,
            },
          });
        console.log(data.length)
        console.log(data[0].email)
        for (let i = 0; i <= data.length; i++) {
            var message = {
                from: emailUser,
                to: data[i].email,
                subject: "Aeguv kaup",
                text: "Toode: " + data[i].PartNum + " partiiga : " + data[i].LotNum + " Laos : " + data[i].WareHouseCode + "Hakkab pahaks minema" ,
                html: "<p>Toode: " + data[i].PartNum + " partiiga : " + data[i].LotNum + " Laos : " + data[i].WareHouseCode + " Hakkab pahaks minema</p>"
              };
            transporter.sendMail(message, function (err, info) {
                if(err) 
                  console.log(err);
                else
                  console.log(info);
                 });
          }
          
    }
    
    })

emailService.emailToSend = async () => {
    const email = await db.query("SELECT stock.ID, company.Name AS 'Company Name', warehouse.WareHouseCode, part.PartNum, part.Description,stock.Qty, partlot.LotNum, partlot.BestBeforeDt , part.reminder, usercompany.UserID, DATE_SUB(partlot.BestBeforeDt, INTERVAL 12 DAY ) as EmailDate, user.email FROM stock LEFT JOIN company on company.ID = stock.companyID LEFT JOIN warehouse on stock.WareHouseID = warehouse.ID LEFT JOIN part on stock.partID = part.ID LEFT JOIN partlot on stock.LotID = partlot.ID LEFT join usercompany on usercompany.companyID = stock.companyID AND usercompany.notifications = TRUE LEFT JOIN user on usercompany.UserID = user.ID WHERE DATE_SUB(partlot.BestBeforeDt, INTERVAL 12 DAY ) <= curdate() AND partlot.emailSent = 0")
    
    return email
}
    


module.exports = emailService;
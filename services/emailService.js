
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
                text: "Toode: " + data[i].PartNum + " Laos : " + data[i].WareHouseCode + "Hakkab pahaks minema" ,
                html: "<p>Toode:" + data[i].PartNum + " Laos :" + data[i].WareHouseCode + "Hakkab pahaks minema</p>"
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
    const email = await db.query("SELECT stock.ID, company.Name AS 'Company Name', warehouse.WareHouseCode, part.PartNum, part.Description,stock.Qty,  partlot.LotNum, partlot.BestBeforeDt , part.reminder, usercompany.UserID, DATE_SUB(partlot.BestBeforeDt, INTERVAL 12 DAY ) as EmailDate, User.email FROM whse.stock LEFT JOIN whse.company on whse.Company.ID = stock.CompanyID LEFT JOIN whse.warehouse on whse.stock.WareHouseID = whse.warehouse.ID LEFT JOIN whse.part on whse.stock.partID = whse.part.ID LEFT JOIN whse.partlot on whse.stock.LotID = whse.partlot.ID LEFT join whse.usercompany on whse.usercompany.companyID = stock.companyID AND whse.usercompany.notifications = TRUE LEFT JOIN whse.user on usercompany.UserID = user.ID WHERE DATE_SUB(partlot.BestBeforeDt, INTERVAL 12 DAY ) <= curdate() AND partlot.emailSent = 0")
    
    return email
}
    


module.exports = emailService;
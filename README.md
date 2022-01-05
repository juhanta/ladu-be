# warehouse app backend
* test app running in https://ladu.tammik.eu
## dependencies
* npm install express 
* npm install mysql2
* npm install bcrypt
* npm install jsonwebtoken 
* npm install nodemailer 
* npm install node-cron
## database
Database dump in database.txt

## setup
set up database 

change config.sample.js with your configuration and remove 'sample' 

install dependencies

npm start 


## Email notifications
Sends email when current date <= PartLot Expires Date - Part Reminder Days

To users that have notifications set up for that company.  



# Endpoints
**PartClass**
----
  Returns json data about active part in specific company
* **URL**
  /partclass/
* **Method:**
  `GET`
*  **URL Params**
   **Required:**
    None
* **Data Params**
    `companyId=[integer]`
 
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** {
    "partClass": [
        {
            "ID": 11,
            "description": "Süstlad"
        },
    }
 
* **Error Response:**
**PartClass**
----
## Add Part Class to Company
* **URL**
  /partclass/
* **Method:**
  `POST`
*  **URL Params**
   **Required:**
    None
* **Data Params**
    `companyId=[integer]`
    `description=[string]`
 
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** {
    "partClass": true
}
 
* **Error Response:**

**Get Company stock**
----
  Returns json data about all companys warehouses
* **URL**
  /stock/:id
* **Method:**
  `GET`
*  **URL Params**
   **Required:**

   `companyid=[integer]`

* **Data Params**

  None
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "stock": [
        {
            "companyID": 1,
            "partID": 61,
            "partNum": "GL1",
            "partDescription": "Glükomeetri testribad",
            "partClass": "Varia",
            "WareHouseCode": "W001",
            "qty": "5"
        },,]}`
 
* **Error Response:**
----
**Get Part with lot info**
----
  Returns json data with part lot info in current company/warehouse
* **URL**
  /stock
* **Method:**
  `GET`
*  **URL Params**
   **Required:**

* **Data Params**
    `companyID=[integer]`
    `partID=[integer]`
    `warehouseID=[integer]`
  None
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "stock": [
        {
            "companyID": 1,
            "warehouseCode": "W002",
            "partNum": "ML2S",
            "lotnum": "5",
            "BestBeforeDt": "2021-10-30T21:00:00.000Z",
            "qty": 7
        },]}`
 
* **Error Response:**
----

----
**Get Part with lot info**
----
  Returns json data with part lot info in current company
* **URL**
  /stock/part/:partID
* **Method:**
  `GET`
*  **URL Params**
   **Required:**
  `partID=[integer]`
* **Data Params**
    `companyID=[integer]`
    
  None
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "stock": [
        {
            "companyID": 1,
            "warehouseCode": "W002",
            "partNum": "ML2S",
            "lotnum": "2",
            "BestBeforeDt": "2021-12-10T22:00:00.000Z",
            "qty": 4
        },]}`
 
* **Error Response:**
----

**Add Company stock**
----
  Adds stock to company warehouse* 
*  **URL**
  /stock/
* **Method:**
  `POST`
*  **URL Params**
   **Required:**
* **Data Params**
   **Required:**

    `companyID=[integer]`
     
    `partNum=[integer]`

    `warehouseID=[integer]`

    `qty=[integer]`

   **Optional:**     
    `lotID=[integer]`
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
 
* **Error Response:**
----
**Part**

----
  Returns json data about active part in specific company
* **URL**
  /part/
* **Method:**
  `GET`
*  **URL Params**
   **Required:**
    None
* **Data Params**
    `companyId=[integer]`
    `partNum=[string]`
 
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** {"part": [
        {
            "ID": 2,
            "partNum": "84",
            "description": "Fexofenadine hydrochloride",
            "companyID": 1,
            "classID": 8,
            "lotTracked": 1,
            "deleted": 0,
            "reminder": 12
        }]}
 
* **Error Response:**
----
**Part**
----
  Add part to Company
* **URL**
  /part/
* **Method:**
  `POST`
*  **URL Params**
   **Required:**
    None
* **Data Params**
    `companyId=[integer]`
    `partNum=[string]`
    `description=[string]`
    `classID=[id]`
    `lotTracked=[boolean]`
    `reminder=[int]`
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 

* **Error Response:**

----
**Change Part**
----
  Change part
* **URL**
  /part/
* **Method:**
  `PATCH`
*  **URL Params**
   **Required:**
    None
* **Data Params**
    `partID=[integer]`
    `companyId=[integer]`
    `partID=[string]`
    `description=[string]`
    `classID=[id]`
    `lotTracked=[boolean]`
    `reminder=[int]`
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    {
    "status": "Muudetud"
}

* **Error Response:**

**Company**
----
  Returns companies where user has access
* **URL**
  /company/id
* **Method:**
  `GET`
*  **URL Params**
   **Required:**

   `userID=[id]`
* **Data Params**
    None
    
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** {"company": [
        {
            "ID": 1,
            "Name": "C1"
        },]}
 
* **Error Response:**

**Add Transaction**
----
  Move stock to client or inv adjustment. 
* **URL**
  /transaction
* **Method:**
  `POST`
*  **URL Params**
   **Required:**

    None
* **Data Params**
    
    `companyID=[id]`
    `warehouseID=[id]`
    `partID=[id]`
    `lotID=[id]`
    `qty=[id]`
    `comment=[string]`
    `userID=[id]`
    `transactionID=[id]`
    
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** {
    "addTransaction": true
}
 
* **Error Response:**

**Get Transaction**
----
  Get all history transactions in company 
* **URL**
  /transaction
* **Method:**
  `GET`
*  **URL Params**
   **Required:**
  `companyID=[id]`
   
* **Data Params**
     None
    
* **Success Response:**
   **Code:** 200 <br />
    **Content:** {
    "transaction": [
               {
            "ID": 18,
            "Company": "C1",
            "WareHouseCode": "W001",
            "partNum": "GL1",
            "qty": 1,
            "LotNum": "1",
            "comment": "Kliendile 15721",
            "email": "juhan.tammik@gmail.com",
            "Description": "Inventory Adjustment"
        },
    ]
}
* **Error Response:**


**Transaction Type**
----
  Get all transaction types in company
* **URL**
  /transactiontype
* **Method:**
  `GET`
*  **URL Params**
   **Required:**
   `companyID=[id]`

    
* **Data Params**
    None
    
* **Success Response:**
   **Code:** 200 <br />
    **Content:** {
    "transaction": [
        {
            "ID": 1,
            "TransCode": "invAdj",
            "Description": "Inventory Adjustment"
        },
        {
            "ID": 2,
            "TransCode": "toCustomer",
            "Description": "Transaction to Customer"
        },
        {
            "ID": 3,
            "TransCode": "toWhse",
            "Description": "Transaction to warehouse"
        }
    ]
}
* **Error Response:**
  
   

----
**PartLot**
----
  Add part lot to Company
* **URL**
  /partlot/
* **Method:**
  `POST`
*  **URL Params**
   **Required:**
    None
* **Data Params**
    `companyId=[integer]`
    `partID=[string]`
    `lotNum=[string]`
    `purchased=[date yyyy-mm-dd]`
    `bestBeforeDate=[date yyyy-mm-dd]`
    
* **Success Response:**
  {
    "addLot": [
        {
            "ID": 9,
            "lotNum": "test2",
            "companyID": 1,
            "purchased": "2021-12-27T22:00:00.000Z",
            "bestBeforeDt": "2021-12-28T22:00:00.000Z",
            "deleted": 0,
            "emailSent": 0,
            "partID": 61
        }
    ]
}
  * **Code:** 200 <br />
    **Content:** 

* **Error Response:**

----
# warehouse app backend
* test app running in https://ladu.tammik.eu
## dependencies
* npm install express 
* npm install mysql2
* npm install bcrypt
* npm install jsonwebtoken 
* npm install nodemailer 
* npm install node-cron


## Email notifications
Sends email when current date <= PartLot Expires Date - Part Reminder Days

To users that have notifications set up for that company.  



# Endpoints

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



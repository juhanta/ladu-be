# warehouse app backend
* test app running in https://ladu.tammik.eu
## dependencies
* npm install express 
* npm install mysql2
* npm install bcrypt
* npm install jsonwebtoken 


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

   `id=[integer]`

* **Data Params**

  None
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "stock": [
        {
            "ID": 3,
            "Company Name": "C1",
            "WareHouseCode": "W001",
            "PartNum": "84",
            "Description": "Fexofenadine hydrochloride",
            "Qty": 5,
            "LotNum": "1",
            "BestBeforeDt": "2021-11-10T22:00:00.000Z"
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



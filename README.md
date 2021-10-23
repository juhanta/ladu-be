# ladu
# Nõuded
* npm install express 
* npm install mysql2
* npm install bcrypt
* npm install jsonwebtoken 

# Endpoints

**Company stock**
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
        },
        
    ]}`
 
* **Error Response:**
* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/users/1",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```




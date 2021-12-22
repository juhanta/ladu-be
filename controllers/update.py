import requests
import xml.etree.ElementTree as ET
import pyodbc
import os
from datetime import date, timedelta
yesterday = date.today() - timedelta(days=1)
yesterday1 = yesterday

URL = "http://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml"

response = requests.get(URL)
with open('feed.xml', 'wb') as file:
    file.write(response.content)

tree = ET.parse("feed.xml")
root = tree.getroot()
cur = 0
for child in root:
    for subchild in child:
        for subsubchild in subchild:
            if(subsubchild.attrib['currency'] == "NOK"):
                # print(subsubchild.attrib['currency'])
                # print(subsubchild.attrib['rate'])
                cur = subsubchild.attrib['rate']


print(cur)


conn = pyodbc.connect(
                    Trusted_Connection='No',
                      DRIVER='{SQL Server Native Client 11.0}',
                      Server='BESTEPICOR',
                      Database='ERP10PILOT',
                      UID='omahind',
                      PWD='Oh24pB5Rma7'

                      )

cursor = conn.cursor()
cursor.execute("SELECT [InvcDtl].PartNum, [InvcHead].InvoiceDate, InvcDtl.InvoiceNum, [InvcDtl].Company, Part.TypeCode, [ESTCost_c], [CurRate_c], CASE WHEN TypeCode='K' THEN _KSI_SalesKitCost.ACost ELSE _KSI_PartCOST.Cost END AS Cost FROM InvcDtl LEFT JOIN Erp.Part ON InvcDtl.PartNum=Erp.Part.PartNum AND InvcDtl.Company=Part.Company LEFT JOIN dbo._KSI_PartCOST ON InvcDtl.Partnum=_KSI_PartCOST.PartNum LEFT JOIN InvcHead ON InvcHead.InvoiceNum=InvcDtl.InvoiceNum LEFT JOIN _KSI_SalesKitCost ON InvcDtl.PartNum=_KSI_SalesKitCost.PartNum AND InvcDtl.Company=_KSI_SalesKitCost.Company WHERE(ESTCost_c=0) AND(InvcDtl.Company LIKE 'TikiTilh' OR InvcDtl.Company LIKE 'BESTFIN3') AND([InvcHead].InvoiceDate > '12/12/21') ORDER BY InvoiceDate DESC")


result = cursor.fetchall()
print(result)
pikkus = len(result)


if(pikkus > 0):
    for i in range(pikkus):
        if(result[i][3] == 'BESTFIN3'):
            if(result[i][7] == None):
                result[i][7] = 0.00

            sql = (
                'UPDATE InvcDtl SET ESTCOST_c = ? WHERE PartNum = ? AND InvoiceNum = ?')
            val = (result[i][7], result[i][0], result[i][2])
            cursor.execute(sql, val)
            #print(result[i][7], result[i][0], result[i][2])
            # print("Fin")
            cursor.commit()
        if(result[i][3] == 'TikiTilh'):
            if(result[i][7] == None):
                result[i][7] = 0.00
            sql1 = (
                'UPDATE InvcDtl SET ESTCOST_c = ?, CurRate_C = ? WHERE PartNum = ? AND InvoiceNum = ?')
            val1 = (result[i][7], cur, result[i][0], result[i][2])
            cursor.execute(sql1, val1)
            cursor.commit()
            print("nor")
    print(result[0])
    print(pikkus)

else:
    print("Pole invoice")


cursor.close()
conn.close()
if os.path.exists("feed.xml"):
    os.remove("feed.xml")

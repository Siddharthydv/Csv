const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const newCsv = require('./newCsv');
 function HdfcController(inputFile,outputFile)
{
    
    const results = [];
    let zone="Domestic";
    let Person="";
    fs.createReadStream(inputFile)
    .pipe(csv({
        mapHeaders: ({ header, index }) => {
            // Use first row as actual headers, trim spaces
            const headers = ["Date","Transaction Details", "Debit", "Credit", ];
            return headers[index] ? headers[index].trim() : null;
        },
        skipLines: 1 // Skip the first row (which contains actual headers)
    }))
    .on('data', (row) => {
       
        if (Object.values(row).some(value => value && value.trim() !== '')) {

        if(row['Transaction Details']==="International Transactions")
        {
            
            zone="International"
            Person="";
        }
        else if(row['Transaction Details']==="Rahul"|| row['Transaction Details']==="Ritu")
            Person=row['Transaction Details'];
        if(Person!=="")
        {
        row.PersonName=Person;
        if(row.Debit.includes('cr'))
            row.Debit=row.Debit.slice(0,-2);
        if(row.Credit==='')
            row.Credit=0;

        
        if(zone==="Domestic")
            {
                row.Currency="INR";
                const str = row['Transaction Details'];
    
                // Split string into words
                const words = row['Transaction Details'].trim().split(/\s+/);
    
                // Extract city (last word)
                const city = words.pop();
    
               
                row.Place=city;
            }   
            else{
                row.Currency=row['Transaction Details'].slice(-3);
                const words = row['Transaction Details'].trim().split(/\s+/);
    
                // Extract city (last word)
                words.pop();
                row.Place=words.pop()
            }
        row.Zone=zone;
        
        }
            // console.log(row)
            results.push(row);
        }
    })
    .on('end', () => {
       
        const res=results.filter(row=>row.Date!=='Date      '&& row.Date!=='')
        res.sort((a, b) => {
            const dateA = new Date(a.Date.split("-").reverse().join("-")); // Convert "DD-MM-YYYY" to "YYYY-MM-DD"
            const dateB = new Date(b.Date.split("-").reverse().join("-"));
            return dateA - dateB;
        });
        console.log('Cleaned CSV Data:', res);
        newCsv(res,inputFile,outputFile)
    });
}

module.exports=HdfcController;
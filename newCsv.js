const fs = require('fs');
const { Parser } = require('json2csv');

// Sample array of objects
// const data = [
//     { name: "Alice", age: 25, city: "New York" },
//     { name: "Bob", age: 30, city: "Los Angeles" },
//     { name: "Charlie", age: 35, city: "Chicago" }
// ];
function newCsv(data,inputFile,outputFile){
    // console.log(inputFile)
    // Convert JSON to CSV
    console.log("hello")
    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(data);

    // Save CSV to a file
    console.log(outputFile)
    fs.writeFileSync(`${outputFile}`, csv, "utf8");

    console.log("CSV file created successfully!");
}
module.exports=newCsv;

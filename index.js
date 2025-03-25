const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { parse } = require('date-fns');
const AxisController=require('./AxisController')
const HdfcController=require('./HdfcController')
const IciciController=require('./IciciController');
const IdfcController = require('./IdfcController');

// Function to parse and normalize date

// Standardize CSV function
const StandardizeStatement = (inputFile, outputFile) => {
    console.log(inputFile)
    if(inputFile.includes("Axis"))
        AxisController(inputFile,outputFile);
    else if(inputFile.includes('HDFC'))
        HdfcController(inputFile,outputFile);
    else if(inputFile.includes('ICICI'))
        IciciController(inputFile,outputFile)
    else
        IdfcController(inputFile,outputFile);
};

// Example usage
const files = [
    'Axis-Input-Case3.csv',
    // 'HDFC-Input-Case1.csv',
    // 'ICICI-Input-Case2.csv',
    // 'IDFC-Input-Case4.csv'
];

files.forEach(file => {
    const outputFile = file.replace('Input', 'Output');
    console.log(outputFile)
    StandardizeStatement(path.join(__dirname, file), outputFile);
});

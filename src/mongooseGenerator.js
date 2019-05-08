const generator = require('mongoose-gen');
const mongoose = require('mongoose');

// var FoodSchema = new mongoose.Schema(generator.convert(fooditem));
// var FoodModel = mongoose.model('Food', FoodSchema);
const XLSX = require('xlsx');

const workbook = XLSX.readFile('data212.xlsx');
const sheet_name_list = workbook.SheetNames;
const dataObj = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
var fs = require('fs');
var readline = require('readline');
var array = [];
var input = null;
var rd = readline.createInterface({
    input: fs.createReadStream(__dirname+'/data.txt')
    
});

rd.on('line', function(line) {
    array.push(JSON.parse(line));
});
rd.on('close', function(d){
  array.forEach(e=>console.log(e.action))
})
console.log(rd);

// for(var laptopItem in FoodModel){
    //     laptopItem._id = new mongoose.Types.ObjectId();
    //     new Food(FoodModel[laptopItem])
    //       .save()
    //       .catch((err)=>{
    //         console.log(err.message);
    //       });

 

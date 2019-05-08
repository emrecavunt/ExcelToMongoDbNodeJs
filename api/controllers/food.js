const mongoose = require('mongoose');
const Food = require('../models/food');
const XLSX = require('xlsx');


exports.food_getAll = (req, res, next) => {
    Food.find()
        .select('name healthPoint')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                foods: docs.map(doc => {
                    return {
                        name: doc.name,
                        healthPoint: doc.healthPoint,
                        _id: doc._id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/foods' + doc._name
                        }
                    }
                })
            }
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.food_Add = (req, res, next) => {
    const food = new Food({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        healthPoint: req.body.healthPoint,
        karbonhidrat: req.body.karbonhidrat,
        protein: req.body.protein,
        fat: req.body.fat,
        lif: req.body.lif,
        kolestrol: req.body.kolestrol,
        sodyum: req.body.sodyum,
        potasyum: req.body.potasyum,
        kalsiyum: req.body.kalsiyum,
        vitaminA: req.body.vitaminA,
        vitaminB: req.body.vitaminB,
        demir: req.body.demir
    });

    food.save().then(result => {
            console.log(result);
            res.status(201).json({
                message: 'food Created',
                createdFood: {
                    name: result.name,
                    healthPoint: result.healthPoint,
                    karbonhidrat: result.karbonhidrat,
                    protein: result.protein,
                    fat: result.fat,
                    lif: result.fit,
                    kolestrol: result.kolestrol,
                    sodyum: result.sodyum,
                    potasyum: result.potasyum,
                    kalsiyum: result.kalsiyum,
                    vitaminA: result.vitaminA,
                    vitaminB: result.vitaminB,
                    demir: result.demir,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/foods/' + result.name
                    }
                }
            });
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            });
        });

};

exports.food_GetByName = (req, res, next) => {
    const name = req.params.foodname;
    Food.find({
            'name': name
        })
        .select('name healthPoint').exec()
        .then(doc => {
            console.log("From DB:", doc);
            if (doc) {
                res.status(200).json({
                    name: doc.name,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/foods'
                    }
                });
            } else {
                res.status(404).json({
                    message: 'No valid entry found'
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.food_Update = (req, res, next) => {
    const _name = req.params.foodname;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Food.update({
            name: _name
        }, {
            $set: update
        }).exec()
        .then(result => {
            res.status(200).json({
                message: 'Food Updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/foods/' + _name
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })

};

exports.food_Delete = (req, res, next) => {
    const name = req.params.foodname;
    Food.remove({
            name: name
        }).exec()
        .then(result => {
            res.status(200).json({
                message: 'Food deleted',
                request: {
                    type: 'POSt',
                    url: 'http://localhost:3000/foods',
                    body: {
                        name: 'String',
                        healthPoint: 'String'
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.import = function (req, res) {

    //ReadsFile to Json
    const workbook = XLSX.readFile('data212.xlsx');
    const sheet_name_list = workbook.SheetNames;
    const dataObj = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    
        Food.collection.insertMany(dataObj, function (err, docs) {
            if (err){ 
                return console.error(err);
            } else {
              return res.status(200).json({
                message: 'Multiple documents inserted to Collection',
                dataObj
            });
            }
          });
  };


exports.food_delete_all = (req, res, next) => {

    Food.collection.remove({},function(err, result){
        // handle the error if any
        if (err){
            res.status(500).json({
                message: err
            });
        }   
        res.status(200).json({
            message: 'Foods deleted',
        });
    });   
}

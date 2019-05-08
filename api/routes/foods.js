const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest:'/uploads/'});
const checkAuth = require('../middleware/check-auth');
const FoodController = require('../controllers/food');


router.get('/',FoodController.food_getAll);

router.post('/',checkAuth,FoodController.food_Add);

router.get('/:foodname',FoodController.food_GetByName);

router.patch('/:foodname',checkAuth,FoodController.food_Update);

router.delete('/:foodname',checkAuth,FoodController.food_Delete);

router.delete('/delete/all',FoodController.food_delete_all);

router.get('/import/all', FoodController.import);



module.exports=router;

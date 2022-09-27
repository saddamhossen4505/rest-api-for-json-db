const express = require('express');
const { getAllUser, createUser, getSingleUser, deleteUserData, updateUserData } = require('../controllers/userController');




// Init Router.
const router = express.Router();


// User routes.
router.route('/').get(getAllUser).post(createUser);
router.route('/:id').get(getSingleUser).delete(deleteUserData).put(updateUserData).patch(updateUserData)



// Exports Router.
module.exports = router;
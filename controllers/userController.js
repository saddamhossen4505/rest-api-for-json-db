const path = require('path');
const { readFileSync, writeFileSync } = require('fs');
const { json } = require('express');

/**
 * @desc Get All User Route
 * @name GET /api/v1/user
 * @access public
 */

const getAllUser = (req, res) => {

    // Get all Data.
    const users = JSON.parse(readFileSync(path.join(__dirname, '../db/user.json')));

    // Send-Data.
    res.status(200).json( users );

};




/**
 * @desc Create a User
 * @name POST /api/v1/user
 * @access public
 */

 const createUser = (req, res) => {

    // Get all Data.
    const users = JSON.parse(readFileSync(path.join(__dirname, '../db/user.json')));

    // GetData from body.
    const { name, email, cell } = req.body;

    // Create ID.
    const id = Math.floor(Math.random() * 100000000).toString();

    // Form-Validation.
    if( !name, !email, !cell ){

        res.status(400).json({
            message : "All field are required."
        });

    }else{

        // NewData Add to JSON db.
        users.push({
            id, name, email, cell
        });

        // Now StoreData to JSON db.
        writeFileSync(path.join(__dirname, '../db/user.json'), JSON.stringify(users));

        res.status(201).json({
            message : 'User Created Successfully.'
        });

    };
};



/**
 * @desc GET SINGLE-USER
 * @name GET /api/v1/user/:id
 * @access public
 */
const getSingleUser = (req, res) => {

    // Get all Data.
    const users = JSON.parse(readFileSync(path.join(__dirname, '../db/user.json')));

    // findID.
    const { id } = req.params;

    // Find Data to JSON db.
    const singleData = users.find( data => data.id == id );

    if(singleData){
        res.status(200).json(singleData);
    }else{
        res.status(404).json({
            message : " 404 Data Not-Found."
        });
    };
};





/**
 * @desc DELETE USER-DATA.
 * @name DELETE /api/v1/user/:id
 * @access public
 */
const deleteUserData = (req, res) => {

    // Get all Data.
    const users = JSON.parse(readFileSync(path.join(__dirname, '../db/user.json')));

    // findID.
    const { id } = req.params;

    if( users.some( data => data.id == id )){

        // GetAll Data without DeleteData.
        const newData = users.filter( data => data.id != id );

        // Now Store AllData without DeleteData.
        writeFileSync(path.join(__dirname, '../db/user.json'), JSON.stringify(newData));
        res.status(200).json({
            message : "User Data Delete Successfully."
        });

    }else{

        res.status(404).json({
            message : "User Data Not found."
        });

    };
};





/**
 * @desc UPDATE USER-DATA.
 * @name PUT/PATCH /api/v1/user/:id
 * @access public
 */
 const updateUserData = (req, res) => {

    // Get all Data.
    const users = JSON.parse(readFileSync(path.join(__dirname, '../db/user.json')));

    // findID.
    const { id } = req.params;

    if( users.some( data => data.id == id )){

        // GetAll Data without DeleteData.
        const index = users.findIndex( data => data.id == id );

        users[index] = {
            ...users[index],
            ...req.body
        };

        // Now Store AllData without DeleteData.
        writeFileSync(path.join(__dirname, '../db/user.json'), JSON.stringify(users));
        res.status(200).json({
            message : "User Data Update Successfully."
        });

    }else{

        res.status(404).json({
            message : "User Data Not found."
        });

    };
};



// Exports Controller.
module.exports = {
    getAllUser,
    createUser,
    getSingleUser,
    deleteUserData,
    updateUserData
};
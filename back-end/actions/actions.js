const express = require('express');
const userActions = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/users.js')
userActions.use(cors())

// CREATE SIGN-UP ROUTE
userActions.post('/signup', (req, res) => {

    const userData = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        mobilenumber: req.body.mobilenumber,
        dateofbirth: req.body.dateofbirth,
        gender: req.body.gender
    }
// CHECK IF THE GIVEN USER'S EMAIL ALREADY EXISTS
    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            // IF NOT ENCRYPT THE PASSWORD AND CREATE USER'S PROFILE USING THE USERDATA PROVIDED TO US BY THE USER
            if (!user) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    userData.password = hash
                    User.create(userData)
                        .then(user => {
                            res.status(201).json({ status: 'User' + user.email + 'Successfully Registered!' })
                        })
                        .catch(err => {
                            res.status(500).send("Error: " + err);
                        })
                })
            } else {
                res.status(409).json({ message: 'User already exists' })
            }
        })
        .catch(err => {
            res.status(500).send("Error: " + err)
        })
})

// CREATE SIGN-IN ROUTE
userActions.post('/signin', (req, res) => {
// FIND THE USER THROUGH THEIR USERNAME SUBMITION
    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            // IF THE PASSWORD PROVIDED IS CORRECT ASSIGN THE TOKEN TO THE USER
            if (user) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    const token = jwt.sign({ user: user }, "secretKey", {
                    expiresIn: 86400 // 24 hours
                    })
                    res.status(200).send({ authentication: true, token: token, user: user })
                }
            } else {
                res.status(404).json({ message: 'User Not Found.' })
            }
        })
        .catch(err => {
            res.status(500).send("Error: " + err)
        })
})

// VERIFY THE TOKEN AND SEPERATE IT FROM THE HEADER
verifyToken = (req, res, next) => {
    
    const bearerHeader = req.headers['authorization'];
  
	if (!bearerHeader){
		return res.status(403).send({ 
			auth: false, message: 'No token provided.' 
		});
	} else{
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
    }
    next();
}

// CREATE USER'S PROFILE ROUTE
userActions.post('/profile', verifyToken, (req, res) => {
// PROVIDE THE TOKEN TO AUTHORIZE PROFILE AND GET BACK USER'S DATA
	jwt.verify(req.token, "secretKey", (err, userData) => {
		if (err){
			return res.status(500).send({ 
					auth: false, 
					message: 'Fail to Authentication. Error -> ' + err 
				});
        } else{
            res.json(userData);
        }
    });
    
})

// CREATE DELETE ROUTE
userActions.delete('/deleteaccount', (req, res) => {
// FIND THE USER THROUGH THEIR EMAIL SUBMITION
    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            if (user) {
            // IF THE PASSWORD PROVIDED IS CORRECT DELETE USER'S PROFILE
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    User.destroy({
                        where: {
                            email: req.body.email
                        }
                    })
                    res.status(200).json({
                        message: "User deleted"
                    })
                }
            } else {
                res.status(404).json({ message: 'User Not Found.' })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

userActions.get('/signout', (req, res) =>{
    res.clearCookie("token")
    return res.json({
        message: "signout success"
    })
});

module.exports = userActions;

// NON USED CODE

/*
userActions.get('/profile', verifyToken, (req, res) => {

    const decoded = jwt.verify(req.headers['authorization'], "secretKey")

    User.findOne({
        where: {
            // id: req.body.id,
            id: decoded.id
        }
    })
        .then(user => {
            if (user) {
                res.json(user)
            } else {
                res.send('User does not exist')
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
        

    User.findOne({
        where: { id: req.userId },
        attributes: ['name', 'username', 'email'],
        include: [{
            model: Role,
            attributes: ['id', 'name'],
            through: {
                attributes: ['userId', 'roleId'],
            }
        }]
    }).then(user => {
        res.status(200).json({
            "description": "User Content Page",
            "user": user
        });
    }).catch(err => {
        res.status(500).json({
            "description": "Can not access User Page",
            "error": err
        });
    })
    

})

// ADMIN'S DELETE OPERATION
userActions.delete('/delete/:userId', (req, res) => {

    User.destroy({
        where: {
            id: req.params.userId
        }
    })
        .then(result => {
            res.status(200).json({
                message: "User deleted"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});
*/
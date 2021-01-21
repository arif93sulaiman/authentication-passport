const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const passport = require('passport')


//model
const User = require('../models/Users')

//login
router.get('/login', (req, res) => {
    res.render('login')
})
//register
router.get('/register', (req, res) => {
    res.render('register')
})
//register handle
router.post('/register' , (req, res) => {
    const {name, email, password, password2} = req.body
    let errors = []
    //check required fields
     if (!name || !email || !password || !password2) {
         errors.push({msg: "please fill in all fields"})
     }

     if (password !== password2) {
        errors.push({msg: "password not match"})
     }

     if (password.length < 6 ) {
        errors.push({msg: "password must be more than 6 characters"})
     }
    
     if (errors.length > 0) {
         res.render('register', {errors, name, email, password, password2})   
     } else { 
         //validation passed
        User.findOne({email:email})
            .then(user => {
                if(user){
                    //user exist
                    errors.push({msg: "Email already registered"})
                    res.render('register', {errors, name, email, password, password2}) 
                } else {
                    //creating the model must use new key word
                    const newUser = new User({
                        name,
                        email,
                        password
                    })
                    //hashed password
                    bcrypt.genSalt(10, (err, salt) => 
                        bcrypt.hash(newUser.password, salt, (err, hash)=> {
                           if (err) throw err 
                           // set password to hashed
                           newUser.password = hash
                           // save user 
                           newUser.save()
                            .then(user => {
                                req.flash('success_msg', 'you are now registered and can log in')
                                res.redirect('/users/login')
                            })
                            .catch(err => console.log(err))
                    }))
                }
            })
     }
})


//login handle
router.post('/login', (req, res, next) => {
    passport.authenticate('local', { 
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true 
    })(req, res, next)
})

module.exports = router
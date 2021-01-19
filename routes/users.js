const express = require('express')
const router = express.Router()
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

     }
})


module.exports = router
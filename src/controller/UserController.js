 const {User} = require('../model/index')
 const passport = require('passport')
 const controller = {};

controller.renderSignupForm = (req,res)=>{
    res.render('user/signup',{signup:true})
}


controller.signup = async (req,res)=>{
    const errors=[]
    const {email, name, password , password2} = req.body
    const emailVerify = await User.findOne({email:email})

    if(emailVerify){
        errors.push({text:'Email realmente  existe'})
    }

    if(password !== password2){
         errors.push({text:'Password no coinciden '})
    }
    if(password.length < 6){
         errors.push({text:'Password debe tener al menos 6 caracteres '})
    }
    if(errors.length > 0){
       res.render('user/signup',{errors, email, name})
    }else{
        const user = new User({
            name, email, password
        })
        user.password = await user.encryptPassword(password)
        await user.save();
        req.flash('success','user was created :)')
        res.redirect('/signin')
    }
   
}


controller.renderSigninForm = (req,res)=>{
    res.render('user/signin',{signin:true})
}


controller.signin = passport.authenticate('login',{
     failureRedirect:'/signin',
     successRedirect:'/notes',
     failureFlash:true
}),(req,res)=>{
    
}
controller.logout = (req,res)=>{
    req.logout();
    req.flash('success','tu seccion ha finalizado')
    res.redirect('/signin')
}
module.exports = controller;
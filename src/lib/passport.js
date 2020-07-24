const {Strategy} = require('passport-local')
const passport = require('passport')
const {User} = require('../model/index')

passport.use('login', new Strategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true
},async (req,email, password, done)=>{
      const user = await User.findOne({email})
      if(!user){
           done(null, false, req.flash('error','email no essta registrado'))
      }else {
        const verify_password = await user.comparePassword(password);
          if(verify_password){
           done(null, user)
          }else {
            
            done(null, false, req.flash('error','password incorrecto')) 
          }
      }
}))

passport.serializeUser ((user, done)=>{
     done(null, user.id)
})

passport.deserializeUser((id, done)=>{
     User.findById(id,(err, user)=>{
        done(err, user) 
    })
})
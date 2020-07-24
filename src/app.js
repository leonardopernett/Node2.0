const express = require('express'),
      morgan  = require('morgan'),
      errHandle  = require('errorhandler'),
      path  = require('path'),
      hbs  = require('express-handlebars'),
      session = require('express-session'),
      passport  = require('passport'),
      flash = require('connect-flash'),
      methodOverride = require('method-override')

//initialization
const app = express();

require('./lib/passport')

//initialization
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname,'views'))
app.engine('.hbs', hbs({
    defaultLayout:'main',
    layoutsDir:path.join(app.get('views'),'layout'),
    partialsDir:path.join(app.get('views'),'partial'),
    extname:'.hbs',
    helpers:require('./config/handlebars')
}))
app.set('view engine', '.hbs')


//middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
}))

app.use(flash())
app.use(methodOverride('_method'))
app.use(passport.initialize())
app.use(passport.session())

//variable global
app.use((req,res,next)=>{
  app.locals.success = req.flash('success')
  app.locals.error = req.flash('error')
  app.locals.user= req.user || null
    next()
})
//router
app.use(require('./router/index.router'))
app.use('/notes',require('./router/notes.router'))
app.use(require('./router/user.router'))

//static
app.use(express.static(path.join(__dirname,'public')))

//error 404
app.get('*',(req,res, next)=>{
   res.json({
       message:'error 404 page not found'
   })
})

//error
if(process.env.NODE_ENV !=="production"){
    app.use(errHandle())
}
module.exports=app
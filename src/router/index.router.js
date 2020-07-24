const {Router} = require('express');
const router = Router();



router.get('/',(req,res)=>{
    res.render('index',{home : true})
})

router.get('/about',(req,res)=>{
    res.render('about',{about : true})
})


module.exports = router ;
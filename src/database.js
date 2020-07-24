const mongoose = require('mongoose');
const {db} = require('./key')

const config= {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex:true
}
const connection = async ()=>{
    try {
        await mongoose.connect(db,config)
        console.log('db is connected')  
    } catch (error) {
        console.error(error)
        process.exit(0);
    }
}

module.exports={connection}
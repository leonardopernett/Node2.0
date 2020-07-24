const {Schema , model} = require('mongoose')


const notesSchema = new Schema({
    title:{type:String, required:true},
    description:{type:String, required:true},
    user_id:{type:String},
},{
    timestamps:true
})


module.exports=model('Note', notesSchema)
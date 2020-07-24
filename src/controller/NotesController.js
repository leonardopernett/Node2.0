const {Note} = require('../model/index')

exports.getNotes =  async (req,res)=>{
    const notes = await Note.find({user_id:req.user.id}).sort({createdAt:-1}).lean();
    res.render('notes/index',{notes})
}

exports.addNotes = (req,res)=>{
  res.render('notes/add');
}

exports.saveNotes = async (req,res)=>{
    const newNote = {
        title:req.body.title,
        description:req.body.description,
        user_id:req.user.id
    }
    const note = new Note(newNote);
    await note.save();
    req.flash('success','notes saved successfully')
    res.redirect('/notes')
}

exports.deleteNotes = async (req,res)=>{
    await Note.deleteOne({_id:req.params.id})
    req.flash('success','notes was deleted')
    res.redirect('/notes')
}

exports.editNotes = async (req,res)=>{
    const note = await Note.findById(req.params.id).lean();
    if(note.user_id !== req.user.id){
        req.flash('error','no tiene autorizacion ')
        return res.redirect('/notes')
    }
    res.render('notes/edit',{note:note})
}

exports.updateNotes = async (req,res)=>{
    const {title, description}= req.body
    const {id}= req.params;
    await Note.updateOne({_id:id},{title, description})
    res.redirect('/notes')
}
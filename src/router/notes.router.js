const {Router} = require('express');
const router = Router();
const {isAuthenticated} = require('../lib/auth')
const {addNotes, getNotes, saveNotes,deleteNotes,editNotes,updateNotes} = require('../controller/NotesController')

router.get('/', isAuthenticated,getNotes)
router.get('/add', isAuthenticated,  addNotes)
router.post('/save',saveNotes)
router.delete('/delete/:id', deleteNotes)
router.get('/edit/:id', isAuthenticated ,editNotes)
router.put('/update/:id', updateNotes)

module.exports = router ;
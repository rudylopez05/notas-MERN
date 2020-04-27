const {Router} = require('express');
const router = Router();
const { getNotes, getNote, createNote, updateNote, deleteNotes } = require('../controllers/notes.controller');



router.route('/')
    .get(getNotes)
    .post(createNote)


router.route('/:id')
    .get(getNote)
    .put(updateNote)
    .delete(deleteNotes)

    

module.exports = router;
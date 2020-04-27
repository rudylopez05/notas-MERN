const { Router } = require('express');
const router = Router();
const { getUsers, createUser, deleteUser } = require('../controllers/users.controllers');

router.route('/')
    .get(getUsers)
    .post(createUser)


router.route('/:id')
    //.get(req,res)
    //.put()
   .delete(deleteUser)



module.exports = router;
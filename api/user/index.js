const { Router } = require('express');
const {
    getUsers,
    getUserById,
    createUser
} = require('./user.controller');


const router = Router();

router.get('/', getUsers);
router.get('/:id', getUserById)
router.post('/', createUser)

module.exports = router;
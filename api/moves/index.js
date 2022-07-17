const { Router } = require('express');
const {
    getMoves,
    getMoveById,
    createMove,
    getMovesByUser
} = require('./moves.controller');
const {isAuth} = require('../../auth/auth.service');

const router = Router();

router.get('/',isAuth(), getMoves);
router.get('/:id', getMoveById)
router.get('/user/:id', getMovesByUser)
router.post('/',isAuth(), createMove)

module.exports = router;
const { Router } = require('express')
const UserController = require('./controllers/user')

const router = Router()

router.get('/', UserController.getUsers)

router.get('/refresh-list', UserController.refreshUserList)

router.put('/:id', UserController.UpdateUser)

router.patch('/like/:id', UserController.updateLike)

router.patch('/remove-like/:id', UserController.removeLike)

router.delete('/:id', UserController.deleteUser)

module.exports = router

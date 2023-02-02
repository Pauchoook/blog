const Router = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = new Router();

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.get('/auth', authMiddleware, userController.check);
router.get('/:id', userController.getOne);
router.put('/', userController.updateUser);
router.put('/avatar/:id', userController.updateAvatar);
router.delete('/:id', userController.delete);

module.exports = router;
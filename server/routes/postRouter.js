const Router = require('express');
const postController = require('../controllers/postController');
const router = new Router();

router.post('/', postController.create);
router.get('/', postController.getAll);
router.get('/:id', postController.getOne);
router.put('/', postController.update);
router.delete('/:id', postController.delete);

module.exports = router;
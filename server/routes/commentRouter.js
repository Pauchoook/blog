const Router = require('express');
const router = new Router();
const commentController = require('../controllers/commentController');

router.post('/', commentController.create);
router.get('/', commentController.get);
router.delete('/:id', commentController.deleteComment);

module.exports = router;
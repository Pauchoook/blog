const Router = require('express');
const router = new Router();
const likeController = require('../controllers/likeController');

router.post('/post', likeController.likedPost);
router.post('/comment', likeController.likedComment);

module.exports = router;
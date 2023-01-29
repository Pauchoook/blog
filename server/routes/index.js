const Router = require('express');
const router = new Router();
const userRouter = require('./userRouter');
const postRouter = require('./postRouter');
const commentRouter = require('./commentRouter');
const likeRouter = require('./likeRouter');
const subscriberRouter = require('./subscriberRouter');
const ownerRouter = require('./ownerRouter');
const typeRouter = require('./typeRouter');

router.use('/user', userRouter);
router.use('/post', postRouter);
router.use('/comment', commentRouter);
router.use('/like', likeRouter);
router.use('/subscriber', subscriberRouter);
router.use('/owner', ownerRouter);
router.use('/type', typeRouter);

module.exports = router;
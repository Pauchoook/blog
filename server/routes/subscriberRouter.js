const Router = require('express');
const subscriberController = require('../controllers/subscriberController');
const router = new Router();

router.post('/', subscriberController.create); // подписаться
router.get('/', subscriberController.findSubscribers); // получить подписчиков

module.exports = router;
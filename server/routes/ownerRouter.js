const Router = require('express');
const ownerController = require('../controllers/ownerController');
const router = new Router();

router.get('/', ownerController.findOwners); // получить тех, на кого подписан
router.get('/subscription', ownerController.findOne); // получить тех, на кого подписан

module.exports = router;
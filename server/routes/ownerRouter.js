const Router = require('express');
const ownerController = require('../controllers/ownerController');
const router = new Router();

router.get('/', ownerController.findOwners); // получить тех, на кого подписан
router.get('/:id', ownerController.findOne); // получить тех, на кого подписан
router.delete('/', ownerController.unsubscribe); // отписка

module.exports = router;
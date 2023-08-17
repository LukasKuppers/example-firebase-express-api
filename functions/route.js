const { Router } = require('express');
const fooController = require('./controllers/foo.js');


// init
const router = Router();


// routes
router.get('/helloworld', fooController.helloWorld);
router.get('/time', fooController.time);


module.exports = router;

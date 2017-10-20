const router = require("express").Router();

router.get('/test', (req, res) => {
    res.send('hhe');
});
module.exports = router;
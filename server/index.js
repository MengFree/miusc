const router = require("express").Router();
const axios = require('axios');

router.get('/test', (req, res) => {
    res.send('hhe');
});

router.get('/playlist/list', (req, res) => {
    let url = 'http://music.163.com/api/playlist/list';
    let query = req.query;
    let params = {
        cat: '全部',
        order: 'hot',
        offset: 0,
        limit: 6
    };
    if (query) {
        for (var key in query) {
            if (query.hasOwnProperty(key)) {
                params[key] = query[key];
            }
        }
    }
    axios.get(
        url, {
            params: params
        }
    ).then($res => {
        console.log($res.data);
        res.json($res.data)
    })
});
router.get('/playlist/detail', (req, res) => {
    let url = 'http://music.163.com/api/playlist/detail?id=' + req.query.id;
    axios.get(url).then($res => {
        console.log($res.data);
        res.json($res.data)
    })
});

module.exports = router;
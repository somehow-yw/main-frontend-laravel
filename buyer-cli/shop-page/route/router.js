var path = require('path'),
    express = require('express'),
    router = express.Router();

// 过滤掉路径中的‘\route’
var static_root = __dirname.replace(/\\route$/,'') + '/mock';

function getOptions(){
    return {
        root: static_root,
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    }
}

router.use(function timeLog(req, res, next){
    console.log('Time: ', Date.now());
    next();
});

module.exports = router;

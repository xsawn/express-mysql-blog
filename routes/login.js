/* 
* @Author: shawn_xu
* @Date:   2018-04-27 21:10:02
* @Last Modified by:   shawn_xu
* @Last Modified time: 2018-04-27 21:21:09
*/

'use strict';

var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/login', function(req, res, next) {console.log('router ...login')
  res.render('login', { title: 'login' });
});

module.exports = router;
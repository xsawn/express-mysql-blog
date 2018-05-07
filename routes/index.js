var express = require('express');
var router = express.Router();
var myConnect = require('../info/users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'blog' });
});

/* 登陆 */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'login' });
});

router.post('/login', function(req, res, next) {
	myConnect.login(req, res)
});

/* userInfo */
router.get('/user', function(req, res, next) {
	if(req.session.loginInfo) {
		res.render('user')
	} else {
		res.redirect('/login')
	}
});
router.get('/userinfo', function(req, res, next) {
	let loginInfo = req.session.loginInfo
	if(loginInfo) { 
		console.log('GET /userinfo 已登录,欢迎：', loginInfo.account)
		let resData = {
							success: true,
							user: {name: loginInfo.account}
						}
		res.send(resData)

	} else {
		res.send('not login')
	}
});

/* 退出 */
router.get('/logout', function(req, res, next){
	req.session.user = null;
	// res.redirect('/')
	res.send({success: true})
})

/* 注册 */
router.get('/regist', function(req, res, next) {
  res.render('regist', { title: 'regist' });
});

router.post('/regist', function(req, res, next) {
	myConnect.regist(req, res)
});



module.exports = router;

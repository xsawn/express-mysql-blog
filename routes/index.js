var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'blog' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'login' });
});

router.post('/login', function(req, res, next) {
	let params = req.body; console.log(req.body)
	if(params.account === 'shawn') {
		console.log('登陆成功，欢迎', params.account);
		let loginInfo = {
			isLogin: true,
			account: params.account
		}
		req.session.loginInfo = loginInfo;
		let resData = {
			success: true,
		}
		res.cookie('account', 'shawn', {signed: true})
		res.send(resData)
	} else {
		res.send({
			success: false,
			message: 'not shawn'
		})
	}

	
  // res.render('login', { title: 'login' });
});

router.get('/user', function(req, res, next) {
	if(req.session.loginInfo) {
		res.render('user')
	} else {
		res.redirect('/login')
	}
});
router.get('/userinfo', function(req, res, next) {
	let loginInfo = req.session.loginInfo
	if(loginInfo) { console.log('GET /userinfo 已登录,欢迎：', loginInfo.account)
		let resData = {
							success: true,
							user: {name: loginInfo.account}
						}
		res.send(resData)

	} else {
		res.send('not login')
	}
});

// 退出
router.get('/logout', function(req, res, next){
	req.session.user = null;
	// res.redirect('/')
	res.send({success: true})
})



module.exports = router;

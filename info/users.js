
var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost', 
	port: '3306',
	user: 'root', 
	password: '123456',
	database: 'test1'
})

connection.connect();

let myConnect = {};
myConnect.connection = connection;

myConnect.login = function(req, res) {
	let params = req.body; 
	console.log('请求体：', req.body)
	// 检查用户是否存在
	let sql = `SELECT * FROM person WHERE user='${params.account}'`;
	connection.query(sql, (err, result)=>{
		if(err) {
			console.log('数据查询错误', sql)
			console.log('错误提示', err)

		} else {
			if(result && result.length > 0) {
				console.log('用户存在', sql)
				console.log('查询结果', result[0])
				let personInfo = result[0];
				if(personInfo.user === params.account && params.psd === personInfo.password) {
					console.log('账号密码都正确？personInfo', personInfo.password + '' + personInfo.user)
					console.log('params', params.psd + '' + params.account)

					// 账号密码正确
					console.log('账号密码正确， 登陆成功')
					let loginInfo = {
						isLogin: true,
						account: params.account
					}
					req.session.loginInfo = loginInfo;
					let resData = {
						success: true,
					}
					res.cookie('account', params.account, {signed: true})
					res.send(resData)
				} else {
					// 账号或者密码不正确
					res.send({
						success: false,
						message: '账号或者密码不正确'
					})
				}

			} else {
				console.log('查询结果', result)
				res.send({
					success: false,
					message: '账号不存在'
				})
			}
		}
	})
}

myConnect.regist = function (req, res) {
	let params = req.body; 
	console.log(req.body)
	// 检查用户是否存在
	let sql = `SELECT * FROM person WHERE user='${params.account}'`;
	connection.query(sql, (err, result)=>{
		if(err) {
			console.log('数据查询错误', err)
		} else {
			if(result && result.length > 0) {
				console.log('用户已经存在', result)
				res.send({
					success: false,
					message: '用户已经存在'
				})

			} else {
				let addSql = `INSERT INTO person(user, password) VALUES ('${params.account}', '${params.psd}')`;
				connection.query(addSql, {}, (err, result)=>{
					if(err) {
						console.log('插入数据错误', err)
					} else {
						console.log('注册成功', result)
						res.send({success: true})
					}

				})
			}
		}
	})
}

module.exports = myConnect;



// let DB = {};
// DB.users = [];
// DB.exist = function(account) {
// 	console.log('用户是否存在：',DB.users)
// 	return DB.users.some(item=> item && item.account  === account)
// };
// DB.insert = function(user) {
// 	DB.users.push(user)
// };
// DB.delete = function(account){};
// DB.update = function(account, option) {};

// module.exports = DB;

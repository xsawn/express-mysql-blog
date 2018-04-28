
let DB = {};
DB.users = [];
DB.exist = function(account) {
	console.log('用户是否存在：',DB.users)
	return DB.users.some(item=> item && item.account  === account)
};
DB.insert = function(user) {
	DB.users.push(user)
};
DB.delete = function(account){};
DB.update = function(account, option) {};

module.exports = DB;

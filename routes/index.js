var index= function(req, res) {
	console.log('user 모듈 안에 있는 adduser 호출됨.');
	
	res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
	res.write('<h1>Node.js Server</h1>');
	res.write('<div><h2>Page Infomation</h2></div>');
	res.write("<div><a href='/public/adduser.html'>/public/adduser.html : Add user.</a>");
	res.write("<br><a href='/public/login.html'>/public/login.html : Login.</a>");
	res.write("<br><a href='/public/listuser.html'>/public/listuser.html : Show user list.</a>");
	res.write("<br><a href='/public/facebook.html'>/public/facebook.html : Add location & Show location list.</a></div>");
	res.end();

};

module.exports.index = index;
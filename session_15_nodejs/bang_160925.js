/*var http = require("http").createServer();

server.listen(8004, function(){
	console.log("Server is running: 127.0.0.1:8004");
});

var test = function(){
	server.close();
};

setTimeout(test,10000);

var http = require('http');
var server = http.createServer();

server.on('request', function(code){
	console.log('Request on');
});

server.on('connection', function(code){
	console.log('Connection on');
});

server.on('close', function(code){
	console.log('Close on');
});

server.listen(8004);
var http = require('http');

var server = http.createServer(function(request, response){
	response.writeHead(200, {'Content-Type': 'text/html'});
	response.end('<h1>Tasman Web Server with Node JS</h1>');
}).listen(8004, function(){
	console.log("kkkkkkkkk");
});

var fs = require('fs');
var http = require('http');

var server = http.createServer(function(request, response){
	fs.readFile('bang.html', function(error, data){
		response.writeHead(200, {'Content-Type': 'text/html'});
		response.end(data);
	});
	
}).listen(8004, function(){
	console.log("kkkkkkkkk");
});




var http = require('http');
var fs = require('fs');
var url = require('url');

http.createServer(function(request, response){
	var pathname = url.parse(request.url).pathname;
	console.log(pathname);

	if(pathname == '/' || pathname == '/index.html'){
		fs.readFile('index.html', function(error, data){
			response.writeHead(200, {'Content-Type': 'text/html'});
			response.end(data);
	});
	}else if(pathname == '/otherpage'){
		fs.readFile('otherpage.html', function(error, data){
			response.writeHead(200, {'Content-Type': 'text/html'});
			response.end(data);
	});
	}else{
		response.writeHead(404, {'Content-Type': 'text/html'});
		response.end("not");
	}
}).listen(8004, function(){
	console.log("kkkkkkkkk");
});



var http = require('http');

http.createServer(function(request,response){
	if(request.method == 'GET'){
		console.log('GET requested');
	}else if(request.method == 'POST'){
		console.log('POST request')
	};
}).listen(8004, function(){
	console.log('server running');
});

*/


/*
var http = require('http');
var url = require('url');

http.createServer(function(request, response){
	var query = url.parse(request.url, true).query;

	response.writeHead(200, {'Content-Type': 'text/html'});
	response.end('<h1>'+JSON.stringify(query)+'</h1>');
}).listen(8004, function(){
	console.log('server running');
});
*/
/*
var http = require('http');

http.createServer(function(request, response){
	request.on('data', function(data){
		console.log('POST Data:', data)
	});
}).listen(8004, function(){
	console.log('server running');
});

*/
/*
var http = require('http');
var fs = require('fs');

http.createServer(function(request,response){
	if(request.method == 'GET'){
		fs.readFile('post_page.html', function(error,data){
			response.writeHead(200, {'Content-Type': 'text/html'});
			response.end(data);
		});
	}else if(request.method == 'POST'){
		request.on('data',function(data){
			response.writeHead(200, {'Content-Type': 'text/html'});
			response.end('<h1>'+data+'</h1>');
		});
	}
}).listen(8004,function(){
	console.log('server running');
});
*/
/*
var express = require('express');
var app = express();

app.use(function(request,response){
	response.writeHead(200, {'Content-Type': 'text/html'});
	response.end("<h1>Express Server</h1>");
});
app.listen(8004,function(){
	console.log('Server running');
});
*/
/*
var express = require('express');
var app = express();

app.use(function(request,response){
	var output = [];

	for(var i = 0; i < 3; i++){
		output.push({
			count: i,
			name: 'name = ' + i

		});
	}
	response.status(200).send(output);
});

app.listen(8004,function(){
	console.log('Server running');
})
*/
/*
//module 추
var express = require('express');
//서버 생
var app = express();

//request  이벤트 설정
app.use(function (request, response, next){
    //User-agent 속성 추출
    var agent = request.header('User-Agent');
    console.log(request.headers);
    console.log(agent);

    //전달 받은 데이터 추출
    var name = request.query.name;
    var phone = request.query.phone;

    //agent 브라우저 확인
    if(agent.toLowerCase().match(/chrome/)){
        //page print
        response.send('<h1>Chrome</h1> <br> <h1>'+name+' - ' + phone + '</h1>');
    }else{
        response.send('<h1>Not Chrome</h1> <br> <h1>'+name+' - ' + phone + '</h1>')
    }

});

app.listen(8004, function(){
    console.log("Server Running");
})
*/

/*
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//module 추출
var express = require('express');
//서버 생성
var app = express();

//첫번째 미들웨어
app.use(function (request, response, next){
    //데이터를 추가함
    request.number = 52;
    response.number = 273;

    next();

});
//두번째 미들웨어
app.use(function (request, response, next){
    //상단 미들웨어에 추가된 값을 호출
    response.send('<h1>'+request.number + " : " + response.number+'</h1>');
});

app.listen(8004, function(){
    console.log("Server Running");
})
*/
/*
//module 추출
var express = require('express');
//서버 생성
var app = express();

app.get('/a', function(request, response){
   response.send('<a href="/b">Go to B</a>');
});

app.get('/b', function(request, response){
    response.send('<a href="/a">Go to A</a>');
});

app.get('/page/:id', function(request, response){
    //변수를 선언
    var name = request.params.id;

    //응답 처리
    response.send('<h1>'+name+'</h1>');
});

//처리 하지 않는 요청이 들어왔을 시에
app.all('*', function(request, response){
   response.status(404).send('<h1>ERROR - Page Not Found</h1>');
});

app.listen(8004, function(){
    console.log("Server Running");
})
*/
//module 추출

var fs          = require('fs');
var express     = require('express');
var cookeParser = require('cookie-parser');
var bodyParser  = require('body-parser');

//서버 생성
var app = express();

//middleware 설정
app.use(cookeParser());
app.use(bodyParser.urlencoded({extended:false}));

//router 설정
app.get('/', function(request, response){
    if(request.cookies.auth){
        response.send('<h1>Login Success</h1>');
    }else{
        response.redirect('/login');
    }
});
app.get('/login', function(request, response){
    fs.readFile('login.html', function(error, data){
        response.send(data.toString());
    });
});

app.post('/login', function(request, response){
    //cookie 생성
    var login = request.body.username;
    var password = request.body.password;

    //데이터 확인
    console.log(login, password);
    console.log(request.body);

    if(login == 'test' && password == '1234'){
        //Login successed;
        response.cookie('auth', true);
        response.redirect('/');
    }else{
        //Login failed;
        response.redirect('/login');
    }
});

app.listen(8004, function(){
    console.log("Server Running");
})
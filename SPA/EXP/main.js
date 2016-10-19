// 1. module 추출 
var mysql			= require('mysql');
var express 		= require('express');
var bodyParser		= require('body-parser');
var cookieParser	= require('cookie-parser');
var fs				= require('fs');
var ejs				= require('ejs');
var path			= require('path');

// 2. 서버 생성
var app = express();

// cross-access hack
app.use(function(req, res, next){
	//모든 것을 허용하나 
	res.setHeader('Access-Control-Allow-Origin', '*');
	//그 중에 GET과 POST만 허용 
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	//그 중에서도 이것들만 허용 다른 헤더의 접근은 차단
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
	next();
});

// 3. middleware 설정
app.use(cookieParser());	
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname)));


app. listen(8004, function(){
	console.log("Server Running: 8004 ...")
});


// 4. router 설정
app.get('/', function(request, response){
	if(request.cookies.auth){
		response.redirect('/booking');
	}else{
		console.log(request.cookies.auth);
		response.redirect('/login');
	}
});

// 5. login html FS
app.get('/login', function(request, response){
	fs.readFile('login.html', 'utf-8', function(error, data){
		response.status(200).send(ejs.render(data, {data:data}));
	});
});

app.get('/booking', function(request, response){
	fs.readFile('booking.html', 'utf-8', function(error, data){
		response.status(200).send(ejs.render(data, {data:data}));
	});
});

app.post('/login', function(request, response){
	// cookie 생성
	var email = request.body.email;
	var password = request.body.password;
	// 데이터 확인
	console.log(login, password);
	console.log(request.body);

	if(email == "test" && password == "1111"){
		response.cookie('auth', true);
		response.redirect('/booking');
	}else{
		response.redirect('/login');
	}
});

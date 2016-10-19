// 1. module 추출 
var mysql			= require('mysql');
var express 		= require('express');
var bodyParser		= require('body-parser');
var cookieParser	= require('cookie-parser');
var fs				= require('fs');
var ejs				= require('ejs');
var path			= require('path');


// 2. connect DB
var db = mysql.createConnection({
		user:'root',
		password:'',
		port:3306
});

db.query('USE vet');


// 3. 서버 생성
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

// 4. middleware 설정
app.use(cookieParser());	
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname)));


app. listen(8004, function(){
	console.log("Server Running: 8004 ...")
});


// 5. router 설정
/*app.get('/', function(request, response){
	if(request.cookies.auth){
		response.redirect('/booking');
	}else{
		console.log(request.cookies.auth);
		response.redirect('/signin');
	}
});
*/
// 5. login html FS
app.get('/', function(request, response){
	fs.readFile('index.html', 'utf-8', function(error, data){
		response.status(200).send(ejs.render(data, {data:data}));
	});
});

// 로그인한 이메일과 패스워드가 일치하는 유저의 정보를 요청
app.post('/signin', function(request, response){	
	//var strSql = "SELECT NAME, EMAIL,PASSWORD FROM vet.users";
	var strSql = "SELECT ID, NAME, PET_TYPE_ID FROM vet.users WHERE EMAIL=? AND PASSWORD=? ";
	db.query(strSql, [request.body.email, request.body.password], function(err, data){
	//db.query(strSql, null, function(err, data){
		//만약 에러가 있으면 에러 메세지 전송 
		if(err) return response.status(500).json({err:err});

		//var param = {
		//			 email:request.body.email,
		//			 password:request.body.password};

		// 성공시 응답
		response.status(200).json(data); 
		//response.status(200).json(param); 
	});
});

app.post('/booking', function(request, response){
	var strSql = "UPDATE vet.users SET PET_TYPE_ID = ? WHERE= ? ";
	db.query(strSql, [request.body.pet_type,'yyy']
		, function(err, results){
			console.log(err);
			if(err) return response.status(500).json({err:err});
	
			var param = {pet_type:request.body.pet_type};
			console.log(param);
			response.status(200).json(param);
	});
});

app.post('/post/user', function(request, response){
	var strSql = "INSERT INTO vet.bookings (BOOKING_TIME) VALUES(?)";
	db.query(strSql, [request.body.BOOKING_TIME]
		, function(err, results){
		if(err) return response.status(500).json({err:err});

		var param = {time:request.body.BOOKING_TIME};

		response.status(200).json(param);
		
	});
});
/*
app.post('/signin', function(request, response){
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
		response.redirect('/signin');
	}
});
*/

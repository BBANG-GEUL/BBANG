
// 1. Load module from node js
var mysql 		= require('mysql');
var express 	= require('express');
var bodyParser	= require('body-parser');
var fs 			= require('fs');
var ejs 		= require('ejs');
var path		= require('path');


// 2. connect DB
var db = mysql.createConnection({
		user:'root',
		password:'',
		port:3306
});

db.query('USE test');



// 3. create server
var app = express();



// 4. connect module to server
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

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname)));

//8004는 마음대로 숫자 정해도 됨
app.listen(8004, function(){
	console.log("Server running localhost:8004....");

});


// 5. Router setting
app.get('/', function(request, response){
	fs.readFile('view/index.html', 'utf-8', function(err, data){
		response.status(200).send(ejs.render(data, {data:data}));
	});
})

app.get('/get/user', function(request, response){
	// 1. database 객체
	//mysql

	// 2. 객체 함수
	//myqul.query()

	// 3. 함수 squl
	// [401 permission denied] [404 not found] [500 internal server] [503 server not request]
	// data transfer - json, screen transfer - ejs
	var strSql = "SELECT id, name, age, status FROM test.new_table WHERE status = 'active'";
	db.query(strSql, null, function(err, data){
		//만약 에러가 있으면 에러 메세지 전송 
		if(err) return response.status(500).json(err);
		//성공시 
		response.status(200).json(data); 
	});
});
	// 4. 로딩 데이터를 화면으로 전송



app.post('/post/user', function(request, response){
	var strSql = "INSERT INTO test.new_table (name, age, status) VALUES(?, ?, 'active')";
	db.query(strSql, [request.body.name, request.body.age]
		, function(err, results){
		if(err) return response.status(500).json({err:err});

		var param = {name:request.body.name,
					age:request.body.age,
					id:results.insertId};

		response.status(200).json(param);
	});
});

app.post('/update/user', function(request, response){
	var strSql = "UPDATE test.new_table SET name = ?, age = ? WHERE id = ?";
	db.query(strSql, [request.body.name, request.body.age, request.body.id]
		, function(err, results){
			console.log(err);
			if(err) return response.status(500).json({err:err});

			var param = {name:request.body.name,
						age:request.body.age,
						id:request.body.id};

			response.status(200).json(param);
	});
});


app.get('/delete/:id', function(request, response){
	var strSql = "UPDATE test.new_table SET status='inactive' WHERE id = ?";
	db.query(strSql, [request.params.id], function(err, results){
		if(err) return response.status(500).json({err:err});
		var param ={id:request.params.id};
		response.redirect('/');
	});
});







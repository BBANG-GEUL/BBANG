// 1. make function for sign up
// 2. receive email, name, password from form
	//- find node
	//- save val
// 3. sucess or fail display or alram


// 2nd : 객체형 ; 
// ★ 질문 : 아래 var signup 은  click 에 대한  알림이고 
//			서버에 전달하는 펑션을 만들어 줘야 하는 거죠 ?

var signup = {
	doSignup:function(){
	// web server
	//var url = "http://128.199.188.157:7000/api/signup";

	// assign of email, name, password value
	var email = $('#exampleInputEmail1').val();
	var name = $('#exampleInputName1').val();
	var password = $('#exampleInputPassword1').val();

	$.post(config.url+"signup", {email:email, name:name, password:password})
	.done(function(data){
		$('.custom_form').css('display', 'none');
		$('.signup_info p.email').text(data.email);
		$('.signup_info p.name').text(data.name);
		$('.signup_info p.password').text(data.password);

		$('#confirmed_form').css('display', 'block');
		$('#signup_input_form').css('display', 'none');

	}).fail(function(data){
		$('.custom_form').css('display', 'none');
		$('#failed_form').css('display', 'block');
	});
},
	setEvent: function(){
		$('#doSignup').click(signup.doSignup);
	},
	init: function(){
		signup.setEvent();
	}	
}

// 1st: 펑션형 ;기본적인 벨류 변수에 저장 및 성공 실패 결과 
// ★ 질문 : 서버에 전달이 되었는지를 확인 할수가 없는데 ...
//			url 에 대한 별도의 세팅이 필요한가요 ?
//			수업 시간에 보여주신 것처럼 header ... 등 정보 전달을 눈으로 확인하고 싶습니다만.... 
//function signup(){
//	// web server
//	var url = "http://128.199.188.157:7000/api/signup";
//	// assign of email, name, password value
//	var email = $('#exampleInputEmail1').val();
//	var name = $('#exampleInputName1').val();
//	var password = $('#exampleInputPassword1').val();
//
//	$.post(url, {email:email, name:name, password:password})
//	.done(function(){
//		alert(email);
//	})
//	.fail(function(){
//		alert(name);
//	})
//}



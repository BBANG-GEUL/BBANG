var login = {
	
	doLogin: function(){
		//var email 		= $('#exampleInputEmail1').val();
		//var password 	= $('#exampleInputPassword1').val();

		config.req.post("signin", getParm('#form_login') // from helper.js
								, login.successCallback
								, login.failCallback);				
	},

	successCallback: function(data){
		//1. string -> json
		var strData = JSON.stringify(data);
		//2. base64 hash code
		var baseObject = btoa(strData);
		//3. url display with hash code
		window.location = config.baseUrl+"/main.html#"+baseObject;
	},

	failCallback: function(){
		$('.custom_form').css('display', 'none');
		$('#failed_form').css('display', 'block');
	},

	doSignup: function(){
		//var name 		= $('#name').val();
		//var email 		= $('#email').val();
		//var password 	= $('#password').val();

		config.req.post("signup", getParm('#form_signup')
								, login.signupsuccessCallback
								, login.signupfailCallback);
	},
	signupsuccessCallback: function(){
		clearForm($('#form_signup'));
		$('.alert-success').fadeIn("slow", function(){
			setTimeout(function(){$('.alert-success').fadeOut()}, 2000);
		})
	},
	signupfailCallback: function(){

	},
	
	// old version
	//doSignup: function(){
	//	var name 		= $('#name').val();
	//	var email 		= $('#email').val();
	//	var password 	= $('#password').val();

	//	$.post(config.url+"signup", {name:name, email:email, password:password})
	//	 .done(function(data){
	//		clearForm($('#form_signup'));
	//		$('.alert-success').fadeIn("slow", function(){
	//			setTimeout(function(){$('.alert-success').fadeOut()}, 2000);
	//		})
	//	}).fail(function(data){
	//});
	//},

	setEvent: function(){
		$('#doLogin').click(login.doLogin);
		$('#doSignup').click(login.doSignup);
	},

	init: function(){
		login.setEvent();
	}

}
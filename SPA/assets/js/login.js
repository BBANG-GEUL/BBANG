var login = {
	
	doLogin: function(){
		//var email 		= $('#exampleInputEmail1').val();
		//var password 	= $('#exampleInputPassword1').val();

		config.req.post("signin", getParm('#form_login') // from helper.js
								, login.successCallback
								, login.failCallback);				
	},

	successCallback: function(data){
		
		//1. jason -> string
		var strData = JSON.stringify(data);
		//2. base64 hash code
		var baseObject = btoa(strData);
		//3. url display with hash code
		window.location = config.baseUrl+"/booking.html#"+baseObject;
		//console.log(data);
	},

	failCallback: function(){
		$('.custom_form').css('display', 'none');
		$('#failed_form').css('display', 'block');
	},

	doSignup: function(){
		//작업 아직 안했음.
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

	setEvent: function(){
		$('#doLogin').click(login.doLogin);
		$('#doSignup').click(login.doSignup);
	},

	init: function(){
		login.setEvent();
	}

}
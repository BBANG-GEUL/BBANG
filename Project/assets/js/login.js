
var login = {
	doLogin: function(){
		alert(3);
	},
	
	setEvent: function(){
		$('#doLogin').click(login.doLogin);
	},
	init: function(){
		login.setEvent();
	}
}	





function login(){

	var url= "http://128.199.188.157:7000/api/signin";	
	var email =	$('#inputEmail3').val();
	var pwd =	$('#inputPassword3').val();
	//alert(email+pwd);

	//$('selector')
	//jquery in-built method
	$.post(url, {email:email, password:pwd})
	.done(function(){
	//200		
		$('.confirmed_form').css('display','block');
	})
	.fail(function(){
		 //reset();// 초기화
	// 404 , 500
	//1. find failed_form
	//2. form need to be shown. css display block
		$('.failed_form').css('display','block');
	})

}
function reset(){
	$('.confirmed_form').css('display','none');
	$('.failed_form').css('display','none');
}
function init(){
	reset();
}
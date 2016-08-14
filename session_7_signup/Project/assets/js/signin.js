var signin = {
	doSignin:function(){
	// web server
	//var url = "http://128.199.188.157:7000/api/signin";

	// assign of email, name, password value
	var email = $('#exampleInputEmail1').val();
	var password = $('#exampleInputPassword1').val();

	$.post(config.url+"signin", {email:email, password:password})
	.done(function(data){
		$('.custom_form').css('display', 'none');
		$('.signin_info p.email').text(data.email);
		$('.signin_info p.password').text(data.password);

		$('#confirmed_form').css('display', 'block');
		$('#signin_input_form').css('display', 'none');

	}).fail(function(data){
		$('.custom_form').css('display', 'none');
		$('#failed_form').css('display', 'block');
	});
},
	setEvent: function(){
		$('#doSignin').click(signin.doSignin);
	},
	init: function(){
		signin.setEvent();
	}	
}
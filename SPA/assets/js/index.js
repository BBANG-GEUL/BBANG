
var index = {
	book: function(){
		// 타임 정보 값 변수 저장 
		$('#time').on('change', function() {
   		var time_info = $("#time option:selected").val();
   		var url	= "http://localhost:8004/post/user";
   			$.post(url, time_info).done(function(data){	
   				console.log(data.ti);});  		
		});

		

		// pet 종류 값 변수 저장 
		$('#petForm input').on('change', function() {
   		var pet_info = $('input[name=pet-type]:checked', '#petForm').val();

   		$.post(url, param).done(function(data){
			
		});
	   	//	switch(strData){
	   	//		
		//		case "LD": v = 10;  break;
		//		case "MD": v = 20;  break;
		//		case "SD": v = 30;  break;
		//		case "CATS": v = 40;  break;
		//		case "ETC": v = 50;  break;				
		//   }
		//	return v;  
					
		});

		// 서비스 종류 값 변수 저장 
		$('#svcForm input').on('change', function() {
   		var svc_info = $('input[name=pet-type]:checked', '#svcForm').val();
   			switch(svc_info){
				case "check": v = "11";
				case "hair": v = "22";
				case "vaccine": v = "33";
				case "X-ray": v = "44";
				case "etc": v = "55";				
		    }
			return v;       		
		});	

		
	},
	onLoad: function(){
		var url = "http://localhost:8004/signin";
		$.get(url, {}).done(function(data){

			$.each(data, function(idx, val){				
				var email 		= $('#exampleInputEmail1').val();
				var password 	= $('#exampleInputPassword1').val();
				window.location = config.baseUrl+"/booking.html";
					// 관리자 로그인시 관리자 페이지로 
					//if(val.REF == "MNG"){window.location = config.baseUrl+"/manage.html"}
					// 일반 회원 로그인시 예약 페이지로 
					//else{window.location = config.baseUrl+"/booking.html";}
				
			});			
		});
	},

	
	setEvent: function(){		
		$('body').on('click', '#sendBtn #btn_send_data', index.send);
		
	},
	init: function(){
		index.book();
		index.onLoad();
		index.setEvent();
	}
}
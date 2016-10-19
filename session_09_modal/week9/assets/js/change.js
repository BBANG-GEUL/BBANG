var change ={

	doChange: function(){
		//1. input 으로 부터 입력 받은 데이터 받기
		//2. 서버에 데이터를 전송하기 post
		//3. callBack으로 확인하기 성공시 모달창 닫기
		//var name 		= $('#name').val();
		//var email 		= $('#email').val();
		//var password 	= $('#password').val();

		// server : node
		// think... 새로운 아이디를 가입 시키고 ;
		//  		기존 아디디를 삭제 !!! 
		// _id = name;
		// email = email;		
		// password = password;

		// 23/08/2016 uri : update 전송시 자동 업데이트 됨  from server
		config.req.post("update", getParm('#modal-change')
								, change.successCallback
								, change.failCallback);
	},

	successCallback: function(data){
		// 1. 성공시 모달창 닫기 펑션 만들기 
		// response type string 일경우....
		// 2. refresh .. main 페이지에 변경 사항 적용 
		var str = jQuery.type(data);
		if(str="string"){
			$(function () {
   			$('#myModal').modal('toggle');
   			window.location.reload(true); });
		}
		else{
			console.log("잘못된 정보를 입력하셨습니다.");
		}	
		
		
	},

	failCallback: function(data){
	
	},	

	setEvent: function(){
		$('#btn-change').click(change.doChange);
	},

	init: function(){
		change.setEvent();
	}
}
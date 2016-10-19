//file name : index.js  >> 객체이름도 index
var index = {
	update: function(){
		var url		= "http://localhost:8004/update/user";
		var idx 	= $('input[name="id"]').val();
		var name 	= $('input[name="name"]').val();
		var age 	= $('input[name="age"]').val();

		var param 	= {id:idx, name:name, age:age};

		$.post(url, param).done(function(data){
			$('tr#'+data.id).find('#name').text(data.name);
			$('tr#'+data.id).find('#age').text(data.age);
		});
	},

	getVal: function(){
		//선택된 값을 대입 
		$('input[name="id"]').val($(this).attr('id'));
		$('input[name="name"]').val($(this).find('#name').text());
		$('input[name="age"]').val($(this).find('#age').text());
		//버튼 아이디 변경 
		$('#btn_send_data').attr('id', 'btn_update_data');

		$('body').on('click', '#sendForm #btn_update_data', index.update);

	},

	send: function(){
		var url		= "http://localhost:8004/post/user";
		var name 	= $('input[name="name"]').val();
		var age 	= $('input[name="age"]').val();
		var param 	= {name:name, age:age};

		$.post(url, param).done(function(data){
			//callback : transaction트랜젝션이 발생 뒤에 처리되는 함수 
			var objTBody = $('table tbody');
			var testClone = $('.template').clone();
				testClone.attr('id', data.id);
				testClone.find('#name').text(data.name);
				testClone.find('#age').text(data.age);
				testClone.find('#del a').attr('href', '/delete/'+data.id);

				testClone.removeClass('template');
				objTBody.append(testClone);

		});
	},

	onLoad: function(){
		var url = "http://localhost:8004/get/user";
		$.get(url, {}).done(function(data){
			var objTBody = $('table tbody');
			// 1. 복사 대상자 가져오기(.template는 복사대상 .clone은 복사용지)	
			// 2. 복사할 곳에 넣기 ($. ~ val)까지 복사기)
			//val = "id": 1, "name": "Lukas", "age": "26", "status": "active"
			$.each(data, function(idx, val){
				var testClone = $('.template').clone();
					testClone.attr('id', val.id);
					testClone.find('#name').text(val.name);
					testClone.find('#age').text(val.age);
					testClone.find('#del a').attr('href', '/delete/'+val.id);

					//표에서 값이 반복되어서 나오는거 삭제
					testClone.removeClass('template');

					objTBody.append(testClone);
			});
		});
	},




	//setEvent랑 init은 항상 맨 밑에 고정
	setEvent: function(){
		//버튼에 send 이벤트 연결 
		//$('#btn_send_data').click(index.send);
		$('body').on('click', '#sendForm #btn_send_data', index.send);

		$('body').on('click', 'tbody tr', index.getVal);

		$('body').on('click', '#del');
		//$('body').on('click', '#del', function(){
			//$(this).remove();
			//alert(1);
		//});
	},
	init: function(){
		index.onLoad();
		index.setEvent();
	}
}
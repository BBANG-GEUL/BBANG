var user = {
	auth:{
		info:{}
	},
	onLoadEvent: function(){
		//1. # hash data , basic function
		var hashData = window.location.hash;
		//2. except for #
		var strBase64 = hashData.substr(1);
		//3. decoding from hash to string
		var decodedData = atob(strBase64);
		//4. string -> object
		var objData = $.parseJSON(decodedData);

		user.auth.info.name = objData.name;
		user.auth.info.email = objData.email;
		user.auth.info.password = objData.password;

		$('.loggedin').text(objData.name);

		user.findUserAll();
	},

	findUserAll: function(){
		config.req.get("search", {}
							   , user.successCallback
							   , user.failCallback);
	},
	findUserByEmail: function(){
		config.req.post("search", {email:$('.keyword').val()}
							    , user.successCallback
							    , user.failCallback);
	},

	successCallback:function(res){
		var tbody = $('.table tbody');
		tbody.children().not('.tr-temp').remove();

		// repeat for objects
		$.each(res.result, function(i,v){  // result name is depends on server 
			// copy to objTr from class tr-temp
			var objTr = $('.tr-temp').clone();

			objTr.find('#id').text(v._id);             // from server
			objTr.find('#email').text(v.email);        // from server
			objTr.find('#name').text(v.name);          // from server
			objTr.find('#password').text(v.password);  // from server

			objTr.removeClass('tr-temp'); // NEVER!'.tr-temp'

			tbody.append(objTr);
		});
	},

	failCallback:function(res){
		
	},

	setEvent:function(){
		$('#btn_srch').click(user.findUserByEmail);
		
		$('#myModal').on('hidden.bs.modal', function (e) {
			$('.modal-body').find("#name").val(user.auth.info.name);
			$('.modal-body').find("#email").val(user.auth.info.email);
			$('.modal-body').find("#password").val(user.auth.info.password);

		});
	},
	init:function(){
		user.setEvent();
		user.onLoadEvent();
	}
}
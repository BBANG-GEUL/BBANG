var config = {
	
	//baseUrl: window.location.origin + "/SPA/", // 체크해야함
	baseUrl : window.location.origin,
	url: "http://localhost:8004/",
	
	req:{
		post: function(uri, param, success, fail){	
			  $.post(config.url + uri, param)
			   .done(success == undefined ? config.req.success : success)
			   .fail(fail == undefined ? config.req.fail : fail)
		},

		get: function(uri, param, success, fail){
			 $.get(config.url + uri, param)
			  .done(success == undefined ? config.req.success : success)
			  .fail(fail == undefined ? config.req.fail : fail)
		},

		success: function(res){
			consol.log(res);
		},

		fail: function(res){
			consol.log(res);
		}
	}
}

$(config.init);
var config = {
	
	baseUrl: window.location.origin + "/week9/",
	
	url: "http://128.199.188.157:7000/api/",
	
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
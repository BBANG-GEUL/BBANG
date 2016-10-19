function getParm(id){

	var values = {}
	var elements = $(id +" input:not([type='file'])").get();
	var len = elements.length;

	for(var i=0; i<len; i++){
		switch(elements[i].type){
			case "email":
			case "test":
			case "password":
				values[elements[i].name] = elements[i].value;
			break;
		}
	}
	return values;
}

function getParm2(id2){
	
	var pet_info = $("input[name=pet-type]:checked",id2).get();

	return pet_info;	
}
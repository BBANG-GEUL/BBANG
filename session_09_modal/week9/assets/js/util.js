function clearForm(objForm){
	var objInputs = objForm.find('input');

	$.each(objInputs, function(idx, objInput){
		$(objInput).val("");
	})
}
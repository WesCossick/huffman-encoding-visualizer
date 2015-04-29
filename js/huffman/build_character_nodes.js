function build_character_nodes(input){
	var input_data = [];
	
	for(i = 0; i < input.length; i++){
		var found = false;
		
		for(j = 0; j < input_data.length && !found; j++){
			if(input_data[j].name == input.charAt(i)){
				input_data[j].frequency++;
				found = true;
			}
		}
		
		if(!found){
			input_data[input_data.length] = {
				"id": "0",
				"name": input.charAt(i),
				"children": [],
				"frequency": 1,
			};
		}
	}
	
	return input_data;
}
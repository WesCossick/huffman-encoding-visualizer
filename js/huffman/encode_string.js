function encode_string(input, paths){
	var full_byte_string = "";
	
	for(i = 0; i < input.length; i++){
		full_byte_string += paths[input.charAt(i)];
	}
	
	var byte_array = new Uint8Array((full_byte_string.length / 8) + ((full_byte_string.length % 8 != 0) ? 1 : 0));
	
	for(i = 0; i < full_byte_string.length; i += 8){
		var one_byte_string = full_byte_string.substring(i, i+8);
		
		if(one_byte_string.length < 8){
			for(j = one_byte_string.length; j < 8; j++){
				one_byte_string += "0";
			}
		}
		
		var byte = parseInt(one_byte_string, 2);
		byte_array[i/8] = byte;
	}
	
	return byte_array;
}
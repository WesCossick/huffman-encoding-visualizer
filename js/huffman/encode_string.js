// This function takes the user input, as well as the encoded paths
// to each character, and turns it into a byte array
function encode_string(input, paths, pad){
	var full_byte_string = "";
	

	// Make the string of 1 and 0 characters
	for(i = 0; i < input.length; i++){
		full_byte_string += paths[input.charAt(i)];
	}

	
	// Create the empty byte array
	var byte_array = new Uint8Array((full_byte_string.length / 8) + ((full_byte_string.length % 8 != 0) ? 1 : 0));
	
	// Populate byte array one byte at a time by using each character as a bit
	for(i = 0; i < full_byte_string.length; i += 8){
		var one_byte_string = full_byte_string.substring(i, i+8);
		
		if(one_byte_string.length < 8){
			for(j = one_byte_string.length; j < 8; j++){
				one_byte_string += "0";
				pad.count++;
			}
		}
		
		var byte = parseInt(one_byte_string, 2);
		byte_array[i/8] = byte;
	}
	
	return byte_array;
}
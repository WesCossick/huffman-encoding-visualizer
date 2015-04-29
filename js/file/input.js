function interpret_byte_array(byte_array){
	// Init result
	var result = {
		"text": "",
		"bit_string": "",
		"encoded_tree": {},
		"file_output": byte_array,
	};
	
	
	// Determine the meta length, and read in meta data
	var meta_length = byteArrayToInt(byte_array.subarray(0, 4));
	var pad_count = byte_array[4];
	var meta_data = byte_array.subarray(5, 5+meta_length);
	
	
	// Validate
	if(meta_length > 50000)
		return false;
	else if(pad_count > 7)
		return false;
	
	
	// Create meta JSON
	var meta_text = "";
	for(i = 0; i < meta_length; i++){
		meta_text += String.fromCharCode(meta_data[i]);
	}
	
	var meta_object = JSON.parse(meta_text);
	
	
	// Get bytes of content at end
	var content_bytes = byte_array.subarray(5+meta_length);
	
	
	// Set encoded tree
	result.encoded_tree = meta_object;
	
	
	// Create bit string
	var content_bit_string = "";
	var content_bit_string_formatted = "";
	for(i = 0; i < content_bytes.length; i++){
		content_bit_string += content_bytes[i].toString(2).paddingLeft("00000000");
		content_bit_string_formatted += content_bytes[i].toString(2).paddingLeft("00000000")+" ";
	}
	result.bit_string = content_bit_string_formatted;
	
	
	// Remove padded zeros
	content_bit_string = content_bit_string.substring(0, content_bit_string.length - pad_count);
	
	
	// Build paths and flip
	var paths = {};
	build_path(result.encoded_tree, paths);
	paths = array_flip(paths);
	
	
	// Develop content text
	var content_text = "";
	var buffer = "";
	for(i = 0; i < content_bit_string.length; i++){
		buffer += content_bit_string.charAt(i);
		if(paths[buffer] !== undefined){
			content_text += paths[buffer];
			buffer = "";
		}
	}
	
	result.text = content_text;
	
	
	// Return
	return result;
}

function array_flip(array)
{
	var key, tmp_ar = {};

	for(key in array){
		if(array.hasOwnProperty(key)){
			tmp_ar[array[key]] = key;
		}
	}

	return tmp_ar;
}
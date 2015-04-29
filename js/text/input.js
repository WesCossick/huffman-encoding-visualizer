function interpret_text(text){
	// Init result
	var result = {
		"text": text,
		"bit_string": "",
		"encoded_tree": {},
		"file_output": [],
	};
	
	
	// Build data
	var input_data = build_character_nodes(text);
	var encoded_tree = build_tree(input_data);
	
	
	// Set encoded tree
	result.encoded_tree = encoded_tree;
	
	
	// Generate paths
	var paths = {};
	build_path(encoded_tree, paths);
	var pad = {"count": 0};
	var byte_array = encode_string(text, paths, pad);
	
	
	// Display to bit box
	for(i = 0; i < byte_array.length; i++){
		result.bit_string += byte_array[i].toString(2).paddingLeft("00000000")+" ";
	}
	
	
	// Build file output
	result.file_output = build_file_output(encoded_tree, byte_array, pad.count);
	
	
	// Return
	return result;
}
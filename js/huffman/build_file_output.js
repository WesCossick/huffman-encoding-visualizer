function build_file_output(encoded_tree, content_bytes){
	var json = JSON.stringify(encoded_tree);
	var byte_array = new Uint8Array(4 + json.length + content_bytes.length);
	intToByteArray(json.length, byte_array);
	
	for(i = 0; i < json.length; i++){
		byte_array[i+4] = json.charCodeAt(i);
	}
	
	for(i = 0; i < content_bytes.length; i++){
		byte_array[i+4+json.length] = content_bytes[i];
	}
	
	return byte_array;
}

function intToByteArray(int, byte_array){
	for(var index = 0; index < byte_array.length; index++){
		var byte = int & 0xff;
		byte_array[index] = byte;
		int = (int - byte) / 256;
	}
}

function byteArrayToInt(byteArray){
	var value = 0;
	
	for(var i = byteArray.length - 1; i >= 0; i--){
		value = (value * 256) + byteArray[i];
	}

	return value;
}
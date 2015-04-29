function build_file_output(paths, content_bytes, pad_count){
	// Form JSON
	var json = JSON.stringify(paths);
	json = json.replace(/"/g, "");
	json = json.substring(1, json.length-1);
	
	
	// Form byte array
	var byte_array = new Uint8Array(5 + json.length + content_bytes.length);
	intToByteArray(json.length, byte_array);
	byte_array[4] = pad_count;
	
	for(i = 0; i < json.length; i++){
		byte_array[i+5] = json.charCodeAt(i);
	}
	
	for(i = 0; i < content_bytes.length; i++){
		byte_array[i+5+json.length] = content_bytes[i];
	}
	
	
	// Return
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
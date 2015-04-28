var timeout_to_show;

$(document).ready(function(){
	$("#huffman_input").keyup(function(){
		// Get text
		var input = $("#huffman_input").val();
		
		
		// Prepare screen
		$("#huffman_graph-canvaswidget").remove();
		clearTimeout(timeout_to_show);
		
		
		// Handle if there is text
		if(input != ""){
			// Hide initial message
			$("#huffman_graph i").hide();
			
			
			// Build data
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
			
			var encoded_tree = build_tree(input_data);
			
			
			// Visualize
			visualize(encoded_tree);
			
			
			// Animate tree building
			$("#huffman_graph-canvaswidget").fadeTo(0, 0);
			timeout_to_show = setTimeout(function(){
				$("#huffman_graph-canvaswidget").fadeTo(0, 1);
			}, 550);
			
			
			// Generate paths
			var paths = {};
			build_path(encoded_tree, paths);
			var pad = {"count": 0};
			var byte_array = encode_string(input, paths, pad);
			
			
			// Display to bit box
			$("#huffman_bits").html("");
			
			for(i = 0; i < byte_array.length; i++){
				$("#huffman_bits").append(byte_array[i].toString(2).paddingLeft("00000000")+" ");
			}
			
			
			// Only handle if there is something to write to file
			if($("#huffman_bits").html() != ""){
				// Build file output
				var file_output = build_file_output(encoded_tree, byte_array, pad.count);
				
				
				// Update button
				var blob = new Blob([file_output], {type: "application/octet-stream"});
				var url = window.URL.createObjectURL(blob);
				$("#huffman_download").attr("href", url);
				$("#huffman_download").attr("download", "Encoded String");
			}
			else{
				$("#huffman_bits").html("<i>Type to see bits...</i>");
			}
		}
		else{
			// Show initial message
			$("#huffman_graph i").show();
		}
	});
});

String.prototype.paddingLeft = function (paddingValue) {
   return String(paddingValue + this).slice(-paddingValue.length);
};


// Handle file uploads
$(document).ready(function(){
	var target = document.getElementById("huffman_bits");
	target.addEventListener("dragover", function(e){e.preventDefault();}, true);
	target.addEventListener("drop", function(e){
		e.preventDefault();
		load_file(e.dataTransfer.files[0]);
	}, true);
	
	function load_file(src){
		var reader = new FileReader();
		
		reader.onload = function(e){
			// Get all the bytes from the file
			var byte_array = new Uint8Array(e.target.result.length);
			
			for(i = 0; i < e.target.result.length; i++){
				byte_array[i] = (e.target.result.charCodeAt(i));
			}
			
			
			// Call the interpret function
			var result = interpret_byte_array(byte_array);
		};
		
		reader.readAsBinaryString(src);
	}
});
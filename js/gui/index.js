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
						"data": {},
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
			
			var paths = {};
			build_path(encoded_tree, paths);
			var byte_array = encode_string(input, paths);
			
			
			// Display to bit box
			$("#huffman_bits").html("");
			
			for(i = 0; i < byte_array.length; i++){
				$("#huffman_bits").append(byte_array[i].toString(2).paddingLeft("00000000")+" ");
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
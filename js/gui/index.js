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
			var input_data;
			
			for(i = 0; i < input.length(); i++){
				//input_data
			}
			
			var binary_tree_json = {id: "3000", name: "30", data: {}, children: [{id: "2500", name: "25", data: {}, children: [{id: "2000", name: "20", data: {}, children: [{id: "1990", name: "null", data: {}, children: []}, {id: "2100", name: "21", data: {}, children: []}]}, {id: "2600", name: "26", data: {}, children: [{id: "2590", name: "null", data: {}, children: []}, {id: "2700", name: "27", data: {}, children: []}]}]}, {id: "3500", name: "35", data: {}, children: [{id: "3300", name: "33", data: {}, children: []}, {id: "3800", name: "38", data: {}, children: [{id: "3790", name: "null", data: {}, children: []}, {id: "4000", name: "40", data: {}, children: []}]}]}]};
			
			visualize(binary_tree_json);
			
			
			// Animate tree building
			$("#huffman_graph-canvaswidget").fadeTo(0, 0);
			timeout_to_show = setTimeout(function(){
				$("#huffman_graph-canvaswidget").fadeTo(0, 1);
			}, 550);
		}
		else{
			// Show initial message
			$("#huffman_graph i").show();
		}
	});
});
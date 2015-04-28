// Takes in the data that has been built from the input, 
// and encodes it using the Huffman algorithm,
// as well as into a form that can be passed to the visualizer.
function build_tree(data){
	// Encode using te Huffman algorithm
	var node_count = data.length;
	
	var queue = new PriorityQueue({ comparator: function(a, b) { return a.frequency - b.frequency; }});
	
	for(i = 0; i < node_count; i++){
		queue.queue(data[i]);
	}
	
	var id_counter = 1;
	
	for(i = 0; i < node_count-1; i++){
		var new_node = {
			"id": "0",
			"name": "",
			"children": [queue.dequeue(), queue.dequeue()],
			"frequency": null,
		};
		
		new_node.children[0].id = id_counter++;
		new_node.children[1].id = id_counter++;
		
		new_node.frequency = new_node.children[0].frequency + new_node.children[1].frequency;
		
		queue.queue(new_node);
	}
	
	return queue.dequeue();
}
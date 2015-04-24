var test_data = [
	{
		"character": "a",
		"frequency": 9,
	},
	{
		"character": "b",
		"frequency": 3,
	},
	{
		"character": "c",
		"frequency": 10,
	},
];

function build_tree(data){
	var node_count = data.length;
	
	var queue = new PriorityQueue({ comparator: function(a, b) { return a.frequency - b.frequency; }});
	
	for(i = 0; i < node_count; i++){
		queue.queue(data[i]);
	}
	
	for(i = 0; i < node_count-1; i++){
		var new_node = {
			"left": queue.dequeue(),
			"right": queue.dequeue(),
			"frequency": null,
		};
		
		new_node.frequency = new_node.left.frequency + new_node.right.frequency;
		
		queue.queue(new_node);
	}
}

build_tree(test_data);
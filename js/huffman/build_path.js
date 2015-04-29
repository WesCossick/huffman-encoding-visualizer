// Recursively creates the "build path", or string of 1's and 0's to get to each node
function build_path(encoded_tree, paths, current_node, working_path){
	// If this is the first call, allows for default value to be passed
	working_path = typeof working_path !== 'undefined' ? working_path : "";
	
	// Also for the first call, add in the other default value
	if(current_node === undefined)
		return build_path(encoded_tree, paths, encoded_tree);

	// Base case
	if(current_node.children.length == 0){
		paths[current_node.name] = working_path != "" ? working_path : "0";
		return;
	}

	// Recursive calls
	build_path(encoded_tree, paths, current_node.children[0], working_path+"0");
	build_path(encoded_tree, paths, current_node.children[1], working_path+"1");
}
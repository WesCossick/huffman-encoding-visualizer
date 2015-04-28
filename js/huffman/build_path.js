function build_path(encoded_tree, paths, current_node, working_path){
	working_path = typeof working_path !== 'undefined' ? working_path : "";
	if(current_node === undefined)
		return build_path(encoded_tree, paths, encoded_tree);
	if(current_node.children.length == 0){
		paths[current_node.name] = working_path;
		return;
	}
	build_path(encoded_tree, paths, current_node.children[0], working_path+"0");
	build_path(encoded_tree, paths, current_node.children[1], working_path+"1");
}
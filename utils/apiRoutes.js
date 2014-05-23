
function domains () {

	//return "http://192.168.1.120"
	//return "https://api.playfan.me";
	return "http://192.168.1.168"
}

function ports (){

	return ":8443";
}

function version (){

	return "v1";
}


exports.domains = function(){
	return domains();
}

exports.ports = function(){

	return ports();
}

exports.version = function(){

	return version();

}

exports.login = function(){

	return  domains() + ports() + "/" + version() + "/login";
}


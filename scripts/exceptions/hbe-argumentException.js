var err=require("./hbe-error");

var argument=function(msg,argumentName){
	var error=this.base(err,msg);
	if(arguments.length==2){
		this._argus=argumentName;
	}
	else if(arguments.length>2){
		this._argus=Array.prototype.slice(arguments,1) ;
	}
};

argument.prototype.getType=function(){
	return 'ArgumentException';
};

argument.prototype.unexceptArgument = function() {
	return argu;
};


argument.prototype.getJSON=function(){
	$.extend(this.base().getJSON(),{
			argumentName:this.unexceptArgument()
		});
};

var name = "cn.com.HBCK.ITPlat.Exceptions.ArgumentException";
module.exports = exports[name] = oo.register(name, argument);
var error=function(msg,id){
	this._id=id||'';
	this._msg=msg||'error';
};

error.prototype.getID=function(){
	return this._id;
};

error.prototype.getMsg=function(){
	return this._msg;
};

error.prototype.getType=function(){
	return "Error";
};

error.prototype.getStatckTrace=function(){
	console.trace();
};

error.prototype.getJSON=function(){
	return {
		id:this.getID(),
		msg:this.getMsg(),
		type:this.getType(),
		statckTrace:this.getStatckTrace()
	};
};

error.prototype.toString=function(){
	return $.toJSON(this.getJSON());
};

var name = "cn.com.HBCK.ITPlat.Exceptions.Error";
module.exports = exports[name] = oo.register(name, error);
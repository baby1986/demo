var err=require("./hbe-argumentError");

var argumentNull=function(msg,arguname){
	var error=this.base(err,msg||_.template("argument <%= name %> can't been null")({name:arguname}),arguname);
	this._argu=arguname;
};

argumentNull.prototype.nullArgument = function() {
	return this._argu;
};

argumentNull.prototype.getType=function(){
	return 'ArgumentNullException';
};

argumentNull.prototype.getJSON=function(){
	$.extend(this.base().getJSON(),{
			argumentName:this.nullArgument()
		});
};

var name = "cn.com.HBCK.ITPlat.Exceptions.ArgumentNullException";
module.exports = exports[name] = oo.register(name, argumentNull);
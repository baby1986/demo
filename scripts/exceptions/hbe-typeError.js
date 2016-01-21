var err=require("./hbe-error");

var typeError=function(msg,arguname,expecttype){
	var error=this.base(err,msg||_.template("<%= name %> Expect Argument`Type  <%= type %>")({name:arguname,type:expecttype}));

	this._etype=expecttype||'';
	this._utype=Array.prototype.slice.call(arguments,2);
};

typeError.prototype.getType=function(){
	return 'typeError';
};

typeError.getExpectType=function(){
	return this._etype;
};

typeError.prototype.getUnExcepted=function(){
	return this._utype;
};

typeError.prototype.getJSON=function(){
	$.extend(this.base().getJSON(),{
		expectType:this.getExpectType(),
		unExcepted:this.getUnExcepted()
	});
};


var name = "cn.com.HBCK.ITPlat.Exceptions.TypeError";
module.exports = exports[name] = oo.register(name, typeError);
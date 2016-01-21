var unimperror=require("../exceptions/hbe-unImplementError");
var ArgumentNull=require("../exceptions/hbe-argumentNull");

var control=function(cls,name){
	if(!cls) throw new ArgumentNull("cls");
	this.setClass=function(val){
		this._cls=val;
	};
	this.setClass(cls);
};

control.prototype.setName=function(val){
	this._name=val;
};

control.prototype.getName=function(){
	return this._name;
};

control.prototype.getClass=function(){
	return this._cls;
};

control.prototype.create=function(){
	throw new unimperror("create");
};

control.prototype.renderTo=function(elem){
	var newelem=this.create.apply(this,Array.prototype.slice.call(arguments,1));
	elem.appendChild(newelem);
	newelem.setAttribute("hbb-control",this.getClass());
	return newelem;
};

control.prototype.bindTo=function(elem){
	throw new unimperror("bindTo");
};

var name = "cn.com.HBCK.ITPlat.Base.Control";
module.exports = exports[name] = oo.register(name, control);
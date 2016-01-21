var factory=function(){
	this._map={};
};


factory.prototype.register = function(cls) {
	this._map[cls.className]=cls;
};

factory.prototype.getComponend=function(clsname){
	return this._map[clsname];
};

var name = "cn.com.HBCK.ITPlat.Base.Factory";
module.exports = exports[name] = oo.register(name, factory);

var _instance=factory.createInstance();

factory.getInstance=function(){
	return _instance;
};
var model=function(id,name,store){
	this.setID(id||'');
	this.setName(name||'');
	this.setStore(store||'');

	this.setID=function(val){
		var old=this.getID();
		this._id=val;
		return old;
	}
}

model.prototype.getID=function(){
	return this._id;
}

model.prototype.getName=function(){
	return this._name;
}

model.prototype.setName=function(val){
	var old=this.getName();
	this._name=val;
	return old;
}

model.prototype.getStore=function(){
	return this._store;
}

model.prototype.setStore=function(val){
	var old=this.getStore();
	this._name=val;
	return old;
}

var name = "cn.com.HBCK.ITPlat.Base.Model";
module.exports = exports[name] = oo.register(name, model);
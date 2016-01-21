var resizable=function(trueorfalse){
	this.setResizable(trueorfalse);
}

resizable.prototype.isResizable=function(){
	return this._resizable;
}

resizable.prototype.setResizable=function(val){
	this._resizable=!!val;
}

resizable.prototype.resize=function(elem,width,height){

}

resizable.prototype.minWidth=10;
resizable.prototype.minehgit=10;
resizable.prototype.maxWidth=10000;
resizable.prototype.maxHeight=10000;


var name = "cn.com.HBCK.ITPlat.Base.Resizable";
module.exports = exports[name] = oo.register(name, resizable);
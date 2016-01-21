var unimperror=require("../exceptions/hbe-unImplementError");

var droppable=function(trueorfalse){
	this.setDraggable(trueorfalse);
}

droppable.prototype.isDraggable=function(){
	return this._droppable;
}

droppable.prototype.setDraggable=function(val){
	this._droppable=!!val;
}

droppable.prototype.onDragEnter=function(){
	throw new unimperror("onDragEnter");
}

droppable.prototype.onDragOver=function(){
	throw new unimperror("onDragOver");
}

droppable.prototype.onDragLeave=function(){
	throw new unimperror("onDragLeave");
}

droppable.prototype.onDrop=function(e,source){
	throw new unimperror("onDrap");
}

var name = "cn.com.HBCK.ITPlat.Base.Draggable";
module.exports = exports[name] = oo.register(name, droppable);
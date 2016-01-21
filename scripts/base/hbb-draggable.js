var draggable=function(trueorfalse){
	this.setDraggable(trueorfalse);
}

draggable.prototype.isDraggable=function(){
	return this._draggable;
}

draggable.prototype.setDraggable=function(val){
	this._draggable=!!val;
}

draggable.prototype.onDrag=function(e) {

}

var name = "cn.com.HBCK.ITPlat.Base.Draggable";
module.exports = exports[name] = oo.register(name, draggable);
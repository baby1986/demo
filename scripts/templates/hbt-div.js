var control=require("../base/hbb-control");
var draggable=require("../base/hbb-draggable");
var droppable=require("../base/hbb-droppable");
var resizable=require("../base/hbb-resizble");
var factory=require("../base/factory");

var div=function(){
    var base=this.base(control,"hbt-div");
    var droppable=this.base(droppable,true);
    var dragable=this.base(dragable,true);
    var resizable=this.base(resizable,true);
};


div.prototype.create=function(){
    return $('<div></div>').addClass(this.getClass())[0];
};

div.prototype.renderTo=function(elem){
	var newelem=this.base(control).renderTo(elem);
	$(newelem).droppable({
		onDragEnter:this.onDragEnter,
		onDragLeave:this.onDragLeave,
		onDrap:this.onDrap})
	.draggable({proxy:true,revert:false});

	return newelem;
};

div.prototype.onDrag=function(e) {
};

div.prototype.onDragEnter=function(e,source){
	if(__DEV__){
		console.assert(!(e.currentTarget).hasClass(this.getClass()));
	}
	$(e.currentTarget).addClass("hbc-dragOver");
};

div.prototype.onDragLeave=function(e,source){
	if(__DEV__){
		console.assert(!(e.currentTarget).hasClass(this.getClass()));
	}
	$(e.currentTarget).removeClass("hbc-dragOver");
};

div.prototype.onDrap=function(e,source){

};

function bindEvent(divElement){
	var $divElement=$(divElement);
	var op={
		over: function (e) { _.bind(showMenu, this, e);}
	};

	function showMenu(e){

	}
	$divElement.on("mousemove",op.over);
	function unbindEvent() {
		$divElement.off("mousemove",op.over);
    }
    return unbindEvent;
}

var name = "cn.com.HBCK.ITPlat.Templates.HbtDiv";
module.exports = exports[name] = oo.register(name, div);

var divobj=div.createInstance();
factory.getInstance().register(divobj.getClass(),divobj);
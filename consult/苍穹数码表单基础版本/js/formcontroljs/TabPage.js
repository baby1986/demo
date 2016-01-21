var TabPage = Factory.create();
TabPage.prototype = {
	initialize : function(_config){
		if(!_config || !_config.id) return;
		var __index = _config.index || 0;
		this.dom = EJS.Dom.getElement(_config.id);
        
		if(!this.dom) return;
		//this.__tabs = this.dom.getElementsByTagName("li");
        this.__tabs = this.dom.childNodes[1].childNodes;
		this.__contents = this.dom.childNodes[2].childNodes;
		for(var i = 0; i < this.__tabs.length; i++){
			this.__tabs[i].setAttribute("index", i);
			
			if(i == 1){
				EJS.Event.Handler.add(this.__tabs[i], "click", Bind({obj : this, index : i}, function(){
					this.obj.selectTabAtIndex(this.index);
					this.obj.__contents[this.index].innerText = this.obj.__contents[0].innerHTML;
				}));
			}else{
				EJS.Event.Handler.add(this.__tabs[i], "click", Bind({obj : this, index : i}, function(){
					this.obj.selectTabAtIndex(this.index);
				}));
			}
		}


		this.selectTabAtIndex(__index);
	},
	selectTabAtIndex : function(_index){
		for(var i = 0; i < this.__tabs.length; i++){
			if(i == 0 && _index != 0){
				EJS.Dom.CSSHelper.modifyName(this.__tabs[i], "first_tab_normal");
				this.__contents[i].style.display = "none";
			}else if(_index == i){
				EJS.Dom.CSSHelper.modifyName(this.__tabs[i], "tab_active");
				this.__contents[i].style.display = "block";
			}else{
				EJS.Dom.CSSHelper.modifyName(this.__tabs[i], "tab_normal");
				this.__contents[i].style.display = "none";
			}
		}
	}
}

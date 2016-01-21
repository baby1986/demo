EJS.Dom.optionBase = {
    
    setParent : function(_parent){
        this.parent = _parent;
    },
    getParent : function(){
        return this.parent;
    },
    setText : function(_text){
        this.text = _text;
    },
    getText : function(){
        return this.text;
    },
    setValue : function(_value){
        this.value = _value;
    },
    getValue : function(){
        return this.value;
    },
    setIndex : function(_index){
        this.index = _index;
    },
    getIndex : function(){
        return this.index;
    },
    setSelected : function(_selected){
        this.selected = _selected;
    },
    isSelected : function(){
        return this.selected;
    },
    setClassName : function(_className){
        this.className = _className;
    },
    getClassName : function(){
    
        return EJS.Util.getTrueValue(this.className, "");
    },
    setDom : function(_dom){
        this.dom = _dom;
    },
    getDom : function(){
        return this.dom;
    },
    preSelect : function(){
        this.setClassName(EJS.Util.Format.trim(this.getClassName()) + " preSelect");
        EJS.Dom.CSSHelper.modifyName(this.getDom(), this.getClassName());
    },
    cancelPreSelect : function(){
        
        this.setClassName(this.getClassName().replace(/selected/g,""));
        EJS.Dom.CSSHelper.modifyName(this.getDom(), this.getClassName());
        this.setSelected(false);
    },
    select : function(){
        this.setClassName(EJS.Util.Format.trim(this.getClassName()) + " selected");
        this.getParent().addSelectedOption(this.getIndex(), this);
        this.setSelected(true);
        EJS.Dom.CSSHelper.modifyName(this.getDom(), this.getClassName());
    },
    cancel : function(){
        this.setClassName(this.getClassName().replace(/selected/g,""));
        this.getParent().removeSelectedOption(this.getIndex());
        this.setSelected(false);
        EJS.Dom.CSSHelper.modifyName(this.getDom(), this.getClassName());
    },
    click : function(){
        
        if(!this.getParent().isMultChoice()){
            this.getParent().cancelAll();
        }
        if(this.isSelected()){
            this.cancel();
        }else{
            this.select();
            //alert(1111)
        }
        
    },
    getAttributesOnly : function(){
        return {
            text : this.getText(),
            value : this.getValue(),
            selected : this.isSelected()
        }
    }
}
EJS.Dom.option = Factory.create();
EJS.Dom.option.prototype = {
    initialize : function(_config){
        this.setText(EJS.Util.getTrueValue(EJS.Util.Format.trim(_config.text), ""));
        this.setValue(EJS.Util.getTrueValue(EJS.Util.Format.trim(_config.value), ""));
        this.setSelected(EJS.Util.getTrueValue(_config.selected, false));
        this.setClassName(this.isSelected() ? "selected" : "");
        this.setDom(EJS.Dom.DomHelper.create(
            {
                tagName : "li",
                attribute : {clazz : this.getClassName()},
                children : [
                    {textNode : this.getText()}
                ]
            }
        ));
        /***************************************************
        //这里为了在表单编辑上编辑控件，暂把该代码取消
        ****************************************************/
        /*
        EJS.Event.Handler.add(this.getDom(), "click", Bind(this, function(){
            this.click.call(this);//try this.click()
        }));
        */
    },
    changeOptionText : function(_text){
        if(_text && _text != ""){
            this.setText(_text);
            this.getDom().innerText = _text;
        }
    },
    changeOptionValue : function(_value){
        if(_value && _value != ""){
            this.setValue(_value);
        }
    },
    changeOptionSelected : function(_selected){
        if(_selected == "0"){
            this.cancelPreSelect();
        }else if(_selected == "1"){
            this.select();
        }
    }
}
EJS.extend(EJS.Dom.option, EJS.Dom.optionBase);
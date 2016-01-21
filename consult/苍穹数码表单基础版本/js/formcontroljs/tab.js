EJS.Dom.tab = function(_config){
    var __self = this;
    this.setText = function(_text){
        this.text = _text;
        if(this.getDom()){
            this.getDom().childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].nodeValue = _text;
        }
    }
    this.getText = function(){
        return this.text;
    }
    this.setPanel = function(_panel){
        this.panel = _panel;
    }
    this.getPanel = function(){
        return this.panel;
    }
    this.hiddenPanel = function(){
        this.getPanel().hidden();
    }
    this.showPanel = function(){
        this.getPanel().show();
    }
    this.setIndex = function(_index){
        this.index = _index;
    }
    this.getIndex = function(){
        return this.index;
    }
    this.activation = function(){
        EJS.Dom.CSSHelper.modifyName(this.getDom(), "ejs-tabbedpane-header-active");
        this.getPanel().show();
    }
    this.deactivation = function(){
        EJS.Dom.CSSHelper.modifyName(this.getDom(), "");
        this.getPanel().hidden();
    }

    this.setParent = function(_parent){
        this.parent = _parent;
    }
    this.getParent = function(){
        return this.parent;
    }

    {
        
        this.setText(_config.text);
        this.setIndex(_config.index);

        //this.setClassName(EJS.Util.getTrueValue(_config.className, ""));
        _config.panel.className = "ejs-tabbedpane-panel";
        //#!
        
        this.setPanel(new EJS.Dom.panel(_config.panel));//新建tab对应的面板
        
        this.setDom(EJS.Dom.DomHelper.create(
        {
            tagName : "li",
            attribute : {clazz : ""},
            children : [
                {
                    tagName : "a",
                    attribute : {href : "javascript:void(0)", hideFocus : "on"},
                    children : [
                        {
                            tagName : "em",
                            children : [
                                {
                                    tagName : "span",
                                    attribute : {clazz : "ejs-tabbedpane-header-inner"},
                                    children : [
                                        {
                                            tagName : "span",
                                            attribute : {clazz : "ejs-tabbedpane-header-inner-text"},
                                            children : [
                                                {textNode : this.getText()}
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
        ));
        this.addClick(
            function(){
                __self.getParent().selectTabAt(__self.getIndex());
            }
        );
    
    
    
    }(_config)
}

EJS.Dom.tab.prototype = {
    getAttributesOnly : function(_isEqual){
        return {
            index : this.getIndex(),
            text : this.getText(),
            panel : this.getPanel().getAttributesOnly()
        }
    },
    getAttributes : function(){
        attributeList = [];
        attributeList.push({
            para : {name : "基本属性",value : ""}, 
            nodes : [
                {para : {name : "id", value : this.getId(), fun : Bind(this, this.setId)}},
                {para : {name : "name", value : this.getName(), fun : Bind(this, this.setName)}},
                {para : {name : "width", value : parseInt(this.getWidth()), fun : Bind(this, this.setWidth)}},
                {para : {name : "height", value : parseInt(this.getHeight()), fun : Bind(this, this.setHeight)}},
                {para : {name : "left", value : parseInt(this.getLeft()), fun : Bind(this, this.setLeft)}},
                {para : {name : "top", value : parseInt(this.getTop()), fun : Bind(this, this.setTop)}},
                {para : {name : "控件类型", value : this.getCtType(), fun : Bind(this, this.changeControlType)}, type : "select", items : conList}//增加控件属性的例子
                
            ]   
        });
        return attributeList;
    }

}


EJS.extend(EJS.Dom.tab, EJS.Dom.controlBase);

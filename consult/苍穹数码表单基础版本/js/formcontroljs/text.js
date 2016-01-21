EJS.Dom.text = Factory.create();
EJS.Dom.text.prototype = {
    initialize : function(_config){
        this.setCtType("text");
        this.setClassName("ejs-text");
        this.setCid(EJS.Util.Format.trim(EJS.Util.getTrueValue(_config.cid, EJS.Util.GUID.get)));//唯一标识
        this.setId(EJS.Util.Format.trim(EJS.Util.getTrueValue(_config.id, this.getCtType() + EJS.editorConstant.comNum)));
        this.setName(!!_config.name ? EJS.Util.Format.trim(_config.name) : this.getId());
        this.setWidth(EJS.Util.math.getTrueNum(_config.width));
        this.setHeight(EJS.Util.math.getTrueNum(_config.height));
        this.setLineHeight(EJS.Util.math.getTrueNum(_config.lineHeight, _config.height));
        this.setText(EJS.Util.getTrueValue(EJS.Util.Format.trim(_config.text), ""));
        this.setDom(EJS.Dom.DomHelper.create(
            {
                tagName : "table",
                attribute : {clazz : this.getClassName(), id : this.getCid(), name : this.getName(), cellPadding : "0", cellSpacing : "0"},
                style : {left : this.getLeft(), top : this.getTop(), width : this.getWidth(), height : this.getHeight(), lineHeight : this.getLineHeight()},
                children : [
                {tagName : "tbody", children : [
                    {tagName : "tr", children : [
                        {tagName : "td", children : [
                            {textNode : this.getText()}
                        ]}
                    ]}
                ]}
                
                ]
            }
        ));
    },
    
    setWidth : function(_width){
        if(_width != null){
            this.width = _width;
        }
    },

    setHeight : function(_height){
        if(_height != null){
            this.height = _height;
        }
    },
    setLineHeight : function(_lineHeight){
        if(_lineHeight != null){
            this.lineHeight = _lineHeight;
        }
    },
    getLineHeight : function(){
        return this.lineHeight;
    },

    setText : function(_text){
        this.text = _text;
    },
    getText : function(){
        return this.text;
    }
}
EJS.extend(EJS.Dom.text, EJS.Dom.controlBase);

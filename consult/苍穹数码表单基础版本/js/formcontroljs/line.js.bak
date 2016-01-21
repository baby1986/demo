EJS.Dom.line = Factory.create();
EJS.Dom.line.prototype = {
    initialize : function(_config){
        this.setCtType("line");
        this.setLineType(_config.lineType || "hLine");
        this.setLineStyle(_config.lineStyle || "solid");
        this.setLineColor(_config.lineColor || "8DB2E3");
        this.setLineWidth(_config.lineWidth || 1);
        this.setClassName(this.getLineType() == "hLine" ? "ejs-hline" : "ejs-vline");
        this.setCid(EJS.Util.Format.trim(EJS.Util.getTrueValue(_config.cid, EJS.Util.GUID.get)));//唯一标识
        this.setId(EJS.Util.Format.trim(EJS.Util.getTrueValue(_config.id, this.getCtType() + EJS.editorConstant.comNum)));
        this.setName(!!_config.name ? EJS.Util.Format.trim(_config.name) : this.getId());
        this.setWidth(EJS.Util.math.getTrueNum(_config.width));
        this.setHeight(EJS.Util.math.getTrueNum(_config.height));
        this.setMinWidth(EJS.Util.math.getTrueNum(_config.minWidth));
        this.setMinHeight(EJS.Util.math.getTrueNum(_config.minHeight));
        this.setDom(EJS.Dom.DomHelper.create(
            {
                tagName : "div",
                attribute : {clazz : this.getClassName(), id : this.getCid(), name : this.getName()},
                style : {borderStyle : this.getLineStyle(), borderTopWidth : this.getLineType() == "hLine" ? this.getLineWidth() : 0, borderLeftWidth : this.getLineType() == "vLine" ? this.getLineWidth() : 0, borderColor : "#"+this.getLineColor(), left : this.getLeft(), top : this.getTop(), width : (parseInt(this.getWidth()) - this.getBorderLeftWidth() - this.getBorderRightWidth()) + "px", height : (parseInt(this.getHeight()) - this.getBorderTopWidth() - this.getBorderBottomWidth()) + "px"}
            }
        ));
    },
    
    setLineType : function(_lineType){
        this.lineType = _lineType;
    },

    getLineType : function(){
        return this.lineType || "hLine"; 
    },
    setLineStyle : function(_lineStyle){
        this.lineStyle = _lineStyle || "solid";
        if(this.getDom()){
            this.getDom().style.borderStyle = this.lineStyle;
        }
    },
    getLineStyle : function(){
        return this.lineStyle || "solid";
    },
    setLineColor : function(_lineColor){
        this.lineColor = _lineColor || "8DB2E3";
        if(this.getDom()){
            this.getDom().style.borderColor = this.lineColor;
        }
    },
    getLineColor : function(){
        return this.lineColor || "8DB2E3";
    },
    setLineWidth : function(_lineWidth){
        this.lineWidth = _lineWidth || "1";
        if(this.getDom()){
            if(this.getLineType() == "hLine"){
                this.getDom().style.borderTopWidth = this.lineWidth + "px";
            }else{
                this.getDom().style.borderLeftWidth = this.lineWidth + "px";
            }
        }
    },
    getLineWidth : function(){
        return this.lineWidth;
    },
    getAttributesOnly : function(_isEqual){
        return {
            cid     : !!_isEqual ? this.getCid() : EJS.Util.GUID.get(),
            id      : this.getId(),
            ctType  : this.getCtType(),
            type    : "line",
            className : this.getClassName(),
            name    : this.getName(),
            left    : parseInt(this.getLeft()),
            top     : parseInt(this.getTop()),
            width   : parseInt(this.getWidth()),
            height  : parseInt(this.getHeight())
        }
    },
    getAttributes : function(){
        attributeList = [];
        attributeList.push({
            para : {name : "基本属性",value : ""}, 
            nodes : [
                {para : {name : "id", value : this.getId()}},
                {para : {name : "name", value : this.getName(), fun : Bind(this, this.setName)}},
                {para : {name : "width", value : parseInt(this.getWidth()), fun : Bind(this, this.setWidth)}},
                {para : {name : "height", value : parseInt(this.getHeight()), fun : Bind(this, this.setHeight)}},
                {para : {name : "left", value : parseInt(this.getLeft()), fun : Bind(this, this.setLeft)}},
                {para : {name : "top", value : parseInt(this.getTop()), fun : Bind(this, this.setTop)}},
                {para : {name : "lineWidth", value : parseInt(this.getLineWidth()), fun : Bind(this, this.setLineWidth)}},
                {para : {name : "颜色", value : this.getLineColor(), fun : Bind(this, this.setLineColor)}, type : "color"},
                {para : {name : "控件类型", value : this.getCtType(), fun : Bind(this, this.changeControlType)}, type : "select", items : conList},//增加控件属性的例子
                {para : {name : "线型", value : this.getLineStyle(), fun : Bind(this, this.setLineStyle)}, type : "select", items : [{name : "实线", value : "solid"}, 
                                                                                                                            {name : "虚线", value : "dotted"}]}//增加控件属性的例子


                
            ]   
        });
        return attributeList;
    },




    //覆盖父类方法
    setWidth : function(_width){
        if(!isNaN(parseInt(_width))){
            this.width = parseInt(_width) + "px";
        }
        if(this.getDom()){
            this.getDom().style.width = this.getWidth();
            //这里判断当前是否为编辑状态，控件的resize控件已生成并且resize为激活状态
            if(this.getTopContainer().getCtType() == "editor" && this.resize && this.resize.isDisplay() && _width != "" && !isNaN(parseInt(_width))){
                this.resize.setWidth(parseInt(_width));
            }

        }
    },
    //覆盖父类方法
    setHeight : function(_height){
        if(!isNaN(parseInt(_height))){
            this.height = parseInt(_height) + "px";
        }
        if(this.getDom()){
            this.getDom().style.height = this.getHeight();
            //这里判断当前是否为编辑状态，控件的resize控件已生成并且resize为激活状态
            if(this.getTopContainer().getCtType() == "editor" && this.resize && this.resize.isDisplay() && _height != "" && !isNaN(parseInt(_height))){
                this.resize.setHeight(parseInt(_height));
            }

        }
    },
    //覆盖父类方法
    setLeft : function(_left){
        
        if(!isNaN(parseInt(_left))){
            this.left = parseInt(_left) + "px";
        }
        
        if(this.getDom()){
            this.getDom().style.left = this.getLeft();
            //这里判断当前是否为编辑状态，控件的resize控件已生成并且resize为激活状态
            if(this.getTopContainer().getCtType() == "editor" && this.resize && this.resize.isDisplay() && _left != "" && !isNaN(parseInt(_left))){
                this.resize.setLeft(parseInt(_left));
            }

        }

    },
    //覆盖父类方法
    setTop : function(_top){
        if(!isNaN(parseInt(_top))){
            this.top = parseInt(_top) + "px";
        }
        if(this.getDom()){
            this.getDom().style.top = this.getTop();
            //这里判断当前是否为编辑状态，控件的resize控件已生成并且resize为激活状态
            if(this.getTopContainer().getCtType() == "editor" && this.resize && this.resize.isDisplay() && _top != "" && !isNaN(parseInt(_top))){
                this.resize.setTop(parseInt(_top));
            }
        }
    }

}
EJS.extend(EJS.Dom.line, EJS.Dom.controlBase);
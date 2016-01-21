

/**
 *label:标签控件
 *attribute:
 *          forTag:标签关联的控件
 *          text:标签显示文字
 *
 *
 */
EJS.Dom.label = Factory.create();
EJS.Dom.label.prototype = {
    initialize : function(_config){
        this.setCtType("label");
        this.setClassName(EJS.Util.getTrueValue(_config.className, "ejs-label"));
        //this.setId(EJS.Util.Format.trim(EJS.Util.getTrueValue(_config.id, EJS.Util.GUID.get)));
        this.setCid(EJS.Util.Format.trim(EJS.Util.getTrueValue(_config.cid, EJS.Util.GUID.get)));//唯一标识
        this.setId(EJS.Util.Format.trim(EJS.Util.getTrueValue(_config.id, this.getCtType() + EJS.editorConstant.comNum)));
        this.setName(!!_config.name ? EJS.Util.Format.trim(_config.name) : this.getId());
        this.setLeft(EJS.Util.math.getTrueNum(_config.left));
        this.setTop(EJS.Util.math.getTrueNum(_config.top));
        this.setWidth(EJS.Util.math.getTrueNum(_config.width));
        this.setHeight(EJS.Util.math.getTrueNum(_config.height));
        this.setText(EJS.Util.getTrueValue(EJS.Util.Format.trim(_config.text), ""));
        this.setForTag(EJS.Util.getTrueValue(EJS.Util.Format.trim(_config.forTag), ""));
        this.setDom(EJS.Dom.DomHelper.create(
            {
                tagName : "label",
                attribute : {clazz : this.getClassName(), id : this.getCid(), name : this.getName(), forTag : this.getForTag()},
                style : {left : this.getLeft(), top : this.getTop(), width : (parseInt(this.getWidth()) - this.getBorderLeftWidth() - this.getBorderRightWidth()) + "px", height : (parseInt(this.getHeight()) - this.getBorderTopWidth() - this.getBorderBottomWidth()) + "px", lineHeight : this.getHeight()},
                children : [
                    {textNode : this.getText()}
                ]
            }
        ));
        
    },
    setForTag : function(_forTag){
        this.forTag = _forTag;
    },
    getForTag : function(){
        return this.forTag;
    },
    setText : function(_text){
        if(!EJS.editorGlobalVariable.isUndo){
            EJS.operateMgr.addOpt(this.getCid(), this.getParentPanel().getCid(), {text : this.text}, {text : _text});
        }
        this.text = _text;
        
        if(this.getDom()){
            this.getDom().childNodes[0].nodeValue = _text;
        }
    },
    getText : function(){
        return this.text;
    },
    getAttributesOnly : function(_isEqual){
        return {
            cid     : !!_isEqual ? this.getCid() : EJS.Util.GUID.get(),
            id      : this.getId() || "",
            ctType  : "label",
            className : this.getClassName(),
            name    : this.getName(),
            left    : parseInt(this.getLeft()),
            top     : parseInt(this.getTop()),
            width   : parseInt(this.getWidth()),
            height  : parseInt(this.getHeight()),
            forTag  : this.getForTag(),
            text    : this.getText(),
            test    : this.getTest()//增加控件属性的例子
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
                {para : {name : "text", value : this.getText(), fun : Bind(this, this.setText)}},
                {para : {name : "字体", value : this.getTest(), fun : Bind(this, this.setTest)}, type : "select", items : [{name : "方正舒体", value : "fangzhengshuti"}, 
                                                                                                                            {name : "方正姚体", value : "fangzhengyaoti"}, 
                                                                                                                            {name : "仿宋_GB2312", value : "fangsonggb2312"}, 
                                                                                                                            {name : "黑体", value : "heiti"}, 
                                                                                                                            {name : "华文彩云", value : "huawencaiyun"}, 
                                                                                                                            {name : "华文仿宋", value : "huawenfangsong"}, 
                                                                                                                            {name : "华文琥珀", value : "huawenhupo"}, 
                                                                                                                            {name : "华文隶书", value : "huawenlishu"}, 
                                                                                                                            {name : "华文宋体", value : "huawensongti"}, 
                                                                                                                            {name : "华文细黑", value : "huawenheiti"}, 
                                                                                                                            {name : "华文新魏", value : "huawenxinwei"}, 
                                                                                                                            {name : "华文行楷", value : "huawenxingkai"}, 
                                                                                                                            {name : "华文中宋", value : "huawenzhongsong"}, 
                                                                                                                            {name : "楷体_GB2312", value : "kaitigb2312"}, 
                                                                                                                            {name : "隶书", value : "lishu"}, 
                                                                                                                            {name : "宋体", value : "songti"}, 
                                                                                                                            {name : "新软雅黑", value : "xinruanyahei"}, 
                                                                                                                            {name : "新宋体", value : "xinsongti"}, 
                                                                                                                            {name : "幼圆", value : "youyuan"}]},//增加控件属性的例子
                {para : {name : "控件类型", value : this.getCtType(), fun : Bind(this, this.changeControlType)}, type : "select", items : conList},//增加控件属性的例子
                {para : {name : "颜色", value : this.getColor(), fun : Bind(this, this.setColor)}, type : "color"},
                {para : {name : "内容", value : this.getContent(), fun : Bind(this, this.setContent)}, type : "dialog"}
            ]   
        });
            
        return attributeList;
    },
    //增加控件属性的例子
    setTest : function(_test){
        this.test = _test;
    },
    //增加控件属性的例子
    getTest : function(){
        return this.test;
    },
    getContent : function(){
        return this.content || "";
    },
    setContent : function(_dom){
        showDialog({content : this.getContent(), onDone : Bind(this, function(_content){
            this.content = _content;
            _dom.value = "修改";
            hiddenDialog();
        })});
        
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
EJS.extend(EJS.Dom.label,EJS.Dom.controlBase);

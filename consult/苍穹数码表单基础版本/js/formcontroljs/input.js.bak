
/**
 *inputBase:文本输入型基类
 *attribute:
 *          dtType:数据类型
 *          immediately:是否立及验证
 *          like:要求与某个域的值相同
 *          regexp:正则表达式验证，此属性优先于limit
 *          isNot:对limit与regexp属性取反
 *          defaultValue:默认值
 *
 *
 */
EJS.Dom.inputBase = {
    setDtType : function(_dtType){
        this.dtType = _dtType;
    },
    getDtType : function(){
        return this.dtType;
    },
    setImmediately : function(_immediately){
        this.immediately = _immediately;
    },
    getImmediately : function(){
        return this.immediately;
    },
    setLike : function(_like){
        this.like = _like;
    },
    getLike : function(){
        return this.like;
    },
    setRegexp : function(_regexp){
        this.regexp = _regexp;
    },
    getRegexp : function(){
        return this.regexp;
    },
    setIsNot : function(_isNot){
        this.isNot = _isNot;
    },
    getIsNot : function(){
        return this.isNot;
    },
    setDefaultValue : function(_defaultValue){
        this.defaultValue = _defaultValue;
    },
    getDefaultValue : function(){
        return this.defaultValue;
    },
    setValue : function(_value){
        this.value = _value;
    },
    getValue : function(){
        return this.value;
    },
    validate : function(){//表单的校验方法
        if(this.getCtType() == "singleText"){
            if(this.getLike() != null && this.getLike() != ""){
                var likeObj = this.getParentPanel().getChild(this.getLike());
                if(likeObj != null && likeObj.getValue() != this.getValue()){
                    return this.getMsg();
                }
            }else{        
                
                if(this.getAllowEmpty() == false || this.getValue().length > 0){
                    
                    if(!EJS.Util.Regex[EJS.Util.Format.lowercase(this.getDtType())].test(this.getValue())){
                        return this.getMsg();
                    }
                    if(this.getLimit() == ""){
                        this.setLimit("1-");
                    }
                    //校验输入值的有效区间
                    
                    switch(this.getDtType()){
                        case "int" : if(!EJS.Util.math.availNumLimit(parseInt(this.getValue()), this.getLimit())) return this.getMsg();break;
                        case "decimal" : if(!EJS.Util.math.availNumLimit(parseFloat(this.getValue()), this.getLimit()))  return this.getMsg();break;
                        default :if(!EJS.Util.math.availNumLimit(this.getValue().length, this.getLimit())) return this.getMsg();break;
                    }
                }
            }
        }else if(this.getCtType() == "checkboxGroup"){
            
        }
    },









    //覆盖父类方法
    setWidth : function(_width){
        if(!isNaN(_width)){
            this.width = _width + "px";
        }
        if(this.getDom()){
            this.getDom().style.width = this.getWidth();
            //这里判断当前是否为编辑状态，控件的resize控件已生成并且resize为激活状态
            if(this.getTopContainer().getCtType() == "editor" && this.resize && this.resize.isDisplay() && _width != "" && !isNaN(_width)){
                this.resize.setWidth(parseInt(_width));
            }

        }
    },
    //覆盖父类方法
    setHeight : function(_height){
        if(!isNaN(_height)){
            this.height = _height + "px";
        }
        if(this.getDom()){
            this.getDom().style.height = this.getHeight();
            //这里判断当前是否为编辑状态，控件的resize控件已生成并且resize为激活状态
            if(this.getTopContainer().getCtType() == "editor" && this.resize && this.resize.isDisplay() && _height != "" && !isNaN(_height)){
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
EJS.Dom.inputBase.prototype = EJS.Dom.fieldBase;





/**
 *singleText:单行输入域
 *
 *
 *
 *
 */


EJS.Dom.singleText = Factory.create();
EJS.Dom.singleText.prototype = {
    initialize : function(_config){
        this.setCtType("singleText");
        this.setClassName(EJS.Util.getTrueValue(_config.className, "ejs-singletext"));
        this.setDtType(EJS.Util.getTrueValue(_config.dtType, "all"));
        this.setCid(EJS.Util.Format.trim(EJS.Util.getTrueValue(_config.cid, EJS.Util.GUID.get)));//唯一标识
        this.setId(EJS.Util.Format.trim(EJS.Util.getTrueValue(_config.id, this.getCtType() + EJS.editorConstant.comNum)));
        this.setName(!!_config.name ? EJS.Util.Format.trim(_config.name) : this.getId());
        this.setLeft(EJS.Util.math.getTrueNum(_config.left),"");
        this.setTop(EJS.Util.math.getTrueNum(_config.top),"");
        this.setWidth(EJS.Util.math.getTrueNum(_config.width),"");
        this.setHeight(EJS.Util.math.getTrueNum(_config.height),"");
        this.setLike(EJS.Util.getTrueValue(_config.like, ""));
        this.setLimit(EJS.Util.getTrueValue(_config.limit, ""));
        this.setMsg(EJS.Util.getTrueValue(_config.msg, ""));
        this.setPrompt(EJS.Util.getTrueValue(_config.prompt, ""));
        this.setAllowEmpty(EJS.Util.getTrueValue(_config.allowEmpty, true));
        this.setReadOnly(EJS.Util.getTrueValue(_config.readOnly, false));
        this.setDom(EJS.Dom.DomHelper.create(
            {
                tagName : "input",
                attribute : {clazz : this.getClassName(), id : this.getCid(), name : this.getName(), value : "", autocomplete : "off", readOnly : this.isReadOnly() ? "readOnly" : ""},
                style : {left : this.getLeft(), top : this.getTop(), width : (parseInt(this.getWidth()) - this.getBorderLeftWidth() - this.getBorderRightWidth() - 2) + "px", height : (parseInt(this.getHeight()) - this.getBorderTopWidth() - this.getBorderBottomWidth() - 2) + "px"}
            }
        ));
        
        this.setValue(EJS.Util.getTrueValue(this.getPrompt()? this.getPrompt() : _config.value, ""));

        if(this.getCurrentState() == "running"){
            this.addKeyup(Bind(this, function(){
                if(this.getValue() != this.getDom().value) this.setValue(this.getDom().value);
            }));
            this.addClick(Bind(this, this.initTextValue));
            this.addBlur(Bind(this, function(){
                if(this.getPrompt() != "" && (this.getPrompt() == this.getValue() || this.getValue() == "")){
                    this.setValue(this.getPrompt());
                }
            }));
        }
    },

    setValue : function(_value){
        if(this.getPrompt() != _value) this.value = _value;
        if(this.value == null  || _value == "") this.value = "";
        this.getDom().value = _value;
        //if(_value == this.getPrompt() && _value != ""){
        if(_value == this.getPrompt() && _value != ""){
            EJS.Dom.CSSHelper.modifyName(this.getDom(), this.getClassName()+" ejs-prompt");
        }else{
            EJS.Dom.CSSHelper.modifyName(this.getDom(), this.getClassName());
        }
        
    },

    initTextValue : function(){
        EJS.Event.cancelBubble();
        if(this.getPrompt() != "" && this.getPrompt() == this.getDom().value && !this.isReadOnly()){
            this.setValue("");
        }
    },
    


    setReadOnly : function(_readOnly){
        this.readOnly = _readOnly;
    },
    isReadOnly : function(){
        return this.readOnly != null ? this.readOnly : false;
    },


    getAttributesOnly : function(_isEqual){
        return {
            cid     : !!_isEqual ? this.getCid() : EJS.Util.GUID.get(),
            id      : this.getId(),
            ctType  : this.getCtType(),
            className : this.getClassName(),
            name    : this.getName(),
            left    : parseInt(this.getLeft()),
            top     : parseInt(this.getTop()),
            width   : parseInt(this.getWidth()),
            height  : parseInt(this.getHeight()),
            value  : this.getValue()

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
                {para : {name : "value", value : this.getValue(), fun : Bind(this, this.setValue)}},
                {para : {name : "控件类型", value : this.getCtType(), fun : Bind(this, this.changeControlType)}, type : "select", items : conList}//增加控件属性的例子
                
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
EJS.extend(EJS.Dom.singleText, EJS.Dom.inputBase);

EJS.Dom.mutilText = Factory.create();
EJS.Dom.mutilText.prototype = {
    initialize : function(_config){
        this.setCtType("mutilText");
        this.setClassName(EJS.Util.getTrueValue(_config.className, "ejs-mutiltext"));
        this.setDtType(EJS.Util.getTrueValue(_config.dtType, "all"));
        this.setCid(EJS.Util.Format.trim(EJS.Util.getTrueValue(_config.cid, EJS.Util.GUID.get)));//唯一标识
        this.setId(EJS.Util.Format.trim(EJS.Util.getTrueValue(_config.id, "")));
        this.setName(!!_config.name ? EJS.Util.Format.trim(_config.name) : this.getId());
        this.setLeft(EJS.Util.math.getTrueNum(_config.left),"");
        this.setTop(EJS.Util.math.getTrueNum(_config.top),"");
        this.setWidth(EJS.Util.math.getTrueNum(_config.width),"");
        this.setHeight(EJS.Util.math.getTrueNum(_config.height),"");
        this.setLike(EJS.Util.getTrueValue(_config.like, ""));
        this.setLimit(EJS.Util.getTrueValue(_config.limit, ""));
        this.setMsg(EJS.Util.getTrueValue(_config.msg, ""));
        this.setPrompt(EJS.Util.getTrueValue(_config.prompt, ""));
        this.setAllowEmpty(EJS.Util.getTrueValue(_config.allowEmpty, true));
        this.setReadOnly(EJS.Util.getTrueValue(_config.readOnly, false));
        this.setDom(EJS.Dom.DomHelper.create(
            {
                tagName : "textarea",
                attribute : {clazz : this.getClassName(), id : this.getCid(), name : this.getName(), value : "", autocomplete : "off", readOnly : this.isReadOnly() ? "readOnly" : ""},
                style : {left : this.getLeft(), top : this.getTop(), width : (parseInt(this.getWidth()) - this.getBorderLeftWidth() - this.getBorderRightWidth() - 2) + "px", height : (parseInt(this.getHeight()) - this.getBorderTopWidth() - this.getBorderBottomWidth() - 2) + "px"}
            }
        ));
        this.setValue(EJS.Util.getTrueValue(this.getPrompt()? this.getPrompt() : _config.value, ""));

        if(this.getCurrentState() == "running"){
            this.addKeyup(Bind(this, function(){
                if(this.getValue() != this.getDom().value) this.setValue(this.getDom().value);
            }));
            this.addClick(Bind(this, this.initTextValue));
            this.addBlur(Bind(this, function(){
                if(this.getPrompt() != "" && (this.getPrompt() == this.getValue() || this.getValue() == "")){
                    this.setValue(this.getPrompt());
                }
            }));
        }

    },
    setRows : function(_rows){
        this.rows = isFinite(_rows) ? _rows : 5;
    },
    getRows : function(){
        return this.rows;
    },
    setCols : function(_cols){
        this.cols = isFinite(_cols) ? _cols : 8;
    },
    getCols : function(){
        return this.cols;
    }
    
}
EJS.extend(EJS.Dom.mutilText, EJS.Dom.singleText);

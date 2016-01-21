/**
 *listBox
 *
 *
 *
 *
 */
EJS.Dom.listBox = function(_config){
    var __self = this;
    var __optionArea;
    var __opsObj=[];
    //this.options=[],this.selecteds={};
    this.setParent = function(_p){
        this.parent = _p;
    }
    this.getParent = function(){
        return this.parent;
    }


    //覆盖父类方法
    this.setLeft = function(_left){
        
        if(!isNaN(_left)){
            this.left = _left + "px";
        }
        if(this.getDom()){
            this.getDom().style.left = this.getLeft();
            //这里判断当前是否为编辑状态，控件的resize控件已生成并且resize为激活状态
            if(this.getTopContainer().getCtType() == "editor" && this.resize && this.resize.isDisplay() && _left != "" && !isNaN(_left)){
                this.resize.setLeft(parseInt(_left));
            }

        }

    }
    //覆盖父类方法
    this.setTop = function(_top){
        if(!isNaN(_top)){
            this.top = _top + "px";
        }
        if(this.getDom()){
            this.getDom().style.top = this.getTop();
            //这里判断当前是否为编辑状态，控件的resize控件已生成并且resize为激活状态
            if(this.getTopContainer().getCtType() == "editor" && this.resize && this.resize.isDisplay() && _top != "" && !isNaN(_top)){
                this.resize.setTop(parseInt(_top));
            }
        }
    }




    this.setWidth = function(_width){
        this.superClass.setWidth(parseInt(_width));
        if(this.getDom()){
            this.getDom().style.width = this.getWidth();
        }
    }
    this.setHeight = function(_height){
        if(_height && _height != null){
            this.superClass.setHeight(parseInt(_height));
            if(this.getDom()){
                this.getDom().style.height = this.getHeight();
                __optionArea.style.height = (parseInt(this.getHeight()) - 30) + "px";
            }
        }
    }
    this.setPrompt = function(_prompt){
        this.superClass.setPrompt(_prompt);
        if(this.getDom()){
            this.getDom().childNodes[0].innerHTML = _prompt;
        }
    }

    this.addOptions = function(_options){
        this.superClass.addOptions.call(this, _options);
        if(_options != null && !isNaN(_options.length)){
            for(var i = 0; i < _options.length; i++){
                __optionArea.appendChild(_options[i].getDom());
            }
        }
    
    }
    //清除所有的option项
    this.removeAllOptions = function(){
        this.superClass.removeAllOptions.call(this);
        for(var i = __optionArea.childNodes.length - 1; i >= 0; i--){
            __optionArea.removeChild(__optionArea.childNodes[i]);
        }
    }
    
    this.repaint = function(_left, _top, _width, _height, _prompt, _options){
        this.setLeft(_left);
        this.setTop(_top);
        this.setWidth(_width);
        this.setHeight(_height);
        this.setPrompt(_prompt);
        this.removeAllSelectedOption();
        this.removeAllOptions();
        this.addOptions(_options);
        
    }

    
    {
        
        this.setCtType("listBox");
        this.setClassName(EJS.Util.getTrueValue(_config.className, "ejs-listBox"));
        this.setCid(EJS.Util.Format.trim(EJS.Util.getTrueValue(_config.cid, EJS.Util.GUID.get)));//唯一标识
        this.setId(EJS.Util.Format.trim(EJS.Util.getTrueValue(_config.id, this.getCtType() + EJS.editorConstant.comNum)));
        this.setName(!!_config.name ? EJS.Util.Format.trim(_config.name) : this.getId());
        this.setLeft(EJS.Util.math.getTrueNum(_config.left));
        this.setTop(EJS.Util.math.getTrueNum(_config.top));
        this.setWidth(EJS.Util.math.getTrueNum(_config.width));
        this.setHeight(EJS.Util.math.getTrueNum(_config.height));
        this.setPrompt(EJS.Util.getTrueValue(_config.prompt, ""));
        this.setLimit(EJS.Util.getTrueValue(_config.limit, ""));
        this.setMsg(EJS.Util.getTrueValue(_config.msg, ""));
        this.setAllowEmpty(EJS.Util.getTrueValue(_config.allowEmpty, true));
        this.setMultChoice(EJS.Util.getTrueValue(_config.multChoice, false));
        var __w = parseInt(this.getWidth()) - this.getBorderLeftWidth() - this.getBorderRightWidth();
        var __h = parseInt(this.getHeight()) - this.getBorderTopWidth() - this.getBorderBottomWidth();
        this.setDom(EJS.Dom.DomHelper.create(
            {
                tagName : "div",
                attribute : {clazz : this.getClassName(), id : this.getCid()},
                style : {left : this.getLeft(), top : this.getTop(), width : (!isNaN(__w) && __w >= 0 ? __w : 0) + "px", height : (!isNaN(__h) && __h >= 0 ? __h : 0) + "px", display : "none"},
                children : [
                    {
                        tagName : "div",
                        attribute : {clazz : "ejs-prompt", id : this.getCid()},
                        children : [
                            {textNode : this.getPrompt()}
                        ]
                    },
                    {
                        tagName : "ul",
                        attribute : {clazz : "optionArea"},
                        style : {height : this.getHeight() == "" ? "" : (parseInt(this.getHeight()) - 30)+"px"}
                    },
                    {
                        tagName : "div",
                        attribute : {clazz : "bottom"},
                        children : [
                            {
                                tagName : "div",
                                attribute : {clazz : "rb-resize"}
                            }
                        ]
                    }
                ]
            }
        ));
        __optionArea = this.getDom().childNodes[1];
        if(_config.options != null && !isNaN(_config.options.length)){
            for(var i = 0; i < _config.options.length; i++){
                __opsObj.push(new EJS.Dom.option(_config.options[i]));
            }
        }
        this.addOptions(__opsObj);
        this.addKeydown(function(){//这个方法只有在combobox中才可以在ff中使用
            if(event.keyCode == 39 || event.keyCode == 40){
                __self.nextItem();   
            }else if(event.keyCode == 37 || event.keyCode == 38){
                __self.previousItem();
            }else if(event.keyCode == 13){
                
                __self.clickPreSelect();
            }
        });

        this.show();
    }(_config)
}
EJS.Dom.listBox.prototype = {
    //修改属性列表的选项数量时调用
    changeOptionNum : function(_num){
        var num = parseInt(_num);
        if(num && !isNaN(num) && num > 0){
            this.removeAllOptions();
            for(var i = 0; i < _num; i++){
                this.addOptions(
                    [new EJS.Dom.option(
                        {
                            text    : "选项"+(i+1),
                            value   : i,
                            selected: false
                        }
                    )]
                );
            }
            this.repaintOptions();
        }
    },


    repaintOptions : function(){
        var optionsNode = this.getDom().childNodes[1].childNodes;
        for(var i = optionsNode.length - 1; i >= 0; i--){
            EJS.Dom.DomHelper.remove(optionsNode[i], optionsNode[i].parentNode);
        }
        optionsNode = this.getAllOption();
        for(var i = 0; i < optionsNode.length; i++){
            //this.getDom().appendChild((this.addOption(new EJS.Dom.option(_config.options[i]))).getDom());
            EJS.Dom.DomHelper.append(optionsNode[i].getDom(), this.getDom().childNodes[1]);
        }
        tableTreeObj.load(this.getAttributes());

    },

    getAttributesOnly : function(_isEqual){
        return {
            cid     : !!_isEqual ? this.getCid() : EJS.Util.GUID.get(),
            id      : this.getId(),
            ctType  : this.getCtType(),
            className : this.getClassName(),
            name    : this.getName(),
            prompt  : this.getPrompt(),
            left    : parseInt(this.getLeft()),
            top     : parseInt(this.getTop()),
            width   : parseInt(this.getWidth()),
            height  : parseInt(this.getHeight()),
            options : this.getAllOptionAttribute()
        }
    },

    getAttributes : function(){
        attributeList = [];
        var options = this.getAllOption();
        var cAtt = {
                        para : {name : "基本属性",value : ""}, 
                        nodes : [
                            {para : {name : "id", value : this.getId(), fun : Bind(this, this.setId)}},
                            {para : {name : "name", value : this.getName(), fun : Bind(this, this.setName)}},
                            {para : {name : "标题", value : this.getPrompt(), fun : Bind(this, this.setPrompt)}},
                            {para : {name : "width", value : parseInt(this.getWidth()), fun : Bind(this, this.setWidth)}},
                            {para : {name : "height", value : parseInt(this.getHeight()), fun : Bind(this, this.setHeight)}},
                            {para : {name : "left", value : parseInt(this.getLeft()), fun : Bind(this, this.setLeft)}},
                            {para : {name : "top", value : parseInt(this.getTop()), fun : Bind(this, this.setTop)}},
                            {para : {name : "控件类型", value : this.getCtType(), fun : Bind(this, this.changeControlType)}, type : "select", items : conList},
                            {
                                para : {name : "选项",value : options.length, fun : Bind(this, this.changeOptionNum)},
                                nodes : []
                            }
                            


                        ]
                        
                    };
        for(var i = 0; i < options.length; i++){
            cAtt.nodes[cAtt.nodes.length - 1].nodes.push({
                para : {name : "选项"+(i+1), value : ""},
                nodes : [
                    {para : {name : "名称", value : options[i].getText(), fun : Bind(options[i], options[i].changeOptionText)}},
                    {para : {name : "键值", value : options[i].getValue(), fun : Bind(options[i], options[i].changeOptionValue)}},
                    {para : {name : "默选", value : "0", fun : Bind(options[i], options[i].changeOptionSelected)}}
                ]
            });
        }
        attributeList.push(cAtt);
        return attributeList;
    }


}
EJS.extend(EJS.Dom.listBox, EJS.Dom.selectBase);

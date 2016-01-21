/**
 *comboBox
 *
 *
 *
 *
 */
EJS.Dom.comboBox = function(_config){
    var __self = this;
    this.__innerField;//输入域
    var __oldValue = "";

    var __mkMap = new EJS.Util.MultiKeyMap({haveSortNum : true});
    //重新计算坐标、宽高后重新渲染下拉框
    function repaint(_prompt, _datas){
        var __absX = parseInt(__self.getAbsoluteX());
        var __abxY = parseInt(__self.getAbsoluteY()) + 20;
        var __width = parseInt(__self.getWidth());
        var __height = __self.getHeight() ? parseInt(__self.getHeight()) : "";
        
        __self.pulldown.repaint(__absX, __abxY, __width, __height, _prompt, _datas);
        __self.pulldown.show();
    }
    //是否为只选模式
    this.setOnlySelect = function(_onlySelect){
        this.onlySelect = _onlySelect;
    }
    this.isOnlySelect = function(){
        return this.onlySelect != null ? this.onlySelect : true;
    }
    //是否需要输入联想功能
    this.setAssociate = function(_associate){
        this.associate = _associate;
    }
    this.isAssociate = function(){
        return this.associate != null ? this.associate : true;
    }



    this.validate = function(){
        return this.__innerField.validate();
    }

    {
        this.setCtType("comboBox");
        this.setClassName(EJS.Util.getTrueValue(_config.className, "ejs-comboBox-panel"));
        this.setCid(EJS.Util.Format.trim(EJS.Util.getTrueValue(_config.cid, EJS.Util.GUID.get)));//唯一标识
        this.setId(EJS.Util.Format.trim(EJS.Util.getTrueValue(_config.id, this.getCtType() + EJS.editorConstant.comNum)));
        this.setName(!!_config.name ? EJS.Util.Format.trim(_config.name) : this.getId());
        this.setLeft(EJS.Util.math.getTrueNum(_config.left));
        this.setTop(EJS.Util.math.getTrueNum(_config.top));
        this.setWidth(EJS.Util.math.getTrueNum(_config.width));
        this.setHeight(EJS.Util.math.getTrueNum(_config.height));
        this.setLimit(EJS.Util.getTrueValue(_config.limit, ""));
        this.setMsg(EJS.Util.getTrueValue(_config.msg, ""));
        this.setAllowEmpty(EJS.Util.getTrueValue(_config.allowEmpty, true));
        this.setImmediately(EJS.Util.getTrueValue(_config.immediately, false));
        this.setIsNot(EJS.Util.getTrueValue(_config.isNot, false));
        this.setValue(EJS.Util.getTrueValue(_config.value, ""));
        this.setPrompt(EJS.Util.getTrueValue(_config.prompt, ""));
        this.setOnlySelect(EJS.Util.getTrueValue(_config.onlySelect, false));
        this.setAssociate(EJS.Util.getTrueValue(_config.onlySelect, true));
        this.setCurrentState(EJS.Util.getTrueValue(_config.currentState, "running"));
        
        if(!this.pulldown)  this.pulldown = new EJS.Dom.listBox({});
        this.pulldown.setMultChoice(EJS.Util.getTrueValue(_config.multChoice, false));
        
        this.__innerField =  new EJS.Dom.singleText(
            {
                ctType  : "singleText",
                className : "ejs-comboBox-innerField",
                width   : parseInt(__self.getWidth()) - 21,
                height : parseInt(__self.getHeight()),
                msg     : __self.getMsg(),
                allowEmpty : __self.getAllowEmpty(),
                dtType  : __self.getDtType(),
                limit   : __self.getLimit(),
                immediately : __self.getImmediately(),
                regexp  : __self.getRegexp(),
                isNot   : __self.getIsNot(),
                value   : __self.getValue(),
                prompt : __self.getPrompt(),
                readOnly : __self.isOnlySelect(),
                currentState : __self.getCurrentState()
            }
        );
        this.setDom(EJS.Dom.DomHelper.create(
            {
                tagName : "div",
                attribute : {clazz : this.getClassName(), id : this.getCid()},
                style : {left : this.getLeft(), top : this.getTop(), width : this.getWidth()},
                children : [
                    this.__innerField.getDom(),
                    {
                        tagName : "img",
                        attribute : {clazz : "ejs-comboBox-btn", src : "images/s.gif"}
                    }
                ]
            }
        ));
        this.options = [];//为了实现表单设计器的功能，加的这个属性
        //初始化options
        if(_config.options && _config.options.length > 0){
            for(var i = 0; i < _config.options.length; i++){
                if(_config.options[i].text != null && _config.options[i].text != ""){
                    var __option = new EJS.Dom.option(_config.options[i]);
                    this.options.push(__option);//为了实现表单设计器的功能，加的这个属性
                    var keys = _config.options[i].text;
                    if(_config.options[i].alias != null && _config.options[i].alias != ""){
                        keys += ","+_config.options[i].alias;
                    }
                    __mkMap.put(keys, __option);//对option的key建立索引
                }
            }
        }
        //点击控件外部时触发事件
        EJS.Dom.eventManager.addMounseDownEvent(
            function(){
                var target = EJS.Event.getEventTarget();
                if(__self.getDom().contains){//ff中dom不支持contains这个方法
                    if(!__self.getDom().contains(target) && !__self.pulldown.getDom().contains(target)){
                        __self.pulldown.hidden();
                    }
                }else{
                    if(__self.getDom().compareDocumentPosition(target) != 20 && __self.pulldown.getDom().compareDocumentPosition(target) != 20){//
                        __self.pulldown.hidden();
                    }
                }
                
            }
        );
        
        if(this.getCurrentState() != "editing"){

            //点击控件时触发事件
            //由于所有combobox都共用一个下拉框，所以在显示前要修正下拉框的父对象
            this.addClick(function(){
                this.__innerField.initTextValue();
                this.__innerField.getDom().focus();//使焦点在输入框内
                //首先修改下拉框的父对象
                if(__self.pulldown.getParent() != __self){
                    __self.pulldown.setParent(__self);
                    
                }
                //如果下拉框还没有生成，则将下拉框增加到页面上
                if(EJS.Dom.getElement(__self.pulldown.getCid()) == null){
                    EJS.Dom.DomHelper.append(__self.pulldown.getDom());
                    __self.pulldown.hidden();
                }
                
                if(__self.pulldown.isDisplay()){
                    //__self.pulldown.hidden();//这句可切换显示、隐藏效果
                }else{
                    var resultList = null;
                    
                    if(__self.isAssociate() && !__self.isOnlySelect() && this.__innerField.value != ""){
                        resultList = __mkMap.like(this.__innerField.value);
                    }else{
                        resultList = __mkMap.getDatas();
                    }
                    if(resultList != null){
                        repaint(__self.getPrompt(), resultList);
                    }
                }
            });
            //点击下拉列表项事件
            __self.pulldown.addClick(function(){
                //event.cancelBubble = true;
                var target = EJS.Event.getEventTarget();
                if(target.tagName == "LI"){
                    var __sted = __self.pulldown.getAllSelectedOption();
                    var __v="";
                    for(var i = 0; i < __sted.length; i++){
                        __v = __sted[i].getText();
                    }
                    
                    this.__innerField.setValue(__v);
                    window.setTimeout(function(){__self.pulldown.hidden();}, 80);
                }
            });
            //松开键时触发事件
            this.__innerField.addKeyup(function(){
                if(__self.isOnlySelect()) return false;
                
                //当输入的为合法字符时，这两个值肯定不相等
                var resultList;
                
                if(this.value != __oldValue){
                    
                    __oldValue = this.value;
                    if(this.value == ""){
                        resultList = __mkMap.getDatas();
                    }else{
                        resultList = __mkMap.like(this.value);
                        
                    }

                    if(resultList != null){
                        repaint(__self.getPrompt(), resultList);
                    }else{
                        if(__self.pulldown.isDisplay()){
                            __self.pulldown.hidden();
                        }
                    }
                }
            });

            this.__innerField.addKeydown(function(){//这个方法只有在combobox中才可以在ff中使用
                var __event = EJS.Event.getEvent();
                if(__event.keyCode == 39 || __event.keyCode == 40){
                    __self.pulldown.nextItem();   
                }else if(__event.keyCode == 37 || __event.keyCode == 38){
                    __self.pulldown.previousItem();
                }else if(__event.keyCode == 13){//回车时触发事件
                    var __sted = __self.pulldown.getAllSelectedOption();
                    if(__sted.length > 0){
                        this.__innerField.setValue(__sted[0].getText());
                    }
                    window.setTimeout(function(){__self.pulldown.hidden();}, 80);
                }
                
            });


        }




    }(_config)
}

EJS.Dom.comboBox.prototype = {


    //覆盖父类方法
    setWidth : function(_width){
        if(!isNaN(_width)){
            this.width = _width + "px";
            if(this.__innerField){
                this.__innerField.setWidth(parseInt(this.getWidth()) - 23);
            }
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


    getAllOptionAttribute : function(){
        var optionsArr = [];
        for(var i = 0; i < this.options.length; i++){
            optionsArr.push(this.options[i].getAttributesOnly());
        }
        return optionsArr;
        
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
            options : this.getAllOptionAttribute(),
            currentState : this.getCurrentState()
        }
    },
    getAttributes : function(){
        attributeList = [];
        var options = this.options;
        
        var cAtt = {
                        para : {name : "基本属性",value : ""}, 
                        nodes : [
                            {para : {name : "id", value : this.getId(), fun : Bind(this, this.setId)}},
                            {para : {name : "name", value : this.getName(), fun : Bind(this, this.setName)}},
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
    },
    //修改属性列表的选项数量时调用
    changeOptionNum : function(_num){
        var num = parseInt(_num);
        if(num && !isNaN(num) && num > 0){
            for(var i = this.options.length - 1; i >= 0 ; i--){
                delete this.options[i];
                this.options.splice(i, 1);
            }
            for(var i = 0; i < _num; i++){
                this.options.push(
                    new EJS.Dom.option(
                        {
                            text    : "选项"+(i+1),
                            value   : i,
                            selected: false
                        }
                    )
                );
            }
            tableTreeObj.load(this.getAttributes());
        }
    }



}

EJS.extend(EJS.Dom.comboBox, EJS.Dom.inputBase);
//EJS.extend(EJS.Dom.comboBox, EJS.Dom.selectBase);
//EJS.Dom.comboBox.prototype.pulldown = new EJS.Dom.listBox({});

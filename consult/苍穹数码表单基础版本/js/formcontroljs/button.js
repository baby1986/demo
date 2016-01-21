EJS.Dom.button = Factory.create();
EJS.Dom.button.prototype = {
    initialize : function(_config){
        
        this.setCtType("button");
        this.setClassName(EJS.Util.getTrueValue(_config.className, "ejs-btn"));
        this.setType(EJS.Util.getTrueValue(_config.type),"");
        this.setCid(EJS.Util.Format.trim(EJS.Util.getTrueValue(_config.cid, EJS.Util.GUID.get)));//唯一标识
        this.setId(EJS.Util.Format.trim(EJS.Util.getTrueValue(_config.id, "")));
        this.setName(!!_config.name ? EJS.Util.Format.trim(_config.name) : this.getId());
        this.setLeft(EJS.Util.math.getTrueNum(_config.left));
        this.setTop(EJS.Util.math.getTrueNum(_config.top));
        this.setWidth(EJS.Util.math.getTrueNum(_config.width));
        this.setHeight(EJS.Util.math.getTrueNum(_config.height));
        this.setText(EJS.Util.getTrueValue(_config.text),"");
        this.setDom(EJS.Dom.DomHelper.create(
            {
                tagName : "table",
                attribute : {clazz : this.getClassName(), id : this.getCid(), name : this.getName(), cellPadding : "0", border:0},
                style : {left : this.getLeft(), top : this.getTop(), width : this.getWidth(), height : this.getHeight(), lineHeight : this.getHeight()},
                children : [
                    {tagName : "tbody", children : [
                        {tagName : "tr", children : [
                            {tagName : "td", attribute : {clazz : "ejs-btn-tl"}, children : [
                                {tagName : "i", children : [
                                    {textNode : " "}
                                ]}
                            ]},
                            {tagName : "td", attribute : {clazz : "ejs-btn-tc"}},
                            {tagName : "td", attribute : {clazz : "ejs-btn-tr"}, children : [
                                {tagName : "i", children : [
                                    {textNode : " "}
                                ]}
                            ]}

                        ]},
                        {tagName : "tr", children : [
                            {tagName : "td", attribute : {clazz : "ejs-btn-ml"}, children : [
                                {tagName : "i", children : [
                                    {textNode : " "}
                                ]}
                            ]},
                            {tagName : "td", attribute : {clazz : "ejs-btn-mc"}, children : [
                                {tagName : "em", children : [
                                    {tagName : "img", attribute : {src : "images/ico/space.gif"}},
                                    {tagName : "button", children : [
                                        {textNode : this.getText()}
                                    ]}
                                ]}
                            ]},
                            {tagName : "td", attribute : {clazz : "ejs-btn-mr"}, children : [
                                {tagName : "i", children : [
                                    {textNode : " "}
                                ]}
                            ]}

                        ]},
                        {tagName : "tr", children : [
                            {tagName : "td", attribute : {clazz : "ejs-btn-bl"}, children : [
                                {tagName : "i", children : [
                                    {textNode : " "}
                                ]}
                            ]},
                            {tagName : "td", attribute : {clazz : "ejs-btn-bc"}},
                            {tagName : "td", attribute : {clazz : "ejs-btn-br"}, children : [
                                {tagName : "i", children : [
                                    {textNode : " "}
                                ]}
                            ]}

                        ]}
                    ]}
                ]
            }
        ));
        
        
        if(!document.attachEvent){
            this.disable = function(){
                this.disabled = true;
                this.getDom().disabled = true;
                EJS.Dom.CSSHelper.modifyName(this.getDom(), "ejs-btn ejs-btn-disabled");
            }
            this.enable = function(){
                this.disabled = false;
                this.getDom().disabled = false;
                EJS.Dom.CSSHelper.modifyName(this.getDom(), "ejs-btn");
            }
        }



        if(this.getTopContainer().getCtType() != "editor"){//如果在编辑状态下，则不向按钮绑定方法
        
            if(typeof _config.click == 'function'){
                this.addClick(BindAsEventListener(this, _config.click));
            }
            EJS.Event.Handler.add(this.getDom(), "click", Bind(this, this.__runMethod));//这里要修改，用统一的方法注册类来控制
        }

    },
    __runMethod : function(){
        if(!this.isDisabled()){
            for(var m in this.__methods){
                this.__methods[m].call(this);
            }
        }
    },
    setIcon : function(_icon){
        this.icon = _icon;
        if(this.getDom()){
            if(_icon != ""){
                this.getDom().childNodes[0].childNodes[1].childNodes[1].childNodes[0].childNodes[0].src = "images/ico/"+_icon;
                //this.getDom().childNodes[0].childNodes[1].childNodes[1].childNodes[0].childNodes[0].style.display = "block";
                this.getDom().childNodes[0].childNodes[1].childNodes[1].childNodes[0].childNodes[0].style.width="15px";
                this.getDom().childNodes[0].childNodes[1].childNodes[1].childNodes[0].childNodes[0].style.height="15px";
            }else{
                this.getDom().childNodes[0].childNodes[1].childNodes[1].childNodes[0].childNodes[0].src = "images/ico/space.gif";
                this.getDom().childNodes[0].childNodes[1].childNodes[1].childNodes[0].childNodes[0].style.width="1px";
                this.getDom().childNodes[0].childNodes[1].childNodes[1].childNodes[0].childNodes[0].style.height="1px";
            }
        }
    },
    getIcon : function(){
        return this.icon;
    },
    setText : function(_text){
        this.text = _text;
        if(this.getDom()){
            this.getDom().childNodes[0].childNodes[1].childNodes[1].childNodes[0].childNodes[1].childNodes[0].nodeValue = _text;
        }
    },
    getText : function(){
        return this.text;
    },
    setType : function(_type){
        this.type = _type;
    },
    getType : function(){
        return this.type;
    },
    addClick : function(_f){
        if(this.__methods == null){
            this.__methods = [];
        }
        this.__methods.push(_f);
    },

    getAttributesOnly : function(_isEqual){
        return {
            cid     : !!_isEqual ? this.getCid() : EJS.Util.GUID.get(),
            id      : this.getId(),
            ctType  : this.getCtType(),
            type    : "button",
            className : this.getClassName(),
            name    : this.getName(),
            left    : parseInt(this.getLeft()),
            top     : parseInt(this.getTop()),
            width   : parseInt(this.getWidth()),
            height  : parseInt(this.getHeight()),
            text    : this.getText(),
            click   : function(){}
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
                {para : {name : "icon", value : this.getIcon(), fun : Bind(this, this.setIcon)}},
                {para : {name : "text", value : this.getText(), fun : Bind(this, this.setText)}},
                {para : {name : "控件类型", value : this.getCtType(), fun : Bind(this, this.changeControlType)}, type : "select", items : conList}
                
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
EJS.extend(EJS.Dom.button,EJS.Dom.controlBase);




/********************************************************************************************************************************/
/**
 *controlBase:控件基类
 *attribute:
 *           id:控件ID
 *           name:控件名
 *           left:横坐标位置
 *           top:纵坐标位置
 *           width:控件宽度
 *           height:控件高度
 *           ctType:控件类型
 *
 */
EJS.currentState = "editor";

EJS.editorConstant = {
    curZIndex : 0,
    isAdsorption : true,
    comNum : 0
}
EJS.editorGlobalVariable  = {
    cellWidth : 10,
    cellHeight : 10,
    isUndo : false,
    currentComX : 0,
    currentComY : 0,
    currentComW : 0,
    currentComH : 0
}
EJS.Dom.controlBase = {
    borderLeftWidth : 1,
    borderRightWidth : 1,
    borderTopWidth : 1,
    borderBottomWidth : 1,
    setId : function(_id){
        this.id = _id;
    },
    getId : function(){
        return this.id;
    },
    setCid : function(_cid){
        this.cid = _cid;
    },
    getCid : function(){
        return this.cid;
    },
    setName : function(_name){
        this.name = _name;
    },
    getName : function(){
        return this.name;
    },
    setLeft : function(_left){
        if(!isNaN(_left)){
            this.left = _left + "px";
        }
    },
    getLeft : function(){
        return EJS.Util.getTrueValue(this.left, "0px");
    },
    setTop : function(_top){
        if(!isNaN(_top)){
            this.top = _top + "px";
        }
    },
    getTop : function(){
        return EJS.Util.getTrueValue(this.top, "0px");
    },
    setWidth : function(_width){
        if(!isNaN(_width)){
            this.width = _width + "px";
        }
    },
    getWidth : function(){
        return EJS.Util.getTrueValue(this.width, "0px");
    },
    setHeight : function(_height){
        if(!isNaN(_height)){
            this.height = _height + "px";
        }
    },
    getHeight : function(){
        return EJS.Util.getTrueValue(this.height, "");
    },
    setMinWidth : function(_minWidth){
        this.minWidth = _minWidth;
    },
    getMinWidth : function(){
        return this.minWidth;
    },
    setMinHeight : function(_minHeight){
        this.minHeight = _minHeight;
    },
    getMinHeight : function(){
        return this.minHeight;
    },
    setBorderLeftWidth : function(_blw){
        this.borderLeftWidth = _blw;
    },
    getBorderLeftWidth : function(){
        return this.borderLeftWidth; 
    },
    setBorderRightWidth : function(_brw){
        this.borderRightWidth = _brw;
    },
    getBorderRightWidth : function(){
        return this.borderRightWidth;
    },
    setBorderTopWidth : function(_btw){
        this.borderTopWidth = _btw;
    },
    getBorderTopWidth : function(){
        return this.borderTopWidth;
    },
    setBorderBottomWidth : function(_bbw){
        this.borderBottomWidth = _bbw;
    },
    getBorderBottomWidth : function(){
        return this.borderBottomWidth;
    },
    setCtType : function(_ctType){
        this.ctType = _ctType;
    },
    getCtType : function(){
        return this.ctType;
    },
    setDom : function(_dom){
        this.dom = _dom;
    },
    getDom : function(){
        return this.dom;
    },
    setClassName : function(_className){
        this.className = _className;
    },
    getClassName : function(){
        return this.className;
    },
    setPrompt : function(_prompt){
        this.prompt = _prompt;
    },
    getPrompt : function(){
        return EJS.Util.getTrueValue(this.prompt, "");
    },
    setTopContainer : function(_con){
        this.topContainer = _con;
    },
    getTopContainer : function(){
        if(!this.topContainer) return this;
        return this.topContainer;
    },
    setParentPanel : function(_panel){//所属容器
        this.panel = _panel;
    },
    getParentPanel : function(){
        return this.panel;
    },
    isDisabled : function(){
        return EJS.Util.getTrueValue(this.disabled, false);
    },
    disable : function(){
        this.disabled = true;
        this.getDom().disabled = true;
        
    },
    enable : function(){
        this.disabled = false;
        this.getDom().disabled = false;
    },
    show : function(){
        this.getDom().style.display = "block";
    },
    hidden : function(){
        this.getDom().style.display = "none";
    },
    isDisplay : function(){
        
        if(this.getDom().style.display == "none"){
            return false;
        }else{
            return true;
        }
    },
    getAbsoluteX : function(){
        if(this.absoluteX == null){
            var __p = EJS.Dom.getElPos(this.getDom());
            this.absoluteX = __p.left;
            this.absoluteY = __p.top;
        }
        return this.absoluteX + "px";
    },
    getAbsoluteY : function(){
        if(this.absoluteY == null){
            var __p = EJS.Dom.getElPos(this.getDom());
            this.absoluteX = __p.x;
            this.absoluteY = __p.y;
        }
        return this.absoluteY + "px";
    },
    addChange : function(_f){
        EJS.Event.Handler.add(this.getDom(), "change", _f);
    },
    addFocus : function(_f){
        EJS.Event.Handler.add(this.getDom(), "focus", _f);
    },
    addBlur : function(_f){
        EJS.Event.Handler.add(this.getDom(), "blur", _f);
    },
    addKeydown : function(_f){
        EJS.Event.Handler.add(this.getDom(), "keydown", _f);
    },
    addKeyup : function(_f){
        EJS.Event.Handler.add(this.getDom(), "keyup", _f);
    },
    addClick : function(_f){
        
        EJS.Event.Handler.add(this.getDom(), "click", _f);
    },
    //editing,running
    setCurrentState : function(_state){
        this.currentState = _state;
    },
    getCurrentState : function(){
        return !!this.currentState ? this.currentState : "running";
    },
    setIsContainer : function(_isContainer){
        this.isContainer = _isContainer;
    },
    getIsContainer : function(){
        return !!this.isContainer ? true : false;
    },
    //如果已被挂到dom树上，则设置为true;
    setExist : function(_exist){
        this.exist = _exist;
    },
    isExist : function(){
        return !!this.exist ? true : false;
    },
    //如果已被挂到dom树上，则设置为true;
    setChange : function(_change){
        this.change = _change;
    },
    isChange : function(){
        return !!this.change ? true : false;
    },
    setColor : function(_color){
        this.color = _color;
        if(this.getDom()){
            this.getDom().style.color = "#"+_color;
        }
    },
    getColor : function(){
        
        return this.color;
    },
    setZIndex : function(_zIndex){
        if(this.getDom()){
            this.getDom().style.zIndex = _zIndex;
            if(this.resize){
                this.resize.__dom.style.zIndex = _zIndex - 1;
            }
        }
    },
    getZIndex : function(){
        if(this.getDom()){
            return this.getDom().style.zIndex;
        }else{
            return -1;
        }
    },


    adsorptionAdjust : function(){
        if(EJS.editorConstant.isAdsorption){
            var mw = parseInt(this.getLeft()) % EJS.editorGlobalVariable.cellWidth;
            var mh = parseInt(this.getTop()) % EJS.editorGlobalVariable.cellHeight;
            
            if(mw >= (EJS.editorGlobalVariable.cellWidth / 2)){
                
                mw = EJS.editorGlobalVariable.cellWidth - mw;
            }else{
                mw *= -1;
            }
            if(mh >= (EJS.editorGlobalVariable.cellHeight / 2)){
                
                mh = EJS.editorGlobalVariable.cellHeight - mh;
            }else{
                mh *= -1;
            }

            this.setLeft(parseInt(this.getLeft()) + mw);
            this.setTop(parseInt(this.getTop()) + mh);
        }
    },
    changeControlType : function(_cType){
        var left  = this.getLeft();
        var top = this.getTop();
        var nControl = EJS.Dom.controlFactory(_cType);
        nControl.setLeft(parseInt(left));
        nControl.setTop(parseInt(top));
        this.getParentPanel().removeComponentForId(this.getCid());
        EJS.Dom.DomHelper.remove(this.resize.__dom, this.getParentPanel().getDom());//这里估计会造成内存泄露
        this.resize = null;
        
        formEditorMain.__currentActiveContainer.add(nControl);
        
        
        formEditorMain.__currentActiveContainer.repaint(formEditorMain.__currentActiveContainer.getCid());
        tableTreeObj.load(nControl.getAttributes());
    },
    setAttribute : function(_attObj){//execScript
        
        if(_attObj){
            for(var attr in _attObj){
                var funName = "set"+ (attr.substring(0,1).toUpperCase()) + attr.substring(1);
                
                if(_attObj[attr] != null && eval("this."+funName)){
                    window.eval("this."+funName+"(_attObj[attr])");
                }
            }
        }
        
    }

}

EJS.operateMgr = function(){
    var opts = [];
    var currentIndex = -1;
    var maxIndex = 10;
    return {
        addOpt : function(_cid, _pid, _originalAttr, _modifiedAttr){
            if(currentIndex != opts.length - 1){
                opts.splice(currentIndex + 1 , opts.length - currentIndex - 1);
            }
            opts.push(
                {
                    cid : _cid,//当前控件
                    pid : _pid,
                    oAttr : _originalAttr,//修改前的属性
                    mAttr : _modifiedAttr//修改后的属性
                }
            );
            if(opts.length >= maxIndex){
                opts.splice(0, opts.length - maxIndex);
            }
            currentIndex = opts.length - 1;
            
        },
        undo : function(){
            
            if(this.canUndo()){
                EJS.editorGlobalVariable.isUndo = true;
                
                var currOpt = opts[currentIndex--];
                var curCom;
                
                curCom = formEditorMain.getComponentForId(currOpt.cid);
                
                if(currOpt.oAttr && currOpt.mAttr){//如果oAttr与mAttr同时存在，则为更新操作
                    curCom.setAttribute(currOpt.oAttr);//重作
                }else if(currOpt.oAttr){//删除
                    var pCom = formEditorMain.getComponentForId(currOpt.pid);
                    var curComponent = EJS.Dom.controlFactory(currOpt.oAttr.ctType, currOpt.oAttr);
                    pCom.add(curComponent);
                    formEditorMain.__currentActiveContainer.repaint(formEditorMain.__currentActiveContainer.getCid());
                }else if(currOpt.mAttr){//新建
                    EJS.Dom.DomHelper.remove(curCom.resize.__dom, curCom.getParentPanel().getDom());//这里估计会造成内存泄露
                    curCom.resize = null;
                    curCom.getParentPanel().removeComponentForId(curCom.getCid());
                }
                EJS.editorGlobalVariable.isUndo = false;
            }


            

        },
        redo : function(){
            if(this.canRedo()){
                EJS.editorGlobalVariable.isUndo = true;
                var currOpt = opts[++currentIndex];
                var curCom = formEditorMain.getComponentForId(currOpt.cid);
                

                if(currOpt.oAttr && currOpt.mAttr){//如果mAttr存在，当前操作则为更新，否则为删除
                    curCom.setAttribute(currOpt.mAttr);//重作
                }else if(currOpt.oAttr){//新建
                    EJS.Dom.DomHelper.remove(curCom.resize.__dom, curCom.getParentPanel().getDom());//这里估计会造成内存泄露
                    curCom.resize = null;
                    curCom.getParentPanel().removeComponentForId(curCom.getCid());
                }else if(currOpt.mAttr){//删除
                    
                    var pCom = formEditorMain.getComponentForId(currOpt.pid);
                    var curComponent = EJS.Dom.controlFactory(currOpt.mAttr.ctType, currOpt.mAttr);
                    pCom.add(curComponent);
                    formEditorMain.repaint(formEditorMain.getCid());
                }
                EJS.editorGlobalVariable.isUndo = false;
            }
        },
        canUndo : function(){
            if(currentIndex >= 0){
                return true;
            }else{
                return false;
            }
            
        },
        canRedo : function(){
            if(currentIndex < opts.length - 1){
                return true;
            }else{
                return false;
            }
        }
    }
}();

EJS.Dom.controlFactory = function(_cType, _config){
    var nControl;

    EJS.editorGlobalVariable.isUndo = true;

    switch(_cType){
        case "label" :      _config = _config ? _config : 
                            {
                                ctType  : "label",
                                className : "ejs-label-editor",
                                width   : 80,
                                height  : 26,
                                forTag  : "name",
                                text    : "label"
                            };
                            nControl = new EJS.Dom.label(_config);
                            break;
        case "placeholder" :    _config = _config ? _config : 
                                {
                                    ctType  : "placeholder",
                                    className : "ejs-placeholder",
                                    width   : 26,
                                    height  : 26,
                                    minWidth : 5,
                                    minHeight : 5
                                };
                                nControl = new EJS.Dom.placeholder(_config);
                                break;
        case "hLine" :    _config = _config ? _config : 
                                {
                                    ctType  : "hLine",
                                    lineType : "hLine",
                                    className : "ejs-hline",
                                    width   : 100,
                                    height  : 10,
                                    minWidth : 5,
                                    minHeight : 5
                                };
                                nControl = new EJS.Dom.line(_config);
                                break;
        case "vLine" :    _config = _config ? _config : 
                                {
                                    ctType  : "vLine",
                                    lineType : "vLine",
                                    className : "ejs-vline",
                                    width   : 10,
                                    height  : 100,
                                    minWidth : 5,
                                    minHeight : 5
                                };
                                nControl = new EJS.Dom.line(_config);
                                break;
        case "image" :      _config = _config ? _config : 
                            {
                                ctType  : "image",
                                className : "ejs-image",
                                width   : 150,
                                height  : 100,
                                src		: "images/test.jpg"
                            };
                            nControl = new EJS.Dom.image(_config);
                            break;
        case "chart" :     _config = _config ? _config : 
                            {
                                ctType  : "image",
                                className : "ejs-image",
                                width   : 150,
                                height  : 100
                            };
                            nControl = new EJS.Dom.chart(_config);
                            break;
        case "grid" :       _config = _config ? _config : 
                            {
                                ctType  : "grid",
                                className : "ejs-grid",
                                width   : 460,
                                height  : 200
                            };
                            nControl = new EJS.Dom.grid(_config);
                            break;
        case "button" :		_config = _config ? _config : 
                            {
                                    ctType  : "button",
                                    type    : "button",
                                    left    : 30,
                                    top     : 370,
                                    width   : 60,
                                    height  : 23,
                                    text    : "按钮"
                            };
                            nControl = new EJS.Dom.button(_config);
                            break;
        case "singleText" :	_config = _config ? _config : 
                            {
                                    ctType  : "singleText",
                                    left    : 116,
                                    top     : 56,
                                    width   : 100,
                                    height  : 24,
                                    value   : "文本"
                            };
                            nControl = new EJS.Dom.singleText(_config);
                            break;
        case "mutilText" :	_config = _config ? _config : 
                            {
                                    ctType  : "mutilText",
                                    left    : 116,
                                    top     : 56,
                                    width   : 100,
                                    height  : 35,
                                    value   : "文本"
                            };
                            nControl = new EJS.Dom.mutilText(_config);
                            break;

        case "checkboxGroup" :	_config = _config ? _config : 
                                {
                                    ctType  : "checkboxGroup",
                                    left    : 110,
                                    top     : 170,
                                    width   : 120,
                                    height  : 20,
                                    msg     : "",
                                    allowEmpty : false,
                                    limit   : "3-",
                                    options  : [
                                        {
                                            text    : "选项1",
                                            value   : "1",
                                            selected: false
                                        },
                                        {
                                            text    : "选项2",
                                            value   : "2",
                                            selected: false
                                        }
                                    ]
                                };
                                nControl = new EJS.Dom.checkboxGroup(_config);
                                break;
        case "radioGroup" :	    _config = _config ? _config : 
                                {
                                    ctType  : "radioGroup",
                                    left    : 110,
                                    top     : 170,
                                    width   : 120,
                                    height  : 20,
                                    msg     : "",
                                    allowEmpty : false,
                                    options  : [
                                        {
                                            text    : "选项1",
                                            value   : "1",
                                            selected: false
                                        },
                                        {
                                            text    : "选项2",
                                            value   : "2",
                                            selected: false
                                        }
                                    ]
                                };
            
                                nControl = new EJS.Dom.radioGroup(_config);
                                break;
        case "listBox" :        _config = _config ? _config : 
                                {
                                    ctType  : "listBox",
                                    left    : 116,
                                    top     : 220,
                                    width   : 120,
                                    height  : 100,
                                    prompt  : "请选择",
                                    msg     : "",
                                    allowEmpty : false,
                                    multChoice : true,
                                    limit   : "2-4",
                                    options  : [
                                        {
                                            text    : "选项1",
                                            value   : "1",
                                            selected: false
                                        },
                                        {
                                            text    : "选项2",
                                            value   : "2",
                                            selected: false
                                        }
                                    ]
                                };
                                nControl = new EJS.Dom.listBox(_config);
                                break;
        case "comboBox" : 
                            _config = _config ? _config : 
                            {
                                ctType  : "comboBox",
                                left    : 116,
                                top     : 140,
                                width   : 150,
                                height  : 22,
                                msg     : "",
                                prompt  : "请选择",
                                allowEmpty : true,
                                currentState : "editing",
                                options  : [
                                    {
                                        text    : "选项1",
                                        value   : "1",
                                        alias	: "1",
                                        selected: false
                                    },
                                    {
                                        text    : "选项2",
                                        value   : "2",
                                        alias   : "2",
                                        selected: false
                                    }
                                ]  
                            };
                            nControl = new EJS.Dom.comboBox(_config);
                            break;
        case "form" :       _config = _config ? _config : 
                            {
                                    ctType  : "panel",
                                    className : "ejs-panel",
                                    width   : 100,
                                    height  : 100
                            };
                            nControl = new EJS.Dom.form(_config);
                            break;
        case "panel" :      _config = _config ? _config : 
                            {
                                    ctType  : "panel",
                                    className : "ejs-panel",
                                    width   : 100,
                                    height  : 100
                            };
            
                            nControl = new EJS.Dom.panel(_config);
                            break;
        case "tabbedPane" :     _config = _config ? _config : 
                                {
                                    ctType  : "tabbedPane",
                                    left    : 10,
                                    top     : 10,
                                    width   : 150,
                                    height  : 150,
                                    bgColor : "#fff",
                                    activeIndex : 0,
                                    tabs    : [
                                        {
                                            text        : "标签1",
                                            isDisable   : false,
                                            panel       : {}
                                        },
                                        {
                                            text        : "标签2",
                                            isDisable   : false,
                                            panel       : {}
                                        }
                                    ]  
                                };
                                nControl = new EJS.Dom.tabbedPane(_config);
                                break;
    }
    EJS.editorGlobalVariable.isUndo = false;
    return nControl;


};


EJS.Dom.Container = {
    /**
     *样式相关方法
     */
    //设置背景颜色
    setBgColor : function(_bgColor){
        this.bgColor = _bgColor;
    },
    getBgColor : function(){
        return this.bgColor;
    },
    //设置上边框样式
    setBorderTop : function(_style){
        this.borderTopStyle = _style;
    },
    //设置右边框样式
    setBorderRight : function(_style){
        this.borderRightStyle = _style;
    },
    //设置底边框样式
    setBorderBottom : function(_style){
        this.borderBottomStyle = _style;
    },
    //设置左边框样式
    setBorderLeft : function(_style){
        this.borderLeftStyle = _style;
    },
    /**
     *控件管理相关方法
     */
    //增加控件到最后面
    add : function(_component){
        EJS.editorConstant.comNum++;
        if(this.__componentCache == null){
            this.__componentCache = new EJS.Dom.cache();//控件缓存，仅供内部调用
        }
        
        this.__componentCache.put(_component.getCid(), _component);
        //alert(this.getCtType()+"====+"+_component.getCtType());

        _component.setParentPanel(this);
        
        _component.setTopContainer(this.getTopContainer());//记录顶级容器

    },
    getAllComponents : function(){
        if(this.__componentCache == null){
            this.__componentCache = new EJS.Dom.cache();//控件缓存，仅供内部调用
        }
        return this.__componentCache.getAll();
    },
    getComponentForId : function(_id){
        if(_id == this.getCid()){
            return this;
        }
        var coms = this.getAllComponents();
        for(var i = 0; i < coms.length; i++){
            var curCom = coms[i];
            if(_id == curCom.getCid()){
                return curCom;
            }else if(curCom.getIsContainer()){
                return curCom.getComponentForId(_id);
            }
        }
    },
    getComponentForIndex : function(_index){

    },
    getComponents : function(){

    },
    removeComponentForId : function(_id){
        var com = this.__componentCache.get(_id);
        
        if(com){
            EJS.Dom.DomHelper.remove(com.getDom(), com.getParentPanel().getDom());
            this.__componentCache.remove(_id);
        }
    },
    removeComponentForIndex : function(_index){

    },
    removeAll : function(){

    },
    /**
     *渲染所有控件
     *
     */
    paint : function(_target){
        //if(this.__componentCache == null) return false;//如不包括子控件，则返回false
        var currentDom = this.getDom();
            
            if(_target == null){
                EJS.Dom.DomHelper.append(currentDom);//渲染
            }else if(typeof _target == "object"){
                _target.appendChild(currentDom);
            }else if(typeof _target == "string"){
                _target = EJS.Dom.getElement(this.getCid());
                
                if(_target != null){
                    /*
                    EJS.Dom.DomHelper.modify(_target, {
                        style : {position : "relative"}
                    });
                    */
                    _target.appendChild(currentDom);
                }else{
                    EJS.Dom.DomHelper.append(currentDom);//渲染
                }
            }
            


        if(this.__componentCache != null){
        
            var components = this.__componentCache.getAll();//获得容器中所有的控件
            
            
            for(var componentIndex in components){
                var component = components[componentIndex];
                //output(component.getCtType()+","+component.isExist()+","+component.isChange());
                if(component.isExist() && !component.isChange()) continue;//如果控件已经存在且没有被更新则不做处理
                //output(this.getDom().outerHTML)
                //alert(component.getCtType()+"==="+component.getIsContainer())
                if(component.getIsContainer() && component.getCtType() != "tabbedPane"){//如果控件为容器,tabbedPane是比较特殊的控件把它排除在外
                    
                    

                    component.repaint(currentDom);
                }
                
                
                currentDom.appendChild(component.getDom());
                
                if(component.isChange()) {component.setChange(false);}
                if(!component.isExist()){//如果控件之前已被挂到dom树上则再不重复绑定事件了
                
                    //if(component.getTopContainer().getCtType() == "editor"){//如果在编辑模式下
                    if(EJS.currentState == "editor"){//如果在编辑模式下
                    component.setTopContainer(formEditorMain);
                    /*
                            if(component.getCtType() == "panel"){
                                alert(
                                    "left=" + component.getLeft()
                                    +",top=" + component.getTop()
                                );
                            }
                    */
                            if(component.resize == null){
                                
                                component.resize = new EJS.Dom.resize({
                                    parentDom : EJS.Dom.$(component.getParentPanel().getDom()), 
                                    width : parseInt(component.getWidth()) - 2,//减到resize的左右边框 
                                    height : parseInt(component.getHeight()) - 2,//减到resize的上下边框 
                                    left : parseInt(component.getLeft()), 
                                    top : parseInt(component.getTop()), 
                                    Max: component.getParentPanel().getCtType() == "editor" ? false : true, 
                                    Min: true,
                                    minWidth : component.getMinWidth() || 50,
                                    minHeight : component.getMinHeight() || 20,
                                    hasMove : component.getIsContainer() ? true : false,
                                    mxContainer: component.getParentPanel().getCid(), 
                                    onStart : Bind(component, function(){
                                        EJS.editorGlobalVariable.currentComX = this.getLeft();
                                        EJS.editorGlobalVariable.currentComY = this.getTop();
                                        EJS.editorGlobalVariable.currentComW = this.getWidth();
                                        EJS.editorGlobalVariable.currentComH = this.getHeight();
                                    }),
                                    onResize : Bind(component, function(){
                                        
                                        this.setWidth(this.resize.getWidth());
                                        this.getDom().style.width = (parseInt(this.getWidth()) - 2) + "px";//减到resize的左右边框
                                        this.setHeight(this.resize.getHeight());
                                        this.getDom().style.height = (parseInt(this.getHeight()) - 2) + "px";//减到resize的上下边框
                                        this.setLeft(this.resize.getLeft());
                                        this.getDom().style.left = this.getLeft();
                                        this.setTop(this.resize.getTop());
                                        this.getDom().style.top = this.getTop();
                                    }),
                                    onStop : Bind(component, function(){
                                        tableTreeObj.load(this.getAttributes());
                                        if(!EJS.editorGlobalVariable.isUndo){
                                            //EJS.operateMgr.addOpt(this.getCid(), this.getParentPanel().getCid(), {left : EJS.editorGlobalVariable.currentComX, top : EJS.editorGlobalVariable.currentComY, width : EJS.editorGlobalVariable.currentComW, height : EJS.editorGlobalVariable.currentComH}, {left : this.getLeft(), top : this.getTop(), width : this.getWidth(), height : this.getHeight()});
                                            EJS.operateMgr.addOpt(this.getCid(), this.getParentPanel().getCid(), {width : EJS.editorGlobalVariable.currentComW, height : EJS.editorGlobalVariable.currentComH}, {width : this.getWidth(), height : this.getHeight()});
                                        }

                                    })

                                 });
                                
                                component.resize.parent = component;//使resize记住对应的控件
                            }
                        
                        EJS.Event.Handler.add(component.getDom(), "mousedown", BindAsEventListener(component, function(_e){
                                EJS.Event.cancelBubble();
                                this.getTopContainer().leftClick(this, _e);//调用表单设计器的leftClick
                                //alert(EJS.editorConstant.curZIndex + 2)
                                this.setZIndex(EJS.editorConstant.curZIndex += 2);
                                
                                tableTreeObj.load(this.getAttributes());

                        }));
                        EJS.Event.Handler.add(component.getDom(), "mouseup", BindAsEventListener(component, function(){
                                //alert(this.getLeft()+","+this.getTop())

                                


                                //tableTreeObj.load(formEditorMain.__currentActiveContainer.getAttributes());
                                
                        }));
                        EJS.Event.Handler.add(component.getDom(), "click", BindAsEventListener(component, function(){
                               this.getTopContainer().__menu.hiddenMenu();
                               EJS.Event.cancelBubble();
                        }));
                        EJS.Event.Handler.add(component.getDom(), "contextmenu", BindAsEventListener(component, function(){
                            EJS.Event.cancelBubble();
                            this.getTopContainer().rightClick(this);   
                        }));
                        if(component.getIsContainer()){
                            
                            new Drag_1(component.resize.__dom, 
                                {   Limit : component.getParentPanel().getCtType() == "editor" ? false : true, 
                                    mxContainer : component.getParentPanel().getCid(), 
                                    onStart : Bind(component, function(){
                                        EJS.editorGlobalVariable.currentComX = this.getLeft();
                                        EJS.editorGlobalVariable.currentComY = this.getTop();
                                    }),
                                    onMove : Bind(component, function(){
                                        this.setLeft(parseInt(this.resize.__dom.style.left));
                                        this.setTop(parseInt(this.resize.__dom.style.top));
                                        //this.resize.setLeft(parseInt(this.getLeft()));
                                        //this.resize.setTop(parseInt(this.getTop()));
                                    }),
                                    onStop : Bind(component, function(){
                                        tableTreeObj.load(this.getAttributes());
                                        this.getTopContainer().isNotRsizeClick = false;//这个变量可以变通解决拖拽resize的大小时将鼠标放在editor区松开时直接触发editor对应的click事件。
                                        this.adsorptionAdjust();
                                        if(!EJS.editorGlobalVariable.isUndo){
                                            EJS.operateMgr.addOpt(this.getCid(), this.getParentPanel().getCid(), {left : EJS.editorGlobalVariable.currentComX, top : EJS.editorGlobalVariable.currentComY}, {left : this.getLeft(), top : this.getTop()});
                                        }
                                    })
                                }
                            );
                        }else{
                            
                            new Drag_1(component.getDom(), 
                                {   Limit : component.getParentPanel().getCtType() == "editor" ? false : true, 
                                    mxContainer : component.getParentPanel().getCid(),
                                    onStart : Bind(component, function(){
                                        EJS.editorGlobalVariable.currentComX = this.getLeft();
                                        EJS.editorGlobalVariable.currentComY = this.getTop();
                                    }),
                                    onMove : Bind(component, function(){
                                        this.setLeft(parseInt(this.getDom().style.left));
                                        this.setTop(parseInt(this.getDom().style.top));
                                        this.resize.setLeft(parseInt(this.getLeft()));
                                        this.resize.setTop(parseInt(this.getTop()));
                                    }),
                                    onStop : Bind(component, function(){
                                        this.adsorptionAdjust();
                                        tableTreeObj.load(this.getAttributes());
                                        if(!EJS.editorGlobalVariable.isUndo){
                                            EJS.operateMgr.addOpt(this.getCid(), this.getParentPanel().getCid(), {left : EJS.editorGlobalVariable.currentComX, top : EJS.editorGlobalVariable.currentComY}, {left : this.getLeft(), top : this.getTop()});
                                        }

                                    })
                                }
                            );
                        }
                        component.setExist(true);//标识控件已被挂到dom树上

                    }
                }


            }        
        
        }
        


        
        
    },
    repaint : function(_targetDom){
        if(_targetDom){
            _targetDom = this.getCid();
        }
        this.paint(_targetDom)
    },
    /**
     *加载容器内所有控件
     *
     */
    loadComponents : function(_componentConfigArray){//json格式 array
        if(_componentConfigArray && _componentConfigArray.constructor == Array && _componentConfigArray.length > 0){//判断控件列表是否是数组类型且不为空
            for(var _componentConfigIndex in _componentConfigArray){
                var _componentConfig = _componentConfigArray[_componentConfigIndex];
                var curComponent = EJS.Dom.controlFactory(_componentConfig.ctType, _componentConfig);
                
                /**
                 *每个输入型控件(fieldBase的子类)都必需属于一个form控件，控件的所属form以就近原则
                 *如果form控件内包含容器型控件(Container的子类)，则将容器内的所有子控件的所属form与容器相同
                 *
                 */
                 
                if(this.getCtType() == "form" || this.getCtType() == "panel" || this.getCtType() == "editor"){
                    curComponent.setParentPanel(this);
                }else{
                    var curForm = this.getParentPanel();
                    if(curForm != null){
                        this.setParentPanel(curForm);
                    }
                }
                if(curComponent) this.add(curComponent);
                
            }
        }
        
    },
    validate : function(){
        var components = this.__componentCache.getAll();
        //var msg = new EJS.Message();
        var msgs = [];
        
        for(var componentIndex in components){
            var component = components[componentIndex];
            if(component.constructor == EJS.Dom.Container){
                msgs.concat(component.validate());
            }
            //msgs.push(component.validate());
            var vMsg = "";
            if(component.validate){
                vMsg = component.validate();
            }
            if(vMsg && vMsg != ""){
                msgs.push(vMsg);
            }
        }
        return msgs;
    },
    toJSON : function(){
        if(!this.__componentCache) return;
        var components = this.__componentCache.getAll();
        //var msg = new EJS.Message();
        var conObjArr = [];
        
        for(var componentIndex in components){
            conObjArr.push(components[componentIndex].getAttributesOnly());
        }
        return conObjArr;
    },
    //设置容器显示区域的左上角X坐标
    setOriginX : function(_originX){
        this.originX = !isNaN(_originX) ? _originX : 0;
    },
    getOriginX : function(){
        return this.originX ? this.originX : 0;
    },
    //设置容器显示区域左上角Y坐标
    setOriginY : function(_originY){
        this.originY = !isNaN(_originY) ? _originY : 0;
    },
    getOriginY : function(){
        return this.originY ? this.originY : 0;
    }
}
EJS.Dom.Container.prototype =  EJS.Dom.controlBase;






/**
 *form:表单控件
 *
 *
 *
 */
EJS.Dom.form = Factory.create();
EJS.Dom.form.prototype = {
    initialize : function(_config){
        this.setCtType("form");
        this.setCid(EJS.Util.Format.trim(EJS.Util.getTrueValue(_config.cid, EJS.Util.GUID.get)));//唯一标识
        this.setId(EJS.Util.Format.trim(EJS.Util.getTrueValue(_config.id, this.getCtType() + EJS.editorConstant.comNum)));
        this.setName(!!_config.name ? EJS.Util.Format.trim(_config.name) : this.getId());
        this.setLeft(EJS.Util.math.getTrueNum(_config.left));
        this.setTop(EJS.Util.math.getTrueNum(_config.top));
        this.setWidth(EJS.Util.math.getTrueNum(_config.width));
        this.setHeight(EJS.Util.math.getTrueNum(_config.height));
        this.setAction(EJS.Util.getTrueValue(_config.action, ""));
        this.setBgColor(EJS.Util.getTrueValue(_config.bgColor, ""));
        this.setMethod(EJS.Util.getTrueValue(_config.method, "post"));
        this.setClassName(EJS.Util.getTrueValue(_config.className, "ejsForm"));
        this.setIsContainer(true);
        this.setDom(EJS.Dom.DomHelper.create(
            {
                tagName : "form", 
                attribute : {clazz : this.getClassName(), id : this.getCid(), name : this.getName(), method : this.getMethod(), action : this.getAction()},
                style : {left : this.getLeft(), top : this.getTop(), width : (parseInt(this.getWidth()) - this.getBorderLeftWidth() - this.getBorderRightWidth()) + "px", height : (parseInt(this.getHeight()) - this.getBorderTopWidth() - this.getBorderBottomWidth()) + "px", background : this.getBgColor()}
            }
        ));
        this.loadComponents(_config.elements);
    },

    setAction : function(_action){
        this.action = _action;
    },
    getAction : function(){
        return this.action;
    },


    /*提交方式*/
    setMethod : function(_method){
        this.method = _method;
    },
    getMethod : function(){
        return this.method;
    },

    submit : Bind(this, function(){
        this.validate();
        return false;
    }),

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
    },
    
    
    getAttributesOnly : function(_isEqual){
         var obj = {
                cid     : !!_isEqual ? this.getCid() : EJS.Util.GUID.get(),
                id      : this.getId(),
                ctType  : "form",
                className : this.getClassName(),
                name    : this.getName(),
                left    : parseInt(this.getLeft()),
                top     : parseInt(this.getTop()),
                width   : parseInt(this.getWidth()),
                height  : parseInt(this.getHeight())
            };
            
            var components = this.getAllComponents();//获得容器中所有的控件
            for(var componentIndex in components){
                var component = components[componentIndex];
                if(!obj.elements) obj.elements = [];
                obj.elements.push(component.getAttributesOnly());
            }
            return obj;
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
                {para : {name : "top", value : parseInt(this.getTop()), fun : Bind(this, this.setTop)}}
                
                
            ]   
        });
        return attributeList;
    }


}
EJS.extend(EJS.Dom.form, EJS.Dom.Container);


EJS.Dom.panel = Factory.create();
EJS.Dom.panel.prototype = {
    initialize : function(_config){
        this.setCtType("panel");
        this.setCid(EJS.Util.Format.trim(EJS.Util.getTrueValue(_config.cid, EJS.Util.GUID.get)));//唯一标识
        this.setId(EJS.Util.Format.trim(EJS.Util.getTrueValue(_config.id, this.getCtType() + EJS.editorConstant.comNum)));
        this.setName(EJS.Util.getTrueValue(EJS.Util.Format.trim(_config.name), this.id));
        this.setLeft(EJS.Util.math.getTrueNum(_config.left, 0));
        this.setTop(EJS.Util.math.getTrueNum(_config.top, 0));
        this.setWidth(EJS.Util.math.getTrueNum(_config.width, 0));
        this.setHeight(EJS.Util.math.getTrueNum(_config.height, 0));
        this.setBgColor(EJS.Util.getTrueValue(_config.bgColor, ""));
        this.setClassName(EJS.Util.getTrueValue(_config.className, "ejs-panel"));
        this.setIsContainer(true);
        var __w = parseInt(this.getWidth()) - this.getBorderLeftWidth() - this.getBorderRightWidth();
        var __h = parseInt(this.getHeight()) - this.getBorderTopWidth() - this.getBorderBottomWidth();
        this.setDom(EJS.Dom.DomHelper.create(
            {
                tagName : "div", 
                attribute : {clazz : this.getClassName(), id : this.getCid(), name : this.getName()},
                style : {left : this.getLeft(), top : this.getTop(), width : (!isNaN(__w) && __w >= 0 ? __w : 0) + "px", height : (!isNaN(__h) && __h >= 0 ? __h : 0) + "px", background : this.getBgColor()}
            }
        ));
        this.loadComponents(_config.elements);
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
    },


    getAttributesOnly : function(_isEqual){
         var obj = {
                cid     : !!_isEqual ? this.getCid() : EJS.Util.GUID.get(),
                id      : this.getId(),
                ctType  : "panel",
                className : this.getClassName(),
                name    : this.getName(),
                left    : parseInt(this.getLeft()),
                top     : parseInt(this.getTop()),
                width   : parseInt(this.getWidth()),
                height  : parseInt(this.getHeight())
            };
            
            var components = this.getAllComponents();//获得容器中所有的控件
            for(var componentIndex in components){
                var component = components[componentIndex];
                if(!obj.elements) obj.elements = [];
                obj.elements.push(component.getAttributesOnly());
            }
            return obj;
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
                {para : {name : "top", value : parseInt(this.getTop()), fun : Bind(this, this.setTop)}}
                
                
            ]   
        });
        return attributeList;
    }

}


EJS.extend(EJS.Dom.panel, EJS.Dom.Container);






EJS.Dom.editor = function(_config){
    var __self = this;
    
    var __selectControlArray = [];//已选择的控件，出现在多选情况
    var __currentLeftClickControl, __currentRightClickControl;//当前左击的控件、当前右击的控件
    var __duplicateArray = [];//副本，用于复制功能
    this.__currentActiveContainer = this;//记录当前活动的容器控件
    var __extremum = [-1,-1,-1,-1];//上、右、下、左四个最大的值
    this.isNotRsizeClick = true;//这个属性是为了解决拖拽resize尺寸时，将当鼠标在editor区松开，此时不能通过resize的取消冒泡取消editor的click事件，所以用这个方法变通解决
    //覆盖父类方法
    this.setWidth = function(_width){
        __self.superClass.setWidth.call(__self, parseInt(_width));
        if(__self.getDom()){
            __self.getDom().style.width = __self.getWidth();
        }
    }
    //覆盖父类方法
    this.setHeight = function(_height){
        __self.superClass.setHeight.call(__self, parseInt(_height));
        if(__self.getDom()){
            __self.getDom().style.height = __self.getHeight();
        }
    }
    /*
    //覆盖父类方法
    this.setLeft = function(_left){
        
        __self.superClass.setLeft.call(__self, parseInt(_left));
        if(__self.getDom()){
            __self.getDom().style.left = __self.getLeft();
        }

    }
    //覆盖父类方法
    this.setTop = function(_top){
        __self.superClass.setTop.call(__self, parseInt(_top));
        if(__self.getDom()){
            __self.getDom().style.top = __self.getTop();
        }
    }
    */

    //左击控件
    this.leftClick = function(_cont, _e){
        
        if(_e.button == 1 || _e.type == "click"){
            
            var ctType = _cont.getCtType();
            switch(ctType){
                case "editor"           :   
                                            this.__currentActiveContainer = _cont;
                                            this.unSelectControl();
                                            break;
                case "form"             :
                case "panel"            :
                case "tabbedPane"       :
                                            this.__currentActiveContainer = _cont;
                case "label"            : 
                case "image"            : 
                case "chart"            :
                case "grid"             :
                case "button"           :
                case "singleText"       :
                case "mutilText"        :
                case "checkboxGroup"    :
                case "radioGroup"       :
                case "comboBox"         :
                case "listBox"          :
                case "placeholder"      :
                case "hLine"            :
                case "vLine"            :
                default                 : 
                    
                    if(!_e.ctrlKey) this.unSelectControl();//如果按下ctrl键则不取消先前选择的控件
                    __selectControlArray.push(_cont);
                    _cont.resize.show();

                    
            }
            
            __currentLeftClickControl = _cont;

        }
        

    }

    this.countExtremum = function(){
        __extremum = [-1, -1, -1, -1];
        for(var i = 0; i < __selectControlArray.length; i++){
            if(__extremum[0] == -1 || __extremum[0] > parseInt(__selectControlArray[i].getTop())){//最上
                __extremum[0] = parseInt(__selectControlArray[i].getTop());
                
            }else if(__extremum[2] == -1 || __extremum[2] < parseInt(__selectControlArray[i].getTop())){//最下
                __extremum[2] = parseInt(__selectControlArray[i].getTop());
            }
            if(__extremum[1] == -1 || __extremum[1] < parseInt(__selectControlArray[i].getLeft())){//最右
                __extremum[1] = parseInt(__selectControlArray[i].getLeft());
            }else if(__extremum[3] == -1 || __extremum[3] > parseInt(__selectControlArray[i].getLeft())){//最左
                __extremum[3] = parseInt(__selectControlArray[i].getLeft());
            }
        }
    }


    //右击控件
    this.rightClick = function(_cont){
        var ctType = _cont.getCtType();
        var items = [];
        switch(ctType){
            case "editor"           :
                                        
                                        items = [{text : "粘贴", isDisable : __duplicateArray.length > 0 ? false : true, action : Bind(this, this.paste)}];
                                        break;
            case "form"             : 
            case "panel"            : 
            case "tabbedPane"       : 
                                        
                                        items = [{text : "复制", action : Bind(this, this.copy)}, {text : "粘贴", isDisable : __duplicateArray.length > 0 ? false : true, action : Bind(this, this.paste)}, {text : "剪切", action : Bind(this, this.cut)}, {text : "删除", action : Bind(this, this.del)}];
                                        break;
            case "label"            : 
            case "image"            : 
            case "chart"            :
            case "grid"             :
            case "button"           : 
            case "singleText"       :
            case "mutilText"        :
            case "checkboxGroup"    : 
            case "radioGroup"       : 
            case "comboBox"         :
            case "placeholder"      :
            case "hLine"      :
            case "vLine"      :
            case "listBox"          :   items = [{text : "复制", action : Bind(this, this.copy)}, {text : "剪切", action : Bind(this, this.cut)}, {text : "删除", action : Bind(this, this.del)}];
            default : 
                __currentRightClickControl = _cont;
        }
        if(__currentRightClickControl){
            if(_cont.getCtType() == "editor"){
                this.unSelectControl();
            }else if(!_cont.resize.isDisplay()){//如果右击的控件为选中状态则不做处理，否则取消其它选中控件，将当前控件选中
                this.unSelectControl();
                __selectControlArray.push(_cont);
                _cont.resize.show();
            }
            this.__menu.showMenu(event || window.event, items);  
        }
    }



    //取消所有选中的控件
    this.unSelectControl = function(){
        if(__selectControlArray.length > 0){
            for(var i = __selectControlArray.length - 1; i >= 0; i--){
                if(__selectControlArray[i].resize){//如果剪切后，控件已不存在，就不用再执行下面语句了
                    __selectControlArray[i].resize.hidden();
                }
                __selectControlArray.splice(i, 1);
            }
        }
    }
    this.createControl = function(_conAttri){
        if(_conAttri && _conAttri.ctType){
            var con = EJS.Dom.controlFactory(_conAttri.ctType, _conAttri);
            
            return con;
        }
        return null;
    }
    //拷贝控件
    this.copy = function(){
        __duplicateArray = [];//每次复制前先将副本数组清空
        for(var i = 0; i < __selectControlArray.length; i++){
            __duplicateArray.push(__selectControlArray[i].getAttributesOnly());
        }
    }
    //粘贴控件
    this.paste = function(){
        for(var i = __duplicateArray.length - 1; i >= 0; i--){
            var duplicate = this.createControl(__duplicateArray[i]);
            
            if(duplicate != null){
                this.__currentActiveContainer.add(duplicate);
            }
            __duplicateArray.splice(i, 1);
        }
        
        
        this.__currentActiveContainer.repaint(this.__currentActiveContainer.getDom().parentNode);//重新渲染当前被激活的容器
    }
    //剪切控件
    this.cut = function(){
        __duplicateArray = [];//每次复制前先将副本数组清空
        
        for(var i = 0; i < __selectControlArray.length; i++){
            __duplicateArray.push(__selectControlArray[i].getAttributesOnly(true));
            __selectControlArray[i].getParentPanel().removeComponentForId(__selectControlArray[i].getCid());
            EJS.Dom.DomHelper.remove(__selectControlArray[i].resize.__dom, __selectControlArray[i].getParentPanel().getDom());//这里估计会造成内存泄露
            __selectControlArray[i].resize = null;
            
        }
        //this.repaint(this.getId());//重新渲染表单

    }
    this.del = function(){
        for(var i = 0; i < __selectControlArray.length; i++){
            
            __selectControlArray[i].getParentPanel().removeComponentForId(__selectControlArray[i].getCid());
            EJS.Dom.DomHelper.remove(__selectControlArray[i].resize.__dom, __selectControlArray[i].getParentPanel().getDom());//这里估计会造成内存泄露
            __selectControlArray[i].resize = null;
            
        }
        this.__currentActiveContainer.setChange(true);//将当前活动容器设为已更新状态
        this.repaint(this.getCid());//重新渲染表单
    }
   this.removeAll = function(){
        var components = this.getAllComponents();
        for(var componentIndex in components){
            var component = components[componentIndex];
            component.getParentPanel().removeComponentForId(component.getCid());
            EJS.Dom.DomHelper.remove(component.resize.__dom, component.getParentPanel().getDom());//这里估计会造成内存泄露
            component.resize = null;
        }
        this.setChange(true);//将当前设为已更新状态
        this.repaint(this.getCid());//重新渲染表单
   }
    this.upMost = function(){
        this.countExtremum();
        for(var i = 0; i < __selectControlArray.length; i++){
            __selectControlArray[i].setTop(__extremum[0]);
        }
    }
    this.rightMost = function(){
        this.countExtremum();
        for(var i = 0; i < __selectControlArray.length; i++){
            __selectControlArray[i].setLeft(__extremum[1]);
        }
    }
    this.downMost = function(){
        
        this.countExtremum();
        
        for(var i = 0; i < __selectControlArray.length; i++){
            __selectControlArray[i].setTop(__extremum[2]);
        }
    }
    this.leftMost = function(){
        this.countExtremum();
        for(var i = 0; i < __selectControlArray.length; i++){
            __selectControlArray[i].setLeft(__extremum[3]);
        }
    }

    {
        this.setCtType("editor");
        this.setCid(EJS.Util.Format.trim(EJS.Util.getTrueValue(_config.cid, EJS.Util.GUID.get)));//唯一标识
        this.setId(EJS.Util.Format.trim(EJS.Util.getTrueValue(_config.id, this.getCtType() + EJS.editorConstant.comNum)));
        this.setName(EJS.Util.getTrueValue(EJS.Util.Format.trim(_config.name), this.id));
        this.setLeft(EJS.Util.math.getTrueNum(_config.left));
        this.setTop(EJS.Util.math.getTrueNum(_config.top));
        //this.setWidth(EJS.Util.math.getTrueNum(_config.width));
        //this.setHeight(EJS.Util.math.getTrueNum(_config.height));
        this.setBgColor(EJS.Util.getTrueValue(_config.bgColor, ""));
        this.setClassName(EJS.Util.getTrueValue(_config.className, "form_editor_ejs-panel"));
        this.setIsContainer(true);
        this.setDom(EJS.Dom.DomHelper.create(
            {
                tagName : "div", 
                attribute : {clazz : this.getClassName(), id : this.getCid(), name : this.getName()},
                //style : {left : this.getLeft(), top : this.getTop(), width : this.getWidth(), height : this.getHeight(), background : this.getBgColor()}
                style : {left : this.getLeft(), top : this.getTop(), width : "100%", height : "100%"}
            }
        ));
        if(!this.__menu){
            this.__menu = new EJS.Dom.menu({width : 150});
        }
        __currentRightClickControl = this;



        var __rightFun = BindAsEventListener(this, function(_e){
            this.rightClick(this);
             
        });
        var __leftFun = BindAsEventListener(this, function(_e){
            
            if(this.isNotRsizeClick){//当事件不发生在resize上时
            
                this.leftClick(this, _e);
            }
            //alert(__currentLeftClickControl.getCtType());
            if(__currentLeftClickControl && __currentLeftClickControl.isDisplay()){
                //__currentLeftClickControl.resize.hidden();
            }
            this.isNotRsizeClick = true;
            //output("editor.left====="+this.isNotRsizeClick);
            this.__menu.hiddenMenu();
        });
        var __keyupFun = BindAsEventListener(this, function(_e){
            
                output(_e.ctrlKey +"+"+ _e.keyCode);
           
            if(_e.ctrlKey){
                if(_e.keyCode == 67){//ctrl+c
                    this.copy();
                    
                }else if(_e.keyCode == 86){//ctrl+v
                    this.paste();
                }else if(_e.keyCode == 88){//ctrl+x
                    this.cut();
                }
            }else if(_e.keyCode == 46){
                this.del();        
            }
           
        });
        EJS.Event.Handler.add(this.getDom(), "contextmenu", __rightFun);//绑定右击事件
        
        EJS.Event.Handler.add(this.getDom(), "click", __leftFun);//绑定左击事件
        EJS.Event.Handler.add(this.getDom(), "keyup", __keyupFun);//绑定键盘事件
        
        this.loadComponents(_config.elements);
    }(_config)


}
EJS.Dom.editor.prototype = {
    setOffsetLeft : function(_offsetLeft){
        this.offsetLeft = !isNaN(_offsetLeft) ? _offsetLeft : 0;
    },
    getOffsetLeft : function(){
        return this.offsetLeft;
    },
    setOffsetTop : function(_offsetTop){
        this.offsetTop = !isNaN(_offsetTop) ? _offsetTop : 0;
    },
    getOffsetTop : function(){
        return this.offsetTop;
    },
    getActiveContainerAbsolute : function(_con){
        var pp = _con.getParentPanel();
        var tc = _con.getTopContainer()
        var loc ={x:0, y:0};
        
        if(_con.getCtType() != "editor"){
            //alert(_con.getParentPanel())
            loc =  arguments.callee(_con.getParentPanel());
        }else{
            loc.x = tc.getOffsetLeft();
            loc.y = tc.getOffsetTop();
            
        }

        loc.x += parseInt(_con.getLeft()) + _con.getOriginX();
        loc.y += parseInt(_con.getTop()) + _con.getOriginY();
        
        return loc;
    },
    load : function(_jsonTxt){
        this.loadComponents(_jsonTxt);
        this.repaint(this.getCid());
    }

}
EJS.extend(EJS.Dom.editor, EJS.Dom.Container);



















/**
        {
            nodes : [
                {para:{name : "ID1", value : ""}, nodes : [{para:{name : "ID1_1", value : "v1"}, nodes : [{para:{name : "ID1_1_1", value : "v2"}},{para:{name : "ID1_1_2", value : "v3"}}]},{para:{name : "ID1_2", value : "v4"}}]},
                {para:{name : "ID2", value : "v5"}}
            ]
        }

*/

var conList = [
    {name : "label", value : "label"}, 
    {name : "singleText", value : "singleText"}, 
    {name : "mutilText", value : "mutilText"}, 
    {name : "image", value : "image"}, 
    {name : "button", value : "button"}, 
    {name : "radioGroup", value : "radioGroup"}, 
    {name : "checkboxGroup", value : "checkboxGroup"}, 
    {name : "comboBox", value : "comboBox"}, 
    {name : "listBox", value : "listBox"}, 
    {name : "chart", value : "chart"}, 
    {name : "grid", value : "grid"},
    {name : "placeholder", value : "placeholder"},
    {name : "hLine", value : "hLine"},
    {name : "vLine", value : "vLine"}
]



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






EJS.Dom.placeholder = Factory.create();
EJS.Dom.placeholder.prototype = {
    initialize : function(_config){
        this.setCtType("placeholder");
        this.setClassName("ejs-placeholder");
        this.setCid(EJS.Util.Format.trim(EJS.Util.getTrueValue(_config.cid, EJS.Util.GUID.get)));//唯一标识
        this.setId(EJS.Util.Format.trim(EJS.Util.getTrueValue(_config.id, this.getCtType() + EJS.editorConstant.comNum)));
        this.setName(!!_config.name ? EJS.Util.Format.trim(_config.name) : this.getId());
        this.setWidth(EJS.Util.math.getTrueNum(_config.width));
        this.setHeight(EJS.Util.math.getTrueNum(_config.height));
        this.setMinWidth(EJS.Util.math.getTrueNum(_config.minWidth));
        this.setMinHeight(EJS.Util.math.getTrueNum(_config.minHeight));
        this.setDom(EJS.Dom.DomHelper.create(
            {
                tagName : "label",
                attribute : {clazz : this.getClassName(), id : this.getCid(), name : this.getName()},
                style : {left : this.getLeft(), top : this.getTop(), width : (parseInt(this.getWidth()) - this.getBorderLeftWidth() - this.getBorderRightWidth()) + "px", height : (parseInt(this.getHeight()) - this.getBorderTopWidth() - this.getBorderBottomWidth()) + "px"}
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


    getAttributesOnly : function(_isEqual){
        return {
            cid     : !!_isEqual ? this.getCid() : EJS.Util.GUID.get(),
            id      : this.getId(),
            ctType  : this.getCtType(),
            type    : "placeholder",
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
EJS.extend(EJS.Dom.placeholder, EJS.Dom.controlBase);






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





EJS.Dom.button = Factory.create();
EJS.Dom.button.prototype = {
    initialize : function(_config){
        
        this.setCtType("button");
        this.setClassName(EJS.Util.getTrueValue(_config.className, "ejs-btn"));
        this.setType(EJS.Util.getTrueValue(_config.type),"");
        this.setCid(EJS.Util.Format.trim(EJS.Util.getTrueValue(_config.cid, EJS.Util.GUID.get)));//唯一标识
        this.setId(EJS.Util.Format.trim(EJS.Util.getTrueValue(_config.id, this.getCtType() + EJS.editorConstant.comNum)));
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

/**
 *fieldBase:域型基类
 *attribute:
 *          msg:控件信息，用出验证表单时，返回提示信息
 *          allowEmpty:是否允许域为空
 *          limit:数据限制
 */
EJS.Dom.fieldBase = {
    setMsg : function(_msg){
        this.msg = _msg;
    },
    getMsg : function(){
        return this.msg;
    },
    setLimit : function(_limit){
        this.limit = _limit;
    },
    getLimit : function(){
        return EJS.Util.getTrueValue(this.limit, "");
    },
    setAllowEmpty : function(_allowEmpty){
        this.allowEmpty = _allowEmpty;
    },
    getAllowEmpty : function(){
        return this.allowEmpty;
    }
}
EJS.Dom.fieldBase.prototype =  EJS.Dom.controlBase;


/**
 *选择型控件基类
 *
 *
 *
 */
EJS.Dom.selectBase = {
    isMultChoice : function(){
        return EJS.Util.getTrueValue(this.multChoice, false);
    },
    setMultChoice : function(_b){
        this.multChoice = _b;
    },
    addOption : function(_option){
        if(this.options == null) this.options = [];
        
        _option.setIndex((this.options.push(_option)) - 1);
        _option.setParent(this);
        if(_option.isSelected()){
            this.addSelectedOption(_option.getIndex(), _option);
        }
        return _option;
    },
    addOptions : function(_options){
        for(var i = 0; i < _options.length; i++){
            this.addOption(_options[i]);
            
        }
        
    },
    removeOption : function(_index){
        if(isNaN(_index)) return;
        this.options.splice(_index, 1);
    },
    removeAllOptions : function(){
        
        if(this.options != null && !isNaN(this.options.length)){
            this.options.splice(0,this.options.length);
        }
    },
    getOptionForIndex : function(_index){
        if(isNaN(_index)) return;
        return this.options[_index];
    },
    getOptionForText : function(_text){
        
    },
    getOptionsForText : function(_text){

    },
    getOptionsForValue : function(_value){

    },
    getAllOption : function(){
        return this.options;
    },
    addSelectedOption : function(_index, _option){
        if(this.selecteds == null) this.selecteds = {};
        
        this.selecteds[_index] = _option;
        
    },
    removeSelectedOption : function(_index){
        
        if(_index in this.selecteds){
            this.selecteds[_index] = null;
            delete this.selecteds[_index];
            
        }
    },
    removeAllSelectedOption : function(){
        for(var __ops in this.selecteds){
            
            this.removeSelectedOption(__ops);
        }
    },
    getAllSelectedOption : function(){
        var __ops = [];
        for(var opt in this.selecteds){
            
            __ops.push(this.selecteds[opt]);
            
        }
        
        return __ops;
    },
    setPreSelectIndex : function(_index){
        this.preSelectIndex = _index;
    },
    getPreSelectIndex : function(){
        return isNaN(this.preSelectIndex) ? -1 : this.preSelectIndex;
    },
    selectForIndex : function(_index){//选定index项
        this.getOptionForIndex(_index).select();
    },
    cancelForIndex : function(_index){//取消index项选定状态
        this.getOptionForIndex(_index).cancel();
    },
    preSelectForIndex : function(_index){//index为预选项，同时取消当前预选项
        this.cancelPreSelect();
        this.getOptionForIndex(_index).preSelect();
        this.setPreSelectIndex(_index);
    },
    cancelPreSelect : function(){//取消当前预选项
        if(this.getPreSelectIndex() >= 0){
            this.getOptionForIndex(this.getPreSelectIndex()).cancelPreSelect();
        }
    },
    clickPreSelect : function(){//切换预选项状态
        if(this.isMultChoice()){//为多选控件
            this.getOptionForIndex(this.getPreSelectIndex()).click();
        }else{

      
        
        
        
        }
    },
    cancelAll : function(){//取消所有当前被选择的选项
        var slcts = this.getAllSelectedOption();
        for(var slct in slcts){
            slcts[slct].cancel();
        }
    },
    previousItem : function(){//通过键盘选择当前选项的上一选项
        if(this.isMultChoice()){//为多选控件
            var __curentPreSelectIndex = this.getPreSelectIndex() - 1;
            if(__curentPreSelectIndex >= 0 && __curentPreSelectIndex < this.options.length){
                this.preSelectForIndex(__curentPreSelectIndex);
            }

        }else{//为单选控件
            var __curentPreSelectIndex = this.getAllSelectedOption().length > 0 ? this.getAllSelectedOption()[0].getIndex() - 1 : 0;
            if(__curentPreSelectIndex >= 0 && __curentPreSelectIndex < this.options.length){
                this.cancelAll();
                this.selectForIndex(__curentPreSelectIndex);
            }
        }

    },
    nextItem : function(){//通过键盘选择当前选项的下一选项
        if(this.isMultChoice()){//为多选控件
            var __curentPreSelectIndex = this.getPreSelectIndex() + 1;
            if(__curentPreSelectIndex >= 0 && __curentPreSelectIndex < this.options.length){
                this.preSelectForIndex(__curentPreSelectIndex);
            }

        }else{//为单选控件
            var __curentPreSelectIndex = this.getAllSelectedOption().length > 0 ? this.getAllSelectedOption()[0].getIndex() + 1 : 0;
            if(__curentPreSelectIndex >= 0 && __curentPreSelectIndex < this.options.length){
                this.cancelAll();
                this.selectForIndex(__curentPreSelectIndex);
            }

        }
    },
    validate : function(){
        
        if(this.getLimit() == ""){
            if(this.getAllowEmpty()){
                if(this.isMultChoice()){
                    this.setLimit("0-");
                }else{
                    this.setLimit("0,1");
                }
            }else{
                if(this.isMultChoice()){
                    this.setLimit("1-");
                }else{
                    this.setLimit("1");
                }
            }
        }
        
        if(!EJS.Util.math.availNumLimit(this.getAllSelectedOption().length, this.getLimit())){
            return this.getMsg();
        }
    },
    //用于checkbox、radiobox
    repaintOptions : function(){
        var optionsNode = this.getDom().childNodes;
        for(var i = optionsNode.length - 1; i >= 0; i--){
            EJS.Dom.DomHelper.remove(optionsNode[i], optionsNode[i].parentNode);
        }
        optionsNode = this.getAllOption();
        for(var i = 0; i < optionsNode.length; i++){
            //this.getDom().appendChild((this.addOption(new EJS.Dom.option(_config.options[i]))).getDom());
            EJS.Dom.DomHelper.append(optionsNode[i].getDom(), this.getDom());
        }
        tableTreeObj.load(this.getAttributes());

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
            options : this.getAllOptionAttribute()
        }
    },
    getAttributes : function(){
        attributeList = [];
        var options = this.getAllOption();
        var cAtt = {
                        para : {name : "基本属性",value : ""}, 
                        nodes : [
                            
                            {para : {name : "id", value : this.getId()}},
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
                    {para : {name : "默选", value : options[i].isSelected() ? 1 : 0, fun : Bind(options[i], options[i].changeOptionSelected)}, type : "radio", items : [{name : "选择", value : "1"},{name : "反择", value : "0"}]}//, type : "radio", items : [{name : "选择", value : "1"},{name : "反择", value : "0"}]
                ]
            });
        }
        attributeList.push(cAtt);
        return attributeList;
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
EJS.Dom.selectBase.prototype =  EJS.Dom.fieldBase;

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

/**
 *checkboxGroup:复选按钮
 *
 *
 */
EJS.Dom.checkboxGroup = Factory.create();

EJS.Dom.checkboxGroup.prototype = {
    initialize : function(_config){
        this.setCtType("checkboxGroup");
        this.setMultChoice(true);
        this.setClassName(EJS.Util.getTrueValue(_config.className, "ejs-checkboxgroup ejs-across"));
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
        this.setDom(EJS.Dom.DomHelper.create(
            {
                tagName : "ul",
                attribute : {clazz : this.getClassName(), id : this.getCid()},
                style : {left : this.getLeft(), top : this.getTop(), width : this.getWidth(), height : this.getHeight()}
            }
        ));
        
        if(_config.options && _config.options.length > 0){
            for(var i = 0; i < _config.options.length; i++){
                this.getDom().appendChild((this.addOption(new EJS.Dom.option(_config.options[i]))).getDom());
            }
        }
    },
    selectAll : function(){
        var ops = this.getAllOption();
        for(var op in ops){
            ops[op].select();
        }
    },

    //修改属性列表的选项数量时调用
    changeOptionNum : function(_num){
        var num = parseInt(_num);
        if(num && !isNaN(num) && num > 0){
            this.removeAllOptions();
            for(var i = 0; i < _num; i++){
                this.addOption(
                    new EJS.Dom.option(
                        {
                            text    : "选项"+(i+1),
                            value   : i,
                            selected: false
                        }
                    )
                );
            }
            this.repaintOptions();
        }
    }



}
EJS.extend(EJS.Dom.checkboxGroup, EJS.Dom.selectBase);
/**
 *radioGroup:单选按钮
 *
 *
 */
EJS.Dom.radioGroup = Factory.create();
EJS.Dom.radioGroup.prototype = {
    initialize : function(_config){
        this.setCtType("radioGroup");
        this.setMultChoice(false);
        this.setClassName(EJS.Util.getTrueValue(_config.className, "ejs-radiogroup ejs-across"));
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
        this.setDom(EJS.Dom.DomHelper.create(
            {
                tagName : "ul",
                attribute : {clazz : this.getClassName(), id : this.getCid()},
                style : {left : this.getLeft(), top : this.getTop(), width : this.getWidth(), height : this.getHeight()}
            }
        ));
        
        if(_config.options && _config.options.length > 0){
            for(var i = 0; i < _config.options.length; i++){
                this.getDom().appendChild((this.addOption(new EJS.Dom.option(_config.options[i]))).getDom());
            }
        }
    },

    //修改属性列表的选项数量时调用
    changeOptionNum : function(_num){
        var num = parseInt(_num);
        if(num && !isNaN(num) && num > 0){
            this.removeAllOptions();
            for(var i = 0; i < _num; i++){
                this.addOption(
                    new EJS.Dom.option(
                        {
                            text    : "选项"+(i+1),
                            value   : i,
                            selected: false
                        }
                    )
                );
            }
            this.repaintOptions();
        }
    }

}
EJS.extend(EJS.Dom.radioGroup, EJS.Dom.selectBase);
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


EJS.Dom.tabbedPane = function(_config){
    var __self = this;
    this.__tabs = [];
    var __tabCount = 0;
    var __activeIndex = -1;
    //返回_index位置的组件
    this.getComponentAt = function(_index){

    }
    //返回tag总数(包括禁用的)
    this.getTabCount = function(){
        return this.__tabs.length;
    }
    //返回能运行的tag数量
    this.getTabRunCount = function(){

    }
    //返回_index位置的tab标题
    this.getTitleAt = function(_index){

    }
    //使_index位置的选项卡禁用
    this.disableTabAt = function(_index){

    }
    //使_index位置的选项卡可用
    this.enableTabAt = function(_index){

    }
    //选择_index位置的选项卡
    this.selectTabAt = function(_index){
        if(!isNaN(_index) && _index >= 0 && _index < this.__tabs.length){
            if(__activeIndex != -1){
                if(this.__tabs[__activeIndex]) this.__tabs[__activeIndex].deactivation();//将之前的击活选项卡状态置为非击活
            }
            __activeIndex = _index;
            this.__tabs[__activeIndex].activation();
            this.adjustActivePanel();
        }
    }
    this.getActiveTab = function(){
        return this.__tabs[__activeIndex];
    }
    this.getActiveTabIndex = function(){
        return __activeIndex;
    }
    this.adjustActivePanel = function(){
        if(__activeIndex > -1){
               
             this.__tabs[__activeIndex].getPanel().setWidth(parseInt(this.getWidth()) - 2);
             this.__tabs[__activeIndex].getPanel().setHeight(parseInt(this.getHeight()) - 26);
        }
    }   

    this.addTab = function(_tab, _index){//
        var tabCount = this.__tabs.length;
        if(tabCount == 0 || _index == null || isNaN(_index) || _index >= tabCount){
            _index = -1;
        }
        if(_index == -1){
            tabbedpaneHeaderDom.insertBefore(_tab.getDom(), dividinglineDom);
        }else{
            tabbedpaneHeaderDom.insertBefore(_tab.getDom(), this.__tabs[_index].getDom());
        }
        //_tab.getPanel().setParentPanel(this);
        //this.getParentPanel.add(_tab.getPanel());//将tab对应的panel添加到tabbedPane所属的panel中
        //tabbedpaneBodyDom.appendChild(_tab.getPanel().getDom());
        _tab.getPanel().hidden();//隐藏对应的panel
        _tab.getPanel().setParentPanel(this);//设置tab中的面板的父panel为tabbedpane
        _tab.getPanel().paint(tabbedpaneBodyDom);//将tab对应的panel内的控件输出到tabbedpaneBodyDom中
        
        this.__tabs.push(_tab);
        _tab.setParent(this);
        _tab.setIndex(this.__tabs.length - 1);

    }
    this.removeTab = function(_index){
        if(isNaN(_index)) return;
        var tab = this.__tabs[_index];
        EJS.Dom.DomHelper.remove(tab.getDom(), tabbedpaneHeaderDom);//(!)
        this.__tabs.splice(_index, 1);
        
    }

    {




        this.setCtType("tabbedPane");
        this.setOriginY(26);
        this.setCid(EJS.Util.Format.trim(EJS.Util.getTrueValue(_config.cid, EJS.Util.GUID.get)));//唯一标识
        this.setId(EJS.Util.Format.trim(EJS.Util.getTrueValue(_config.id, this.getCtType() + EJS.editorConstant.comNum)));
        this.setName(!!_config.name ? EJS.Util.Format.trim(_config.name) : this.getId());
        
        this.setLeft(EJS.Util.math.getTrueNum(_config.left));
        this.setTop(EJS.Util.math.getTrueNum(_config.top));
        this.setWidth(EJS.Util.math.getTrueNum(_config.width));
        this.setHeight(EJS.Util.math.getTrueNum(_config.height));
        this.setClassName(EJS.Util.getTrueValue(_config.className, "ejs-tabbedpane"));
        this.setIsContainer(true);
        this.setDom(EJS.Dom.DomHelper.create(
            {
                tagName : "div", 
                attribute : {clazz : this.getClassName(), id : this.getCid(), name : this.getName()},
                style : {left : this.getLeft(), top : this.getTop(), width : (parseInt(this.getWidth()) - this.getBorderLeftWidth() - this.getBorderRightWidth()) + "px", height : (parseInt(this.getHeight()) - this.getBorderTopWidth() - this.getBorderBottomWidth()) + "px"},
                children : [
                    {
                        tagName : "div",
                        attribute : {clazz : "ejs-tabbedpane-header"},
                        children : [
                            {
                                tagName : "ul",
                                children : [
                                    {
                                        tagName : "li",
                                        attribute : {clazz : "ejs-dividingline"},
                                        style : {margin : "0", top : "0"}
                                    },
                                    {
                                        tagName : "div",
                                        attribute : {clazz : "ejs-clear"}
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        tagName : "div",
                        attribute : {clazz : "ejs-tabbedpane-body"}
                    }
                ]
            }
        ));
        var tabbedpaneHeaderDom = this.getDom().childNodes[0].childNodes[0];
        var dividinglineDom = this.getDom().childNodes[0].childNodes[0].childNodes[0];
        var tabbedpaneBodyDom = this.getDom().childNodes[1];
        
        if(_config.tabs && _config.tabs.constructor == Array && _config.tabs.length > 0){
            for(var i = 0; i < _config.tabs.length; i++){
                
                var currentTabConfig = _config.tabs[i];
                var currentTab = new EJS.Dom.tab(currentTabConfig);
                this.addTab(currentTab);
            }
            
        }
        
        this.selectTabAt(EJS.Util.math.getTrueNum(_config.activeIndex, 0));//击活选项卡
        this.adjustActivePanel();
    }(_config)


}
EJS.Dom.tabbedPane.prototype = {
    //重载repaint方法，每次仅渲染当前活动tab
    repaint : function(){
        
        this.getActiveTab().getPanel().setChange(true);//将当前活动容器设为已更新状态
        this.getActiveTab().getPanel().repaint(this.getActiveTab().getPanel().getCid());
    },
    add : function(_component){
        this.getActiveTab().getPanel().add(_component);
        _component.setTopContainer(this.getTopContainer());//将编辑器设置为控件的顶级容器,可以用这个判断出当前为编辑状态
        //this.getActiveTab().getPanel().repaint(this.getActiveTab().getPanel().getId());//重新渲染tabbedPane
        //alert(this.getDom().outerHTML)
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
            this.adjustActivePanel();
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
            this.adjustActivePanel();

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
    },
    changeTabNum : function(_num){
        var num = parseInt(_num);
        if(num && !isNaN(num) && num > 0){
            var increment = _num - this.getTabCount();
            
            if(increment > 0){//大于tab总数
                for(var i = 0; i < increment; i++){
                    this.addTab(new EJS.Dom.tab({
                        text        : "标签" + (this.getTabCount() + i + 1),
                        isDisable   : false,
                        panel       : {}
                    }));
                }
            }else if(increment < 0){//小于tab总数
                
                //increment = Math.abs(_num);
                increment *= -1; 
                
                var maxIndex = this.getTabCount() - (this.getActiveTabIndex());//剩几个(包括当前活动的tab)

                //maxIndex = maxIndex < increment ? maxIndex : increment;
                increment = increment > maxIndex ? maxIndex : increment;
                    
                for(var i = this.getActiveTabIndex() + increment - 1; i >= this.getActiveTabIndex()  ; i--){
                    this.removeTab(i);
                }
                this.selectTabAt(0);
            }
            this.repaint(this.getCid());
            //this.repaintOptions();
        }
    },
    getAllTabAttribute : function(){
        var optionsArr = [];
        for(var i = 0; i < this.__tabs.length; i++){
            optionsArr.push(this.__tabs[i].getAttributesOnly());
        }
        return optionsArr;
        
    },

    getAttributesOnly : function(_isEqual){
        return {
            cid     : !!_isEqual ? this.getCid() : EJS.Util.GUID.get(),
            id      : this.getId(),
            ctType  : "tabbedPane",
            className : this.getClassName(),
            name    : this.getName(),
            left    : parseInt(this.getLeft()),
            top     : parseInt(this.getTop()),
            width   : parseInt(this.getWidth()),
            height  : parseInt(this.getHeight()),
            tabs : this.getAllTabAttribute()

        }
    },
    getAttributes : function(){
        attributeList = [];
        var options = this.__tabs;
        var cAtt = {
                        para : {name : "基本属性",value : ""}, 
                        nodes : [
                            {para : {name : "id", value : this.getId()}},
                            {para : {name : "name", value : this.getName(), fun : Bind(this, this.setName)}},
                            {para : {name : "width", value : parseInt(this.getWidth()), fun : Bind(this, this.setWidth)}},
                            {para : {name : "height", value : parseInt(this.getHeight()), fun : Bind(this, this.setHeight)}},
                            {para : {name : "left", value : parseInt(this.getLeft()), fun : Bind(this, this.setLeft)}},
                            {para : {name : "top", value : parseInt(this.getTop()), fun : Bind(this, this.setTop)}},
                            {
                                para : {name : "选项", value : options.length, fun : Bind(this, this.changeTabNum)},
                                nodes : []
                            }
                            

                        ]
                        
                    };
        for(var i = 0; i < options.length; i++){
            cAtt.nodes[cAtt.nodes.length - 1].nodes.push({
                para : {name : "选项"+(i+1), value : ""},
                nodes : [
                    {para : {name : "名称", value : options[i].getText(), fun : Bind(options[i], options[i].setText)}}
                ]
            });
        }
        attributeList.push(cAtt);
        return attributeList;
    },
        
    //设置容器显示区域的左上角X坐标
    setOriginX : function(_originX){
        this.originX = !isNaN(_originX) ? _originX : 0;
    },
    getOriginX : function(){
        return this.originX ? this.originX : 0;
    },
    //设置容器显示区域左上角Y坐标
    setOriginY : function(_originY){
        this.originY = !isNaN(_originY) ? _originY : 0;
    },
    getOriginY : function(){
        return this.originY ? this.originY : 0;
    }

}
EJS.extend(EJS.Dom.tabbedPane, EJS.Dom.controlBase);



EJS.Action = {
    animate : function(_proxyLayer, _aimX, _aimY, _width, _height, _speed, _callback){
        function start(_aimX, _aimY, _width, _height, _speed){
            var ml,mt,cw,ch,w,h,l,t;
            //alert(_aimX + "," + _aimY + "," + _width + "," + _height + "," + _speed);
            //var logTag = document.getElementById("log");
            //logTag.innerHTML = logTag.innerHTML + "<br/>" + _aimX + "," + _aimY + "," + _width + "," + _height + "," + _speed + "," + _proxyLayer.getDom().style.display;
            ml = Math.ceil(Math.abs(_aimX) / _speed) * (_aimX / Math.abs(_aimX)) || 0;
            mt = Math.ceil(Math.abs(_aimY) / _speed) * (_aimY / Math.abs(_aimY)) || 0;
            cw = Math.ceil(Math.abs(_width) / _speed) * (_width / Math.abs(_width)) || 0;
            ch = Math.ceil(Math.abs(_height) / _speed) * (_height / Math.abs(_height)) || 0;
            //alert(ml + "," + mt + "," + cw + "," + ch)
            w = parseInt(_proxyLayer.getWidth()) + cw;
            h = parseInt(_proxyLayer.getHeight()) + ch;
            l = parseInt(_proxyLayer.getLeft()) + ml;
            t = parseInt(_proxyLayer.getTop()) + mt;
            _proxyLayer.setWidth(w >= 0 ? w : 0);
            _proxyLayer.setHeight(h >= 0 ? h : 0);
            _proxyLayer.setLeft(l >= 0 ? l : 0);
            _proxyLayer.setTop(t >= 0 ? t : 0);
            if(_speed >= 1){
                window.setTimeout(function(){start(_aimX - ml, _aimY - mt, _width - cw, _height - ch, --_speed);}, 10);
            }else{
                _callback();
            }
        }
        
        var offsetX = _aimX - parseInt(_proxyLayer.getLeft());
        var offsetY = _aimY - parseInt(_proxyLayer.getTop());
        var offsetWidth = _width - parseInt(_proxyLayer.getWidth());
        var offsetHeight = _height - parseInt(_proxyLayer.getHeight());
        start(offsetX, offsetY, offsetWidth, offsetHeight, _speed);
    }
}


/**
 * 代理层
 *
 *
 */
EJS.Dom.proxyLayer = function(_config){
    var __self = this;
    var __parent;
    this.setWidth = function(_width){
        this.superClass.setWidth.call(__self, parseInt(_width));
        if(this.getDom()){
            this.getDom().style.width = this.getWidth();
        }
    }
    this.setHeight = function(_height){
        this.superClass.setHeight.call(__self, parseInt(_height));
        if(this.getDom()){
            this.getDom().style.height = this.getHeight();
        }
    }
    this.setLeft = function(_left){
        this.superClass.setLeft(parseInt(_left));
        if(this.getDom()){
            this.getDom().style.left = this.getLeft();
        }
    }
    this.setTop = function(_top){
        this.superClass.setTop.call(__self, parseInt(_top));
        if(this.getDom()){
            this.getDom().style.top = this.getTop();
        }
    }
    //设置父对象
    this.setParent = function(_parent){
        __parent = _parent;
    }
    this.getParent = function(){
        return __parent;
    }
    {
        this.setCtType("proxyLayer");
        this.setCid(EJS.Util.Format.trim(EJS.Util.getTrueValue(_config.cid, EJS.Util.GUID.get)));//唯一标识
        this.setId(EJS.Util.Format.trim(EJS.Util.getTrueValue(_config.id, this.getCtType() + EJS.editorConstant.comNum)));
        this.setName(!!_config.name ? EJS.Util.Format.trim(_config.name) : this.getId());
        this.setLeft(EJS.Util.math.getTrueNum(_config.left));
        this.setTop(EJS.Util.math.getTrueNum(_config.top));
        this.setWidth(EJS.Util.math.getTrueNum(_config.width));
        this.setHeight(EJS.Util.math.getTrueNum(_config.height));
        this.setClassName(EJS.Util.getTrueValue(_config.className, "ejs-proxy-layer"));
        this.setDom(EJS.Dom.DomHelper.create(
            {tagName : "div", attribute : {clazz : this.getClassName()}, style : {left : this.getLeft(), top : this.getTop(), width : this.getWidth(), height : this.getHeight()}}
        ));
    }(_config)

}
EJS.extend(EJS.Dom.proxyLayer, EJS.Dom.Container);


EJS.Dom.dialogBox = function(_config){
    var __self = this;
    /**
     *__dialogHeadingColumn:对话框标题栏
     *__dialogBodyArea:对话框体(除标题栏的部份)
     *__dialogContentArea:对话框体内的内容区域
     *__dialogBtnArea:对话框的按钮区域
     *__dialogResizeBtn:对话框的调整窗口大小按钮
     *__dialogControlBtn1:对话框标题栏右边，从左至右的第一个按钮(最小化、还原按钮)
     *__dialogControlBtn2:对话框标题栏右边，从左至右的第二个按钮(最大化、还原按钮)
     *__dialogControlBtn3:对话框标题栏右边，从左至右的第三个按钮(关闭按钮)
     */
    var DIFFERENCE_HEIGHT_DIFFER_BROWER = 46;//Quirks模式与Standards模式的区别
    var DIFFERENCE_HEIGHT_FACT = -27;
    var DIALOGBTNAREA_HEIGHT = 35;//对话框按钮区高度
    var ZINDEX = 1001;
    var __dialogHeadingColumn, __dialogBodyArea, __dialogContentArea, __dialogBtnArea, __dialogResizeBtn, __dialogControlBtn1, __dialogControlBtn2, __dialogControlBtn3;
    var __initWidth,__initHeight,__minWidth,__minHeight,__maxWidth,__maxHeight,__moveStartX,__moveStartY,__lastWidth,__lastHeight,__lastLeft,__lastTop,__isResize,__dialogType,__currentState,__triggerState,__isMobile,__dialogBtnAlign,__isModal,__headingColumnBtnNum,__title,__url,__message,__popupStyle,__shutStyle,__parentDialog,__isAnimate,__isSingle,__zindex;
    var __dialogButtonCache = [];//对话框按钮数组
    var __dialogPanel;
    var __proxyLayer = new EJS.Dom.proxyLayer({width:1, height:1});
    //var __modelLayer = new EJS.Dom.proxyLayer({width:1, height:1});//当对话框为模态窗口时，对话框底部需用一个层挡住
    var __modelLayer;
    var countBodyHeight = function(){
        var h;
        if(!EJS.Client.boxModel){
            h = parseInt(__self.getHeight()) + DIFFERENCE_HEIGHT_DIFFER_BROWER + DIFFERENCE_HEIGHT_FACT;
        }else{
            h = parseInt(__self.getHeight()) + DIFFERENCE_HEIGHT_FACT;
        }
        if(__dialogButtonCache.length > 0){
            h -= DIALOGBTNAREA_HEIGHT;
        }
        return h > 0 ? h : 0;
    }

    var setBodyHeight = function(_height){
        if(!__dialogBodyArea) return false;
        if(_height > 0){
            __dialogBodyArea.style.height = _height + "px";
            __dialogBodyArea.style.display = "block";
            //下面这两行用于修改对话框内的panel对象的宽、高
            if(__dialogPanel.setHeight){
                __dialogPanel.setHeight(_height);//修改panel的高度
                __dialogPanel.setWidth(parseInt(__self.getWidth()) - 2);//修改panel的宽度
            }else{
                
                __dialogPanel.style.height = _height + "px";
                __dialogPanel.style.width = (parseInt(__self.getWidth()) - 2) + "px";
            }
        }else{
            __dialogBodyArea.style.height = "0px";
            __dialogBodyArea.style.display = "none";
        }
    }

    //初始宽度
    this.setInitWidth = function(_initWidth){
        __initWidth = _initWidth;
    }
    this.getInitWidth = function(){
        return __initWidth;
    }
    //初始高度
    this.setInitHeight = function(_initHeight){
        __initHeight = _initHeight;
    }
    this.getInitHeight = function(){
        return __initHeight;
    }

    //最小宽度
    this.setMinWidth = function(_minWidth){
        __minWidth = _minWidth;
    }
    this.getMinWidth = function(){
        return __minWidth;
    }
    //最小高度
    this.setMinHeight = function(_minHeight){
        __minHeight = _minHeight;
    }
    this.getMinHeight = function(){
        return __minHeight;
    }
    //最大宽度
    this.setMaxWidth = function(_maxWidth){
        __maxWidth = _maxWidth;
    }
    this.getMaxWidth = function(){
        return __maxWidth;
    }
    //最大高度
    this.setMaxHeight = function(_maxHeight){
        __maxHeight = _maxHeight;
    }
    this.getMaxHeight = function(){
        return __maxHeight;
    }
    //最开始出现在X坐标
    this.setMoveStartX = function(_moveStartX){
        __moveStartX = _moveStartX;
    }
    this.getMoveStartX = function(){
        return __moveStartX;
    }
    //最开始出现的Y坐标
    this.setMoveStartY = function(_moveStartY){
       __moveStartY = _moveStartY; 
    }
    this.getMoveStartY = function(){
        return __moveStartY;
    }
    //上一个状态的宽度
    this.setLastWidth = function(_lastWidth){
        __lastWidth = _lastWidth;
    }
    this.getLastWidth = function(){
        return __lastWidth;
    }
    //上一个状态的高度
    this.setLastHeight = function(_lastHeight){
        __lastHeight = _lastHeight;
    }
    this.getLastHeight = function(){
        return __lastHeight;
    }
    //上一个状态的横坐标
    this.setLastLeft = function(_lastLeft){
        __lastLeft = _lastLeft;
    }
    this.getLastLeft = function(){
        return __lastLeft;
    }
    //上一个状态的纵坐标
    this.setLastTop = function(_lastTop){
        __lastTop = _lastTop;
    }
    this.getLastTop = function(){
        return __lastTop;
    }   

    

    //是否可调整对话框大小
    this.setResize = function(_resize){
        __isResize = _resize;
    }
    this.isResize = function(){
        return __isResize;
    }

    //对话框类型(ALERT,CONFIRM,PROMPT,MULTI_LINE_PROMPT,YES_NO_CANCEL,IFRAME)
    this.setDialogType = function(_dialogType){
        __dialogType = _dialogType;
    }
    this.getDialogType = function(){
        return __dialogType;
    }
    //当前对话框的状态(none,maximize,minimize,normal)
    this.setCurrentState = function(_currentState){
        __currentState = _currentState;
    }
    this.getCurrentState = function(){
        return __currentState;
    }
    //即将触发对话框，改变成另一状态(none,maximize,minimize,normal)
    this.setTriggerState = function(_triggerState){
        __triggerState = _triggerState;
    }
    this.getTriggerState = function(){
        return __triggerState;
    }
    //对话框是否可移动位置
    this.setMobile = function(_mobile){
        __isMobile = _mobile;
    }
    this.isMobile = function(){
        return __isMobile;
    }
    
    //按钮对齐方式
    this.setBtnAlign = function(_btnAlign){
        __dialogBtnAlign = _btnAlign;
    }
    this.getBtnAlign = function(){
        return __dialogBtnAlign;
    }
    
    //对话框是否为模态窗口
    this.setModal = function(_modal){
        __isModal = _modal;
    }
    this.isModal = function(){
        return __isModal;
    }
    //标题栏按钮数量(1:仅有关闭按钮,2:最小化与关闭按钮,3最小化、最大化与关闭按钮)
    this.setHeadingColumnBtnNum = function(_headingColumnBtnNum){
        __headingColumnBtnNum = _headingColumnBtnNum;
    }
    this.getHeadingColumnBtnNum = function(){
        return __headingColumnBtnNum;
    }

    //对话框的标题
    this.setTitle = function(_title){
        __title = _title;
    }
    this.getTitle = function(){
        return __title;
    }
    //对话框内的消息
    this.setMessage = function(_message){
        __message = _message;
    }
    this.getmessage = function(){
        return __message;
    }

    //当对话框为IFRAME状态时，些时对话框体里的内容为一个远程url
    this.setUrl = function(_url){
        __url = _url;
    }
    this.getUrl = function(){
        return __url;
    }
    //弹出方式
    this.setPopupStyle = function(_popupStyle){
        __popupStyle = _popupStyle;
    }
    this.getPopupStyle = function(){
        return __popupStyle;
    }
    //关闭方式
    this.setShutStyle = function(_shutStyle){
        __shutStyle = _shutStyle;
    }
    this.getShutStyle = function(){
        return __shutStyle;
    }
    //设置父对话框
    this.setParentDialog = function(_parentDialog){
        __parentDialog = _parentDialog;
    }
    this.getParentDialog = function(){
        return __parentDialog;
    }
    //打开或关闭对话框时有动画效果
    this.setIsAnimate = function(_isAnimate){
        __isAnimate = _isAnimate;
    }
    this.isAnimate = function(){
        return __isAnimate;
    }
    //对话框时否唯一状态，是则对话框本身可多次使用；否则对话框仅为一次性，即关闭对话框本身被删除
    this.setIsSingle = function(_isSingle){
        __isSingle = _isSingle;
    }
    this.isSingle = function(){
        return __isSingle;
    }
    //对话框的zIndex属性
    this.setZindex = function(_zindex){
        __zindex = _zindex;
    }
    this.getZindex = function(){
        if(!__zindex){
            __zindex = ZINDEX;
        }
        return __zindex;
    }
    /*
    this.setDialogPanel = function(_panel){
        __dialogPanel = _panel;
    }
    this.getDialogPanel = function(){
        return __dialogPanel;
    }
    */
    //添加对话钮按钮
    this.addButton = function(_btnText, _method){
        var btnObj = new EJS.Dom.button({
            className : "ejs-btn ejs-dialog-btn",
            type    : "button",
            text    : _btnText,
            click   : _method
        });
        var btn_li = EJS.Dom.DomHelper.create(
                {tagName : "li", attribute : {clazz : "btn-" + __self.getBtnAlign()}, children : [
                    btnObj.getDom()
                ]}
        );
        
        __dialogButtonCache.push(btnObj);
        __dialogBtnArea.appendChild(btn_li);
        if(__dialogBtnArea.style.display = "none"){
            __dialogBodyArea.style.paddingBottom = DIALOGBTNAREA_HEIGHT + "px";
            setBodyHeight(countBodyHeight());
            __dialogBtnArea.style.display = "block";
        }
    }
    //按添加的顺序移除_index对应的位置的按钮
    this.removeButton = function(_index){
        if(__dialogButtonCache.length > 0 && !isNaN(_index) && _index < __dialogButtonCache.length){
            var btnObj = __dialogButtonCache[_index].getDom();
            var btnLi = btnObj.parentNode
            EJS.Dom.DomHelper.remove(btnLi, __dialogBtnArea);
            __dialogButtonCache.splice(_index, 1);
            btnObj = null;
            btnLi = null;
            if(__dialogButtonCache.length == 0){
                 __dialogBodyArea.style.paddingBottom = "0px";
                 setBodyHeight(countBodyHeight());
                 __dialogBtnArea.style.display = "none";
            }
        }
    }

    //覆盖父类方法
    this.setWidth = function(_width){
        this.superClass.setWidth.call(__self, parseInt(_width));
        if(this.getDom()){
            this.getDom().style.width = this.getWidth();
        }
    }
    //覆盖父类方法
    this.setHeight = function(_height){
        if(_height && _height != null){
            this.superClass.setHeight.call(__self, parseInt(_height));
            setBodyHeight(countBodyHeight());
        }
    }
    //覆盖父类方法
    this.setLeft = function(_left){
        
        this.superClass.setLeft.call(__self, parseInt(_left));
        if(this.getDom()){
            this.getDom().style.left = this.getLeft();
        }

    }
    //覆盖父类方法
    this.setTop = function(_top){
        this.superClass.setTop.call(__self, parseInt(_top));
        if(this.getDom()){
            this.getDom().style.top = this.getTop();
        }
    }


    var SPEED = 20;
    /**
     *拖拽对话框
     *@param (Event) 触发拖拽的事件
     *
     */
    var __drag = function(){
        __proxyLayer.show();
        drag(__proxyLayer.getDom(),EJS.Event.getEvent(),true);
        if(document.addEventListener) {
            document.addEventListener("mouseup",release,true);//这里不清楚为什么要把事件绑到document上
        }else{
            EJS.Event.Handler.add(__proxyLayer.getDom(), "mouseup", release);
            //__proxyLayer.getDom().attachEvent("onmouseup",release);
        }
        function release(){
            
            __proxyLayer.hidden();
            __proxyLayer.setLeft(__proxyLayer.getDom().style.left);//由于进行了拖拽，要进行left变量同步
            __proxyLayer.setTop(__proxyLayer.getDom().style.top);//由于进行了拖拽，要进行top变量同步
            __self.setLeft(parseInt(__proxyLayer.getLeft()));
            __self.setTop(parseInt(__proxyLayer.getTop()));
            //alert(_self.getLeft() +"," +_self.getTop());
            if(document.removeEventListener){
                document.removeEventListener("mouseup", release, true);
            }else if(document.detachEvent){
                EJS.Event.Handler.remove(__proxyLayer.getDom(), "mouseup", release);//如果用Handler类添加的方法，就一定要用Handler类的remove移除方法
                //__proxyLayer.getDom().detachEvent("onmouseup", release);
            }
        }
    }
    var changeDialogControlBtn = function(){
        EJS.Event.Handler.removeAll(__dialogControlBtn1);
        EJS.Event.Handler.removeAll(__dialogControlBtn2);
        switch(__self.getCurrentState()){
            case "maximize" :
                                EJS.Dom.CSSHelper.modifyName(__dialogControlBtn1, "ejs-dialog-btn-minimize");
                                EJS.Dom.CSSHelper.modifyName(__dialogControlBtn2, "ejs-dialog-btn-renew");
                                EJS.Event.Handler.add(__dialogControlBtn1, "mousedown", __self.minimize);
                                EJS.Event.Handler.add(__dialogControlBtn2, "mousedown", __self.renew);
                                EJS.Event.Handler.remove(__dialogHeadingColumn, "mousedown", __drag);
                                break;
            case "minimize" :
                                EJS.Dom.CSSHelper.modifyName(__dialogControlBtn1, "ejs-dialog-btn-renew");
                                EJS.Dom.CSSHelper.modifyName(__dialogControlBtn2, "ejs-dialog-btn-maximize");
                                EJS.Event.Handler.add(__dialogControlBtn1, "mousedown", __self.renew);
                                EJS.Event.Handler.add(__dialogControlBtn2, "mousedown", __self.maximize);
                                if(EJS.Event.Handler.find(__dialogHeadingColumn, "mousedown", __drag) == -1){
                                    EJS.Event.Handler.add(__dialogHeadingColumn, "mousedown", __drag);
                                }
                                break;
            case "renew"    :
                                EJS.Dom.CSSHelper.modifyName(__dialogControlBtn1, "ejs-dialog-btn-minimize");
                                EJS.Dom.CSSHelper.modifyName(__dialogControlBtn2, "ejs-dialog-btn-maximize");
                                EJS.Event.Handler.add(__dialogControlBtn1, "mousedown", __self.minimize);
                                EJS.Event.Handler.add(__dialogControlBtn2, "mousedown", __self.maximize);
                                if(EJS.Event.Handler.find(__dialogHeadingColumn, "mousedown", __drag) == -1){
                                    EJS.Event.Handler.add(__dialogHeadingColumn, "mousedown", __drag);
                                }
        }
    }
    /**
     *关闭对话时的清理工作
     *
     */
    var destroy = function(){
        
    }

    /**
     *显示对话框
     *@param (int) 对话框的X坐标
     *@param (int) 对话框的Y坐标
     *
     */
    this.show = function(_targetX, _targetY){
        var __dialogWidth = __self.getInitWidth();
        var __dialogHeight = __self.getInitHeight();
        var __startX = 0;
        var __startY = 0;
        var screenCenter = EJS.Client.getClientLoc("c");
        if(isNaN(_targetX) || isNaN(_targetY)){//如果目标坐标值不合法，则坐标为定为屏幕正中间
            _targetX = screenCenter.x - Math.round(parseInt(__self.getWidth()) / 2);
            _targetY = screenCenter.y - Math.round(parseInt(__self.getHeight()) / 2);
        }
        if(__self.isModal()){//如果是模态窗口，将触发事件的控件失去焦点
            var target = EJS.Event.getEventTarget();
            if(target) target.blur();
        }
        //__self.setPopupStyle("EVENTTARGET");
        switch(__self.getPopupStyle()){
            case "SCREENCENTER" : __startX = screenCenter.x;
                                  __startY = screenCenter.y;
                                  break;
            case "EVENTTARGET"  : var event = EJS.Event.getEvent();
                                  var target = event.target ? event.target : event.srcElement;
                                  
                                  var targetLoc = EJS.Dom.getElPos(target);
                                  __startX = targetLoc.left;
                                  __startY = targetLoc.top;
                                  break;
        }
        __self.setMoveStartX(__startX);//记录对话框最开始出现的X坐标
        __self.setMoveStartY(__startY);//记录对话框最开始出现的Y坐标
        __proxyLayer.setLeft(__startX);//设置对话框代理层的起始X坐标
        __proxyLayer.setTop(__startY);//设置对话框代理层的起始Y坐标
        __self.hidden();//
        __proxyLayer.show();
        EJS.Action.animate(__proxyLayer, _targetX, _targetY, __dialogWidth, __dialogHeight, SPEED, function(){
            __self.setWidth(parseInt(__proxyLayer.getWidth()));
            __self.setHeight(parseInt(__proxyLayer.getHeight()));
            __self.setLeft(parseInt(__proxyLayer.getLeft()));
            __self.setTop(parseInt(__proxyLayer.getTop()));
            __self.setLastWidth(parseInt(__proxyLayer.getWidth()));
            __self.setLastHeight(parseInt(__proxyLayer.getHeight()));
            __self.setLastLeft(parseInt(__proxyLayer.getLeft()));
            __self.setLastTop(parseInt(__proxyLayer.getTop()));
            __self.superClass.show.call(__self);//显示对话框
            __proxyLayer.hidden();//隐藏代理层
            /*
            if(__self.getType() == "IFRAME_PROMPT"){
                getInputTag().src = __self.getUrl();
            }
            if(__self.getType() == "AJAX_PROMPT"){
                EJS.ajaxAPI.load(getInputTag(), __self.getUrl());
            }
            */
            if(__self.isModal()){
                var pageWH = EJS.Client.getClientLoc("pagewh");
                __modelLayer.setWidth(pageWH.x);
                __modelLayer.setHeight(pageWH.y);
                __modelLayer.setLeft(0);
                __modelLayer.setTop(0);
                __modelLayer.show();
            }
            __self.setCurrentState("normal");
            
            __self.onReady();
            //这里的关闭只做了隐藏处理
        });

    }
    /**
     *关闭对话框
     *@param (int) 对话框的X坐标
     *@param (int) 对话框的Y坐标
     *
     */
    this.close = function(_targetX, _targetY){
        EJS.Event.cancelBubble();
        var __dialogWidth = 0;
        var __dialogHeight = 0;
        var screenCenter = EJS.Client.getClientLoc("c");
        if(isNaN(_targetX) || isNaN(_targetY)){//如果目标坐标值不合法，则坐标定为对话框最开始显示的位置
            switch(__self.getShutStyle()){
                case "SCREENCENTER" : var screenCenter = EJS.Client.getClientLoc("c");
                                      _targetX = screenCenter.x;
                                      _targetY = screenCenter.y;
                                      break;
                case "EVENTTARGET"  : _targetX = __self.getMoveStartX();
                                      _targetY = __self.getMoveStartY();
                                      break;
            }
        }
        //将代理层的坐标、宽高设为相同
        __proxyLayer.setWidth(parseInt(__self.getWidth()));
        __proxyLayer.setHeight(parseInt(__self.getHeight()));
        __proxyLayer.setLeft(parseInt(__self.getLeft()));//设置对话框代理层的起始X坐标
        __proxyLayer.setTop(parseInt(__self.getTop()));//设置对话框代理层的起始Y坐标
        __self.hidden();//隐藏对话框
        __proxyLayer.show();//显示代理层
        EJS.Action.animate(__proxyLayer, _targetX, _targetY, __dialogWidth, __dialogHeight, SPEED, function(){
            __proxyLayer.hidden();
            if(__self.isModal() && __modelLayer.isDisplay()){
                __modelLayer.hidden();//隐藏遮挡层
            }
            __self.setCurrentState("close");
        });

    }
    /**
     *最小化
     *@param (int) 对话框的X坐标
     *@param (int) 对话框的Y坐标
     *
     */
    this.minimize = function(_targetX, _targetY){
        
        EJS.Event.cancelBubble();
        var __dialogWidth = 150;
        var __dialogHeight = 26;
        if(isNaN(_targetX) || isNaN(_targetY)){//如果目标坐标值不合法，则坐标定为对话框最开始显示的位置
            var screenRightBottom = EJS.Client.getClientLoc("rb");
            _targetX = screenRightBottom.x - __dialogWidth - 2;//减2是指代理层的border
            _targetY = screenRightBottom.y - __dialogHeight - 2;//减2是指代理层的border
        }
        //将代理层的坐标、宽高设为相同
        __proxyLayer.setWidth(parseInt(__self.getWidth()));
        __proxyLayer.setHeight(parseInt(__self.getHeight()));
        __proxyLayer.setLeft(parseInt(__self.getLeft()));//设置对话框代理层的起始X坐标
        __proxyLayer.setTop(parseInt(__self.getTop()));//设置对话框代理层的起始Y坐标
        __self.hidden();//隐藏对话框
        __proxyLayer.show();//显示代理层
        EJS.Action.animate(__proxyLayer, _targetX, _targetY, __dialogWidth, __dialogHeight, SPEED, function(){
            __proxyLayer.hidden();
            __self.setWidth(__dialogWidth);
            __self.setHeight(__dialogHeight);
            __self.setLeft(_targetX);
            __self.setTop(_targetY);
            __self.superClass.show.call(__self);
            __self.setCurrentState("minimize");
            changeDialogControlBtn();
        });

    }
    /**
     *最大化
     *
     */
    this.maximize = function(){
        EJS.Event.cancelBubble();
        var __width_height = EJS.Client.getClientLoc("wh");
        var __left_top = EJS.Client.getClientLoc("lt");
        var __targetX = __left_top.x;
        var __targetY = __left_top.y;
        var __dialogWidth = __width_height.x;
        var __dialogHeight = __width_height.y;
        __proxyLayer.setWidth(parseInt(__self.getWidth()));
        __proxyLayer.setHeight(parseInt(__self.getHeight()));
        __proxyLayer.setLeft(parseInt(__self.getLeft()));//设置对话框代理层的起始X坐标
        __proxyLayer.setTop(parseInt(__self.getTop()));//设置对话框代理层的起始Y坐标
        __self.hidden();//隐藏对话框
        __proxyLayer.show();//显示代理层
        EJS.Action.animate(__proxyLayer, __targetX, __targetY, __dialogWidth, __dialogHeight, SPEED, function(){
            __proxyLayer.hidden();
            __self.setWidth(__dialogWidth);
            __self.setHeight(__dialogHeight);
            __self.setLeft(__targetX);
            __self.setTop(__targetY);
            __self.superClass.show.call(__self);
            __self.setCurrentState("maximize");
            changeDialogControlBtn();
        });
    }
    /**
     *恢复
     *
     */
    this.renew = function(_targetX, _targetY){
        EJS.Event.cancelBubble();
        var __targetX = __self.getLastLeft();
        var __targetY = __self.getLastTop();
        var __dialogWidth = __self.getLastWidth();
        var __dialogHeight = __self.getLastHeight();
        __proxyLayer.setWidth(parseInt(__self.getWidth()));
        __proxyLayer.setHeight(parseInt(__self.getHeight()));
        __proxyLayer.setLeft(parseInt(__self.getLeft()));//设置对话框代理层的起始X坐标
        __proxyLayer.setTop(parseInt(__self.getTop()));//设置对话框代理层的起始Y坐标
        __self.hidden();//隐藏对话框
        __proxyLayer.show();//显示代理层
        EJS.Action.animate(__proxyLayer, __targetX, __targetY, __dialogWidth, __dialogHeight, SPEED, function(){
            __proxyLayer.hidden();
            __self.setWidth(__dialogWidth);
            __self.setHeight(__dialogHeight);
            __self.setLeft(__targetX);
            __self.setTop(__targetY);
            __self.superClass.show.call(__self);
            __self.setCurrentState("renew");
            changeDialogControlBtn();
        });
    }








    
    {
        this.setCtType("dialogBox");
        this.setCid(EJS.Util.Format.trim(EJS.Util.getTrueValue(_config.cid, EJS.Util.GUID.get)));//唯一标识
        this.setId(EJS.Util.Format.trim(EJS.Util.getTrueValue(_config.id, this.getCtType() + EJS.editorConstant.comNum)));
        this.setName(!!_config.name ? EJS.Util.Format.trim(_config.name) : this.getId());
        this.setLeft(EJS.Util.math.getTrueNum(_config.left));
        this.setTop(EJS.Util.math.getTrueNum(_config.top));
        this.setInitWidth(EJS.Util.math.getTrueNum(_config.width));
        this.setWidth(this.getInitWidth());
        this.setInitHeight(EJS.Util.math.getTrueNum(_config.height));
        this.setHeight(this.getInitHeight());
        this.setClassName(EJS.Util.getTrueValue(_config.className, "ejs-dialog"));
        this.setMinWidth(EJS.Util.math.getTrueNum(_config.minWidth));
        this.setMinHeight(EJS.Util.math.getTrueNum(_config.minHeight));
        this.setMaxWidth(EJS.Util.math.getTrueNum(_config.maxWidth));
        this.setMaxHeight(EJS.Util.math.getTrueNum(_config.maxHeight));
        this.setResize(EJS.Util.getTrueValue(_config.isResize, false));
        this.setDialogType(EJS.Util.Format.uppercase(EJS.Util.getTrueValue(_config.dialogType, "ALERT")));
        this.setCurrentState("none");
        this.setTriggerState(EJS.Util.getTrueValue(_config.currentState, "none"));
        this.setMobile(EJS.Util.getTrueValue(_config.isMobile, false));
        this.setBtnAlign((EJS.Util.Format.lowercase(_config.btnAlign) == "left") ? "left" : ((EJS.Util.Format.lowercase(_config.btnAlign) == "right") ? "right" : "center" ));
        this.setModal(EJS.Util.getTrueValue(_config.isModal, false));
        this.setHeadingColumnBtnNum(EJS.Util.math.getTrueNum(_config.headingColumnBtnNum));
        this.setTitle(EJS.Util.getTrueValue(_config.title, "系统提示"));
        this.setUrl(EJS.Util.getTrueValue(_config.url, ""));
        this.setPopupStyle(EJS.Util.Format.uppercase(EJS.Util.getTrueValue(_config.popupStyle, "SCREENCENTER")));
        this.setShutStyle(EJS.Util.Format.uppercase(EJS.Util.getTrueValue(_config.shutStyle, "SCREENCENTER")));
        this.setIsAnimate(EJS.Util.getTrueValue(_config.isAnimate, false));
        this.onReady = _config.onReady || function(){};
        
        this.setDom(EJS.Dom.DomHelper.create(
            {tagName : "div", attribute : {clazz : this.getClassName(), id : this.getCid()}, style : {left : this.getLeft(), top : this.getTop(), width : this.getWidth()}, children : [
                {tagName : "div", attribute : { clazz : (__self.isMobile() ? "ejs-dialog-head" : "ejs-dialog-head-cnmove")}, children : [
                    {tagName : "span", attribute : {clazz : "ejs-dialog-head-left"}},
                    {tagName : "span", attribute : {clazz : "ejs-dialog-head-right"}},
                    {tagName : "span", attribute : {clazz : "ejs-dialog-btn-close"}},
                    {tagName : "span", attribute : {clazz : "ejs-dialog-btn-maximize"}, style : {display : this.getHeadingColumnBtnNum() == 3 ? "block" : "none"}},
                    {tagName : "span", attribute : {clazz : "ejs-dialog-btn-minimize"}, style : {display : this.getHeadingColumnBtnNum() >= 2 ? "block" : "none"}},
                    {tagName : "span", attribute : {clazz : "ejs-dialog-head-center"}, children : [
                        {textNode : this.getTitle()}
                    ]}
                ]},
                {tagName : "div", attribute : {clazz : "ejs-dialog-body"}, style : {height : countBodyHeight() + "px"}, children : [
                    {tagName : "table", attribute : {clazz : "ejs-dialog-body-content", cellPadding : "0", cellSpacing : "0"}, children : [
                        {tagName : "tbody", children : [
                            {tagName : "tr", children : [
                                {tagName : "td"}
                            ]}
                        ]}
                    ]},
                    {tagName : "ul", attribute : {clazz : "ejs-dialog-body-btn-" + __self.getBtnAlign()}, style : {display : "none"}}
                ]},
                {tagName : "div", attribute : {clazz : "ejs-dialog-resize"},href : "#", style : {display : __self.isResize() ? "block" : "none"}}
        ]}));
        __dialogHeadingColumn = this.getDom().childNodes[0];
        __dialogBodyArea = this.getDom().childNodes[1];
        __dialogContentArea = __dialogBodyArea.childNodes[0].childNodes[0].childNodes[0].childNodes[0];
        __dialogBtnArea = this.getDom().childNodes[1].childNodes[1];
        __dialogResizeBtn = this.getDom().childNodes[2];
        __dialogControlBtn1 = this.getDom().childNodes[0].childNodes[4];
        __dialogControlBtn2 = this.getDom().childNodes[0].childNodes[3];
        __dialogControlBtn3 = this.getDom().childNodes[0].childNodes[2];

        if(this.getDialogType() == "IFRAME"){
            __dialogPanel = EJS.Dom.DomHelper.create(
                {
                    tagName : "iframe",
                    attribute : {frameborder : 0, clazz : "ejs-dialog-iframe", src : this.getUrl() == "" ? "" : this.getUrl()}
                    
                }
            );
            
            EJS.Dom.DomHelper.append(__dialogPanel, __dialogContentArea);
        }else{
            __dialogPanel = new EJS.Dom.panel({
                width  : parseInt(this.getWidth()) - 2,
                height : countBodyHeight() ,
                bgColor : "white"
            });
            __dialogPanel.getDom().style.position = "static";//将容器的绝对定位方式去掉
            __dialogPanel.add(new EJS.Dom.text({text:"测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试",width:"90%",height:"100%"}));
            __dialogPanel.paint(__dialogContentArea);
        }
        
        if(this.isMobile()){
            EJS.Event.Handler.add(__dialogHeadingColumn, "mousedown", __drag);
        }
        EJS.Event.Handler.add(__dialogControlBtn1, "mousedown", __self.minimize);
        EJS.Event.Handler.add(__dialogControlBtn2, "mousedown", __self.maximize);
        EJS.Event.Handler.add(__dialogControlBtn3, "mousedown", __self.close);
        if(!EJS.Dom.DomHelper.contains(this.getDom(), document.body)){
            EJS.Dom.DomHelper.append(this.getDom());
        }
        EJS.Dom.DomHelper.append(__proxyLayer.getDom());//将代理层添加到页面中
        if(this.isModal()){
            __modelLayer = new EJS.Dom.proxyLayer({width:1, height:1, className:"ejs-model-layer"});//当对话框为模态窗口时，对话框底部需用一个层挡住
            if(!EJS.Dom.DomHelper.contains(__modelLayer.getDom(), document.body)){
                EJS.Dom.DomHelper.append(__modelLayer.getDom());
            }
        }



    }(_config)
}
EJS.extend(EJS.Dom.dialogBox, EJS.Dom.controlBase);













//拖放程序
var Drag_1 = Factory.create();
Drag_1.prototype = {
  //拖放对象
  initialize: function(drag, options) {
    if(typeof drag == "string"){
        this.Drag = EJS.Dom.$(drag);//拖放对象
        
    }else{
        this.Drag = drag;
    }
    
    this._x = this._y = 0;//记录鼠标相对拖放对象的位置
    this._marginLeft = this._marginTop = 0;//记录margin
    //事件对象(用于绑定移除事件)
    this._fM = BindAsEventListener(this, this.Move);
    this._fS = Bind(this, this.Stop);
    
    this.SetOptions(options);
    
    this.Limit = !!this.options.Limit;
    this.mxLeft = parseInt(this.options.mxLeft);
    this.mxRight = parseInt(this.options.mxRight);
    this.mxTop = parseInt(this.options.mxTop);
    this.mxBottom = parseInt(this.options.mxBottom);
    
    this.LockX = !!this.options.LockX;
    this.LockY = !!this.options.LockY;
    this.Lock = !!this.options.Lock;
    
    this.onStart = this.options.onStart;
    this.onMove = this.options.onMove;
    this.onStop = this.options.onStop;
    
    this._Handle = EJS.Dom.$(this.options.Handle) || this.Drag;
    this._mxContainer = EJS.Dom.$(this.options.mxContainer) || null;
    
    this.Drag.style.position = "absolute";
    //透明
    if(EJS.Client.isIE && !!this.options.Transparent){
        //填充拖放对象
        with(this._Handle.appendChild(document.createElement("div")).style){
            width = height = "100%"; backgroundColor = "#fff"; filter = "alpha(opacity:0)"; fontSize = 0;
        }
    }
    //修正范围
    this.Repair();
    EJS.Event.Handler.add(this._Handle, "mousedown", BindAsEventListener(this, this.Start));
  },
  //设置默认属性
  SetOptions: function(options) {
    this.options = {//默认值
        Handle:            "",//设置触发对象（不设置则使用拖放对象）
        Limit:            false,//是否设置范围限制(为true时下面参数有用,可以是负数)
        mxLeft:            0,//左边限制
        mxRight:        9999,//右边限制
        mxTop:            0,//上边限制
        mxBottom:        9999,//下边限制
        mxContainer:    "",//指定限制在容器内
        LockX:            false,//是否锁定水平方向拖放
        LockY:            false,//是否锁定垂直方向拖放
        Lock:            false,//是否锁定
        Transparent:    false,//是否透明
        onStart:        function(){},//开始移动时执行
        onMove:            function(){},//移动时执行
        onStop:            function(){}//结束移动时执行
    };
    EJS.extend(this.options, options || {}, true);
  },
  //准备拖动
  Start: function(oEvent) {
    EJS.Event.cancelBubble();//取消冒泡事件
    if(EJS.Client.isIE){
        if(oEvent.button == 2) return;
    }else{
        if(oEvent.button == 1) return;
    }
    if(this.Lock){ return; }
    this.Repair();
    //记录鼠标相对拖放对象的位置
    this._x = oEvent.clientX - this.Drag.offsetLeft;
    this._y = oEvent.clientY - this.Drag.offsetTop;
    //记录margin
    this._marginLeft = parseInt(CurrentStyle(this.Drag).marginLeft) || 0;
    this._marginTop = parseInt(CurrentStyle(this.Drag).marginTop) || 0;
    //mousemove时移动 mouseup时停止
    
    EJS.Event.Handler.add(document, "mousemove", this._fM);
    EJS.Event.Handler.add(document, "mouseup", this._fS);
    if(EJS.Client.isIE){
        //焦点丢失
        EJS.Event.Handler.add(this._Handle, "losecapture", this._fS);
        //设置鼠标捕获
        this._Handle.setCapture();
    }else{
        //焦点丢失
        EJS.Event.Handler.add(window, "blur", this._fS);
        //阻止默认动作
        oEvent.preventDefault();
    };



    //附加程序
    this.onStart();
  },
  //修正范围
  Repair: function() {
    if(this.Limit){
        //修正错误范围参数
        this.mxRight = Math.max(this.mxRight, this.mxLeft + this.Drag.offsetWidth);
        this.mxBottom = Math.max(this.mxBottom, this.mxTop + this.Drag.offsetHeight);
        //如果有容器必须设置position为relative或absolute来相对或绝对定位，并在获取offset之前设置
        //!this._mxContainer || CurrentStyle(this._mxContainer).position == "relative" || CurrentStyle(this._mxContainer).position == "absolute" || (this._mxContainer.style.position = "relative");
        
    }
  },
  //拖动
  Move: function(oEvent) {
    //判断是否锁定
    if(this.Lock){ this.Stop(); return; };
    //清除选择
    window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
    //设置移动参数
    var iLeft = oEvent.clientX - this._x, iTop = oEvent.clientY - this._y;
    //设置范围限制
    if(this.Limit){
        //设置范围参数
        var mxLeft = this.mxLeft, mxRight = this.mxRight, mxTop = this.mxTop, mxBottom = this.mxBottom;
        
        //如果设置了容器，再修正范围参数
        if(!!this._mxContainer){
            mxLeft = Math.max(mxLeft, 0);
            mxTop = Math.max(mxTop, 0);
            mxRight = Math.min(mxRight, this._mxContainer.clientWidth);
            mxBottom = Math.min(mxBottom, this._mxContainer.clientHeight);
        };
        
        //修正移动参数
        iLeft = Math.max(Math.min(iLeft, mxRight - this.Drag.offsetWidth), mxLeft);
        iTop = Math.max(Math.min(iTop, mxBottom - this.Drag.offsetHeight), mxTop);

    }
    //设置位置，并修正margin
    if(!this.LockX){ this.Drag.style.left = iLeft - this._marginLeft + "px"; }
    if(!this.LockY){ this.Drag.style.top = iTop - this._marginTop + "px"; }
    //附加程序
    this.onMove();

  },
  //停止拖动
  Stop: function() {
    //移除事件
    EJS.Event.Handler.remove(document, "mousemove", this._fM);
    EJS.Event.Handler.remove(document, "mouseup", this._fS);
    if(EJS.Client.isIE){
        EJS.Event.Handler.remove(this._Handle, "losecapture", this._fS);
        this._Handle.releaseCapture();
    }else{
        EJS.Event.Handler.remove(window, "blur", this._fS);
    };
    //附加程序
    this.onStop();
  }
};

EJS.Dom.tableTreeNode = Factory.create();
EJS.Dom.tableTreeNode.prototype = {
    initialize : function(_node, _changeActiveFun, _clickParaValueNode){
        this.__hasChild = false;//没有子节点
        this.__changeActiveFun = _changeActiveFun;
        this.paraName = _node.para.name;
        this.paraValue = _node.para.value;
        this.__readOnly = true;
        if(_node.para.fun){
            this.callBack = _node.para.fun;
            this.__readOnly = false;
        }
        if(_node.nodes && _node.nodes.length > 0){//有子节点
            
            this.__isExpand = EJS.Util.getTrueValue(_node.isExpand, true);
            this.__childs = [];
            this.__hasChild = true;//有子节点
            this.setDom(EJS.Dom.DomHelper.create(
                {
                    tagName : "div",
                    attribute : {clazz : "table_tree_group"},
                    children : [
                        {
                            tagName : "table",
                            attribute : {clazz : "table_tree_group_head"},
                            children : [
                                {
                                    tagName : "tbody",
                                    children : [
                                        {tagName : "tr", children : [
                                            {tagName : "td", attribute : {clazz : this.__isExpand ? "contract" : "expand"}},
                                            {tagName : "td", attribute : {clazz : "item_name"}, children : [{textNode : _node.para.name}]},
                                            {tagName : "td", attribute : {clazz : "item_value"}, children : [{textNode : _node.para.value}]}
                                        ]}
                                    ]
                                }
                            ]
                        },
                        {
                            tagName : "div",
                            attribute : {clazz : "table_tree_group_body"},
                            style : {display : this.__isExpand ? "block" : "none"}
                        }
                    ]
                }
            ));
            
            this.__groupBody = this.getDom().childNodes[1];
            EJS.Event.Handler.add(this.getDom(), "click", Bind(this, function(){if(this.__isExpand) _changeActiveFun(this.__groupBody);}));//将事件绑定到整个节点组上，且只有当组为展开状态时，方法才执行
            //                                  table          tbody        tr             td
            this.__expandBtn = this.getDom().childNodes[0].childNodes[0].childNodes[0].childNodes[0];
            EJS.Event.Handler.add(this.__expandBtn, "click", BindAsEventListener(this, this.click));//将事件绑定到展开图标上
            this.__valueNode = this.getDom().childNodes[0].childNodes[0].childNodes[0].childNodes[2];
            for(var i = 0; i < _node.nodes.length; i++){
                var cNode = new EJS.Dom.tableTreeNode(_node.nodes[i], _changeActiveFun, _clickParaValueNode);//创建子节点
                //cNode.__parentDom = this.getDom();//当前节点所属的父节点
                this.__childs.push(cNode);//将子节点放入数组中缓存
                
                EJS.Dom.DomHelper.append(cNode.getDom(), this.__groupBody);//将子节点DOM的挂到你父节点上
            }
        }else{//叶子节点
            
            this.setDom(EJS.Dom.DomHelper.create(
                {
                    tagName : "table",
                    attribute : {clazz : "table_tree_row"},
                    children : [
                        {
                            tagName : "tbody",
                            children : [
                                {tagName : "tr", children : [
                                    {tagName : "td", attribute : {clazz : "space"}},
                                    {tagName : "td", attribute : {clazz : "item_name"}, children : [{textNode : _node.para.name}]},
                                    {tagName : "td", attribute : {clazz : "item_value"}}
                                ]}
                            ]
                        }
                    ]
                }
            ));
            this.__valueNode = this.getDom().childNodes[0].childNodes[0].childNodes[2];
        }

        
        if(!this.__readOnly){
            _node.type = _node.type || "text";
            if(_node.type == "color"){
                var __tag = EJS.Dom.DomHelper.create({
                    tagName : "input",
                    attribute : {clazz : "color_input", id : "colorInput"}
                });
                if(_node.para.value){
                    __tag.value = _node.para.value;
                }else{
                     __tag.value = "000000";
                }
                EJS.Dom.DomHelper.append(__tag, this.__valueNode);
                //this.__valueNode.innerHTML = "<input type='text' name='colorInput' />"
                //alert(this.__valueNode.outerHTML);
                EJS.Event.Handler.add(__tag, "propertychange", Bind({__self : this, __input : __tag}, function(){this.__self.callBack(this.__input.value);}));

                $(__tag).ColorPicker({
                    onSubmit: function(hsb, hex, rgb, el) {
                        $(el).val(hex);
                        $(el).ColorPickerHide();
                    },
                    onBeforeShow: function () {
                        $(this).ColorPickerSetColor(this.value);
                    }
                })
                .bind('keyup', function(){
                    $(this).ColorPickerSetColor(this.value);
                });

            }
            if(_node.type == "select"){
                var __tag = EJS.Dom.DomHelper.create({
                    tagName : "select",
                    attribute : {clazz : "select"}
                });
                
                for(var i = 0; i < _node.items.length; i++){
                    var __item = _node.items[i];
                    var __opt = new Option(__item.name, __item.value, false, _node.para.value == __item.value ? true : false);
                    __tag.add(__opt);
                    
                }
                EJS.Dom.DomHelper.append(__tag, this.__valueNode);
                EJS.Event.Handler.add(__tag, "change", Bind(this, function(){this.callBack(__tag.options[__tag.selectedIndex].value);}));
            }else if(_node.type == "radio"){
                var uid = EJS.Util.GUID.get();
                for(var i = 0; i < _node.items.length; i++){
                    var __item = _node.items[i];
                    var __tagStr = '<div class="radiodiv"><input name="'+uid+'" type="radio" class="radio" value="'+__item.value+'"><label>'+__item.name+'</label></div>';
                    this.__valueNode.innerHTML += __tagStr;
                }
                var inputs = this.__valueNode.getElementsByTagName("input");
                for(var j = 0; j < inputs.length; j++){
                    var inp = inputs[j];
                    
                    if(_node.para.value == inp.value){
                        inp.defaultChecked = true
                        inp.checked = true;
                    }
                    //EJS.Event.Handler.add(inp, "click", Bind(this, function(){this.callBack(inp.value);}));
                    EJS.Event.Handler.add(inp, "click", Bind({__self : this, __input : inp}, function(){this.__self.callBack(this.__input.value);}));
                    
                }
                //EJS.Dom.DomHelper.append(__tag, this.__valueNode);

            }else if(_node.type == "checkbox"){
                var __v = (typeof _node.para.value == 'function') ? _node.para.value() : _node.para.value;
                var __a = __v ? __v.split(",") : [];
                var uid = EJS.Util.GUID.get();
                for(var i = 0; i < _node.items.length; i++){
                    var __item = _node.items[i];
                    //var __values = _node.para.value.split(",");
                    var __tagStr = '<div class="checkboxdiv"><input name="'+uid+'" type="checkbox" class="checkbox" value="'+__item.value+'"><label>'+__item.name+'</label></div>';
                    this.__valueNode.innerHTML += __tagStr;
                }
                var inputs = this.__valueNode.getElementsByTagName("input");
                for(var j = 0; j < inputs.length; j++){
                    var inp = inputs[j];
                    if(__a.length > 0){
                        for(var k = 0; k < __a.length; k++){
                            if(__a[k] == inp.value){
                                inp.defaultChecked = true
                                inp.checked = true;
                            }
                        }
                    }
                    EJS.Event.Handler.add(inp, "click", Bind({__self : this, __input : inp}, function(){
                        var _value = _node.para.value();
                        if(this.__input.checked){
                            if(!_value){
                                _value = this.__input.value;
                            }else{
                                _value += "," +  this.__input.value;
                            }
                        }else{
                            var _va = _value.split(",");
                            var __index = -1;
                            for(var vai = 0; vai < _va.length; vai++){
                                if(_va[vai] == this.__input.value){
                                    __index = vai;
                                    break;
                                }
                            }
                            if(__index != -1){
                                if(_va.length == 1){
                                    _value = "";
                                }else{
                                    _va = _va.splice(__index, 1);
                                    _value = _va.join(",");
                                }
                            }
                            
                        }

                        this.__self.callBack(_value);
                    }));
                    
                }
            
            
            }else if(_node.type == "dialog"){
                var __tag = EJS.Dom.DomHelper.create({
                    tagName : "input",
                    attribute : {type : "button", value : _node.para.value == "" ? "增加" : "修改"}
                });
                
                EJS.Dom.DomHelper.append(__tag, this.__valueNode);
                EJS.Event.Handler.add(__tag, "click", Bind(this, function(){this.callBack(__tag);}));
            }else if(_node.type == "text"){
                this.__valueNode.innerText = _node.para.value;
                EJS.Event.Handler.add(this.__valueNode, "click", Bind(this, function(){_clickParaValueNode(this);}));//将事件绑定到整个节点组上，且只有当组为展开状态时，方法才执行
            }
        }

        
    },
    //收拢
    contract : function(){
        this.__groupBody.style.display = "none";//隐藏子节点
        EJS.Dom.CSSHelper.modifyName(this.__expandBtn, "expand");
        this.__isExpand = false;
        
    },
    //展开
    expand : function(){
        
        this.__groupBody.style.display = "block";//隐藏子节点
        EJS.Dom.CSSHelper.modifyName(this.__expandBtn, "contract");
        this.__isExpand = true;
        //this.__changeChildNodesAreaBG();
        this.__changeActiveFun(this.__groupBody);
    },
    click : function(){
        EJS.Event.cancelBubble();
        if(this.__isExpand)
            this.contract();
        else
            this.expand();
    },
    setValue : function(_value){
        this.paraValue = _value;
        this.__valueNode.innerHTML = _value;
        //this.__valueNode.replaceData(0, this.__valueNode.length, _value);
        if(!this.__readOnly) this.callBack(_value);
        //这里调用控件的改变属性方法@@@@@@
    },
    clearContent : function(){
        this.__valueNode.innerHTML = "";
    },
    destroy : function(){
        function removeEvent(_node){
            if(_node.__childs){//有子节点
                
                for(var i = _node.__childs.length - 1; i >= 0; i--){
                    
                    removeEvent(_node.__childs[i]);
                    EJS.Event.Handler.removeByEventType(_node.__expandBtn, "click");
                    EJS.Event.Handler.removeByEventType(_node.__valueNode, "click");
                    EJS.Event.Handler.removeByEventType(_node.getDom(), "click");
                    EJS.Dom.DomHelper.remove(_node.getDom(), _node.getDom().parentNode);
                }
            }else{//叶子节点
                EJS.Event.Handler.removeByEventType(_node.__valueNode, "click");
                EJS.Dom.DomHelper.remove(_node.getDom(), _node.getDom().parentNode);
                _node = null;
            }
        }
        removeEvent(this);
    }

}
EJS.extend(EJS.Dom.tableTreeNode, EJS.Dom.controlBase);

/*
[
    {para:{name : "ID", value : "vvv", nodes : []}},
    {para:{name : "ID", value : "vvv"}}
]
*/
EJS.Dom.tableTree = Factory.create();
EJS.Dom.tableTree.prototype = {
    initialize : function(_config){
        this.setCtType("tableTree");
        this.setCid(EJS.Util.Format.trim(EJS.Util.getTrueValue(_config.cid, EJS.Util.GUID.get)));//唯一标识
        this.setId(EJS.Util.Format.trim(EJS.Util.getTrueValue(_config.id, this.getCtType() + EJS.editorConstant.comNum)));
        this.setName(!!_config.name ? EJS.Util.Format.trim(_config.name) : this.getId());
        this.setWidth(EJS.Util.math.getTrueNum(_config.width));
        this.setHeight(EJS.Util.math.getTrueNum(_config.height));
        this.setClassName(EJS.Util.getTrueValue(_config.className, "table_tree"));
        this.__tableTreeTitle = EJS.Util.getTrueValue(_config.tableTreeTitle, "属性列表");
        this.__inputCon = null;//文本控件
        this.__comboBoxCon = null;//下拉框控件
        this.setDom(EJS.Dom.DomHelper.create(
            {
                tagName : "div",
                attribute : {clazz : this.getClassName(), id : this.getCid(), name : this.getName()},
                children : [
                    {
                        tagName : "div",
                        attribute : {clazz : "table_tree_head"},
                        children : [
                            {textNode : this.__tableTreeTitle}
                        ]
                    }
                ]
            }
        ));
        this.load(_config.nodes);
/*
        if(_config.nodes && _config.nodes.length > 0){
            this.itemNodes = [];
            for(var i = 0; i < _config.nodes.length; i++){
                var ctNode = new EJS.Dom.tableTreeNode(_config.nodes[i], Bind(this, this.__changeChildNodesAreaBG), Bind(this, this.__clickParaValueNode));
                this.itemNodes.push(ctNode);//创建节点
                EJS.Dom.DomHelper.append(this.itemNodes[i].getDom(), this.getDom());//将节点的挂到DOM上
            }
        }
*/
    },
    //渲染控件
    paint : function(_id){
        //_id = _id == null ? this.getId() : _id;
        
        if(!_id) return false;
        var __paintTag = EJS.Dom.$(_id);
        if(!__paintTag) return false;
        
        EJS.Dom.DomHelper.append(this.getDom(), __paintTag);
    },
    load : function(_nodeList){
        this.removeAll();
        this.itemNodes = [];
        
        for(var i = 0; i < _nodeList.length; i++){
            var ctNode = new EJS.Dom.tableTreeNode(_nodeList[i], Bind(this, this.__changeChildNodesAreaBG), Bind(this, this.__clickParaValueNode));
            this.itemNodes.push(ctNode);//创建节点
            EJS.Dom.DomHelper.append(this.itemNodes[i].getDom(), this.getDom());//将节点的挂到DOM上
        }
    },
    //删除属性列表中的所有内容
    removeAll : function(){
        if(!this.itemNodes || this.itemNodes.length == 0) return;
        for(var i = this.itemNodes.length - 1; i >= 0; i--){
            this.itemNodes[i].destroy();
            this.itemNodes[i] = null;
            this.itemNodes.splice(i, 1);
        }
        this.itemNodes = null;
        
        /*
        if(!this.itemNodes || this.itemNodes.length == 0) return;
        for(var i = this.itemNodes.length - 1; i >= 0; i--){
            EJS.Dom.DomHelper.remove(this.itemNodes[i].getDom(), this.itemNodes[i].getDom().parentNode);
            this.itemNodes.splice(i, 1);
        }
        */
    },
    //修改属性组左边区背景
    __changeChildNodesAreaBG : function(_cActiveArea){
        //EJS.Event.cancelBubble();//选不中列表中的radio
        if(this.__focusArea){
            
            EJS.Dom.CSSHelper.modifyName(this.__focusArea, "table_tree_group_body");
            //alert(this.__focusArea.outerHTML);
        }
        EJS.Dom.CSSHelper.modifyName(_cActiveArea, "table_tree_group_body_active");
        this.__focusArea = _cActiveArea;
    },
    //单击属性值区域时
    __clickParaValueNode : function(_node){
        
        
        if(this.__inputCon == null){
            this.__inputCon = new EJS.Dom.singleText({width : 100, height : 17, currentState : "running"});
            this.__inputCon.getDom().style.position = "static";
            this.__inputCon.getDom().style.width="100%";
            //this.__inputCon.getDom().style.height="100%";
            this.__inputCon.getDom().style.border="0";
            

        }
        
        EJS.Event.Handler.removeByEventType(this.__inputCon.getDom(), "blur");//注销输入框上的所有blur事件
        EJS.Event.Handler.add(this.__inputCon.getDom(), "blur", Bind(this.__inputCon, 
            function(){
                var value = this.getValue();
                
                _node.setValue(value);
                this.setValue("");//清空输入框中的值
                
            }
        ));//绑定焦点失去事件，当文本输入框失去焦点时将输入框内的值赋给tabletree节点
        
        this.__inputCon.setValue(_node.paraValue);
        //_node.setValue("");
        _node.clearContent();
        window.setTimeout(Bind(this, function(){
            this.__inputCon.getDom().focus();
            this.__inputCon.getDom().select();
        }),0);
        EJS.Dom.DomHelper.append(this.__inputCon.getDom(), _node.__valueNode);
    },
    destroy : function(){
        
    }


}
EJS.extend(EJS.Dom.tableTree, EJS.Dom.controlBase);


EJS.Dom.image = Factory.create();
EJS.Dom.image.prototype = {
    initialize : function(_config){
        this.setCtType("image");
        this.setCid(EJS.Util.Format.trim(EJS.Util.getTrueValue(_config.cid, EJS.Util.GUID.get)));//唯一标识
        this.setId(EJS.Util.Format.trim(EJS.Util.getTrueValue(_config.id, this.getCtType() + EJS.editorConstant.comNum)));
        this.setName(!!_config.name ? EJS.Util.Format.trim(_config.name) : this.getId());
        this.setWidth(EJS.Util.math.getTrueNum(_config.width));
        this.setHeight(EJS.Util.math.getTrueNum(_config.height));
        this.setLeft(EJS.Util.math.getTrueNum(_config.left));
        this.setTop(EJS.Util.math.getTrueNum(_config.top));
        this.setClassName(EJS.Util.getTrueValue(_config.className, "ejs-image"));
        this.setSrc(_config.src ? _config.src : "");
        this.setDom(EJS.Dom.DomHelper.create(
            {
                tagName : "div",
                attribute : {clazz : this.getClassName(), id : this.getCid(), name : this.getName()},
                style : {width : this.getWidth(), height : this.getHeight(), left : this.getLeft(), top : this.getTop()},
                children : [
                    {
                        tagName : "img",
                        attribute : {src : this.getSrc()}
                    }
                ]
            }
        ));
    },
    setSrc : function(_src){
        this.src = _src;
        if(this.getDom()){
            this.getDom().childNodes[0].src = _src;
        }
    },
    getSrc : function(){
        return this.src ? this.src : "";
    },



    getAttributesOnly : function(_isEqual){
        return {
            cid     : !!_isEqual ? this.getCid() : EJS.Util.GUID.get(),
            id      : this.getId(),
            ctType  : "image",
            className : this.getClassName(),
            name    : this.getName(),
            left    : parseInt(this.getLeft()),
            top     : parseInt(this.getTop()),
            width   : parseInt(this.getWidth()),
            height  : parseInt(this.getHeight()),
            src     : this.getSrc()
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
                {para : {name : "src", value : this.getSrc(), fun : Bind(this, this.setSrc)}},
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
EJS.extend(EJS.Dom.image, EJS.Dom.controlBase);




EJS.Dom.chart = Factory.create();
EJS.Dom.chart.prototype = {
    initialize : function(_config){
        this.setCtType("chart");
        this.setCid(EJS.Util.Format.trim(EJS.Util.getTrueValue(_config.cid, EJS.Util.GUID.get)));//唯一标识
        this.setId(EJS.Util.Format.trim(EJS.Util.getTrueValue(_config.id, this.getCtType() + EJS.editorConstant.comNum)));
        this.setName(!!_config.name ? EJS.Util.Format.trim(_config.name) : this.getId());
        this.setWidth(EJS.Util.math.getTrueNum(_config.width));
        this.setHeight(EJS.Util.math.getTrueNum(_config.height));
        this.setLeft(EJS.Util.math.getTrueNum(_config.left));
        this.setTop(EJS.Util.math.getTrueNum(_config.top));
        this.setClassName(EJS.Util.getTrueValue(_config.className, "ejs-chart"));
        this.setSrc(_config.src ? _config.src : "images/chart.jpg");
        this.setDom(EJS.Dom.DomHelper.create(
            {
                tagName : "div",
                attribute : {clazz : this.getClassName(), id : this.getCid(), name : this.getName()},
                style : {width : this.getWidth(), height : this.getHeight(), left : this.getLeft(), top : this.getTop()},
                children : [
                    {
                        tagName : "img",
                        attribute : {src : this.getSrc()}
                    }
                ]
            }
        ));
    },

    getAttributesOnly : function(_isEqual){
        return {
            cid     : !!_isEqual ? this.getCid() : EJS.Util.GUID.get(),
            id      : this.getId(),
            ctType  : "image",
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

EJS.extend(EJS.Dom.chart, EJS.Dom.image);







EJS.Dom.resize = Factory.create();
EJS.Dom.resize.prototype = {
    initialize : function(options){
        this.__id = EJS.Util.Format.trim(EJS.Util.getTrueValue(options.id, EJS.Util.GUID.get));
        this.__zIndex =  EJS.Util.math.getTrueNum(options.zIndex, 0);

        this.__styleWidth = this.__styleHeight = this.__styleLeft = this.__styleTop = 0;//样式参数
        this.__sideRight = this.__sideDown = this.__sideLeft = this.__sideUp = 0;//坐标参数
        this.__fixLeft = this.__fixTop = 0;//定位参数
        this.__scaleLeft = this.__scaleTop = 0;//定位坐标
        
        this.__mxSet = function(){};//范围设置程序
        this.__mxRightWidth = this.__mxDownHeight = this.__mxUpHeight = this.__mxLeftWidth = 0;//范围参数
        this.__mxScaleWidth = this.__mxScaleHeight = 0;//比例范围参数
        
        this.__fun = function(){};//缩放执行程序
        
        //事件对象(用于绑定移除事件)
        this.__fR = BindAsEventListener(this, this.Resize);
        this.__fS = Bind(this, this.Stop);
        this.SetOptions(options);
        this.__styleWidth = this.options.width;
        this.__styleHeight = this.options.height;
        this.__styleLeft = this.options.left;
        this.__styleTop = this.options.top;
        //范围限制
        this.Max = !!this.options.Max;
        this.__mxContainer = EJS.Dom.$(this.options.mxContainer) || null;
        this.mxLeft = Math.round(this.options.mxLeft);
        this.mxRight = Math.round(this.options.mxRight);
        this.mxTop = Math.round(this.options.mxTop);
        this.mxBottom = Math.round(this.options.mxBottom);
        //宽高限制
        this.Min = !!this.options.Min;
        this.minWidth = Math.round(this.options.minWidth);
        this.minHeight = Math.round(this.options.minHeight);
        //按比例缩放
        this.Scale = !!this.options.Scale;
        this.Ratio = Math.max(this.options.Ratio, 0);
        this.onStart = this.options.onStart;
        this.onResize = this.options.onResize;
        this.onStop = this.options.onStop;
        
        //!this.__mxContainer || CurrentStyle(this.__mxContainer).position == "relative" || (this.__mxContainer.style.position = "relative");



        this.__dom = EJS.Dom.DomHelper.create(
            {tagName : "div", attribute : {clazz : "control_editor", id : this.__id}, style : {width : this.__styleWidth, height : this.__styleHeight, left : this.__styleLeft, top : this.__styleTop}, children : [
                {tagName : "div", attribute : {clazz : "left_up"}},
                {tagName : "div", attribute : {clazz : "up"}},
                {tagName : "div", attribute : {clazz : "right_up"}},
                {tagName : "div", attribute : {clazz : "right"}},
                {tagName : "div", attribute : {clazz : "right_dowm"}},
                {tagName : "div", attribute : {clazz : "down"}},
                {tagName : "div", attribute : {clazz : "left_down"}},
                {tagName : "div", attribute : {clazz : "left"}},
                {tagName : "div", attribute : {clazz : "move"}}
            ]}
        );
		this.__moveNode = this.__dom.childNodes[8];
		
        EJS.Event.Handler.add(this.__dom.childNodes[0], "mousedown", BindAsEventListener(this, this.Start, this.LeftUp));
        EJS.Event.Handler.add(this.__dom.childNodes[1], "mousedown", BindAsEventListener(this, this.Start, this.Up));
        EJS.Event.Handler.add(this.__dom.childNodes[2], "mousedown", BindAsEventListener(this, this.Start, this.RightUp));
        EJS.Event.Handler.add(this.__dom.childNodes[3], "mousedown", BindAsEventListener(this, this.Start, this.Right));
        EJS.Event.Handler.add(this.__dom.childNodes[4], "mousedown", BindAsEventListener(this, this.Start, this.RightDown));
        EJS.Event.Handler.add(this.__dom.childNodes[5], "mousedown", BindAsEventListener(this, this.Start, this.Down));
        EJS.Event.Handler.add(this.__dom.childNodes[6], "mousedown", BindAsEventListener(this, this.Start, this.LeftDown));
        EJS.Event.Handler.add(this.__dom.childNodes[7], "mousedown", BindAsEventListener(this, this.Start, this.Left));
		if(this.options.hasMove){
			this.__moveNode.style.display = "block";
			//EJS.Event.Handler.add(this.__moveNode, "mousedown", BindAsEventListener(this, this.Start, this.Left));
		}


        this.__dom.style.position = "absolute";
        //获取边框宽度
        var _style = CurrentStyle(this.__dom);
        this.__borderX = (parseInt(_style.borderLeftWidth) || 0) + (parseInt(_style.borderRightWidth) || 0);
        this.__borderY = (parseInt(_style.borderTopWidth) || 0) + (parseInt(_style.borderBottomWidth) || 0);

        if(options.parentDom){
            EJS.Dom.DomHelper.append(this.__dom, options.parentDom);
        }else{
            EJS.Dom.DomHelper.append(this.__dom);
        }
    },
    setWidth : function(_width){
        
        this.__styleWidth = _width;
        this.__dom.style.width = (_width - 2) + "px";//减掉左右边框两像素
    },
    getWidth : function(){
        return this.__styleWidth;
    },
    setHeight : function(_height){
        this.__styleHeight = _height;
        this.__dom.style.height = (_height - 2) + "px";//减掉上下边框两像素
    },
    getHeight : function(){
        return this.__styleHeight;
    },
    setLeft : function(_left){
        this.__styleLeft = _left;
        this.__dom.style.left = _left + "px";
    },
    getLeft : function(){
        return this.__styleLeft;
    },
    setTop : function(_top){
        this.__styleTop = _top;
        this.__dom.style.top = _top + "px";
    },
    getTop : function(){
        return this.__styleTop;
    },
      //设置默认属性
    SetOptions: function(options) {
        this.options = {//默认值
            width :     0,
            height :    0,
            left :      0,
            top :       0,
            Max:        false,//是否设置范围限制(为true时下面mx参数有用)
            mxContainer :"",//指定限制在容器内
            mxLeft :        0,//左边限制
            mxRight :    9999,//右边限制
            mxTop :        0,//上边限制
            mxBottom :    9999,//下边限制
            Min :        false,//是否最小宽高限制(为true时下面min参数有用)
            minWidth :    50,//最小宽度
            minHeight :    20,//最小高度
			hasMove :		false,
            Scale :        false,//是否按比例缩放
            Ratio :        0,//缩放比例(宽/高)
            onResize :    function(){},//缩放时执行
            onStop : function(){}
        };
        EJS.extend(this.options, options || {}, true);
    },
    //设置resize上的九个块
    setAnchor : function(_config){
        
    },

      //准备缩放
    Start: function(e, fun) {
        if(EJS.Client.isIE){
            if(e.button == 2) return false;
        }else{
            if(e.button == 1) return false;
        }

        //防止冒泡(跟拖放配合时设置)
        e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = true);
        //设置执行程序
        this.__fun = fun;
        //样式参数值
        this.__styleWidth = this.__dom.clientWidth;
        this.__styleHeight = this.__dom.clientHeight;
        this.__styleLeft = this.__dom.offsetLeft;
        this.__styleTop = this.__dom.offsetTop;
        //四条边定位坐标
        this.__sideLeft = e.clientX - this.__styleWidth;
        
        this.__sideRight = e.clientX + this.__styleWidth;
        this.__sideUp = e.clientY - this.__styleHeight;
        this.__sideDown = e.clientY + this.__styleHeight;
        //top和left定位参数
        this.__fixLeft = this.__styleLeft + this.__styleWidth;
        this.__fixTop = this.__styleTop + this.__styleHeight;
        //缩放比例
        if(this.Scale){
            //设置比例
            this.Ratio = Math.max(this.Ratio, 0) || this.__styleWidth / this.__styleHeight;
            //left和top的定位坐标
            this.__scaleLeft = this.__styleLeft + this.__styleWidth / 2;
            this.__scaleTop = this.__styleTop + this.__styleHeight / 2;
        };
        //范围限制
        if(this.Max){
            //设置范围参数
            var mxLeft = this.mxLeft, mxRight = this.mxRight, mxTop = this.mxTop, mxBottom = this.mxBottom;
            //如果设置了容器，再修正范围参数
            if(!!this.__mxContainer){
                mxLeft = Math.max(mxLeft, 0);
                mxTop = Math.max(mxTop, 0);
                mxRight = Math.min(mxRight, this.__mxContainer.clientWidth);
                mxBottom = Math.min(mxBottom, this.__mxContainer.clientHeight);
            };
            //根据最小值再修正
            mxRight = Math.max(mxRight, mxLeft + (this.Min ? this.minWidth : 0) + this.__borderX);
            mxBottom = Math.max(mxBottom, mxTop + (this.Min ? this.minHeight : 0) + this.__borderY);
            //由于转向时要重新设置所以写成function形式
            this.__mxSet = function(){
                this.__mxRightWidth = mxRight - this.__styleLeft - this.__borderX;
                this.__mxDownHeight = mxBottom - this.__styleTop - this.__borderY;
                this.__mxUpHeight = Math.max(this.__fixTop - mxTop, this.Min ? this.minHeight : 0);
                this.__mxLeftWidth = Math.max(this.__fixLeft - mxLeft, this.Min ? this.minWidth : 0);
            };
            this.__mxSet();
            //有缩放比例下的范围限制
            if(this.Scale){
                this.__mxScaleWidth = Math.min(this.__scaleLeft - mxLeft, mxRight - this.__scaleLeft - this.__borderX) * 2;
                this.__mxScaleHeight = Math.min(this.__scaleTop - mxTop, mxBottom - this.__scaleTop - this.__borderY) * 2;
            };
        };
        //mousemove时缩放 mouseup时停止
        
        EJS.Event.Handler.add(document, "mousemove", this.__fR);
        EJS.Event.Handler.add(document, "mouseup", this.__fS);
        if(EJS.Client.isIE){
            EJS.Event.Handler.add(this.__dom, "losecapture", this.__fS);
            this.__dom.setCapture();
        }else{
            EJS.Event.Handler.add(window, "blur", this.__fS);
            e.preventDefault();
        };

        
        this.parent.getTopContainer().isNotRsizeClick = false;//这个变量可以变通解决拖拽resize的大小时将鼠标放在editor区松开时直接触发editor对应的click事件。
        //output("label.click=====>"+this.parent.getTopContainer().isNotRsizeClick);
        //附加程序
        this.onStart();

    },
    //缩放
    Resize : function(e) {
        
        
        //清除选择
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        //执行缩放程序
        this.__fun(e);
        //设置样式，变量必须大于等于0否则ie出错
        with(this.__dom.style){
            width = this.__styleWidth + "px"; height = this.__styleHeight + "px";
            top = this.__styleTop + "px"; left = this.__styleLeft + "px";
        }
        //附加程序
        this.onResize();

    },
    //缩放程序
    //上
    Up : function(e) {
        this.RepairY(this.__sideDown - e.clientY, this.__mxUpHeight);
        this.RepairTop();
        //this.TurnDown(this.Down);
    },
    //下
    Down : function(e) {
        this.RepairY(e.clientY - this.__sideUp, this.__mxDownHeight);
        //this.TurnUp(this.Up);
        
    },
    //右
    Right : function(e) {
        this.RepairX(e.clientX - this.__sideLeft, this.__mxRightWidth);
        //this.TurnLeft(this.Left);
    },
    //左
    Left : function(e) {
        this.RepairX(this.__sideRight - e.clientX, this.__mxLeftWidth);
        this.RepairLeft();
        //this.TurnRight(this.Right);
    },
    //右下
    RightDown : function(e) {
        this.RepairAngle(
            e.clientX - this.__sideLeft, this.__mxRightWidth,
            e.clientY - this.__sideUp, this.__mxDownHeight
        );
        //this.TurnLeft(this.LeftDown) || this.Scale || this.TurnUp(this.RightUp);
    },
    //右上
    RightUp : function(e) {
        this.RepairAngle(
            e.clientX - this.__sideLeft, this.__mxRightWidth,
            this.__sideDown - e.clientY, this.__mxUpHeight
        );
        this.RepairTop();
        //this.TurnLeft(this.LeftUp) || this.Scale || this.TurnDown(this.RightDown);
    },
    //左下
    LeftDown : function(e) {
        this.RepairAngle(
            this.__sideRight - e.clientX, this.__mxLeftWidth,
            e.clientY - this.__sideUp, this.__mxDownHeight
        );
        this.RepairLeft();
        //this.TurnRight(this.RightDown) || this.Scale || this.TurnUp(this.LeftUp);
    },
    //左上
    LeftUp : function(e) {
        this.RepairAngle(
            this.__sideRight - e.clientX, this.__mxLeftWidth,
            this.__sideDown - e.clientY, this.__mxUpHeight
        );
        this.RepairTop(); this.RepairLeft();
        //this.TurnRight(this.RightUp) || this.Scale || this.TurnDown(this.LeftDown);
    },

    //修正程序
    //水平方向
    RepairX : function(iWidth, mxWidth) {
        iWidth = this.RepairWidth(iWidth, mxWidth);
        if(this.Scale){
            var iHeight = this.RepairScaleHeight(iWidth);
            if(this.Max && iHeight > this.__mxScaleHeight){
                iHeight = this.__mxScaleHeight;
                iWidth = this.RepairScaleWidth(iHeight);
            }else if(this.Min && iHeight < this.minHeight){
                var tWidth = this.RepairScaleWidth(this.minHeight);
                if(tWidth < mxWidth){ iHeight = this.minHeight; iWidth = tWidth; }
            }
            this.__styleHeight = iHeight;
            this.__styleTop = this.__scaleTop - iHeight / 2;
        }
        this.__styleWidth = iWidth;
    },
    //垂直方向
    RepairY : function(iHeight, mxHeight) {
        iHeight = this.RepairHeight(iHeight, mxHeight);
        if(this.Scale){
            var iWidth = this.RepairScaleWidth(iHeight);
            if(this.Max && iWidth > this.__mxScaleWidth){
                iWidth = this.__mxScaleWidth;
                iHeight = this.RepairScaleHeight(iWidth);
            }else if(this.Min && iWidth < this.minWidth){
                var tHeight = this.RepairScaleHeight(this.minWidth);
                if(tHeight < mxHeight){ iWidth = this.minWidth; iHeight = tHeight; }
            }
            this.__styleWidth = iWidth;
            this.__styleLeft = this.__scaleLeft - iWidth / 2;
        }
        this.__styleHeight = iHeight;
    },
    //对角方向
    RepairAngle : function(iWidth, mxWidth, iHeight, mxHeight) {
        iWidth = this.RepairWidth(iWidth, mxWidth);    
        if(this.Scale){
            iHeight = this.RepairScaleHeight(iWidth);
            if(this.Max && iHeight > mxHeight){
                iHeight = mxHeight;
                iWidth = this.RepairScaleWidth(iHeight);
            }else if(this.Min && iHeight < this.minHeight){
                var tWidth = this.RepairScaleWidth(this.minHeight);
                if(tWidth < mxWidth){ iHeight = this.minHeight; iWidth = tWidth; }
            }
        }else{
            iHeight = this.RepairHeight(iHeight, mxHeight);
        }
        this.__styleWidth = iWidth;
        this.__styleHeight = iHeight;
    },
    //top
    RepairTop : function() {
        this.__styleTop = this.__fixTop - this.__styleHeight;
    },
    //left
    RepairLeft : function() {
        this.__styleLeft = this.__fixLeft - this.__styleWidth;
    },
    //height
    RepairHeight : function(iHeight, mxHeight) {
        iHeight = Math.min(this.Max ? mxHeight : iHeight, iHeight);
        iHeight = Math.max(this.Min ? this.minHeight : iHeight, iHeight, 0);
        return iHeight;
    },
    //width
    RepairWidth : function(iWidth, mxWidth) {
        iWidth = Math.min(this.Max ? mxWidth : iWidth, iWidth);
        iWidth = Math.max(this.Min ? this.minWidth : iWidth, iWidth, 0);
        return iWidth;
    },
    //比例高度
    RepairScaleHeight : function(iWidth) {
        return Math.max(Math.round((iWidth + this.__borderX) / this.Ratio - this.__borderY), 0);
    },
    //比例宽度
    RepairScaleWidth : function(iHeight) {
        return Math.max(Math.round((iHeight + this.__borderY) * this.Ratio - this.__borderX), 0);
    },
    //转向程序
    //转右
    TurnRight : function(fun) {
        if(!(this.Min || this.__styleWidth)){
            this.__fun = fun;
            this.__sideLeft = this.__sideRight;
            this.Max && this.__mxSet();
            return true;
        }
    },
    //转左
    TurnLeft : function(fun) {
        if(!(this.Min || this.__styleWidth)){
            this.__fun = fun;
            this.__sideRight = this.__sideLeft;
            this.__fixLeft = this.__styleLeft;
            this.Max && this.__mxSet();
            return true;
        }
    },
    //转上
    TurnUp : function(fun) {
        if(!(this.Min || this.__styleHeight)){
            this.__fun = fun;
            this.__sideDown = this.__sideUp;
            this.__fixTop = this.__styleTop;
            this.Max && this.__mxSet();
            return true;
        }
    },
    //转下
    TurnDown : function(fun) {
        if(!(this.Min || this.__styleHeight)){
            this.__fun = fun;
            this.__sideUp = this.__sideDown;
            this.Max && this.__mxSet();
            return true;
        }
    },
  //停止缩放
    Stop : function() {
        EJS.Event.Handler.remove(document, "mousemove", this.__fR);
        EJS.Event.Handler.remove(document, "mouseup", this.__fS);

        if(EJS.Client.isIE){
            EJS.Event.Handler.remove(this.__dom, "losecapture", this.__fS);
            this.__dom.releaseCapture();
        }else{
            EJS.Event.Handler.remove(window, "blur", this.__fS);
        }
        //附加程序
        this.onStop();
    },
    hidden : function(){
        this.__dom.style.display = "none";
    },
    show : function(){
        this.__dom.style.display = "block";
    },
    isDisplay : function(){
        if(this.__dom.style.display == "none"){
            return false;
        }else{
            return true;
        }
    }
}




EJS.Dom.ControlBarItem = Factory.create();
EJS.Dom.ControlBarItem.prototype = {
	initialize : function(_obj){
		this.__dom = _obj;
		this.__fStart = BindAsEventListener(this, function(_e){
							this.__duplicate.style.display = "block";
							this.__duplicate.style.left = (_e.clientX - 9) + "px";
							this.__duplicate.style.top = (_e.clientY - 9) + "px";
						});
		this.__fStop = BindAsEventListener(this, function(_e){
							//EJS.Event.Handler.remove(this.__duplicate, "losecapture", this.__fStart);
							EJS.Event.Handler.remove(this.__duplicate, "mouseup", this.__fStop);
							EJS.Event.Handler.remove(this.__duplicate, "mousemove", this.__fStart);
							this.__duplicate.style.display = "none";
							this.__duplicate.releaseCapture();
                            var nControl = EJS.Dom.controlFactory(this.__duplicate.id);
                            
							//var formEditorMainLoc = EJS.Dom.getElPos(formEditorMain.__currentActiveContainer.getId());//当前激活状态容器的坐标位置
                            var activeContainerAbsloc = formEditorMain.getActiveContainerAbsolute(formEditorMain.__currentActiveContainer);
							//alert(formEditorMain.__currentActiveContainer.getCtType())
                            //alert(activeContainerAbsloc.x +","+ activeContainerAbsloc.y)
							if(
                                formEditorMain.__currentActiveContainer.getCtType() == "editor"
								|| (_e.clientX > activeContainerAbsloc.x
								&& _e.clientX < activeContainerAbsloc.x + parseInt(formEditorMain.__currentActiveContainer.getWidth())
								&& _e.clientY > activeContainerAbsloc.y
								&& _e.clientY < activeContainerAbsloc.y + parseInt(formEditorMain.__currentActiveContainer.getHeight()))
								
							){
                                //formEditorMain.__currentActiveContainer.getOriginX()
								var x = _e.clientX - activeContainerAbsloc.x;
								var y = _e.clientY - activeContainerAbsloc.y;
                                //alert(x+","+y)
                                /*
								if(x >= parseInt(formEditorMain.__currentActiveContainer.getWidth()) - parseInt(nControl.getWidth())){
									x = parseInt(formEditorMain.__currentActiveContainer.getWidth()) - parseInt(nControl.getWidth()) - 2;
								}
								if(y >= parseInt(formEditorMain.__currentActiveContainer.getHeight()) - parseInt(nControl.getHeight())){
									y = parseInt(formEditorMain.__currentActiveContainer.getHeight()) - parseInt(nControl.getHeight()) - 2;
								}
                                */
                                
								nControl.setLeft(x);
								nControl.setTop(y);
                                //alert(formEditorMain.__currentActiveContainer.getCtType());

								formEditorMain.__currentActiveContainer.add(nControl);

								formEditorMain.__currentActiveContainer.repaint(formEditorMain.__currentActiveContainer.getCid());
                                
                                if(!EJS.editorGlobalVariable.isUndo){
                                    EJS.operateMgr.addOpt(nControl.getCid(), nControl.getParentPanel().getCid(), null, nControl.getAttributesOnly(true));
                                }
                                //alert(formEditorMain.__currentActiveContainer.getDom().outerHTML);
							}
							
							
						});
		
        EJS.Event.Handler.add(this.__dom, "mousedown", BindAsEventListener(this, this.start));
		
		
	},
	start : function(_e){
		if(!this.__duplicate){
			this.__duplicate = EJS.clone(this.__dom);
			EJS.Dom.CSSHelper.modifyName(this.__duplicate, "ejs-control-bar-Item " + this.__duplicate.className);
			EJS.Dom.DomHelper.append(this.__duplicate);
			//this.__duplicate.releaseCapture();
		}
		this.__duplicate.setCapture();

		EJS.Event.Handler.add(this.__duplicate, "mousemove", this.__fStart);
		EJS.Event.Handler.add(this.__duplicate, "mouseup", this.__fStop);

	},
	stop : function(_e){
	}
}

EJS.Dom.ControlBar = Factory.create();
EJS.Dom.ControlBar.prototype = {
	initialize : function(_cbId){
		var cbTag = EJS.Dom.$(_cbId);
		if(cbTag){
			
			for(var i = 0; i < cbTag.childNodes.length; i++){
				new EJS.Dom.ControlBarItem(cbTag.childNodes[i]);
			}
		}
	}
}


EJS.Dom.actionBarItem = Factory.create();
EJS.Dom.actionBarItem.prototype = {
	initialize : function(_obj){
		switch(_obj.id){
			case "up" : 
							EJS.Event.Handler.add(_obj, "mouseup", Bind(formEditorMain, formEditorMain.upMost));
							break;
			case "right" : 
							EJS.Event.Handler.add(_obj, "mouseup", Bind(formEditorMain, formEditorMain.rightMost));
							break;
			case "down" : 
							EJS.Event.Handler.add(_obj, "mouseup", Bind(formEditorMain, formEditorMain.downMost));
							break;
			case "left" : 
							EJS.Event.Handler.add(_obj, "mouseup", Bind(formEditorMain, formEditorMain.leftMost));
							break;
			case "undo" : 
							EJS.Event.Handler.add(_obj, "mouseup", Bind(EJS.operateMgr, EJS.operateMgr.undo));
							break;
			case "redo" : 
							EJS.Event.Handler.add(_obj, "mouseup", Bind(EJS.operateMgr, EJS.operateMgr.redo));
							break;

		}
	}
}


EJS.Dom.actionBar = Factory.create();
EJS.Dom.actionBar.prototype = {
	initialize : function(_cbId){
		var cbTag = EJS.Dom.$(_cbId);
		if(cbTag){
			
			for(var i = 0; i < cbTag.childNodes.length; i++){
				new EJS.Dom.actionBarItem(cbTag.childNodes[i]);
			}
		}
	}
}





EJS.Dom.menuItem = Factory.create();
EJS.Dom.menuItem.prototype = {
    initialize : function(_options){
        this.__dom = EJS.Dom.DomHelper.create(
            {
                tagName : "li",
				attribute : {clazz : _options.isDisable ? "disable" : ""},
                children : [
                    {
                        tagName : "a",
                        attribute : {href : "javascript:void(0)"},
                        children : [
                            {textNode : _options.text}
                        ]
                    }
                ]
            }
        );
		EJS.Event.Handler.add(this.__dom, "mouseup", _options.action);
    }
}


/*
菜单控件
*/

EJS.Dom.menu = Factory.create();
EJS.Dom.menu.prototype = {
    initialize : function(_options){
        this.setCtType("menu");
        this.setCid(EJS.Util.Format.trim(EJS.Util.getTrueValue(_options.cid, EJS.Util.GUID.get)));//唯一标识
        this.setId(EJS.Util.Format.trim(EJS.Util.getTrueValue(_options.id, this.getCtType() + EJS.editorConstant.comNum)));
        this.setName(EJS.Util.getTrueValue(EJS.Util.Format.trim(_options.name), this.getId));
        this.setLeft(EJS.Util.math.getTrueNum(_options.left));
        this.setTop(EJS.Util.math.getTrueNum(_options.top));
        this.setWidth(EJS.Util.math.getTrueNum(_options.width));
        this.setClassName(EJS.Util.getTrueValue(_options.className, "ejs-menu-base"));
        this.setDom(EJS.Dom.DomHelper.create(
            {
                tagName : "ul",
                attribute : {clazz : this.getClassName(), id : this.getCid(), name : this.getName()},
                style : {width : this.getWidth(), left : this.getLeft(), top : this.getTop(), display : "none"}
            }
        ));
		EJS.Event.Handler.add(this.getDom(), "mouseup", Bind(this, function(){
			this.hiddenMenu();
		}));
        EJS.Dom.DomHelper.append(this.getDom());
        //this.showMenu(null, _options.items);
    },
    addItem : function(_items){
        for(var i = 0; i < _items.length; i++){
            var cItem = new EJS.Dom.menuItem(_items[i]);
            EJS.Dom.DomHelper.append(cItem.__dom, this.getDom());
        }
    },
    showMenu : function(_e, _items){
        if(_items && _items.length > 0){
            for(var i = this.getDom().childNodes.length - 1; i >=0; i--){
                EJS.Dom.DomHelper.remove(this.getDom().childNodes[i], this.getDom());
            }
            this.addItem(_items);
        }
        if(_e == null){
            _e = EJS.Event.getEvent()
        }
        this.setLeft(_e.clientX);
        this.setTop(_e.clientY);
        this.getDom().style.left = this.getLeft();
        this.getDom().style.top = this.getTop();
        this.show();
    },
    hiddenMenu : function(){
        this.hidden();
    }
}
EJS.extend(EJS.Dom.menu, EJS.Dom.controlBase);








EJS.Dom.grid = Factory.create();
EJS.Dom.grid.prototype = {
    initialize : function(_config){
        this.__config = {
            tableHead : ["标题A","标题B","标题C","标题D"],
            minWidth : 200, 
            minHeight : 200,
            colDefWidth : 140,
            cols : [
                {name : "标题AA", width : 140}, 
                {name : "标题B", width : 140}, 
                {name : "标题C", width : 140}, 
                {name : "标题D", width : 140}
            ]
        }
        EJS.extend(this.__config, _config);
        this.setCtType("grid");
        this.setCid(EJS.Util.Format.trim(EJS.Util.getTrueValue(_config.cid, EJS.Util.GUID.get)));//唯一标识
        this.setId(EJS.Util.Format.trim(EJS.Util.getTrueValue(_config.id, this.getCtType() + EJS.editorConstant.comNum)));
        this.setName(!!_config.name ? EJS.Util.Format.trim(_config.name) : this.getId());
        this.setWidth(EJS.Util.math.getTrueNum(_config.width, 200));
        this.setHeight(EJS.Util.math.getTrueNum(_config.height, 200));
        this.setLeft(EJS.Util.math.getTrueNum(_config.left, 0));
        this.setTop(EJS.Util.math.getTrueNum(_config.top, 0));
        this.setClassName(EJS.Util.getTrueValue(_config.className, "ejs-grid"));
        




        this.setDom(EJS.Dom.DomHelper.create(
            {
                tagName : "div",
                attribute : {clazz : this.getClassName(), id : this.getCid(), name : this.getName()},
                style : {width : this.getWidth()},
                children : [
                    {
                        tagName : "div",
                        attribute : {clazz : "ejs-grid-table-head"},
                        children : [
                            {
                                tagName : "div",
                                attribute : {clazz : "checkbox"}
                            },
                            {
                                tagName : "div",
                                attribute : {clazz : "ejs-grid-table-title-scroll"},
                                style : {width : (parseInt(this.getWidth()) - 41) + "px"},
                                children : [
                                    {
                                        tagName : "dl",
                                        attribute : {clazz : "ejs-grid-table-title"},
                                        style : {width : (4 * 140) + "px"},
                                        children : [
                                            /*{
                                                tagName : "dd",
                                                children: [
                                                    {textNode : "标题A"}    
                                                ]
                                                
                                            },
                                            {
                                                tagName : "dd",
                                                children: [
                                                    {textNode : "标题B"}    
                                                ]
                                                
                                            },
                                            {
                                                tagName : "dd",
                                                children: [
                                                    {textNode : "标题C"}    
                                                ]
                                                
                                            },
                                            {
                                                tagName : "dd",
                                                children: [
                                                    {textNode : "标题D"}    
                                                ]
                                                
                                            }*/
                                        ]
                                    }
                                ]
                            },
                            
                            {
                                tagName : "div",
                                attribute : {clazz : "ejs-grid-table-head-menubtn"},
                                children : [
                                    {
                                        tagName : "div"                                        
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        tagName : "div",
                        attribute : {clazz : "ejs-grid-table-content"},
                        style : {height : (parseInt(this.getHeight()) - 58) + "px"}/*,
                        children : [
                            {
                                tagName : "dl",
                                attribute : {clazz : "ejs-grid-table-rank ejs-grid-table-first-td"},
                                children : [
                                    {
                                        tagName : "dt",
                                        children : [
                                            {
                                                tagName : "div",
                                                attribute : {clazz : "checkbox"}
                                            }    
                                        ]
                                    }
                                ]
                            },
                            {
                                tagName : "div",
                                attribute : {clazz : "ejs-grid-table-content-scroll"},
                                style : {width : (parseInt(this.getWidth()) - 25) + "px"},
                                children : [
                                    {
                                        tagName : "div",
                                        attribute : {clazz : "ejs-grid-table-content-data"},
                                        style : {width : (4 * 140) + "px"},
                                        children : [
                                                

                                                    {
                                                        tagName : "dl",
                                                        attribute : {clazz : "ejs-grid-table-rank"},
                                                        children : [
                                                            {
                                                                tagName : "dt",
                                                                children: [
                                                                    {textNode : "数据A"}    
                                                                ]
                                                            }    
                                                        ]
                                                    },
                                                    {
                                                        tagName : "dl",
                                                        attribute : {clazz : "ejs-grid-table-rank"},
                                                        children : [
                                                            {
                                                                tagName : "dt",
                                                                children: [
                                                                    {textNode : "数据B"}    
                                                                ]
                                                            }    
                                                        ]
                                                    },
                                                    {
                                                        tagName : "dl",
                                                        attribute : {clazz : "ejs-grid-table-rank"},
                                                        children : [
                                                            {
                                                                tagName : "dt",
                                                                children: [
                                                                    {textNode : "数据C"}    
                                                                ]
                                                            }    
                                                        ]
                                                    },
                                                    {
                                                        tagName : "dl",
                                                        attribute : {clazz : "ejs-grid-table-rank"},
                                                        children : [
                                                            {
                                                                tagName : "dt",
                                                                children: [
                                                                    {textNode : "数据C"}    
                                                                ]
                                                            }    
                                                        ]
                                                    }
                                            ]
                                    }
                                

                                ]
                            }
                        ]*/
                    },
                    {
                        tagName : "div",
                        attribute : {clazz : "ejs-grid-table-console-panel"},
                        children : [
                            {
                                tagName : "div",
                                attribute : {clazz : "ejs-grid-table-record-num"},
                                children : [
                                    {
                                        tagName : "em",
                                        children : [
                                            {textNode : "每页"}
                                        ]
                                    },
                                    {
                                        tagName : "em",
                                        children : [
                                            {
                                                tagName : "input"
                                            }
                                        ]
                                    },
                                    {
                                        tagName : "em",
                                        children : [
                                            {textNode : "篇"}
                                        ]
                                    }
                                ]
                            },    
                            {
                                tagName : "div",
                                attribute : {clazz : "ejs-grid-table-page-num"},
                                children : [
                                    {
                                        tagName : "em",
                                        children : [
                                            {textNode : "共"}
                                        ]
                                    },
                                    {
                                        tagName : "em"/*,
                                        children : [
                                            {textNode : "123"}
                                        ]*/
                                    },
                                    {
                                        tagName : "em",
                                        children : [
                                            {textNode : "篇"}
                                        ]
                                    }
                                ]
                            },
                            /*{
                                tagName : "ul",
                                attribute : {clazz : "ejs-grid-table-page-anchor"},
                                children : [
                                    {
                                        tagName : "li",
                                        children : [
                                             {textNode : "1"}   
                                        ]
                                    },
                                    {
                                        tagName : "li",
                                        children : [
                                             {textNode : "2"}   
                                        ]
                                    },
                                    {
                                        tagName : "li",
                                        children : [
                                             {textNode : "3"}   
                                        ]
                                    }
                                ]
                            },*/
                            {
                                tagName : "ul",
                                attribute : {clazz : "ejs-grid-table-page-btn"},
                                children : [
                                    {
                                        tagName : "li",
                                        attribute : {clazz : "ejs-grid-table-page-first"}
                                    },    
                                    {
                                        tagName : "li",
                                        attribute : {clazz : "ejs-grid-table-page-previous"}
                                    },    
                                    {
                                        tagName : "li",
                                        attribute : {clazz : "ejs-grid-table-page-pagenum"},
                                        children : [
                                            {
                                                tagName : "input",
                                                attribute : {name : "pageName"}
                                            }    
                                        ]
                                    },    
                                    {
                                        tagName : "li",
                                        attribute : {clazz : "ejs-grid-table-page-next"}
                                    },    
                                    {
                                        tagName : "li",
                                        attribute : {clazz : "ejs-grid-table-page-last"}
                                    } 
                                ]
                            }
                        ]
                    }
                ]
            }
        ));
        this.__columnArea = this.getDom().childNodes[0].childNodes[1].childNodes[0];//w   X * 140
        this.__titleScrollArea = this.getDom().childNodes[0].childNodes[1];//w width - 41
        this.__contentArea = this.getDom().childNodes[1];//h height-58
        //this.__contentScrollArea = this.getDom().childNodes[1].childNodes[1];//w width-25
        //this.__contentDataArea = this.getDom().childNodes[1].childNodes[1].childNodes[0];//w   X * 140


        for(var i = 0; i < this.__config.cols.length; i++){
            this.addColumn(this.__config.cols[i]);
        }
    },
    getColNum : function(){
        return this.__columnArea.childNodes.length;
    },
    getColByIndex : function(_i){
        return this.__columnArea.childNodes[_i];
    },
    addColumn : function(_colAtt){
        var name = _colAtt.name || "标题";
        
        var width = _colAtt.width || 140;
        this.__columnArea.style.width = (parseInt(this.__columnArea.style.width) + width) + "px";
        var col = EJS.Dom.DomHelper.create(
            {
                tagName : "dd",
                style : {width : width + "px"},
                children: [
                    {textNode : name}    
                ]
            }   
        );
        EJS.Dom.DomHelper.append(col, this.__columnArea);
    },
    removeColumn : function(){
        
    },
    removeColAll : function(){
        for(var i = this.__columnArea.childNodes.length - 1; i >= 0; i--){
            this.__columnArea.style.width = (parseInt(this.__columnArea.style.width) - parseInt(this.__columnArea.childNodes[i].style.width) || 140) + "px";
            EJS.Dom.DomHelper.remove(this.__columnArea.childNodes[i], this.__columnArea);
        }
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
            height  : parseInt(this.getHeight())
        }
    },




    //修改属性列表的选项数量时调用
    changeOptionNum : function(_num){
        var num = parseInt(_num);
        if(num && !isNaN(num) && num > 0){
            this.removeColAll();
            for(var i = 0; i < _num; i++){

                this.addColumn(
                    {
                        name : "标题"+(i+1),
                        width : 100
                    }
                );
            }
            tableTreeObj.load(this.getAttributes());
        }
    },



    getAttributes : function(){
        attributeList = [];
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
                    para : {name : "列项",value : this.getColNum(), fun : Bind(this, this.changeOptionNum)},
                    nodes : []
                }
                
            ]   
        };
        for (var i = 0; i < this.getColNum(); i++){
            cAtt.nodes[cAtt.nodes.length - 1].nodes.push({
                para : {name : "列项"+(i+1), value : ""},
                nodes : [
                    {para : {name : "名称", value : this.getColByIndex(i).innerText, fun : Bind(this.getColByIndex(i), 
                        function(_name){
                            this.innerText = _name;
                        }
                    )}},
                    {para : {name : "宽度", value : parseInt(this.getColByIndex(i).style.width || 140), fun : Bind(this.getColByIndex(i), 
                        function(_w){
                            this.style.width = (_w || 140) + "px";
                        }
                    )}}
                ]
            });
        }
        attributeList.push(cAtt);
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
EJS.extend(EJS.Dom.grid, EJS.Dom.controlBase);


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



/**
 *formController:表单控制器
 *parameter:
 *          _config:
 *
 *
 *
 */
EJS.Dom.formController = function(){
    var cacheObj = new EJS.Dom.cache();
    return {
        init : function(_id){//表单以静态方式存在
            
        },
        create : function(_config){//表单需要动态创建，以json的方法
            if(_config && _config.formConfig){
                var newForm = new EJS.Dom.form(_config);
                cacheObj.put(newForm.getCid(), newForm);
                return newForm;
            }
            return null;
            
        },
        get : function(_fId){
            return cacheObj.get(_fId);
        }
    }




/*
    alert(_config);
    //类初始化方法
    {
        if(typeof _config == "string"){//表单已经存在
            
        }else if(typeof _config == "object"){//表单不存在，需要创建
            
        }
    }(_config)
*/
}();


EJS.Dom.componentController = function(){
    var containers = [];
    return{
        paint : function(_componentConfigArray){
            if(_componentConfigArray && _componentConfigArray.constructor == Array && _componentConfigArray.length > 0){//判断控件列表是否是数组类型且不为空
                for(var _containerConfigIndex in _componentConfigArray){
                    var _containerConfig = _componentConfigArray[_containerConfigIndex];
                    switch(_containerConfig.ctType){
                        case "form"     :   containers.push(new EJS.Dom.form(_containerConfig));
                                            break;
                        case "panel"    :   containers.push(new EJS.Dom.panel(_containerConfig));
                    }
                }
                for(var _containerIndex in containers){
                    var _container = containers[_containerIndex]
                    _container.paint(_container.getCid());
                }
            }
        }
    }
}();
















EJS.ex={};
EJS.ex.actionParse = function(_actionStr,_formId){

    var actions = _actionStr;
    var curForm = EJS.Dom.formController.get(_formId);
    
    var actionOfGet = {};
    try{
        if(typeof _actionStr != 'object'){
            actions = eval(_actionStr);
        }
        if(actions != null){
            if(actions.url){
                curForm.setAction(actions.url);
            }
            if(actions.actions){
                for(var i = 0; i < actions.actions.length; i++){
                    var curAction = actions.actions[i];
                    switch(curAction.type){
                        case "SetValue" : curForm.getChild(curAction.cObjId).setValue(curAction.values[0].value); break;
                        case "Enable"   : curAction.values[0].value ? curForm.getChild(curAction.cObjId).enable() : curForm.getChild(curAction.cObjId).disable(); break;
                        case "GetValue" : actionOfGet[curAction.cObjId] = curAction; break;
                    }
                }
            }
            var resultJSON = "";
            for(var objId in actionOfGet){
                actionOfGet[objId].values[0].value = curForm.getChild(objId).getValue();
            }
            var myJSONText = JSON.stringify(actionOfGet);
            
            EJS.ajaxAPI.post(curForm.getAction(), "data="+myJSONText, function(_result){alert(_result)});
            //alert(myJSONText);
        }
        
    }catch(e){
        alert("error!!!");
    }
}













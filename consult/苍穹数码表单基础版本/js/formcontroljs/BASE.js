
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













﻿EJS.Dom.dialogBox = function(_config){
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
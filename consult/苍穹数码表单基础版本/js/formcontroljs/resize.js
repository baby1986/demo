
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


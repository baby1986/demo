
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





        this.setOriginY(26);
        this.setCid(EJS.Util.Format.trim(EJS.Util.getTrueValue(_config.cid, EJS.Util.GUID.get)));//唯一标识
        this.setId(EJS.Util.Format.trim(EJS.Util.getTrueValue(_config.id, this.getCtType() + EJS.editorConstant.comNum)));
        this.setName(!!_config.name ? EJS.Util.Format.trim(_config.name) : this.getId());
        
        this.setCtType("tabbedPane");
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

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
        this.setCid(EJS.Util.Format.trim(EJS.Util.getTrueValue(_config.cid, EJS.Util.GUID.get)));//唯一标识
        this.setId(EJS.Util.Format.trim(EJS.Util.getTrueValue(_config.id, this.getCtType() + EJS.editorConstant.comNum)));
        this.setName(!!_config.name ? EJS.Util.Format.trim(_config.name) : this.getId());
        this.setCtType("tableTree");
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
﻿//grid控件
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
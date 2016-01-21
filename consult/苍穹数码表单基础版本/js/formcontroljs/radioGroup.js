
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
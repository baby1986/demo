define(["jquery"],function () {
    var trueOrFalse = { y: "是", n: "否" };
    var def={ visible: true, enable: true, auto: true, type: "text" };
    var ret = {
        id: { name: "id", alia: "唯一编号", tag: "gb-id", enable: false },
        store: { name: "id", alia: "生成存储", tag: "gb-store", enable: true, type: "select", data: trueOrFalse },
        val: { name: "val", alia: "存储位置", tag: "gb-val", enable: false, auto: false },
        type: { name: "type", alia: "控件类型", tag: "hb-type", enable: false }
    };
    $.each(ret,function (key, obj) {
        ret[key] = $.extend(def,obj);
    }
    return ret;
});
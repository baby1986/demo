define(["jquery", "angular"], function () {

    var designer = angular.module("designer", []);


    var tags = [
        {
            name: "hbText",
            template: '<div><input type="text" value="{{hbVal}}" /></div>',
            scope: {
                hbVal: "@"
            }
        },
        {
            name: "hbButton",
            template: '<div><input type="button" value="{{hbVal}}"/></div>',
            scope: {
                hbVal: "@"
            }
        }
    ];

    $.each(tags, function (index, tag) {
        var name = tag.name; delete tag.name;
        var template = "<div>" + tag.template;
        designer.directive(name, function () {
            return $.extend({
                restrict: 'A',//restrict指定以元素（E） 、属性（A） 、类（C）或注释（M）的格式来调用指令,属性方式有比较好的跨浏览器兼容性
                //replace: true,//替换跟元素,不能替换，本例负责框架内部的内容，外部应该是框架的布局元素，这里不应该干涉
                scope: {}//@attr:DOM属性值绑定;=attr:DOM属性绑定,&:引用传递给方法
            }, tag);//独立作用域,防止被污染 
        });
    });

    //手动应用
    angular.bootstrap(document, ["designer"]);

    return {
        app: designer,
        appname: "designer",
        tags: tags,
        val: function () { },
        enable: function () { },
        visible: function () { },
        validate: function () { }
    };
});
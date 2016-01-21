define([
    'underscore',
    'oo',
    'require',
    'boot',
    './oo_package/oo_base',
    './oo_package/oo_sub'
],
function (_, oo, require, sub) {
    'use strict';

    describe("[oo test]", function () {

        beforeEach(function () {
            spyOn(oo, 'register');
        });
        
        it("register类注册测试", function () {
            expect(_.isObject(oo._.cn.com.HBCK.ITPlat.OOTest.OoBase)).toBe(true);
            expect(_.isObject(oo._.cn.com.HBCK.ITPlat.OOTest.OoSub)).toBe(true);
        });

        it("new-createClass创建类", function () {
            var b = oo.createClass("cn.com.HBCK.ITPlat.OOTest.OoBase", 1, 2);
            expect(_.isObject(b)).toBe(true);
            expect(b.getInitParamater()).toEqual([1, 2]);
        });

        it("private私有方法", function () {
            var b = oo.createClass("cn.com.HBCK.ITPlat.OOTest.OoBase");
            expect(b.baseGet()).toEqual("base");
            var c = oo.createClass("cn.com.HBCK.ITPlat.OOTest.OoSub");
            expect("baseGet" in c).toBe(false);
            expect("getInitParamater" in c).toBe(false);
        });

        it("virtual继承多态", function () {
            var b = oo.createClass("cn.com.HBCK.ITPlat.OOTest.OoBase");
            expect(b.virtualGet()).toEqual("base");//多态
            var c = oo.createClass("cn.com.HBCK.ITPlat.OOTest.OoSub");
            expect(c.virtualGet()).toEqual("sub");//继承+多态
        });

        it("base父类调用", function () {
            var b = oo.createClass("cn.com.HBCK.ITPlat.OOTest.OoSub");
            expect(b.baseGetName()).toEqual("base");//调用父类方法
            expect(b.base().virtualGet()).toEqual("base");
        });

        it("over覆盖父类调用", function () {
            var b = oo.createClass("cn.com.HBCK.ITPlat.OOTest.OoSub");
            expect(b.getName()).toEqual("sub");//调用父类方法
            expect(b.base().getName()).toEqual("base");
        });
        
        it("abstract抽象方法", function () {
            var b = oo.createClass("cn.com.HBCK.ITPlat.OOTest.OoSub");
            expect(b.trueVirtual).toThrowError(TypeError, "trueVirtual");//抽象方法
        });
        
        it(":base(1,2)初始化父类构造函数测试", function () {
            var b = oo.createClass("cn.com.HBCK.ITPlat.OOTest.OoSub", "a", "b");
            expect(b.base().getInitParamater()).toEqual(["a", "b"]);
        });

        it("base.调用基类方法", function () {
            var b = oo.createClass("cn.com.HBCK.ITPlat.OOTest.OoSub");
            expect(b.base("cn.com.HBCK.ITPlat.OOTest.OoBase").getName()).toEqual("base");
            expect(b.base().getName()).toEqual("base");
        });

        it("createInstance静态构造", function () {
            var a = oo.classForName("cn.com.HBCK.ITPlat.OOTest.OoBase").createInstance(1, 2);
            expect(_.isObject(a)).toBe(true);
            expect(a.getInitParamater()).toEqual([1, 2]);
            //expect(a.privateGet()).toEqual("base");//非虚函数
            expect(a.virtualGet()).toEqual("base");//多态
            var b = oo.classForName("cn.com.HBCK.ITPlat.OOTest.OoSub").createInstance();
            expect(b.baseGetName()).toEqual("base");//调用父类方法
           // expect(b.privateGet()).toEqual("base");
            expect(b.virtualGet()).toEqual("sub");//继承+多态
            expect(b.trueVirtual).toThrowError(TypeError, "trueVirtual");//抽象方法
        });

        it("static静态方法", function () {
            expect(oo.classForName("cn.com.HBCK.ITPlat.OOTest.OoSub").parent).toEqual("cn.com.HBCK.ITPlat.OOTest.OoBase");
        });

        it("instanceof实例", function () {
            expect(oo.createClass("cn.com.HBCK.ITPlat.OOTest.OoSub").instanceOf("cn.com.HBCK.ITPlat.OOTest.OoSub")).toBe(true);
            expect(oo.createClass("cn.com.HBCK.ITPlat.OOTest.OoSub").instanceOf("cn.com.HBCK.ITPlat.OOTest.OoBase")).toBe(true);
            expect(oo.createClass("cn.com.HBCK.ITPlat.OOTest.OoSub").instanceOf("JOObject")).toBe(true);
        });

        it("in方法", function () {
            expect("getName" in oo.createClass("cn.com.HBCK.ITPlat.OOTest.OoSub")).toBe(true);
            expect("getName" in oo.createClass("cn.com.HBCK.ITPlat.OOTest.OoSub").base()).toBe(true);
        });

        it("getType类名", function () {
            expect(oo.createClass("cn.com.HBCK.ITPlat.OOTest.OoSub").className).toEqual("cn.com.HBCK.ITPlat.OOTest.OoSub");
        });

        it("getType继承类名测试", function () {
            var b = oo.createClass("cn.com.HBCK.ITPlat.OOTest.OoSub");
            expect(b.getClassName()).toEqual("cn.com.HBCK.ITPlat.OOTest.OoSub");
            expect(b.base().getClassName()).toEqual("cn.com.HBCK.ITPlat.OOTest.OoBase");
        });

        afterEach(function () {
        });
        return {};
    });
    window.onload();
});
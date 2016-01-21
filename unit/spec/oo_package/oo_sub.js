define(["oo", "require", "exports"], function (oo, require, exports) {

    var s = function (a, b) {
        var _super = this.base("cn.com.HBCK.ITPlat.OOTest.OoBase", a, b);//开头初始化基类并得到操作对象

        var privateval = "sub";

        this.subGet= function () {//私有
            return privateval;
        }

        this.baseGetName = function () {
            return _super.getName();//内部调用基类方法
        }
    }

    s.prototype.getName = function () {//覆盖
        return this.subGet();
    }

    s.parent = "cn.com.HBCK.ITPlat.OOTest.OoBase";

    var name = "cn.com.HBCK.ITPlat.OOTest.OoSub";
    exports[name] = oo.register(name, s);//注册类
    return s;
});
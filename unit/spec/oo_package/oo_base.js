define(["oo", "exports"], function (oo, exports) {

    var s = function () {
        var privateval = "base";
        var a = Array.prototype.slice.call(arguments);

        this.getInitParamater = function () {//私用方法，不会被继承
            return a;
        }

        this.baseGet = function () {//私用方法，不会被继承
            return privateval;
        }
    }
    s.prototype.getName = function () {//可以被继承的方法
        return this.baseGet();
    }

    s.prototype.virtualGet = function () {
        return this.getName();//多态
    }

    s.prototype.trueVirtual = function () {
        throw new TypeError("trueVirtual");//模拟abstract
    }

    var name = "cn.com.HBCK.ITPlat.OOTest.OoBase";
    exports[name] = oo.register(name, s);//注册类
    return s;
});
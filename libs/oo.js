define(function (require, exports, module) {
    var oofactory = {
        _: {},
        DEBUG: true
    };

    var pkg = null;

    var isRoot = function (root) {
        return root && (isWindow(root) || isObject(root));
    }

    var isFunction = function (fun) {
        return typeof (fun) === "function";
    }

    var isObject = function (obj) {
        var type = typeof obj;
        return type === 'function' || type === 'object' && !!obj;
    }

    var isWindow = function (obj) {
        /* jshint eqeqeq: false */
        return obj != null && obj == obj.window;
    }

    var isArray = function (obj) {
        return toString.call(obj) === '[object Array]'
    }

    var contains = function (arr, str) {
        if (!arr || !isArray(arr)) return -1;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === str) {
                return i;
            }
        }
        return -1;
    }

    //function inhertPrototype(sub, _super) {
    //    var prototype = object(_super.prototype);
    //    prototype.constructor = sub;
    //    sub.prototype = prototype;
    //}

    //function isPrototypeProperty(obj, name) {
    //    return !(name in obj) && !obj.hasOwnProperty(name);
    //}

    //function isProperty(obj, name) {
    //    return name in obj;
    //}

    //var inject = function (obj, _super) {
    //    //只往当前this上绑定，通过context实现递归复制
    //    for (var x in _super) {
    //        obj[x] = obj[x] || (
    //            isFunction(_super[x]) ?
    //            cloneFunction(_super[x]) :
    //            _super[x]);
    //    }
    //    return _super;
    //}
    var cloneFunction = function (funres) {
        var temp = function temporary() { return funres.apply(this, arguments); };
        for (key in funres) {
            temp[key] = funres[key];
        }
        return temp;
    }

    var injectprototype = function (obj, clazz) {
        var prototype = clazz.prototype;
        for (var p in prototype) {
            if (p == "constructor" || p == "__proto__") continue;
            obj[p] = isFunction(prototype[p]) ? cloneFunction(prototype[p]) : prototype[p];
        }
    }

    var JOObject = function (className) {
        this._ = [];
        this.className = className || "JOObject";
    }

    JOObject.className = "JOObject";

    JOObject.prototype.getClassName = function () {
        return this.className;
    }

    JOObject.prototype.base = function (baseName) {
        var index = -1;
        if (!baseName) {
            if (this._.length) return this._[1];
        }
        else if ((index = contains(this._, baseName)) > -1) {
            return this._[index + 1];
        }
        //继承
        var parent = oofactory.classForName(baseName);
        //这个是复制构造函数中的this定义的方法,不复制相当于选择继承的方式,全复制则打开即可
        //parent.apply(this, Array.prototype.slice(arguments, 1));
        //复制prototype定义的方法
        injectprototype(this, parent);
        //父类
        var _super = oofactory.createClass.apply(null, Array.prototype.slice.call(arguments));
        //搭建关系
        this._.push(baseName);
        this._.push(_super);
        return _super;
    }

    JOObject.prototype.instanceOf = function (baseName) {
        if (baseName == this.getClassName() || baseName == JOObject.className) {
            return true;
        }
        index = contains(this._, baseName);
        if (index > -1) return true;
        for (var i = 1; i < this._.length; i += 2) {
            var basei = this._[i];
            if (basei.instanceOf(baseName)) {
                return true;
            }
        }
        return false;
    }

    var Package = function () {

        this.createClassPkg = function (className) {
            this.createPackage(this.getParent(className));
        };

        this.classForName = function (className) {
            var ns = className.split(".");
            var np = oofactory._;
            for (var j = 0; j < ns.length; j++) {
                var name = ns[j];
                if (np[name] === undefined) {
                    return np[name];
                }
                np = np[name];
            }
            return np;
        };

        this.createPackage = function (pkgName) {
            var ns = pkgName.split(".");
            var np = oofactory._;
            for (var j = 0; j < ns.length; j++) {
                var name = ns[j];
                if (np[name] === undefined) {
                    console.log("create package: " + name);
                }
                np[name] = np[name] || {};
                np = np[name];
            }
            return np;
        };

        this.getPackage = function (className) {
            var pkgName = this.getParent(className);
            return this.createPackage(pkgName);
        };

        this.getParent = function (className) {
            var idx = className.lastIndexOf(".");
            if (idx > 0) {
                return className.substr(0, idx);
            } else {
                return "";
            }
        };

        this.getSimpleName = function (className) {
            var idx = className.lastIndexOf(".");
            if (idx > 0) {
                return className.substr(idx + 1);
            } else {
                return className;
            }
        };
    }

    oofactory.register = function (className, clazz) {
        if (clazz['createInstance'] == null) {//静态方法
            clazz['createInstance'] = function () {
                return oofactory.createClass.apply(null, [className].concat(Array.prototype.slice.call(arguments)));
            };
        }

        if (clazz['className'] == null) {//静态方法
            clazz['className'] = className;
        }

        //默认注册到window上
        if (isRoot(oofactory._)) {
            pkg = pkg || new Package(oofactory._);
            var pkgName = pkg.getPackage(className);
            pkgName[pkg.getSimpleName(className)] = clazz;
        }
        return clazz;
    };

    oofactory.createClass = function () {
        var args = Array.prototype.slice.call(arguments);
        var className = args[0];
        var clazz = oofactory.classForName(className);
        var obj = new JOObject(className);
        clazz.apply(obj, args.slice(1));
        injectprototype(obj, clazz);
        return obj;
    };

    oofactory.classForName = function (className) {
        if (!className || JOObject.className === className) return JOObject;
        pkg = pkg || new Package(oofactory._);
        return pkg.classForName(className);
    };

    return oofactory;
});
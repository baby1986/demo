(function () {
    var baseUrl = document.getElementById('main').getAttribute('data-baseurl');

    var config = {
        //By default load any module IDs from js/lib
        baseUrl: baseUrl,
        //except, if the module ID starts with "app",
        //load it from the js/app directory. paths
        //config is relative to the baseUrl, and
        //never includes a ".js" extension since
        //the paths config could be for a directory.
        paths: {
            util: '/scripts/libs/util',
            'jquery-private': '/scripts/libs/jquery-private',
            jquery: '/scripts/libs/jquery-1.11.3',
            json: "/scripts/libs/jquery.json-2.4",
            underscore: '/scripts/libs/underscore-1.8.2',
            "underscores.tring": '/scripts/libs/underscore.string-3.2.2',
            angular: '/scripts/libs/angular-1.3.9/angular',
            'angular-route': '/scripts/libs/angular-1.2.2/angular-route',
            text: '/scripts/text-2.0.14',//用于requirejs导入html类型的依赖
            app: 'main',
            oo: '/scripts/libs/oo'
        },
        /*去掉skim中对jquery的引用可以解决$污染
        map: {
            '*': { 'jquery': 'jquery-private' },
            'jquery-private': { 'jquery': 'jquery' }
        },*/
        shim: {
            "jquery": { exports: "$" },
            "json": { exports: "json", deps: ["jquery"] },
            "util": { exports: "util", deps: ["jquery"] },
            "underscore": { exports: "_", deps: ["util"], init: function (util) { this.maxin(util); } },
            "underscore.string": {
                exports: "_s", deps: ["underscore"], init: function (underscore) {
                    // Mix in non-conflict functions to Underscore namespace if you want
                    underscore.mixin(this.exports());
                    //test All functions, include conflict, will be available through _.str object
                    this.include('Underscore.string', 'string'); // => true
                }
            },
            "angular": { exports: "angular" },
            "oo": {
                exports: "oo", deps: ["require"], init: function () {
                    this.packages = config.packages;
                }
            }

            //,
            //'angular-route': {
            //    deps: ['angular'],
            //    exports: 'ngRouteModule'
            //}
        },
        packages: [
            { name: "desinger", globalname: "cn.com.HBCK.ITPlat.Desinger", location: "/ITplat/Desinger" }
        ],
        deps: ["jquery", "json", "util"]//aysncload-direct
    };
    requirejs.config(config);

    //require(['angular', 'router'], function (angular) {
    //    angular.bootstrap(document, ['webapp']);
    //});
})();

var ctrls = ["hb-pack", "hb-table"];

// Start the main app logic.
requirejs(["require", "hb-templates", "hb-dbind", "hb-attrs", "hb-table"], function (require, templates, dbind, attrs, table) {
    var dbind = $.extend(dbind, templates, { attrs: attrs });

});
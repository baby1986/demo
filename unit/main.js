(function () {
    var baseUrl = document.getElementById('main').getAttribute('data-baseurl');

    var config = {
        baseUrl: baseUrl,
        paths: {
            jasmine: 'lib/jasmine',
            "jasmine-html": 'lib/jasmine-html',
            boot: 'lib/boot',
            underscore: '../scripts/libs/underscore-1.8.2',
            app: 'main',
            "oo": './src/oo',
        },
        packages: [
        ],
        shim: {
            "oo": {
                exports: "oo"
            },
            'jasmine': {
                exports: 'window.jasmineRequire'
            },
            'jasmine-html': {
                deps: ['jasmine'],
                exports: 'window.jasmineRequire'
            },
            'boot': {
                deps: ['jasmine', 'jasmine-html'],
                exports: 'window.jasmineRequire'
            },
            "underscore": {
                exports: "_"
            }
        },
        deps: ['boot']
        //, urlArgs: "bust=" + (new Date()).getTime()
    };
    requirejs.config(config);
})();


require(["./spec/unitoo.js"], function () {
});
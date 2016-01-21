module.exports = {
    context: __dirname,
    entry: "./mian.js",
    output: {
        path: __dirname,
        filename: "desinger.js",
        publicPath:"/itplat"
    },
    module: {
        loaders: [
          { test: /.css$/, loader: 'style!css' },
          { test: /.(png|jpg)$/, loader: 'url-loader?limit=8192' }
        ]
    },
    resolve: {
        extensions: ['', '.js'],
        alia:{
            oo:'libs/oo.js',
            jquery:'libs/jquery-1.11.3.js',
            undercore:'libs/undercore-1.8.2.js',
            json:'libs/jquery.json-2.4.js',
            util:'libs/util.js'
        }
    },
    pulgins:[
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery:"jquery",
            "window.jQuery":"jquery",
            '_':"undercore",
            undercore:"undercore",
            "window.undercore":"undercore",
            util:"util",
            "window.util":"util"
        }),
        new webpack.DefinePlugin({
          __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
          __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false'))
        })
    ]
};
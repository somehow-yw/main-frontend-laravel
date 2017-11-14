var path = require('path'),
    webpack = require('webpack'),
    src_dir = path.resolve(__dirname,'src'),
    node_modules_dir = path.resolve(__dirname, 'node_modules');
var config = {
    entry: {
        bundle: [
            src_dir + '/vendors/common.js',
            src_dir + '/vendors/request/request.dev.js',
            src_dir + '/app.js',
            src_dir + '/less/style.less'
        ]
        //,
        //simplePage:[
        //    src_dir + '/vendors/1/simplePage.js',
        //    src_dir + '/vendors/1/simplePage.css'
        //]
    },
    output: {
        path: path.resolve(__dirname, 'build/Public/buyer-cli/ious/open/'),
        //publicPath: 'http://img.idongpin.com/Public/service-provider-cli/js/',
        filename: 'bundle.js'
        //chunkFilename: new Date().getTime() + '/[name].js'
    },
    resolve: {
        alias: {
            //iscroll: src_dir + '/vendors/lib/iscroll.js'
        }
    },
    module: {
        //noParse: [src_dir + '/react/react.min.js', src_dir + '/vendors/react-dom.min.js'],
        loaders: [
            {
                test: /\.less|\.css$/,
                loader:'style-loader!css-loader!autoprefixer-loader!less-loader'
            },
            {
                test: /\.jsx?$/,

                // There is not need to run the loader through
                // vendors
                exclude: [node_modules_dir],
                loader: 'babel'
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url?limit=25000'
            },
            {
                test:/\.(woff|svg|eot|ttf)$/,
                loaders:['url?limit=15000']
            }
            //{ test: require.resolve("react"), loader: "expose?React" }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false
            },
            compress: {
                warnings: false
            }
        }),
        //new webpack.ProvidePlugin({
        //    IScroll: 'iscroll'
        //}),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        })
    ]
};

module.exports = config;

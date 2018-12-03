const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

const port = 5000;
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Clean = require('clean-webpack-plugin');

const debug = !!(require('process').argv.indexOf('-d') >= 0);

const option = {
    context: path.resolve('./src/'),
    entry: {
        common: ['babel-polyfill', 'react', 'react-dom', 'react-router']
    },
    output: {
        publicPath: '/mobx_demo/',
        path: path.resolve('./dist'),
        filename: 'res/[name]/index.[hash:8].bundle.js',
    },
    resolve: {
        modules: ['node_modules', 'components']
    },
    module: {
        loaders: [{
            test: /\.(js|jsx)$/,
            loader: 'babel-loader?cacheDirectory',
            exclude: /node_modules/,
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader?-autoprefixer!postcss-loader',
        }, {
            test: /\.(png|jpg|gif)$/,
            loader: 'url-loader?limit=8192&name=res/imgs/[name].[hash:8].[ext]',
        }, {
            test: /\.(woff|woff2|ttf|eot|svg|otf)\/?.*$/i,
            loader: 'file-loader?name=res/fonts/[name].[ext]',
            exclude: /node_modules/,
        }, {
            test: /\.json$/,
            loader: 'json-loader',
            exclude: /node_modules/,
        }]
    },
    // postcss: [
    // autoprefixer({ browsers: ['last 2 versions', 'ie >= 9'] }),
    // require('postcss-nested')(),
    // require('postcss-cssnext')()
    // ],
    devtool: debug ? 'source-map' : undefined,
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({ names: ['common'], minChunks: Infinity }),
        new webpack.ProvidePlugin({ React: 'react' })
    ],
    devServer: {
        publicPath: '/mobx_demo/',
        disableHostCheck: true,
        hot: true,
        inline: false,
        port: port,
        host: '0.0.0.0',
        https: true,
        proxy: [{
            context: [''],
            changeOrigin: true,
            target: '',
            secure: false,
            bypass: function(req, res, proxyOptions) {
                console.log(`proxy url: ${req.path}`);
                if (req.path.indexOf('guide') !== -1 || req.path.indexOf('mockdata') !== -1) {
                    console.log('Skipping proxy for browser request.');
                    return req.path;
                }
            }
        }]
    }
};

fs.readdirSync(option.context)
    .filter(entry => fs.statSync(path.join(option.context, entry)).isDirectory())
    .filter(entry => ['models'].indexOf(entry) < 0)
    .forEach(entry => {
        option.entry[entry] = ['./' + entry];
        option.plugins.push(new HtmlWebpackPlugin({
            template: entry + '/index.html', // 把 webpack/[entry]/index.html
            filename: entry + '.html', // copy 到 dist/[entry].html
            chunks: ['common', entry] // 并且自动加入common.js和[entry].js的引用
        }));
    });

if (debug) {
    option.plugins.push(new webpack.NoEmitOnErrorsPlugin());

    // 打开浏览器
    var http = 'https';
    if (require('process').argv.indexOf('--https') >= 0) {
        http = 'https';
    }
    require('child_process').exec("start " + http + "://" + getLocalIP() + ":" + port + "/mobx_demo/");
    require('child_process').exec("open " + http + "://" + getLocalIP() + ":" + port + "/mobx_demo/");
} else {
    option.plugins.push(new Clean(['dist']));
    option.plugins.push(new webpack.DefinePlugin({ "process.env": { NODE_ENV: '"production"' } }));
    option.plugins.push(new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }));
}

module.exports = option;

function getLocalIP() {
    var nets = require('os').networkInterfaces();
    for (var devname in nets) {
        if (devname.indexOf('Pseudo') >= 0) continue;

        var device = nets[devname];
        for (var i in device) {
            var network = device[i];
            var head = network.address.split(".")[0];

            if (network.family == 'IPv4' && (head == "192" || head == "10" || head == "172")) {
                return network.address;
            }
        }
    }
    return "localhost";
}
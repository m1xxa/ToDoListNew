const path = require('path');

module.exports = {
    entry: "./src/index.js",
    // and webpack starts bundling

    output: {
        // options related to how webpack emits results

        path: path.resolve(__dirname, "public/js"), // string
        // the target directory for all output files
        // must be an absolute path (use the Node.js path module)

        filename: "main.js", // string
        // the filename template for entry chunks

        publicPath: "/", // string
        // the url to the output directory resolved relative to the HTML page
    },

    watch: true,

    module: {
        loaders: [{
            test:    /\.js$/,
            include: __dirname + '/public',
            loader:  "babel?presets[]=es2015"
        }, {
            test:   /\.styl$/,
            loader: 'style!css!stylus?resolve url'
        }],
    },


    devServer: {
        contentBase: path.join(__dirname, 'public'), // boolean | string | array, static file location
        compress: true, // enable gzip compression
        historyApiFallback: true, // true for index.html upon 404, object for multiple paths
        hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
        https: false, // true for self-signed, object for cert authority
        noInfo: true, // only errors & warns on hot reload
        // ...
    },


};

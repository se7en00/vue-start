const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HappyPack = require('happypack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const happyThreadPool = HappyPack.ThreadPool({ size: 5 })
const {
    getClientEnvironment,
    paths,
    entry,
    output,
    resolve,
    extractSassRules,
    eslintRules,
    babelLoader,
    vueLoader,
    imagesUrlLoader,
    fontsLoader,
    noMatchLoader,
    InterpolateHtmlPlugin
} = require('./config')

// `publicUrl` is just like `publicPath`, but we will provide it to our menu
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_PATH%/xyz looks better than %PUBLIC_PATH%xyz.
const publicUrl = ''
// Get environment variables to inject into our menu.
const env = getClientEnvironment(publicUrl)
// global style
const extractGlobalCSS = new ExtractTextPlugin({ filename: 'css/global-[name].[hash].css', allChunks: true })
// style for css moudules
const extractModulesCSS = new ExtractTextPlugin({ filename: 'css/[name].css', allChunks: true })

module.exports = {
    mode: 'development',
    // You may want 'eval' instead if you prefer to see the compiled output in DevTools.
    // See the discussion in https://github.com/facebookincubator/create-react-app/issues/343.
    devtool: 'cheap-module-source-map',
    entry: entry(paths),
    output: output(paths),
    resolve: resolve(paths, {
        'vue$': 'vue/dist/vue.esm.js',
        '@': paths.appSrc
    }),
    module: {
        strictExportPresence: true,
        rules: [
            // We are waiting for https://github.com/facebookincubator/create-react-app/issues/2176.
            // { parser: { requireEnsure: false } },
            eslintRules(paths),
            vueLoader(),
            {
                // "oneOf" will traverse all following loaders until one will
                // match the requirements. When no loader matches it will fall
                // back to the "file" loader at the end of the loader list
                oneOf: [
                    babelLoader(paths),
                    extractSassRules(paths, extractGlobalCSS), // match global style
                    extractSassRules(paths, extractModulesCSS, true), // match moudules style
                    //     // extractCustomAntdLess(extractCutomeAntdCSS),
                    imagesUrlLoader(),
                    ...fontsLoader(),
                    noMatchLoader()
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),

        new HappyPack({
            id: 'babel',
            threadPool: happyThreadPool,
            loaders: ['babel-loader']
        }),

        new HappyPack({
            id: 'styles',
            threadPool: happyThreadPool,
            loaders: ['vue-style-loader', 'css-loader', 'sass-loader', 'less-loader']
        }),

        new webpack.ProvidePlugin({
            R: 'ramda',
            _: 'lodash',
            lodash: 'lodash',
            dayjs: 'dayjs'
        }),
        // Generates an `index.html` file with the <script> injected.
        new HtmlWebpackPlugin({
            title: '胜券后台',
            inject: true,
            showErrors: true,
            template: paths.appHtml
        }),
        // Makes some environment variables available in index.html.
        // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
        // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
        // In development, this will be an empty string.
        new InterpolateHtmlPlugin(env.raw),
        // Makes some environment variables available to the JS code, for example:
        // if (process.env.NODE_ENV === 'development') { ... }. See `./env.js`.
        new webpack.DefinePlugin(env.stringified),

        new webpack.NamedModulesPlugin(),

        new webpack.HotModuleReplacementPlugin(),
        // skip the emitting phase whenever there are errors while compiling, this
        // won't reload page
        new webpack.NoEmitOnErrorsPlugin(),
        // new webpack.HashedModuleIdsPlugin(),

        // extractCutomeAntdCSS,
        extractGlobalCSS,
        extractModulesCSS,

        new webpack.optimize.SplitChunksPlugin({
            cacheGroups: {
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                },
                // common code to vendor bundle
                vendor: {
                    chunks: 'initial',
                    minChunks: 2,
                    maxInitialRequests: 5, // The default limit is too small to showcase the effect
                    minSize: 0, // This is example is too small to create commons chunks
                    name: 'vendor'
                },

                commons: {
                    name: 'commons',
                    chunks: 'initial',
                    minChunks: Infinity
                }
            }
        }),

        new webpack.optimize.RuntimeChunkPlugin({
            name: 'manifest'
        })
    ],
    // Turn off performance hints during development because we don't do any
    // splitting or minification in interest of speed. These warnings become
    // cumbersome.
    performance: {
        hints: false
    },
    node: {
        constants: false,
        // prevent webpack from injecting useless setImmediate polyfill because Vue
        // source contains it (although only uses it if it's native).
        setImmediate: false,
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    }
}

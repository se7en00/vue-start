// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'development'
process.env.NODE_ENV = 'development'
// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
    throw err
})

// Ensure environment variables are read.
require('../webpack/config/env')

const {
    choosePort,
    createCompiler,
    prepareUrls
} = require('react-dev-utils/WebpackDevServerUtils')
const clearConsole = require('react-dev-utils/clearConsole')

const webpack = require('webpack')
const fs = require('fs')
const chalk = require('chalk')
const WebpackDevServer = require('webpack-dev-server')
const paths = require('../webpack/config/paths')
const config = require('../webpack/webpack.config.dev')
const createDevServerConfig = require('../webpack/webpackDevServer.config')
const openBrowser = require('react-dev-utils/openBrowser')

const useYarn = fs.existsSync(paths.yarnLockFile)
const isInteractive = process.stdout.isTTY

// Tools like Cloud9 rely on this.
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000 //eslint-disable-line
const HOST = process.env.HOST || '127.0.0.1'

if (process.env.HOST) {
    console.log(
        chalk.cyan(
            `Attempting to bind to HOST environment variable: ${chalk.yellow(
                chalk.bold(process.env.HOST),
            )}`,
        ),
    )
    console.log(
        'If this was unintentional, check that you haven\'t mistakenly set it in your shell.',
    )
    console.log(`Learn more here: ${chalk.yellow('http://bit.ly/2mwWSwH')}`)
    console.log()
}

// 检查本地服务端口
choosePort(HOST, DEFAULT_PORT).then(port => {
    if (port == null) {
        // We have not found a port.
        return
    }
    const protocol = process.env.HTTPS === 'true' ? 'https' : 'http'
    const urls = prepareUrls(protocol, HOST, port)
    process.env.VUE_LOCAL_APP_API = urls
    const appName = require(paths.appPackageJson).name

    // WebpackDevServer.addDevServerEntrypoints(config, createDevServerConfig);
    const compiler = createCompiler(webpack, config, appName, urls, useYarn)
    // const compiler = Webpack(config);
    const server = new WebpackDevServer(compiler,
        createDevServerConfig(urls.lanUrlForConfig))

    server.listen(port, HOST, (err) => {
        if (err) {
            return console.log(err)
        }

        if (isInteractive) {
            clearConsole()
        }
        console.log(chalk.cyan('Starting the development server...\n'))
        // openBrowser(`http://${HOST}:${port}`);
        openBrowser(urls.localUrlForBrowser)
    });

    ['SIGINT', 'SIGTERM'].forEach(function(sig) {
        process.on(sig, function() {
            devServer.close()
            process.exit()
        })
    })
}).catch(err => {
    if (err && err.message) {
        console.log(err.message)
    }
    process.exit(1)
})

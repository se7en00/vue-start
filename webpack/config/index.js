//get env config
const getClientEnvironment = require('./env');
//base
const paths = require('./paths');
const {entry} = require('./entry');
const {output} = require('./output');
const {resolve} = require('./resolve');

//loaders
const {extractSassRules, extractCustomAntdLess} = require('./styleLoaders');
const {eslintRules} = require('./eslintRules');
const {babelLoader} = require('./babelLoader');
const {vueLoader} = require('./vueLoader');
const {imagesUrlLoader, fontsLoader, noMatchLoader} = require('./fileLoaders');
//pulings
const InterpolateHtmlPlugin = require('./InterpolateHtmlPlugin');

module.exports = {
    getClientEnvironment,
    paths,
    entry,
    output,
    resolve,
    extractSassRules,
    extractCustomAntdLess,
    eslintRules,
    babelLoader,
    vueLoader,
    imagesUrlLoader,
    fontsLoader,
    noMatchLoader,
    InterpolateHtmlPlugin
};

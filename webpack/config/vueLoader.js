const vueLoader = () => ({
    test: /\.vue$/,
    loader: require.resolve('vue-loader'),
    options: {
        cacheBusting: true,
        transformToRequire: {
            video: ['src', 'poster'],
            source: 'src',
            img: 'src',
            image: 'xlink:href'
        }
    }

});

module.exports = {
    vueLoader
};

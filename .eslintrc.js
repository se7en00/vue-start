// https://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint',
        sourceType: "module",
        allowImportExportEverywhere: false
    },

    env: {
        browser: true,
        node: true
    },

    //true: can be override，false: can't be override。
    globals: {
        __dirname: false,
        require: false,
        document: false,
        window: false,
        module: false,
        lodash: false,
        _: false,
        R: false,
        dayjs: false
    },
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    extends: [
        'plugin:vue/essential',
        '@vue/standard'
    ],
    // required to lint *.vue files
    plugins: [
        'vue',
        'import'
    ],
    // check if imports actually resolve
    settings: {
        'import/resolver': {
            webpack: {
                config: 'webpack/webpack.config.dev.js'
            }
        }
    },
    // add your custom rules here
    rules: {
        // don't require .vue extension when importing
        'import/extensions': ['error', 'always', {
            js: 'never',
            vue: 'never'
        }],
        // disallow reassignment of function parameters
        // disallow parameter object manipulation except for specific exclusions
        'no-param-reassign': ['error', {
            props: false,
            // ignorePropertyModificationsFor: [
            //     'state', // for vuex state
            //     'acc', // for reduce accumulators
            //     'e' // for e.returnvalue
            // ]
        }],
        // allow optionalDependencies
        'import/no-extraneous-dependencies': ['error', {
            optionalDependencies: ['test/unit/index.js']
        }],

        'arrow-parens': 0,
        'arrow-spacing': 2, //函数的箭头之前或之后有空格
        "key-spacing": [2, {
            "beforeColon": false,
            "afterColon": true
        }], // 对象字面量中冒号的后面必须有空格，前面不允许有空格
        "keyword-spacing": [2, {
            "before": true,
            "after": true
        }], // 关键字前后必须存在空格
        "new-cap": [2, {"newIsCap": true, "capIsNew": false}],//构造函数首字母大写
        "comma-spacing": [2, {"before": false, "after": true}],//在写逗号时，逗号前面不需要加空格，而逗号后面需要添加空格
        // allow async-await
        'generator-star-spacing': 0,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 1,
        'no-console': process.env.NODE_ENV === 'production' ? 2 : 1,
        "no-dupe-args": 2, //函数定义的时候不允许出现重复的参数
        // 必须使用 === 或 !==，禁止使用 == 或 !=，与 null 比较时除外
        'eqeqeq': [2, 'always', {null: 'ignore'}],
        // indent
        "indent": [1, 4, {"SwitchCase": 0}],
        "space-before-function-paren": [2, {
            "anonymous": "never",
            "named": "never",
            "asyncArrow": "always"
        }],
        "semi": [2, "never"], //代码末尾不需要分号
        "space-before-blocks": [1, "always"],
        "quotes": [1, "single"],
        "prefer-template": 1, //es6中``操作符优先，替代+操作符
        "max-params": [2, 5], //限制函数的最大参数个数,
        'for-direction': 'error', // 禁止 for 循环出现方向错误的循环，比如 for (i = 0; i < 10; i--)
        'getter-return': ['error', {allowImplicit: false}],  // getter 必须有返回值，并且禁止返回空，比如 return;
        "array-bracket-spacing": [2, "never"],//该条规则主要用于定义数组字面量定义数组时，前后是否加空格，接受两个可选配置，always 和never ,如果设置为always 那么就应该在在写数组是前后都留空格
        "comma-dangle": [2, "never"],//在定义对象或数组时，最后一项不能加逗号
        //vue 的设置
        "vue/html-self-closing": 0,
        "vue/html-indent": [1, 4, {
            "attribute": 1,
            "closeBracket": 0
        }],
        'vue/html-quotes': 2,// html 属性值必须用双引号括起来
        'vue/no-multi-spaces': 2, //禁止出现连续空格
        'vue/no-async-in-computed-properties': 2,// 计算属性禁止包含异步方法
        'vue/no-duplicate-attributes': 2, //禁止出现重复的属性
        "vue/no-use-v-if-with-v-for": 0
    }
}

<template>
    <div class="loginContainer">
        <div class="loginContainer__layer loginContainer__layer--bg" id="login"></div>
        <div class="loginContainer__layer">
            <!-- logo部分 -->
            <div class="loginContainer__logo-group"/>
            <!-- 表单部分 -->
            <div class="loginContainer__form-group">
                <div class="loginContainer__errorMsg">{{errorMsg}}</div>
                <el-card>
                    <el-form ref="loginForm" label-position="top" status-icon :rules="rules" :model="formLogin" size="default">
                        <el-form-item prop="username" class="u-mb-30">
                            <el-input type="text" v-model="formLogin.username" placeholder="用户名">
                                <i slot="prefix" class="fas fa-user-circle"></i>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="password" class="u-mb-5">
                            <el-input type="password" v-model="formLogin.password" placeholder="密码" @keyup.enter.native="submit">
                                <i slot="prefix" class="fas fa-keyboard"></i>
                            </el-input>
                        </el-form-item>
                        <el-form-item class="u-mb-5">
                            <el-checkbox v-model="formLogin.isSavePW"><span>记住密码</span></el-checkbox>
                        </el-form-item>
                        <el-button
                            size="default"
                            @click="submit"
                            type="primary"
                            :loading="isLoading"
                            class="button-login"
                        >登录
                        </el-button>
                    </el-form>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import 'particles.js'
import { mapActions } from 'vuex'
import util from '@/utils'
import config from './config/nasa'

export default {
    name: 'login',
    data() {
        return {
            // 表单
            formLogin: {
                username: util.cookies.get('username') || '',
                password: util.cookies.get('pwd') || '',
                isSavePW: util.cookies.get('isSavePW') === 'true'
            },
            isLoading: false,
            errorMsg: '', // 错误信息
            // 校验
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            }
        }
    },
    mounted() {
        // 初始化例子插件
        particlesJS('login', config)
    },
    beforeDestroy() {
        // 销毁 particlesJS
        // thanks https://github.com/d2-projects/d2-admin/issues/65
        // ref https://github.com/VincentGarreau/particles.js/issues/63
        if (pJSDom && pJSDom.length > 0) {
            pJSDom[0].pJS.fn.vendors.destroypJS()
            pJSDom = []
        }
    },
    /* eslint-enable */
    methods: {
        ...mapActions(['login']),
        /**
         * @description 提交表单
         */
        // 提交登录信息
        submit() {
            this.isLoading = true
            this.$refs.loginForm.validate(async (valid) => {
                if (valid) {
                    // 登录
                    await this.login({
                        vm: this,
                        username: this.formLogin.username,
                        password: this.formLogin.password,
                        isSavePW: this.formLogin.isSavePW,
                        route: { name: 'payment-merchant-index' }
                    }).catch(error => {
                        this.errorMsg = error.message
                    })
                    this.isLoading = false
                } else {
                    this.isLoading = false
                    // 登录表单校验失败
                    // this.$message.error('表单校验失败')
                }
            })
        }
    }
}
</script>

<style scoped lang="scss">
.loginContainer {
    background-color: $login-bg;
    width: 100%;
    height: 100%;
    position: relative;

    @include e(layer) {
        @extend %flex-center-col;
        position: absolute;
        height: 100%;
        width: 100%;
        @include m(bg) {
            canvas {
                display: block;
                margin: 0px;
                padding: 0px;
            }
        }
    }
    @include e(errorMsg) {
        position: absolute;
        top: 50px;
        left: 120px;
        color: $error-color;
        font-size: 14px;
    }

    @include e(logo-group) {
        background:url(./image/login_logo.png) no-repeat;
        width: 300px;
        height: 100px;
        margin-top: -145px;
        position: relative;
        top: 55px;
        z-index: 1;
    }

    @include e(form-group) {
        position: relative;
        width: 300px;

        /deep/ .el-input__inner {
            padding-left: 35px;
        }

        /deep/ .el-input__prefix {
            padding-left: 5px;
            font-size: 16px;
        }

        /deep/ .el-card {
            border-color: $login-form-bg;
            background-color: $login-form-bg;
            border-radius: 10px;
            @include e(body) {
                padding-top: 100px;
            }
        }

        .button-login {
            width: 100%;
        }
    }
}
</style>

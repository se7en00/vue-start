<template>

    <el-dropdown size="small" placement="bottom" class="avatar-container">
        <div class="avatar-wrapper">
            <img :src="avatar" class="avatar"/>
            <div class="userName"><span>您好，{{fullName}}</span><span v-if="!fullName"></span></div>
            <i class="el-icon-caret-bottom"/>
        </div>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="amendPassword">
                <i class="fa fa-crop u-mr-5"></i>
                修改密码
            </el-dropdown-item>
            <el-dropdown-item @click.native="logOff">
                <i class="fas fa-power-off u-mr-5"></i>
                退出登录
            </el-dropdown-item>
        </el-dropdown-menu>
        <el-dialog title="修改密码" :before-close="beforeClose" :modal-append-to-body="false" :modal="true" width="30%" :visible.sync="dialogTableVisible">
            <el-form :model="formData" ref="formData" :rules="rules" label-width="100px">
                <el-form-item label="原密码" prop="oldPassword">
                    <el-input @change="passwordChange('formData')" type="password" placeholder="不少于6位的数字+字母" v-model="formData.oldPassword"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPassword">
                    <el-input :type="isPassWord" @change="newPasswordChange('formData')" v-model="formData.newPassword" placeholder="不少于6位的数字+字母">
                        <i
                            :class="passWordFaEye"
                            slot="suffix"
                            @click="passWordIconClick">
                        </i>
                    </el-input>
                </el-form-item>
                <el-form-item label="确认新密码" prop="newPasswordConfirm">
                    <el-input :type="isPassWordConfirm" @change="newPasswordConfirmChange('formData')" v-model="formData.newPasswordConfirm" placeholder="不少于6位的数字+字母">
                        <i
                            :class="passWordConfirmFaEye"
                            slot="suffix"
                            @click="passWordConfirmIconClick">
                        </i>
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" :disabled="buttonDisabled" @click="confirm('formData')">确认修改</el-button>
            </div>
        </el-dialog>
    </el-dropdown>

</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import avatar from './pic-head.png'

export default {
    data() {
        var validateNewPasswordsd = (rule, value, callback) => {
            var reg = /[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/
            if (value === '' || value === undefined) {
                callback(new Error('请输入原密码'))
            } else if (value.length < 6 || !reg.test(value)) {
                callback(new Error('至少6位的数字和字母'))
            } else if (this.errorMessage !== '') {
                callback(new Error(this.errorMessage))
            } else {
                callback()
            }
        }
        var validateNewPassword = (rule, value, callback) => {
            var reg = /[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/
            if (value === '' || value === undefined) {
                callback(new Error('请输入新密码'))
            } else if (value.length < 6 || !reg.test(value)) {
                callback(new Error('至少6位的数字和字母'))
            } else {
                callback()
            }
        }
        var validateNewPasswordConfirm = (rule, value, callback) => {
            if (value === '' || value === undefined) {
                callback(new Error('请输入新密码'))
            } else if (value !== this.formData.newPassword) {
                callback(new Error('与新密码不一致'))
            } else {
                callback()
            }
        }
        return {
            avatar,
            dialogTableVisible: false,
            formData: {},
            passWordFaEye: 'fa fa-eye-slash',
            passWordConfirmFaEye: 'fa fa-eye-slash',
            isPassWord: 'password',
            isPassWordConfirm: 'password',
            errorMessage: '',
            buttonDisabled: true,
            rules: {
                oldPassword: [
                    { validator: validateNewPasswordsd, required: true, trigger: 'blur' }

                ],
                newPassword: [
                    { validator: validateNewPassword, required: true, trigger: 'blur' }
                ],
                newPasswordConfirm: [
                    { required: true, validator: validateNewPasswordConfirm, trigger: 'blur' }
                ]

            }
        }
    },
    computed: {
        ...mapGetters(['username', 'fullName'])
    },
    methods: {
        ...mapActions(['logout', 'modifyPassword']),
        /**
             * @description 登出
             */
        logOff() {
            this.logout({
                vm: this
            })
        },
        amendPassword() {
            this.dialogTableVisible = true
        },
        beforeClose() {
            this.dialogTableVisible = false
            this.buttonDisabled = true
            this.formData = {}
            this.$refs['formData'].clearValidate()
            this.passWordFaEye = 'fa fa-eye-slash'
            this.passWordConfirmFaEye = 'fa fa-eye-slash'
            this.isPassWord = 'password'
            this.isPassWordConfirm = 'password'
        },
        confirm(formData) {
            this.$refs[formData].validate((valid) => {
                if (valid) {
                    const params = { ...this.formData }
                    this.modifyPassword({ params }).then((res) => {
                        if (res.code === 0) {
                            this.beforeClose()
                            this.$message.success('密码修改成功，请重新登录')
                            this.$router.push({ name: 'login' })
                        }
                    }).catch(error => {
                        this.errorMessage = error.message
                        this.$refs[formData].validate()
                    })
                } else {

                }
            })
        },
        passWordIconClick(data) {
            this.passWordFaEye = data.target.className === 'fa fa-eye-slash' ? 'fa fa-eye' : 'fa fa-eye-slash'
            this.isPassWord = data.target.className === 'fa fa-eye-slash' ? 'text' : 'password'
        },
        passWordConfirmIconClick(data) {
            this.passWordConfirmFaEye = data.target.className === 'fa fa-eye-slash' ? 'fa fa-eye' : 'fa fa-eye-slash'
            this.isPassWordConfirm = data.target.className === 'fa fa-eye-slash' ? 'text' : 'password'
        },
        passwordChange(formData) {
            this.errorMessage = ''

            if (this.formData.newPasswordConfirm !== undefined && this.formData.newPassword !== undefined) {
                this.$refs[formData].validate((valid) => {
                    if (valid) {
                        this.buttonDisabled = false
                    } else {
                        this.buttonDisabled = true
                    }
                })
            }
        },
        newPasswordChange(formData) {
            if (this.formData.newPasswordConfirm !== undefined && this.formData.oldPassword !== undefined) {
                this.$refs[formData].validate((valid) => {
                    if (valid) {
                        this.buttonDisabled = false
                    } else {
                        this.buttonDisabled = true
                    }
                })
            }
        },
        newPasswordConfirmChange(formData) {
            if (this.formData.newPassword !== undefined && this.formData.oldPassword !== undefined) {
                this.$refs[formData].validate((valid) => {
                    if (valid) {
                        this.buttonDisabled = false
                    } else {
                        this.buttonDisabled = true
                    }
                })
            }
        }
    }
}
</script>
<style lang="scss">
    .avatar-container {
        .avatar-wrapper {
            @extend %unable-select;
            margin: 0 15px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .avatar {
            height: 20px;
            width: 20px;
        }
        .userName {
            margin: 0 10px;
            span{
                color: #fff;
            }
        }
        .el-icon-caret-bottom{
            color: #fff;
        }
    }
</style>

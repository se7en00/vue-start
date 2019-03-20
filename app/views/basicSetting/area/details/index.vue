<template>
    <main-container whiteBg="true">
        <span slot="title">{{$route.meta.title}}</span>
        <el-form
            ref="areaForm"
            :model="areaForm"
            status-icon
            :rules="rules"
            label-width="100px">
            <el-row type="flex" justify="center">
                <el-col :span="12">
                    <el-form-item label="区域名称" prop="name">
                        <el-input v-model="areaForm.name" placeholder="请输入区域名称"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row type="flex" justify="center">
                <el-col :span="12">
                    <el-form-item label="区域编码" prop="code">
                        <el-input v-model="areaForm.code" placeholder="请输入区域编码"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row type="flex" justify="center">
                <el-col :span="12">
                    <el-form-item label="联系人姓名" prop="linkman">
                        <el-input v-model="areaForm.linkman" placeholder="请输入联系人姓名"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row type="flex" justify="center">
                <el-col :span="12">
                    <el-form-item label="联系电话" prop="contactNumber">
                        <el-input v-model="areaForm.contactNumber" placeholder="联系电话"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row type="flex" justify="center">
                <el-col :span="12">
                    <el-form-item>
                        <el-button type="primary" @click="submitForm">{{this.areaId ? '保存' : '添加'}}</el-button>
                        <el-button @click="cancel">取消</el-button>
                    </el-form-item>
                </el-col>
            </el-row>

        </el-form>
    </main-container>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
export default {
    props: ['areaId'],
    data() {
        return {
            cascaderProps: {
                label: 'name',
                value: 'code'
            },
            selectRegions: [],
            areaForm: {
                name: '',
                code: '',
                linkman: '',
                contactNumber: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入区域名称', trigger: 'blur' }
                ],
                code: [
                    { required: true, message: '请输入区域编码', trigger: 'blur' }
                ]
                // areaId: [
                //     {required: true, message: '请选择省份', trigger: 'blur' }
                // ],
            }
        }
    },

    computed: {
        ...mapGetters(['currentMerchantId']),
        ...mapState({
            regionOptions: state => state.basicSetting.store.regions
        })
    },

    mounted() {
        if (this.areaId) {
            this.getAreaDetails({ id: this.areaId, merchantId: this.currentMerchantId })
                .then(res => {
                    this.areaForm.name = res.name
                    this.areaForm.code = res.code
                    this.areaForm.contactNumber = res.contactNumber
                    this.areaForm.linkman = res.linkman
                    this.areaForm.id = this.areaId
                })
        }
    },

    methods: {
        ...mapActions([
            'saveOrUpdateArea',
            'getAreaDetails'
        ]),

        cancel() {
            this.$router.push({ name: 'merchant-baseSetting-area-list' })
        },

        submitForm() {
            this.$refs['areaForm'].validate((valid) => {
                if (valid) {
                    const params = {
                        ...this.areaForm,
                        merchantId: this.currentMerchantId
                    }

                    this.saveOrUpdateArea({ vm: this, params, isCreate: !this.$route.params.areaId })
                        .then(() => {
                            if (!this.areaId) {
                                this.$message({
                                    message: '添加成功',
                                    type: 'success'
                                })
                            } else {
                                this.$message({
                                    message: '保存成功',
                                    type: 'success'
                                })
                            }
                        })
                } else {
                    return false
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .storeAddress {
        /deep/ .el-form-item__content {
            display: flex;
        }
    }
</style>

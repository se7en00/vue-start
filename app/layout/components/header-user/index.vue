<template>
    <el-dropdown size="small" placement="bottom" class="avatar-container">
        <div class="avatar-wrapper">
            <img :src="avatar" class="avatar"/>
            <div class="userName"><span>{{username}}</span></div>
            <i class="el-icon-caret-bottom"/>
        </div>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="logOff">
                <i class="fas fa-power-off u-mr-5"></i>
                退出
            </el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import avatar from './pic-head.png'

export default {
    data() {
        return {
            avatar
        }
    },
    computed: {
        ...mapGetters(['username'])
    },
    methods: {
        ...mapActions(['logout']),
        /**
             * @description 登出
             */
        logOff() {
            this.logout({
                vm: this
            })
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

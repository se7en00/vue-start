import util from '@/utils/index'

export default {
    methods: {
        handleMenuSelect(index, indexPath) {
            if (/^https:\/\/|http:\/\//.test(index)) {
                util.open(index)
            } else {
                this.$router.push({
                    path: index
                })
            }
        }
    }
}

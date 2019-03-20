import { PAY_TYPE, PAY_CHANNEL } from '@/constants'
export default {
    methods: {
        formatterPayType(statement) {
            if (!statement.payType) return ''
            const isMatched = PAY_TYPE.some(item => item.value === statement.payType)
            if (isMatched) {
                return this.$mappingValue(statement.payType)(PAY_TYPE)
            } else {
                return statement.payType
            }
        },

        formatterPayChannel(statement) {
            if (!statement.payChannel) return ''
            const isMatched = PAY_CHANNEL.some(item => item.value === statement.payChannel)
            if (isMatched) {
                return this.$mappingValue(statement.payChannel)(PAY_CHANNEL)
            } else {
                return statement.payChannel
            }
        }
    }
}

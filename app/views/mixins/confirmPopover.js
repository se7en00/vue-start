export default {
    methods: {
        /**
         *  打开Popover 弹出框
         */
        openConfirmPopover(item) {
            item.visible = true
        },

        /**
         * 关闭Popover 弹出框
         */
        closeConfirmPopover(item) {
            item.visible = false
        }
    }
}

// components/postList/postList.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        postList: {
            type: Array,
            value: []
        }
    },

    /**
     * 组件的初始数据
     */
    data: {},

    /**
     * 组件的方法列表
     */
    methods: {
        navigateToPostDeatail(e) {
            wx.navigateTo({
                url: '../../pages/postDetail/postDetail?path=' + e.currentTarget.dataset.path
            })
        }
    }
})

// pages/tagPostList/tagPostList.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        postList: [],
        tag: ''
    },

    getPostList(tag) {
        wx.cloud.callFunction({
            name: 'http',
            data: {
                type: 'tagPostList',
                param: tag
            }
        }).then((res) => {
            this.setData({
                postList: res.result.data
            })
        }).catch((err) => {
            console.error('获取tagPostList失败', err)
            wx.showToast({
                icon: 'error',
                title: '获取文章失败'
            })
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            tag: options.tag
        })
        this.getPostList(options.tag)
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})
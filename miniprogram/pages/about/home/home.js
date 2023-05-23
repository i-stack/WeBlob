// pages/about/home/home.js
Page({
    /**
     * 页面的初始数据
     */
    data: {},

    openUrl(e) {
		const url = e.currentTarget.dataset.url;
		const navtitle = e.currentTarget.dataset.title;
		wx.navigateTo({
			// 跳转到webview页面
			url: `/pages/webview/webview?url=${url}&nav=${navtitle}`
		});
    },

    navigate(e) {
        wx.navigateTo({
            url: e.currentTarget.dataset.page
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) { },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () { },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () { },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () { },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () { },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () { },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () { },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () { }
})

// wx.setClipboardData({
//     data: e.currentTarget.dataset.url,
//     success() {
//         wx.showToast({
// 			title: '地址已复制'
// 		})
//     }
// })
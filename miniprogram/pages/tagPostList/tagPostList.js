// pages/tagPostList/tagPostList.js
const app = getApp();

Page({
    /**
     * 页面的初始数据
     */
    data: {
        postList: [],
        tag: ''
    },

    getPostList(tag) {
		let that = this;
		wx.request({
			url: `${app.globalData.domain}/api/tags/${tag}.json`,
			header: {
			  	'content-type': 'application/json'
			},
			success: res => {
				console.log(res.data)
				let postlist = res.data.postlist
				for (let i = 0; i < postlist?.length; i++) {
					let item = postlist[i];
					let needUpdate = false
					if (!item.cover) {
						needUpdate = true
						item.cover = `${app.globalData.domain}/images/bg_img.jpg`
					} else if (!item.cover.includes("https://") && !item.cover.includes("http://")) {
						needUpdate = true
						item.cover = `${app.globalData.domain}${item.cover}`
					}
					if (needUpdate) {
						postlist[i] = item;
					}
				}
				that.setData({
					postList: res.data.postlist
				})
			}, fail: err => {
				console.error('获取tagPostList失败', err)
				wx.showToast({
					icon: 'error',
					title: '获取文章失败'
				})
			}
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
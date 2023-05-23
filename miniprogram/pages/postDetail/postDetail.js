const app = getApp();

Page({
    /**
     * 页面的初始数据
     */
    data: {
        isLoading: true,
        show: false,
        current: 0,
        title: '',
        post: '',
        date: '',
        updated: '',
        cover: '',
		covers: '',
		abbrlink: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
		let that = this;
		wx.request({
			url: `${app.globalData.domain}/${options.path}`,
			header: {
			  	'content-type': 'application/json'
			},
			success: res => {
				console.log(res.data)
				let copyPost = res.data.content
				copyPost = copyPost.replace(/<figure /g, '<pre ')
				copyPost = copyPost.replace(/<\/figure>/g, '</pre>')
				copyPost = copyPost.replace(/<td class=\"gutter\"><pre>.*<\/pre><\/td><td /g, '<td ')
				copyPost = copyPost.replace(/<table><tr><td class=\"code\"><pre>/g, '<code>')
				copyPost = copyPost.replace(/<\/pre><\/td><\/tr><\/table>/g, '</code>')
				let result = app.towxml(copyPost, 'html', {
					events: {
						tap: event => {
							// 只处理图片的点击事件
							if (event.currentTarget.dataset.data && event.currentTarget.dataset.data.attrs && event.currentTarget.dataset.data.attrs.class == "h2w__img") {
								// 传入图片地址，调用WeUI图片预览组件
								that.setData({
									show: true,
									current: that.data.covers.findIndex(item => item === event.currentTarget.dataset.data.attrs.src)
								})
							}
						}
					}
				});
				let covers = res.data.covers
				if (!covers) {
					covers = []
					covers.push(`${app.globalData.domain}/images/bg_img.jpg`)
				} else {
					for (let i = 0; i < covers.length; i++) {
						let cover = covers[i];
						if (!cover.includes("http://") && !cover.includes("https://")) {
							cover = `${app.globalData.domain}${cover}` 
							covers[i] = cover 
						}
					}
				}
				that.setData({
					isLoading: false,
					post: result,
					title: res.data.title,
					date: res.data.date,
					updated: res.data.updated,
					cover: (covers && covers.length) ? covers[0] : "",
					covers: covers || [""],
					abbrlink: res.data.abbrlink
				})
			}, fail: err => {
				console.error('获取postDetail失败', err)
				wx.showToast({
					icon: 'error',
					title: '获取详情失败'
				})
				that.setData({
					isLoading: false,
					post: '',
					title: '',
					date: '',
					updated: '',
					cover: `${app.globalData.domain}/img/404.jpg`,
					covers: []
				})
			}
		})
	},
	
	openUrl(e) {
		console.log(e)
		const url = `${app.globalData.domain}/posts/${e.currentTarget.dataset.url}.html`;
		const navtitle = e.currentTarget.dataset.title;
		wx.navigateTo({
			// 跳转到webview页面
			url: `/pages/webview/webview?url=${url}&nav=${navtitle}`
		});
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
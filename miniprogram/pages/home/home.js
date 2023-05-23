Page({
    /**
     * 页面的初始数据
     */
    data: {
        swiperList: [{
            "path": "api/articles/项目代理/信用卡.json",
            "cover": "https://cdn.jsdelivr.net/gh/huangruoqiu/HexoPicture/cover/%E5%BD%B1%E5%93%8D%E5%8A%9B%E7%AC%94%E8%AE%B0.PNG"
        }, {
            "path": "api/articles/项目代理/信用卡.json",
            "cover": "https://cdn.jsdelivr.net/gh/huangruoqiu/HexoPicture/cover/%E4%B8%AD%E5%9B%BD%E9%93%B6%E8%A1%8C%E9%9D%A2%E8%AF%95%E5%A4%8D%E7%9B%98.PNG"
        }, {
            "path": "api/articles/项目代理/信用卡.json",
            "cover": "https://cdn.jsdelivr.net/gh/huangruoqiu/HexoPicture/cover/Angular%E8%87%AA%E5%AE%9A%E4%B9%89%E5%B1%9E%E6%80%A7%E5%9E%8B%E6%8C%87%E4%BB%A4.PNG"
        }],
        postList: [],
        pageNum: 1,
        pageSize: 10,
        isLoading: false,
        isLoadingComplete: false
    },

    getPostList() {

		wx.request({
			url: 'https://freelibrary.top/api/articles/%E9%A1%B9%E7%9B%AE%E4%BB%A3%E7%90%86/%E4%BF%A1%E7%94%A8%E5%8D%A1.json',
			header: {
			  'content-type': 'application/json'
			},
			success: res => {
			  console.log(res.data)
			  this.setData({
				//第一个data为固定用法
				isLoading: false,
                postList: this.data.postList.concat(res.data)
				
			  })
			}
		  })



        // const db = wx.cloud.database();
        // const _ = db.command;

        // db.collection('postList')
        //     .where({
        //         _id: _.exists(true)
        //     })
        //     .skip((this.data.pageNum - 1) * this.data.pageSize) // 跳过结果集中的前 n 条，从第 n+1 条开始返回
        //     .limit(this.data.pageSize) // 限制返回数量为 10 条
        //     .get()
        //     .then(res => {
        //         if (this.data.pageNum === 1) {
        //             wx.stopPullDownRefresh()
        //         }
        //         if (res.data.length < this.data.pageSize) {
        //             this.setData({
        //                 isLoadingComplete: true
        //             })
        //         }
        //         this.setData({
        //             isLoading: false,
        //             postList: this.data.postList.concat(res.data)
        //         })
        //     })
        //     .catch(err => {
        //         console.error('获取postList失败', err)
        //         wx.showToast({
        //             icon: 'error',
        //             title: '获取文章失败'
        //         })
        //         this.setData({
        //             isLoading: false
        //         })
        //     })
    },

    navigateToPostDeatail(e) {
        wx.navigateTo({
            url: '../postDetail/postDetail?path=' + e.currentTarget.dataset.path
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getPostList()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {},

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {},

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {},

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        this.setData({
            pageNum: 1,
            postList: [],
            isLoading: true,
            isLoadingComplete: false
        })
        this.getPostList()
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        if (!this.data.isLoadingComplete) {
            let currentPageNum = this.data.pageNum
            this.setData({
                isLoading: true,
                pageNum: currentPageNum + 1
            })
            this.getPostList()
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {}
})
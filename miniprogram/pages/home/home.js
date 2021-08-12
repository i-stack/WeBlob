Page({

    /**
     * 页面的初始数据
     */
    data: {
        swiperList: [{
            "title": "Hello World",
            "path": "api/articles/hello-world.json",
            "cover": "https://cdn.jsdelivr.net/npm/butterfly-extsrc@1/img/default.jpg"
        }],
        postList: [],
        pageNum: 1,
        pageSize: 10,
        isLoading: false,
        isLoadingComplete: false
    },

    getPostList() {
        const db = wx.cloud.database();
        const _ = db.command;

        db.collection('postList')
            .where({
                _id: _.exists(true)
            })
            .skip((this.data.pageNum - 1) * this.data.pageSize) // 跳过结果集中的前 n 条，从第 n+1 条开始返回
            .limit(this.data.pageSize) // 限制返回数量为 10 条
            .get()
            .then(res => {
                if (this.data.pageNum === 1) {
                    wx.stopPullDownRefresh()
                }
                if (res.data.length < this.data.pageSize) {
                    this.setData({
                        isLoadingComplete: true
                    })
                }
                this.setData({
                    isLoading: false,
                    postList: this.data.postList.concat(res.data)
                })
            })
            .catch(err => {
                console.error('获取postList失败', err)
                wx.showToast({
                    icon: 'error',
                    title: '获取文章失败'
                })
                this.setData({
                    isLoading: false
                })
            })
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
    onShareAppMessage: function () {

    }
})
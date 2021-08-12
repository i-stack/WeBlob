Page({

    /**
     * 页面的初始数据
     */
    data: {
        tagList: [],
        colorList: [],
        colorOption: ['#5EFA6A', '#D6C05A', '#EB6E4B', '#9839D4', '#5BC6F5', '#F5B3D3']
    },

    getTagList() {
        wx.cloud.callFunction({
            name: 'http',
            data: {
                type: 'tagList'
            }
        }).then((res) => {
            this.setData({
                tagList: res.result.data.map(item => item.name)
            })
            this.setColorList(res.result.data.length)
        }).catch((err) => {
            console.error('获取tagList失败', err)
            wx.showToast({
                icon: 'error',
                title: '获取标签失败'
            })
        })
    },

    setColorList(len) {
        let colorList = []
        for (let i = 0; i < len; i++) {
            let num = Math.floor(Math.random(0, 1) * 6)
            while (colorList[colorList.length - 1] === this.data.colorOption[num]) {
                num = Math.floor(Math.random(0, 1) * 6)
            }
            colorList.push(this.data.colorOption[num])
        }
        this.setData({
            colorList: colorList
        })
    },

    navigateToPostList(e) {
        wx.navigateTo({
            url: '../tagPostList/tagPostList?tag=' + e.currentTarget.dataset.tag
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getTagList()
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